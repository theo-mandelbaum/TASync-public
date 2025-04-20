import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { MessageComponent } from '@syncfusion/ej2-react-notifications';
import './template.css';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
export class Template extends SampleBase {
    msgTemplate;
    showBtn;
    showClick() {
        this.msgTemplate.visible = true;
        this.showBtn.element.classList.add('msg-hidden');
    }
    dismissClick() {
        this.msgTemplate.visible = false;
    }
    closed() {
        this.showBtn.element.classList.remove('msg-hidden');
    }
    contentTemplate() {
        return (<div><h1>Merged pull request</h1>
                <p>Pull request #41 merged after a successful build</p>
                <ButtonComponent id='commitBtn' cssClass='e-link' content='View commit'></ButtonComponent>
                <ButtonComponent id='closeBtn' cssClass='e-link' content='Dismiss' onClick={this.dismissClick.bind(this)}></ButtonComponent>
            </div>);
    }
    render() {
        return (<div className='control-pane'>
                <div className="col-lg-12 control-section msg-template-section">
                    <div className="content-section">
                        <ButtonComponent id='showBtn' ref={(scope) => { this.showBtn = scope; }} content='Show pull request' cssClass="e-outline e-primary e-success msg-hidden" onClick={this.showClick.bind(this)}></ButtonComponent>
                        <MessageComponent id="msg_template" ref={(scope) => { this.msgTemplate = scope; }} content={this.contentTemplate.bind(this)} severity="Success" closed={this.closed.bind(this)}></MessageComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the template functionality of the React Message component. Click the <b>dismiss</b> button to hide the message. Click the <b>Show pull request</b> button to restore the hidden message.</p>
                </div>
                <div id="description">
                    <p>The Message component has an option to customize the content with a custom structure. The content can be a string, paragraph, or any other HTML element.</p>
                    <p>In this sample, the Message component content is customized with HTML elements and React Button components.</p>
                    <p>More information about Message template can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/message/template">documentation</a> section.</p>
                </div>
            </div>);
    }
}
