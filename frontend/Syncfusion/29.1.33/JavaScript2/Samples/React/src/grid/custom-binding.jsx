import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Group, Sort, Inject } from '@syncfusion/ej2-react-grids';
import { SampleBase } from '../common/sample-base';
import { Ajax } from '@syncfusion/ej2-base';
export class CustomBinding extends SampleBase {
    orderService = new OrderService();
    grid;
    data;
    rendereComplete() {
        let state = { skip: 0, take: 10 };
        this.dataStateChange(state);
    }
    dataStateChange(state) {
        this.orderService.execute(state).then((gridData) => { this.grid.dataSource = gridData; });
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <GridComponent dataSource={this.data} ref={g => this.grid = g} allowPaging={true} allowSorting={true} pageSettings={{ pageCount: 4, pageSize: 10 }} allowGrouping={true} dataStateChange={this.dataStateChange.bind(this)}>
            <ColumnsDirective>
              <ColumnDirective field='OrderID' headerText='Order ID' width='120' allowGrouping={false}></ColumnDirective>
              <ColumnDirective field='CustomerID' headerText='Customer Name' width='150'></ColumnDirective>
              <ColumnDirective field='ShipName' headerText='Ship Name' width='120'/>
              <ColumnDirective field='ShipCity' headerText='Ship City' width='150'></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, Group, Sort]}/>
          </GridComponent>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the usage of grid with AJAX. Paging, sorting and grouping can be performed in this sample.</p>
        </div>
        <div id="description">
        <p>
            Grid can be bound with data from external API.
            In this demo, the external data communication is done using AJAX and the grid is resolved with the response data. 
            When performing grid actions such as paging, sorting and grouping etc. 
            the <code>dataStateChange</code> event will be triggered and we need perform the request and assign the new grid data. 
        </p>
        <p>
            In this demo, simply select the paging and click the column header to sort a column, multiple sorting is also enabled.
            To group a specify column, drag and drop the column in the group drop area.
            To enable paging, sorting and grouping, set the <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#allowpaging">
            allowPaging
            </a></code> , <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#allowsorting">
            allowSorting </a></code> and <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#allowgrouping">
            allowGrouping</a></code> as true.
        </p>
        <p style={{ fontWeight: 500 }}>Injecting Module:</p>
        <p>
            Grid component features are segregated into individual feature-wise modules. To use the paging ,sorting and grouping features,
            inject the <code>Page</code>, <code>Sort</code> and <code>Group</code> respectively into the 
            <code>services</code>.
        </p>
    </div>
      </div>);
    }
}
export class OrderService {
    ajax = new Ajax({
        type: 'GET', mode: true,
        onFailure: (e) => { return false; }
    });
    BASE_URL = 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders';
    execute(state) {
        return this.getData(state);
    }
    getData(state) {
        const pageQuery = `$skip=${state.skip}&$top=${state.take}`;
        let sortQuery = '';
        if ((state.sorted || []).length) {
            sortQuery = `&$orderby=` + (state).sorted.map((obj) => {
                return obj.direction === 'descending' ? `${obj.name} desc` : obj.name;
            }).reverse().join(',');
        }
        this.ajax.url = `${this.BASE_URL}?${pageQuery}${sortQuery}&$count=true`;
        return this.ajax.send().then((response) => {
            let data = JSON.parse(response);
            return { result: data['value'], count: parseInt(data['@odata.count'], 10) };
        });
    }
}
