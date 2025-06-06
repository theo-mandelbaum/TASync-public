import * as React from "react";
import { useEffect } from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
import './events.css';
/**
 * Kanban Events sample
 */
const Events = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let data = extend([], dataSource.kanbanData, null, true);
    const onClear = () => {
        document.getElementById("EventLog").innerHTML = "";
    };
    const OnCreate = () => {
        appendElement("Kanban <b>Load</b> event called<hr>");
    };
    const OnActionBegin = () => {
        appendElement("Kanban <b>Action Begin</b> event called<hr>");
    };
    const OnActionComplete = () => {
        appendElement("Kanban <b>Action Complete</b> event called<hr>");
    };
    const OnActionFailure = () => {
        appendElement("Kanban <b>Action Failure</b> event called<hr>");
    };
    const OnDataBinding = () => {
        appendElement("Kanban <b>Data Binding</b> event called<hr>");
    };
    const OnDataBound = () => {
        appendElement("Kanban <b>Data Bound</b> event called<hr>");
    };
    const OnCardRendered = (args) => {
        appendElement("Kanban - " +
            args.data.Id +
            " - <b>Card Rendered</b> event called<hr>");
    };
    const OnQueryCellInfo = () => {
        appendElement("Kanban <b>Query Cell Info</b> event called<hr>");
    };
    const OnCardClick = (args) => {
        appendElement("Kanban - " +
            args.data.Id +
            " - <b>Card Click</b> event called<hr>");
    };
    const OnCardDoubleClick = (args) => {
        appendElement("Kanban - " +
            args.data.Id +
            " - <b>Card Double Click</b> event called<hr>");
    };
    const OnDragStart = () => {
        appendElement("Kanban <b>Drag Start</b> event called<hr>");
    };
    const OnDrag = () => {
        appendElement("Kanban <b>Drag</b> event called<hr>");
    };
    const OnDragStop = () => {
        appendElement("Kanban <b>Drag Stop</b> event called<hr>");
    };
    const appendElement = (html) => {
        let span = document.createElement("span");
        span.innerHTML = html;
        let log = document.getElementById("EventLog");
        log.insertBefore(span, log.firstChild);
    };
    return (<div className="kanban-control-section">
            <div className="col-lg-8 control-section">
                <div className="control-wrapper">
                    <KanbanComponent id="kanban" keyField="Status" dataSource={data} swimlaneSettings={{ keyField: "Assignee" }} cardSettings={{ contentField: "Summary", headerField: "Id" }} created={OnCreate.bind(this)} actionBegin={OnActionBegin.bind(this)} actionComplete={OnActionComplete.bind(this)} actionFailure={OnActionFailure.bind(this)} dataBinding={OnDataBinding.bind(this)} dataBound={OnDataBound.bind(this)} cardRendered={OnCardRendered.bind(this)} queryCellInfo={OnQueryCellInfo.bind(this)} cardClick={OnCardClick.bind(this)} cardDoubleClick={OnCardDoubleClick.bind(this)} dragStart={OnDragStart.bind(this)} drag={OnDrag.bind(this)} dragStop={OnDragStop.bind(this)}>
                        <ColumnsDirective>
                            <ColumnDirective headerText="To Do" keyField="Open" allowToggle={true}/>
                            <ColumnDirective headerText="In Progress" keyField="InProgress" allowToggle={true}/>
                            <ColumnDirective headerText="Done" keyField="Close" allowToggle={true}/>
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
            <div className="col-lg-4 property-section">
                <PropertyPane title="Event Trace">
                    <table id="property" title="Properties" className="property-panel-table" style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="eventarea">
                                        <span className="EventLog" id="EventLog"></span>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "30%" }}>
                                    <div className="evtbtn">
                                        <ButtonComponent title="Clear" onClick={onClear.bind(this)}>
                                            Clear
                                        </ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
            <div id="action-description">
                <p>
                    The sample showcases the client-side events of JavaScript Kanban. For
                    every action in a Kanban board, corresponding events will be displayed
                    in the event tracer panel.
                </p>
            </div>
            <div id="description">
                <p>
                    The demo is showcased to list-out the client-side events of Kanban.
                    The events are useful to customize the Kanban board from the
                    application end.
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
};
export default Events;
