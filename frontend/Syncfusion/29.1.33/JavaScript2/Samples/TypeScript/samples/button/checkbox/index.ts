import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { CheckBox, ChangeEventArgs } from '@syncfusion/ej2-buttons';

/**
 * Default CheckBox sample
 */


    
    let checkBoxObj: CheckBox = new CheckBox({ label: 'CheckBox: true', checked: true, change: onChange });
    checkBoxObj.appendTo('#checked');

    checkBoxObj = new CheckBox({ label: 'Checked, Disabled', disabled: true, checked: true });
    checkBoxObj.appendTo('#disabled');

    checkBoxObj = new CheckBox({ label: 'Indeterminate, Disabled', indeterminate: true, disabled: true });
    checkBoxObj.appendTo('#indeterminate');

    // function to handle the CheckBox change event
    function onChange(args: ChangeEventArgs): void {
        this.label = 'CheckBox: ' + args.checked;
    }

