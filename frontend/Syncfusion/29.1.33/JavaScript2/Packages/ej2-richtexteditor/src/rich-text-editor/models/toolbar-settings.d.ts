import { ChildProperty, EmitType } from '@syncfusion/ej2-base';
import { AjaxSettingsModel, ContextMenuSettingsModel, BeforeSendEventArgs } from '@syncfusion/ej2-filemanager';
import { DetailsViewSettingsModel } from '@syncfusion/ej2-filemanager';
import { NavigationPaneSettingsModel, SearchSettingsModel, SortOrder } from '@syncfusion/ej2-filemanager';
import { ToolbarSettingsModel as FileToolbarSettingsModel } from '@syncfusion/ej2-filemanager';
import { UploadSettingsModel, ViewType } from '@syncfusion/ej2-filemanager';
import { SaveFormat, DisplayLayoutOptions } from '../../common';
import { ToolbarType, ActionOnScroll, ToolbarItems, ToolbarConfigItems } from '../base/enum';
import { IToolbarItems, IDropDownItemModel, ColorModeType, IToolsItemConfigs, IListDropDownModel, EmojiIconsSet } from '../base/interface';
/**
 * Configures the toolbar settings of the RichTextEditor.
 */
export declare class ToolbarSettings extends ChildProperty<ToolbarSettings> {
    /**
     * Specifies whether to render the toolbar in the RichTextEditor.
     *
     * @default true
     */
    enable: boolean;
    /**
     * Specifies whether to enable or disable the floating toolbar.
     *
     * @default true
     */
    enableFloating: boolean;
    /**
     * Specifies the display types of the toolbar.
     * The available types are:
     * - Expand: Toolbar items fit within available space, and the rest are placed in the extended menu.
     * - MultiRow: Toolbar placed at the top of the RichTextEditor editing area.
     * - Scrollable: Toolbar items displayed in a single line with horizontal scrolling enabled.
     *
     * @default Expand
     */
    type: ToolbarType;
    /**
     * An array of strings or objects used to configure the toolbar items.
     *
     * @default ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote', 'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', '|', 'SourceCode', 'Undo', 'Redo']
     */
    items: (string | ToolbarConfigItems | IToolbarItems)[];
    /**
     * Allows modification of the default toolbar item configuration, such as the icon class.
     *
     * @default {}
     */
    itemConfigs: {
        [key in ToolbarItems]?: IToolsItemConfigs;
    };
}
/**
 * Configures the importWord settings of the RichTextEditor.
 */
export declare class ImportWord extends ChildProperty<ImportWord> {
    /**
     * Specifies the URL to receive and handle file uploads on the server.
     *
     * @default null
     */
    serviceUrl: string;
}
/**
 * Configures the export settings for Word format in the RichTextEditor.
 */
export declare class ExportWord extends ChildProperty<ExportWord> {
    /**
     * Specifies the URL used to export RichTextEditor content into Word files.
     *
     * @default null
     */
    serviceUrl: string;
    /**
     * Specifies the file name for the exported Word file.
     *
     * @default 'Sample.docx'
     */
    fileName: string;
    /**
     * Specifies the stylesheet to be applied to the exported file.
     *
     * @default null
     */
    stylesheet: string;
}
/**
 * Configures the export settings for PDF format in the RichTextEditor.
 */
export declare class ExportPdf extends ChildProperty<ExportPdf> {
    /**
     * Specifies the URL used to export RichTextEditor content into PDF files.
     *
     * @default null
     */
    serviceUrl: string;
    /**
     * Specifies the file name for the exported PDF file.
     *
     * @default 'Sample.pdf'
     */
    fileName: string;
    /**
     * Specifies the stylesheet to be applied to the exported file.
     *
     * @default null
     */
    stylesheet: string;
}
/**
 * Configures the image settings of the RichTextEditor.
 */
