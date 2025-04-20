"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animation = void 0;
var React = require("react");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./animation.css");
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation(props) {
        var _this = _super.call(this, props) || this;
        _this.fields = { text: 'text' };
        _this.state = { isDataLoading: true, profileimage: "image e-avatar", postimage: "image", cardname: "", cardtime: "", listData: [] };
        return _this;
    }
    Animation.prototype.getData = function () {
        return new Promise(function (resolve) { return setTimeout(function () {
            var data = {};
            data['listdata'] = [
                { text: "Jenifer", contact: "(206) 555-985774", id: "1", avatar: "", pic: "pic01" },
                { text: "Amenda", contact: "(206) 555-3412", id: "2", avatar: "A", pic: "" },
                { text: "Isabella", contact: "(206) 555-8122", id: "4", avatar: "", pic: "pic02" },
                { text: "William ", contact: "(206) 555-9482", id: "5", avatar: "W", pic: "" },
                { text: "Jacob", contact: "(71) 555-4848", id: "6", avatar: "", pic: "pic04" },
                { text: "Matthew", contact: "(71) 555-7773", id: "7", avatar: "M", pic: "" },
                { text: "Oliver", contact: "(71) 555-5598", id: "8", avatar: "", pic: "pic03" },
                { text: "Charlotte", contact: "(206) 555-1189", id: "9", avatar: "C", pic: "" },
            ];
            data['profImage'] = "image profile-image e-avatar";
            data['postImage'] = "image post-image";
            data['cardName'] = "Laura Callahan";
            data['cardTime'] = new Date().toLocaleString();
            resolve(data);
        }, 3000); });
    };
    Animation.prototype.loadData = function () {
        var _this = this;
        this.getData().then(function (data) {
            _this.setState({ profileimage: data.profImage, postimage: data.postImage, cardname: data.cardName, cardtime: data.cardTime, isDataLoading: false, listData: data.listdata });
        });
    };
    // Reload button click event handler.
    Animation.prototype.reload = function () {
        // if (!this.state.isDataLoading) {
        this.setState({ profileimage: "image  e-avatar", postimage: "image", cardname: "", cardtime: "", isDataLoading: true, listData: [] });
        this.loadData();
        // }
    };
    ;
    Animation.prototype.listTemplate = function (data) {
        var letterAvatar = React.createElement("span", { className: 'e-avatar e-avatar-circle' }, data.avatar);
        var imageAvatar = React.createElement("span", { className: "".concat(data.pic, " e-avatar e-avatar-circle") });
        return (React.createElement("div", { className: 'e-list-wrapper e-list-multi-line e-list-avatar' },
            data.avatar !== "" ? (letterAvatar) : (imageAvatar),
            React.createElement("span", { className: "e-list-item-header" }, data.text),
            React.createElement("span", { className: "e-list-content" }, data.contact)));
    };
    Animation.prototype.componentDidMount = function () {
        this.loadData();
    };
    Animation.prototype.render = function () {
        var fade;
        var pulse;
        if (this.state.isDataLoading) {
            fade = (React.createElement("div", { id: "skeletonCard", className: "e-card" },
                React.createElement("div", { className: "cardProfile" },
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { shape: 'Circle', width: '60px', height: '60px', shimmerEffect: 'Fade' })),
                React.createElement("div", { className: "cardinfo" },
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { width: '30%', height: '15px', shimmerEffect: 'Fade' }),
                    React.createElement("br", null),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { width: '15%', height: '15px', shimmerEffect: 'Fade' }),
                    React.createElement("br", null)),
                React.createElement("div", { className: "cardContent" },
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { shape: 'Rectangle', width: '100%', height: '250px', shimmerEffect: 'Fade' })),
                React.createElement("div", { className: "cardoptions" },
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { shape: 'Rectangle', width: '20%', height: '30px', shimmerEffect: 'Fade' }),
                    React.createElement(ej2_react_notifications_1.SkeletonComponent, { shape: 'Rectangle', width: '20%', height: '30px', shimmerEffect: 'Fade' }))));
            pulse = (React.createElement("div", { className: "skeleton-listcard e-card" },
                React.createElement("ul", { id: "skeleton-list" }, Array.from({ length: 8 }, function (_, index) {
                    return (React.createElement("li", { key: index },
                        React.createElement("div", { className: "skeleton-listProfileView" },
                            React.createElement(ej2_react_notifications_1.SkeletonComponent, { shape: 'Circle', width: '40px', shimmerEffect: 'Pulse' })),
                        React.createElement("div", null,
                            React.createElement(ej2_react_notifications_1.SkeletonComponent, { width: '80%', height: '10px', shimmerEffect: 'Pulse' }),
                            React.createElement("br", null),
                            React.createElement(ej2_react_notifications_1.SkeletonComponent, { width: '60%', height: '15px', shimmerEffect: 'Pulse' }))));
                }))));
        }
        else {
            fade = (React.createElement("div", { id: "skeletondatacard", className: "e-card" },
                React.createElement("div", { className: "cardProfile" },
                    React.createElement("div", { className: this.state.profileimage })),
                React.createElement("div", { className: "cardinfo" },
                    React.createElement("label", { id: "name", style: { fontSize: "15px" } }, this.state.cardname),
                    React.createElement("br", null),
                    React.createElement("label", { id: "time", style: { fontWeight: "normal" } }, this.state.cardTime)),
                React.createElement("div", { className: "cardContent" },
                    React.createElement("div", { className: this.state.postimage })),
                React.createElement("div", { className: "cardoptions" },
                    React.createElement("div", { id: "cardLeftOptn", style: { width: "20%" } },
                        React.createElement("button", { className: "e-btn e-outline e-primary", style: { width: "100%" } }, "Like")),
                    React.createElement("div", { id: "cardRightOptn", style: { width: "20%" } },
                        React.createElement("button", { className: "e-btn e-primary", style: { width: "100%" } }, "Share")))));
            pulse = (React.createElement("div", { className: "skeleton-listcard e-card" },
                React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'skeleton-listview', dataSource: this.state.listData, sortOrder: "Ascending", height: '420px', template: this.listTemplate, fields: this.fields, cssClass: 'e-list-template' })));
        }
        return (React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "row skeleton-animation" },
                React.createElement("div", null,
                    React.createElement("button", { id: "reloadSkeleton", className: "e-btn e-primary", onClick: this.reload.bind(this) }, "Reload")),
                React.createElement("div", { className: "col-sm-6" },
                    React.createElement("p", { className: 'displayText' }, "Fade Effect"),
                    React.createElement("br", null),
                    fade),
                React.createElement("div", { className: "col-sm-6" },
                    React.createElement("p", { className: 'displayText' }, "Pulse Effect"),
                    React.createElement("br", null),
                    pulse)),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the fade and pulse shimmer effects of the skeleton with a card and a list layout. Click the reload button to load data to the card and list with a skeleton to show loading.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The default skeleton shimmer effect is wave. This can be changed to ",
                    React.createElement("b", null, "Fade"),
                    " and ",
                    React.createElement("b", null, "Pulse"),
                    " shimmer effects using the ",
                    React.createElement("code", null, "shimmerEffect"),
                    " property."))));
    };
    return Animation;
}(sample_base_1.SampleBase));
exports.Animation = Animation;
