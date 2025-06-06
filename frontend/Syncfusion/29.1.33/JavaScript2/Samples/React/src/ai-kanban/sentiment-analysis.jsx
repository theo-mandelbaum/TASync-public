import * as React from 'react';
import { SampleBase } from '../common/sample-base';
export class SentimentAnalysis extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-kanban/images/sentiment-analysis.gif'} width='100%' height='100%'></img>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the integration of AI to automatically generate emoticon expressions based on customer
                        feedback, which are then updated in the Syncfusion React Kanban Board.
                    </p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank' href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>

                <div id="description">
                    <p>
                        In this sample, users can utilize the following AI-powered feature:
                    </p>
                    <p><strong>Analyze Customer Sentiments:</strong> By clicking the "Analyze Customer Sentiments" button, AI will
                        automatically generate emoticon expressions based on the customer feedback for delivered items and update them
                        in the Syncfusion React Kanban Board.</p>
                </div>
            </div>);
    }
}