export declare class ImageSettings extends ChildProperty<ImageSettings> {
    /**
     * Specifies the allowed file types for selection.
     *
     * @default ['.jpeg', '.jpg', '.png']
     */
    allowedTypes: string[];
    /**
     * Specifies whether the image is inserted inline or with a break.
     *
     * @default 'inline'
     */
    display: string;
    /**
     * Specifies whether the inserted image is saved as a blob or base64.
     *
     * @default 'Blob'
     */
    saveFormat: SaveFormat;
    /**
     * Specifies the width of the image.
     *
     * @default 'auto'
     */
    width: string;
    /**
     * Specifies the height of the image.
     *
     * @default 'auto'
     */
    height: string;
    /**
     * Specifies the URL for the save action that handles uploaded images on the server.
     *
     * This URL should handle a `POST` request, with an argument named `UploadFiles`.
     *
     * The event is triggered when inserting an image via the Insert Image dialog, pasting an image, replacing an existing image, or dragging and dropping from the file browser.
     *
     * @default null
     */
    saveUrl: string;
    /**
     * Specifies the path for storing and displaying images.
     *
     * @default null
     */
    path: string;
    /**
     * Enables resizing for the image element.
     *
     * @default true
     */
    resize: boolean;
    /**
     * Specifies the URL for the remove action that handles image removal on the server.
     *
     * This URL should handle a `POST` request, with an argument named `UploadFiles`.
     *
     * The event is triggered when uploading and canceling or removing an image in the insert image dialog, pasting, and removing an image in the Paste cleanup popup.
     *
     * @default null
     */
    removeUrl: string;
    /**
     * Defines the minimum width of the image.
     *
     * @default '0'
     */
    minWidth: string | number;
    /**
     * Defines the maximum width of the image.
     *
     * @default null
     */
    maxWidth: string | number;
    /**
     * Defines the minimum height of the image.
     *
     * @default '0'
     */
    minHeight: string | number;
    /**
     * Defines the maximum height of the image.
     *
     * @default null
     */
    maxHeight: string | number;
    /**
     * Enables image resizing by percentage calculation.
     *
     * @default false
     */
    resizeByPercent: boolean;
}
/**
 * Configures the audio settings of the RichTextEditor.
 */
export declare class AudioSettings extends ChildProperty<AudioSettings> {
    /**
     * Specifies the allowed file types for audio selection.
     *
     * @default ['.wav', '.mp3', '.m4a', '.wma']
     */
    allowedTypes: string[];
    /**
     * Specifies whether the audio is inserted inline or with a break.
     *
     * @default 'Inline'
     */
    layoutOption: DisplayLayoutOptions;
    /**
     * Specifies whether the inserted audio is saved as a blob or base64.
     *
     * @default 'Blob'
     */
    saveFormat: SaveFormat;
    /**
     * Specifies the URL for the save action that handles uploaded audio files on the server.
     *
     * @default null
     */
    saveUrl: string;
    /**
     * Specifies the URL for the remove action that handles audio removal on the server.
     *
     * @default null
     */
    removeUrl: string;
    /**
     * Specifies the path for storing and displaying audio files.
     *
     * @default null
     */
    path: string;
}
/**
 * Configures the video settings of the RichTextEditor.
 */
export declare class VideoSettings extends ChildProperty<VideoSettings> {
    /**
     * Specifies the allowed file types for video selection.
     *
     * @default ['.mp4', '.mov', '.wmv', '.avi']
     */
    allowedTypes: string[];
    /**
     * Specifies whether the video is inserted inline or with a break.
     *
     * @default 'Inline'
     */
    layoutOption: DisplayLayoutOptions;
    /**
     * Specifies whether the inserted video is saved as a blob or base64.
     *
     * @default 'Blob'
     */
    saveFormat: SaveFormat;
    /**
     * Specifies the width of the video.
     *
     * @default 'auto'
     */
    width: string;
    /**
     * Specifies the height of the video.
     *
     * @default 'auto'
     */
    height: string;
    /**
     * Specifies the URL for the save action that handles uploaded video files on the server.
     *
     * @default null
     */
    saveUrl: string;
    /**
     * Specifies the path for storing and displaying video files.
     *
     * @default null
     */
    path: string;
    /**
     * Enables resizing for the video element.
     *
     * @default true
     */
    resize: boolean;
    /**
     * Specifies the URL for the remove action that handles video removal on the server.
     *
     * @default null
     */
    removeUrl: string;
    /**
     * Defines the minimum width of the video.
     *
     * @default '0'
     */
    minWidth: string | number;
    /**
     * Defines the maximum width of the video.
     *
     * @default null
     */
    maxWidth: string | number;
    /**
     * Defines the minimum height of the video.
     *
     * @default '0'
     */
    minHeight: string | number;
    /**
     * Defines the maximum height of the video.
     *
     * @default null
     */
    maxHeight: string | number;
    /**
     * Enables video resizing by percentage calculation.
     *
     * @default false
     */
    resizeByPercent: boolean;
}
/**
 * Configures the file manager settings of the RichTextEditor.
 */
