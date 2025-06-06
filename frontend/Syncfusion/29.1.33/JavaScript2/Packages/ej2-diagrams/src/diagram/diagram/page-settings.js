var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, Complex, ChildProperty } from '@syncfusion/ej2-base';
import { Margin } from '../core/appearance';
/**
 * Defines the size and appearance of the diagram page
 */
var Background = /** @class */ (function (_super) {
    __extends(Background, _super);
    function Background() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Background.prototype, "source", void 0);
    __decorate([
        Property('transparent')
    ], Background.prototype, "color", void 0);
    __decorate([
        Property('None')
    ], Background.prototype, "scale", void 0);
    __decorate([
        Property('None')
    ], Background.prototype, "align", void 0);
    return Background;
}(ChildProperty));
export { Background };
var FitOptions = /** @class */ (function (_super) {
    __extends(FitOptions, _super);
    function FitOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Page')
    ], FitOptions.prototype, "mode", void 0);
    __decorate([
        Property('PageSettings')
    ], FitOptions.prototype, "region", void 0);
    __decorate([
        Complex({ top: 25, bottom: 25, left: 25, right: 25 }, Margin)
    ], FitOptions.prototype, "margin", void 0);
    __decorate([
        Property(false)
    ], FitOptions.prototype, "canZoomIn", void 0);
    __decorate([
        Property(undefined)
    ], FitOptions.prototype, "customBounds", void 0);
    __decorate([
        Property(false)
    ], FitOptions.prototype, "canFit", void 0);
    return FitOptions;
}(ChildProperty));
export { FitOptions };
/**
 * Defines the size and appearance of diagram page
 * ```html
 * <div id='diagram'></div>
 * ```
 * ```typescript
 * let diagram: Diagram = new Diagram({
 * ...
 * pageSettings: {  width: 800, height: 600, orientation: 'Landscape',
 * background: { color: 'blue' }, boundaryConstraints: 'Infinity',
 * multiplePage: true, showPageBreaks: true, },
 * ...
 * });
 * diagram.appendTo('#diagram');
 * ```
 *
 * @default {}
 */
var PageSettings = /** @class */ (function (_super) {
    __extends(PageSettings, _super);
    function PageSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], PageSettings.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], PageSettings.prototype, "height", void 0);
    __decorate([
        Complex({}, Margin)
    ], PageSettings.prototype, "margin", void 0);
    __decorate([
        Property('Landscape')
    ], PageSettings.prototype, "orientation", void 0);
    __decorate([
        Property('Infinity')
    ], PageSettings.prototype, "boundaryConstraints", void 0);
    __decorate([
        Complex({}, Background)
    ], PageSettings.prototype, "background", void 0);
    __decorate([
        Property(false)
    ], PageSettings.prototype, "multiplePage", void 0);
    __decorate([
        Property(false)
    ], PageSettings.prototype, "showPageBreaks", void 0);
    __decorate([
        Complex({}, FitOptions)
    ], PageSettings.prototype, "fitOptions", void 0);
    return PageSettings;
}(ChildProperty));
export { PageSettings };
/**
 * Diagram ScrollSettings module handles the scroller properties of the diagram
 */
var ScrollSettings = /** @class */ (function (_super) {
    __extends(ScrollSettings, _super);
    function ScrollSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(0)
    ], ScrollSettings.prototype, "horizontalOffset", void 0);
    __decorate([
        Property(0)
    ], ScrollSettings.prototype, "verticalOffset", void 0);
    __decorate([
        Property(1)
    ], ScrollSettings.prototype, "currentZoom", void 0);
    __decorate([
        Property(0)
    ], ScrollSettings.prototype, "viewPortWidth", void 0);
    __decorate([
        Property(0)
    ], ScrollSettings.prototype, "viewPortHeight", void 0);
    __decorate([
        Property(0.2)
    ], ScrollSettings.prototype, "minZoom", void 0);
    __decorate([
        Property(30)
    ], ScrollSettings.prototype, "maxZoom", void 0);
    __decorate([
        Property('Diagram')
    ], ScrollSettings.prototype, "scrollLimit", void 0);
    __decorate([
        Property()
    ], ScrollSettings.prototype, "scrollableArea", void 0);
    __decorate([
        Property(false)
    ], ScrollSettings.prototype, "canAutoScroll", void 0);
    __decorate([
        Property(100)
    ], ScrollSettings.prototype, "autoScrollFrequency", void 0);
    __decorate([
        Complex({ left: 15, right: 15, top: 15, bottom: 15 }, Margin)
    ], ScrollSettings.prototype, "autoScrollBorder", void 0);
    __decorate([
        Complex({ left: 0, right: 0, top: 0, bottom: 0 }, Margin)
    ], ScrollSettings.prototype, "padding", void 0);
    __decorate([
        Property(0.2)
    ], ScrollSettings.prototype, "zoomFactor", void 0);
    return ScrollSettings;
}(ChildProperty));
export { ScrollSettings };
