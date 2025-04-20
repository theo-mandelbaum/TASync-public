import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
import './events.css';
/**
 * Kanban Events sample
 */
export class Events extends SampleBase {
    data = extend([], dataSource.kanbanData, null, true);
    onClear() {
        document.getElementById('EventLog').innerHTML = '';
    }
    OnCreate() {
        this.appendElement('Kanban <b>Load</b> event called<hr>');
    }
    OnActionBegin() {
        this.appendElement('Kanban <b>Action Begin</b> event called<hr>');
    }
    OnActionComplete() {
        this.appendElement('Kanban <b>Action Complete</b> event called<hr>');
    }
    OnActionFailure() {
        this.appendElement('Kanban <b>Action Failure</b> event called<hr>');
    }
    OnDataBinding() {
        this.appendElement('Kanban <b>Data Binding</b> event called<hr>');
    }
    OnDataBound() {
        this.appendElement('Kanban <b>Data Bound</b> event called<hr>');
    }
    OnCardRendered(args) {
        this.appendElement('Kanban - ' + args.data.Id + ' - <b>Card Rendered</b> event called<hr>');
    }
    OnQueryCellInfo() {
        this.appendElement('Kanban <b>Query Cell Info</b> event called<hr>');
    }
    OnCardClick(args) {
        this.appendElement('Kanban - ' + args.data.Id + ' - <b>Card Click</b> event called<hr>');
    }
    OnCardDoubleClick(args) {
        this.appendElement('Kanban - ' + args.data.Id + ' - <b>Card Double Click</b> event called<hr>');
    }
    OnDragStart() {
        this.appendElement('Kanban <b>Drag Start</b> event called<hr>');
    }
    OnDrag() {
        this.appendElement('Kanban <b>Drag</b> event called<hr>');
    }
    OnDragStop() {
        this.appendElement('Kanban <b>Drag Stop</b> event called<hr>');
    }
    appendElement(html) {
        let span = document.createElement('span');
        span.innerHTML = html;
        let log = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }
    render() {
        return (<div className='kanban-control-section'>
                <div className='col-lg-8 control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent id="kanban" keyField="Status" dataSource={this.data} swimlaneSettings={{ keyField: "Assignee" }} cardSettings={{ contentField: "Summary", headerField: "Id" }} created={this.OnCreate.bind(this)} actionBegin={this.OnActionBegin.bind(this)} actionComplete={this.OnActionComplete.bind(this)} actionFailure={this.OnActionFailure.bind(this)} dataBinding={this.OnDataBinding.bind(this)} dataBound={this.OnDataBound.bind(this)} cardRendered={this.OnCardRendered.bind(this)} queryCellInfo={this.OnQueryCellInfo.bind(this)} cardClick={this.OnCardClick.bind(this)} cardDoubleClick={this.OnCardDoubleClick.bind(this)} dragStart={this.OnDragStart.bind(this)} drag={this.OnDrag.bind(this)} dragStop={this.OnDragStop.bind(this)}>
                            <ColumnsDirective>
                                <ColumnDirective headerText="To Do" keyField="Open" allowToggle={true}/>
                                <ColumnDirective headerText="In Progress" keyField="InProgress" allowToggle={true}/>
                                <ColumnDirective headerText="Done" keyField="Close" allowToggle={true}/>
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>
                </div>
                <div className='col-lg-4 property-section'>
                    <PropertyPane title='Event Trace'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className='eventarea'>
                                            <span className='EventLog' id='EventLog'></span>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '30%' }}>
                                        <div className='evtbtn'>
                                            <ButtonComponent title='Clear' onClick={this.onClear.bind(this)}>Clear</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        The sample showcases the client-side events of JavaScript Kanban. For every action in a Kanban board,
                        corresponding
                        events will be displayed in the event tracer panel.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The demo is showcased to list-out the client-side events of Kanban. The events are useful to customize the
                        Kanban board
                        from the application end.
                    </p>
                    <p>The following events are bounded in this demo.</p>
                    <ol>
                        <li>Created</li>
                        <li>Action begin</li>
                        <li>Action complete</li>
                        <li>Action failure</li>
                        <li>Data binding</li>
                        <li>Data bound</li>
                        <li>Card rendered</li>
                        <li>Query cell info</li>
                        <li>Card click</li>
                        <li>Card double click</li>
                        <li>Drag start</li>
                        <li>Drag</li>
                        <li>Drag stop</li>
                    </ol>
                </div>
            </div>);
    }
}
