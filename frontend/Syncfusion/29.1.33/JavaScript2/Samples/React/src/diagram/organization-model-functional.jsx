import * as React from "react";
import { LayoutAnimation, HierarchicalTree, DataBinding, DiagramComponent, ConnectorConstraints, SnapConstraints, Inject, DiagramTools } from "@syncfusion/ej2-react-diagrams";
import { updateSampleSection } from "../common/sample-base";
import { DataManager } from "@syncfusion/ej2-data";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { localBindData } from './diagram-data';
const SAMPLE_CSS = `
/* Property panel orientation and sub tree alignment */
.diagram-organization .image-pattern-style {
        background-color: white;
        background-size: contain;
        background-repeat: no-repeat;
        height: 75px;
        width: calc((100% - 18px) / 3);
        cursor: pointer;
        border: 1px solid #D5D5D5;
        background-position: center;
        float: left;
    }

    .diagram-organization .image-pattern-style:hover {
        border-color: gray;
        border-width: 2px;
    }

    .diagram-organization .row {
        margin-left: 0px;
        margin-right: 0px;
    }

    .diagram-organization .row-header {
        font-size: 13px;
        font-weight: 500;
    }

    .diagram-organization .property-panel-header {
      padding-top: 15px;
      padding-bottom: 15px;
    }

    .diagram-organization .e-selected-orientation-style {
        border-color: #006CE6;
        border-width: 2px;
    }

    .diagram-organization .e-selected-pattern-style {
        border-color: #006CE6;
        border-width: 2px;
    }

    .diagram-organization .col-xs-6 {
        padding-left: 0px;
        padding-right: 0px;
    }`;
