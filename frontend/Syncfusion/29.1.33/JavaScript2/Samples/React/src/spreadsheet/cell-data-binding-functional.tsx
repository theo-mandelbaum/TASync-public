import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SpreadsheetComponent, SheetDirective, RowsDirective, CellsDirective, CellDirective, CellStyleModel, RowDirective, SheetsDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import { updateSampleSection } from '../common/sample-base';
import './spreadsheet.css';

/**
 * Cell Data Binding sample
 */

function CellDataBinding() {
    React.useEffect(() => {
        updateSampleSection();
    }, [])
    const boldCenter: CellStyleModel = { fontWeight: 'bold', textAlign: 'center' };
    const boldRight: CellStyleModel = { fontWeight: 'bold', textAlign: 'right' };
    const bold: CellStyleModel = { fontWeight: 'bold' };
    const currencyFormat: string = '$#,##0.00';
    return (
        <div className='control-pane'>
            <div className='control-section spreadsheet-control'>
                <SpreadsheetComponent showFormulaBar={false} showRibbon={false}>
                    <SheetsDirective>
                        <SheetDirective name='Monthly Budget' selectedRange='D13'>
                            <RowsDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='Category' style={boldCenter} ></CellDirective>
                                        <CellDirective value='Planned cost' style={boldCenter} ></CellDirective>
                                        <CellDirective value='Actual cost' style={boldCenter} ></CellDirective>
                                        <CellDirective value='Difference' style={boldCenter} ></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='Food' ></CellDirective>
                                        <CellDirective value='7000' format={currencyFormat} ></CellDirective>
                                        <CellDirective value='8120' format={currencyFormat} ></CellDirective>
                                        <CellDirective formula='=B2-C2' format={currencyFormat} ></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='Loan' ></CellDirective>
                                        <CellDirective value='1500' format={currencyFormat} ></CellDirective>
                                        <CellDirective value='1500' format={currencyFormat} ></CellDirective>
                                        <CellDirective formula='=B3-C3' format={currencyFormat} ></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='Medical' ></CellDirective>
                                        <CellDirective value='300' format={currencyFormat} ></CellDirective>
                                        <CellDirective value='0' format={currencyFormat} ></CellDirective>
                                        <CellDirective formula='=B4-C4' format={currencyFormat} ></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='Clothing' ></CellDirective>
                                        <CellDirective value='400' format={currencyFormat} ></CellDirective>
                                        <CellDirective value='140' format={currencyFormat} ></CellDirective>
                                        <CellDirective formula='=B5-C5' format={currencyFormat} ></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='Education' ></CellDirective>
                                        <CellDirective value='900' format={currencyFormat} ></CellDirective>
                                        <CellDirective value='750' format={currencyFormat} ></CellDirective>
                                        <CellDirective formula='=B6-C6' format={currencyFormat} ></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='Insurance' ></CellDirective>
                                        <CellDirective value='30' format={currencyFormat} ></CellDirective>
                                        <CellDirective value='30' format={currencyFormat} ></CellDirective>
                                        <CellDirective formula='=B7-C7' format={currencyFormat} ></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='Utilities' ></CellDirective>
                                        <CellDirective value='130' format={currencyFormat} ></CellDirective>
                                        <CellDirective value='160' format={currencyFormat} ></CellDirective>
                                        <CellDirective formula='=B8-C8' format={currencyFormat} ></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='Enterainment' ></CellDirective>
                                        <CellDirective value='500' format={currencyFormat} ></CellDirective>
                                        <CellDirective value='730' format={currencyFormat} ></CellDirective>
                                        <CellDirective formula='=B9-C9' format={currencyFormat} ></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='Maintainance' ></CellDirective>
                                        <CellDirective value='50' format={currencyFormat} ></CellDirective>
                                        <CellDirective value='70' format={currencyFormat} ></CellDirective>
                                        <CellDirective formula='=B10-C10' format={currencyFormat} ></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='Transportation' ></CellDirective>
                                        <CellDirective value='250' format={currencyFormat} ></CellDirective>
                                        <CellDirective value='400' format={currencyFormat} ></CellDirective>
                                        <CellDirective formula='=B11-C11' format={currencyFormat} ></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective value='Gifts/Donations' ></CellDirective>
                                        <CellDirective value='0' format={currencyFormat} ></CellDirective>
                                        <CellDirective value='100' format={currencyFormat} ></CellDirective>
                                        <CellDirective formula='=B12-C12' format={currencyFormat} ></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                                <RowDirective>
                                    <CellsDirective>
                                        <CellDirective index={2} value='Total Difference:' style={boldRight}></CellDirective>
                                        <CellDirective formula='=D2+D12' format={currencyFormat} style={bold}></CellDirective>
                                    </CellsDirective>
                                </RowDirective>
                            </RowsDirective>
                            <ColumnsDirective>
                                <ColumnDirective width={110}></ColumnDirective>
                                <ColumnDirective width={115}></ColumnDirective>
                                <ColumnDirective width={110}></ColumnDirective>
                                <ColumnDirective width={100}></ColumnDirective>
                            </ColumnsDirective>
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates a monthly budget for a home using planned versus actual costs with cell data binding
                    feature.
                </p>
            </div>
            <div id="description">
                <p>
                    The <code>Spreadsheet</code> component supports data binding for individual cells in a sheet. You can set value,
                    styles and format to a cell using following properties:
                    <ul>
                        <li><code>index</code> - Specify index for a cell.</li>
                        <li><code>value</code> - Specify cell value.</li>
                        <li><code>style</code> - Specify style for the cell.</li>
                        <li><code>format</code> - Apply number formatting for the cell.</li>
                    </ul>
                </p>
                <p>
                    More information about cell data binding feature can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/spreadsheet/data-binding/#cell-data-binding"> documentation</a> section.
                </p>
            </div>
        </div>
    )
}
export default CellDataBinding;