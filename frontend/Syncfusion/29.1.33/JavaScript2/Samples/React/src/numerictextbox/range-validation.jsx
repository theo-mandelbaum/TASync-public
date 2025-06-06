import * as React from 'react';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './sample.css';
export class Range extends SampleBase {
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
          <div className=' col-lg-8'>
            <div className="content-wrapper format-wrapper sample-numeric">
              <div className="control-label">Numeric TextBox
              </div>
              {/* Render numeric textbox with restriction in entering values */}
              <NumericTextBoxComponent min={10} max={100} value={15} ref={numeric => this.numericInstance = numeric}>
              </NumericTextBoxComponent>
            </div>
          </div>
          <div className='col-lg-4 property-section'>
            <PropertyPane title='Properties'>
              <table id="property" title="Properties" className='property-panel-table' style={{ width: '100%' }}>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>Min Value </div>
                  </td>
                  <td style={{ width: '70%', paddingRight: '10px' }}>
                    <div>
                      <input id="min" type="number" inputMode="numeric" className="form-control"/>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>Max Value </div>
                  </td>
                  <td style={{ width: '70%', paddingRight: '10px' }}>
                    <div>
                      <input id="max" type="number" inputMode="numeric" className="form-control"/>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '30%' }}>
                    <div>Increment Step </div>
                  </td>
                  <td style={{ width: '70%', paddingRight: '10px' }}>
                    <div>
                      <input id="step" type="number" inputMode="numeric" max={100} min={0} className="form-control"/>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <div>
                      <button id="buttonApply" className="e-btn-small btn btn-primary" style={{ marginBottom: '10px' }} onClick={this.applyRange.bind(this)}>Apply</button>
                    </div>
                  </td>
                </tr>
              </table>
            </PropertyPane>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the range validation functionalities of the Numeric TextBox. Change the min, max and step values and click on apply button to change the property values in Numeric TextBox.</p>
        </div>
        
        <div id="description">
          <p>
            The NumericTextBox has the options to restrict the input value between a specific range using the <a href="https://ej2.syncfusion.com/react/documentation/api/numerictextbox#min" target="_blank">min</a>, <a href="https://ej2.syncfusion.com/react/documentation/api/numerictextbox#max" target="_blank">max</a>, and <a href="https://ej2.syncfusion.com/react/documentation/api/numerictextbox#strictmode" target="_blank">strictMode</a> properties.
          </p>
          <ul>
            <li>
              When you enable the <b>strictMode</b> property, the value will automatically change within a range on passing
              the out-of-range values.
            </li>
            <li>
              When you disable the <b>strictMode</b> property, the NumericTextBox component allows the out-of-range value with the highlighted
              textbox to indicate the given value is wrong.
            </li>
          </ul>
          <p>
            In this demo, numeric textbox is restricted between 10 to 100 through the min and max properties. So you can enter only the value between
            this range.
          </p>
          <p>
            More information on the range validation configuration can be found in the <a href="https://ej2.syncfusion.com/react/documentation/numerictextbox/getting-started/#range-validation" target="_blank">documentation section</a>.
          </p>
        </div>
      </div>);
    }
    numericInstance;
    rendereComplete() {
        /**custom render complete function */
        document.getElementById('min').value = '10';
        document.getElementById('max').value = '100';
        document.getElementById('step').value = '1';
    }
    applyRange() {
        let min = parseFloat(document.getElementById('min').value);
        let max = parseFloat(document.getElementById('max').value);
        let step = parseFloat(document.getElementById('step').value);
        this.numericInstance.min = min;
        this.numericInstance.max = max;
        this.numericInstance.step = isNaN(step) ? 1 : step;
    }
}
