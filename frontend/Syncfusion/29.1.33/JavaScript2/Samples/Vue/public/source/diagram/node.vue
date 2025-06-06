<template>

<div class="col-lg-9 control-section">
  <!-- Diagram component section -->
    <div class="content-wrapper">
        <ejs-diagram style='display:block' ref="diagramObject" id="diagram" :width='width' :height='height' :nodes='nodes' :connectors='connectors' :getNodeDefaults='getNodeDefaults' :getConnectorDefaults='getConnectorDefaults' :snapSettings='snapSettings' :selectionChange='selectionChange'></ejs-diagram>
    </div>
</div>
<!-- Property panel section -->
<div class="col-lg-3 property-section diagramNodes-property">
    <div class="property-panel-header">
        Properties
    </div>
     <!-- Appearance section -->
    <div class="row" id="appearance" ref="appearance">
        <div class="row row-header">
            Appearance
        </div>
         <!-- Image previews for node styles -->
        <div class="row" style="padding-top: 8px">
            <div class="image-pattern-style" id="preview0" style="background-image: url(./src/diagram/Images/node/Nodes_1.png); margin-right: 3px">
            </div>
            <div class="image-pattern-style" id="preview1" style="background-image: url(./src/diagram/Images/node/Nodes_2.png); margin-right: 0px 3px">
            </div>
            <div class="image-pattern-style" id="preview2" style="background-image: url(./src/diagram/Images/node/Nodes_3.png); margin: 0px 3px">
            </div>
        </div>
        <div class="row" style="padding-top: 8px">
            <div class="image-pattern-style" id="preview3" style="background-image: url(./src/diagram/Images/node/Nodes_4.png); margin-right: 3px">
            </div>
            <div class="image-pattern-style" id="preview4" style="background-image: url(./src/diagram/Images/node/Nodes_5.png); margin-right: 0px 3px">
            </div>
        </div>
    </div>
     <!-- Behavior section -->
    <div class="row" style="padding-top: 10px">
        <div class="row row-header">
            Behavior
        </div>
        <div class="row" style="padding-top: 8px">
            <!-- Enable or disable the AspectRatio for Node. -->
            <ejs-checkbox ref="aspectRatioobj" id="aspectRatio"  
                          :checked='aspectRatiochecked'
                          :label='aspectRatiolabel'
                          :change='aspectRatiochange'/>
        </div>
        <div class="row" style="padding-top: 8px">
            <!-- Enable or disable the Interaction for Node. -->
            <ejs-checkbox id="lock"  ref="lockoobj"      
                          :checked='lockchecked'
                          :label='label'
                          :change='lockchange'/>
        </div>
    </div>
</div>
<div id="action-description">
    <p>
        This sample visualizes the different stages of a software development life cycle using a circular flow diagram. Customizing the appearance of the nodes is illustrated in this example.
    </p>
</div>
<div id="description">
    <p>
        This example shows how to add nodes to a diagram control and how to customize the appearance of the nodes. The
        <code>style</code> property of the node can be used to customize the appearance of the nodes.
    </p>

    <p>
        To change the appearance, click different styles in the property panel.
    </p>

    <p>
        Here, you can see how to lock nodes to disable editing and how to enable proportional resizing. The
        <code>constraints</code> property of the node allows you to enable/disable editing and proportional resizing.
    </p>
    <br>
</div>
</template>

<style scoped>
/* Css for images in property panel  */
.diagramNodes-property .image-pattern-style {
  background-color: white;
  background-size: contain;
  background-repeat: no-repeat;
  height: 75px;
  width: calc((100% - 12px) / 3);
  cursor: pointer;
  border: 1px solid #d5d5d5;
  background-position: center;
  float: left;
}

.image-pattern-style:hover {
  border-color: gray;
  border-width: 2px;
}

.diagramNodes-property .row {
  margin-left: 0px;
  margin-right: 0px;
}

.diagramNodes-property .row-header {
  font-size: 13px;
  font-weight: 500;
}
/* Selection indicator */
.e-selected-style {
  border-color: #006ce6;
  border-width: 2px;
}

