import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Selection, Inject } from '@syncfusion/ej2-react-grids';
import { customerData, data } from './data';
import { updateSampleSection } from '../common/sample-base';
import './sample.css';
function MasterDetail() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    const key = null;
    const detail = [];
    let detailGrid;
    const names = ['AROUT', 'BERGS', 'BLONP', 'CHOPS', 'ERNSH'];
    const master = customerData.filter((e) => names.indexOf(e.CustomerID) !== -1);
    ;
    function rowselect(args) {
        let selRecord = args.data;
        let selecteMessage = document.getElementsByClassName('e-statustext')[0];
        let message = selecteMessage.querySelector('b');
        message.textContent = selRecord.ContactName;
        detailGrid.dataSource = data.filter((record) => record.CustomerName === selRecord.ContactName).slice(0, 5);
    }
    return (<div className='control-pane'>
            <div className='control-section'>
                <GridComponent dataSource={master} selectedRowIndex={2} rowSelected={rowselect.bind(this)}>
                    <ColumnsDirective>
                        <ColumnDirective field='ContactName' headerText='Customer Name' width='150'></ColumnDirective>
                        <ColumnDirective field='CompanyName' headerText='Company Name' width='150'></ColumnDirective>
                        <ColumnDirective field='Address' headerText='Address' width='150'/>
                        <ColumnDirective field='Country' headerText='Country' width='130'/>
                    </ColumnsDirective>
                    <Inject services={[Selection]}/>
                </GridComponent>

                <div className='e-statustext'> Showing orders of Customer:  <b></b></div>

                <GridComponent dataSource={detail} allowSelection={false} ref={grid => detailGrid = grid}>
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='100'></ColumnDirective>
                        <ColumnDirective field='Freight' headerText='Freight' width='100' format='C2' type='number'/>
                        <ColumnDirective field='ShipName' headerText='Ship Name' width='150'></ColumnDirective>
                        <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
                        <ColumnDirective field='ShipAddress' headerText='Ship Address' width='150'></ColumnDirective>
                    </ColumnsDirective>
                </GridComponent>
            </div>
            <div id='description'>
                <p>Master-Detail Grid is a use case scenario, in which the details of a Master Grid record, is viewed in
                    a separate Grid(Detail Grid) by clicking the particular row.
                </p>
                <p>The steps to achieve this scenario is as follows,</p>
                <ul>
                    <li> Get the selected record of Master Grid in the <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#rowselected">
                        rowSelected
                    </a></code> event.</li>
                    <li> Filter the data based on the selected record and bind the result to the Detail Grid`s <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#datasource">
                        dataSource
                    </a></code> property.</li>
                </ul>
                <p>The above demo is implemented as follows.</p>
                <ul>
                    <li>Created a React component named <code>DetailComponent(ej-griddetail)</code> to show details of selected row from Master Grid.</li>
                    <li>The <code>DetailComponent</code> has an <code>Input</code> property <code>key</code>, based on which
                        the data will be filtered and set to the Detail Grid. Here the <strong>CustomerID</strong> value is used as key value.</li>
                    <li>Created an another React component named <code>MasterComponent</code> which has Master Grid component with <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#rowselected">
                        rowSelected
                    </a></code> event bound to it.</li>
                    <li>The <code>MasterComponent</code> uses <code>DetailComponent</code> and it updates <code>key</code> property when a row is selected in the Master Grid.</li>
                    <li>Now based on the key value, the data is filtered and the Detail Grid is updated with the filtered data.</li>
                </ul>
                <p>Use <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#selectedrowindex">
                    selectedRowIndex
                </a></code> to select a row at the initial rendering.</p>
                <p style={{ fontWeight: 500 }}>Injecting Module</p>
                <p>
                    Grid component features are segregated into individual feature-wise modules. To implement this use case,
                    the selection feature need to be enabled and also we need to inject
                    <code>Selection</code> module into the <code>services</code>.
                </p>


            </div>
        </div>);
}
export default MasterDetail;