export declare class FileManagerSettings extends ChildProperty<FileManagerSettings> {
    /**
     * Event triggered before sending an AJAX request to the server.
     * Set the cancel argument to true to prevent the request.
     *
     * @event beforeSend
     */
    beforeSend: EmitType<BeforeSendEventArgs>;
    /**
     * Specifies the AJAX settings for the file manager.
     *
     * @default {
     *   getImageUrl: null,
     *   url: null,
     *   uploadUrl: null
     * }
     */
    ajaxSettings: AjaxSettingsModel;
    /**
     * Enables or disables drag-and-drop functionality for files.
     *
     * @default false
     */
    allowDragAndDrop: boolean;
    /**
     * Specifies the context menu settings for the file manager.
     *
     * @default {
     *   file: ['Open', '|', 'Cut', 'Copy', '|', 'Delete', 'Rename', '|', 'Details'],
     *   folder: ['Open', '|', 'Cut', 'Copy', 'Paste', '|', 'Delete', 'Rename', '|', 'Details'],
     *   layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', 'Upload', '|', 'Details', '|', 'SelectAll'],
     *   visible: true
     * }
     */
    contextMenuSettings: ContextMenuSettingsModel;
    /**
     * Specifies the root CSS class of the file manager, allowing customization by overriding styles.
     *
     * @default ''
     */
    cssClass: string;
    /**
     * Specifies the details view settings for the file manager.
     *
     * @default {
     *   columns: [{
     *     field: 'name', headerText: 'Name', minWidth: 120, template: '<span class="e-fe-text">${name}</span>',
     *     customAttributes: { class: 'e-fe-grid-name'}}, { field: '_fm_modified', headerText: 'DateModified', type: 'dateTime',
     *     format: 'MMMM dd, yyyy HH:mm', minWidth: 120, width: '190' }, { field: 'size', headerText: 'Size', minWidth: 90, width: '110',
     *     template: '<span class="e-fe-size">${size}</span>' }
     *   ]
     * }
     */
    detailsViewSettings: DetailsViewSettingsModel;
    /**
     * Specifies whether to enable the file manager in the RichTextEditor.
     *
     * @default false
     */
    enable: boolean;
    /**
     * Specifies the navigation pane settings for the file manager.
     *
     * @default { maxWidth: '650px', minWidth: '240px', visible: true }
     */
    navigationPaneSettings: NavigationPaneSettingsModel;
    /**
     * Specifies the current path in the file manager.
     *
     * @default '/'
     */
    path: string;
    /**
     * Specifies the alias name for the root folder in the file manager.
     *
     * @default null
     */
    rootAliasName: string;
    /**
     * Specifies the search settings for the file manager.
     *
     * @default {
     *   allowSearchOnTyping: true,
     *   filterType: 'contains',
     *   ignoreCase: true
     * }
     */
    searchSettings: SearchSettingsModel;
    /**
     * Determines whether to show or hide file extensions in the file manager.
     *
     * @default true
     */
    showFileExtension: boolean;
    /**
     * Determines whether to show or hide files and folders marked as hidden.
     *
     * @default false
     */
    showHiddenItems: boolean;
    /**
     * Determines whether to show or hide thumbnail images in the large icons view.
     *
     * @default true
     */
    showThumbnail: boolean;
    /**
     * Specifies the sort order for folders and files. Options are:
     * - `None`: Folders and files are not sorted.
     * - `Ascending`: Folders and files are sorted in ascending order.
     * - `Descending`: Folders and files are sorted in descending order.
     *
     * @default 'Ascending'
     */
    sortOrder: SortOrder;
    /**
     * Specifies groups of items aligned horizontally in the toolbar.
     *
     * @default { visible: true, items: ['NewFolder', 'Upload', 'Cut', 'Copy', 'Paste', 'Delete', 'Download', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details'] }
     */
    toolbarSettings: FileToolbarSettingsModel;
    /**
     * Specifies the upload settings for the file manager.
     *
     * @default { autoUpload: true, minFileSize: 0, maxFileSize: 30000000, allowedExtensions: '', autoClose: false }
     */
    uploadSettings: UploadSettingsModel;
    /**
     * Specifies the initial view of the file manager.
     *
     * This property allows setting the initial view to either 'Details' or 'LargeIcons'. The available views are:
     * - `LargeIcons`
     * - `Details`
     *
     * @default 'LargeIcons'
     */
    view: ViewType;
}
export declare class TableSettings extends ChildProperty<TableSettings> {
    /**
     * Specifies the width of the table.
     *
     * @default '100%'
     */
    width: string | number;
    /**
     * Class names appended by default to the table element.
     * Assists in styling the table in specific CSS styles when inserted in the editor.
     *
     * Available styles:
     * - `Dashed Borders`: Adds dashed borders around the table using the `e-dashed-borders` CSS class.
     * - `Alternate Rows`: Applies alternating row colors for better readability using the `e-alternate-rows` CSS class.
     *
     * @default TableStyleItems
     */
    styles: IDropDownItemModel[];
    /**
     * Enables resizing for the table element.
     *
     * @default true
     */
    resize: boolean;
    /**
     * Defines the minimum width of the table.
     *
     * @default '0'
     */
    minWidth: string | number;
    /**
     * Defines the maximum width of the table.
     *
     * @default null
     */
    maxWidth: string | number;
}
/**
 * Configures the quick toolbar settings of the RichTextEditor.
 */
