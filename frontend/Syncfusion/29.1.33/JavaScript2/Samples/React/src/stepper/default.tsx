import * as React from 'react';
import { StepperComponent, StepsDirective, StepDirective } from '@syncfusion/ej2-react-navigations';
import { SampleBase } from '../common/sample-base';
import './default.css';

export class Default extends SampleBase<{}, {}> {

    public defaultStepper: StepperComponent;
    public iconStepper: StepperComponent;
    public iconLabelStepper: StepperComponent;
    public customTextStepper: StepperComponent;
    public labelStepper: StepperComponent;

    render() {
        return (
            <div className='control-pane'>
                <div className='control-section'>
                    <div className="default-stepper-section">
                        <label>Custom Text</label>
                        <StepperComponent stepType='indicator' ref={stepper => { this.customTextStepper = stepper }} created={() => { this.customTextStepper.activeStep = 2 }}>
                            <StepsDirective>
                                <StepDirective text= { '1' }/>
                                <StepDirective text= { '2' }/>
                                <StepDirective text= { '3' }/>
                                <StepDirective text= { '4' }/>
                                <StepDirective text= { '5' }/>
                            </StepsDirective>
                        </StepperComponent>
                        <label>Icon Only</label>
                        <StepperComponent ref={stepper => { this.iconStepper = stepper }} created={() => { this.iconStepper.activeStep = 2 }}>
                            <StepsDirective>
                                <StepDirective iconCss = {'sf-icon-cart'}/>
                                <StepDirective iconCss = {'sf-icon-user'}/>
                                <StepDirective iconCss = {'sf-icon-transport'}/>
                                <StepDirective iconCss = {'sf-icon-payment'}/>
                                <StepDirective iconCss = {'sf-icon-success' }/>
                            </StepsDirective>
                        </StepperComponent>
                        <label>Icon with Label</label>
                        <StepperComponent id="iconWithLabel" ref={stepper => { this.iconLabelStepper = stepper }} created={() => { this.iconLabelStepper.activeStep = 2 }}>
                            <StepsDirective>
                                <StepDirective iconCss= { 'sf-icon-cart' } label= { 'Cart' }/>
                                <StepDirective iconCss= { 'sf-icon-user' } label= { 'Address' }/>
                                <StepDirective iconCss= { 'sf-icon-transport' } label= { 'Delivery' }/>
                                <StepDirective iconCss= { 'sf-icon-payment' } label= { 'Payment' } optional={true}/>
                                <StepDirective iconCss= { 'sf-icon-success' } label= { 'Ordered' }/>
                            </StepsDirective>
                        </StepperComponent>
                        <label>Label Only</label>
                        <StepperComponent ref={stepper => { this.labelStepper = stepper }} created={() => { this.labelStepper.activeStep = 2 }}>
                            <StepsDirective>
                                <StepDirective label= { 'Cart' }/>
                                <StepDirective label= { 'Address' }/>
                                <StepDirective label= { 'Delivery' }/>
                                <StepDirective label= { 'Payment' }/>
                                <StepDirective label= { 'Ordered' }/>
                            </StepsDirective>
                        </StepperComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample showcases the Stepper component with all of its default combinations.</p>
                </div>
                <div id="description">
                    <p>The Stepper is commonly employed to guide users through a multistep process or workflow. This example demonstrates the usage of the <code>steps</code> and <code>stepType</code> properties in the Stepper, showcasing various default combinations.</p>
                </div>
            </div>
        )
    }
}
