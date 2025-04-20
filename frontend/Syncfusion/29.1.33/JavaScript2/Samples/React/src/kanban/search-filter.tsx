import * as ReactDOM from 'react-dom';
import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { DropDownListComponent, SelectEventArgs } from '@syncfusion/ej2-react-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { TextBoxComponent, InputEventArgs } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import './search-filter.css';
import * as dataSource from './datasource.json';
import { PropertyPane } from '../common/property-pane';

/**
 * Kanban Search Filter sample
 */
export class SearchFilter extends SampleBase<{}, {}> {
    private data: Object[] = extend([], (dataSource as { [key: string]: Object }).kanbanData, null, true) as Object[];
    private kanbanObj: KanbanComponent;
    private priorityObj: DropDownListComponent;
    private textBoxObj: TextBoxComponent;
    private statusObj: DropDownListComponent;
    private priorityData: string[] = ['None', 'High', 'Normal', 'Low'];
    private statusData: { [key: string]: Object }[] = [
        { id: 'None', value: 'None' },
        { id: 'To Do', value: 'Open' },
        { id: 'In Progress', value: 'InProgress' },
        { id: 'Testing', value: 'Testing' },
        { id: 'Done', value: 'Close' }
    ];
    private value: string = 'None';
    private fields: Object = { text: 'id', value: 'value' };
    private prioritySelect(args: SelectEventArgs): void {
        let filterQuery: Query = new Query();
        if (args.itemData.value !== 'None') {
            filterQuery = new Query().where('Priority', 'equal', args.itemData.value);
        }
        this.statusObj.value = 'None';
        this.kanbanObj.query = filterQuery;
    };
    private statusSelect(args: SelectEventArgs): void {
        let filterQuery: Query = new Query();
        if (args.itemData.value !== 'None') {
            filterQuery = new Query().where('Status', 'equal', args.itemData.value);
        }
        this.priorityObj.value = 'None';
        this.kanbanObj.query = filterQuery;
    };
    private searchClick(e: InputEventArgs): void {
        let searchValue: string = e.value;
        let searchQuery: Query = new Query();
        if (searchValue !== '') {
            searchQuery = new Query().search(searchValue, ['Id', 'Summary'], 'contains', true);
        }
        this.kanbanObj.query = searchQuery;
    };
    private resetClick(): void {
        (document.getElementById('search_text') as HTMLInputElement).value = '';
        this.reset();
    };
    private onFocus(e: any): void {
        if ((e.target as HTMLInputElement).value === '') {
            this.reset();
        }
    }
    private reset(): void {
        this.priorityObj.value = 'None';
        this.statusObj.value = 'None';
        this.kanbanObj.query = new Query();
    }
    public render(): JSX.Element {
        return (
            <div className='kanban-control-section'>
                <div className='col-lg-9 control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent id="kanban" ref={(kanban) => { this.kanbanObj = kanban }} keyField="Status" dataSource={this.data}
                            cardSettings={{ contentField: "Summary", headerField: "Id" }} swimlaneSettings={{ keyField: "Assignee" }} >
                            <ColumnsDirective>
                                <ColumnDirective headerText="To Do" keyField="Open" />
                                <ColumnDirective headerText="In Progress" keyField="InProgress" />
                                <ColumnDirective headerText="Testing" keyField="Testing" />
                                <ColumnDirective headerText="Done" keyField="Close" />
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>
                </div>
                <div className="col-lg-3 property-section" id="searchFilterProperty">
                    <PropertyPane title="Filtering">
                        <table className="e-filter-table">
                            <tbody>
                            <tr>
                                <td className="e-filter-label">
                                    <div>Priority</div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent id='priority_filter' ref={(kanban) => { this.priorityObj = kanban; }} dataSource={this.priorityData} select={this.prioritySelect.bind(this)} value={this.value} placeholder='Select a priority'></DropDownListComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="e-filter-label">
                                    <div>Status</div>
                                </td>
                                <td>
                                    <DropDownListComponent id='status_filter' ref={(kanban) => { this.statusObj = kanban; }} dataSource={this.statusData} select={this.statusSelect.bind(this)} value={this.value} fields={this.fields} placeholder='Select a status'></DropDownListComponent>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <p className="property-panel-header" style={{ width: '100%', padding: '22px 0 0 0' }}>Searching</p>
                        <div className="filtering property-panel-content">
                            <table className="e-filter-table">
                                <tbody>
                                <tr>
                                    <td>
                                        <div>
                                        <TextBoxComponent id="search_text" ref={(kanban) => { this.textBoxObj = kanban; }} showClearButton={true} placeholder="Enter search text" onFocus={this.onFocus.bind(this)} input={this.searchClick.bind(this)}/>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div className='e-reset-button'>
                                <ButtonComponent id='reset_filter' className="e-btn" onClick={this.resetClick.bind(this)}>Reset</ButtonComponent>
                            </div>
                        </div>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the filtering and searching actions of Kanban. In this sample, select the key value
                        from drop down list to display the filtered data in Kanban board. Type in search box to be searched in
                        header/content and display the search result
                        in a board.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The Kanban provides an option to filter or search the cards and displayed on Kanban board using <code>query</code> property.
                    </p>
                    <ul>
                        <li>In query, <code>where</code> used for filtering the Kanban cards.</li>
                        <li>In query, <code>search</code> is used for searching the cards.</li>
                    </ul>
                </div>
            </div>
        );
    }
}