</style>


<script>
// Import necessary Vue components and Syncfusion libraries
import {
  DiagramComponent,
  Diagram,
  NodeConstraints,
  SnapConstraints,
  ConnectorConstraints
} from "@syncfusion/ej2-vue-diagrams";
import {
  CheckBox,
  CheckBoxComponent,
  ChangeEventArgs as CheckBoxChangeEventArgs
} from "@syncfusion/ej2-vue-buttons";
// Initial data for nodes and connectors
let nodes =  [
  {id: 'sdlc', offsetX: 300, offsetY: 288, width:100, height:100, annotations: [{content: 'SDLC'}]},
  {id: 'support', offsetX: 150, offsetY: 250, width:100, height:100, annotations: [{content: 'Support'}]},
  {id: 'analysis', offsetX: 300, offsetY: 150, width:100, height:100, annotations: [{content: 'Analysis'}]},
  {id: 'design', offsetX: 450, offsetY: 250, width:100, height:100, annotations: [{content: 'Design'}]},
  {id: 'implement', offsetX: 400, offsetY: 400, width:100, height:100, annotations: [{content: 'implement'}]},
  {id: 'deploy', offsetX: 200, offsetY: 400, width:100, height:100, annotations: [{content: 'Deploy'}]}
];

let connections = [
  {id: 'connector1', sourceID: 'analysis', targetID: 'design'},
  {id: 'connector2', sourceID: 'design', targetID: 'implement'},
  {id: 'connector3', sourceID: 'implement', targetID: 'deploy'},
  {id: 'connector4', sourceID: 'deploy', targetID: 'support'},
  {id: 'connector5', sourceID: 'support', targetID: 'analysis'}
];

let node;
let diagramInstance;
let element;
let lockElement;
// Export Vue component
export default {
  components: {
    'ejs-diagram': DiagramComponent,
    'ejs-checkbox': CheckBoxComponent
  },
  data: function() {
    return {
     // Diagram properties
      width: "100%",
      height: "645px",
      nodes: nodes,
      connectors: connections,
      //Sets the default values of a node
      getNodeDefaults: (obj) => {
        obj.shape = { shape: "Ellipse" };
        obj.style = { fill: "#37909A", strokeColor: "#024249" };
        obj.annotations[0].margin = { left: 10, right: 10 };
        obj.annotations[0].style = { color: 'white', fill: 'none', strokeColor: 'none' };
        return obj;
      },
      //Sets the default values of a Connector
      getConnectorDefaults: (connector) => {
        if (connector.targetDecorator) {
          connector.targetDecorator.style = {
            fill: "#024249",
            strokeColor: "#024249"
          };
        }
        return { style: { strokeColor: "#024249", strokeWidth: 2 } };
      },
      snapSettings: { constraints: SnapConstraints.None },

       //Disable the AspectRatio if multiple nodes or connectors is selected .
         selectionChange: (args) =>
         {
           if (args.state === 'Changed')
           {
            if (diagramInstance.selectedItems.nodes.length > 1 || diagramInstance.selectedItems.connectors.length > 0) {
                element.disabled = true;
            }
            else {
                element.disabled = false;
            }
           }
         },
      // Aspect ratio checkbox data
      aspectRatiochecked: false,
      aspectRatiolabel: "Aspect ratio",
      aspectRatiochange: setNodeAspectConstraints,
      // Lock checkbox data
      lockchecked: false,
      label: "Lock",
      lockchange: setLockConstraints
    };
  },
  mounted: function() {
     // Initialize diagram instance and checkbox instances
    diagramInstance = this.$refs.diagramObject.ej2Instances;
    element = this.$refs.aspectRatioobj.ej2Instances;
    lockElement = this.$refs.lockoobj.ej2Instances;
    //Click event for Appearance of the Property Panel
    let appearanceObj = this.$refs.appearance;
    //Click event for Appearance of the Property Panel
    appearanceObj.onclick = (args) => {
      let target = args.target;

      let selectedElement = document.getElementsByClassName(
        "e-selected-style"
      );
      if (selectedElement.length) {
        selectedElement[0].classList.remove("e-selected-style");
      }
      if (target.className === "image-pattern-style") {
        for (let i = 0; i < diagramInstance.nodes.length; i++) {
          node = diagramInstance.nodes[i];
          switch (target.id) {
            case "preview0":
              applyStyle(
                node,
                0,
                undefined,
                ~NodeConstraints.Shadow,
                undefined,
                undefined,
                target
              );
              break;
            case "preview1":
              applyStyle(
                node,
                2,
                undefined,
                ~NodeConstraints.Shadow,
                undefined,
                undefined,
                target
              );
              break;
            case "preview2":
              applyStyle(
                node,
                2,
                "5 5",
                ~NodeConstraints.Shadow,
                undefined,
                undefined,
                target
              );
              break;
            case "preview3":
              applyStyle(
                node,
                2,
                "5 5",
                ~NodeConstraints.Shadow,
                "Radial",
                undefined,
                target
              );
              break;
            case "preview4":
              let shadow = {
                angle: 45,
                distance: 15,
                opacity: 0.3,
                color: "grey"
              };
              applyStyle(
                node,
                2,
                "5 5",
                NodeConstraints.Shadow,
                undefined,
                shadow,
                target
              );
              break;
          }
        }
      }
    };
  }
}


