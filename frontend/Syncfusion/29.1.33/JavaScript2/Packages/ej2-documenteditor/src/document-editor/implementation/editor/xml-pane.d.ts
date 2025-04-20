import { DocumentHelper } from '../index';
import { TreeView, ContextMenu as Menu } from '@syncfusion/ej2-navigations';
import { DropDownList, SelectEventArgs } from '@syncfusion/ej2-dropdowns';
/**
 * xml Pane class.
 */
export declare class XmlPane {
    private documentHelper;
    /**
     * @private
     */
    element: HTMLElement;
    private positionLabelDiv;
    private isRtl;
    /**
     * @private
     */
    isXmlPaneShow: boolean;
    /**
     * @private
     */
    isAddedDocumentXml: boolean;
    /**
     * @private
     */
    treeviewObject: TreeView;
    private alertDialog;
    ulelement: HTMLUListElement;
    /**
     * @private
     */
    contextMenuInstance: Menu;
    private localeValue;
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @param {boolean} isRtl - Specifies the Rtl.
     * @private
     */
    constructor(documentHelper: DocumentHelper, isRtl?: boolean);
    private readonly viewer;
    private getModuleName;
    /**
     * To set Drop Down List Data.
     *
     * @param {Object} key.
     * @private
     * @returns {void}
     */
    DropDownListData: {
        [key: string]: Object;
    }[];
    dropDownListObject: DropDownList;
    /**
     * @private
     * @param {boolean} enable - enable/disable header footer pane.
     * @returns {void}
     */
    enableDisableElements(enable: boolean): void;
    /**
     * Initialize the Xml Mapping.
     *
     * @private
     * @param {L10n} localeValue - Specifies the localization based on culture.
     * @param {boolean} isRtl - Specifies the Rtl.
     * @returns {void}
     */
    initializeXmlMapping(): void;
    /**
* To set Default Treeview data.
* @param {Object} key.
* @returns {void}
*/
    private hierarchicalData;
    field: Object;
    /**
    * To initialize Context Menu.
    * @returns {void}
    */
    private initializeContextMenu;
    /**
    * To intialize Drop Down List.
    * @returns {void}
    */
    private intializeDropDownList;
    /**
    * To handle Drop Down List collection by selection.
    * @param {SelectEventArgs} args.
    * @private
    * @returns {void}
    */
    handleDropDownList(args: SelectEventArgs): void;
    /**
    * To handle Treeview object collection based on the xml Data.
    * @param {number} index.
    * @returns {void}
    */
    private handleTreeviewObject;
    /**
    * To context Menu scenario Before Open.
    * @param {BeforeOpenCloseMenuEventArgs} args.
    * @returns {void}
    */
    private contextMenuBeforeOpen;
    /**
    * To handle Context Menu Items based on Type of content control.
    * @param {MenuEventArgs} args.
    * @returns {void}
    */
    private handleContextMenuItem;
    private disableBrowserContextmenu;
    /**
    * To apply Content Control.
    * @param {string} args.
    * @returns {void}
    */
    private applyContentControl;
    /**
    * To insert Content inside the content control.
    * @returns {void}
    */
    private insertContent;
    /**
     * @private
     * @returns {void}
     */
    updateContent(updatedText: string, xpath: string): void;
    private updateContentControl;
    private updateCheckBoxContentControl;
    private updateXMLData;
    /**
    * To get the XMLpath to bind in the XML mapping property
    * @returns {}
    */
    private getXmlPath;
    private closeDialogUtils;
    /**
    * To create Div Template.
    * @param {string} id.
    * @param {HTMLElement} parentDiv.
    * @param {string} style.
    * @returns {HTMLElement}
    */
    private createDivTemplate;
    /**
    * To handle File Selection.
    * @returns {void}
    */
    handleFileSelect: () => void;
    /**
    * To on File Selection.
    * @param {File} file.
    * @returns {void}
    */
    private onFileSelect;
    /**
     * data from xml to the xml pane.
     *
     * @private
     * @param {string} xmlString - Specifies the custom xmlpart xml.
     * @returns {void}
     */
    addDataFromCustomXML(xmlString: string): void;
    /**
    * To add New File To Drop Down List.
    * @param {File} file.
    * @private
    * @returns {void}
    */
    addingNewFileToDropDownList(): void;
    /**
     * Close the xml pane.
     *
     * @private
     * @returns {void}
     */
    onClose: () => void;
    /**
     * To show Xml Properties.
     *
     * @private
     * @param {boolean} show - Specifies showing or hiding the xml pane.
     * @returns {void}
     */
    showXmlProperties(show: boolean): void;
    /**
    * @private
    * @returns {void}
    */
    clear(): void;
    /**
     * Dispose the internal objects which are maintained.
     *
     * @private
     * @returns {void}
     */
    destroyInternal(): void;
    /**
     * Dispose the internal objects which are maintained.
     *
     * @private
     * @returns {void}
     */
    destroy(): void;
}
