define(["require", "exports", "@syncfusion/ej2-diagrams"], function (require, exports, ej2_diagrams_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEventDetails = void 0;
    function getEventDetails(args) {
        var listView = document.getElementById('listview-def');
        var listViewComponent = listView.ej2_instances[0];
        var selectedItems = listViewComponent.getSelectedItems();
        if (selectedItems.data.length > 0) {
            var elementName = getName(selectedItems, args);
            if (elementName) {
                eventInformation(args);
            }
        }
    }
    exports.getEventDetails = getEventDetails;
    function getName(selectedItems, args) {
        for (var i = 0; i < selectedItems.data.length; i++) {
            var eventName = selectedItems.data[i].id;
            if (eventName === args.name) {
                return true;
            }
        }
        return false;
    }
    function getCause(cause) {
        switch (cause) {
            case ej2_diagrams_1.DiagramAction.Render:
                return 'Rendering';
            case ej2_diagrams_1.DiagramAction.PublicMethod:
                return 'PublicMethod';
            case ej2_diagrams_1.DiagramAction.ToolAction:
                return 'ToolAction';
            case ej2_diagrams_1.DiagramAction.UndoRedo:
                return 'UndoRedo';
            case ej2_diagrams_1.DiagramAction.TextEdit:
                return 'TextEdit';
            case ej2_diagrams_1.DiagramAction.Group:
                return 'Group';
            case ej2_diagrams_1.DiagramAction.Clear:
                return 'Clear';
            case ej2_diagrams_1.DiagramAction.PreventClearSelection:
                return 'PreventClearSelection';
            case ej2_diagrams_1.DiagramAction.Interactions:
                return 'Interactions';
            case ej2_diagrams_1.DiagramAction.PreventHistory:
                return 'PreventHistory';
        }
        return '';
    }
    function eventInformation(args) {
        var data = document.createElement('div');
        data.className = 'eventData';
        var eventObject = [];
        switch (args.name) {
            case 'click':
                if (args.element && args.element.id) {
                    eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'element': args.element.id },
                        { 'actualObject': args.actualObject ? args.actualObject.id : 'null' }, { 'count': args.count },
                        { 'position.x': args.position.x },
                        { 'position.y': args.position.y }];
                }
                break;
            case 'dragEnter':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'element': args.element.id },
                    { 'diagram': args.diagram.getModuleName() }, { 'source': args.source.getModuleName() }];
                break;
            case 'dragLeave':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'element': args.element.id },
                    { 'diagram': args.diagram.getModuleName() }];
                break;
            case 'dragOver':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'element': args.element.id },
                    { 'target': args.target.id }, { 'mousePosition.x': args.mousePosition.x }, { 'mousePosition.y': args.mousePosition.y },
                    { 'diagram': args.diagram.getModuleName() }];
                break;
            case 'historyChange':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'cause': getCause(args.cause) },
                    { 'type': args.type }, { 'source': args.source[0].id }];
                break;
            case 'doubleClick':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' },
                    { 'position.x': args.position.x }, { 'position.y': args.position.y }, { 'source': args.source.id }];
                break;
            case 'textEdit':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'newValue': args.newValue },
                    { 'oldValue': args.oldValue }];
                break;
            case 'scrollChange':
                eventObject = [
                    { 'eventName': args.name }, { 'arguments': 'value' }, { 'newValue.CurrentZoom': args.newValue.CurrentZoom },
                    { 'newValue.HorizontalOffset': args.newValue.HorizontalOffset }, { 'source': args.source.getModuleName() },
                    { 'newValue.VerticalOffset': args.newValue.VerticalOffset },
                    { 'newValue.ViewportHeight': args.newValue.ViewportHeight }, { 'newValue.ViewportWidth': args.newValue.ViewportWidth },
                    { 'oldValue.CurrentZoom': args.oldValue.CurrentZoom }, { 'oldValue.HorizontalOffset': args.oldValue.HorizontalOffset },
                    { 'oldValue.VerticalOffset': args.oldValue.VerticalOffset }, { 'oldValue.ViewportHeight': args.oldValue.ViewportHeight },
                    { 'oldValue.ViewportWidth': args.oldValue.ViewportWidth }
                ];
                break;
            case 'selectionChange':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'newValue': args.newValue ? args.newValue.length : 0 },
                    { 'oldValue': args.oldValue ? args.oldValue.length : 0 }, { 'type': args.type }, { 'state': args.state }];
                break;
            case 'sizeChange':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'newValue.offsetX': args.newValue.offsetX },
                    { 'newValue.offsetY': args.newValue.offsetY }, { 'oldValue.offsetX': args.oldValue.offsetX },
                    { 'oldValue.offsetY': args.oldValue.offsetY }, { 'source': args.source.propName }, { 'state': args.state }];
                break;
            case 'connectionChange':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'connector': args.connector.id },
                    { 'connectorEnd': args.connectorEnd }, { 'newValue.nodeId': args.newValue.nodeId }, { 'newValue.portId': args.newValue.portId },
                    { 'oldValue.nodeId': args.oldValue.nodeId }, { 'oldValue.portId': args.oldValue.portId }, { 'state': args.state }];
                break;
            case 'sourcePointChange':
            case 'targetPointChange':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'connector': args.connector.id },
                    { 'newValue.x': args.newValue.x }, { 'newValue.y': args.newValue.y }, { 'oldValue.x': args.oldValue.x },
                    { 'oldValue.y': args.oldValue.y }, { 'targetNode': args.targetNode }, { 'targetPort': args.targetPort },
                    { 'state': args.state }];
                break;
            case 'propertyChange':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'cause': getCause(args.cause) },
                    { 'newValue': args.newValue }, { 'oldValue': args.oldValue }, { 'element': args.element }];
                break;
            case 'positionChange':
                eventObject = [
                    { 'eventName': args.name }, { 'arguments': 'value' }, { 'allowDrop': args.allowDrop },
                    { 'newValue.offsetX': args.newValue.offsetX }, { 'newValue.offsetY': args.newValue.offsetY },
                    { 'oldValue.offsetX': args.oldValue.offsetX }, { 'oldValue.offsetY': args.oldValue.offsetY },
                    { 'targetPosition.x': args.targetPosition.x }, { 'targetPosition.y': args.targetPosition.y },
                    { 'source': args.source.propName }, { 'target': args.target }, { 'state': args.state },
                ];
                break;
            case 'rotateChange':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'newValue': args.newValue.rotateAngle },
                    { 'oldValue': args.oldValue.rotateAngle }, { 'source': args.source.propName }, { 'state': args.state }];
                break;
            case 'collectionChange':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'cause': getCause(args.cause) },
                    { 'element': args.element.id }, { 'type': args.type }, { 'state': args.state }];
                break;
            case 'mouseEnter':
            case 'mouseLeave':
            case 'mouseOver':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'actualObject': args.actualObject },
                    { 'element': args.element }, { 'targets': args.targets }];
                break;
            case 'contextMenuOpen':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'items': args.items }, { 'element': args.element.id },
                    { 'hiddenItems': args.hiddenItems }, { 'left': args.left }, { 'top': args.top }, { 'parentItem': args.parentItem }];
                break;
            case 'contextMenuBeforeItemRender':
            case 'contextMenuClick':
                eventObject = [{ 'eventName': args.name }, { 'arguments': 'value' }, { 'element': args.element.id },
                    { 'item': args.item.id }];
                break;
        }
        var span = document.createElement('span');
        span.innerHTML = 'Diagram ' + args.name.bold() + ' event called' + '<hr>';
        var log = document.getElementById('EventLog');
        log.insertBefore(span, log.firstChild);
    }
    function setEventsArguments(data) {
        var table = document.createElement('table');
        table.style.marginTop = '15px';
        var tableBody = document.createElement('tbody');
        var _loop_1 = function (i) {
            var row = document.createElement('tr');
            Object.keys(data[i]).forEach(function (key) {
                var firstColumn = document.createElement('td');
                firstColumn.appendChild(document.createTextNode(key));
                row.appendChild(firstColumn);
                var thirdColumn = document.createElement('td');
                thirdColumn.appendChild(document.createTextNode('<b>' + data[i][key] + '</b>'));
                row.appendChild(thirdColumn);
            });
            tableBody.appendChild(row);
        };
        for (var i = 0; i < data.length; i++) {
            _loop_1(i);
        }
        table.appendChild(tableBody);
        return table;
    }
});
