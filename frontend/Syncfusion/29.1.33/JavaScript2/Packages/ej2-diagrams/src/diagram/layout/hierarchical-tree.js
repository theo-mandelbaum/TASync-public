import { DiagramAction } from '../enum/enum';
import { Rect } from '../primitives/rect';
import { BezierSegment, OrthogonalSegment } from '../objects/connector';
import { getFunction } from '../utility/base-util';
import { Point } from '../primitives/point';
import { updateLayoutValue } from '../utility/diagram-util';
/**
 * Hierarchical Tree and Organizational Chart
 */
var HierarchicalTree = /** @class */ (function () {
    /**
     * Constructor for the organizational chart module.
     *
     * @private
     */
    function HierarchicalTree() {
        /**
         * Defines the layout animation
         *
         */
        this.isAnimation = false;
        //constructs the layout module
    }
    /**
     * To destroy the organizational chart
     *
     * @returns {void}
     * @private
     */
    HierarchicalTree.prototype.destroy = function () {
        /**
         * Destroy method performed here
         */
    };
    /**
     * Get module name.
     */
    HierarchicalTree.prototype.getModuleName = function () {
        /**
         * Returns the module name of the layout
         */
        return 'OrganizationalChart';
    };
    /**
     * @param nodes
     * @param nameTable
     * @param layoutProp
     * @param viewport
     * @param uniqueId
     * @param action
     * @private
     */
    HierarchicalTree.prototype.updateLayout = function (nodes, nameTable, layoutProp, viewport, uniqueId, action) {
        var layout = {
            type: layoutProp.type,
            connectionPointOrigin: layoutProp.connectionPointOrigin,
            nameTable: nameTable, anchorX: 0, anchorY: 0,
            firstLevelNodes: [], centerNode: null, levels: [], maxLevel: 0, graphNodes: {},
            orientation: layoutProp.orientation,
            horizontalSpacing: layoutProp.horizontalSpacing, verticalSpacing: layoutProp.verticalSpacing,
            verticalAlignment: layoutProp.verticalAlignment, horizontalAlignment: layoutProp.horizontalAlignment,
            fixedNode: layoutProp.fixedNode, getLayoutInfo: getFunction(layoutProp.getLayoutInfo),
            layoutInfo: layoutProp.layoutInfo, margin: layoutProp.margin,
            bounds: layoutProp.bounds, objects: [], root: layoutProp.root
        };
        this.doLayout(layout, nodes, viewport, uniqueId, action);
        return layout;
    };
    HierarchicalTree.prototype.doLayout = function (layout, nodes, viewport, uniqueId, action) {
        var node;
        var i;
        var layoutInfo = {};
        var shape;
        var rootNodes = [];
        if (layout.nameTable[layout.root]) {
            layout.firstLevelNodes.push(layout.nameTable[layout.root]);
        }
        for (i = 0; i < nodes.length; i++) {
            node = nodes[parseInt(i.toString(), 10)];
            if (!node.excludeFromLayout) {
                layoutInfo = layout.graphNodes[node.id] = this.setUpLayoutInfo(layout, node);
                layoutInfo.tree.hasSubTree = false;
                if (!layout.nameTable[layout.root]) {
                    if (!node.inEdges || !node.inEdges.length) {
                        var parentId = 'parentId';
                        var processId = 'processId';
                        if (!node["" + parentId] && !node["" + processId]) {
                            rootNodes.push(node);
                        }
                        if (node.data && String(node.data["" + uniqueId]) === layout.root) {
                            layout.firstLevelNodes.push(node);
                        }
                    }
                }
            }
        }
        if (layout.firstLevelNodes.length === 0) {
            layout.firstLevelNodes = rootNodes;
        }
        //Update relationship(parent and children)
        for (i = 0; i < layout.firstLevelNodes.length; i++) {
            node = layout.firstLevelNodes[parseInt(i.toString(), 10)];
            //let check: boolean;
            this.updateEdges(layout, node, 1, action, nodes);
        }
        if (layout.firstLevelNodes.length > 0) {
            layout.rootNode = layout.firstLevelNodes[0];
            var x = 0;
            var y = 0;
            var minX = void 0;
            var maxY = void 0;
            var maxX = void 0;
            var minY = void 0;
            //let j: number;
            var bounds = void 0;
            for (i = 0; i < layout.firstLevelNodes.length; i++) {
                bounds = this.updateTree(layout, x, y, layout.firstLevelNodes[parseInt(i.toString(), 10)], 0, layout.firstLevelNodes[i - 1]);
                var rootInfo = layout.graphNodes[layout.firstLevelNodes[parseInt(i.toString(), 10)].id];
                bounds.y = Math.min(bounds.y, rootInfo.y);
                bounds.x = Math.min(bounds.x, rootInfo.x);
                if (layout.orientation.indexOf('Left') !== -1) {
                    y = bounds.right + layout.horizontalSpacing;
                }
                else {
                    x = bounds.right + layout.horizontalSpacing;
                }
                if (i === 0) {
                    minX = bounds.x;
                    minY = bounds.y;
                    maxX = bounds.right;
                    maxY = bounds.bottom;
                }
                else {
                    minX = Math.min(minX, bounds.x);
                    minY = Math.min(minY, bounds.y);
                    maxX = Math.max(maxX, bounds.right);
                    maxY = Math.max(maxY, bounds.bottom);
                }
                //Bug 924568: Hierarchical tree child nodes are positioned unevenly when rendering with multiple root nodes.
                //Added below code to empty the layout levels after processing the first root node.
                layout.levels = [];
                layout.maxLevel = undefined;
            }
            this.updateAnchor(layout, { x: minX, y: minY, right: maxX, bottom: maxY }, viewport);
            for (i = 0; i < layout.firstLevelNodes.length; i++) {
                this.updateNodes(layout, layout.firstLevelNodes[parseInt(i.toString(), 10)], 0);
            }
            for (i = 0; i < layout.firstLevelNodes.length; i++) {
                this.updateConnectors(layout, layout.firstLevelNodes[parseInt(i.toString(), 10)], 1);
            }
        }
    };
    HierarchicalTree.prototype.getBounds = function (node) {
        var x = node.offsetX - node.actualSize.width * node.pivot.x;
        var y = node.offsetY - node.actualSize.height * node.pivot.y;
        return new Rect(x, y, node.actualSize.width, node.actualSize.height);
    };
    HierarchicalTree.prototype.updateTree = function (layout, x, y, shape, level, prev, dontupdate) {
        //let dimensions: Dimensions;
        var info = {};
        var lev;
        var obj;
        //let hasChild: number;
        var dimensions = this.getDimensions(layout, shape, x, y, level);
        info = layout.graphNodes[shape.id];
        var firstChild;
        //Set maximum level of layout
        layout.maxLevel = Math.max(layout.maxLevel, level);
        lev = level;
        var hasChild = this.hasChild(layout, shape);
        if (!hasChild && !info.tree.assistants.length) {
            //update leaf nodes
            shape.treeBounds = this.updateLeafNode(layout, shape, prev, dimensions, level, dontupdate);
            return shape.treeBounds;
        }
        else {
            var treeBounds = void 0;
            var shapeBounds = void 0;
            var levelBounds = void 0;
            var d = void 0;
            var asstBounds = void 0;
            var space = void 0;
            var bottom = void 0;
            bottom = dimensions.y + dimensions.height + layout.verticalSpacing;
            if (info.tree.assistants.length) {
                //Vertically place assistants
                obj = this.setDepthSpaceForAssitants(layout, shape, bottom, dimensions.height, level, layout.verticalSpacing);
                lev = obj.level;
                bottom = obj.bottom;
            }
            if (!info.tree.assistants.length && info.tree.orientation !== 'Horizontal') {
                bottom = dimensions.y + dimensions.height + layout.verticalSpacing / 2;
            }
            if (info.tree.children.length) {
                if (info.tree.orientation === 'Horizontal' && (info.tree.type !== 'Balanced' || info.tree.children.length === 1)) {
                    treeBounds = this.updateHorizontalTree(layout, shape, prev, dimensions.x, bottom, lev);
                }
                else if (info.tree.type === 'Balanced') {
                    treeBounds = this.updateHorizontalTreeWithMultipleRows(layout, shape, prev, dimensions.x, bottom, lev);
                }
                else {
                    treeBounds = this.updateVerticalTree(layout, shape, dimensions.x, bottom, lev, dontupdate);
                }
            }
            if (!(info.y && info.y > dimensions.y)) {
                info.y = dimensions.y;
            }
            // 919520: Leaf node position does not align correctly for subTreeAlignment 'Center'
            if (info.mid !== undefined) {
                x = info.mid;
            }
            if (info.tree.assistants.length) {
                //Set breadth space for assistants
                space = x !== undefined ? x : dimensions.x;
                asstBounds = this.setBreadthSpaceForAssistants(layout, shape, dimensions, space, bottom, level);
                if (!hasChild) {
                    levelBounds = treeBounds = asstBounds;
                    x = (levelBounds.x + levelBounds.right) / 2 - dimensions.width / 2;
                    treeBounds = levelBounds;
                }
                d = asstBounds ? asstBounds.canMoveBy : undefined;
            }
            info.x = x;
            if (!info.translate) {
                info.treeWidth = treeBounds.right - treeBounds.x;
            }
            {
                shapeBounds = { x: x, y: dimensions.y, right: x + dimensions.width, bottom: dimensions.y + dimensions.height };
            }
            var translateInfo = {
                layout: layout, shape: shape, shapeBounds: shapeBounds, treeBounds: treeBounds,
                dim: dimensions, level: level
            };
            this.translateSubTree(translateInfo, d, prev !== undefined, dontupdate);
            if (info.firstChild && typeof info.firstChild !== 'string') {
                info.firstChild.x += info.subTreeTranslation;
            }
            shape.treeBounds = treeBounds;
            return treeBounds;
        }
    };
    HierarchicalTree.prototype.updateLeafNode = function (layout, shape, prev, dimensions, level, dontupdate) {
        //let bounds: Bounds;
        var info = layout.graphNodes[shape.id];
        info.x = dimensions.x;
        if (!(info.y && info.y > dimensions.y)) {
            info.y = dimensions.y;
            info.maxLevel = Math.max(level, info.maxLevel || 0);
        }
        // eslint-disable-next-line max-len
        var bounds = { x: dimensions.x, y: dimensions.y, right: dimensions.x + dimensions.width, bottom: dimensions.y + dimensions.height };
        info.maxLevel = Math.max(info.maxLevel || 0, level);
        var translateInfo = {
            layout: layout, shape: shape, shapeBounds: bounds, treeBounds: bounds,
            dim: dimensions, level: level
        };
        this.translateSubTree(translateInfo, undefined, prev !== undefined, dontupdate);
        return { x: info.x, y: info.y, right: info.x + dimensions.width, bottom: info.y + dimensions.height };
    };
    HierarchicalTree.prototype.setUpLayoutInfo = function (layout, item) {
        var info = {};
        info.subTreeTranslation = 0;
        if (layout.type === 'OrganizationalChart') {
            info.tree = { orientation: 'Vertical', type: 'Alternate', offset: 20, enableRouting: true };
        }
        else {
            info.tree = { orientation: 'Horizontal', type: 'Center', enableRouting: true };
        }
        info.tree.children = [];
        info.tree.assistants = [];
        info.tree.level = 0;
        info.translate = true;
        return info;
    };
    HierarchicalTree.prototype.translateSubTree = function (translateInfo, asstDif, translate, dontupdate) {
        var layout = translateInfo.layout;
        var shape = translateInfo.shape;
        var shapeBounds = translateInfo.shapeBounds;
        var treeBounds = translateInfo.treeBounds;
        var level = translateInfo.level;
        var dim = translateInfo.dim;
        var info = layout.graphNodes[shape.id];
        var firstChild = layout.nameTable[info.firstChild ? info.firstChild.child : info.tree.children[0]];
        var firstChildInfo = firstChild ? layout.graphNodes[firstChild.id] : null;
        var hasChild = this.hasChild(layout, shape);
        var intersect = this.findIntersectingLevels(layout, shapeBounds, level, info.actualLevel);
        var treeIntersect = this.findIntersectingLevels(layout, treeBounds, level, info.actualLevel);
        var levelBounds = [];
        //const diff: number;
        if (intersect.length && info.translate) {
            info.intersect = intersect;
            this.spaceLeftFromPrevSubTree(layout, shape, shapeBounds);
            info.canMoveBy = info.diff;
            if (asstDif !== undefined) {
                info.canMoveBy = Math.min(asstDif, info.canMoveBy);
            }
            if (firstChild && firstChildInfo.canMoveBy !== undefined) {
                if (firstChildInfo.canMoveBy >= info.canMoveBy) {
                    info.translated = true;
                }
                info.canMoveBy = Math.min(info.canMoveBy, firstChildInfo.canMoveBy);
            }
            if (translate) {
                info.x -= info.canMoveBy;
                info.subTreeTranslation -= info.canMoveBy;
                if (hasChild) {
                    this.shiftSubordinates(layout, treeIntersect, info.canMoveBy);
                    treeBounds.x = Math.min(treeBounds.x, info.x);
                    treeBounds.right = Math.max(treeBounds.right, info.x + dim.width);
                    treeBounds.bottom = Math.max(treeBounds.bottom, info.y + dim.height);
                    treeBounds.x -= info.canMoveBy;
                    treeBounds.right -= info.canMoveBy;
                }
                if (firstChild && firstChildInfo.canMoveBy > info.canMoveBy) {
                    info.canMoveBy = firstChildInfo.canMoveBy - info.canMoveBy;
                }
                else if (firstChild && info.canMoveBy !== undefined) {
                    info.canMoveBy = 0;
                }
            }
        }
        else {
            if (hasChild) {
                treeBounds.x = Math.min(treeBounds.x, shapeBounds.x);
                treeBounds.right = Math.max(treeBounds.right, shapeBounds.x + dim.width);
                treeBounds.bottom = Math.max(treeBounds.bottom, info.y + dim.height);
            }
            if (!info.translate) {
                info.canMoveBy = 0;
                info.subTreeTranslation = 0;
            }
        }
        if (!dontupdate) {
            shapeBounds = { x: info.x, y: dim.y, right: info.x + dim.width, bottom: dim.y + dim.height };
            levelBounds.push({ rBounds: shapeBounds });
            this.updateRearBounds(layout, shape, levelBounds, level);
        }
    };
    HierarchicalTree.prototype.updateRearBounds = function (layout, shape, levelBounds, level, intersect) {
        var bnds;
        var index;
        var isLastLeaf = true;
        var i;
        var info = {};
        //let firstLevel: Bounds;
        //let lastLevel: Bounds;
        var bottom;
        if (shape) {
            info = layout.graphNodes[shape.id];
            intersect = info.intersect;
            isLastLeaf = !info.tree.children.length && !info.tree.assistants.length;
        }
        var firstLevel = levelBounds[0].rBounds;
        var lastLevel = levelBounds[levelBounds.length - 1].rBounds;
        if (intersect && intersect.length) {
            bnds = layout.levels[intersect[0]].rBounds;
            bottom = bnds.bottom;
            if (bnds.y < firstLevel.y) {
                bnds.bottom = firstLevel.y;
                levelBounds.splice(0, 0, { rBounds: bnds });
            }
            if (bottom > lastLevel.bottom) {
                levelBounds.push({ rBounds: { x: bnds.x, right: bnds.right, y: firstLevel.bottom, bottom: bottom } });
            }
            else {
                bnds = layout.levels[intersect[intersect.length - 1]].rBounds;
                if (isLastLeaf && bnds.bottom > lastLevel.bottom) {
                    bnds.y = lastLevel.bottom;
                    levelBounds.push({ rBounds: bnds });
                }
            }
            index = intersect[0];
            for (i = levelBounds.length - 1; i >= 0; i--) {
                layout.levels.splice(index, 0, levelBounds[parseInt(i.toString(), 10)]);
            }
            index += levelBounds.length;
            layout.levels.splice(index, intersect.length);
        }
        else {
            index = this.findLevel(layout, levelBounds[levelBounds.length - 1].rBounds, level);
            for (i = levelBounds.length - 1; i >= 0; i--) {
                layout.levels.splice(index, 0, levelBounds[parseInt(i.toString(), 10)]);
            }
        }
    };
    HierarchicalTree.prototype.shiftSubordinates = function (layout, intersect, diff) {
        var i;
        //Shift the sublevels by the distance diff
        if (diff !== 0) {
            for (i = 0; i < intersect.length; i++) {
                if (layout.levels[intersect[parseInt(i.toString(), 10)]].rBounds) {
                    layout.levels[intersect[parseInt(i.toString(), 10)]].rBounds.x -= diff;
                    layout.levels[intersect[parseInt(i.toString(), 10)]].rBounds.right -= diff;
                }
            }
        }
    };
    HierarchicalTree.prototype.setDepthSpaceForAssitants = function (layout, shape, bottom, height, lev, vSpace) {
        var info = layout.graphNodes[shape.id];
        var asst = {};
        var asstHeight;
        var i;
        var asstElement;
        var max;
        max = bottom;
        //Vertically place the assistants as alternate layout(alternatively at both right and left sides of parent)
        for (i = 0; i < info.tree.assistants.length; i++) {
            asst = layout.graphNodes[info.tree.assistants[parseInt(i.toString(), 10)]];
            if (asst) {
                asst.tree.children = asst.tree.assistants = [];
                asst.y = bottom;
                asstElement = layout.nameTable[info.tree.assistants[parseInt(i.toString(), 10)]];
                asstHeight = asstElement.actualSize.height;
                if (layout.orientation.indexOf('Left') !== -1) {
                    asstHeight = asstElement.actualSize.width;
                }
                max = bottom + asstHeight + vSpace / 2;
                layout.maxLevel = lev + 1;
                if (i % 2 === 1 && i !== info.tree.assistants.length - 1) {
                    bottom = max;
                    lev++;
                }
            }
        }
        return { level: layout.maxLevel, bottom: bottom + asstHeight + vSpace };
    };
    HierarchicalTree.prototype.setBreadthSpaceForAssistants = function (layout, shape, dim, space, bottom, level) {
        var asst = {};
        var asstWidth;
        //let prevBounds: number;
        var bounds;
        var asstElement;
        var i;
        var info = layout.graphNodes[shape.id];
        //let max: number = bottom;
        var lev = level;
        var left;
        var diff;
        var intersect;
        var levelBounds = { x: 0, y: 0, right: 0, bottom: 0 };
        for (i = 0; i < info.tree.assistants.length; i++) {
            asst = layout.graphNodes[info.tree.assistants[parseInt(i.toString(), 10)]];
            //Arrange assistants at both left and right sides of parent(like alternate layout)
            //Check - By default, distance to be left between parent and child nodes is assumed as 20.
            //It can be modified/customized later.
            if (asst) {
                asstElement = layout.nameTable[info.tree.assistants[parseInt(i.toString(), 10)]];
                asstWidth = asstElement.actualSize.width;
                if (layout.orientation.indexOf('Left') !== -1) {
                    asstWidth = asstElement.actualSize.height;
                }
                if (i % 2 === 0) {
                    left = space + dim.width / 2 - 20 - asstWidth;
                }
                else {
                    left = space + dim.width / 2 + 20;
                }
                //Check - What will happen if update leaf node is called? Since assistants don't have children
                bounds = this.updateTree(layout, left, asst.y, layout.nameTable[info.tree.assistants[parseInt(i.toString(), 10)]], lev + 1);
                if (!this.hasChild(layout, shape)) {
                    if (i === 0) {
                        levelBounds = bounds;
                    }
                    else {
                        this.uniteRects(levelBounds, bounds);
                    }
                }
                if (i % 2 === 0 && asst.prevBounds) {
                    if (diff === undefined) {
                        diff = asst.canMoveBy;
                    }
                    else {
                        diff = Math.min(diff, asst.canMoveBy);
                    }
                }
                if (i % 2 === 1 || i === info.tree.assistants.length - 1) {
                    intersect = this.findIntersectingLevels(layout, bounds, lev + 1);
                    //Update rightmost positions of known layout levels
                    this.updateRearBounds(layout, null, [{ rBounds: bounds }], lev + 1, intersect);
                    lev++;
                }
            }
        }
        if (levelBounds) {
            levelBounds.canMoveBy = diff;
        }
        return levelBounds;
    };
    HierarchicalTree.prototype.getDimensions = function (layout, shape, x, y, level) {
        var width;
        width = shape.actualSize.width;
        var height;
        height = shape.actualSize.height;
        layout.orientation = layout.orientation || 'TopToBottom';
        if (layout.orientation.indexOf('Left') !== -1) {
            if (!level) {
                //let temp: number;
                var temp = x;
                x = y;
                y = temp;
            }
            height = shape.actualSize.width;
            width = shape.actualSize.height;
        }
        return { x: x, y: y, width: width, height: height };
    };
    HierarchicalTree.prototype.hasChild = function (layout, shape) {
        //Check whether the node has children
        var shape1 = layout.graphNodes[shape.id];
        return shape1 ? shape1.tree.children && shape1.tree.children.length : 0;
    };
    HierarchicalTree.prototype.updateHorizontalTree = function (layout, shape, prev, x, y, level) {
        //Get dimensions with respect to layout orientations
        //let dimensions: Dimensions;
        var dimensions = this.getDimensions(layout, shape, x, y, level);
        var info = {};
        info = layout.graphNodes[shape.id];
        var side = info.tree.type;
        //let lev: number;
        var lev = level;
        var right = 0;
        right = x;
        var bottom = y;
        var width;
        var height;
        var child;
        var childBounds;
        var childWidth;
        var childHeight;
        //let prevBounds: Bounds;
        var bounds;
        var actBounds;
        var maxLevel;
        var translateSibilingsBy;
        var canMoveBy;
        var oldActBounds;
        var i;
        var childInfo;
        var firstChildInfo;
        var prevLayoutLevels = layout.levels.slice(0, layout.levels.length);
        if (this.hasChild(layout, shape)) {
            //let h: boolean;
            var h = layout.orientation.indexOf('Left') !== -1 ? true : false;
            for (i = 0; i < info.tree.children.length; i++) {
                child = layout.nameTable[info.tree.children[parseInt(i.toString(), 10)]];
                width = child.actualSize.width;
                height = child.actualSize.height;
                childWidth = h ? height : width;
                childHeight = h ? width : height;
                var prevBounds = layout.levels[lev + 1] ? layout.levels[lev + 1].rBounds : null;
                //Update sub tree
                childBounds = this.updateTree(layout, right, bottom, child, lev + 1, layout.nameTable[info.tree.children[i - 1]]);
                childInfo = layout.graphNodes[child.id];
                info.maxLevel = Math.max(info.maxLevel || 0, childInfo.maxLevel || 0);
                actBounds = { x: childInfo.x, y: childInfo.y, right: childInfo.x + childWidth, bottom: childInfo.y + childHeight };
                if (i === 0) {
                    //Compare with previous(right most) subtree
                    bounds = {
                        x: Math.min(childInfo.x, childBounds.x), y: Math.min(childInfo.y, childBounds.y),
                        right: childBounds.right, bottom: childBounds.bottom
                    };
                    firstChildInfo = childInfo;
                }
                if (!oldActBounds) {
                    oldActBounds = actBounds;
                }
                else {
                    oldActBounds.x = actBounds.x;
                    oldActBounds.y = actBounds.y;
                    if (actBounds.right > oldActBounds.right) {
                        oldActBounds.right = actBounds.right;
                    }
                    oldActBounds.bottom = actBounds.bottom;
                    //oldActBounds = actBounds;
                }
                //Compare with previous subtree if level of the child is greater than the level of previous sub tree
                //Check - what will happen if level of second child is greater than current child
                if (i === 0) {
                    info.firstChild = { x: childInfo.x, canMoveBy: childInfo.canMoveBy, child: child.id };
                }
                if (this.hasChild(layout, child)) {
                    if (!info.firstChild || info.firstChild.x >= childInfo.firstChild.x) {
                        if (childInfo.firstChild && info.firstChild.canMoveBy < childInfo.canMoveBy) {
                            canMoveBy = info.firstChild.canMoveBy;
                            childInfo.canMoveBy = canMoveBy;
                            layout.graphNodes[info.firstChild.child].canMoveBy = canMoveBy;
                            info.firstChild.canMoveBy = canMoveBy;
                        }
                        var canMoveValue = canMoveBy !== undefined ? canMoveBy : childInfo.canMoveBy;
                        info.firstChild = { x: childInfo.firstChild.x, canMoveBy: canMoveValue, child: child.id };
                    }
                    else if (childInfo.firstChild && childInfo.translated && info.firstChild.canMoveBy > childInfo.canMoveBy) {
                        info.firstChild.canMoveBy = layout.graphNodes[info.firstChild.child].canMoveBy = childInfo.canMoveBy;
                    }
                }
                maxLevel = maxLevel ? Math.max(childInfo.maxLevel, maxLevel) : childInfo.maxLevel;
                this.uniteRects(bounds, childBounds);
                if (i !== 0 && !this.hasChild(layout, child) && childInfo.subTreeTranslation < 0) {
                    right = childBounds.right - childInfo.subTreeTranslation + layout.horizontalSpacing;
                }
                else {
                    right = childBounds.right + layout.horizontalSpacing;
                }
            }
            if (!isNaN(translateSibilingsBy)) {
                firstChildInfo.canMoveBy = translateSibilingsBy;
            }
            info.mid = (firstChildInfo.x + oldActBounds.right) / 2 - dimensions.width / 2;
            //Set parent based on the chart type
            if (side === 'Left') {
                info.mid = actBounds.right - dimensions.width;
            }
            else if (side === 'Right') {
                info.mid = x;
            }
        }
        return bounds;
    };
    /* eslint-disable */
    HierarchicalTree.prototype.updateHorizontalTreeWithMultipleRows = function (layout, shape, prev, x, y, level) {
        //declarations
        var child;
        var childInfo;
        var childBounds;
        var childWidth;
        var childHeight;
        var firstChildInfo;
        var maxLevel;
        var bounds;
        var rowBounds;
        var width;
        var height;
        var diff;
        var translateSibilingsBy;
        var fchild;
        var maxRowWidth;
        var j;
        var i;
        var k;
        var max;
        var leftCenter;
        var rightCenter;
        //Get dimensions with respect to layout orientations
        var dimensions = this.getDimensions(layout, shape, x, y, level);
        var info = layout.graphNodes[shape.id];
        var side = info.tree.type;
        var lev = level;
        var right = x;
        var bottom = y;
        var prevLayoutLevels = layout.levels.slice(0, layout.levels.length);
        var minTranslation = 0;
        if (this.hasChild(layout, shape)) {
            var h = layout.orientation.indexOf('Left') !== -1 ? true : false;
            var align = void 0;
            var rows = this.splitChildrenInRows(layout, shape);
            var unique = info.tree.children.length === 5 && rows[0].length === 3;
            var leftTree = [];
            var rightTree = [];
            if (!unique) {
                this.splitRows(rows, leftTree, rightTree);
            }
            else {
                rightTree = rows;
            }
            var treeInfo = { leftTree: leftTree, rows: rows, rightTree: rightTree, dimensions: dimensions };
            var rightMost = this.updateLeftTree(layout, treeInfo, shape, x, bottom, lev);
            bounds = treeInfo.bounds;
            var rightX = void 0;
            var center = (rightMost || 0) + (rightMost !== undefined ? (layout.horizontalSpacing / 2) : 0);
            if (rightMost !== undefined) {
                info.mid = center - dimensions.width / 2;
                rightX = rightMost + layout.horizontalSpacing;
            }
            bottom = y;
            var rightBounds = void 0;
            rightBounds = [];
            for (i = 0; i < rightTree.length; i++) {
                if (rows[i].length % 2 === 1 && i === rightTree.length - 1 || unique) {
                    right = x;
                }
                else {
                    right = rightX || x;
                }
                if (i !== 0) {
                    bottom = rightBounds[i - 1].bottom + layout.verticalSpacing;
                }
                for (j = 0; j < rightTree[i].length; j++) {
                    child = layout.nameTable[rightTree[i][j]];
                    width = child.actualSize.width;
                    height = child.actualSize.height;
                    childWidth = h ? height : width;
                    childHeight = h ? width : height;
                    //Update sub tree
                    childInfo = layout.graphNodes[child.id];
                    childInfo.actualLevel = lev + 1 + i;
                    if (j === 0 && leftTree[i] && leftTree[i].length) {
                        childInfo.translate = false;
                    }
                    if (unique && i === 1) {
                        if (j === 0 && leftCenter + childWidth + layout.horizontalSpacing <= rightCenter) {
                            align = true;
                            right = leftCenter - childWidth / 2;
                        }
                        if (align && j === 1) {
                            right = rightCenter - childWidth / 2;
                        }
                    }
                    childBounds = this.updateTree(layout, right, bottom, child, lev + 1, layout.nameTable[rightTree[i][j - 1]]);
                    if (unique && j <= 2 && i === 0) {
                        if (j === 1) {
                            leftCenter = childBounds.x - layout.horizontalSpacing / 2;
                            rightCenter = childBounds.x + childWidth + layout.horizontalSpacing / 2;
                        }
                    }
                    if (j === 0) {
                        rightBounds[i] = { x: childBounds.x, y: childBounds.y, right: childBounds.right, bottom: childBounds.bottom };
                    }
                    else {
                        this.uniteRects(rightBounds[i], childBounds);
                    }
                    if (!bounds) {
                        bounds = {
                            x: rightBounds[i].x, y: rightBounds[i].y, right: rightBounds[i].right,
                            bottom: rightBounds[i].bottom
                        };
                    }
                    this.uniteRects(bounds, rightBounds[i]);
                    right = childBounds.right + layout.horizontalSpacing;
                    if (!info.firstChild || ((i === rightTree.length - 1 && rows[i].length % 2 === 1) || unique)
                        && j === 0 && childInfo.canMoveBy !== undefined && minTranslation > childInfo.canMoveBy) {
                        minTranslation = Math.min(minTranslation, childInfo.canMoveBy || 0);
                        info.firstChild = { x: childInfo.x, child: child.id, canMoveBy: childInfo.canMoveBy };
                    }
                    treeInfo.leftCenter = leftCenter;
                    treeInfo.rightCenter = rightCenter;
                    treeInfo.align = align;
                    treeInfo.level = lev;
                    treeInfo.rightBounds = rightBounds;
                    this.alignRowsToCenter(layout, i, shape, treeInfo, rightX);
                }
            }
        }
        return bounds;
    };
    /* eslint-enable */
    HierarchicalTree.prototype.updateLeftTree = function (layout, treeInfo, shape, x, bottom, lev) {
        var leftTree = treeInfo.leftTree;
        var info = layout.graphNodes[shape.id];
        var right;
        var leftBounds = [];
        var minTranslation;
        var rightMost;
        var childBounds;
        var bounds;
        var h = layout.orientation.indexOf('Left') !== -1 ? true : false;
        //Arrange left side
        for (var i = 0; i < leftTree.length && leftTree[parseInt(i.toString(), 10)].length; i++) {
            right = x;
            if (leftBounds[i - 1]) {
                bottom = leftBounds[i - 1].bottom + layout.verticalSpacing;
            }
            for (var j = 0; j < leftTree[parseInt(i.toString(), 10)].length; j++) {
                var child = layout.nameTable[leftTree[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)]];
                var childWidth = h ? child.actualSize.height : child.actualSize.width;
                var childHeight = h ? child.actualSize.width : child.actualSize.height;
                //Update sub tree
                var childInfo = layout.graphNodes[child.id];
                childInfo.actualLevel = lev + 1 + i;
                childBounds = this.updateTree(layout, right, bottom, child, lev + 1, layout.nameTable[leftTree[parseInt(i.toString(), 10)][j - 1]]);
                if (j === 0) {
                    leftBounds[parseInt(i.toString(), 10)] = {
                        x: childBounds.x, y: childBounds.y, right: childBounds.right, bottom: childBounds.bottom
                    };
                }
                else {
                    this.uniteRects(leftBounds[parseInt(i.toString(), 10)], childBounds);
                }
                if (i === 0 && j === 0) {
                    minTranslation = childInfo.canMoveBy;
                    info.firstChild = { x: childInfo.x, child: child.id, canMoveBy: childInfo.canMoveBy };
                }
                else if (j === 0 && childInfo.canMoveBy !== undefined && minTranslation > childInfo.canMoveBy) {
                    minTranslation = Math.min(minTranslation, childInfo.canMoveBy || 0);
                    info.firstChild = { x: childInfo.x, child: child.id, canMoveBy: childInfo.canMoveBy };
                }
                right = childBounds.right + layout.horizontalSpacing;
            }
            if (i === 0) {
                rightMost = leftBounds[parseInt(i.toString(), 10)].right;
            }
            else {
                rightMost = Math.max(rightMost, leftBounds[parseInt(i.toString(), 10)].right);
            }
        }
        //Translate to same positions
        for (var i = 0; i < leftTree.length && leftTree[parseInt(i.toString(), 10)].length; i++) {
            if (rightMost !== leftBounds[parseInt(i.toString(), 10)].right) {
                var diff = rightMost - leftBounds[parseInt(i.toString(), 10)].right;
                for (var j = 0; j < leftTree[parseInt(i.toString(), 10)].length; j++) {
                    var element = layout.nameTable[leftTree[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)]];
                    var elementInfo = layout.graphNodes[leftTree[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)]];
                    elementInfo.x += diff;
                }
                //leftBounds[i].x += diff;
                //leftBounds[i].right += diff;
            }
            if (i === 0) {
                bounds = { x: leftBounds[0].x, y: leftBounds[0].y, right: leftBounds[0].right, bottom: leftBounds[0].bottom };
            }
            else {
                this.uniteRects(bounds, leftBounds[parseInt(i.toString(), 10)]);
            }
        }
        treeInfo.bounds = bounds;
        return rightMost;
    };
    HierarchicalTree.prototype.alignRowsToCenter = function (layout, i, shape, treeInfo, rightX) {
        var max;
        var centered;
        var diff;
        var info = layout.graphNodes[shape.id];
        var rows = treeInfo.rows;
        var rightTree = treeInfo.rightTree;
        var leftCenter = treeInfo.leftCenter;
        var rightCenter = treeInfo.rightCenter;
        var align = treeInfo.align;
        var rightBounds = treeInfo.rightBounds;
        var dimensions = treeInfo.dimensions;
        var lev = treeInfo.level;
        var unique = info.tree.children.length === 5 && rows[0].length === 3;
        if (unique && i === 1) {
            max = (rightBounds[0].right - rightBounds[0].x) >= (rightBounds[1].right - rightBounds[1].x) ? 0 : 1;
        }
        if (i === rows.length - 1) {
            if (rows[parseInt(i.toString(), 10)].length % 2 === 1 || unique && i === 1) {
                centered = rightTree[parseInt(i.toString(), 10)][Math.floor(rightTree[parseInt(i.toString(), 10)].length / 2)];
                //let centerObjct: INode;
                var centerObjct = layout.nameTable["" + centered];
                //let childDimension: Dimensions;
                var centeredX = layout.graphNodes["" + centered].x;
                var centeredY = layout.graphNodes["" + centered].y;
                var childDimension = this.getDimensions(layout, centerObjct, centeredX, centeredY, lev + 1);
                diff = undefined;
                if (!align && unique) {
                    if (max === 1) {
                        i = 0;
                    }
                    diff = (rightBounds[parseInt(max.toString(), 10)].x + rightBounds[parseInt(max.toString(), 10)].right) / 2
                        - (rightBounds[parseInt(i.toString(), 10)].x
                            + rightBounds[parseInt(i.toString(), 10)].right) / 2;
                    if (i === 0) {
                        info.mid += diff;
                    }
                }
                else if (!unique && rightX !== undefined) {
                    diff = rightX - layout.horizontalSpacing / 2 - (centeredX + childDimension.width / 2);
                }
                if (diff !== undefined) {
                    this.updateRearBoundsOfTree(layout, rightTree[parseInt(i.toString(), 10)], diff, dimensions);
                }
                if (unique) {
                    info.mid = (rightCenter + leftCenter) / 2 + (i === 0 ? diff : 0) - dimensions.width / 2;
                }
                if (info.mid === undefined && layout.graphNodes["" + centered]) {
                    info.mid = centeredX;
                }
                align = false;
                i++;
            }
        }
    };
    HierarchicalTree.prototype.updateRearBoundsOfTree = function (layout, rightTree, diff, dimensions) {
        for (var j = 0; j < rightTree.length; j++) {
            var childInfo = layout.graphNodes[rightTree[parseInt(j.toString(), 10)]];
            //let child: INode = layout.nameTable[rightTree[j]];
            childInfo.x += diff;
            childInfo.canMoveBy += diff;
            if (j === rightTree.length - 1) {
                //removed child dimensions call calculation, since that is not used
                var childBnds = {
                    x: childInfo.x, y: childInfo.y, right: childInfo.x +
                        dimensions.width, bottom: childInfo.y + dimensions.height
                };
                var intersect = this.findIntersectingLevels(layout, childBnds, childInfo.actualLevel);
                this.updateRearBounds(layout, null, [{ rBounds: childBnds }], childInfo.actualLevel, intersect);
            }
        }
    };
    HierarchicalTree.prototype.splitRows = function (rows, leftTree, rightTree) {
        for (var i = 0; i < rows.length; i++) {
            leftTree[parseInt(i.toString(), 10)] = [];
            rightTree[parseInt(i.toString(), 10)] = [];
            var half = void 0;
            half = rows[parseInt(i.toString(), 10)].length;
            if (rows[parseInt(i.toString(), 10)].length % 2 !== 1) {
                half = Math.ceil(rows[parseInt(i.toString(), 10)].length / 2);
                for (var k = 0; k < half; k++) {
                    leftTree[parseInt(i.toString(), 10)].push(rows[parseInt(i.toString(), 10)][parseInt(k.toString(), 10)]);
                }
            }
            for (var j = leftTree[parseInt(i.toString(), 10)].length; j < rows[parseInt(i.toString(), 10)].length; j++) {
                rightTree[parseInt(i.toString(), 10)].push(rows[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)]);
            }
        }
    };
    HierarchicalTree.prototype.updateVerticalTree = function (layout, shape, x, y, level, dontUpdate) {
        //declarations
        var child;
        var childInfo;
        var childBounds;
        var childWidth;
        var childHeight;
        var prevBounds;
        var bounds;
        var actBounds;
        var oddBounds;
        var evenBounds;
        //let dimensions: Dimensions = this.getDimensions(layout, shape, x, y, level);
        var info = layout.graphNodes[shape.id];
        var firstChild = layout.nameTable[info.tree.children[0]];
        var h = layout.orientation.indexOf('Left') !== -1 ? true : false;
        var factor = info.tree.type === 'Left' ? -1 : 0;
        var right = x;
        var bottom = y;
        var lev = level;
        var i;
        var intersect;
        var type;
        var levels = [];
        var oddLevels = [];
        var canMoveBy; //let diff: number;
        for (i = 0; i < info.tree.children.length; i++) {
            if (info.tree.type === 'Alternate') {
                //arrange at both left and right
                type = (i % 2 === 0 && info.tree.children.length > 2) ? 'Left' : 'Right';
                factor = (i % 2 === 0 && info.tree.children.length > 2) ? -1 : 0;
            }
            right = x + this.findOffset(layout, shape, info, type);
            child = layout.nameTable[info.tree.children[parseInt(i.toString(), 10)]];
            childWidth = h ? child.actualSize.height : child.actualSize.width;
            childHeight = h ? child.actualSize.width : child.actualSize.height;
            //Update sub tree
            childBounds = this.updateTree(layout, right + factor * childWidth, bottom, child, level + 1, undefined, true);
            childInfo = layout.graphNodes[child.id];
            actBounds = { x: childInfo.x, y: childInfo.y, right: childInfo.x + childWidth, bottom: childInfo.y + childHeight };
            if (i === 0) {
                this.uniteRects(childBounds, actBounds);
                bounds = childBounds;
            }
            else {
                this.uniteRects(bounds, childBounds);
            }
            //Check and adjust the space left from previous subtree/sibling
            if (childInfo.prevBounds && !(info.tree.type === 'Alternate' && i % 2 === 1 && info.tree.children.length > 2)) {
                canMoveBy = canMoveBy !== undefined ? Math.min(childInfo.canMoveBy, canMoveBy) : childInfo.canMoveBy;
            }
            //Max level of the subtree node
            info.maxLevel = Math.max(info.maxLevel || 0, childInfo.maxLevel || 0);
            if (!(info.tree.type === 'Alternate' && info.tree.children.length > 2 && i % 2 === 0)) {
                if (info.tree.type === 'Alternate' && info.tree.children.length > 2) {
                    //alternate - arrange children with even index(0,2,4,6,..) at the next level
                    bottom = Math.max(childBounds.bottom, prevBounds.bottom) + layout.verticalSpacing / 2;
                }
                else {
                    // left/right - arrange next child at the nect level(bottom)
                    bottom = childBounds.bottom + layout.verticalSpacing / 2;
                }
                level = info.maxLevel;
                levels.push({ rBounds: actBounds });
                if (!evenBounds) {
                    evenBounds = {
                        x: childInfo.x, y: childInfo.y, right: childInfo.x + childWidth,
                        bottom: childInfo.y + childHeight
                    };
                }
                else {
                    this.uniteRects(evenBounds, actBounds);
                }
                if (childInfo.levelBounds) {
                    levels = levels.concat(childInfo.levelBounds);
                }
            }
            else {
                if (i !== 0) {
                    bottom = prevBounds.bottom + layout.verticalSpacing / 2;
                }
                oddLevels.push({ rBounds: actBounds });
                if (childInfo.levelBounds) {
                    oddLevels = oddLevels.concat(childInfo.levelBounds);
                }
            }
            if (i === 0) {
                info.firstChild = { x: childInfo.x, canMoveBy: childInfo.canMoveBy, child: child.id };
            }
            if (this.hasChild(layout, child)) {
                if (!info.firstChild || info.firstChild.x >= childInfo.firstChild.x) {
                    if (childInfo.firstChild && info.firstChild.canMoveBy < childInfo.canMoveBy) {
                        var canMoveBy_1 = info.firstChild.canMoveBy;
                        childInfo.canMoveBy = canMoveBy_1;
                        layout.graphNodes[info.firstChild.child].canMoveBy = canMoveBy_1;
                        info.firstChild.canMoveBy = canMoveBy_1;
                    }
                    info.firstChild = {
                        x: childInfo.firstChild.x, canMoveBy: canMoveBy !== undefined ? canMoveBy : childInfo.canMoveBy,
                        child: child.id
                    };
                }
                else if (childInfo.firstChild && childInfo.translated && info.firstChild.canMoveBy > childInfo.canMoveBy) {
                    info.firstChild.canMoveBy = layout.graphNodes[info.firstChild.child].canMoveBy = childInfo.canMoveBy;
                }
            }
            prevBounds = actBounds;
        }
        //To set level bounds(right most position of levels)
        if (!dontUpdate) {
            if (info.tree.type === 'Alternate' && info.tree.children.length > 2) {
                oddBounds = {
                    x: oddLevels[0].rBounds.x, y: oddLevels[0].rBounds.y,
                    right: oddLevels[oddLevels.length - 1].rBounds.right, bottom: oddLevels[oddLevels.length - 1].rBounds.bottom
                };
                intersect = this.findIntersectingLevels(layout, oddBounds, lev + 1);
                this.updateRearBounds(layout, null, oddLevels, lev + 1, intersect);
            }
            intersect = this.findIntersectingLevels(layout, evenBounds || bounds, lev + 1);
            this.updateRearBounds(layout, null, evenBounds ? levels : [{ rBounds: bounds }], lev + 1, intersect);
        }
        else {
            info.levelBounds = levels;
        }
        if (!isNaN(canMoveBy)) {
            layout.graphNodes[firstChild.id].canMoveBy = canMoveBy;
        }
        info.childBounds = bounds;
        info.mid = x;
        return bounds;
    };
    HierarchicalTree.prototype.splitChildrenInRows = function (layout, shape) {
        //let info: LayoutInfo;
        var info = layout.graphNodes[shape.id];
        var column;
        column = 4;
        var rows = [];
        var childNodes;
        childNodes = info.tree.children.length;
        var children = this.extend(info.tree.children);
        if (info.tree.rows) {
            //let count: number;
            var count = info.tree.children.length;
            //let columns: number;
            var columns = info.tree.rows;
            if (columns % 2 === 0) {
                column = columns;
            }
            else {
                column = columns - 1;
            }
        }
        else if (info.tree.children.length === 3 || info.tree.children.length === 4) {
            column = 2;
        }
        else if (info.tree.children.length === 5) {
            column = 3;
        }
        while (childNodes > 0) {
            rows[rows.length] = children.splice(0, column);
            childNodes -= column;
            if (childNodes < column) {
                if (childNodes % 2 === 0) {
                    column = childNodes;
                }
                else if (childNodes !== 1) {
                    column = childNodes - 1;
                }
                if (childNodes < column) {
                    column = childNodes;
                }
            }
        }
        return rows;
    };
    HierarchicalTree.prototype.extend = function (temp) {
        var i;
        var dummy = [];
        for (i = 0; i < temp.length; i++) {
            dummy[parseInt(i.toString(), 10)] = temp[parseInt(i.toString(), 10)];
        }
        return dummy;
    };
    HierarchicalTree.prototype.findOffset = function (layout, shape, info, type) {
        var offset = 0;
        var space = (layout.orientation.indexOf('Left') !== -1) ? shape.actualSize.height :
            shape.actualSize.width;
        var treeType = type ? type : info.tree.type;
        offset = info.tree.offset || 20;
        if (info.tree.type === 'Alternate') {
            if (offset >= layout.horizontalSpacing) {
                offset = layout.horizontalSpacing / 2;
            }
        }
        switch (treeType) {
            case 'Left':
                offset = space / 2 - offset;
                break;
            case 'Right':
                offset = offset + space / 2;
                break;
        }
        return offset;
    };
    HierarchicalTree.prototype.uniteRects = function (rect1, rect2) {
        //Unite two rects
        rect1.x = Math.min(rect1.x, rect2.x);
        rect1.right = Math.max(rect1.right, rect2.right);
        rect1.bottom = Math.max(rect1.bottom, rect2.bottom);
    };
    HierarchicalTree.prototype.spaceLeftFromPrevSubTree = function (layout, shape, bounds) {
        //let info: LayoutInfo;
        var info = layout.graphNodes[shape.id];
        var dif;
        var prevBounds; //let intersect: number[]; let k: number;
        //let space: number;
        var space = layout.horizontalSpacing;
        //Find the minimum distance to move towards previous sub tree
        for (var k = 0; k < info.intersect.length; k++) {
            prevBounds = layout.levels[info.intersect[parseInt(k.toString(), 10)]].rBounds;
            dif = bounds.x - (prevBounds.right + space);
            if (info.diff === undefined || dif < info.diff) {
                info.diff = dif;
                info.prevBounds = layout.levels[info.intersect[parseInt(k.toString(), 10)]].rBounds;
            }
        }
    };
    HierarchicalTree.prototype.findIntersectingLevels = function (layout, bounds, level, actualLevel) {
        //intersecting with exact Level
        //let bnds: Bounds;
        var bnds = { x: bounds.x, y: bounds.y, right: bounds.right, bottom: bounds.bottom };
        bnds.y -= layout.verticalSpacing / 2;
        bnds.bottom += layout.verticalSpacing / 2;
        //let intersectingLevels: number[];
        var intersectingLevels = [];
        var rBounds;
        var l;
        l = actualLevel !== undefined ? actualLevel : level;
        rBounds = layout.levels[parseInt(l.toString(), 10)] ? layout.levels[parseInt(l.toString(), 10)].rBounds : null;
        //Performance - We can consider only the intersecting levels
        do {
            if (rBounds && ((bnds.y < rBounds.y && bnds.bottom > rBounds.y)
                || (bnds.y < rBounds.bottom && rBounds.bottom < bnds.bottom) ||
                bnds.y >= rBounds.y &&
                    bnds.bottom <= rBounds.bottom || bnds.y < rBounds.y && bnds.bottom > rBounds.bottom)) {
                var index = 0;
                intersectingLevels.splice(index, 0, l);
            }
            else if (rBounds && rBounds.bottom < bnds.y) {
                break;
            }
            l--;
            rBounds = layout.levels[parseInt(l.toString(), 10)] ? layout.levels[parseInt(l.toString(), 10)].rBounds : null;
        } while (l >= 0);
        l = (actualLevel !== undefined ? actualLevel : level) + 1;
        rBounds = layout.levels[parseInt(l.toString(), 10)] ? layout.levels[parseInt(l.toString(), 10)].rBounds : null;
        do {
            if (rBounds && ((bnds.y < rBounds.y && bnds.bottom > rBounds.y) ||
                (bnds.y < rBounds.bottom && rBounds.bottom < bnds.bottom) ||
                bnds.y >= rBounds.y && bnds.bottom <= rBounds.bottom || bnds.y < rBounds.y && bnds.bottom > rBounds.bottom)) {
                intersectingLevels.push(l);
            }
            else if (rBounds && rBounds.y > bnds.bottom) {
                break;
            }
            l++;
            rBounds = layout.levels[parseInt(l.toString(), 10)] ? layout.levels[parseInt(l.toString(), 10)].rBounds : null;
        } while (l <= layout.levels.length);
        return intersectingLevels;
    };
    HierarchicalTree.prototype.findLevel = function (layout, bounds, level) {
        //let bnds: Bounds;
        var bnds = bounds;
        var l;
        l = 0;
        var rBounds;
        rBounds = layout.levels[parseInt(l.toString(), 10)] ? layout.levels[parseInt(l.toString(), 10)].rBounds : null;
        while (l < layout.levels.length) {
            if (rBounds && bnds.bottom < rBounds.y) {
                return l;
            }
            else {
                l++;
            }
            rBounds = layout.levels[parseInt(l.toString(), 10)] ? layout.levels[parseInt(l.toString(), 10)].rBounds : null;
        }
        return l;
    };
    HierarchicalTree.prototype.getParentNode = function (layout, node) {
        //Return the first parent node
        return layout.nameTable[layout.nameTable[node.inEdges[0]].sourceID];
    };
    HierarchicalTree.prototype.updateEdges = function (layout, node, depth, action, nodes) {
        //let layoutInfo: LayoutInfo;
        var layoutInfo = layout.graphNodes[node.id];
        var j;
        if (node.outEdges && node.outEdges.length && (node.isExpanded || (action === DiagramAction.Render))) {
            for (j = 0; j < node.outEdges.length; j++) {
                //let edge: INode;
                var edge = layout.nameTable[layout.nameTable[node.outEdges[parseInt(j.toString(), 10)]].targetID];
                if (edge && !edge.excludeFromLayout) {
                    if (layoutInfo.tree.children.indexOf(edge.id) === -1) {
                        layoutInfo.tree.children.push(edge.id);
                    }
                    if (edge.outEdges && edge.outEdges.length && edge.isExpanded) {
                        layoutInfo.tree.hasSubTree = true;
                    }
                    this.updateEdges(layout, edge, depth + 1, action, nodes);
                }
            }
        }
        //set level info
        layoutInfo.tree.level = depth;
        //By default, orientation is horizontal for nested trees
        if (layoutInfo.tree.hasSubTree) {
            layoutInfo.tree.orientation = 'Horizontal';
            layoutInfo.tree.type = 'Center';
        }
        //Customizing assistants and children collection
        //Performance-Instead of reading the method everytime, we can set once and can reuse that
        if ((layout.getLayoutInfo || layout.layoutInfo) && layout.type === 'OrganizationalChart') {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            layout.getLayoutInfo ?
                layout.getLayoutInfo(node, layoutInfo.tree) : updateLayoutValue(layoutInfo.tree, layout.layoutInfo, nodes, node);
            if (layoutInfo.tree.type === 'Balanced' && layoutInfo.tree.hasSubTree) {
                layoutInfo.tree.type = 'Center';
                layoutInfo.tree.orientation = 'Horizontal';
            }
        }
        if (layout.level && layoutInfo.tree.type !== 'Alternate' && depth >= layout.level) {
            layoutInfo.tree.hasSubTree = false;
        }
    };
    /* eslint-disable */
    HierarchicalTree.prototype.updateAnchor = function (layout, bounds, viewPort) {
        var node;
        var fixedNode;
        var width = 0;
        var height = 0;
        var mod = 0;
        var yValue = 0;
        var viewPortBounds = new Rect(0, 0, viewPort.x, viewPort.y); //let layoutBounds: Rect;
        var layoutBounds = layout.bounds ? layout.bounds : viewPortBounds;
        var orientation = layout.orientation;
        //Anchor based on fixed nodes
        if (layout.fixedNode) {
            fixedNode = layout.nameTable[layout.fixedNode];
            width = fixedNode.actualSize.width;
            height = fixedNode.actualSize.height;
            layout.anchorX = fixedNode.offsetX;
            layout.anchorY = fixedNode.offsetY;
            var pivot = fixedNode.pivot;
            layout.anchorX += layout.orientation === 'RightToLeft' ? width * pivot.x : -width * pivot.x;
            layout.anchorY += layout.orientation === 'BottomToTop' ? height * pivot.y : -height * pivot.y;
            node = fixedNode;
            mod = 0;
            while (node.inEdges.length) {
                node = this.getParentNode(layout, node);
                mod += layout.graphNodes[node.id].subTreeTranslation || 0;
            }
            if (layout.orientation.indexOf('Left') !== -1) {
                yValue = layout.graphNodes[fixedNode.id].y;
                // eslint-disable-next-line
                orientation === 'LeftToRight' ? layout.anchorX -= yValue : layout.anchorX += yValue;
                layout.anchorY -= layout.graphNodes[fixedNode.id].x + mod;
            }
            else {
                yValue = layout.graphNodes[fixedNode.id].y;
                // eslint-disable-next-line
                layout.anchorX -= layout.graphNodes[fixedNode.id].x + mod;
                orientation === 'TopToBottom' ? layout.anchorY -= yValue : layout.anchorY += yValue;
            }
        }
        else {
            if (orientation === 'TopToBottom' || orientation === 'BottomToTop') {
                switch (layout.horizontalAlignment) {
                    case 'Left':
                        layout.anchorX = (layoutBounds.x - bounds.x) + layout.margin.left;
                        break;
                    case 'Right':
                        layout.anchorX = layoutBounds.x + layoutBounds.width - layout.margin.right - bounds.right;
                        break;
                    case 'Auto':
                    case 'Center':
                        layout.anchorX = layoutBounds.x + layoutBounds.width / 2 - (bounds.x + bounds.right) / 2;
                        break;
                }
                switch (layout.verticalAlignment) {
                    case 'Auto':
                    case 'Top':
                        var top_1;
                        top_1 = layoutBounds.y + layout.margin.top;
                        layout.anchorY = orientation === 'TopToBottom' ? top_1 : bounds.bottom + top_1;
                        break;
                    case 'Bottom':
                        var bottom = void 0;
                        bottom = layoutBounds.y + layoutBounds.height - layout.margin.bottom;
                        layout.anchorY = orientation === 'TopToBottom' ? bottom - bounds.bottom : bottom;
                        break;
                    case 'Center':
                        var center = void 0;
                        center = layoutBounds.y + layoutBounds.height / 2;
                        layout.anchorY = layout.orientation === 'TopToBottom' ?
                            center - (bounds.y + bounds.bottom) / 2 : center + (bounds.y + bounds.bottom) / 2;
                        break;
                }
            }
            else {
                switch (layout.horizontalAlignment) {
                    case 'Auto':
                    case 'Left':
                        var left = void 0;
                        left = layoutBounds.x + layout.margin.left;
                        layout.anchorX = orientation === 'LeftToRight' ? left : bounds.bottom + left;
                        break;
                    case 'Right':
                        var right = void 0;
                        right = layoutBounds.x + layoutBounds.width - layout.margin.right;
                        layout.anchorX = orientation === 'LeftToRight' ? right - bounds.bottom : right;
                        break;
                    case 'Center':
                        var center = void 0;
                        center = layoutBounds.width / 2 + layoutBounds.x;
                        layout.anchorX = layout.orientation === 'LeftToRight' ?
                            center - (bounds.y + bounds.bottom) / 2 : center + (bounds.y + bounds.bottom) / 2;
                        break;
                }
                switch (layout.verticalAlignment) {
                    case 'Top':
                        layout.anchorY = layoutBounds.y + layout.margin.top - bounds.x;
                        break;
                    case 'Auto':
                    case 'Center':
                        layout.anchorY = layoutBounds.y + layoutBounds.height / 2 - (bounds.right + bounds.x) / 2;
                        break;
                    case 'Bottom':
                        layout.anchorY = layoutBounds.y + layoutBounds.height - layout.margin.bottom - bounds.right;
                        break;
                }
            }
        }
    };
    /* eslint-enable */
    HierarchicalTree.prototype.updateConnectors = function (layout, node, level) {
        var i;
        //let info: LayoutInfo;
        //let nodeWidth: number; let nodeHeight: number; let targetWidth: number; let targetHeight: number;
        //let length: number; let offsetLen: number; let points: PointModel[];
        //let segments: ConnSegments;
        var target;
        var conn;
        //Route out edges
        var info = layout.graphNodes[node.id];
        var direction;
        if (node.outEdges.length) {
            for (i = 0; i < node.outEdges.length; i++) {
                conn = layout.nameTable[node.outEdges[parseInt(i.toString(), 10)]];
                conn.points = [];
                target = layout.nameTable[conn.targetID];
                if (conn.visible) {
                    conn.visited = true;
                    if (layout.getConnectorSegments) {
                        var segments = layout.getConnectorSegments(conn);
                    }
                    else {
                        if (info && info.tree.children.indexOf(conn.targetID) !== -1) {
                            //Bug 908662: Connector segments are not proper when we change orientation.
                            //Empty the segments collection before updating the segments.
                            conn.segments = [];
                            if (conn.type === 'Bezier' && layout.connectionPointOrigin === 'SamePoint') {
                                (conn.segments).push(new BezierSegment(conn, 'segments', { type: 'Bezier' }, true));
                            }
                            if (layout.type === 'OrganizationalChart' && conn.type === 'Orthogonal') {
                                this.updateSegments(layout, conn, node, target, i);
                            }
                        }
                    }
                    if (target && (target.isExpanded || this.hasChild(layout, target))) {
                        this.updateConnectors(layout, target, level + 1);
                    }
                }
            }
        }
        if (info && info.tree.assistants.length) {
            //In-Edge routing of assistant nodes
            for (i = 0; i < info.tree.assistants.length; i++) {
                target = layout.nameTable[info.tree.assistants[parseInt(i.toString(), 10)]];
                conn = layout.nameTable[target.inEdges[0]];
                this.get3Points(layout, node, target, conn);
                if (target.isExpanded || this.hasChild(layout, target)) {
                    this.updateConnectors(layout, target, level + 1);
                }
            }
        }
    };
    HierarchicalTree.prototype.updateSegments = function (layout, conn, node, target, i) {
        var info = layout.graphNodes[node.id];
        //Connector routing - Horizontal layout orientation
        if (info.tree.assistants.length) {
            //Route in-edge of child node, if the parent has assistant
            this.updateSegmentsForHorizontalOrientation(layout, node, target, conn);
        }
        else {
            //Route in-edge of child node
            if (info.tree.orientation === 'Horizontal' && info.tree.type === 'Balanced') {
                this.updateSegmentsForBalancedTree(layout, conn, node, target, i);
            }
            else {
                if (info.tree.orientation === 'Horizontal') {
                    this.updateSegmentsForHorizontalOrientation(layout, node, target, conn);
                }
                else {
                    if (info.tree.offset < 5) {
                        this.get5Points(layout, node, target, conn);
                    }
                    else {
                        this.get3Points(layout, node, target, conn);
                    }
                }
            }
        }
    };
    HierarchicalTree.prototype.updateSegmentsForBalancedTree = function (layout, connector, node, target, i) {
        var info = layout.graphNodes[node.id];
        var center;
        var relative;
        if (info.tree.children.length === 5 && i > 2) {
            relative = info.tree.children[1];
            if (isNaN(layout.graphNodes["" + relative].treeWidth)) {
                layout.graphNodes["" + relative].treeWidth = layout.nameTable["" + relative].actualSize.width;
            }
            var factor = i !== 3 ? 1 : -1;
            if (layout.orientation.indexOf('Left') !== -1) {
                center = layout.nameTable["" + relative].offsetY - layout.graphNodes["" + relative].treeWidth / 2 -
                    (layout.verticalSpacing * factor / 2);
            }
            else {
                var center_1 = layout.nameTable["" + relative].offsetX +
                    layout.graphNodes["" + relative].treeWidth / 2 + (layout.horizontalSpacing * factor) / 2;
            }
            this.getSegmentsForMultipleRows(layout, node, target, connector);
        }
        else {
            if (info.tree.children.length > 5) {
                if (i < 4 || i < info.tree.rows) {
                    this.getSegmentsForMultipleRows(layout, node, target, connector);
                }
                else {
                    this.updateSegmentsForHorizontalOrientation(layout, node, target, connector);
                }
            }
            else if (info.tree.children.length === 4) {
                if (i < 2 || i < info.tree.rows) {
                    this.getSegmentsForMultipleRows(layout, node, target, connector);
                }
                else {
                    this.updateSegmentsForHorizontalOrientation(layout, node, target, connector);
                }
            }
            else {
                this.getSegmentsForMultipleRows(layout, node, target, connector);
            }
        }
    };
    HierarchicalTree.prototype.get3Points = function (layout, node, target, connector) {
        var points = [];
        var nodeBounds = this.getBounds(node);
        var targetBounds = this.getBounds(target);
        if (layout.orientation.indexOf('Top') !== -1) {
            var startingPoint = layout.orientation.indexOf('Top') === 0 ? nodeBounds.bottomCenter :
                nodeBounds.topCenter;
            var endPoint = node.offsetX > target.offsetX ? targetBounds.middleRight : targetBounds.middleLeft;
            points.push(startingPoint, { x: nodeBounds.bottomCenter.x, y: endPoint.y }, endPoint);
        }
        else {
            var startingPoint = layout.orientation.indexOf('Left') === 0 ? nodeBounds.middleRight :
                nodeBounds.middleLeft;
            var endPoint = node.offsetY > target.offsetY ? targetBounds.bottomCenter : targetBounds.topCenter;
            points.push(startingPoint, { x: targetBounds.bottomCenter.x, y: nodeBounds.middleRight.y }, endPoint);
        }
        this.getSegmentsFromPoints(points, connector);
    };
    HierarchicalTree.prototype.get5Points = function (layout, node, target, connector) {
        var points = [];
        //let layoutprop: Layout;
        var nodeBounds = this.getBounds(node);
        var targetBounds = this.getBounds(target);
        //let info: LayoutInfo = layout.graphNodes[node.id];
        var startingPoint;
        var endPoint;
        var horizontalSpacing;
        var verticalSpacing;
        if (layout.orientation.indexOf('Top') !== -1) {
            startingPoint = (node.offsetY < target.offsetY) ? nodeBounds.bottomCenter : nodeBounds.topCenter;
            verticalSpacing = layout.verticalSpacing / 4 * ((node.offsetY < target.offsetY) ? 1 : -1);
            horizontalSpacing = layout.horizontalSpacing / 2 * ((node.offsetX > target.offsetX) ? 1 : -1);
            endPoint = (node.offsetX > target.offsetX) ? targetBounds.middleRight : targetBounds.middleLeft;
            points.push(startingPoint, { x: startingPoint.x, y: startingPoint.y + verticalSpacing }, { x: endPoint.x + horizontalSpacing, y: startingPoint.y + verticalSpacing }, { x: endPoint.x + horizontalSpacing, y: endPoint.y }, endPoint);
        }
        else {
            startingPoint = (node.offsetX > target.offsetX) ? nodeBounds.middleLeft : nodeBounds.middleRight;
            endPoint = node.offsetY > target.offsetY ? targetBounds.bottomCenter : targetBounds.topCenter;
            horizontalSpacing = layout.horizontalSpacing / 4 * ((node.offsetX < target.offsetX) ? 1 : -1);
            verticalSpacing = layout.verticalSpacing / 2 * ((node.offsetY > target.offsetY) ? 1 : -1);
            points.push(startingPoint, { x: startingPoint.x + horizontalSpacing, y: startingPoint.y }, { x: startingPoint.x + horizontalSpacing, y: startingPoint.y + verticalSpacing }, { x: endPoint.x, y: startingPoint.y + verticalSpacing }, endPoint);
        }
        this.getSegmentsFromPoints(points, connector);
    };
    HierarchicalTree.prototype.getSegmentsFromPoints = function (points, connector) {
        var segments = [];
        var segment;
        for (var i = 0; i < points.length - 2; i++) {
            segment = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal' }, true);
            segment.direction = Point.direction(points[parseInt(i.toString(), 10)], points[i + 1]);
            segment.length = Point.distancePoints(points[parseInt(i.toString(), 10)], points[i + 1]);
            segments.push(segment);
        }
        connector.segments = segments;
    };
    HierarchicalTree.prototype.getSegmentsForMultipleRows = function (layout, node, target, connector) {
        //let points: PointModel[] = [];
        var segments = [];
        var point;
        var segment;
        var targetBounds = this.getBounds(target);
        var nodeBounds = this.getBounds(node);
        switch (layout.orientation) {
            case 'TopToBottom':
                point = { x: nodeBounds.bottomCenter.x, y: (nodeBounds.bottomCenter.y + layout.verticalSpacing / 4) };
                segment = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal' }, true);
                segment.direction = Point.direction(nodeBounds.bottomCenter, point);
                segment.length = Point.distancePoints(nodeBounds.bottomCenter, point);
                segments.push(segment);
                break;
            case 'BottomToTop':
                point = { x: nodeBounds.bottomCenter.x, y: (nodeBounds.topCenter.y - layout.verticalSpacing / 4) };
                segment = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal' }, true);
                segment.direction = Point.direction(nodeBounds.topCenter, point);
                segment.length = Point.distancePoints(nodeBounds.topCenter, point);
                segments.push(segment);
                break;
            case 'LeftToRight':
                point = { x: (nodeBounds.middleRight.x + layout.verticalSpacing / 4), y: nodeBounds.middleRight.y };
                segment = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal' }, true);
                segment.direction = Point.direction(nodeBounds.middleRight, point);
                segment.length = Point.distancePoints(nodeBounds.middleRight, point);
                segments.push(segment);
                if (targetBounds.center.y !== nodeBounds.center.y) {
                    var point3 = { x: (nodeBounds.middleRight.x + layout.verticalSpacing / 4), y: targetBounds.middleLeft.y };
                    segment = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal' }, true);
                    segment.direction = Point.direction(point, point3);
                    segment.length = Point.distancePoints(point, point3);
                    segments.push(segment);
                }
                break;
            case 'RightToLeft':
                point = { x: (nodeBounds.middleLeft.x - layout.verticalSpacing / 4), y: nodeBounds.middleRight.y };
                segment = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal' }, true);
                segment.direction = Point.direction(nodeBounds.middleLeft, point);
                segment.length = Point.distancePoints(nodeBounds.middleLeft, point);
                segments.push(segment);
                if (targetBounds.center.y !== nodeBounds.center.y) {
                    var point_1 = { x: (nodeBounds.middleLeft.x - layout.verticalSpacing / 4), y: targetBounds.middleLeft.y };
                    segment = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal' }, true);
                    segment.direction = Point.direction(point_1, point_1);
                    segment.length = Point.distancePoints(point_1, point_1);
                    segments.push(segment);
                }
                break;
        }
        connector.segments = segments;
    };
    HierarchicalTree.prototype.updateSegmentsForHorizontalOrientation = function (layout, node, target, connector) {
        var points = [];
        var point2;
        var segment;
        var segments = [];
        var nodeBounds = this.getBounds(node);
        var targetBounds = this.getBounds(target);
        switch (layout.orientation) {
            case 'TopToBottom':
                point2 = { x: nodeBounds.bottomCenter.x, y: (targetBounds.topCenter.y - layout.verticalSpacing / 2) };
                segment = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal' }, true);
                segment.direction = Point.direction(nodeBounds.bottomCenter, point2);
                segment.length = Point.distancePoints(nodeBounds.bottomCenter, point2);
                segments.push(segment);
                break;
            case 'BottomToTop':
                point2 = { x: nodeBounds.topCenter.x, y: (targetBounds.bottomCenter.y + layout.verticalSpacing / 2) };
                segment = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal' }, true);
                segment.direction = Point.direction(nodeBounds.topCenter, point2);
                segment.length = Point.distancePoints(nodeBounds.topCenter, point2);
                segments.push(segment);
                break;
            case 'LeftToRight':
                point2 = { x: (targetBounds.middleLeft.x - layout.verticalSpacing / 2), y: nodeBounds.middleRight.y };
                segment = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal' }, true);
                segment.direction = Point.direction(nodeBounds.middleRight, point2);
                segment.length = Point.distancePoints(nodeBounds.middleRight, point2);
                segments.push(segment);
                if (targetBounds.center.y !== nodeBounds.center.y) {
                    var point3 = { x: (targetBounds.middleLeft.x - layout.verticalSpacing / 2), y: targetBounds.middleLeft.y };
                    segment = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal' }, true);
                    segment.direction = Point.direction(point2, point3);
                    segment.length = Point.distancePoints(point2, point3);
                    segments.push(segment);
                }
                break;
            case 'RightToLeft':
                point2 = { x: (targetBounds.middleRight.x + layout.verticalSpacing / 2), y: nodeBounds.middleRight.y };
                segment = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal' }, true);
                segment.direction = Point.direction(nodeBounds.middleLeft, point2);
                segment.length = Point.distancePoints(nodeBounds.middleLeft, point2);
                segments.push(segment);
                if (targetBounds.center.y !== nodeBounds.center.y) {
                    var point = { x: (targetBounds.middleRight.x + layout.verticalSpacing / 2), y: targetBounds.middleLeft.y };
                    segment = new OrthogonalSegment(connector, 'segments', { type: 'Orthogonal' }, true);
                    segment.direction = Point.direction(point2, point);
                    segment.length = Point.distancePoints(point2, point);
                    segments.push(segment);
                }
                break;
        }
        connector.segments = segments;
        return points;
    };
    HierarchicalTree.prototype.updateNodes = function (layout, node, mod, update, dx, dy) {
        var i;
        var child;
        var width;
        var height;
        var offsetX;
        var offsetY;
        if (node && !node.excludeFromLayout) {
            width = node.actualSize.width;
            height = node.actualSize.height;
            offsetX = layout.anchorX;
            offsetY = layout.anchorY;
            /*Performance - instead of checking conditions for every node, we can make the layout related
            conditions once and we can reuse them*/
            if (layout.orientation === 'LeftToRight') {
                offsetX += layout.graphNodes[node.id].y + width / 2;
                offsetY += layout.graphNodes[node.id].x + mod + height / 2;
            }
            else if (layout.orientation === 'RightToLeft') {
                offsetX -= layout.graphNodes[node.id].y + width / 2;
                offsetY += layout.graphNodes[node.id].x + mod + height / 2;
            }
            else if (layout.orientation === 'TopToBottom') {
                offsetX += layout.graphNodes[node.id].x + mod + width / 2;
                offsetY += layout.graphNodes[node.id].y + height / 2;
            }
            else {
                offsetX += layout.graphNodes[node.id].x + mod + width / 2;
                offsetY -= layout.graphNodes[node.id].y + height / 2;
            }
            if (layout.graphNodes) {
                dx = dx ? dx : 0;
                dy = dy ? dy : 0;
                offsetX += dx;
                offsetY += dy;
                if (!this.isAnimation) {
                    node.offsetX = offsetX;
                    node.offsetY = offsetY;
                }
            }
            var objects = { id: node.id, differenceX: offsetX - node.offsetX, differenceY: offsetY - node.offsetY };
            layout.objects.push(objects);
            var list = [];
            if (this.hasChild(layout, node)) {
                for (i = 0; i < layout.graphNodes[node.id].tree.children.length; i++) {
                    child = layout.nameTable[layout.graphNodes[node.id].tree.children[parseInt(i.toString(), 10)]];
                    this.updateNodes(layout, child, mod + (layout.graphNodes[node.id].subTreeTranslation || 0), update, dx, dy);
                    list.push(child);
                }
            }
            if (layout.graphNodes[node.id].tree.assistants.length) {
                for (i = 0; i < layout.graphNodes[node.id].tree.assistants.length; i++) {
                    child = layout.nameTable[layout.graphNodes[node.id].tree.assistants[parseInt(i.toString(), 10)]];
                    this.updateNodes(layout, child, mod + (layout.graphNodes[node.id].subTreeTranslation || 0), null, dx, dy);
                }
            }
        }
    };
    return HierarchicalTree;
}());
export { HierarchicalTree };
