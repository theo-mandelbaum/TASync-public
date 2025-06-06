import * as React from "react";
import { useState, useEffect } from "react";
import { updateSampleSection } from "../common/sample-base";
import { DialogUtility } from "@syncfusion/ej2-react-popups";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from "../common/property-pane";
import "./animation.css";
const Animation = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [animation, setAnimation] = useState("Zoom");
    const effectData = [
        { Effect: "FadeZoom", Name: "Fade zoom" },
        { Effect: "SlideBottom", Name: "Slide bottom" },
        { Effect: "SlideTop", Name: "Slide top" },
        { Effect: "Zoom", Name: "Zoom" },
        { Effect: "Fade", Name: "Fade" },
    ];
    let fields = { text: "Name", value: "Effect" };
    const dialogArgs = {
        title: " Delete Multiple Items",
        content: "Are you sure you want to permanently delete these items?",
        animationSettings: { effect: animation, delay: 0, duration: 400 },
        position: { X: "center", Y: "center" },
        closeOnEscape: true
    };
    const buttonClick = (args) => {
        if (args.target.textContent.toLowerCase() == "confirm") {
            DialogUtility.confirm(dialogArgs);
        }
    };
    const onChange = (args) => {
        setAnimation(args.value);
    };
    return (<div className="control-pane">
      <div className="control-section row">
        <div className="col-lg-8" id="predefinedDialogAnimation">
          <ButtonComponent id="confirmBtn" cssClass="e-success e-control e-btn dlgbtn" onClick={buttonClick.bind(this)}>Confirm</ButtonComponent>
        </div>
        <div className="col-lg-4 property-section">
          <PropertyPane title="Properties">
            <div>
              <DropDownListComponent id="effectDrop" dataSource={effectData} fields={fields} change={onChange.bind(this)} placeholder="Animation effect" floatLabelType="Always" value={animation} popupHeight="220px"/>
            </div>
          </PropertyPane>
        </div>
      </div>

      <div id="action-description">
        <p>
          This example demonstrates how to show and hide the predefined dialog
          using a variety of animation effects. The dropdown item that displays
          the animation effects can be selected and set to it.
        </p>
      </div>
      <div id="description">
        <p>
          The dialog can be opened or closed with an animation effect using the{" "}
          <code>animationSettings</code> property. You can also customize the
          duration of the animation and delay to begin the animation or disable
          the dialog's animation by setting the animation effect as none.
        </p>
        <p>
          <b>See also</b>
        </p>
        <ul>
          <li>
            <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/dialog/render-a-dialog-using-utility-functions/">documentation section</a>
          </li>
        </ul>
      </div>
    </div>);
};
export default Animation;
