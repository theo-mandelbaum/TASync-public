import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { SampleBase } from '../common/sample-base';
import './header-template.css';
import * as dataSource from './datasource.json';
/**
 * Kanban Header Template sample
 */
export class HeaderTemplate extends SampleBase {
    data = extend([], dataSource.kanbanData, null, true);
    columnTemplate(props) {
        return (<div className="header-template-wrap">
                <div className={"header-icon e-icons " + props.keyField}></div>
                <div className="header-text">{props.headerText}</div>
            </div>);
    }
    render() {
        return (<div className='kanban-control-section'>
                <div className='control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent cssClass="kanban-header" id="kanban" keyField="Status" dataSource={this.data} cardSettings={{ contentField: "Summary", headerField: "Id" }}>
                            <ColumnsDirective>
                                <ColumnDirective headerText="To Do" keyField="Open" template={this.columnTemplate.bind(this)}/>
                                <ColumnDirective headerText="In Progress" keyField="InProgress" template={this.columnTemplate.bind(this)}/>
                                <ColumnDirective headerText="In Review" keyField="Review" template={this.columnTemplate.bind(this)}/>
                                <ColumnDirective headerText="Done" keyField="Close" template={this.columnTemplate.bind(this)}/>
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the header template feature of Kanban. The column headers of Kanban are customized with
                        text + icons in this demo.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The Kanban provides an option to customize its column header using the <code>columns</code> -&gt;
                        <code>template</code> property, which accepts the
                            string or HTML element`s ID value, which is used as the template for the header.
                    </p>
                </div>
            </div>);
    }
}
