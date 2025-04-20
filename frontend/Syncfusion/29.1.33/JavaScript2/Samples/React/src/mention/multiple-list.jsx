import * as React from 'react';
import { MentionComponent } from '@syncfusion/ej2-react-dropdowns';
import { DataManager, Query, WebApiAdaptor } from '@syncfusion/ej2-data';
import { SampleBase } from '../common/sample-base';
import './multiple-list.css';
import * as data from './dataSource.json';
export class MultipleList extends SampleBase {
    projectTemp = 'projects';
    useCostTemp = 'useCosts';
    statusTemp = 'status';
    data = new DataManager({
        url: 'http://localhost:62728/api/Employees',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    query = new Query().select(['FirstName', 'EmployeeID']).requiresCount();
    projects = data[this.projectTemp];
    useCosts = data[this.useCostTemp];
    status = data[this.statusTemp];
    commonTarget = '#multipleList';
    dataFields = { text: 'FirstName', value: 'EmployeeID' };
    localFields = { text: 'Value' };
    projectsDisplayTemplate(data) {
        return (<React.Fragment>
          <span className="e-success">{data.Value}</span>
      </React.Fragment>);
    }
    costDisplayTemplate(data) {
        return (<React.Fragment>
          <span className="e-error">{data.Value}</span>
      </React.Fragment>);
    }
    statusDisplayTemplate(data) {
        return (<React.Fragment>
          <span className="e-warning">{data.Value}</span>
      </React.Fragment>);
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section'>
            <div className="content-wrapper">
              <div id='mention_multiplelist'>
                <table>
                  <tbody>
                    <tr>
                      <td>
                          <label id="label" className="multiple">Start typing <code>@</code>, <code>#</code>, <code>$</code> or <code>%</code> to select the respective values</label>
                          <div id="multipleList" placeholder="Type here..!"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <MentionComponent dataSource={this.data} target={this.commonTarget} fields={this.dataFields} suggestionCount={15} query={this.query} popupWidth={250} popupHeight={250} allowSpaces={true}></MentionComponent>

              <MentionComponent dataSource={this.projects} requireLeadingSpace={false} mentionChar={'#'} target={this.commonTarget} displayTemplate={this.projectsDisplayTemplate} fields={this.localFields}></MentionComponent>

                <MentionComponent dataSource={this.useCosts} mentionChar={'$'} target={this.commonTarget} displayTemplate={this.costDisplayTemplate} fields={this.localFields}></MentionComponent>

                <MentionComponent dataSource={this.status} mentionChar={'%'} target={this.commonTarget} displayTemplate={this.statusDisplayTemplate} fields={this.localFields}></MentionComponent>
              </div>
            </div>
        </div>
        <div id="action-description">
          <p>This sample demonstrates the different mentioned characters that are used to render the suggestion list. Type the <code>@</code> or <code>#</code> or <code>$</code> or <code>%</code> characters to select or tag the name from respective suggestion lists.</p>
        </div>
            
        <div id="description">
          <p>
            The <code>requireLeadingSpace</code> property in Mention controls whether a space is needed before triggering the
            Mention suggestion popup.
            When set to <code>false</code>, it activates without a space; when set to <code>true</code>, a space is required
            before the Mention character. To see this feature in action, start typing with <code>#</code>.
          </p>
          <p>In the above sample, the following are configured for the contenteditable div element with @mention integrated.</p>
          <ul>
              <li><code>@</code> - Typing <code>@</code> lists out the suggestions of the employee names.</li>
              <li><code>#</code> - Typing <code>#</code> lists the project names.</li>
              <li><code>$</code> - Typing <code>$</code> lists out the cost of the project.</li>
              <li><code>%</code> - Typing <code>%</code> lists the status of the project.</li>
          </ul>
        </div>
      </div>);
    }
}