export declare class QuickToolbarSettings extends ChildProperty<QuickToolbarSettings> {
    /**
     * Specifies whether to enable the quick toolbar in the RichTextEditor.
     *
     * @default true
     */
    enable: boolean;
    /**
     * Specifies whether the quick toolbar opens on right-click.
     *
     * @default false
     */
    showOnRightClick: boolean;
    /**
     * Specifies the action to perform when scrolling the target-parent container.
     *
     * @default 'hide'
     */
    actionOnScroll: ActionOnScroll;
    /**
     * Specifies the items to render in the quick toolbar when a link is selected.
     *
     * @default ['Open', 'Edit', 'UnLink']
     */
    link: (string | IToolbarItems)[];
    /**
     * Specifies the items to render in the quick toolbar when an image is selected.
     *
     * @default ['Replace', 'Align', 'Caption', 'Remove', '-', 'InsertLink', 'OpenImageLink', 'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension']
     */
    image: (string | IToolbarItems)[];
    /**
     * Specifies the items to render in the quick toolbar when audio is selected.
     *
     * @default ['AudioReplace', 'Remove', 'AudioLayoutOption']
     */
    audio: (string | IToolbarItems)[];
    /**
     * Specifies the items to render in the quick toolbar when a video is selected.
     *
     * @default ['VideoReplace', 'VideoAlign', 'VideoRemove', 'VideoLayoutOption', 'VideoDimension']
     */
    video: (string | IToolbarItems)[];
    /**
     * Specifies the items to render in the quick toolbar when text is selected.
     *
     * @default null
     */
    text: (string | ToolbarConfigItems | IToolbarItems)[];
    /**
     * Specifies the items to render in the quick toolbar when a table is selected.
     *
     * @default ['TableHeader', 'TableRows', 'TableColumns', 'BackgroundColor', '-', 'TableRemove', 'Alignments', 'TableCellVerticalAlign', 'Styles']
     */
    table: (string | IToolbarItems)[];
}
/**
 * Configures the format painter settings of the RichTextEditor.
 */
