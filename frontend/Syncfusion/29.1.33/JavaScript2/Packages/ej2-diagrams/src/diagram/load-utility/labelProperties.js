import { AnnotationConstraints } from '../enum/enum';
var LabelProperties = /** @class */ (function () {
    function LabelProperties(modelProperties) {
        this.modelProperties = modelProperties;
    }
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update and assign the annotation properties from EJ1 to EJ2
    LabelProperties.prototype.setLabelProperties = function (oldLabels, item) {
        var labelCollection = [];
        if (oldLabels.length > 0) {
            for (var i = 0; i < oldLabels.length; i++) {
                var label = oldLabels[parseInt(i.toString(), 10)];
                var newLabel = {};
                (newLabel).style = {};
                // 930796: EJ1's Annotation id is not applied properly in EJ2 diagram
                if (label.name) {
                    var annotationId = label.name.split('_');
                    var id = annotationId[annotationId.length - 1];
                    newLabel.id = id;
                }
                if (label.addInfo) {
                    newLabel.addInfo = label.addInfo;
                }
                if (label.text) {
                    newLabel.content = label.text;
                }
                if (label.constraints) {
                    newLabel.constraints = this.setLabelConstraints(label.constraints);
                }
                if (label.readOnly) {
                    newLabel.constraints = newLabel.constraints | AnnotationConstraints.ReadOnly;
                }
                if (label.dragLimit) {
                    newLabel.dragLimit = {
                        left: label.dragLimit.left, right: label.dragLimit.right,
                        top: label.dragLimit.top, bottom: label.dragLimit.bottom
                    };
                }
                if (label.height) {
                    newLabel.height = label.height;
                }
                if (label.horizontalAlignment) {
                    newLabel.horizontalAlignment = label.horizontalAlignment.charAt(0).toUpperCase() +
                        label.horizontalAlignment.slice(1).toLowerCase();
                }
                if (label.verticalAlignment) {
                    newLabel.verticalAlignment = label.verticalAlignment.charAt(0).toUpperCase() +
                        label.verticalAlignment.slice(1).toLowerCase();
                }
                if (label.hyperlink) {
                    newLabel.hyperlink = { link: label.hyperlink, color: 'blue' };
                }
                if (label.margin) {
                    newLabel.margin = {
                        left: label.margin.left, right: label.margin.right,
                        top: label.margin.top, bottom: label.margin.bottom
                    };
                }
                newLabel.rotateAngle = label.rotateAngle;
                if (label.offset) {
                    if (item) {
                        newLabel.offset = label.offset.x;
                    }
                    else {
                        newLabel.offset = { x: label.offset.x, y: label.offset.y };
                    }
                }
                newLabel.style.color = label.fontColor;
                newLabel.style.fontFamily = label.fontFamily;
                newLabel.style.fontSize = label.fontSize;
                newLabel.style.italic = label.italic;
                newLabel.style.bold = label.bold;
                if (label.borderColor) {
                    newLabel.style.strokeColor = label.borderColor;
                }
                if (label.borderWidth) {
                    newLabel.style.strokeWidth = label.borderWidth;
                }
                // 930796: EJ1's Annotation wrapping and text overflow style is not applied properly in EJ2 diagram
                if (label.wrapping) {
                    switch (label.wrapping) {
                        case 'wrap':
                            newLabel.style.textWrapping = 'Wrap';
                            break;
                        case 'nowrap':
                            newLabel.style.textWrapping = 'NoWrap';
                            break;
                        case 'wrapwithoverflow':
                            newLabel.style.textWrapping = 'WrapWithOverflow';
                            break;
                    }
                }
                if (label.textOverflow && label.overflowType) {
                    newLabel.style.textOverflow = (label.overflowType.charAt(0).toUpperCase() +
                        (label.overflowType).slice(1));
                }
                if (label.textAlign) {
                    newLabel.style.textAlign = label.textAlign.charAt(0).toUpperCase() +
                        label.textAlign.slice(1).toLowerCase();
                }
                if (label.textDecoration) {
                    newLabel.style.textDecoration = label.textDecoration.charAt(0).toUpperCase() +
                        label.textDecoration.slice(1).toLowerCase();
                    if (newLabel.style.textDecoration === 'Linethrough') {
                        newLabel.style.textDecoration = 'LineThrough';
                    }
                }
                var appearance = this.setLabelAppearance(newLabel, label);
                newLabel.style.fill = appearance.fill;
                newLabel.style.opacity = appearance.opacity;
                //  if (label.templateId)
                //  newLabel.template = getTemplateContent(label.templateId);
                newLabel.visibility = appearance.visibility;
                if (label.width) {
                    newLabel.width = label.width;
                }
                labelCollection.push(newLabel);
            }
        }
        return labelCollection;
    };
    LabelProperties.prototype.setLabelAppearance = function (newLabel, label) {
        var appearance = {};
        if (label.fillColor) {
            appearance.fill = label.fillColor === 'white' ? 'transparent' : label.fillColor;
        }
        if (label.opacity) {
            appearance.opacity = label.opacity;
        }
        //  if (label.templateId)
        //  newLabel.template = getTemplateContent(label.templateId);
        if (label.visible) {
            appearance.visibility = label.visible;
        }
        return appearance;
    };
    //(EJ2-272287) Provide support to convert the EJ1 diagram to EJ2 diagram
    //Update the annotation constraints from EJ1 to EJ2
    LabelProperties.prototype.setLabelConstraints = function (constraints) {
        var annotationConstraints = AnnotationConstraints.None;
        if (constraints & AnnotationConstraints.Select) {
            annotationConstraints = annotationConstraints | AnnotationConstraints.Select;
        }
        if (constraints & AnnotationConstraints.Drag) {
            annotationConstraints = annotationConstraints | AnnotationConstraints.Drag;
        }
        if (constraints & AnnotationConstraints.Resize) {
            annotationConstraints = annotationConstraints | AnnotationConstraints.Resize;
        }
        if (constraints & AnnotationConstraints.Rotate) {
            annotationConstraints = annotationConstraints | AnnotationConstraints.Rotate;
        }
        return annotationConstraints;
    };
    /**
     * Get module name.
     * @returns {string} returns Module name
     */
    LabelProperties.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'LabelProperties';
    };
    return LabelProperties;
}());
export { LabelProperties };
