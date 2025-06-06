import * as React from 'react';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import './precision.css';
export class Precision extends SampleBase {
    componentDidMount() {
        if (document.getElementById('right-pane')) {
            document.getElementById('right-pane')?.addEventListener('scroll', this.hideTooltipOnScroll);
        }
    }
    componentWillUnmount() {
        if (document.getElementById('right-pane')) {
            document.getElementById('right-pane')?.removeEventListener('scroll', this.hideTooltipOnScroll);
        }
    }
    hideTooltipOnScroll = () => {
        const tooltipElement = document.querySelector('.e-rating-tooltip');
        if (tooltipElement && Browser.isDevice) {
            tooltipElement.style.display = 'none';
        }
    };
    render() {
        return (<div className='control-pane'>
                <div id="precision-rating-control">
                    <div className="rating-content">
                        <label>Full</label><br />
                        <RatingComponent id='rating1' value={3.0}></RatingComponent>
                    </div>
                    <div className="rating-content">
                        <label>Half</label><br />
                        <RatingComponent id='rating2' precision='Half' value={2.5}></RatingComponent>
                    </div>
                    <div className="rating-content">
                        <label>Quarter</label><br />
                        <RatingComponent id='rating3' precision='Quarter' value={2.75}></RatingComponent>
                    </div>
                    <div className="rating-content">
                        <label>Exact</label><br />
                        <RatingComponent id='rating4' precision='Exact' value={2.3}></RatingComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates the different precision types supported in the Angular Rating component.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The <code>precision</code> property used to change the type of precision to <code>Quarter</code>, <code>Half</code>, <code>Full</code> and <code>Exact</code>.
                    </p>
                </div>
          </div>);
    }
}