export declare class FormatPainterSettings extends ChildProperty<FormatPainterSettings> {
    /**
     * Defines the tag name selectors to obtain formats from elements.
     *
     * @default 'b; em; font; sub; sup; kbd; i; s; u; code; strong; span; p; div; h1; h2; h3; h4; h5; h6; blockquote; ol; ul; li; pre;'
     */
    allowedFormats: string;
    /**
     * Defines selectors for elements from which fetching formats is expressly prohibited.
     *
     * @default null
     */
    deniedFormats: string;
}
/**
 * Specifies the emoji picker options in the RichTextEditor.
 */
export declare class EmojiSettings extends ChildProperty<EmojiSettings> {
    /**
     * Specifies an array of items representing emoji icons.
     *
     * @default [{
        name: 'Smilies & People', code: '1F600', iconCss: 'e-emoji', icons: [{ code: '1F600', desc: 'Grinning face' },
        { code: '1F603', desc: 'Grinning face with big eyes' },
        { code: '1F604', desc: 'Grinning face with smiling eyes' },
        { code: '1F606', desc: 'Grinning squinting face' },
        { code: '1F605', desc: 'Grinning face with sweat' },
        { code: '1F602', desc: 'Face with tears of joy' },
        { code: '1F923', desc: 'Rolling on the floor laughing' },
        { code: '1F60A', desc: 'Smiling face with smiling eyes' },
        { code: '1F607', desc: 'Smiling face with halo' },
        { code: '1F642', desc: 'Slightly smiling face' },
        { code: '1F643', desc: 'Upside-down face' },
        { code: '1F60D', desc: 'Smiling face with heart-eyes' },
        { code: '1F618', desc: 'Face blowing a kiss' },
        { code: '1F61B', desc: 'Face with tongue' },
        { code: '1F61C', desc: 'Winking face with tongue' },
        { code: '1F604', desc: 'Grinning face with smiling eyes' },
        { code: '1F469', desc: 'Woman' },
        { code: '1F468', desc: 'Man' },
        { code: '1F467', desc: 'Girl' },
        { code: '1F466', desc: 'Boy' },
        { code: '1F476', desc: 'Baby' },
        { code: '1F475', desc: 'Old woman' },
        { code: '1F474', desc: 'Old man' },
        { code: '1F46E', desc: 'Police officer' },
        { code: '1F477', desc: 'Construction worker' },
        { code: '1F482', desc: 'Guard' },
        { code: '1F575', desc: 'Detective' },
        { code: '1F9D1', desc: 'Cook' }]
    }, {
        name: 'Animals & Nature', code: '1F435', iconCss: 'e-animals', icons: [{ code: '1F436', desc: 'Dog face' },
        { code: '1F431', desc: 'Cat face' },
        { code: '1F42D', desc: 'Mouse face' },
        { code: '1F439', desc: 'Hamster face' },
        { code: '1F430', desc: 'Rabbit face' },
        { code: '1F98A', desc: 'Fox face' },
        { code: '1F43B', desc: 'Bear face' },
        { code: '1F43C', desc: 'Panda face' },
        { code: '1F428', desc: 'Koala' },
        { code: '1F42F', desc: 'Tiger face' },
        { code: '1F981', desc: 'Lion face' },
        { code: '1F42E', desc: 'Cow face' },
        { code: '1F437', desc: 'Pig face' },
        { code: '1F43D', desc: 'Pig nose' },
        { code: '1F438', desc: 'Frog face' },
        { code: '1F435', desc: 'Monkey face' },
        { code: '1F649', desc: 'Hear-no-evil monkey' },
        { code: '1F64A', desc: 'Speak-no-evil monkey' },
        { code: '1F412', desc: 'Monkey' },
        { code: '1F414', desc: 'Chicken' },
        { code: '1F427', desc: 'Penguin' },
        { code: '1F426', desc: 'Bird' },
        { code: '1F424', desc: 'Baby chick' },
        { code: '1F986', desc: 'Duck' },
        { code: '1F985', desc: 'Eagle' }]
    }, {
        name: 'Food & Drink', code: '1F347', iconCss: 'e-food-and-drinks', icons: [{ code: '1F34E', desc: 'Red apple' },
        { code: '1F34C', desc: 'Banana' },
        { code: '1F347', desc: 'Grapes' },
        { code: '1F353', desc: 'Strawberry' },
        { code: '1F35E', desc: 'Bread' },
        { code: '1F950', desc: 'Croissant' },
        { code: '1F955', desc: 'Carrot' },
        { code: '1F354', desc: 'Hamburger' },
        { code: '1F355', desc: 'Pizza' },
        { code: '1F32D', desc: 'Hot dog' },
        { code: '1F35F', desc: 'French fries' },
        { code: '1F37F', desc: 'Popcorn' },
        { code: '1F366', desc: 'Soft ice cream' },
        { code: '1F367', desc: 'Shaved ice' },
        { code: '1F36A', desc: 'Cookie' },
        { code: '1F382', desc: 'Birthday cake' },
        { code: '1F370', desc: 'Shortcake' },
        { code: '1F36B', desc: 'Chocolate bar' },
        { code: '1F369', desc: 'Donut' },
        { code: '1F36E', desc: 'Custard' },
        { code: '1F36D', desc: 'Lollipop' },
        { code: '1F36C', desc: 'Candy' },
        { code: '1F377', desc: 'Wine glass' },
        { code: '1F37A', desc: 'Beer mug' },
        { code: '1F37E', desc: 'Bottle with popping cork' }]
    }, {
        name: 'Activities', code: '1F383', iconCss: 'e-activities', icons: [{ code: '26BD', desc: 'Soccer ball' },
        { code: '1F3C0', desc: 'Basketball' },
        { code: '1F3C8', desc: 'American football' },
        { code: '26BE', desc: 'Baseball' },
        { code: '1F3BE', desc: 'Tennis' },
        { code: '1F3D0', desc: 'Volleyball' },
        { code: '1F3C9', desc: 'Rugby football' },
        { code: '1F3B1', desc: 'Pool 8 ball' },
        { code: '1F3D3', desc: 'Ping pong' },
        { code: '1F3F8', desc: 'Badminton' },
        { code: '1F94A', desc: 'Boxing glove' },
        { code: '1F3CA', desc: 'Swimmer' },
        { code: '1F3CB', desc: 'Weightlifter' },
        { code: '1F6B4', desc: 'Bicyclist' },
        { code: '1F6F9', desc: 'Skateboard' },
        { code: '1F3AE', desc: 'Video game' },
        { code: '1F579', desc: 'Joystick' },
        { code: '1F3CF', desc: 'Cricket' },
        { code: '1F3C7', desc: 'Horse racing' },
        { code: '1F3AF', desc: 'Direct hit' },
        { code: '1F3D1', desc: 'Field hockey' },
        { code: '1F3B0', desc: 'Slot machine' },
        { code: '1F3B3', desc: 'Bowling' },
        { code: '1F3B2', desc: 'Game die' },
        { code: '265F', desc: 'Chess pawn' }]
    }, {
        name: 'Travel & Places', code: '1F30D', iconCss: 'e-travel-and-places', icons: [{ code: '2708', desc: 'Airplane' },
        { code: '1F697', desc: 'Automobile' },
        { code: '1F695', desc: 'Taxi' },
        { code: '1F6B2', desc: 'Bicycle' },
        { code: '1F68C', desc: 'Bus' },
        { code: '1F682', desc: 'Locomotive' },
        { code: '1F6F3', desc: 'Passenger ship' },
        { code: '1F680', desc: 'Rocket' },
        { code: '1F681', desc: 'Helicopter' },
        { code: '1F6A2', desc: 'Ship' },
        { code: '1F3DF', desc: 'Stadium' },
        { code: '1F54C', desc: 'Mosque' },
        { code: '26EA', desc: 'Church' },
        { code: '1F6D5', desc: 'Hindu Temple' },
        { code: '1F3D4', desc: 'Snow-capped mountain' },
        { code: '1F3EB', desc: 'School' },
        { code: '1F30B', desc: 'Volcano' },
        { code: '1F3D6', desc: 'Beach with umbrella' },
        { code: '1F3DD', desc: 'Desert island' },
        { code: '1F3DE', desc: 'National park' },
        { code: '1F3F0', desc: 'Castle' },
        { code: '1F5FC', desc: 'Tokyo tower' },
        { code: '1F5FD', desc: 'Statue of liberty' },
        { code: '26E9', desc: 'Shinto shrine' },
        { code: '1F3EF', desc: 'Japanese castle' },
        { code: '1F3A2', desc: 'Roller coaster' }]
    }, {
        name: 'Objects', code: '1F507', iconCss: 'e-objects', icons: [{ code: '1F4A1', desc: 'Light bulb' },
        { code: '1F526', desc: 'Flashlight' },
        { code: '1F4BB', desc: 'Laptop computer' },
        { code: '1F5A5', desc: 'Desktop computer' },
        { code: '1F5A8', desc: 'Printer' },
        { code: '1F4F7', desc: 'Camera' },
        { code: '1F4F8', desc: 'Camera with flash' },
        { code: '1F4FD', desc: 'Film projector' },
        { code: '1F3A5', desc: 'Movie camera' },
        { code: '1F4FA', desc: 'Television' },
        { code: '1F4FB', desc: 'Radio' },
        { code: '1F50B', desc: 'Battery' },
        { code: '231A', desc: 'Watch' },
        { code: '1F4F1', desc: 'Mobile phone' },
        { code: '260E', desc: 'Telephone' },
        { code: '1F4BE', desc: 'Floppy disk' },
        { code: '1F4BF', desc: 'Optical disk' },
        { code: '1F4C0', desc: 'Digital versatile disc' },
        { code: '1F4BD', desc: 'Computer disk' },
        { code: '1F3A7', desc: 'Headphone' },
        { code: '1F3A4', desc: 'Microphone' },
        { code: '1F3B6', desc: 'Multiple musical notes' },
        { code: '1F4DA', desc: 'Books' }]
    }, {
        name: 'Symbols', code: '1F3E7', iconCss: 'e-symbols', icons: [{ code: '274C', desc: 'Cross mark' },
        { code: '2714', desc: 'Check mark' },
        { code: '26A0', desc: 'Warning sign' },
        { code: '1F6AB', desc: 'Prohibited' },
        { code: '2139', desc: 'Information' },
        { code: '267B', desc: 'Recycling symbol' },
        { code: '1F6AD', desc: 'No smoking' },
        { code: '1F4F5', desc: 'No mobile phones' },
        { code: '1F6AF', desc: 'No littering' },
        { code: '1F6B3', desc: 'No bicycles' },
        { code: '1F6B7', desc: 'No pedestrians' },
        { code: '2795', desc: 'Plus' },
        { code: '2796', desc: 'Minus' },
        { code: '2797', desc: 'Divide' },
        { code: '2716', desc: 'Multiplication' },
        { code: '1F4B2', desc: 'Dollar banknote' },
        { code: '1F4AC', desc: 'Speech balloon' },
        { code: '2755', desc: 'White exclamation mark' },
        { code: '2754', desc: 'White question mark' },
        { code: '2764', desc: 'Red heart' }]
    }]
     *
     */
    iconsSet: EmojiIconsSet[];
    /**
     * Enables or disables the search box in the emoji picker.
     *
     * @default true
     */
    showSearchBox: boolean;
}
/**
 * Configures the paste cleanup settings of the RichTextEditor.
 */