let diagramInstance;
let horizontalSpacing;
let verticalSpacing;
let orientation;
let type;
let orientationInstance;
let patternInstance;
function OrganizationModel() {
    React.useEffect(() => {
        updateSampleSection();
        rendereComplete();
    }, []);
    function rendereComplete() {
        //Click Event for orientation of the PropertyPanel.
        orientationInstance.onclick = (args) => {
            let target = args.target;
            let selectedElement = document.getElementsByClassName("e-selected-orientation-style");
            if (selectedElement.length) {
                selectedElement[0].classList.remove("e-selected-orientation-style");
            }
            if (!target.classList.contains("e-selected-orientation-style")) {
                target.classList.add("e-selected-orientation-style");
            }
            if (target.className === "image-pattern-style e-selected-orientation-style") {
                switch (target.id) {
                    case "toptobottom":
                        diagramInstance.layout.orientation = "TopToBottom";
                        break;
                    case "bottomtotop":
                        diagramInstance.layout.orientation = "BottomToTop";
                        break;
                    case "lefttoright":
                        diagramInstance.layout.orientation = "LeftToRight";
                        break;
                    case "righttoleft":
                        diagramInstance.layout.orientation = "RightToLeft";
                        break;
                    default:
                        if (selectedElement.length) {
                            selectedElement[0].classList.remove("e-selected-orientation-style");
                        }
                }
                diagramInstance.dataBind();
                diagramInstance.doLayout();
            }
        };
        //Click Event for pattern of the PropertyPanel.
        patternInstance.onclick = (args) => {
            let target = args.target;
            let selectedpatternElement = document.getElementsByClassName("e-selected-pattern-style");
            if (selectedpatternElement.length) {
                selectedpatternElement[0].classList.remove("e-selected-pattern-style");
            }
            if (!target.classList.contains("e-selected-pattern-style")) {
                target.classList.add("e-selected-pattern-style");
            }
            if (target.className === "image-pattern-style e-selected-pattern-style") {
                switch (target.id) {
                    case "pattern1":
                        orientation = "Vertical".toString();
                        type = "Alternate";
                        break;
                    case "pattern2":
                        orientation = "Vertical".toString();
                        type = "Left";
                        break;
                    case "pattern3":
                        orientation = "Vertical".toString();
                        type = "Left";
                        break;
                    case "pattern4":
                        orientation = "Vertical".toString();
                        type = "Right";
                        break;
                    case "pattern5":
                        orientation = "Vertical".toString();
                        type = "Right";
                        break;
                    case "pattern6":
                        orientation = "Horizontal".toString();
                        type = "Balanced";
                        break;
                    case "pattern7":
                        orientation = "Horizontal".toString();
                        type = "Center";
                        break;
                    case "pattern8":
                        orientation = "Horizontal".toString();
                        type = "Left";
                        break;
                    case "pattern9":
                        orientation = "Horizontal".toString();
                        type = "Right";
                        break;
                    default:
                        if (selectedpatternElement.length) {
                            selectedpatternElement[0].classList.remove("e-selected-pattern-style");
                        }
                }
                diagramInstance.layout.getLayoutInfo = (node, options) => {
                    if (target.id === "pattern4" || target.id === "pattern3") {
                        options.offset = -50;
                    }
                    if (orientation) {
                        getLayoutInfo(node, options, orientation, type);
                    }
                };
                diagramInstance.dataBind();
                diagramInstance.doLayout();
            }
        };
    }
    //set orientation and type of the Layout.
    function getLayoutInfo(node, options, orientation, type) {
        /* tslint:disable:no-string-literal */
        if (node.data["Role"] === "General Manager") {
            options.assistants.push(options.children[0]);
            options.children.splice(0, 1);
        }
        if (!options.hasSubTree) {
            options.orientation = orientation;
            options.type = type;
        }
    }
    //sets default value for Node.
    function nodeDefaults(obj, diagram) {
        obj.backgroundColor = obj.data.color;
        obj.style = { fill: "none", strokeColor: "none", color: "white" };
        obj.expandIcon = {
            height: 10,
            width: 10,
            shape: "None",
            fill: "lightgray",
            offset: { x: 0.5, y: 1 }
        };
        obj.expandIcon.verticalAlignment = "Center";
        obj.expandIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
        obj.collapseIcon = { height: 10, width: 10, shape: "None", fill: "lightgray", offset: { x: 0.5, y: 1 } };
        obj.collapseIcon.verticalAlignment = "Center";
        obj.collapseIcon.margin = { left: 0, right: 0, top: 0, bottom: 0 };
        obj.width = 120;
        obj.height = 30;
        return obj;
    }
    //sets default value for Connector.
    function connectorDefaults(connector, diagram) {
        connector.targetDecorator.shape = "None";
        connector.type = "Orthogonal";
        connector.constraints = ConnectorConstraints.None;
        connector.cornerRadius = 0;
        return connector;
    }
    return (<div className="control-pane diagram-organization">
      <style>{SAMPLE_CSS}</style>
      <div className="col-lg-8 control-section">
        <div className="content-wrapper" style={{ width: "100%" }}>
          <DiagramComponent id="diagram" ref={(diagram) => (diagramInstance = diagram)} width={"100%"} height={"700px"} snapSettings={{ constraints: SnapConstraints.None }} 
    //configures data source settings
    dataSourceSettings={{
            id: "Id",
            parentId: "Manager",
            dataSource: new DataManager(localBindData),
            doBinding: (nodeModel, data, diagram) => {
                nodeModel.shape = {
                    type: "Text",
                    content: data.Role,
                    margin: { left: 10, right: 10, top: 10, bottom: 10 },
                };
            },
        }} 
    //Disables all interactions except zoom/pan
    tool={DiagramTools.ZoomPan} 
    //Configures automatic layout
    layout={{
            type: "OrganizationalChart",
            getLayoutInfo: (node, options) => {
                /* tslint:disable:no-string-literal */
                if (node.data["Role"] === "General Manager") {
                    options.assistants.push(options.children[0]);
                    options.children.splice(0, 1);
                }
                if (!options.hasSubTree) {
                    options.type = "Right";
                }
            },
        }} 
    //Defines the default node and connector properties
    getNodeDefaults={(obj, diagram) => {
            /* tslint:disable:no-string-literal */
            return nodeDefaults(obj, diagram);
        }} getConnectorDefaults={(connector, diagram) => {
            return connectorDefaults(connector, diagram);
        }}>
            <Inject services={[DataBinding, HierarchicalTree, LayoutAnimation]}/>
          </DiagramComponent>
        </div>
      </div>

      <div className="col-lg-4 property-section" style={{ height: "80%" }}>
        <div className="property-panel-header">Properties</div>
        <div className="row property-panel-content" id="appearance">
          <div className="row" style={{ paddingTop: "10px" }}>
            <div className="row row-header">Orientation</div>
            <div id="orientation" ref={(orientation) => (orientationInstance = orientation)}>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div className="image-pattern-style e-selected-orientation-style" id="toptobottom" style={{
            backgroundImage: "url('src/diagram/Images/common-orientation/toptobottom.png')",
            marginRight: "3px"
        }}/>
                <div className="image-pattern-style" id="bottomtotop" style={{
            backgroundImage: "url('src/diagram/Images/common-orientation/bottomtotop.png')",
            margin: "0px 3px"
        }}/>
                <div className="image-pattern-style" id="lefttoright" style={{
            backgroundImage: "url('src/diagram/Images/common-orientation/lefttoright.png')",
            marginRight: "0px 3px"
        }}/>
              </div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div className="image-pattern-style" id="righttoleft" style={{
            backgroundImage: "url('src/diagram/Images/common-orientation/righttoleft.png')",
            margin: "0px 3px"
        }}/>
              </div>
            </div>
            <div className="row row-header" style={{ paddingTop: "10px" }}>
              Subtree Alignment
            </div>
            <div id="pattern" ref={(pattern) => (patternInstance = pattern)}>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div className="image-pattern-style" id="pattern1" style={{
            backgroundImage: "url('src/diagram/patternimages/Pattern_1.png')",
            marginRight: "3px"
        }}/>
                <div className="image-pattern-style e-selected-pattern-style" id="pattern2" style={{
            backgroundImage: "url('src/diagram/patternimages/Pattern_2.png')",
            marginRight: "3px"
        }}/>
                <div className="image-pattern-style" id="pattern5" style={{
            backgroundImage: "url('src/diagram/patternimages/Pattern_5.png')",
            margin: "0px 3px"
        }}/>
              </div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div className="image-pattern-style" id="pattern6" style={{
            backgroundImage: "url('src/diagram/patternimages/Pattern_6.png')",
            marginRight: "3px"
        }}/>
                <div className="image-pattern-style" id="pattern7" style={{
            backgroundImage: "url('src/diagram/patternimages/Pattern_7.png')",
            marginRight: "3px"
        }}/>
                <div className="image-pattern-style" id="pattern8" style={{
            backgroundImage: "url('src/diagram/patternimages/Pattern_8.png')",
            margin: "0px 3px"
        }}/>
              </div>
              <div className="row" style={{ paddingTop: "8px" }}>
                <div className="image-pattern-style" id="pattern9" style={{
            backgroundImage: "url('src/diagram/patternimages/Pattern_9.png')",
            margin: "0px 3px"
        }}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row property-panel-content" style={{ paddingTop: "10px" }}>
          <div className="row row-header">Behavior</div>
          <div className="row" style={{ paddingTop: "8px" }}>
            <div style={{ display: "table", height: "35px" }} className="col-xs-6">
              <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                Horizontal Spacing
              </div>
            </div>
            <div className="col-xs-6">
              <NumericTextBoxComponent ref={(horizontalSpacingRef) => (horizontalSpacing = horizontalSpacingRef)} id="horizontalSpacing" style={{ width: "100%" }} min={20} max={60} step={2} value={30} change={() => {
            diagramInstance.layout.horizontalSpacing = Number(horizontalSpacing.value);
            diagramInstance.dataBind();
        }}/>
            </div>
          </div>
          <div className="row" style={{ paddingTop: "8px" }}>
            <div style={{ display: "table", height: "35px" }} className="col-xs-6">
              <div style={{ display: "table-cell", verticalAlign: "middle" }}>
                Vertical Spacing
              </div>
            </div>
            <div className="col-xs-6">
              <NumericTextBoxComponent ref={(verticalSpacingRef) => (verticalSpacing = verticalSpacingRef)} id="verticalSpacing" style={{ width: "100%" }} min={20} max={60} step={2} value={30} change={() => {
            diagramInstance.layout.verticalSpacing = Number(verticalSpacing.value);
            diagramInstance.dataBind();
        }}/>
            </div>
          </div>
        </div>
      </div>
      <div id="action-description">
        <p>
          This sample illustrates a simple business management structure that
          is built from an external data source. Hierarchical tree layout
          algorithm is used to build organizational charts. Customizing the
          orientation and structure of the organizational chart is illustrated
          in this example.
        </p>
      </div>
      <div id="description">
        <p>
          This example shows how to generate an organizational chart from an
          external data source. The spacing between the objects can also be
          customized in the chart. The <code>horizontalSpacing</code> and{" "}
          <code>verticalSpacing</code> properties of
          <code>layout</code> can be used to customize the space between
          objects in a tree. The <code>layoutOrientation</code> property of
          <code>layout</code> can be used to change the orientation of the
          chart. The <code>getLayoutInfo</code> property of
          <code>layout</code> can be used to customize the tree structure. To
          change the tree structure, choose any template in the palette.
        </p>

        <p style={{ fontWeight: 500 }}>Injecting Module</p>
        <p>
          The diagram component’s features are segregated into individual
          feature-wise modules. To generate diagrams from an external data
          source, inject
          <code>DataBinding</code> module into <code>services</code>. To
          automatically arrange the objects in an organizational chart, inject
          <code>HierarchicalTree</code> module into <code>services</code>.
        </p>
        <br />
      </div>
    </div>);
}
export default OrganizationModel;
