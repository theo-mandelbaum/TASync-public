import * as React from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, ColumnsDirective, RangesDirective, RangeDirective, RowsDirective, RowDirective, CellsDirective, CellDirective, ColumnDirective, getFormatFromType } from '@syncfusion/ej2-react-spreadsheet';
import { numberFormatData } from './data';
import { updateSampleSection } from '../common/sample-base';
import './spreadsheet.css';
function NumberFormatting() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let spreadsheet;
    const bold = { fontWeight: 'bold' };
    function onCreated() {
        spreadsheet.cellFormat({ fontWeight: 'bold' }, 'A1:E2');
        spreadsheet.cellFormat({ textAlign: 'center', fontWeight: 'bold' }, 'A3:E3');
        spreadsheet.cellFormat({ textAlign: 'center' }, 'A4:A14');
        spreadsheet.cellFormat({ textAlign: 'center' }, 'C4:C14');
        spreadsheet.cellFormat({ backgroundColor: '#F9FBE7' }, 'A4:E15');
        spreadsheet.cellFormat({ backgroundColor: '#1E88E5', color: '#F5F5F5' }, 'A1:E2');
        spreadsheet.cellFormat({ backgroundColor: '#BBDEFB' }, 'A3:E3');
        spreadsheet.cellFormat({ backgroundColor: '#B3E5FC' }, 'A15:E17');
        // Apply format to the specified range in the active sheet.
        spreadsheet.numberFormat('$#,##0.00', 'D4:E14');
        spreadsheet.numberFormat('$#,##0.00', 'E15:E17');
        spreadsheet.numberFormat('[Red][<=350]$#,##0.00;[Blue][>350]$#,##0.00', 'E4:E14');
    }
    return (<div className='control-pane'>
            <div className='control-section spreadsheet-control'>
                <SpreadsheetComponent showRibbon={false} showFormulaBar={false} ref={(ssObj) => { spreadsheet = ssObj; }} created={onCreated.bind(this)}>
                    <SheetsDirective>
                        <SheetDirective name='Restaurant Invoice' selectedRange='E17'>
                            <RangesDirective>
                                <RangeDirective dataSource={numberFormatData} startCell='A3'></RangeDirective>
                            </RangesDirective>
                            <RowsDirective>
                                <RowDirective height={30}>
                                    <CellsDirective>
                                        <CellDirective value='Customer Name'></CellDirective>
                                        <CellDirective value='Cristi Espinos'></CellDirective>
                                        <CellDirective index={3} value='Waiter Name'></CellDirective>
                                        <CellDirective value='Raye Whines'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective height={30}>
                                    <CellsDirective>
                                        <CellDirective value='Table No.'></CellDirective>
                                        <CellDirective value='8'></CellDirective>
                                        <CellDirective index={3} value='Date'></CellDirective>
                                        <CellDirective value='5-7-2019'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective index={14}>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Subtotal:'></CellDirective>
                                        <CellDirective index={4} formula='=SUBTOTAL(9,E4:E14)' format='$#,##0.00'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Discount (8%):'></CellDirective>
                                        <CellDirective index={4} formula='=PRODUCT(8,E15)/100' format='$#,##0.00'></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective index={1} value='Total Amount:' style={bold}></CellDirective>
                                        <CellDirective index={4} formula='=SUM(E15-E16)' format={getFormatFromType('Accounting')} style={bold}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                            </RowsDirective>
                            <ColumnsDirective>
                                <ColumnDirective width={120}></ColumnDirective>
                                <ColumnDirective width={180}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                                <ColumnDirective width={120}></ColumnDirective>
                                <ColumnDirective width={120}></ColumnDirective>
                            </ColumnsDirective>
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates number formatting feature with a restaurant invoice.
                </p>
            </div>
            <div id="description">
                <p>
                    In this demo, number formatting is applied to specific cells by using the <code>format</code> property,
                    and a range of cells by using the <code>numberFormat</code> method.
                </p>
                <p>
                    In the Amount column, we have used Custom number formatting to highlight the values less than 350 and greater than 350 with red and blue colors respectively.
                </p>
                <p>
                    More information about number formatting can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/spreadsheet/formatting/#number-formatting"> documentation</a> section.
                </p>
            </div>
        </div>);
}
export default NumberFormatting;