export declare class PasteCleanupSettings extends ChildProperty<PasteCleanupSettings> {
    /**
     * Specifies whether to enable the prompt for paste in the RichTextEditor.
     *
     * @default false
     */
    prompt: boolean;
    /**
     * Specifies the attributes to restrict when pasting in the RichTextEditor.
     *
     * @default null
     */
    deniedAttrs: string[];
    /**
     * Specifies the allowed style properties when pasting in the RichTextEditor.
     *
     * @default ['background', 'background-color', 'border', 'border-bottom', 'border-left', 'border-radius', 'border-right', 'border-style', 'border-top', 'border-width', 'clear', 'color', 'cursor', 'direction', 'display', 'float', 'font', 'font-family', 'font-size', 'font-weight', 'font-style', 'height', 'left', 'line-height', 'list-style-type', 'margin', 'margin-top', 'margin-left', 'margin-right', 'margin-bottom', 'max-height', 'max-width', 'min-height', 'min-width', 'overflow', 'overflow-x', 'overflow-y', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'position', 'right', 'table-layout', 'text-align', 'text-decoration', 'text-transform', 'text-indent', 'top', 'vertical-align', 'visibility', 'white-space', 'width', 'flex-direction']
     */
    allowedStyleProps: string[];
    /**
     * Specifies the tags to restrict when pasting in the RichTextEditor.
     *
     * @default null
     */
    deniedTags: string[];
    /**
     * Specifies whether to keep or remove formatting when pasting in the RichTextEditor.
     *
     * @default true
     */
    keepFormat: boolean;
    /**
     * Specifies whether to paste as plain text or not in the RichTextEditor.
     *
     * @default false
     */
    plainText: boolean;
}
/**
 * Configures the font family settings of the RichTextEditor.
 */
