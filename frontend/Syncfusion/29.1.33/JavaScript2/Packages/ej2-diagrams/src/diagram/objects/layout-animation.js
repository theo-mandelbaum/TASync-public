import { Container } from '../core/containers/container';
import { DiagramEvent, RealAction, DiagramConstraints } from '../enum/enum';
import { cloneObject as clone } from '../utility/base-util';
import { cloneBlazorObject } from '../utility/diagram-util';
/**
 * Layout Animation function to enable or disable layout animation
 */
var LayoutAnimation = /** @class */ (function () {
    function LayoutAnimation() {
        this.protectChange = false;
        this.setIntervalObject = [];
    }
    /**
     * Layout expand function for animation of expand and collapse \
     *
     * @returns {  void }   Layout expand function for animation of expand and collapse .\
     * @param {boolean} animation - provide the angle value.
     * @param {ILayout} objects - provide the angle value.
     * @param {Node} node - provide the angle value.
     * @param {Diagram} diagram - provide the angle value.
     * @private
     */
    LayoutAnimation.prototype.expand = function (animation, objects, node, diagram) {
        var _this = this;
        var setIntervalObject = {};
        var i = 0;
        var j = 0;
        diagram.realActions = diagram.realActions | RealAction.AnimationClick;
        this.setIntervalObject[parseInt(i.toString(), 10)] = setInterval(function () {
            j++;
            return _this.layoutAnimation(objects, _this.setIntervalObject, j === 6, diagram, node);
        }, 20);
        if (node.isExpanded) {
            var opacity_1 = .2;
            diagram.protectPropertyChange(false);
            //let objects: ILayout = diagram.doLayout();
            var setIntervalObjects_1 = {};
            var x = 0;
            if (animation) {
                this.updateOpacity(node, opacity_1, diagram);
                // eslint-disable-next-line @typescript-eslint/no-this-alias
                var current = this;
                setIntervalObjects_1[parseInt(x.toString(), 10)] = setInterval(function () {
                    diagram.allowServerDataBinding = false;
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    opacity_1 <= 1 ? _this.updateOpacity(node, opacity_1, diagram) : clearInterval(setIntervalObjects_1[0]);
                    opacity_1 += .2;
                    diagram.allowServerDataBinding = true;
                }, 20);
            }
        }
    };
    // Bug 877226: Nodes overlapped while changing isExpanded property with Layout Animation.
    // To stop the and clear the existing setinterval object
    // Added this to stop the existing setinterval object when the layout animation is called for multiple nodes.
    LayoutAnimation.prototype.stopCurrentAnimation = function (objValue, diagram, node) {
        clearInterval(this.setIntervalObject[0]);
        this.setIntervalObject = [];
        for (var k = 0; k < objValue.objects.length; k++) {
            var node1 = diagram.nameTable[objValue.objects[parseInt(k.toString(), 10)].id];
            node1.offsetX += objValue.objects[parseInt(k.toString(), 10)].differenceX
                - (objValue.objects[parseInt(k.toString(), 10)].differenceX / 5);
            node1.offsetY += objValue.objects[parseInt(k.toString(), 10)].differenceY
                - (objValue.objects[parseInt(k.toString(), 10)].differenceY / 5);
        }
        diagram.realActions = diagram.realActions & RealAction.AnimationClick;
        diagram.refreshCanvasLayers();
        diagram.protectPropertyChange(true);
        diagram.triggerEvent(DiagramEvent.animationComplete, undefined);
        diagram.layout.fixedNode = '';
        diagram.protectPropertyChange(this.protectChange);
        var arg = {
            element: cloneBlazorObject(clone(node)), state: (node.isExpanded) ? true : false
        };
        diagram.triggerEvent(DiagramEvent.expandStateChange, arg);
        if (diagram.lineRoutingModule && diagram.constraints & DiagramConstraints.LineRouting) {
            diagram.resetSegments();
        }
    };
    /**
     * Setinterval and Clear interval for layout animation \
     *
     * @returns {  void }   Setinterval and Clear interval for layout animation .\
     * @param {ILayout} objValue - provide the angle value.
     * @param {Object} layoutTimer - provide the angle value.
     * @param {ILayout} stop - provide the angle value.
     * @param {Diagram} diagram - provide the angle value.
     * @param {NodeModel} node - provide the angle value.
     * @private
     */
    LayoutAnimation.prototype.layoutAnimation = function (objValue, layoutTimer, stop, diagram, node) {
        if (!stop) {
            for (var k = 0; k < objValue.objects.length; k++) {
                var node_1 = diagram.nameTable[objValue.objects[parseInt(k.toString(), 10)].id];
                node_1.offsetX += objValue.objects[parseInt(k.toString(), 10)].differenceX / 5;
                node_1.offsetY += objValue.objects[parseInt(k.toString(), 10)].differenceY / 5;
            }
        }
        if (stop) {
            clearInterval(layoutTimer[0]);
            this.setIntervalObject = [];
            diagram.realActions = diagram.realActions & ~RealAction.AnimationClick;
            diagram.refreshCanvasLayers();
            diagram.protectPropertyChange(true);
            diagram.triggerEvent(DiagramEvent.animationComplete, undefined);
            diagram.organizationalChartModule.isAnimation = false;
            diagram.layout.fixedNode = '';
            diagram.protectPropertyChange(this.protectChange);
            var arg = {
                element: cloneBlazorObject(clone(node)), state: (node.isExpanded) ? true : false
            };
            diagram.triggerEvent(DiagramEvent.expandStateChange, arg);
            if (diagram.lineRoutingModule && diagram.constraints & DiagramConstraints.LineRouting) {
                diagram.resetSegments();
            }
        }
    };
    /**
     *update the node opacity for the node and connector once the layout animation starts \
     *
     * @returns {  void }    update the node opacity for the node and connector once the layout animation starts .\
     * @param {Node} source - provide the source value.
     * @param {number} value - provide the value.
     * @param {Diagram} diagram - provide the diagram value.
     * @private
     */
    LayoutAnimation.prototype.updateOpacity = function (source, value, diagram) {
        for (var i = 0; i < source.outEdges.length; i++) {
            var connector = diagram.nameTable[source.outEdges[parseInt(i.toString(), 10)]];
            var target = diagram.nameTable[connector.targetID];
            connector.style.opacity = value;
            for (var j = 0; j < connector.wrapper.children.length; j++) {
                connector.wrapper.children[parseInt(j.toString(), 10)].style.opacity = value;
                target.style.opacity = value;
                if (target.wrapper instanceof Container) {
                    diagram.updateNodeProperty(target.wrapper, undefined, value);
                }
            }
            this.updateOpacity(target, value, diagram);
        }
    };
    /**
     *To destroy the ruler
     *
     * @returns {void} To destroy the ruler
     */
    LayoutAnimation.prototype.destroy = function () {
        /**
         * Destroys the LayoutAnimate module
         */
    };
    /**
     * Core method to return the component name.
     *
     * @returns {string}  Core method to return the component name.
     * @private
     */
    LayoutAnimation.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'LayoutAnimate';
    };
    return LayoutAnimation;
}());
export { LayoutAnimation };
