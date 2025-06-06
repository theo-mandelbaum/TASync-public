import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
import { Browser, isNullOrUndefined, getComponent } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import './default.css';
const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let imgObj = useRef(null);
    const imageEditorCreated = () => {
        if (Browser.isDevice) {
            imgObj.current.open("src/image-editor/images/flower.png");
        }
        else {
            imgObj.current.open("src/image-editor/images/default.png");
        }
        if (imgObj.current.theme && window.location.href.split("#")[1]) {
            imgObj.current.theme = window.location.href.split("#")[1].split("/")[1];
        }
    };
    // Handler used to reposition the tooltip on page scroll
    const onScroll = () => {
        if (document.getElementById("image-editor_sliderWrapper")) {
            let slider = getComponent(document.getElementById("image-editor_sliderWrapper"), "slider");
            slider.refreshTooltip(slider.tooltipTarget);
        }
    };
    if (!isNullOrUndefined(document.getElementById("right-pane"))) {
        document
            .getElementById("right-pane")
            .addEventListener("scroll", onScroll.bind(this));
    }
    return (<div className="control-pane">
            <div className="control-section">
                <div className="row">
                    <div className="col-lg-12 control-section">
                        <div className="e-img-editor-sample">
                            <ImageEditorComponent id="image-editor" ref={imgObj} created={imageEditorCreated}></ImageEditorComponent>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates Image Editor features such as crop, rotate,
                    flip, insert annotations such as rectangle, ellipse, line, arrow,
                    path, and text.
                </p>
            </div>
            <div id="description">
                <p>
                    The Image Editor component provides built-in support to edit images in
                    the following ways through APIs:
                </p>
                <ul>
                    <li>
                        <b>Selection</b> : Multiple selection options are available. The
                        selection region can be a square or circle, customized to various
                        aspects ratios, and customized by dragging and resizing.
                    </li>
                    <li>
                        <b>Crop</b> : The image can be cropped based on the selection.
                    </li>
                    <li>
                        <b>Rotate</b> : The image can be rotated both clockwise and
                        anticlockwise by 90 degrees.
                    </li>
                    <li>
                        <b>Flip</b> : The image can be flipped both horizontally and
                        vertically.
                    </li>
                    <li>
                        <b>Zoom</b> : The image can be zoomed in and out.
                    </li>
                    <li>
                        <b>Pan</b> : View the entire image by toggling the pan option from
                        the toolbar.
                    </li>
                    <li>
                        <b>Freehand drawing</b> : Draw freehand on the image and adjust the
                        pen's stroke width and stroke color.
                    </li>
                    <li>
                        <b>Reset</b> : Revert all the edited states and load the original
                        image.
                    </li>
                    <li>
                        <b>Save</b> : Save the edited image in JPEG, PNG, and SVG formats.
                    </li>
                    <li>
                        <b>Annotation</b> : Text, rectangle, ellipse, arrow, path, image, and line annotation shapes are supported.
                    </li>
	                <li>
                        <b>Finetunes</b> : The effects such as brightness, contrast, hue, sauration, and blur can be applied to the image.
                    </li>
                    <li>
                        <b>Filters</b> : The predefined filters such as chrome, cold, warm, grayscale, sepia, and invert can be applied to the image.
                    </li>
                    <li>
                        <b>Frames</b> : The predefined frames such as mat, bevel, line, hook, and inset can be applied to the image.
                    </li>
                    <li>
                        <b>Resize</b> : The image can be resized to cater to the user's preferences and needs, enhancing the adaptability and usability of the content.
                    </li>
                    <li>
                        <b>Z-Order</b> : Adjust the positioning of annotations to manage the layering of elements, essential for creating polished designs.
                    </li>
                    <li>
                        <b>Redact</b> : Redacting sensitive information in images involves covering or obscuring specific areas to make the information unreadable or unidentifiable.
                    </li>
                </ul>
                <p>
                    More information about Image Editor can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/image-editor/getting-started/">
                        documentation section
                    </a>
                    .
                </p>
            </div>
        </div>);
};
export default Default;