export declare class FontFamily extends ChildProperty<FontFamily> {
    /**
     * Specifies the default font family selection.
     *
     * @default null
     */
    default: string;
    /**
     * Specifies the width of the content area.
     *
     * @default '72px'
     */
    width: string;
    /**
     * Specifies the default font family items.
     *
     * @default fontFamily
     */
    items: IDropDownItemModel[];
}
/**
 * Configures the font size settings of the RichTextEditor.
 */
export declare class FontSize extends ChildProperty<FontSize> {
    /**
     * Specifies the default font size selection.
     *
     * @default null
     */
    default: string;
    /**
     * Specifies the width of the content area.
     *
     * @default '60px'
     */
    width: string;
    /**
     * Specifies the default font size items.
     *
     * @default fontSize
     */
    items: IDropDownItemModel[];
}
/**
 * Configures the format settings of the RichTextEditor.
 */
export declare class Format extends ChildProperty<Format> {
    /**
     * Specifies the default format.
     *
     * @default null
     */
    default: string;
    /**
     * Specifies the width of the content area.
     *
     * @default '65px'
     */
    width: string;
    /**
     * Specifies the collection of default font size items for the format dropdown.
     * These items define the available options for users to select.
     *
     * @default formatItems
     */
    types: IDropDownItemModel[];
}
/**
 * Configures the font color settings of the RichTextEditor.
 */
