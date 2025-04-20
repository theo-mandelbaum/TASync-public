import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page, Group, LazyLoadGroup, Sort } from '@syncfusion/ej2-react-grids';
import { SampleBase } from '../common/sample-base';
import { createLazyLoadData } from './data';

export class LazyLoadGrouping extends SampleBase<{}, {}> {
    public groupOptions: Object = { enableLazyLoading: true, columns: ['ProductName', 'CustomerName'] };
    public lazyLoadData: Object = createLazyLoadData();

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <GridComponent dataSource={this.lazyLoadData} allowSorting={true} allowPaging={true} allowGrouping={true} groupSettings={this.groupOptions} height={400}>
                        <ColumnsDirective>
                            <ColumnDirective field='OrderID' headerText='Order ID' textAlign="Right" width='120' allowGrouping={false} ></ColumnDirective>
                            <ColumnDirective field='ProductName' headerText='Product Name' width='160' ></ColumnDirective>
                            <ColumnDirective field='ProductID' headerText='Product ID' textAlign="Right" width='120' ></ColumnDirective>
                            <ColumnDirective field='CustomerID' headerText='Customer ID' width='120' ></ColumnDirective>
                            <ColumnDirective field='CustomerName' headerText='Customer Name' width='160' ></ColumnDirective>
                        </ColumnsDirective>
                        <Inject services={[Page, Group, LazyLoadGroup, Sort]} />
                    </GridComponent>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the lazy load grouping feature of the Grid component.</p>
                </div>

                <div id="description">
                    <p>
                        The Lazy load grouping, allows the Grid to render only the initial level caption rows in the collapsed state while grouping.
                        The child rows of each caption will render only when we expand the captions.
                        To enable lazy load grouping, set <code><a target="_blank" className="code"
                            href="https://ej2.syncfusion.com/react/documentation/api/grid/groupSettings/#enablelazyloading">
                            groupSettings-&gt;enableLazyLoading</a></code> property as true.
                    </p>
                    <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                    <p>
                        Grid features are segregated into individual feature-wise modules.
                        To use lazy load grouping feature, we need to inject
                        <code>LazyLoadGroup</code>module into the <code>services</code>.
                    </p>
                </div>
            </div>
        )
    }
}