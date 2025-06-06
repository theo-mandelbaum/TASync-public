import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Stepper, StepModel } from '@syncfusion/ej2-navigations';


    

    let orientationSteps: StepModel[] = [
        { iconCss: 'sf-icon-ordered', label: 'Orders' },
        { iconCss: 'sf-icon-review', label: 'Review' },
        { iconCss: 'sf-icon-package', label: 'Packing' },
        { iconCss: 'sf-icon-delivery', label: 'Shipping' }
    ];

    let stepperOrientation: Stepper = new Stepper ({
        activeStep: 1,
        orientation: 'horizontal',
        labelPosition: 'end',
        steps: orientationSteps
    });

    stepperOrientation.appendTo('#orientation-stepper');

    (window as any).updateOrientation = (args: any) => {
        stepperOrientation.orientation = args.value;
    };
    (window as any).updateLabelPosition = (args: any) => {
        stepperOrientation.labelPosition = args.value;
    };
