/**
 * Loading API sample
 */
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { ButtonComponent, CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { PropertyPane } from "../common/property-pane";
import { updateSampleSection } from "../common/sample-base";
import "./api.css";
const ApiTooltip = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let tooltip = useRef(null);
    let data = ["Click", "Hover", "Auto"];
    const [content, setContent] = useState("Tooltip content");
    const [height, setHeight] = useState(45);
    const [width, setWidth] = useState(100);
    const [mode, setMode] = useState("Click");
    const [isSticky, setIsSticky] = useState(false);
    const onClick = (args) => {
        if (tooltip.current != null) {
            if (!args.target.classList.contains("e-control") && !args.target.classList.contains("e-btn")) {
                if (!tooltip.current.isSticky && document.getElementsByClassName("e-tooltip-wrap").length > 0) {
                    tooltip.current.close();
                }
            }
        }
    };
    const onScroll = () => {
        if (tooltip.current != null) {
            if (document.getElementsByClassName("e-tooltip-wrap").length > 0) {
                tooltip.current.close();
            }
        }
    };
    const created = () => {
        if (document.getElementById("right-pane")) {
            document.getElementById("right-pane").addEventListener("click", onClick.bind(this));
            document.getElementById("right-pane").addEventListener("scroll", onScroll.bind(this));
        }
    };
    const onModeChange = (args) => {
        tooltip.current.close();
        setMode(args.value);
    };
    const onHeightChange = (args) => {
        tooltip.current.close();
        setHeight(args.value);
        tooltip.current.refresh(tooltip.current.element);
    };
    const onWidthChange = (args) => {
        tooltip.current.close();
        setWidth(args.value);
        tooltip.current.refresh(tooltip.current.element);
    };
    const handleKeyPress = (args) => {
        tooltip.current.close();
        setContent(args.currentTarget.value);
    };
    const checkboxChange = (args) => {
        if (tooltip.current != null) {
            tooltip.current.close();
            setIsSticky(args.checked);
        }
    };
    return (<div className="control-pane">
            <div className="control-section">
                <div className="col-lg-8 control-section">
                    <TooltipComponent created={created.bind(this)} id="defaultTooltip" ref={tooltip} content={content} height={height} width={width} opensOn={mode} isSticky={isSticky}>
                        <ButtonComponent>Show Tooltip</ButtonComponent>
                    </TooltipComponent>
                </div>
                <div className="col-lg-4 property-section tooltip-api">
                    <PropertyPane title="Properties">
                        <table id="property" title="Properties">
                            <tbody>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect">Content</div>
                                    </td>
                                    <td style={{ width: "50%", paddingRight: "10px" }}>
                                        <div>
                                            <input id="tooltipContentValue" onKeyUp={handleKeyPress.bind(this)} type="text" className="e-input" placeholder="Tooltip content"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect">Height</div>
                                    </td>
                                    <td style={{ width: "50%", paddingRight: "10px" }}>
                                        <div>
                                            <NumericTextBoxComponent id="height" value={height} change={onHeightChange.bind(this)} aria-label="height value"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect">Width</div>
                                    </td>
                                    <td style={{ width: "50%", paddingRight: "10px" }}>
                                        <div>
                                            <NumericTextBoxComponent id="width" className="e-input" value={width} change={onWidthChange.bind(this)} aria-label="width value"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect">Open Mode</div>
                                    </td>
                                    <td style={{ width: "50%", paddingRight: "10px" }}>
                                        <div>
                                            <DropDownListComponent dataSource={data} value={mode} placeholder="Select mode" change={onModeChange.bind(this)} id="ddlelement"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <div className="userselect">Sticky Mode</div>
                                    </td>
                                    <td style={{ width: "50%", paddingRight: "10px" }}>
                                        <div>
                                            <CheckBoxComponent id="sticky" checked={isSticky} change={checkboxChange.bind(this)} aria-label="sticky"/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates how to customize the tooltip component by using its
                    properties from the property pane. Select any combination of properties from the
                    property pane to customize tooltips.
                </p>
            </div>
            <div id="description">
                <p>
                    In this demo, the default tooltip is rendered with minimal configuration. This sample
                    can be customized further with the combination of tooltip properties from the property
                    pane. For example,
                </p>
                <ul>
                    <li>
                        Any change made to a textbox in the property pane will be reflected in the
                        tooltip <a href="https://ej2.syncfusion.com/react/documentation/api/tooltip/#content">content</a>
                    </li>
                    <li>
                        <a href="https://ej2.syncfusion.com/react/documentation/api/tooltip/#issticky">StickyMode</a> can be enabled by
                        checking the sticky mode option in the property pane.
                    </li>
                    <li>
                        <a href="https://ej2.syncfusion.com/react/documentation/api/tooltip/#height">Height</a> and
                        <a href="https://ej2.syncfusion.com/react/documentation/api/tooltip/#width">width</a> can be changed from the property pane.
                    </li>
                    <li>
                        <a href="https://ej2.syncfusion.com/react/documentation/api/tooltip/#openson">OpenMode</a> can be changed from the property pane.
                    </li>
                </ul>
            </div>
        </div>);
};
export default ApiTooltip;
