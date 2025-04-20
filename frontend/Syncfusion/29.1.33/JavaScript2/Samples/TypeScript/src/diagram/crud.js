define(["require", "exports", "@syncfusion/ej2-diagrams", "@syncfusion/ej2-navigations", "@syncfusion/ej2-popups", "@syncfusion/ej2-dropdowns", "@syncfusion/ej2-inputs", "@syncfusion/ej2-buttons", "@syncfusion/ej2-base"], function (require, exports, ej2_diagrams_1, ej2_navigations_1, ej2_popups_1, ej2_dropdowns_1, ej2_inputs_1, ej2_buttons_1, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_diagrams_1.Diagram.Inject(ej2_diagrams_1.DataBinding, ej2_diagrams_1.HierarchicalTree);
    var diagram;
    var dialog;
    var toolbarObj;
    var sourceDropdown;
    var targetDropdown;
    var sourceID;
    var targetID;
    var nodeData = [];
    var items = [
        {
            text: 'Add',
            tooltipText: 'Add',
            prefixIcon: 'e-ddb-icons e-add',
            id: 'Add'
        },
        {
            type: 'Separator'
        },
        {
            text: 'Edit',
            tooltipText: 'Edit',
            prefixIcon: 'e-ddb-icons e-update',
            id: 'Edit'
        },
        {
            type: 'Separator'
        },
        {
            text: 'Delete',
            tooltipText: 'Delete',
            prefixIcon: 'e-ddb-icons e-delete',
            id: 'Delete'
        },
        {
            type: 'Separator'
        },
        {
            text: 'Reset',
            tooltipText: 'Reset',
            prefixIcon: 'e-ddc-icons e-reset',
            id: 'Reset'
        }
    ];
    function dlgButtonClick(evt) {
        var dialogHeader = dialog.header;
        var description = document.getElementById('Description').value;
        var color = document.getElementById('Color').value;
        var selectedItem;
        if (diagram.selectedItems.nodes.length > 0) {
            selectedItem = diagram.selectedItems.nodes[0];
        }
        if (diagram.selectedItems.connectors.length > 0) {
            selectedItem = diagram.selectedItems.connectors[0];
        }
        if (dialogHeader === 'Add') {
            var node = {
                id: 'node' + (0, ej2_diagrams_1.randomId)(),
                style: { fill: color },
                Description: description,
                Color: color,
                Id: Math.floor(Math.random() * 1000 + 100)
            };
            var connector = {
                id: 'connector' + (0, ej2_diagrams_1.randomId)(),
                sourceID: selectedItem.id,
                targetID: node.id,
                Id: Math.floor(Math.random() * 1000 + 100)
            };
            diagram.add(node);
            diagram.add(connector);
            diagram.doLayout();
            diagram.insertData();
            nodeData.push({ Name: node.id, Label: description });
            sourceDropdown.dataSource = getDataSource();
            sourceDropdown.dataBind();
            targetDropdown.dataSource = getDataSource();
            targetDropdown.dataBind();
        }
        else {
            if (selectedItem instanceof ej2_diagrams_1.Connector) {
                selectedItem.sourceID = sourceID ? sourceID : selectedItem.sourceID;
                selectedItem.targetID = targetID ? targetID : selectedItem.targetID;
                diagram.dataBind();
                diagram.doLayout();
            }
            else {
                selectedItem.Description = description;
                selectedItem.Color = color;
                selectedItem.annotations[0].content = description;
                selectedItem.style.fill = color;
                diagram.dataBind();
            }
            diagram.updateData();
        }
        dialog.hide();
    }
    function sourceDropdownCreate(args) {
        sourceDropdown.dataSource = getDataSource();
        sourceDropdown.dataBind();
    }
    function targetDropdownCreate(args) {
        targetDropdown.dataSource = getDataSource();
        targetDropdown.dataBind();
    }
    function sourceDropdownChange(args) {
        sourceID = args.value;
    }
    function targetDropdownChange(args) {
        targetID = args.value;
    }
    function selectionChange(args) {
        if (args.state === 'Changing') {
            if (args.newValue.length > 0) {
                if (args.newValue[0] instanceof ej2_diagrams_1.Node) {
                    enableToolbarItems(true);
                }
                else {
                    toolbarObj.enableItems(document.getElementById(items[0].id).parentElement, false);
                    toolbarObj.enableItems(document.getElementById(items[2].id).parentElement, true);
                    toolbarObj.enableItems(document.getElementById(items[4].id).parentElement, false);
                }
            }
            else {
                enableToolbarItems(false);
            }
        }
    }
    function enableToolbarItems(isEnableItem) {
        toolbarObj.enableItems(document.getElementById(items[0].id).parentElement, isEnableItem);
        toolbarObj.enableItems(document.getElementById(items[2].id).parentElement, isEnableItem);
        toolbarObj.enableItems(document.getElementById(items[4].id).parentElement, isEnableItem);
    }
    function connectionChange(args) {
        if (args.state === 'Completed') {
            if (!args.connector.targetID || !args.connector.sourceID) {
                args.cancel = true;
            }
        }
    }
    function setNodeTemplate(obj) {
        obj.annotations = [{ style: { color: 'black' } }];
        obj.annotations[0].content = obj.Description;
        obj.style = { fill: obj.Color };
        if (obj.Id === 1) {
            obj.constraints = ej2_diagrams_1.NodeConstraints.Default & ~ej2_diagrams_1.NodeConstraints.Delete;
        }
    }
    function toolbarClick(args) {
        var selectedItem;
        if (diagram.selectedItems.nodes.length > 0) {
            selectedItem = diagram.selectedItems.nodes[0];
        }
        if (diagram.selectedItems.connectors.length > 0) {
            selectedItem = diagram.selectedItems.connectors[0];
        }
        if (selectedItem) {
            switch (args.item.tooltipText) {
                case 'Add':
                    openDialog('Add', '', '', true);
                    break;
                case 'Edit':
                    if (selectedItem instanceof ej2_diagrams_1.Connector) {
                        var sourceNode = diagram.getObject(selectedItem.sourceID);
                        var targetNode = diagram.getObject(selectedItem.targetID);
                        openDialog('Edit', sourceNode.Description, targetNode.Description, false);
                    }
                    else {
                        openDialog('Edit', selectedItem.Description, selectedItem.Color, true);
                    }
                    break;
                case 'Delete':
                    diagram.remove(selectedItem);
                    diagram.doLayout();
                    diagram.removeData();
                    var element = { Name: selectedItem.id, Label: selectedItem.Description };
                    var index = nodeData.indexOf(element);
                    nodeData.splice(index, 1);
                    break;
            }
        }
        switch (args.item.tooltipText) {
            case 'Reset':
                var callback = new ej2_base_1.Ajax("https://js.syncfusion.com/demos/ejServices/api/Diagram/ResetData", 'POST');
                callback.send().then();
                diagram.refreshDiagram();
                diagram.refresh();
        }
    }
    function hideClassElement(className, display) {
        var i;
        var showDropdown = document.querySelectorAll(className);
        for (i = 0; i < showDropdown.length; i++) {
            showDropdown[i].style.display = display;
        }
    }
    function openDialog(title, description, color, isNode) {
        dialog.header = title;
        if (isNode) {
            hideClassElement('.showDropdown', 'none');
            hideClassElement('.showLabel', 'block');
            document.getElementById('Description').value = description;
            document.getElementById('Color').value = color;
        }
        else {
            hideClassElement('.showDropdown', 'block');
            hideClassElement('.showLabel', 'none');
            document.getElementById('SourceId').value = description;
            document.getElementById('TargetId').value = color;
        }
        dialog.show();
    }
    function getDataSource() {
        var i;
        nodeData = [];
        for (i = 0; i < diagram.nodes.length; i++) {
            var node = diagram.nodes[i];
            var element = { Name: node.id, Label: node.Description };
            nodeData.push(element);
        }
        return nodeData;
    }
    window.default = function () {
        diagram = new ej2_diagrams_1.Diagram({
            width: '100%',
            height: 600,
            dataSourceSettings: {
                id: 'Name',
                crudAction: {
                    read: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/GetNodes',
                    create: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/AddNodes',
                    update: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/UpdateNodes',
                    destroy: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/DeleteNodes',
                    customFields: ['Id', 'Description', 'Color']
                },
                connectionDataSource: {
                    id: 'Name',
                    sourceID: 'SourceNode',
                    targetID: 'TargetNode',
                    crudAction: {
                        read: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/GetConnectors',
                        create: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/AddConnectors',
                        update: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/UpdateConnectors',
                        destroy: 'https://js.syncfusion.com/demos/ejServices/api/Diagram/DeleteConnectors',
                        customFields: ['Id']
                    }
                }
            },
            layout: { type: 'HierarchicalTree', verticalSpacing: 40 },
            snapSettings: { constraints: 0 },
            getNodeDefaults: function (obj) {
                obj.width = 100;
                obj.height = 50;
                obj.shape = { type: 'Basic', shape: 'Rectangle' };
                obj.style = { strokeWidth: 1, strokeColor: '#DDDDDD' };
                return obj;
            },
            getConnectorDefaults: function (connector) {
                connector.type = 'Orthogonal';
                connector.style.fill = '#707070';
                connector.style.strokeColor = '#707070';
                connector.targetDecorator = {
                    style: {
                        strokeColor: '#707070',
                        fill: '#707070'
                    },
                };
                return connector;
            },
            selectionChange: selectionChange,
            sourcePointChange: connectionChange,
            targetPointChange: connectionChange,
            setNodeTemplate: setNodeTemplate
        });
        diagram.appendTo('#diagram');
        toolbarObj = new ej2_navigations_1.Toolbar({
            clicked: toolbarClick,
            items: items
        });
        toolbarObj.appendTo('#toolbar');
        enableToolbarItems(false);
        dialog = new ej2_popups_1.Dialog({
            width: '300px',
            visible: false,
            isModal: true,
            showCloseIcon: true,
            buttons: [
                {
                    click: dlgButtonClick,
                    buttonModel: { content: 'Update', isPrimary: true }
                }
            ]
        });
        dialog.appendTo('#editDialog');
        var inputobj1 = new ej2_inputs_1.TextBox({
            floatLabelType: 'Always',
            placeholder: 'Description'
        });
        inputobj1.appendTo('#Description');
        var inputobj2 = new ej2_inputs_1.TextBox({
            floatLabelType: 'Always',
            placeholder: 'Color'
        });
        inputobj2.appendTo('#Color');
        var button = new ej2_buttons_1.Button();
        button.appendTo('#btnUpdate');
        sourceDropdown = new ej2_dropdowns_1.DropDownList({
            fields: { text: 'Label', value: 'Name' },
            change: sourceDropdownChange,
            created: sourceDropdownCreate
        });
        sourceDropdown.appendTo('#SourceId');
        targetDropdown = new ej2_dropdowns_1.DropDownList({
            fields: { text: 'Label', value: 'Name' },
            change: targetDropdownChange,
            created: targetDropdownCreate
        });
        targetDropdown.appendTo('#TargetId');
    };
});
