ej.base.enableRipple(window.ripple)
/**
 * Textarea sample for floating label behaviour.
 */

    var textarea = new ej.inputs.TextArea({
        placeholder: 'Enter your comments',
        floatLabelType: 'Auto'
    });
    textarea.appendTo('#floatlabel');
    var floatLabel = new ej.dropdowns.DropDownList({
        // set the height of the popup element
        popupHeight: '200px',
        // bind the change event
        change: function (args) {
            switch (args.value) {
                case 'Auto':
                    textarea.floatLabelType = 'Auto';
                    break;
                case 'Always':
                    textarea.floatLabelType = 'Always';
                    break;
                case 'Never':
                    textarea.floatLabelType = 'Never';
                    break;
            }
        }
    });
    floatLabel.appendTo('#select');
