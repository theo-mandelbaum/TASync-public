"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./animation.css");
var Animation = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        loadData();
    }, []);
    var _a = (0, react_1.useState)({
        isDataLoading: true,
        profileimage: "image e-avatar",
        postimage: "image",
        cardname: "",
        cardtime: "",
        listData: []
    }), userRequest = _a[0], setUserRequest = _a[1];
    var fields = { text: 'text' };
    var getData = function () {
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
    var loadData = function () {
        getData().then(function (data) {
            setUserRequest({
                profileimage: data.profImage,
                postimage: data.postImage,
                cardname: data.cardName,
                cardtime: data.cardTime,
                isDataLoading: false,
                listData: data.listdata
            });
        });
    };
    // Reload button click event handler.
    var reload = function () {
        // if (!this.state.isDataLoading) {
        setUserRequest({
            profileimage: "image  e-avatar",
            postimage: "image",
            cardname: "",
            cardtime: "",
            isDataLoading: true,
            listData: []
        });
        loadData();
        // }
    };
    var listTemplate = function (data) {
        var letterAvatar = React.createElement("span", { className: 'e-avatar e-avatar-circle' }, data.avatar);
        var imageAvatar = React.createElement("span", { className: "".concat(data.pic, " e-avatar e-avatar-circle") });
        return (React.createElement("div", { className: 'e-list-wrapper e-list-multi-line e-list-avatar' },
            data.avatar !== "" ? (letterAvatar) : (imageAvatar),
            React.createElement("span", { className: "e-list-item-header" }, data.text),
            React.createElement("span", { className: "e-list-content" }, data.contact)));
    };
    var isDataLoading = userRequest.isDataLoading, profileimage = userRequest.profileimage, postimage = userRequest.postimage, cardname = userRequest.cardname, cardtime = userRequest.cardtime, listData = userRequest.listData;
    var fade;
    var pulse;
    if (isDataLoading) {
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
                React.createElement("div", { className: profileimage })),
            React.createElement("div", { className: "cardinfo" },
                React.createElement("label", { id: "name", style: { fontSize: "15px" } }, cardname),
                React.createElement("br", null),
                React.createElement("label", { id: "time", style: { fontWeight: "normal" } }, cardtime)),
            React.createElement("div", { className: "cardContent" },
                React.createElement("div", { className: postimage })),
            React.createElement("div", { className: "cardoptions" },
                React.createElement("div", { id: "cardLeftOptn", style: { width: "20%" } },
                    React.createElement("button", { className: "e-btn e-outline e-primary", style: { width: "100%" } }, "Like")),
                React.createElement("div", { id: "cardRightOptn", style: { width: "20%" } },
                    React.createElement("button", { className: "e-btn e-primary", style: { width: "100%" } }, "Share")))));
        pulse = (React.createElement("div", { className: "skeleton-listcard e-card" },
            React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'skeleton-listview', dataSource: listData, sortOrder: "Ascending", height: '420px', template: listTemplate, fields: fields, cssClass: 'e-list-template' })));
    }
    return (React.createElement("div", { className: "control-section" },
        React.createElement("div", { className: "row skeleton-animation" },
            React.createElement("div", null,
                React.createElement("button", { id: "reloadSkeleton", className: "e-btn e-primary", onClick: reload }, "Reload")),
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
exports.default = Animation;
