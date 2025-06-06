import * as React from 'react';
import { SampleBase } from '../common/sample-base';
export class TaskRecommendation extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-kanban/images/task-recommendation.gif'} width='100%' height='100%'></img>
                </div>
                <div id="action-description">
                    <p>
                        This sample showcases the integration of AI to automatically generate task segments based on the provided project details and includes them within the Syncfusion React Kanban component.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank' href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>

                <div id="description">
                    <p>
                        In this sample, the following AI-powered features are accessible:
                    </p>
                    <ul>
                        <li>Provide the project title and task count, and based on this input, AI will suggest tasks and generate them within the Kanban board.</li>
                        <li>Additionally, an option is available to view the backlog items in a Grid.</li>
                    </ul>
                </div>
            </div>);
    }
}
