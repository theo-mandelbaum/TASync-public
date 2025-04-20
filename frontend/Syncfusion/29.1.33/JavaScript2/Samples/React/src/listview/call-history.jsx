/**
 * ListView CallHistory Sample
 */
import * as React from 'react';
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-react-navigations';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
import { callHistoryData } from './listData';
import './call-history.css';
export class CallHistory extends SampleBase {
    //Map the appropriate columns to fields property
    fields = { text: 'text', groupBy: 'category' };
    styleNone = { display: "none" };
    // Set customized list template
    listTemplate(data) {
        return (<div className="e-list-wrapper e-list-avatar e-list-multi-line">
                <span className="e-avatar e-icon"></span>
                <span className="e-list-item-header">{data.text}</span> <span className={`${data.type} e-list-content`}>{data.group}, {data.time}</span>
            </div>);
    }
    allInstance;
    receivedInstance;
    missedInstance;
    tab;
    listObjects = [];
    headerText = [
        { "text": "All" },
        { "text": "Received" },
        { "text": "Missed" }
    ];
    type = ['', 'received', 'missed'];
    // EventHandler to filter data while selecting tab
    filterData(dataSource, value) {
        let newData = [];
        dataSource.filter((data) => {
            if ((data.id).indexOf(value) !== -1) {
                newData.push(data);
            }
        });
        return newData;
    }
    // EventHandler to check the device mode
    onCreated() {
        if (!Browser.isDevice) {
            document.getElementsByClassName('layoutWrapper')[0].classList.add('e-device-layout');
        }
        else {
            document.getElementsByClassName('tabContainer')[0].classList.add('e-visbile-layer');
        }
    }
    // EventHandler to select the tab
    selectedHanlder(args) {
        if (this.allInstance !== undefined) {
            this.listObjects = [this.allInstance, this.receivedInstance, this.missedInstance];
            let newData;
            newData = this.filterData(callHistoryData, this.type[args.selectedIndex]); // Filter the data while selecting tab
            this.listObjects[args.selectedIndex].dataSource = newData; // Append the filtered data
        }
    }
    render() {
        return (<div className='control-pane'>
                <div className='slider-call-history col-lg-12 control-section'>
                    <div className="layoutWrapper">
                        <div className="speaker">
                            <div className="camera"></div>
                        </div>
                        <div className="layout">
                            <div id="list-container">
                                <div className="tabContainer">
                                    {/* Tab element */}
                                    <TabComponent id="tab" ref={tab => this.tab = tab} selected={this.selectedHanlder.bind(this)} created={this.onCreated}>
                                        <TabItemsDirective>
                                            <TabItemDirective header={this.headerText[0]} content={"#all"}/>
                                            <TabItemDirective header={this.headerText[1]} content={"#received"}/>
                                            <TabItemDirective header={this.headerText[2]} content={"#missed"}/>
                                        </TabItemsDirective>
                                    </TabComponent>
                                </div>
                                {/* ListView element */}
                                <ListViewComponent id="all" dataSource={callHistoryData} fields={this.fields} style={this.styleNone} cssClass='e-list-template' template={this.listTemplate} ref={(listview) => { this.allInstance = listview; }}></ListViewComponent>
                                <ListViewComponent id="received" dataSource={callHistoryData} fields={this.fields} style={this.styleNone} cssClass='e-list-template' template={this.listTemplate} ref={(listview) => { this.receivedInstance = listview; }}></ListViewComponent>
                                <ListViewComponent id="missed" dataSource={callHistoryData} fields={this.fields} style={this.styleNone} cssClass='e-list-template' template={this.listTemplate} ref={(listview) => { this.missedInstance = listview; }}></ListViewComponent>
                            </div>
                        </div>
                        <div className="outerButton"> </div>
                    </div>
                </div>

                <div id="action-description">
                    <p>This sample demonstrates the call history application using ListView. Click the checklist to filter the data in contacts list.
                    </p>
                </div>

                <div id="description" className="descriptionLayout">
                <p>This sample filters out the data from ListView based on the data selected from the checklist. Here, ListView utilizes the
                   <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/list-view#template'>template</a></code> and 
                   <code><a target='_blank' className='code' href='https://ej2.syncfusion.com/react/documentation/api/list-view#showicon'>showIcon</a></code> properties 
                   to repesent the call history application. The Tab component is used in this sample for navigation purposes. 
                </p>
                </div>
            </div>);
    }
}
