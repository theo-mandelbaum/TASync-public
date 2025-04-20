import * as React from 'react';
import { useEffect } from 'react';
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import './default.css';
import * as data from './dataSource.json';
const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const temp = 'emailData';
    const emailData = data[temp];
    const emailFields = { text: 'EmailId' };
    const emailTarget = '#emailsMention';
    const commentTarget = '#commentsMention';
    const commentFields = { text: 'Name' };
    return (<div className='control-pane'>
      <div className='control-section'>
        <div className='col-lg-12'>
          <div className="content-wrapper">
            <div id='mention_default'>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label className="default-size">E-mails</label>
                      <TextBoxComponent id="emailsMention" placeholder="Type @ and tag the email"/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="default-size">Comments</label>
                      <div id="commentsMention" placeholder="Type @ and select your comments"></div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <MentionComponent dataSource={emailData} target={emailTarget} fields={emailFields}></MentionComponent>

              <MentionComponent dataSource={emailData} target={commentTarget} fields={commentFields}></MentionComponent>
            </div>
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>This sample demonstrates the default functionalities of the Mention component. Type the <code>@</code> character in the editable element and select or tag the user from the suggestion list.</p>
      </div>

      <div id="description">
        <p>The <code>Mention</code> is a component used to display a list of items that the users can select or tag from the list suggested. You can use the <code>@</code> mention support with the <code>input</code>, <code>textarea</code>, and <code>contenteditable</code> div elements.</p>
        <p>In the above sample, the input and div elements are configured with <code>@</code> mentions listing the <code>emails</code> and <code>comments</code> contents.</p>
      </div>
    </div>);
};
export default Default;
