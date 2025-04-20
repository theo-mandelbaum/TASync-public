import * as React from "react";
import { useEffect, useRef } from 'react';
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import * as dataSource from './datasource.json';
/**
 * Kanban Show / Hide Columns sample
 */
const ShowHideColumns = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let data = extend([], dataSource.kanbanData, null, true);
    let kanbanObj = useRef(null);
    let checkObj = useRef(null);
    let progressObj = useRef(null);
    let reviewObj = useRef(null);
    let closeObj = useRef(null);
    const onChange = (args) => {
        if (args.checked) {
            kanbanObj.current.showColumn(checkObj.current.element.getAttribute("data-id"));
        }
        else {
            kanbanObj.current.hideColumn(checkObj.current.element.getAttribute("data-id"));
        }
    };
    const onChangeProgress = (args) => {
        if (args.checked) {
            kanbanObj.current.showColumn(progressObj.current.element.getAttribute("data-id"));
        }
        else {
            kanbanObj.current.hideColumn(progressObj.current.element.getAttribute("data-id"));
        }
    };
    const onChangeReview = (args) => {
        if (args.checked) {
            kanbanObj.current.showColumn(reviewObj.current.element.getAttribute("data-id"));
        }
        else {
            kanbanObj.current.hideColumn(reviewObj.current.element.getAttribute("data-id"));
        }
    };
    const onChangeClose = (args) => {
        if (args.checked) {
            kanbanObj.current.showColumn(closeObj.current.element.getAttribute("data-id"));
        }
        else {
            kanbanObj.current.hideColumn(closeObj.current.element.getAttribute("data-id"));
        }
    };
    return (<div className="kanban-control-section">
            <div className="col-lg-9 control-section">
                <div className="control-wrapper">
                    <KanbanComponent id="kanban" keyField="Status" dataSource={data} ref={kanbanObj} cardSettings={{ contentField: "Summary", headerField: "Id" }}>
                        <ColumnsDirective>
                            <ColumnDirective headerText="To Do" keyField="Open"/>
                            <ColumnDirective headerText="In Progress" keyField="InProgress"/>
                            <ColumnDirective headerText="In Review" keyField="Review"/>
                            <ColumnDirective headerText="Done" keyField="Close"/>
                        </ColumnsDirective>
                    </KanbanComponent>
                </div>
            </div>
            <div className="col-lg-3 property-section">
                <PropertyPane title="Show / Hide Columns">
                    <table id="property" title="Show / Hide Columns" className="property-panel-table" style={{ width: "100%" }}>
                        <tbody>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "100%" }}>
                                    <CheckBoxComponent ref={checkObj} data-id="Open" checked={true} label="To Do" change={onChange.bind(this)}></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "100%" }}>
                                    <CheckBoxComponent ref={progressObj} data-id="InProgress" checked={true} label="In Progress" change={onChangeProgress.bind(this)}></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "100%" }}>
                                    <CheckBoxComponent ref={reviewObj} data-id="Review" checked={true} label="In Review" change={onChangeReview.bind(this)}></CheckBoxComponent>
                                </td>
                            </tr>
                            <tr style={{ height: "50px" }}>
                                <td style={{ width: "100%" }}>
                                    <CheckBoxComponent ref={closeObj} data-id="Close" checked={true} label="Done" change={onChangeClose.bind(this)}></CheckBoxComponent>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>

            <div id="action-description">
                <p>
                    This sample demonstrates how to control the visibility of Kanban
                    columns dynamically. Check or uncheck the checkboxes from the property
                    panel to show or hide the corresponding column.
                </p>
            </div>
            <div id="description">
                <p>
                    The Kanban provides an option to show or hide its columns dynamically
                    using the following public methods.
                </p>
                <ul>
                    <li>
                        <code>showColumn:</code> Makes the corresponding column visible
                        based on the specified ID.
                    </li>
                    <li>
                        <code>hideColumn:</code> Hides the corresponding column based on the
                        specified column ID.
                    </li>
                </ul>
            </div>
        </div>);
};
export default ShowHideColumns;