//Enable or disable the Aspect Ratio Constraints for Node.
function setNodeAspectConstraints(args) {
    for (let i = 0; i < diagramInstance.nodes.length; i++) {
        let node = diagramInstance.nodes[i];
        if (element.checked) {
            node.constraints |= NodeConstraints.AspectRatio;
        } else {
            node.constraints &= ~NodeConstraints.AspectRatio;
        }
        diagramInstance.dataBind();
    }
}
//Enable or disable the lock Constraints for Nodes and Connectors
function setLockConstraints(args) {
    for (let i = 0; i < diagramInstance.nodes.length; i++) {
        let node= diagramInstance.nodes[i];
        if (lockElement.checked) {
            node.constraints &= ~(NodeConstraints.Resize | NodeConstraints.Rotate | NodeConstraints.Drag | NodeConstraints.Delete);
            node.constraints |= NodeConstraints.ReadOnly;
        } else {
            node.constraints |= NodeConstraints.Default & ~(NodeConstraints.ReadOnly);
        }
    }
     for (let j = 0; j < diagramInstance.connectors.length; j++) {
        let connector = diagramInstance.connectors[j];
        if (lockElement.checked) {
            connector.constraints &= ~(ConnectorConstraints.DragSourceEnd | ConnectorConstraints.DragTargetEnd | ConnectorConstraints.Drag | ConnectorConstraints.Delete);
            connector.constraints |= ConnectorConstraints.ReadOnly;
        } else {
            connector.constraints |= ConnectorConstraints.Default & ~ConnectorConstraints.ReadOnly;
        }
    }
    diagramInstance.dataBind();
}

//Set customStyle for Node.
//Set customStyle for Node.
function applyStyle( //it is in dedicated line here.
  node,
  width,
  array,
  con,
  type,
  sh,
  target
) {
  if (node.style) {
    node.style.fill = "#37909A";
    node.style.strokeWidth = width;
    node.style.strokeColor = "#024249";
    node.style.strokeDashArray = array;
  }
  if (!type && node.style && node.style.gradient) {
    node.style.gradient.type = "None";
  } else {
    let gradient;
    gradient = {
      cx: 50,
      cy: 50,
      fx: 50,
      fy: 50,
      stops: [
        { color: "#00555b", offset: 0 },
        { color: "#37909A", offset: 90 }
      ],
      type: "Radial"
    };
    if (node.style) node.style.gradient = gradient;
  }
  if (con & NodeConstraints.Shadow) {
    node.shadow = { angle: 45, distance: 15, opacity: 0.3, color: "grey" };
    node.constraints |= con;
  } else {
        node.constraints &= con;
    }
  diagramInstance.dataBind();
  target.classList.add("e-selected-style");
}
</script>
