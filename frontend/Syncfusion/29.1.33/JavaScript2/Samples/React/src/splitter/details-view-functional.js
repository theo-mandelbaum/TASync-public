"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./details-view.component.css");
/**
 *  Sample for list-view in splitter
 */
var DetailsView = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var splitterInstance = (0, react_1.useRef)(null);
    var listViewObj = (0, react_1.useRef)(null);
    var firstPaneSize = "35%";
    var firstPaneMinSize = "25%";
    var secondPaneSize = "65%";
    var secondPaneMinSize = "45%";
    var commonData = [];
    var dataSource = {};
    var liElement;
    commonData = [
        { name: 'Margaret', imgUrl: './src/splitter/images/margaret.png', id: '1' },
        { name: 'Laura', imgUrl: './src/splitter/images/laura.png', id: '2' },
        { name: 'Robert', imgUrl: './src/splitter/images/robert.png', id: '3' },
        { name: 'Albert', imgUrl: './src/splitter/images/albert.png', id: '5' },
        { name: 'Michale', imgUrl: './src/splitter/images/michale.png', id: '4' }
    ];
    [[1010, 'data1'], [5010, 'data5'], [10010, 'data10'], [25010, 'data25']].forEach(function (ds) {
        var data = commonData.slice();
        dataSource[ds[1]] = data;
    });
    var template = '<div class="e-list-wrapper e-list-avatar">' +
        '<span class="e-avatar e-avatar-circle ${icon} ${$imgUrl ? \'hideUI\' : \'showUI\' }">' +
        '${icon}</span> <img class="e-avatar e-avatar-circle ${$imgUrl ? \'showUI\' : \'hideUI\' }" ' +
        'src="${imgUrl}" alt="${name}" />' +
        '<span class="e-list-content">${name}</span></div>';
    var onSelect = function (e) {
        var listid = e.item.dataset.uid;
        switch (listid) {
            case '1':
                splitterInstance.current.paneSettings[1].content = '<div class="header-image"><div class="e-avatar e-avatar-circle e-avatar-xlarge"><img src="./src/splitter/images/margaret.png" alt="margaret"></div></div><div class="profile-name">Margeret Peacock</div><table><tr><td class="e-bold">Title</td><td>Sales Representative</td></tr><tr><td class="e-bold">Hire Date</td><td>11/15/1994</td></tr><tr><td class="e-bold">Address</td><td>507 - 20th Ave. E. Apt. 2A</td></tr><tr><td class="e-bold">City</td><td>Seattle</td></tr><tr><td class="e-bold">Phone</td><td>(206) 555-9857</td></tr></table>';
                break;
            case '2':
                splitterInstance.current.paneSettings[1].content = '<div class="header-image"><div class="e-avatar e-avatar-circle e-avatar-xlarge"><img src="./src/splitter/images/laura.png" alt="laura"></div><div class="profile-name">Laura Callahan</div><table><tr><td class="e-bold">Title</td><td>Sales Representative</td></tr><tr><td class="e-bold">Hire Date</td><td>09/25/1993</td></tr><tr><td class="e-bold">Address</td><td>908 W. Capital Way</td></tr><tr><td class="e-bold">City</td><td>Tacoma</td></tr><tr><td class="e-bold">Phone</td><td>(206) 555-9482</td></tr></table>';
                break;
            case '3':
                splitterInstance.current.paneSettings[1].content = '<div class="header-image"><div class="e-avatar e-avatar-circle e-avatar-xlarge"><img src="./src/splitter/images/robert.png" alt="robert"></div><div class="profile-name">Robert King</div><table><tr><td class="e-bold">Title</td><td>Sales Manager</td></tr><tr><td class="e-bold">Hire Date</td><td>03/20/1990</td></tr><tr><td class="e-bold">Address</td><td>14 Garrett Hill</td></tr><tr><td class="e-bold">City</td><td>London</td></tr><tr><td class="e-bold">Phone</td><td>(71) 555-4848</td></tr></table>';
                break;
            case '4':
                splitterInstance.current.paneSettings[1].content = '<div class="header-image"><div class="e-avatar e-avatar-circle e-avatar-xlarge"><img src="./src/splitter/images/michale.png" alt="michale"></div><div class="profile-name">Michale Suyama</div><table><tr><td class="e-bold">Title</td><td>Inside Sales Coordinator</td></tr><tr><td class="e-bold">Hire Date</td><td>06/10/1998</td></tr><tr><td class="e-bold">Address</td><td>4726 - 11th Ave. N.E.</td></tr><tr><td class="e-bold">City</td><td>Seattle</td></tr><tr><td class="e-bold">Phone</td><td>(206) 555-1189</td></tr></table>';
                break;
            case '5':
                splitterInstance.current.paneSettings[1].content = '<div class="header-image"><div class="e-avatar e-avatar-circle e-avatar-xlarge"><img src="./src/splitter/images/albert.png" alt="albert"></div><div class="profile-name">Albert Dodsworth</div><table><tr><td class="e-bold">Title</td><td>Sales Representative</td></tr><tr><td class="e-bold">Hire Date</td><td>10/5/1996</td></tr><tr><td class="e-bold">Address</td><td>7 Houndstooth Rd.</td></tr><tr><td class="e-bold">City</td><td>London</td></tr><tr><td class="e-bold">Phone</td><td>(71) 555-4444</td></tr></table>';
                break;
        }
    };
    var onCreate = function () {
        listViewObj.current.selectItem(dataSource.data1[0]);
        splitterInstance.current.element.querySelectorAll('.e-pane')[0].setAttribute('id', 'ui-list');
        splitterInstance.current.element.querySelectorAll('.e-pane')[1].setAttribute('id', 'content');
        liElement = splitterInstance.current.element.querySelector("#ui-list");
        if (ej2_base_1.Browser.isDevice) {
            liElement.classList.add('ui-mobile');
        }
    };
    var ListViewContent = function () {
        return (React.createElement(ej2_react_lists_1.ListViewComponent, { className: 'splitter-list', height: '289', dataSource: dataSource.data1, enableVirtualization: true, cssClass: 'e-list-template', template: template, select: onSelect.bind(_this), ref: listViewObj },
            React.createElement(ej2_react_lists_1.Inject, { services: [ej2_react_lists_1.Virtualization] })));
    };
    return (React.createElement("div", { id: "target", className: "control-section details-view" },
        React.createElement(ej2_react_layouts_1.SplitterComponent, { id: "detailSplitter", height: "292px", width: "100%", ref: splitterInstance, created: onCreate.bind(_this) },
            React.createElement(ej2_react_layouts_1.PanesDirective, null,
                React.createElement(ej2_react_layouts_1.PaneDirective, { size: firstPaneSize, min: firstPaneMinSize, content: ListViewContent.bind(_this) }),
                React.createElement(ej2_react_layouts_1.PaneDirective, { size: secondPaneSize, min: secondPaneMinSize }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the Splitter control that is used to design details view page. Select the employee from left pane to display the corresponding employee details on the right pane.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Splitter is the layout user interface (UI) control, which integrates other JavaScript UI controls within its pane. In this sample, the JavaScript ListView control is integrated within left pane to display the employee list and right pane to display the corresponding employee details."))));
};
exports.default = DetailsView;
