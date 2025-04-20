import { PortConstraints, PortVisibility } from '../enum/enum';
var PortProperties = /** @class */ (function () {
    function PortProperties(modelProperties) {
        this.modelProperties = modelProperties;
    }
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Convert and assign EJ1 to EJ2 port properties
    PortProperties.prototype.setPortProperties = function (oldPorts) {
        var portCollection = [];
        if (oldPorts.length > 0) {
            for (var i = 0; i < oldPorts.length; i++) {
                var port = oldPorts[parseInt(i.toString(), 10)];
                var newPort = {};
                newPort.style = {};
                newPort.id = port.name;
                if (port.addInfo) {
                    newPort.addInfo = port.addInfo;
                }
                newPort.height = port.size;
                newPort.width = port.size;
                if (port.horizontalAlignment) {
                    newPort.horizontalAlignment = port.horizontalAlignment.charAt(0).toUpperCase() +
                        port.horizontalAlignment.slice(1);
                }
                if (port.verticalAlignment) {
                    newPort.verticalAlignment = port.verticalAlignment.charAt(0).toUpperCase() +
                        port.verticalAlignment.slice(1);
                }
                // 925993: Unable to load an EJ1 diagram JSON into EJ2 Diagram because of port margin undefined.
                if (port.margin) {
                    // eslint-disable-next-line max-len
                    newPort.margin = { left: port.margin.left, right: port.margin.right, top: port.margin.top, bottom: port.margin.bottom };
                }
                newPort.offset = { x: port.offset.x, y: port.offset.y };
                newPort.style.strokeColor = port.borderColor;
                newPort.style.strokeWidth = port.borderWidth;
                newPort.style.fill = port.fillColor;
                newPort.constraints = this.setPortConstraints(port.constraints);
                if (port.pathData) {
                    newPort.pathData = port.pathData;
                }
                if (port.shape === 'path') {
                    newPort.shape = 'Custom';
                }
                else {
                    // 930796: EJ1 Diagram Fails to Load in EJ2 Diagram Builder when port shape is undefined
                    if (port.shape) {
                        newPort.shape = port.shape.charAt(0).toUpperCase() + (port.shape).slice(1);
                    }
                    else {
                        newPort.shape = 'Square';
                    }
                }
                newPort.visibility = this.setPortVisibility(port.visibility);
                portCollection.push(newPort);
            }
        }
        return portCollection;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Sets the port constraints from EJ1 to EJ2
    PortProperties.prototype.setPortConstraints = function (constraints) {
        var portConstraints = PortConstraints.Default;
        // if (constraints & PortConstraints.Drag) {
        //     portConstraints = portConstraints | PortConstraints.Drag;
        // }
        if (constraints & PortConstraints.Draw) {
            portConstraints = portConstraints | PortConstraints.Draw;
        }
        if (constraints & PortConstraints.None) {
            portConstraints = PortConstraints.None;
        }
        return portConstraints;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Sets the portVisibility from EJ1 to EJ2
    PortProperties.prototype.setPortVisibility = function (visibility) {
        var portVisibility;
        if (visibility & PortVisibility.Visible) {
            portVisibility = portVisibility | PortVisibility.Visible;
        }
        if (visibility & PortVisibility.Hidden) {
            portVisibility = portVisibility | PortVisibility.Hidden;
        }
        if (visibility & PortVisibility.Hover) {
            portVisibility = portVisibility | PortVisibility.Hover;
        }
        if (visibility & PortVisibility.Connect) {
            portVisibility = portVisibility | PortVisibility.Connect;
        }
        return portVisibility;
    };
    /**
     * Get module name.
     * @returns {string} Returns the module name
     */
    PortProperties.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'PortProperties';
    };
    return PortProperties;
}());
export { PortProperties };
