import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { AccordionComponent, AccordionItemDirective, AccordionItemsDirective } from '@syncfusion/ej2-react-navigations';
import './accordion.css';
export class Accordion extends SampleBase {
    accordionData = [
        { name: 'Robert', badge: '7 New' },
        { name: 'Kevin', badge: '27 New' },
        { name: 'Eric', badge: '2 New' },
        { name: 'Peter', badge: '14 New' }
    ];
    accordionTemplate() {
        return (<div>
                <ul>
                    <li className='msg'>
                        <span className='e-acrdn-icons e-content-icon people'></span>
                        Message Thread
                    </li>
                    <li className='msg'>
                        <span className='e-acrdn-icons e-content-icon people'></span>
                        Message Thread
                    </li>
                </ul>
            </div>);
    }
    render() {
        return (<div className='control-pane'>
                <div className='control-section badge-samples'>
                    <div className="sample_container badge-accordion">
                        <AccordionComponent id="accordion">
                            <AccordionItemsDirective>
                                    {this.accordionData.map((item, index) => (<AccordionItemDirective key={index} header={() => (<div>
                                                    <span>{item.name}</span>
                                                    <span className="e-badge e-badge-success">{item.badge}</span>
                                                </div>)} iconCss='e-people e-acrdn-icons' expanded={index === 0} content={this.accordionTemplate}/>))}
                            </AccordionItemsDirective>
                        </AccordionComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the integration of badges into the accordion component to display the thread notification count.</p>
                </div>

                <div id="description">
                    <p>The badge can be integrated into the accordion with the help of templates to display the count of new messages in the
                        message thread. Here, the success badge is used in the accordion. To add success badge, add the
        <code>.e-badge-success</code> class.
    </p>
                </div>
            </div>);
    }
}
