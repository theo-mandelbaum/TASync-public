import * as React from 'react';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from '@syncfusion/ej2-react-navigations';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import './api.css';
export class API extends SampleBase {
    carouselObj;
    itemTemplate1() {
        return (<figure className="img-container">
      <img src="src/carousel/images/bridge.jpg" alt="bridge" style={{ height: "100%", width: "100% " }}/>
      <figcaption className="img-caption">Showing 1 of 5</figcaption>
    </figure>);
    }
    itemTemplate2() {
        return (<figure className="img-container">
      <img src="src/carousel/images/trees.jpg" alt="spring_trees" style={{ height: "100%", width: "100% " }}/>
      <figcaption className="img-caption">Showing 2 of 5</figcaption>
    </figure>);
    }
    itemTemplate3() {
        return (<figure className="img-container">
      <img src="src/carousel/images/waterfall.jpg" alt="waterfall" style={{ height: "100%", width: "100% " }}/>
      <figcaption className="img-caption">Showing 3 of 5</figcaption>
    </figure>);
    }
    itemTemplate4() {
        return (<figure className="img-container">
      <img src="src/carousel/images/sea.jpg" alt="sea" style={{ height: "100%", width: "100% " }}/>
      <figcaption className="img-caption">Showing 4 of 5</figcaption>
    </figure>);
    }
    itemTemplate5() {
        return (<figure className="img-container">
      <img src="src/carousel/images/rocks.jpeg" alt="rocks" style={{ height: "100%", width: "100% " }}/>
      <figcaption className="img-caption">Showing 5 of 5</figcaption>
    </figure>);
    }
    showArrowsData = [
        { text: 'Hidden', value: 'Hidden' },
        { text: 'Visible', value: 'Visible' },
        { text: 'On Hover', value: 'VisibleOnHover' }
    ];
    showArrowsField = { text: 'text', value: 'value' };
    showArrowsStateChange(args) {
        this.carouselObj.buttonsVisibility = args.value;
        this.carouselObj.dataBind();
    }
    intervalData = [
        { text: '3 Seconds', value: 3000 },
        { text: '5 Seconds', value: 5000 },
        { text: '7 Seconds', value: 7000 }
    ];
    intervalField = { text: 'text', value: 'value' };
    intervalStateChange(args) {
        this.carouselObj.interval = args.value;
        this.carouselObj.dataBind();
    }
    autoPlayStateChange(args) {
        this.carouselObj.autoPlay = args.checked;
        this.carouselObj.dataBind();
    }
    infiniteLoopStateChange(args) {
        this.carouselObj.loop = args.checked;
        this.carouselObj.dataBind();
    }
    showIndicatorStateChange(args) {
        this.carouselObj.showIndicators = args.checked;
        this.carouselObj.dataBind();
    }
    showPlayStateChange(args) {
        this.carouselObj.showPlayButton = args.checked;
        this.carouselObj.dataBind();
    }
    render() {
        return (<div className='control-pane'>
        <div className='col-lg-8 control-section api-carousel-section'>
          <div className='control-wrapper carousel-sample'>
            {/* Render the Carousel Component */}
            <CarouselComponent ref={(carousel) => { this.carouselObj = carousel; }} cssClass="api-carousel" interval={3000}>
              <CarouselItemsDirective>
                <CarouselItemDirective template={this.itemTemplate1.bind(this)}/>
                <CarouselItemDirective template={this.itemTemplate2.bind(this)}/>
                <CarouselItemDirective template={this.itemTemplate3.bind(this)}/>
                <CarouselItemDirective template={this.itemTemplate4.bind(this)}/>
                <CarouselItemDirective template={this.itemTemplate5.bind(this)}/>
              </CarouselItemsDirective>
            </CarouselComponent>
          </div>
        </div>
        <div className='col-lg-4 property-section api-carousel-section'>
          <PropertyPane title='Properties'>
            <table id='property' title='Properties' className='property-panel-table'>
              <tbody>
                <tr>
                  <td>Enable Autoplay</td>
                  <td>
                    <div>
                      <SwitchComponent id="autoPlay" checked={true} change={this.autoPlayStateChange.bind(this)}/>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Infinite Looping</td>
                  <td>
                    <div>
                      <SwitchComponent id="infiniteLoop" checked={true} change={this.infiniteLoopStateChange.bind(this)}/>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Show Indicators</td>
                  <td>
                    <div>
                      <SwitchComponent id="showIndicator" checked={true} change={this.showIndicatorStateChange.bind(this)}/>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Show Play Button</td>
                  <td>
                    <div>
                      <SwitchComponent id="showPlay" checked={false} change={this.showPlayStateChange.bind(this)}/>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Show Arrows</td>
                  <td>
                    <div>
                      <DropDownListComponent id='showArrows' dataSource={this.showArrowsData} fields={this.showArrowsField} value={'Visible'} change={this.showArrowsStateChange.bind(this)}/>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Slide Interval</td>
                  <td>
                    <div>
                      <DropDownListComponent id='interval' dataSource={this.intervalData} fields={this.intervalField} value={3000} change={this.intervalStateChange.bind(this)}/>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
        <div id="action-description">
          <p>
            This sample demonstrates the properties available in the <a aria-label="React Carousel" href="https://www.syncfusion.com/react-ui-components/react-carousel" target="_blank">React Carousel</a> component.
          </p>
        </div>
        <div id="description">
          <p>
            In this demo,  you can manually change the properties of the <code>React Carousel</code> component like <code>autoPlay</code>, <code>buttonsVisibility</code>, <code>showIndicators</code>,
            <code>interval</code>, <code>showPlayButton</code>, <code>loop</code> using the property panel.
          </p>
          <p>
            More information about the properties available in the Carousel component can be found in this <a target='_blank' href="https://ej2.syncfusion.com/documentation/api/carousel/">documentation section</a>.
          </p>
        </div>
      </div>);
    }
}
