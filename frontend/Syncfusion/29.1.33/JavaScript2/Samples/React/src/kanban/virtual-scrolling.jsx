import * as React from "react";
import { addClass } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { SampleBase } from '../common/sample-base';
import './virtual-scrolling.css';
/**
 * Kanban Virtual Scrolling sample
 */
export class VirtualScrolling extends SampleBase {
    generateKanbanDataVirtualScrollData() {
        const kanbanData = [];
        const BUG_TASKS = [
            'UI component not displaying images in IE browser',
            'Button not responding on hover action',
            'Text overlapping in mobile view',
            'Dropdown menu not functioning properly',
            'Form validation error',
            'Alignment issue in tables',
            'Column not loading completely',
            'Broken UI Designs',
            'Font size inconsistency',
            'UI element misaligned on scroll'
        ];
        const FEATURE_TASKS = [
            'Implement new user registration flow',
            'Add pagination to search results',
            'Improve accessibility for visually impaired users',
            'Create custom dashboard for users',
            'Develop user profile editing functionality',
            'Integrate with third-party API for weather data',
            'Implement social media sharing for articles',
            'Add support for multiple languages',
            'Create onboarding tutorial for new users',
            'Implement push notifications for mobile app'
        ];
        const EPIC_TASKS = [
            'Revamp UI design for entire application',
            'Develop mobile application for iOS and Android',
            'Create API for integration with external systems',
            'Implement machine learning algorithms for personalized recommendations',
            'Upgrade database infrastructure for scalability',
            'Integrate with payment gateway for subscription model',
            'Develop chatbot for customer support',
            'Implement real-time collaboration features for team projects',
            'Create analytics dashboard for administrators',
            'Introduce gamification elements to increase user engagement',
        ];
        const assignee = ['Andrew Fuller', 'Janet Leverling', 'Steven walker', 'Robert King', 'Margaret hamilt', 'Nancy Davloio', 'Margaret Buchanan', 'Laura Bergs', 'Anton Fleet', 'Jack Kathryn', 'Martin Davolio', 'Fleet Jack'];
        const status = ['Open', 'InProgress', 'Review', 'Testing', 'Close'];
        const priority = ['Ultra-Critical', 'Critical', 'High', 'Normal', 'Low'];
        const types = ['Epic', 'Bug', 'Story'];
        const tagsField = ['Feature', 'Bug', 'Enhancement', 'Documentation', 'Automation', 'Mobile', 'Web', 'iOS', 'Safari', 'Chrome', 'Firefox', 'Manual Testing'];
        const storyPoints = ['1', '2', '3', '3.5', '4', '4.5', '5', '6', '7.5', '8'];
        const count = 600000;
        for (let a = 500000, id = 500000; a < count; a++) {
            const typeValue = types[Math.floor(Math.random() * types.length)];
            const summary = typeValue === 'Bug' ? BUG_TASKS[Math.floor(Math.random() * BUG_TASKS.length)] :
                typeValue === 'Story' ? FEATURE_TASKS[Math.floor(Math.random() * FEATURE_TASKS.length)] :
                    EPIC_TASKS[Math.floor(Math.random() * EPIC_TASKS.length)];
            kanbanData.push({
                Id: id,
                Type: typeValue,
                Priority: priority[Math.floor(Math.random() * priority.length)],
                Status: status[Math.floor(Math.random() * status.length)],
                Assignee: assignee[Math.floor(Math.random() * assignee.length)],
                StoryPoints: storyPoints[Math.floor(Math.random() * storyPoints.length)],
                Tags: [tagsField[Math.floor(Math.random() * tagsField.length)], tagsField[Math.floor(Math.random() * tagsField.length)]],
                Title: 'Task ' + id,
                Summary: summary,
            });
            id++;
        }
        return kanbanData;
    }
    onCardRendered(args) {
        let val = (args.data).Priority.toLowerCase();
        addClass([args.element], val);
    }
    cardTemplate(props) {
        return (<div><div className='e-card-header'>
            <div className='e-card-header-caption'>
                <div className='e-text e-card-header-title e-tooltip-text'>
                    {props.Summary}
                </div>
            </div>
        </div>
            <div className='e-card-footer'>
                <div className='e-link-wrapper '>
                    <span className={'e-' + props.Type.toLowerCase()} title={props.Type}></span>
                    <a className='e-custom-link'>
                        <span className='e-project'>TASK- </span>
                        <span className='e-card-footer-text'>{props.Id}</span>
                    </a>
                </div>
                <div className='e-custom-wrapper'>
                    <div className='e-story-points-wrapper'>
                        <div className='e-story-points' title='Story Point'>
                            {props.StoryPoints}
                        </div>
                    </div>
                    <div className={'e-priority e-' + props.Priority.toLowerCase() + '-icon'} title={props.Priority}></div>
                    <div className='e-card-avatar' title={props.Assignee}> {props.Assignee.match(/\b(\w)/g).join('').toUpperCase()}</div>
                </div>
            </div></div>);
    }
    render() {
        return (<div className='kanban-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                        <KanbanComponent id="KanbanVirtualScrolling" enableVirtualization={true} keyField="Status" dataSource={this.generateKanbanDataVirtualScrollData()} enableTooltip={true} cardSettings={{ headerField: "Id", selectionType: 'Multiple', template: this.cardTemplate.bind(this) }} dialogSettings={{
                fields: [
                    { key: 'Id', text: 'ID', type: 'TextBox' },
                    { key: 'Status', text: 'Status', type: 'DropDown' },
                    { key: 'StoryPoints', text: 'Story Points', type: 'Numeric' },
                    { key: 'Summary', text: 'Summary', type: 'TextArea' }
                ]
            }} cardRendered={this.onCardRendered.bind(this)}>
                            <ColumnsDirective>
                                <ColumnDirective headerText="To Do" keyField="Open"/>
                                <ColumnDirective headerText="In Progress" keyField="InProgress"/>
                                <ColumnDirective headerText="Code Review" keyField="Review"/>
                                <ColumnDirective headerText="Done" keyField="Close"/>
                            </ColumnsDirective>
                        </KanbanComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the Kanban board with the virtual scrolling feature. It configures a large
                        dataset as the data source, allowing smooth navigation and rendering of a significant amount of data
                        while scrolling through Kanban columns.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The Kanban board UI virtualization feature allows for rendering the column cards that are visible within
                        the viewport, without buffering the entire data source. To enable virtualization, you can set
                        the <code>enableVirtualization</code> property to true.
                    </p>
                    <p>
                        In this demo, a dataset of 100K items has been configured for the <a href="https://ej2.syncfusion.com/react/documentation/api/kanban/#datasource"><code>dataSource</code></a>
 property. Despite the large
                        dataset, the Kanban board efficiently handles the rendering and interaction, ensuring a smooth user
                        experience. Users can seamlessly navigate and interact with the Kanban board, even with such a significant amount of data.
                    </p>
                </div>
            </div>);
    }
}
