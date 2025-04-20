"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./external-drag-drop.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var dataSource = require("./datasource.json");
/**
 * schedule resources group-editing sample
 */
var ExternalDragDrop = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var treeObj = (0, react_1.useRef)(null);
    var isTreeItemDropped = false;
    var draggedItemId = '';
    var allowDragAndDrops = true;
    var fields = { dataSource: dataSource.waitingList, id: 'Id', text: 'Name' };
    var data = (0, ej2_base_1.extend)([], dataSource.hospitalData, null, true);
    var departmentData = [
        { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
        { Text: 'DENTAL', Id: 2, Color: '#9e5fff' }
    ];
    var consultantData = [
        { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Cardiologist' },
        { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Orthodontist' },
        { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Optometrist' },
        { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Periodontist' },
        { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Orthopedic' },
        { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Endodontist' }
    ];
    var getConsultantName = function (value) {
        return value.resourceData[value.resource.textField];
    };
    var getConsultantImage = function (value) {
        return getConsultantName(value).toLowerCase();
    };
    var getConsultantDesignation = function (value) {
        return value.resourceData.Designation;
    };
    var resourceHeaderTemplate = function (props) {
        return (React.createElement("div", { className: "template-wrap" },
            React.createElement("div", { className: "specialist-category" },
                React.createElement("div", { className: "specialist-image " + getConsultantImage(props) }),
                React.createElement("div", { className: "specialist-name" },
                    " ",
                    getConsultantName(props)),
                React.createElement("div", { className: "specialist-designation" }, getConsultantDesignation(props)))));
    };
    var treeTemplate = function (props) {
        return (React.createElement("div", { id: "waiting" },
            React.createElement("div", { id: "waitdetails" },
                React.createElement("div", { id: "waitlist" }, props.Name),
                React.createElement("div", { id: "waitcategory" },
                    props.DepartmentName,
                    " - ",
                    props.Description))));
    };
    var onItemSelecting = function (args) {
        args.cancel = true;
    };
    var onTreeDrag = function (event) {
        if (scheduleObj.current.isAdaptive) {
            var classElement = scheduleObj.current.element.querySelector('.e-device-hover');
            if (classElement) {
                classElement.classList.remove('e-device-hover');
            }
            if (event.target.classList.contains('e-work-cells')) {
                (0, ej2_base_1.addClass)([event.target], 'e-device-hover');
            }
        }
    };
    var onActionBegin = function (event) {
        if (event.requestType === 'eventCreate' && isTreeItemDropped) {
            var treeViewData = treeObj.current.fields.dataSource;
            var filteredPeople = treeViewData.filter(function (item) { return item.Id !== parseInt(draggedItemId, 10); });
            treeObj.current.fields.dataSource = filteredPeople;
            var elements = document.querySelectorAll('.e-drag-item.treeview-external-drag');
            for (var i = 0; i < elements.length; i++) {
                (0, ej2_base_1.remove)(elements[i]);
            }
        }
    };
    var onTreeDragStop = function (event) {
        var treeElement = (0, ej2_base_1.closest)(event.target, '.e-treeview');
        var classElement = scheduleObj.current.element.querySelector('.e-device-hover');
        if (classElement) {
            classElement.classList.remove('e-device-hover');
        }
        if (!treeElement) {
            event.cancel = true;
            var scheduleElement = (0, ej2_base_1.closest)(event.target, '.e-content-wrap');
            if (scheduleElement) {
                var treeviewData = treeObj.current.fields.dataSource;
                if (event.target.classList.contains('e-work-cells')) {
                    var filteredData = treeviewData.filter(function (item) { return item.Id === parseInt(event.draggedNodeData.id, 10); });
                    var cellData = scheduleObj.current.getCellDetails(event.target);
                    var resourceDetails = scheduleObj.current.getResourcesByIndex(cellData.groupIndex);
                    var eventData = {
                        Name: filteredData[0].Name,
                        StartTime: cellData.startTime,
                        EndTime: cellData.endTime,
                        IsAllDay: cellData.isAllDay,
                        Description: filteredData[0].Description,
                        DepartmentID: resourceDetails.resourceData.GroupId,
                        ConsultantID: resourceDetails.resourceData.Id
                    };
                    scheduleObj.current.openEditor(eventData, 'Add', true);
                    isTreeItemDropped = true;
                    draggedItemId = event.draggedNodeData.id;
                }
            }
        }
        document.body.classList.remove('e-disble-not-allowed');
    };
    var onTreeDragStart = function () {
        document.body.classList.add('e-disble-not-allowed');
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper drag-sample-wrapper' },
                React.createElement("div", { className: "schedule-container" },
                    React.createElement("div", { className: "title-container" },
                        React.createElement("h1", { className: "title-text" }, "Doctor's Appointments")),
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { ref: scheduleObj, cssClass: 'schedule-drag-drop', width: '100%', height: '650px', selectedDate: new Date(2021, 7, 2), currentView: 'TimelineDay', resourceHeaderTemplate: resourceHeaderTemplate, eventSettings: { dataSource: data, fields: { subject: { title: 'Patient Name', name: 'Name' }, startTime: { title: "From", name: "StartTime" }, endTime: { title: "To", name: "EndTime" }, description: { title: 'Reason', name: 'Description' } } }, group: { enableCompactView: false, resources: ['Departments', 'Consultants'] }, actionBegin: onActionBegin },
                        React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'DepartmentID', title: 'Department', name: 'Departments', allowMultiple: false, dataSource: departmentData, textField: 'Text', idField: 'Id', colorField: 'Color' }),
                            React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'ConsultantID', title: 'Consultant', name: 'Consultants', allowMultiple: false, dataSource: consultantData, textField: 'Text', idField: 'Id', groupIDField: "GroupId", colorField: 'Color' })),
                        React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineDay' }),
                            React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.TimelineViews, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] }))),
                React.createElement("div", { className: "treeview-container" },
                    React.createElement("div", { className: "title-container" },
                        React.createElement("h1", { className: "title-text" }, "Waiting List")),
                    React.createElement(ej2_react_navigations_1.TreeViewComponent, { ref: treeObj, cssClass: 'treeview-external-drag', dragArea: ".drag-sample-wrapper", nodeTemplate: treeTemplate, fields: fields, nodeDragStop: onTreeDragStop, nodeSelecting: onItemSelecting, nodeDragging: onTreeDrag, nodeDragStart: onTreeDragStart, allowDragAndDrop: allowDragAndDrops })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example illustrates how to drag and drop the events from an external source into scheduler. Here, you can drag and drop the items from TreeView control into scheduler.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, ",
                React.createElement("code", null, "resourceHeaderTemplate"),
                " is used to change the default appearance of the resource header column. Within the ",
                React.createElement("code", null, "actionBegin"),
                " event of scheduler, the dragged item from the TreeView control is removed, when it is being dragged and dropped onto the scheduler. When the item is being dropped onto the scheduler, the event editor is explicitly made to open with the target details by invoking the ",
                React.createElement("code", null, "openEditor"),
                " method of scheduler within the ",
                React.createElement("code", null, "nodeDragStop"),
                " event of TreeView."))));
};
exports.default = ExternalDragDrop;
