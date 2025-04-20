import { ComplexBase, applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
import { createElement, Component } from 'react';
import { AIAssistView, ChatUI } from '@syncfusion/ej2-interactive-chat';
export * from '@syncfusion/ej2-interactive-chat';

var __extends = (undefined && undefined.__extends) || (function () {
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
/**
 * Represents the React AIAssistView Component
 * ```tsx
 * <AIAssistViewComponent>
 *    <ViewsDirective>
 *      <ViewDirective>
*      </ViewDirective>
 *    </ViewsDirective>
 * </AIAssistViewComponent>
 * ```
 */
var ViewDirective = /** @class */ (function (_super) {
    __extends(ViewDirective, _super);
    function ViewDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewDirective.moduleName = 'view';
    return ViewDirective;
}(ComplexBase));
var ViewsDirective = /** @class */ (function (_super) {
    __extends(ViewsDirective, _super);
    function ViewsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewsDirective.propertyName = 'views';
    ViewsDirective.moduleName = 'views';
    return ViewsDirective;
}(ComplexBase));

var __extends$1 = (undefined && undefined.__extends) || (function () {
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
/**
 * Represents the React AIAssistView Component
 * ```tsx
 * <AIAssistViewComponent></AIAssistViewComponent>
 * ```
 */
var AIAssistViewComponent = /** @class */ (function (_super) {
    __extends$1(AIAssistViewComponent, _super);
    function AIAssistViewComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'views': 'view' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    AIAssistViewComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return AIAssistViewComponent;
}(AIAssistView));
applyMixins(AIAssistViewComponent, [ComponentBase, Component]);

var __extends$2 = (undefined && undefined.__extends) || (function () {
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
/**
 * Represents the React ChatUI Component
 * ```tsx
 * <ChatUIComponent>
 *    <MessagesDirective>
 *      <MessageDirective>
*      </MessageDirective>
 *    </MessagesDirective>
 * </ChatUIComponent>
 * ```
 */
var MessageDirective = /** @class */ (function (_super) {
    __extends$2(MessageDirective, _super);
    function MessageDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageDirective.moduleName = 'message';
    return MessageDirective;
}(ComplexBase));
var MessagesDirective = /** @class */ (function (_super) {
    __extends$2(MessagesDirective, _super);
    function MessagesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessagesDirective.propertyName = 'messages';
    MessagesDirective.moduleName = 'messages';
    return MessagesDirective;
}(ComplexBase));

var __extends$3 = (undefined && undefined.__extends) || (function () {
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
/**
 * Represents the React ChatUI Component
 * ```tsx
 * <ChatUIComponent></ChatUIComponent>
 * ```
 */
var ChatUIComponent = /** @class */ (function (_super) {
    __extends$3(ChatUIComponent, _super);
    function ChatUIComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'messages': 'message' };
        _this.statelessTemplateProps = null;
        _this.templateProps = null;
        _this.immediateRender = false;
        _this.isReactMock = true;
        _this.portals = [];
        return _this;
    }
    ChatUIComponent.prototype.render = function () {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    };
    return ChatUIComponent;
}(ChatUI));
applyMixins(ChatUIComponent, [ComponentBase, Component]);

export { AIAssistViewComponent, ChatUIComponent, MessageDirective, MessagesDirective, ViewDirective, ViewsDirective };
//# sourceMappingURL=ej2-react-interactive-chat.es5.js.map
