import { createElement, isNullOrUndefined, L10n, classList } from '@syncfusion/ej2-base';
import { TreeView, ContextMenu as Menu } from '@syncfusion/ej2-navigations';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DialogUtility } from '@syncfusion/ej2-popups';
/**
 * xml Pane class.
 */
var XmlPane = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @param {boolean} isRtl - Specifies the Rtl.
     * @private
     */
    function XmlPane(documentHelper, isRtl) {
        var _this = this;
        /**
         * @private
         */
        this.isXmlPaneShow = false;
        /**
         * @private
         */
        this.isAddedDocumentXml = false;
        /**
         * @private
         */
        this.contextMenuInstance = undefined;
        /**
         * To set Drop Down List Data.
         *
         * @param {Object} key.
         * @private
         * @returns {void}
         */
        this.DropDownListData = [
            { ID: 'Choose', Value: 'Choose an XML file' },
            { ID: 'Add', Value: '(Add new part...)' }
        ];
        /**
    * To set Default Treeview data.
    * @param {Object} key.
    * @returns {void}
    */
        this.hierarchicalData = [];
        this.field = {
            dataSource: this.hierarchicalData,
            id: 'id',
            text: 'displayText',
            hasChildren: 'hasChild',
            value: "displayValue",
            parentID: 'pid',
            tooltip: 'tooltip',
        };
        /**
        * To handle File Selection.
        * @returns {void}
        */
        this.handleFileSelect = function () {
            var input = document.createElement('input');
            input.type = 'file';
            input.accept = '.xml';
            input.onchange = function (e) {
                var target = e.target;
                if (target.files && target.files.length > 0) {
                    var file = target.files[0];
                    _this.onFileSelect(file);
                }
            };
            input.click();
        };
        /**
         * Close the xml pane.
         *
         * @private
         * @returns {void}
         */
        this.onClose = function () {
            _this.showXmlProperties(false);
            _this.documentHelper.owner.selectionModule.closeXmlPane();
            _this.documentHelper.owner.documentEditorSettings.showNavigationPane = false;
            _this.documentHelper.updateFocus();
            _this.destroyInternal();
        };
        this.documentHelper = documentHelper;
        this.isRtl = isRtl;
    }
    Object.defineProperty(XmlPane.prototype, "viewer", {
        get: function () {
            return this.documentHelper.owner.viewer;
        },
        enumerable: true,
        configurable: true
    });
    XmlPane.prototype.getModuleName = function () {
        return 'XmlPane';
    };
    /**
     * @private
     * @param {boolean} enable - enable/disable header footer pane.
     * @returns {void}
     */
    XmlPane.prototype.enableDisableElements = function (enable) {
        if (enable) {
            classList(this.element, [], ['e-de-overlay']);
        }
        else {
            classList(this.element, ['e-de-overlay'], []);
        }
    };
    /**
     * Initialize the Xml Mapping.
     *
     * @private
     * @param {L10n} localeValue - Specifies the localization based on culture.
     * @param {boolean} isRtl - Specifies the Rtl.
     * @returns {void}
     */
    /* eslint-disable  */
    XmlPane.prototype.initializeXmlMapping = function () {
        var _this = this;
        var localObj = new L10n('documenteditor', this.documentHelper.owner.defaultLocale, this.documentHelper.owner.locale);
        var elementId = 'xml_mapping_properties';
        this.element = createElement('div', { id: this.documentHelper.owner.element.id + elementId, className: 'e-de-op' });
        var headerDiv = this.createDivTemplate('_header_footer', this.element, 'padding-bottom:0');
        classList(headerDiv, ['e-de-cntr-pane-padding'], []);
        headerDiv.style.paddingLeft = '0px';
        var headerLabel = createElement('label', { className: 'e-de-prop-header-label' });
        headerLabel.innerHTML = localObj.getConstant('XML Mapping');
        var closeButtonFloat;
        if (!this.isRtl) {
            closeButtonFloat = 'float:right;';
        }
        else {
            closeButtonFloat = 'float:left;';
        }
        var closeIcon = createElement('span', {
            id: '_header_footer_close',
            className: 'e-de-ctnr-close e-de-close-icon e-icons',
            styles: 'display:inline-block;cursor:pointer;' + closeButtonFloat
        });
        closeIcon.addEventListener('click', function () {
            _this.onClose();
        });
        headerDiv.appendChild(headerLabel);
        headerDiv.appendChild(closeIcon);
        // first div
        var optionsLabelDiv = this.createDivTemplate(elementId + '_xml', this.element);
        classList(optionsLabelDiv, ['e-de-cntr-pane-padding'], []);
        optionsLabelDiv.style.paddingLeft = '0px';
        optionsLabelDiv.style.paddingRight = '5px';
        optionsLabelDiv.style.width = '275px';
        var optionsLabel = createElement('label', { className: 'e-de-ctnr-prop-label', styles: 'height:20px;' });
        optionsLabel.innerHTML = localObj.getConstant('Custom XML Part');
        optionsLabelDiv.appendChild(optionsLabel);
        var optionsDiv = this.createDivTemplate(elementId + '_xmlDiv', optionsLabelDiv);
        var firstPageDiv = this.createDivTemplate(elementId + '_firstPageDiv', optionsDiv);
        classList(firstPageDiv, ['e-de-hdr-ftr-frst-div'], []);
        var firstPage = createElement('input', { id: elementId + '_firstPageDiv' + '_dropdownlist', className: 'e-de-prop-sub-label' });
        firstPage.type = 'text';
        firstPage.tabIndex = 1;
        firstPageDiv.appendChild(firstPage);
        // second div
        this.positionLabelDiv = createElement('div', { id: elementId + '_positionLabelDiv', className: 'e-de-scrollbar-hide', styles: 'width:270px;height:310px;list-style:none;padding-right:5px;overflow:auto;' });
        this.element.appendChild(this.positionLabelDiv);
        // second div tree view
        var tree = createElement('div', { id: 'tree', className: 'e-de-scrollbar-hide', styles: 'width:270px;height:310px;list-style:none;padding-right:5px;overflow:auto;' });
        var ul = document.createElement('ul');
        ul.contentEditable = 'false';
        ul.style.width = 'auto';
        ul.className = 'e-list-parent e-ul';
        ul.style.paddingLeft = '0px';
        ul.id = 'e-de-pane-contextmenu-list';
        ul.style.listStyle = 'none';
        ul.style.margin = '0px';
        ul.style.maxHeight = 'auto';
        ul.oncontextmenu = this.disableBrowserContextmenu;
        this.treeviewObject = new TreeView({
            fields: this.field,
            cssClass: 'e-de-custom-treeview',
        });
        this.treeviewObject.appendTo(tree);
        this.positionLabelDiv.appendChild(tree);
        this.positionLabelDiv.appendChild(ul);
        this.documentHelper.owner.editor.dictionaryObject[this.documentHelper.owner.editor.dictionaryObjectIndexIncrement++] = {
            ID: 'Default',
            Data: this.hierarchicalData
        };
        if (this.documentHelper.owner.editor.xmlData && this.documentHelper.owner.editor.xmlData.length === 0) {
            this.documentHelper.owner.editor.xmlData = this.hierarchicalData;
        }
    };
    /**
    * To initialize Context Menu.
    * @returns {void}
    */
    XmlPane.prototype.initializeContextMenu = function () {
        var menuItems = [
            {
                text: 'Insert Content control',
                id: 'Insert',
                items: [
                    {
                        text: 'Plain Text',
                        id: 'PlainText'
                    },
                    {
                        text: 'Picture',
                        id: 'Picture'
                    },
                    {
                        text: 'CheckBox',
                        id: 'CheckBox'
                    },
                    {
                        text: 'Combo Box',
                        id: 'ComboBox'
                    },
                    {
                        text: 'Dropdown List',
                        id: 'DropdownList'
                    },
                    {
                        text: 'Date Picker',
                        id: 'DatePicker'
                    },
                ]
            },
            {
                text: 'Map to selected content control',
                id: 'MapToSelectedContentControl'
            },
        ];
        var menuOptions = {
            target: '#tree',
            items: menuItems,
            select: this.handleContextMenuItem.bind(this),
            beforeOpen: this.contextMenuBeforeOpen.bind(this)
        };
        this.contextMenuInstance = new Menu(menuOptions, '#e-de-pane-contextmenu-list');
    };
    /**
    * To intialize Drop Down List.
    * @returns {void}
    */
    XmlPane.prototype.intializeDropDownList = function () {
        this.dropDownListObject = new DropDownList({
            dataSource: this.DropDownListData,
            fields: { text: 'Value', value: 'ID' },
            text: this.DropDownListData[0].Value,
            select: this.handleDropDownList.bind(this)
        });
        this.dropDownListObject.appendTo('#xml_mapping_properties_firstPageDiv_dropdownlist');
    };
    /**
    * To handle Drop Down List collection by selection.
    * @param {SelectEventArgs} args.
    * @private
    * @returns {void}
    */
    XmlPane.prototype.handleDropDownList = function (args) {
        var regx = /(no namespace)/;
        var currentID;
        var selectedItem = args.item.innerText;
        for (var i = 0; i < this.DropDownListData.length; i++) {
            if (this.dropDownListObject.dataSource[i].Value == selectedItem) {
                currentID = this.dropDownListObject.dataSource[i].ID;
            }
        }
        if (selectedItem === '(Add new part...)') {
            this.documentHelper.owner.prefixMappings = " ";
            this.handleFileSelect();
        }
        else if (regx.test(selectedItem)) {
            this.documentHelper.owner.prefixMappings = " ";
            for (var i = 0; i < this.documentHelper.owner.editor.dictionaryObject.length; i++) {
                if (currentID === this.documentHelper.owner.editor.dictionaryObject[i].ID) {
                    this.handleTreeviewObject(i);
                }
            }
        }
        else if (selectedItem === 'Choose an XML file') {
            this.documentHelper.owner.prefixMappings = " ";
            this.handleTreeviewObject(0);
        }
        else {
            this.documentHelper.owner.prefixMappings = selectedItem;
            for (var i = 0; i < this.documentHelper.owner.editor.dictionaryObject.length; i++) {
                if (currentID === this.documentHelper.owner.editor.dictionaryObject[i].ID) {
                    this.handleTreeviewObject(i);
                }
            }
        }
    };
    /**
    * To handle Treeview object collection based on the xml Data.
    * @param {number} index.
    * @returns {void}
    */
    XmlPane.prototype.handleTreeviewObject = function (index) {
        this.treeviewObject.fields.dataSource = this.documentHelper.owner.editor.dictionaryObject[index].Data;
        this.treeviewObject.dataBind();
        this.documentHelper.owner.editor.xmlData = this.documentHelper.owner.editor.dictionaryObject[index].Data;
    };
    /**
    * To context Menu scenario Before Open.
    * @param {BeforeOpenCloseMenuEventArgs} args.
    * @returns {void}
    */
    XmlPane.prototype.contextMenuBeforeOpen = function (args) {
        var contentControl = this.documentHelper.owner.selection.currentContentControl;
        var contentControlImage = this.documentHelper.owner.getImageContentControl();
        var content = this.treeviewObject.selectedNodes;
        var node = this.treeviewObject.getNode(content[0]);
        if (node.hasChildren) {
            args.cancel = true;
        }
        if (!isNullOrUndefined(this.contextMenuInstance)) {
            if (!isNullOrUndefined(contentControl) || !isNullOrUndefined(contentControlImage)) {
                this.contextMenuInstance.enableItems(['Map to selected content control'], true);
            }
            else {
                this.contextMenuInstance.enableItems(['Map to selected content control'], false);
            }
        }
    };
    /**
    * To handle Context Menu Items based on Type of content control.
    * @param {MenuEventArgs} args.
    * @returns {void}
    */
    XmlPane.prototype.handleContextMenuItem = function (args) {
        var item = args.element.id;
        switch (item) {
            case 'RichText':
            case 'PlainText':
            case 'Picture':
            case 'ComboBox':
            case 'DropdownList':
            case 'CheckBox':
            case 'DatePicker':
                this.applyContentControl(item);
                break;
            case 'MapToSelectedContentControl':
                var contentControl = this.documentHelper.owner.selection.currentContentControl;
                var contentControlImage = this.documentHelper.owner.getImageContentControl();
                if (!isNullOrUndefined(contentControl) || !isNullOrUndefined(contentControlImage)) {
                    this.documentHelper.owner.isXmlMapCC = true;
                    if (this.documentHelper.owner.isXmlMapCC && !isNullOrUndefined(this.documentHelper.owner.editor.xmlData.length) && this.documentHelper.owner.editor.xmlData.length > 0) {
                        this.getXmlPath();
                    }
                    this.documentHelper.owner.selection.selectContentInternal(contentControl);
                    if (contentControl.contentControlProperties.type !== 'CheckBox') {
                        this.insertContent(contentControl);
                    }
                }
                break;
        }
    };
    XmlPane.prototype.disableBrowserContextmenu = function () {
        return false;
    };
    /**
    * To apply Content Control.
    * @param {string} args.
    * @returns {void}
    */
    XmlPane.prototype.applyContentControl = function (args) {
        var _this = this;
        this.documentHelper.owner.isXmlMapCC = true;
        if (this.documentHelper.owner.isXmlMapCC && !isNullOrUndefined(this.documentHelper.owner.editor.xmlData.length) && this.documentHelper.owner.editor.xmlData.length > 0) {
            this.getXmlPath();
        }
        var contentControl = this.documentHelper.owner.selection.currentContentControl;
        var contentControlImage = this.documentHelper.owner.getImageContentControl();
        if (!isNullOrUndefined(contentControl) || !isNullOrUndefined(contentControlImage)) {
            var localObj = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            localObj.setLocale(this.documentHelper.owner.locale);
            this.alertDialog = DialogUtility.alert({
                title: localObj.getConstant('Information'),
                content: localObj.getConstant('Discard Content Control'),
                okButton: { text: localObj.getConstant('Ok') },
                showCloseIcon: true,
                closeOnEscape: true,
                animationSettings: { effect: 'Zoom' },
                position: { X: 'center', Y: 'center' },
                close: function () {
                    _this.closeDialogUtils.bind(_this);
                }
            });
        }
        else {
            switch (args) {
                case 'PlainText':
                    this.documentHelper.owner.editor.insertContentControl('Text');
                    this.insertContent();
                    break;
                case 'RichText':
                    this.documentHelper.owner.editor.insertContentControl('RichText');
                    this.insertContent();
                    break;
                case 'Picture':
                    this.documentHelper.owner.showDialog('PictureContentControl');
                    break;
                case 'ComboBox':
                    this.documentHelper.owner.editor.insertContentControl('ComboBox');
                    this.insertContent();
                    break;
                case 'DropdownList':
                    this.documentHelper.owner.editor.insertContentControl('DropDownList');
                    this.insertContent();
                    break;
                case 'CheckBox':
                    this.documentHelper.owner.editor.insertContentControl('CheckBox');
                    break;
                case 'DatePicker':
                    this.documentHelper.owner.editor.insertContentControl('Date');
                    this.insertContent();
                    break;
            }
        }
    };
    /**
    * To insert Content inside the content control.
    * @returns {void}
    */
    XmlPane.prototype.insertContent = function (contentControl) {
        var selectedNode = this.treeviewObject.selectedNodes.toString();
        for (var i = 1; i < this.documentHelper.owner.editor.xmlData.length; i++) {
            var xmlID = this.documentHelper.owner.editor.xmlData[i].id.toString();
            if (selectedNode == xmlID) {
                if (!isNullOrUndefined(this.documentHelper.owner.editor.xmlData[i].displayValue)) {
                    var content = this.documentHelper.owner.editor.xmlData[i].displayValue.toString();
                    if (contentControl) {
                        var text = this.documentHelper.owner.editor.getResultContentControlText(contentControl);
                        if (text !== content) {
                            this.documentHelper.owner.editor.insertText(content);
                            this.documentHelper.owner.editor.addXmlProperties(contentControl.contentControlProperties, this.documentHelper.owner.xPathString);
                        }
                    }
                    else {
                        this.documentHelper.owner.editor.insertText(content);
                    }
                }
            }
        }
        this.documentHelper.owner.isXmlMapCC = false;
    };
    /**
     * @private
     * @returns {void}
     */
    XmlPane.prototype.updateContent = function (updatedText, xpath) {
        if (updatedText === String.fromCharCode(9744) || updatedText === String.fromCharCode(9746)) {
            this.updateCheckBoxContentControl(updatedText, xpath);
        }
        else {
            if (this.documentHelper.owner.xmlPaneModule.isXmlPaneShow) {
                this.updateXMLData(updatedText);
            }
            var start = this.documentHelper.selection.start.clone();
            var end = this.documentHelper.selection.end.clone();
            for (var i = 0; i < this.documentHelper.contentControlCollection.length; i++) {
                var contentControl = this.documentHelper.contentControlCollection[i];
                if (contentControl.contentControlProperties.xmlMapping && contentControl.contentControlProperties.xmlMapping.xPath === xpath && contentControl.contentControlProperties.type !== 'CheckBox') {
                    var text = this.documentHelper.owner.editor.getResultContentControlText(contentControl);
                    if (text !== updatedText) {
                        this.updateContentControl(contentControl, updatedText);
                    }
                }
            }
            this.documentHelper.selection.selectRange(start, end);
        }
    };
    XmlPane.prototype.updateContentControl = function (contentControl, updatedText) {
        this.documentHelper.selection.selectContentControlInternal(contentControl);
        this.documentHelper.owner.editor.insertText(updatedText);
    };
    XmlPane.prototype.updateCheckBoxContentControl = function (updatedText, xpath) {
        var isChecked;
        if (updatedText === String.fromCharCode(9746)) {
            isChecked = 'true';
        }
        else if (updatedText === String.fromCharCode(9744)) {
            isChecked = 'false';
        }
        if (this.documentHelper.owner.xmlPaneModule.isXmlPaneShow) {
            this.updateXMLData(updatedText);
        }
        var start = this.documentHelper.selection.start.clone();
        var end = this.documentHelper.selection.end.clone();
        for (var i = 0; i < this.documentHelper.contentControlCollection.length; i++) {
            var contentControl = this.documentHelper.contentControlCollection[i];
            if (contentControl.contentControlProperties.xmlMapping && contentControl.contentControlProperties.xmlMapping.xPath === xpath && contentControl.contentControlProperties.type !== 'CheckBox') {
                this.updateContentControl(contentControl, isChecked);
            }
            else if (contentControl.contentControlProperties.xmlMapping && contentControl.contentControlProperties.xmlMapping.xPath === xpath && contentControl.contentControlProperties.type === 'CheckBox') {
                this.updateContentControl(contentControl, updatedText);
            }
        }
        this.documentHelper.selection.selectRange(start, end);
    };
    XmlPane.prototype.updateXMLData = function (Text) {
        var selectedNode = this.treeviewObject.selectedNodes.toString();
        for (var i = 1; i < this.documentHelper.owner.editor.xmlData.length; i++) {
            var xmlID = this.documentHelper.owner.editor.xmlData[i].id.toString();
            if (selectedNode === xmlID) {
                if (!isNullOrUndefined(this.documentHelper.owner.editor.xmlData[i].displayValue)) {
                    this.documentHelper.owner.editor.xmlData[i].displayValue = Text;
                }
            }
        }
    };
    /**
    * To get the XMLpath to bind in the XML mapping property
    * @returns {}
    */
    XmlPane.prototype.getXmlPath = function () {
        var selectedNode = this.treeviewObject.selectedNodes.toString();
        var xPath = "";
        var nodeId = Number(selectedNode) - 1;
        for (var i = this.documentHelper.owner.editor.xmlData.length - 1; i >= 0; i--) {
            if (!isNullOrUndefined(this.documentHelper.owner.editor.xmlData[nodeId]) && this.documentHelper.owner.editor.xmlData[nodeId].pid == this.documentHelper.owner.editor.xmlData[i].id.toString()) {
                xPath = "\\" + this.documentHelper.owner.editor.xmlData[i].displayText + "[1]" + "\\" + xPath;
                nodeId = i;
            }
        }
        var nodeNumber = Number(selectedNode) - 1;
        if (this.documentHelper.owner.editor.xmlData[nodeNumber]) {
            xPath = xPath + this.documentHelper.owner.editor.xmlData[nodeNumber].displayText.toString() + "[1]";
            this.documentHelper.owner.xPathString = xPath;
        }
    };
    XmlPane.prototype.closeDialogUtils = function () {
        this.alertDialog.close();
        this.alertDialog = undefined;
    };
    /**
    * To create Div Template.
    * @param {string} id.
    * @param {HTMLElement} parentDiv.
    * @param {string} style.
    * @returns {HTMLElement}
    */
    XmlPane.prototype.createDivTemplate = function (id, parentDiv, style) {
        var divElement;
        if (style) {
            divElement = createElement('div', { id: id, styles: style });
        }
        else {
            divElement = createElement('div', { id: id });
        }
        parentDiv.appendChild(divElement);
        return divElement;
    };
    /**
    * To on File Selection.
    * @param {File} file.
    * @returns {void}
    */
    XmlPane.prototype.onFileSelect = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function () {
            var xmlString = reader.result;
            _this.addDataFromCustomXML(xmlString);
        };
        reader.readAsText(file);
    };
    /**
     * data from xml to the xml pane.
     *
     * @private
     * @param {string} xmlString - Specifies the custom xmlpart xml.
     * @returns {void}
     */
    XmlPane.prototype.addDataFromCustomXML = function (xmlString) {
        this.documentHelper.owner.editor.getPrefixMapping(xmlString);
        var parsedXml = this.documentHelper.owner.editor.parseXml(xmlString);
        var arr = this.documentHelper.owner.editor.objectToArray(parsedXml);
        this.documentHelper.owner.editor.setXmlData(parsedXml, arr);
        this.addingNewFileToDropDownList();
    };
    /**
    * To add New File To Drop Down List.
    * @param {File} file.
    * @private
    * @returns {void}
    */
    XmlPane.prototype.addingNewFileToDropDownList = function () {
        if (this.documentHelper.owner.editor.XMLFilesNameSpaceCount == 1 && this.documentHelper.owner.prefixMappings == null) {
            this.DropDownListData.splice(this.DropDownListData.length - 1, 0, { ID: "(no namespace)_" + this.documentHelper.owner.editor.XMLFilesCount, Value: "(no namespace)" });
            this.documentHelper.owner.editor.XMLFilesNameSpaceCount++;
        }
        else if (this.documentHelper.owner.editor.XMLFilesNameSpaceCount > 1 && this.documentHelper.owner.prefixMappings == null) {
            this.DropDownListData.splice(this.DropDownListData.length - 1, 0, { ID: "(no namespace)_" + this.documentHelper.owner.editor.XMLFilesCount, Value: "(no namespace) (" + this.documentHelper.owner.editor.XMLFilesNameSpaceCount + ")" });
            this.documentHelper.owner.editor.XMLFilesNameSpaceCount++;
        }
        else if (this.documentHelper.owner.prefixMappings) {
            this.DropDownListData.splice(this.DropDownListData.length - 1, 0, { ID: "(no namespace)_" + this.documentHelper.owner.editor.XMLFilesCount, Value: this.documentHelper.owner.prefixMappings });
        }
        this.dropDownListObject.dataSource = this.DropDownListData;
        this.dropDownListObject.refresh();
        this.dropDownListObject.value = this.DropDownListData[0].ID;
        this.dropDownListObject.text = this.DropDownListData[0].Value;
        this.documentHelper.owner.editor.XMLFilesCount++;
    };
    /**
     * To show Xml Properties.
     *
     * @private
     * @param {boolean} show - Specifies showing or hiding the xml pane.
     * @returns {void}
     */
    XmlPane.prototype.showXmlProperties = function (show) {
        this.isXmlPaneShow = show;
        if (show) {
            this.localeValue = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
            this.localeValue.setLocale(this.documentHelper.owner.locale);
            if (!isNullOrUndefined(XmlPane)) {
                this.initializeXmlMapping();
                var isRtl = this.documentHelper.owner.enableRtl;
                var optionsPaneContainerStyle = void 0;
                if (isRtl) {
                    optionsPaneContainerStyle = 'display:inline-flex;direction:rtl;';
                }
                else {
                    optionsPaneContainerStyle = 'display:inline-flex;';
                }
                this.documentHelper.optionsPaneContainer.insertBefore(this.documentHelper.owner.xmlPaneModule.element, this.documentHelper.viewerContainer);
                this.documentHelper.owner.isXmlPaneTool = true;
            }
            this.documentHelper.owner.resize();
            if (show && !this.contextMenuInstance) {
                this.initializeContextMenu();
                this.intializeDropDownList();
                // To check whether the xml Mapping were newly added or the existing one for closing/opening xml pane.
                if (!this.isAddedDocumentXml) {
                    this.isAddedDocumentXml = true;
                    for (var i = 0; i < this.documentHelper.customXmlData.length; i++) {
                        var key = this.documentHelper.customXmlData.keys[i];
                        var xmlValue = this.documentHelper.customXmlData.get(key);
                        if (!isNullOrUndefined(xmlValue)) {
                            this.addDataFromCustomXML(xmlValue);
                        }
                    }
                }
            }
            this.documentHelper.updateViewerSize();
        }
        else {
            this.documentHelper.updateViewerSize();
            if (!isNullOrUndefined(this.element)) {
                if (this.element.style.display !== 'none') {
                    this.element.style.display = 'none';
                }
            }
            this.destroyInternal();
            this.documentHelper.owner.isXmlPaneTool = false;
            this.documentHelper.owner.triggerResize();
        }
    };
    /**
    * @private
    * @returns {void}
    */
    XmlPane.prototype.clear = function () {
        if (this.DropDownListData.length > 2) {
            for (var i = 0; i < this.DropDownListData.length; i++) {
                var id = this.DropDownListData[i].ID;
                if (id !== "Choose" && id !== 'Add') {
                    this.DropDownListData.splice(i, 1);
                    i--;
                }
            }
        }
        this.isAddedDocumentXml = false;
    };
    /**
     * Dispose the internal objects which are maintained.
     *
     * @private
     * @returns {void}
     */
    XmlPane.prototype.destroyInternal = function () {
        if (this.treeviewObject) {
            this.treeviewObject.destroy();
            this.treeviewObject = undefined;
        }
        if (this.contextMenuInstance) {
            this.contextMenuInstance.destroy();
            this.contextMenuInstance = undefined;
        }
        if (this.positionLabelDiv) {
            this.positionLabelDiv.innerHTML = '';
            this.positionLabelDiv = undefined;
        }
        if (this.dropDownListObject) {
            this.dropDownListObject.destroy();
            this.dropDownListObject = undefined;
        }
        if (this.element) {
            this.element.innerHTML = '';
            if (this.element.parentElement) {
                this.element.parentElement.removeChild(this.element);
            }
        }
        this.element = undefined;
    };
    /**
     * Dispose the internal objects which are maintained.
     *
     * @private
     * @returns {void}
     */
    XmlPane.prototype.destroy = function () {
        if (this.treeviewObject) {
            this.treeviewObject.destroy();
            this.treeviewObject = undefined;
        }
        if (this.contextMenuInstance) {
            this.contextMenuInstance.destroy();
            this.contextMenuInstance = undefined;
        }
        if (this.positionLabelDiv) {
            this.positionLabelDiv.innerHTML = '';
            this.positionLabelDiv = undefined;
        }
        if (this.dropDownListObject) {
            this.dropDownListObject.destroy();
            this.dropDownListObject = undefined;
        }
        if (this.element) {
            this.element.innerHTML = '';
            if (this.element.parentElement) {
                this.element.parentElement.removeChild(this.element);
            }
        }
        this.element = undefined;
        this.documentHelper = undefined;
    };
    return XmlPane;
}());
export { XmlPane };
