import * as React from "react";
import { useEffect, useRef } from "react";
import { updateSampleSection } from "../common/sample-base";
import { DashboardLayoutComponent, PanelsDirective, PanelDirective } from "@syncfusion/ej2-react-layouts";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { panelData } from './panel-data';
import "./predefined-layouts.component.css";
const PredefinedLayouts = () => {
    useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, []);
    let panels = panelData;
    let dashboardObj = useRef(null);
    const cellSpacing = [5, 5];
    const reset = () => {
        let selectedElement = document.getElementsByClassName('e-selected-style');
        dashboardObj.current.removeAll();
        initializeTemplate(selectedElement[0], dashboardObj.current);
    };
    const initializeTemplate = (element, dashboardObj) => {
        let updatePanels = [];
        let index = parseInt(element.getAttribute('data-id'), 10) - 1;
        let panel = Object.keys(panels[index]).map((panelIndex) => {
            return panels[index][panelIndex];
        });
        for (let i = 0; i < panel.length; i++) {
            let panelModelValue = {
                id: i.toString(),
                row: panel[i].row,
                col: panel[i].col,
                sizeX: panel[i].sizeX,
                sizeY: panel[i].sizeY,
                header: '<div class="e-header-text">Header Area</div><div class="header-border"></div>',
                content: '<div class="panel-content">Content Area</div>'
            };
            updatePanels.push(panelModelValue);
        }
        dashboardObj.panels = updatePanels;
    };
    const rendereComplete = () => {
        document.getElementById('templateContainer').onclick = (args) => {
            let target = args.target;
            let selectedElement = document.getElementsByClassName('e-selected-style');
            if (selectedElement.length) {
                selectedElement[0].classList.remove('e-selected-style');
            }
            if (target.className === 'image-pattern-style') {
                dashboardObj.current.removeAll();
                initializeTemplate(args.target, dashboardObj.current);
            }
            target.classList.add('e-selected-style');
        };
    };
    const onCreate = () => {
        if (document.querySelector('.container-fluid.custom')) {
            document.querySelector('.container-fluid').classList.remove('custom');
        }
    };
    return (<div>
      <div className="col-lg-8 control-section" id="predefine_control">
        <div className="content-wrapper" style={{ "maxWidth": "100%" }}>
          <DashboardLayoutComponent created={onCreate.bind(this)} columns={6} ref={dashboardObj} id="predefine_dashboard" cellSpacing={cellSpacing}>
            <PanelsDirective>
              <PanelDirective row={0} col={0} sizeX={4} sizeY={3} content="<div class='panel-content'>Content Area</div>" header="<div class='e-header-text'>Header Area</div><div class='header-border'></div>"></PanelDirective>
              <PanelDirective row={0} col={4} sizeX={2} sizeY={3} content="<div class='panel-content'>Content Area</div>" header="<div class='e-header-text'>Header Area</div><div class='header-border'></div>"></PanelDirective>
              <PanelDirective row={3} col={0} sizeX={6} sizeY={3} content="<div class='panel-content'>Content Area</div>" header="<div class='e-header-text'>Header Area</div><div class='header-border'></div>"></PanelDirective>
            </PanelsDirective>
          </DashboardLayoutComponent>
        </div>
      </div>
      <div className="col-lg-4 property-section dashboard" id="dash_property">
        <div className="property-panel-header">Properties</div>
        <div className="row property-panel-content">
          <div className="row row-header">Choose dashboard layout</div>
          <div id="templateContainer">
            <div className="row" style={{ "paddingTop": "3px" }}>
              <div className="image-pattern-style e-selected-style" id="template1" data-id="1"/>
              <div className="image-pattern-style" id="template2" data-id="2"/>
              <div className="image-pattern-style" id="template3" data-id="3"/>
            </div>
            <div className="row" style={{ "paddingTop": "3px" }}>
              <div className="image-pattern-style" id="template4" data-id="4"/>
              <div className="image-pattern-style" id="template5" data-id="5"/>
              <div className="image-pattern-style" id="template6" data-id="6"/>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-xs-12 col-lg-12 col-md-12 reset" style={{ "padding": "10px" }}>
          <ButtonComponent id="reset" onClick={reset.bind(this)}>Reset</ButtonComponent>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample demonstrates, the functionality of dynamically updating the panels inside the DashboardLayout by selecting it from the pre-defined values in the properties panel. Go to the properties panel section and select any of the pre-defined layout,
          based on selection the panles are updated in the dashboard layout dynamically inside the DashboardLayout. Click the <code>reset</code> button to reset the panels settings of the layout.
        </p>
      </div>
      <div id="description">
        This sample demonstrates how to update the panels dynamically in the dashboard layout component.
      </div>
    </div>);
};
export default PredefinedLayouts;
