import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Sort, Inject, Filter } from '@syncfusion/ej2-react-grids';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
function LoadingAnimation() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    const data = new DataManager({ url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders', adaptor: new ODataV4Adaptor });
    let gridInstance;
    const indicatortypes = [
        { id: 'Shimmer', name: 'Shimmer' },
        { id: 'Spinner', name: 'Spinner' }
    ];
    const fields = { text: 'name', value: 'id' };
    let indicatorDropDown;
    function indicatorChange(e) {
        if (indicatorDropDown.value === 'Shimmer') {
            gridInstance.loadingIndicator.indicatorType = 'Shimmer';
            gridInstance.refresh();
        }
        else {
            gridInstance.loadingIndicator.indicatorType = 'Spinner';
            gridInstance.refresh();
        }
    }
    ;
    return (<div className='control-pane'>
            <div className='control-section'>
                <div style={{ paddingBottom: '20px' }}>
                    <div style={{ display: 'inline-block', paddingRight: '10px' }}>
                        <div style={{ display: 'inline-block', paddingRight: '10px' }}>
                            <span>
                                Indicator Type
                            </span>
                        </div>
                        <div style={{ display: 'inline-block', paddingRight: '10px' }}>
                            <DropDownListComponent dataSource={indicatortypes} value="Shimmer" change={indicatorChange.bind(this)} fields={fields} ref={(indicateDropDown) => { indicatorDropDown = indicateDropDown; }}/>
                        </div>
                    </div>
                </div>
                <GridComponent id="Grid" dataSource={data} ref={grid => gridInstance = grid} allowPaging={true} pageSettings={{ pageCount: 3 }} loadingIndicator={{ indicatorType: 'Shimmer' }} allowFiltering={true} allowSorting={true}>
                    <ColumnsDirective>
                        <ColumnDirective field='OrderID' headerText='Order ID' width='130' textAlign='Right'></ColumnDirective>
                        <ColumnDirective field='CustomerID' headerText='Customer ID' width='150'></ColumnDirective>
                        <ColumnDirective field='EmployeeID' headerText='Employee ID' width='100' textAlign='Right'/>
                        <ColumnDirective field='Freight' headerText='Freight' width='100' format='C2' textAlign='Right'/>
                        <ColumnDirective field='ShipCountry' headerText='Ship Country' width='150'></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[Page, Sort, Filter]}/>
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample shows the loading indicator while grid loading and refreshing when using remote data. In this sample, you can change the loading indicators from the properties panel.
                </p>
            </div>
            <div id='description'>
                <p>
                    When performing the grid actions (like sorting, filtering, grouping, and more), the loading indicator is shown in the in-between time the processed data is fetched and bound to the grid.
                </p>
                <p>The Grid supports the following loading indicator types. They are: </p>
                <ul>
                    <li><code>Spinner</code></li>
                    <li><code>Shimmer</code></li>
                </ul>
                <p>Use the loading indicator by setting the <code>loadingIndicator.indicatorType</code> property as <code>Spinner</code> or <code>Shimmer</code>. The default value of the indicatorType is <code>Spinner</code>.</p>
                <p> In this demo, the <code>Shimmer</code> type is initially enabled. If you want to use the default value of the loading indicator, use the dropdown to change it.
                </p>
            </div>
        </div>);
}
export default LoadingAnimation;
