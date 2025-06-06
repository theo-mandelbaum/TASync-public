import * as React from 'react';
import { SampleBase } from '../common/sample-base';
export class WeatherPrediction extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <div className='control-section'>
                    <img src={'src/ai-maps/images/weather-prediction.gif'} width='100%' height='100%'></img>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the integration of AI for automatically forecasting weather conditions in the United
                        States for the next five days using marker templates in the Syncfusion React Maps component.</p>
                    <p>To explore this and more Syncfusion React Smart AI integrations locally, check out our <a target='_blank' href='https://github.com/syncfusion/smart-ai-samples/tree/master/react/' aria-label="Navigate to explore the syncfusion React AI Demos repository">GitHub
                        repository</a>.</p>
                </div>

                <div id="description">
                    <p>
                        In this sample, users can view weather predictions for the next five days provided by AI. The data is then
                        converted into a source for the <code>markerSettings</code> property, which renders the weather forecasts as
                        marker templates in the Syncfusion React Maps component.
                    </p>
                </div>
            </div>);
    }
}
