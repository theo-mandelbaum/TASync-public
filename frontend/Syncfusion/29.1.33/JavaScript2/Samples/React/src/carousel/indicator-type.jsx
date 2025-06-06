import * as React from 'react';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './indicator-type.css';
export class IndicatorType extends SampleBase {
    itemTemplate1() {
        return (<div className="e-slide">Slide 1</div>);
    }
    itemTemplate2() {
        return (<div className="e-slide">Slide 2</div>);
    }
    itemTemplate3() {
        return (<div className="e-slide">Slide 3</div>);
    }
    itemTemplate4() {
        return (<div className="e-slide">Slide 4</div>);
    }
    itemTemplate5() {
        return (<div className="e-slide">Slide 5</div>);
    }
    render() {
        return (<div className='control-pane'>
        <div className='control-section indicator-type-section'>
            <div className="row">
                <div className='col-lg-6 carousel-sample'>
                <h1>Default Indicator</h1>
                <CarouselComponent cssClass="indicator-type" indicatorsType='Default' autoPlay={false}>
                    <CarouselItemsDirective>
                    <CarouselItemDirective template={this.itemTemplate1.bind(this)}/>
                    <CarouselItemDirective template={this.itemTemplate2.bind(this)}/>
                    <CarouselItemDirective template={this.itemTemplate3.bind(this)}/>
                    <CarouselItemDirective template={this.itemTemplate4.bind(this)}/>
                    <CarouselItemDirective template={this.itemTemplate5.bind(this)}/>
                    </CarouselItemsDirective>
                </CarouselComponent>
                </div>
                <div className='col-lg-6 carousel-sample'>
                <h1>Dynamic Indicator</h1>
                <CarouselComponent cssClass="indicator-type" indicatorsType='Dynamic' autoPlay={false}>
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
          <div className="row">
                <div className='col-lg-6 carousel-sample'>
                <h1>Fraction Indicator</h1>
                <CarouselComponent cssClass="indicator-type" indicatorsType='Fraction' autoPlay={false}>
                    <CarouselItemsDirective>
                    <CarouselItemDirective template={this.itemTemplate1.bind(this)}/>
                    <CarouselItemDirective template={this.itemTemplate2.bind(this)}/>
                    <CarouselItemDirective template={this.itemTemplate3.bind(this)}/>
                    <CarouselItemDirective template={this.itemTemplate4.bind(this)}/>
                    <CarouselItemDirective template={this.itemTemplate5.bind(this)}/>
                    </CarouselItemsDirective>
                </CarouselComponent>
                </div>
                <div className='col-lg-6 carousel-sample'>
                <h1>Progress Indicator</h1>
                <CarouselComponent cssClass="indicator-type" indicatorsType='Progress' autoPlay={false}>
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
        </div>
        <div id="action-description">
            <p>This sample demonstrates the types of indicators in the <a href="https://www.syncfusion.com/javascript-ui-controls/js-carousel" target="_blank">React Carousel</a> component.</p>
        </div>
        <div id="description">
            <p>In this demo, the available types of indicators of JavaScript Carousel are showcased. They are <code>default</code>, <code>dynamic</code>, <code>progress</code> and <code>fraction</code>, and can be set using the <strong>indicatorsType</strong> property. </p>
            <p><code>Default</code> - The Carousel displays indicators with a bullet design.</p>
            <p><code>Dynamic</code> - The Carousel applies dynamic animation to the indicators.</p>
            <p><code>Fraction</code> - The Carousel displays slides numerically as indicators.</p>
            <p><code>Progress</code> - The Carousel displays indicators like a progress bar.</p>
        </div>
    </div>);
    }
}
