import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Signature, SignatureComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent, Button } from '@syncfusion/ej2-react-buttons';
import { getComponent, closest } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import './default.css';

export class Default extends SampleBase<{}, {}> {
  public signature: SignatureComponent;
  constructor(props) {
    super(props);

    
  }

  public clrBtnCreated() {
    document.getElementById('signclear').addEventListener('click', this.clrBtnClick);
  }

  public saveBtnCreated() {
    document.getElementById('signsave').addEventListener('click', this.saveBtnClick);
  }

  public saveBtnClick() {
    let signature: Signature = getComponent(document.getElementById('signature'), 'signature');
    signature.save();
  }

  public clrBtnClick() {
    let signature: Signature = getComponent(document.getElementById('signature'), 'signature');
    let saveBtn: Button =  getComponent(document.getElementById("signsave"), 'btn');
    let clrBtn: Button =  getComponent(document.getElementById("signclear"), 'btn');
    signature.clear();
    if (signature.isEmpty()) {
      saveBtn.disabled = true;
      clrBtn.disabled = true;
    }
  }

  public change() {
    let signature: Signature = getComponent(document.getElementById('signature'), 'signature');
    let saveBtn: Button =  getComponent(document.getElementById("signsave"), 'btn');
    let clrBtn: Button =  getComponent(document.getElementById("signclear"), 'btn');
    if (!signature.isEmpty()) {
      saveBtn.disabled = false;
      clrBtn.disabled = false;
    }
  }

  render() {
    return (
      <div className='control-pane'>
        <div className="col-lg-12 control-section">
          <div id="signature-control">
            <div className='e-sign-heading'>
              <span id="signdescription">Sign below</span>
              <span className="e-btn-options">
                <ButtonComponent id="signsave" cssClass='e-primary e-sign-save' created={this.saveBtnCreated.bind(this)} disabled={true}>SAVE</ButtonComponent>
                <ButtonComponent id="signclear" cssClass='e-primary e-sign-clear' created={this.clrBtnCreated.bind(this)} disabled={true}>CLEAR</ButtonComponent>
              </span>
            </div>
            <SignatureComponent id="signature" change={this.change.bind(this)}></SignatureComponent>
          </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the basic rendering of the <b>Signature</b> component with the save and clear option.</p>
        </div>
        <div id="description">
          <p>The <code>Signature</code> component is a user interface to draw the signature digitally. The <code>Signature</code> component is displayed as a container where end-user can sign their name as a verified signature inside the container.</p>
          <p>In this sample, you can draw the signature. Use the <b>Save</b> button to store your signature as an image file, and the <b>Clear</b> button to clear the signature.</p>
          <p>
              More information about Signature can be found in this
              <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/signature/getting-started"> documentation section</a>.
          </p>
        </div>
      </div>
    )
  }
}
