import * as React from "react";
import { extend } from '@syncfusion/ej2-base';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { SampleBase } from '../common/sample-base';
import './card-template.css';
import * as dataSource from './datasource.json';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
/**
 * Kanban Card Template sample
 */
export class CardTemplate extends SampleBase {
    data = extend([], dataSource.kanbanPizzaData, null, true);
    dialogTemplate(props) {
        return (<KanbanDialogFormTemplate {...props}/>);
    }
    render() {
        return (<div className="kanban-control-section">
            <div className="control-section">
              <div className="control-wrapper">
                <KanbanComponent cssClass="kanban-card-template" id="kanban" keyField="Category" dataSource={this.data} cardSettings={{
                headerField: 'Id',
                template: this.cardTemplate.bind(this),
            }} dialogSettings={{ template: this.dialogTemplate.bind(this) }}>
                  <ColumnsDirective>
                    <ColumnDirective headerText="Menu" keyField="Menu"/>
                    <ColumnDirective headerText="Order" keyField="Order"/>
                    <ColumnDirective headerText="Ready to Serve" keyField="Ready to Serve"/>
                    <ColumnDirective headerText="Delivered" keyField="Delivered"/>
                  </ColumnsDirective>
                </KanbanComponent>
              </div>
            </div>
          </div>);
    }
    cardTemplate(props) {
        var src = 'src/kanban/images/' + props.ImageURL;
        return (<div className="card-template">
            <div className="card-template-wrap">
                <table className="card-template-wrap">
                    <colgroup>
                        <col style={{ width: "55px" }}/>
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td className="e-image">
                                <img src={src} alt={props.ImageURL}/>
                            </td>
                            <td className="e-title">
                                <div className="e-card-stacked">
                                    <div className="e-card-header">
                                        <div className="e-card-header-caption">
                                            <div className="e-card-header-title e-tooltip-text">{props.Title}</div>
                                        </div>
                                    </div>
                                    <div className="e-card-content" style={{ lineHeight: "2.75em" }}>
                                        <table className="card-template-wrap" style={{ tableLayout: "auto" }}>
                                            <tbody>
                                                <tr>
                                                    {(props.Category == 'Menu' || props.Category == 'Order' || props.Category == 'Ready to Serve') && <td colSpan={2}>
                                                        {props.Category == 'Menu' && <div className="e-description e-tooltip-text">{props.Description}</div>}
                                                        {props.Category != 'Menu' && <div className="e-description e-tooltip-text">{props.OrderID}</div>}
                                                    </td>}
                                                    {(props.Category == 'Delivered') && <td className="card-content">
                                                    <table>
                                                      <tbody>
                                                        <tr>
                                                            <td className="e-description e-tooltip-text">
                                                                {props.OrderID}
                                                            </td>
                                                            <td className="e-icons e-done"></td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <label className="e-date">Deliver:</label>
                                                                <span className="e-kanban-date">{props.Date}</span>
                                                            </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    </td>}
                                                </tr>
                                                <tr>
                                                    {props.Category == 'Menu' && <td className="card-content">
                                                        <div className="e-size e-tooltip-text">{props.Size}</div>
                                                        <div className="e-price e-tooltip-text">{props.Price}</div>
                                                    </td>}
                                                    {props.Category != 'Menu' && <td className="card-content">
                                                        {props.Category == 'Order' && <div className="e-preparingText e-tooltip-text">Preparing</div>}
                                                        {props.Category === 'Ready to Serve' && <div className="e-readyText e-tooltip-text">Ready to Serve</div>}
                                                        {(props.Category == 'Delivered') && <div className="e-deliveredText e-tooltip-text">Delivered</div>}
                                                        {props.Category == 'Order' && <div className="e-time e-tooltip-text">
                                                            <div className="e-icons e-clock"></div>
                                                            <div className="e-mins">15 mins</div>
                                                        </div>}
                                                        {props.Category == 'Ready to Serve' && <div className="e-time e-tooltip-text">
                                                            <div className="e-icons e-clock"></div>
                                                            <div className="e-mins">5 mins</div>
                                                        </div>}
                                                    </td>}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>);
    }
}
export class KanbanDialogFormTemplate extends React.Component {
    categoryData = ['Menu', 'Order', 'Ready to Serve', 'Delivered'];
    constructor(props) {
        super(props);
        this.state = extend({}, {}, props, true);
    }
    onChange(args) {
        let key = args.target.name;
        let value = args.target.value;
        this.setState({ [key]: value });
    }
    render() {
        let data = this.state;
        return (<div>
            <table>
              <tbody>
                <tr>
                  <td className="e-label">ID</td>
                  <td>
                    <div className="e-float-input e-control-wrapper">
                      <input id="Id" name="Id" type="text" className="e-field" value={data.Id} disabled/>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="e-label">Status</td>
                  <td>
                    <DropDownListComponent id="Category" name="Category" dataSource={this.categoryData} className="e-field" placeholder="Category" value={data.Category}></DropDownListComponent>
                  </td>
                </tr>
                <tr>
                  <td className="e-label">Title</td>
    
                  <td>
                    <TextBoxComponent id="Title" name="Title" className="e-field" placeholder="Title" value={data.Title}></TextBoxComponent>
                  </td>
                </tr>
                <tr>
                  <td className="e-label">Size</td>
                  <td>
                    <TextBoxComponent id="Size" name="Size" className="e-field" placeholder="Size" value={data.Size}></TextBoxComponent>
                  </td>
                </tr>
                <tr>
                  <td className="e-label">Description</td>
                  <td>
                    <div className="e-float-input e-control-wrapper">
                      <textarea name="Description" className="e-field" value={data.Description} onChange={this.onChange.bind(this)}></textarea>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="e-label">Deliver</td>
                  <td>
                    <DatePickerComponent id="Date" className="e-field" format="MM/dd/yyyy" value={data.Date}></DatePickerComponent>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>);
    }
}
