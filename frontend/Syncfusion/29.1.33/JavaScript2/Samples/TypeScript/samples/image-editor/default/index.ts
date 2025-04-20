import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { ImageEditor } from '@syncfusion/ej2-image-editor';
import { Browser, getComponent } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';


/**
 * Default image editor sample
 */
// tslint:disable-next-line

    
    let imageEditorObj: ImageEditor = new ImageEditor({
        created: () => {
            if (Browser.isDevice) {
                imageEditorObj.open('//npmci.syncfusion.com/development/demos/src/image-editor/images/flower.png');
            } else {
                imageEditorObj.open('//npmci.syncfusion.com/development/demos/src/image-editor/images/default.png');
            }
            if (imageEditorObj.theme && window.location.href.split('#')[1]) {
                imageEditorObj.theme = window.location.href.split('#')[1].split('/')[1];
            }
        }
    });
    if (document.getElementById('right-pane')) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll);
    }
    // Handler used to reposition the tooltip on page scroll
    function onScroll(): void {
        if (document.getElementById('imageeditor_sliderWrapper')) {
            let slider: any = getComponent(document.getElementById('imageeditor_sliderWrapper'), 'slider');
            slider.refreshTooltip(slider.tooltipTarget);
        }
    }
    imageEditorObj.appendTo('#imageeditor');
