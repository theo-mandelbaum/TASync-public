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
import { ComplexBase } from '@syncfusion/ej2-react-base';
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
    __extends(MessageDirective, _super);
    function MessageDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessageDirective.moduleName = 'message';
    return MessageDirective;
}(ComplexBase));
export { MessageDirective };
var MessagesDirective = /** @class */ (function (_super) {
    __extends(MessagesDirective, _super);
    function MessagesDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessagesDirective.propertyName = 'messages';
    MessagesDirective.moduleName = 'messages';
    return MessagesDirective;
}(ComplexBase));
export { MessagesDirective };