export declare class FontColor extends ChildProperty<FontColor> {
    /**
     * Specifies the default font color.
     *
     * @default '#ff0000'
     */
    default: string;
    /**
     * Specifies the color mode.
     *
     * @default 'Palette'
     */
    mode: ColorModeType;
    /**
     * Specifies the number of columns in the color palette.
     *
     * @default 10
     */
    columns: number;
    /**
     * Specifies custom color codes.
     *
     * @default fontColor
     */
    colorCode: {
        [key: string]: string[];
    };
    /**
     * Enables or disables the mode switcher button.
     *
     * @default false
     */
    modeSwitcher: boolean;
}
/**
 * Configures the background color settings of the RichTextEditor.
 */
export declare class BackgroundColor extends ChildProperty<BackgroundColor> {
    /**
     * Specifies the default background color.
     *
     * @default '#ffff00'
     */
    default: string;
    /**
     * Specifies the color mode.
     *
     * @default 'Palette'
     */
    mode: ColorModeType;
    /**
     * Specifies the number of columns in the color palette.
     *
     * @default 10
     */
    columns: number;
    /**
     * Specifies custom color codes.
     *
     * @default backgroundColor
     */
    colorCode: {
        [key: string]: string[];
    };
    /**
     * Enables or disables the mode switcher button.
     *
     * @default false
     */
    modeSwitcher: boolean;
}
/**
 * Configures the settings for the number format list in the RichTextEditor.
 */
export declare class NumberFormatList extends ChildProperty<NumberFormatList> {
    /**
     * Specifies the default options for the number format list items.
     *
     * @default numberFormatList
     */
    types: IListDropDownModel[];
}
/**
 * Configures the settings for the bullet format list in the RichTextEditor.
 */
export declare class BulletFormatList extends ChildProperty<BulletFormatList> {
    /**
     * Specifies the default options for the bullet format list items.
     *
     * @default bulletFormatList
     */
    types: IListDropDownModel[];
}
