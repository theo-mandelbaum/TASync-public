define(["require", "exports", "../src/stepper/index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var stepperObj;
    var iconWithText = [
        { iconCss: 'e-icons e-folder', text: 'Step 1' },
        { iconCss: 'e-icons e-folder', text: 'Step 2' },
        { iconCss: 'e-icons e-folder', text: 'Step 3', optional: true },
        { iconCss: 'e-icons e-folder', text: 'Step 4' },
        { iconCss: 'e-icons e-folder', text: 'Step 5' }
    ];
    document.getElementById('render').addEventListener('click', renderStepper);
    document.getElementById('destroy').addEventListener('click', destoryStepper);
    function renderStepper() {
        stepperObj = new index_1.Stepper({
            steps: iconWithText
        });
        stepperObj.appendTo('#stepper');
    }
    function destoryStepper() {
        if (stepperObj && !stepperObj.isDestroyed) {
            stepperObj.destroy();
        }
    }
});
