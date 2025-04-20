"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
require("./header-bar.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_popups_1 = require("@syncfusion/ej2-popups");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 *  Schedule header customization sample
 */
var HeaderBar = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        // custom code start
        return function () {
            document.removeEventListener('keydown', hidePopup);
            document.removeEventListener('click', hidePopup);
        };
        // custom code end
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var profilePopup;
    var data = (0, ej2_base_1.extend)([], dataSource.employeeEventData, null, true);
    var onActionComplete = function (args) {
        if (args.requestType === 'toolBarItemRendered') {
            var scheduleElement = document.getElementById('schedule');
            var userIconEle = scheduleElement.querySelector('.e-schedule-user-icon');
            userIconEle.onclick = function () {
                if (profilePopup.element.classList.contains('e-popup-close')) {
                    profilePopup.show();
                }
                else {
                    profilePopup.hide();
                }
            };
            var userContentEle = (0, ej2_base_1.createElement)('div', { className: 'e-profile-wrapper' });
            scheduleElement.parentElement.appendChild(userContentEle);
            var getDOMString = (0, ej2_base_1.compile)('<div class="profile-container"><div class="profile-image">' +
                '</div><div class="content-wrap"><div class="resource-name">Nancy</div>' +
                '<div class="destination">Product Manager</div><div class="status">' +
                '<div class="status-icon"></div>Online</div></div></div>');
            var output = getDOMString({});
            profilePopup = new ej2_popups_1.Popup(userContentEle, {
                content: output[0],
                relateTo: '.e-schedule-user-icon',
                position: { X: 'left', Y: 'bottom' },
                collision: { X: 'flip', Y: 'flip' },
                targetType: 'relative',
                viewPortElement: scheduleElement,
                width: 185,
                height: 80
            });
            profilePopup.hide();
            // custom code start
            document.addEventListener('keydown', hidePopup);
            document.addEventListener('click', hidePopup);
            // custom code end
        }
    };
    // custom code start
    var hidePopup = function (event) {
        if (profilePopup.element.classList.contains('e-popup-open') && (event.type === 'keydown' && (event.key === 'Escape') ||
            (event.type === 'click' && event.target && !(event.target.closest('.e-schedule-user-icon') ||
                event.target.closest('.e-profile-wrapper'))))) {
            profilePopup.hide();
        }
    };
    // custom code end
    var onEventRendered = function (args) {
        (0, helper_1.applyCategoryColor)(args, scheduleObj.current.currentView);
    };
    var onChange = function (args) {
        profilePopup.hide();
        scheduleObj.current.showHeaderBar = args.checked;
        scheduleObj.current.dataBind();
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'schedule-header-bar', width: '100%', height: '650px', id: 'schedule', ref: scheduleObj, selectedDate: new Date(2021, 1, 15), eventSettings: { dataSource: data }, actionComplete: onActionComplete, eventRendered: onEventRendered },
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] }),
                    React.createElement(ej2_react_schedule_1.ToolbarItemsDirective, null,
                        React.createElement(ej2_react_schedule_1.ToolbarItemDirective, { name: 'Previous', align: 'Left' }),
                        React.createElement(ej2_react_schedule_1.ToolbarItemDirective, { name: 'Next', align: 'Left' }),
                        React.createElement(ej2_react_schedule_1.ToolbarItemDirective, { name: 'DateRangeText', align: 'Left' }),
                        React.createElement(ej2_react_schedule_1.ToolbarItemDirective, { name: 'Today', align: 'Right' }),
                        React.createElement(ej2_react_schedule_1.ToolbarItemDirective, { align: 'Right', prefixIcon: 'user-icon', text: 'Nancy', cssClass: 'e-schedule-user-icon' }))))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '90%' } },
                                React.createElement("div", { className: 'headerbar' },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'headerbar', checked: true, label: 'Show/Hide Header bar', change: onChange })))))))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo shows the way of adding custom items into the Scheduler header bar. Here, an employee image is added to the header bar, clicking on which will open the popup showing that person's short profile information.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, a popup has been designed separately with a person\u2019s profile info and kept in a hidden state initially. A custom item has been added to the Scheduler header bar by using the",
                React.createElement("code", null,
                    React.createElement("a", { "aria-label": "Toolbar items", href: "https://ej2.syncfusion.com/react/documentation/api/schedule/#toolbaritems" }, "toolbarItems")),
                " property. Here, the default items such as previous, next, date range text, and today have been used along with external icon as custom items."),
            React.createElement("p", null,
                "In case, if the header bar of Scheduler needs to be hidden, it can be done by setting false to ",
                React.createElement("code", null, "showHeaderBar"),
                " property."))));
};
exports.default = HeaderBar;
