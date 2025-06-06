import * as CLS from '../base/classes';
import * as events from '../base/constant';
import { read, paste, Search, filter, Download, Delete, isFileSystemData } from '../common/operations';
import { getValue, setValue, isNullOrUndefined as isNOU, matches, select, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { closest, detach } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { createDialog } from '../pop-up/dialog';
/**
 * Utility function to compare two strings in a way similar to Windows Explorer.
 * Files and folders are sorted separately, with folders coming before files.
 *
 * @param {string} reference - The first string to compare. This could be a file or folder name.
 * @param {string} comparer - The second string to compare. This could be a file or folder name.
 * @returns {number} - A negative number if `reference` should come before `comparer`, a positive number if `comparer` should come before `reference`, and 0 if they are considered equal.
 */
export function sortComparer(reference, comparer) {
    // Check if reference and comparer are files or folders
    var referenceIsFile = /\.\S+/.test(reference);
    var comparerIsFile = /\.\S+/.test(comparer);
    // If one is a file and the other is a folder, the folder should come first
    if (referenceIsFile && !comparerIsFile) {
        return 1;
    }
    if (!referenceIsFile && comparerIsFile) {
        return -1;
    }
    var referenceParts = [];
    var comparerParts = [];
    (reference + '').replace(/(\d+)|(\D+)/g, function (_, $1, $2) { referenceParts.push([$1 || Infinity, $2 || '']); return ''; });
    (comparer + '').replace(/(\d+)|(\D+)/g, function (_, $1, $2) { comparerParts.push([$1 || Infinity, $2 || '']); return ''; });
    // Compare each part of reference and comparer
    while (referenceParts.length && comparerParts.length) {
        var referencePart = referenceParts.shift();
        var comparerPart = comparerParts.shift();
        if (referencePart && comparerPart) {
            var comparisonResult = referencePart[0] - comparerPart[0] ||
                referencePart[1].localeCompare(comparerPart[1]);
            if (comparisonResult) {
                return comparisonResult;
            }
        }
    }
    return referenceParts.length - comparerParts.length;
}
/**
 * Utility file for common actions
 *
 * @param {HTMLLIElement} node - specifies the node.
 * @param {Object} data - specifies the data.
 * @param {IFileManager} instance - specifies the control instance.
 * @returns {void}
 * @private
 */
export function updatePath(node, data, instance) {
    var text = getValue('name', data);
    var id = node.getAttribute('data-id');
    var newText = isNOU(id) ? text : id;
    instance.setProperties({ path: getPath(node, newText, instance.hasId) }, true);
    instance.pathId = getPathId(node);
    instance.pathNames = getPathNames(node, text);
}
/**
 * Functions for get path in FileManager
 *
 * @param {Element | Node} element - specifies the element.
 * @param {string} text - specifies the text.
 * @param {boolean} hasId - specifies the id.
 * @returns {string} returns the path.
 * @private
 */
export function getPath(element, text, hasId) {
    var matched = getParents(element, text, false, hasId);
    var path = '/';
    var len = matched.length - (2);
    for (var i = len; i >= 0; i--) {
        path += matched[i] + '/';
    }
    return path;
}
/**
 * Functions for get path id in FileManager
 *
 * @param {Element} node - specifies the node element.
 * @returns {string[]} returns the path ids.
 * @private
 */
export function getPathId(node) {
    var matched = getParents(node, node.getAttribute('data-uid'), true);
    var ids = [];
    for (var i = matched.length - 1; i >= 0; i--) {
        ids.push(matched[i]);
    }
    return ids;
}
/**
 * Functions for get path names in FileManager
 *
 * @param {Element} element - specifies the node element.
 * @param {string} text - specifies the text.
 * @returns {string[]} returns the path names.
 * @private
 */
export function getPathNames(element, text) {
    var matched = getParents(element, text, false);
    var names = [];
    for (var i = matched.length - 1; i >= 0; i--) {
        names.push(matched[i]);
    }
    return names;
}
/**
 * Functions for get path id in FileManager
 *
 * @param {Element} element - specifies the node element.
 * @param {string} text - specifies the text.
 * @param {boolean} isId - specifies the id.
 * @param {boolean} hasId - checks the id exists.
 * @returns {string[]} returns parent element.
 * @private
 */
export function getParents(element, text, isId, hasId) {
    var matched = [text];
    var el = element.parentNode;
    while (!isNOU(el)) {
        if (matches(el, '.' + CLS.LIST_ITEM)) {
            var parentText = isId ? el.getAttribute('data-uid') : (hasId ? el.getAttribute('data-id') :
                select('.' + CLS.LIST_TEXT, el).textContent);
            matched.push(parentText);
        }
        el = el.parentNode;
        if (el.classList.contains(CLS.TREE_VIEW)) {
            break;
        }
    }
    return matched;
}
/**
 * Functions for generate path
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
export function generatePath(parent) {
    var key = parent.hasId ? 'id' : 'name';
    var newPath = '/';
    var i = 1;
    for (i; i < parent.pathId.length; i++) {
        var data = getValue(parent.pathId[parseInt(i.toString(), 10)], parent.feParent);
        newPath += getValue(key, data) + '/';
    }
    parent.setProperties({ path: newPath }, true);
}
/**
 * Functions for remove active element
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
export function removeActive(parent) {
    if (parent.isCut) {
        removeBlur(parent);
        parent.selectedNodes = [];
        parent.actionRecords = [];
        parent.enablePaste = false;
        parent.notify(events.hidePaste, {});
    }
}
/**
 * Selects active element in File Manager
 *
 * @param {string} action - specifies the action.
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {boolean} - returns active element.
 * @private
 */
export function activeElement(action, parent) {
    parent.isSearchCut = false;
    parent.actionRecords = [];
    parent.activeElements = [];
    parent.notify(events.cutCopyInit, {});
    if (parent.activeElements.length === 0) {
        return false;
    }
    removeBlur(parent);
    var blurEle = parent.activeElements;
    if (parent.activeModule !== 'navigationpane') {
        parent.targetPath = parent.path;
    }
    else {
        parent.targetPath = getParentPath(parent.path);
    }
    var i = 0;
    if (blurEle) {
        getModule(parent, blurEle[0]);
        if (action === 'cut') {
            while (i < blurEle.length) {
                addBlur(blurEle[i]);
                i++;
            }
        }
    }
    i = 0;
    parent.selectedNodes = [];
    parent.enablePaste = true;
    parent.notify(events.showPaste, {});
    while (i < parent.activeRecords.length) {
        parent.actionRecords.push(parent.activeRecords[i]);
        parent.selectedNodes.push(getValue('name', parent.activeRecords[i]));
        i++;
    }
    if ((parent.breadcrumbbarModule.searchObj.element.value !== '' || parent.isFiltered) &&
        parent.activeModule !== 'navigationpane') {
        parent.selectedNodes = [];
        parent.isSearchCut = true;
        var i_1 = 0;
        while (i_1 < parent.selectedItems.length) {
            parent.selectedNodes.push(parent.selectedItems[i_1]);
            i_1++;
        }
    }
    return true;
}
/**
 * Adds blur to the elements
 *
 * @param {Element} nodes - specifies the nodes.
 * @returns {void}
 * @private
 */
export function addBlur(nodes) {
    nodes.classList.add(CLS.BLUR);
}
/**
 * Removes blur from elements
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} hover - specifies the hover string.
 * @returns {void}
 * @private
 */
export function removeBlur(parent, hover) {
    var blurEle = (!hover) ? parent.element.querySelectorAll('.' + CLS.BLUR) :
        parent.element.querySelectorAll('.' + CLS.HOVER);
    var i = 0;
    while (i < blurEle.length) {
        blurEle[i].classList.remove((!hover) ? CLS.BLUR : CLS.HOVER);
        i++;
    }
}
/**
 * Gets module name
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Element} element - specifies the element.
 * @returns {void}
 * @private
 */
export function getModule(parent, element) {
    if (element) {
        if (element.classList.contains(CLS.ROW)) {
            parent.activeModule = 'detailsview';
        }
        else if (closest(element, '.' + CLS.LARGE_ICON)) {
            parent.activeModule = 'largeiconsview';
        }
        else {
            parent.activeModule = 'navigationpane';
        }
    }
}
/**
 * Get all child items
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string | number} parentId - specifies the parent ID.
 * @returns {Object[]} An array of child items
 * @private
 */
export function getAllChildItems(parent, parentId) {
    var children = parent.fileSystemData.filter(function (item) {
        return String(item.parentId) === String(parentId);
    });
    var allChildren = children.slice();
    children.forEach(function (child) {
        var childId = child.id;
        allChildren = allChildren.concat(getAllChildItems(parent, childId));
    });
    return allChildren;
}
/**
 * Gets module name
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} value - specifies the value.
 * @param {boolean} isLayoutChange - specifies the layout change.
 * @returns {void}
 * @private
 */
export function searchWordHandler(parent, value, isLayoutChange) {
    var searchWord;
    if (value.length === 0 && !parent.isFiltered) {
        parent.notify(events.pathColumn, { args: parent });
    }
    if (isFileSystemData(parent)) {
        if (value === '') {
            parent.itemData = parent.fileSystemData;
            read(parent, isLayoutChange ? events.layoutChange : events.search, parent.path);
        }
        else {
            parent.searchSettings.filterType = isNOU(parent.searchSettings.filterType) ? 'contains' : parent.searchSettings.filterType;
            var currData = getValue(parent.pathId[parent.pathId.length - 1], parent.feParent);
            var parentId = getValue('id', currData);
            var filteredData = getAllChildItems(parent, parentId);
            var data = new DataManager(filteredData).
                executeLocal(new Query().where('name', parent.searchSettings.filterType, value, parent.searchSettings.ignoreCase));
            var searchValue = parent.searchSettings.ignoreCase ? value.toLowerCase() : value;
            parent.itemData = data;
            Search(parent, isLayoutChange ? events.layoutChange : events.search, parent.path, searchValue, parent.showHiddenItems, !parent.searchSettings.ignoreCase);
        }
        return;
    }
    if (parent.searchSettings.filterType === 'startsWith') {
        searchWord = value + '*';
    }
    else if (parent.searchSettings.filterType === 'endsWith') {
        searchWord = '*' + value;
    }
    else {
        searchWord = '*' + value + '*';
    }
    parent.searchWord = searchWord;
    parent.itemData = [getPathObject(parent)];
    if (value.length > 0) {
        var caseSensitive = parent.searchSettings.ignoreCase;
        var hiddenItems = parent.showHiddenItems;
        Search(parent, isLayoutChange ? events.layoutChange : events.search, parent.path, searchWord, hiddenItems, !caseSensitive);
    }
    else {
        if (!parent.isFiltered) {
            if (parent.isSortByClicked) {
                parent.notify(events.layoutChange, { files: (parent.oldView === 'Details') ? parent.detailsviewModule.gridObj.dataSource : parent.largeiconsviewModule.allItems });
                parent.isSortByClicked = false;
            }
            else {
                read(parent, isLayoutChange ? events.layoutChange : events.search, parent.path);
            }
        }
        else {
            filter(parent, events.layoutChange);
        }
    }
}
/**
 * Gets updated layout
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} view - specifies the view.
 * @returns {void}
 * @private
 */
export function updateLayout(parent, view) {
    parent.oldView = parent.view;
    parent.setProperties({ view: view }, true);
    if (parent.breadcrumbbarModule.searchObj.element.value !== '' || parent.isFiltered) {
        parent.layoutSelectedItems = parent.selectedItems;
    }
    var searchWord = '';
    if (parent.breadcrumbbarModule.searchObj.element.value) {
        searchWord = parent.breadcrumbbarModule.searchObj.element.value;
    }
    parent.isLayoutChange = true;
    searchWordHandler(parent, searchWord, true);
}
/* istanbul ignore next */
/**
 * Gets updated layout
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Element} element - specifies the element.
 * @returns {void}
 * @private
 */
export function getTargetModule(parent, element) {
    var tartgetModule = '';
    if (element) {
        if (closest(element, '.' + CLS.ROOT + '.' + CLS.CONTROL + ' .' + CLS.GRID_CONTENT)) {
            tartgetModule = 'detailsview';
        }
        else if (closest(element, '.' + CLS.LARGE_ICONS)) {
            tartgetModule = 'largeiconsview';
        }
        else if (element.classList.contains('e-fullrow') ||
            element.classList.contains('e-icon-expandable')) {
            tartgetModule = 'navigationpane';
        }
        else if (closest(element, '.e-address-list-item')) {
            tartgetModule = 'breadcrumbbar';
        }
        else {
            tartgetModule = '';
        }
    }
    parent.targetModule = tartgetModule;
}
/* istanbul ignore next */
/**
 * refresh the layout
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
export function refresh(parent) {
    parent.itemData = [getPathObject(parent)];
    if (!hasReadAccess(parent.itemData[0])) {
        createDeniedDialog(parent, parent.itemData[0], events.permissionRead);
    }
    else {
        read(parent, events.refreshEnd, parent.path);
    }
}
/**
 * open action in the layout
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
export function openAction(parent) {
    read(parent, events.openEnd, parent.path);
}
/**
 * open action in the layout
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {Object} - returns the path data.
 * @private
 */
export function getPathObject(parent) {
    return getValue(parent.pathId[parent.pathId.length - 1], parent.feParent);
}
/**
 * Copy files
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
export function copyFiles(parent) {
    if (!activeElement('copy', parent)) {
        return;
    }
    else {
        parent.fileAction = 'copy';
    }
}
/**
 * Cut files
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
export function cutFiles(parent) {
    if (!activeElement('cut', parent)) {
        return;
    }
    else {
        parent.isCut = true;
        parent.fileAction = 'move';
    }
}
/**
 * To add class for fileType
 *
 * @param {Object} file - specifies the file.
 * @returns {string} - returns the file type.
 * @private
 */
export function fileType(file) {
    var isFile = getValue('isFile', file);
    if (!isFile) {
        return CLS.FOLDER;
    }
    var imageFormat = ['bmp', 'dib', 'jpg', 'jpeg', 'jpe', 'jfif', 'gif', 'tif', 'tiff', 'png', 'ico'];
    var audioFormat = ['mp3', 'wav', 'aac', 'ogg', 'wma', 'aif', 'fla', 'm4a'];
    var videoFormat = ['webm', 'mkv', 'flv', 'vob', 'ogv', 'ogg', 'avi', 'wmv', 'mp4', '3gp'];
    var knownFormat = ['css', 'exe', 'html', 'js', 'msi', 'pdf', 'pptx', 'ppt', 'rar', 'zip', 'txt', 'docx', 'doc',
        'xlsx', 'xls', 'xml', 'rtf', 'php'];
    var filetype = getValue('type', file);
    filetype = filetype.toLowerCase();
    if (filetype.indexOf('.') !== -1) {
        filetype = filetype.split('.').join('');
    }
    var iconType;
    if (imageFormat.indexOf(filetype) !== -1) {
        iconType = CLS.ICON_IMAGE;
    }
    else if (audioFormat.indexOf(filetype) !== -1) {
        iconType = CLS.ICON_MUSIC;
    }
    else if (videoFormat.indexOf(filetype) !== -1) {
        iconType = CLS.ICON_VIDEO;
    }
    else if (knownFormat.indexOf(filetype) !== -1) {
        iconType = 'e-fe-' + filetype;
    }
    else {
        iconType = 'e-fe-unknown e-fe-' + filetype;
    }
    return iconType;
}
/* istanbul ignore next */
/**
 * To get the image URL
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} item - specifies the item.
 * @returns {string} - returns the image url.
 * @private
 */
export function getImageUrl(parent, item) {
    var imgUrl = isFileSystemData(parent) ? getValue('imageUrl', item) : '';
    if (isFileSystemData(parent)) {
        var eventArgs_1 = {
            fileDetails: [item],
            imageUrl: imgUrl
        };
        parent.trigger('beforeImageLoad', eventArgs_1);
        return eventArgs_1.imageUrl;
    }
    var baseUrl = parent.ajaxSettings.getImageUrl ? parent.ajaxSettings.getImageUrl : parent.ajaxSettings.url;
    var pathUrl = (baseUrl.indexOf('?') !== -1) ? '&path=' : '?path=';
    var fileName = encodeURIComponent(getValue('name', item));
    var fPath = getValue('filterPath', item);
    if (parent.hasId) {
        var imgId = getValue('id', item);
        imgUrl = baseUrl + pathUrl + parent.path + '&id=' + imgId;
    }
    else if (!isNOU(fPath)) {
        imgUrl = baseUrl + pathUrl + encodeURIComponent(fPath.replace(/\\/g, '/')) + fileName;
    }
    else {
        imgUrl = baseUrl + pathUrl + parent.path + fileName;
    }
    imgUrl = imgUrl + '&time=' + (new Date().getTime()).toString();
    var eventArgs = {
        fileDetails: [item],
        imageUrl: imgUrl
    };
    parent.trigger('beforeImageLoad', eventArgs);
    return eventArgs.imageUrl;
}
/* istanbul ignore next */
/**
 * Gets the full path
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {string} path - specifies the path.
 * @returns {string} - returns the image url.
 * @private
 */
export function getFullPath(parent, data, path) {
    var filePath = getValue(parent.hasId ? 'id' : 'name', data) + '/';
    var fPath = getValue(parent.hasId ? 'filterId' : 'filterPath', data);
    if (!isNOU(fPath)) {
        return fPath.replace(/\\/g, '/').replace(/^.*?(?=\/)/, '') + filePath;
    }
    else {
        return path + filePath;
    }
}
/**
 * Gets the name
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @returns {string} - returns the name.
 * @private
 */
export function getName(parent, data) {
    var name = getValue('name', data);
    var fPath = getValue('filterPath', data);
    if ((parent.breadcrumbbarModule.searchObj.element.value !== '' || parent.isFiltered) && !isNOU(fPath)) {
        fPath = fPath.replace(/\\/g, '/');
        name = fPath.replace(parent.path, '') + name;
    }
    return name;
}
/**
 * Gets the name
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object[]} items - specifies the item elements.
 * @returns {Object[]} - returns the sorted data.
 * @private
 */
export function getSortedData(parent, items) {
    if (items.length === 0) {
        return items;
    }
    var query;
    if (parent.sortOrder !== 'None' && !isNullOrUndefined(parent.sortOrder)) {
        query = new Query().sortBy(parent.sortBy, parent.sortOrder.toLowerCase(), true).group('isFile');
    }
    else {
        query = new Query().group('isFile');
    }
    var lists = new DataManager(items).executeLocal(query);
    return getValue('records', lists);
}
/**
 * Gets the data object
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} key - specifies the key.
 * @param {string} value - specifies the value.
 * @returns {Object} - returns the sorted data.
 * @private
 */
export function getObject(parent, key, value) {
    var currFiles = getValue(parent.pathId[parent.pathId.length - 1], parent.feFiles);
    var result = currFiles.filter(function (data) { return data[key].toString() === value; });
    return result.length > 0 ? result[0] : null;
}
/**
 * Creates empty element
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {HTMLElement} element - specifies the element.
 * @param {ReadArgs | SearchArgs} args - specifies the args.
 * @returns {void}
 * @private
 */
export function createEmptyElement(parent, element, args) {
    var top;
    var layoutElement = select('#' + parent.element.id + CLS.LAYOUT_ID, parent.element);
    var addressBarHeight = select('#' + parent.element.id + CLS.BREADCRUMBBAR_ID, layoutElement).offsetHeight;
    top = layoutElement.offsetHeight - addressBarHeight;
    if (parent.view === 'Details') {
        top = top - select('.' + CLS.GRID_HEADER, layoutElement).offsetHeight;
    }
    if (isNOU(element.querySelector('.' + CLS.EMPTY))) {
        var emptyDiv = createElement('div', { className: CLS.EMPTY });
        var emptyFolder = createElement('div', { className: CLS.LARGE_EMPTY_FOLDER });
        var emptyEle = createElement('div', { className: CLS.EMPTY_CONTENT });
        var dragFile = createElement('div', { className: CLS.EMPTY_INNER_CONTENT });
        if (parent.view === 'Details') {
            element.querySelector('.' + CLS.GRID_VIEW).appendChild(emptyDiv);
        }
        else {
            element.appendChild(emptyDiv);
        }
        emptyDiv.appendChild(emptyFolder);
        emptyDiv.appendChild(emptyEle);
        emptyDiv.appendChild(dragFile);
    }
    if (element.querySelector('.' + CLS.EMPTY)) {
        if (!isNOU(args.error)) {
            element.querySelector('.' + CLS.EMPTY_CONTENT).innerHTML = getLocaleText(parent, 'Access-Denied');
            element.querySelector('.' + CLS.EMPTY_INNER_CONTENT).innerHTML = getLocaleText(parent, 'Access-Details');
        }
        else if (parent.isFiltered) {
            element.querySelector('.' + CLS.EMPTY_CONTENT).innerHTML = getLocaleText(parent, 'Filter-Empty');
            element.querySelector('.' + CLS.EMPTY_INNER_CONTENT).innerHTML = getLocaleText(parent, 'Filter-Key');
        }
        else if (parent.breadcrumbbarModule.searchObj.element.value !== '') {
            element.querySelector('.' + CLS.EMPTY_CONTENT).innerHTML = getLocaleText(parent, 'Search-Empty');
            element.querySelector('.' + CLS.EMPTY_INNER_CONTENT).innerHTML = getLocaleText(parent, 'Search-Key');
        }
        else {
            element.querySelector('.' + CLS.EMPTY_CONTENT).innerHTML = getLocaleText(parent, 'Folder-Empty');
            element.querySelector('.' + CLS.EMPTY_INNER_CONTENT).innerHTML = getLocaleText(parent, 'File-Upload');
        }
    }
    var eDiv = select('.' + CLS.EMPTY, element);
    top = (top - eDiv.offsetHeight) / 2;
    eDiv.style.marginTop = top + 'px';
}
/**
 * Gets the directories
 *
 * @param {Object[]} files - specifies the file object.
 * @returns {Object[]} - returns the sorted data.
 * @private
 */
export function getDirectories(files) {
    return new DataManager(files).executeLocal(new Query().where(events.isFile, 'equal', false, false));
}
/**
 * set the Node ID
 *
 * @param {ReadArgs} result - specifies the result.
 * @param {string} rootId - specifies the rootId.
 * @returns {void}
 * @private
 */
export function setNodeId(result, rootId) {
    var dirs = getDirectories(result.files);
    for (var i = 0, len = dirs.length; i < len; i++) {
        setValue('_fm_id', rootId + '_' + i, dirs[i]);
    }
}
/**
 * set the date object
 *
 * @param {Object[]} args - specifies the file object.
 * @returns {void}
 * @private
 */
export function setDateObject(args) {
    for (var i = 0; i < args.length; i++) {
        var createdDate = new Date(getValue('dateCreated', args[i]));
        var modifiedDate = new Date(getValue('dateModified', args[i]));
        setValue('_fm_created', createdDate, args[i]);
        setValue('_fm_modified', modifiedDate, args[i]);
    }
}
/**
 * get the locale text
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} text - specifies the text.
 * @returns {string} - returns the locale text.
 * @private
 */
export function getLocaleText(parent, text) {
    var locale = parent.localeObj.getConstant(text);
    return (locale === '') ? text : locale;
}
/**
 * get the CSS class
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} css - specifies the css.
 * @returns {string} - returns the css classes.
 * @private
 */
export function getCssClass(parent, css) {
    var cssClass = parent.cssClass;
    cssClass = (isNOU(cssClass) || cssClass === '') ? css : (cssClass + ' ' + css);
    return cssClass;
}
/**
 * sort on click
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {MenuEventArgs} args - specifies the menu event arguements.
 * @returns {void}
 * @private
 */
export function sortbyClickHandler(parent, args) {
    var tick;
    parent.isSortByClicked = true;
    if (args.item.id.indexOf('ascending') !== -1 || args.item.id.indexOf('descending') !== -1 || args.item.id.indexOf('none') !== -1) {
        tick = true;
    }
    else {
        tick = false;
    }
    if (!tick) {
        parent.sortBy = getSortField(args.item.id, parent);
    }
    else {
        parent.sortOrder = getSortField(args.item.id);
    }
    parent.itemData = [getPathObject(parent)];
    if (parent.view === 'Details') {
        if (parent.isMobile) {
            updateLayout(parent, 'Details');
        }
        else {
            parent.notify(events.sortColumn, { module: 'detailsview' });
            parent.isSortByClicked = false;
        }
    }
    if (parent.view === 'LargeIcons') {
        updateLayout(parent, 'LargeIcons');
    }
    parent.notify(events.sortByChange, {});
}
/**
 * Gets the sorted fields
 *
 * @param {string} id - specifies the id.
 * @param {IFileManager} [parent] - optional parameter representing the parent IFileManager.
 * @returns {string} - returns the sorted fields
 * @private
 */
export function getSortField(id, parent) {
    var text = id.substring(id.lastIndexOf('_') + 1);
    var field = text;
    var column;
    if (parent) {
        column = parent.detailsViewSettings.columns;
    }
    switch (text) {
        case 'date':
            for (var i = 0, len = column.length; i < len; i++) {
                if (column[i].field === 'dateModified' || column[i].field === 'dateCreated') {
                    field = column[i].field;
                    break;
                }
                else {
                    field = '_fm_modified';
                }
            }
            break;
        case 'ascending':
            field = 'Ascending';
            break;
        case 'descending':
            field = 'Descending';
            break;
        case 'none':
            field = 'None';
            break;
    }
    return field;
}
/**
 * Sets the next path
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} path - specifies the path.
 * @returns {void}
 * @private
 */
export function setNextPath(parent, path) {
    var currfolders = path.split('/');
    var folders = parent.originalPath.split('/');
    var root = getValue(parent.pathId[0], parent.feParent);
    var key = isNOU(getValue('id', root)) ? 'name' : 'id';
    for (var i = currfolders.length - 1, len = folders.length - 1; i < len; i++) {
        var eventName = (folders[i + 1] === '') ? events.finalizeEnd : events.initialEnd;
        var newPath = (folders[i] === '') ? '/' : (parent.path + folders[i] + '/');
        var data = getObject(parent, key, folders[parseInt(i.toString(), 10)]);
        if (!isNullOrUndefined(data)) {
            var id = getValue('_fm_id', data);
            parent.setProperties({ path: newPath }, true);
            parent.pathId.push(id);
            parent.itemData = [data];
            parent.pathNames.push(getValue('name', data));
        }
        else {
            parent.originalPath = newPath;
        }
        read(parent, eventName, parent.path);
        break;
    }
}
/**
 * Opens the searched folder
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data
 * @returns {void}
 * @private
 */
export function openSearchFolder(parent, data) {
    parent.originalPath = getFullPath(parent, data, parent.path);
    var root = getValue(parent.pathId[0], parent.feParent);
    var navData = parent.feParent[getValue('_fm_id', parent.itemData[0])];
    var isRoot = isNullOrUndefined(navData) || getValue('_fm_id', navData) === 'fe_tree';
    var key = isNOU(getValue('id', root)) ? 'name' : 'id';
    var searchData = getObject(parent, key, isFileSystemData(parent) ? getValue('id', data) : getValue('name', data));
    if (isNullOrUndefined(searchData)) {
        if (!isRoot) {
            parent.notify(events.clearPathInit, { selectedNode: parent.pathId[parent.pathId.length - 1] });
        }
        else {
            setNextPath(parent, parent.path);
            return;
        }
    }
    else {
        var id = getValue('_fm_id', searchData);
        parent.setProperties({ path: parent.originalPath }, true);
        parent.pathId.push(id);
        parent.itemData = [searchData];
        parent.pathNames.push(getValue('name', searchData));
    }
    read(parent, (parent.path !== parent.originalPath) ? events.initialEnd : events.finalizeEnd, parent.path);
}
/**
 * Paste handling function
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
export function pasteHandler(parent) {
    parent.isDragDrop = false;
    if (parent.selectedNodes.length !== 0 && parent.enablePaste) {
        var path = (parent.folderPath === '') ? parent.path : parent.folderPath;
        if (parent.activeModule === 'navigationpane' && !parent.selectedNodes[0].includes('/')) {
            parent.targetPath = getTargetPath(parent, parent.actionRecords[0]);
        }
        var subFolder = validateSubFolder(parent, parent.actionRecords, path, parent.path);
        if (!subFolder) {
            if ((parent.fileAction === 'move' && parent.targetPath !== path) || parent.fileAction === 'copy') {
                parent.notify(events.pasteInit, {});
                paste(parent, parent.targetPath, parent.selectedNodes, path, parent.fileAction, [], parent.actionRecords);
            }
            else {
                parent.enablePaste = false;
                parent.notify(events.hidePaste, {});
                removeBlur(parent);
                var result = {
                    files: null,
                    error: {
                        code: '402',
                        message: getLocaleText(parent, 'Same-Folder-Error'),
                        fileExists: null
                    }
                };
                createDialog(parent, 'Error', result);
            }
        }
    }
}
/**
 * Validates the sub folders
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {'{ [key: string]: Object; }[]'} data - specifies the data.
 * @param {string} dropPath - specifies the drop path.
 * @param {string} dragPath - specifies the drag path.
 * @returns {boolean} - returns the validated sub folder.
 * @private
 */
export function validateSubFolder(parent, data, dropPath, dragPath) {
    var subFolder = false;
    for (var i = 0; i < data.length; i++) {
        if (!getValue('isFile', data[i])) {
            var tempTarget = getFullPath(parent, data[i], dragPath);
            if (dropPath.indexOf(tempTarget) === 0) {
                var result = {
                    files: null,
                    error: {
                        code: '402',
                        message: getLocaleText(parent, 'Sub-Folder-Error'),
                        fileExists: null
                    }
                };
                createDialog(parent, 'Error', result);
                subFolder = true;
                break;
            }
        }
        else {
            var name_1 = parent.dragData[i] ? parent.dragData[i].name : null;
            var srcData = isFileSystemData(parent) ? name_1 : parent.dragNodes[i];
            var len = 0;
            if (srcData) {
                len = srcData.lastIndexOf('/');
            }
            var path = '';
            if (len > 0) {
                path = dragPath + srcData.substring(0, len + 1);
            }
            if (path === dropPath) {
                var result = {
                    files: null,
                    error: {
                        code: '402',
                        message: getLocaleText(parent, 'Same-Folder-Error'),
                        fileExists: null
                    }
                };
                createDialog(parent, 'Error', result);
                subFolder = true;
                break;
            }
        }
    }
    return subFolder;
}
/**
 * Validates the drop handler
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {void}
 * @private
 */
export function dropHandler(parent) {
    parent.isDragDrop = true;
    if (parent.dragData.length !== 0) {
        parent.dragPath = parent.dragPath.replace(/\\/g, '/');
        parent.dropPath = parent.dropPath.replace(/\\/g, '/');
        var subFolder = validateSubFolder(parent, parent.dragData, parent.dropPath, parent.dragPath);
        if (!subFolder && (parent.dragPath !== parent.dropPath)) {
            parent.itemData = [parent.dropData];
            paste(parent, parent.dragPath, parent.dragNodes, parent.dropPath, 'move', [], parent.dragData);
            parent.notify(events.pasteInit, {});
        }
    }
}
/**
 * Gets the parent path
 *
 * @param {string} oldPath - specifies the old path.
 * @returns {string} - returns the parent path.
 * @private
 */
export function getParentPath(oldPath) {
    var path = oldPath.split('/');
    var newPath = path[0] + '/';
    for (var i = 1; i < path.length - 2; i++) {
        newPath += path[i] + '/';
    }
    return newPath;
}
/**
 * Gets the directory path
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {ReadArgs} args - returns the read arguements.
 * @returns {string} - returns the directory path
 * @private
 */
export function getDirectoryPath(parent, args) {
    var filePath = getValue(parent.hasId ? 'id' : 'name', args.cwd) + '/';
    var fPath = getValue(parent.hasId && !isNullOrUndefined(parent.ajaxSettings.url) ? 'filterId' : 'filterPath', args.cwd);
    if (!isNOU(fPath)) {
        if (fPath === '') {
            return '/';
        }
        return fPath.replace(/\\/g, '/').replace(/^.*?(?=\/)/, '') + filePath;
    }
    else {
        return isFileSystemData(parent) ? filePath : parent.path + filePath;
    }
}
/**
 * Gets the do paste path
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {string} operation - specifies the operations.
 * @param {ReadArgs} result - returns the result.
 * @returns {void}
 * @private
 */
export function doPasteUpdate(parent, operation, result) {
    if (operation === 'move') {
        if (!parent.isDragDrop) {
            parent.enablePaste = false;
            parent.notify(events.hidePaste, {});
            parent.notify(events.cutEnd, result);
        }
        else {
            parent.notify(events.dragEnd, result);
        }
    }
    if (parent.duplicateItems.length === 0) {
        parent.pasteNodes = [];
    }
    var flag = false;
    for (var count = 0; (count < result.files.length) && !flag; count++) {
        parent.pasteNodes.push(result.files[count][parent.hasId ? 'id' : 'name']);
        if (parent.isDragDrop) {
            parent.droppedObjects.push(result.files[count]);
        }
    }
    parent.duplicateItems = [];
    parent.duplicateRecords = [];
    if (parent.isDragDrop && !parent.isPasteError) {
        parent.isDropEnd = true;
    }
    else {
        parent.isDropEnd = false;
    }
    parent.trigger('success', { action: operation, result: result });
    if (!parent.isDragDrop || (parent.path === parent.dragPath) || (parent.path === parent.dropPath)
        || parent.isSearchDrag) {
        parent.isPathDrag = false;
        read(parent, events.pasteEnd, parent.path);
    }
    else {
        readDropPath(parent);
    }
}
/**
 * Reads the drop path
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
export function readDropPath(parent) {
    var pathId = getValue('_fm_id', parent.dropData);
    parent.expandedId = pathId;
    parent.itemData = [parent.dropData];
    if (parent.isPathDrag) {
        parent.notify(events.pathDrag, parent.itemData);
    }
    else {
        if (parent.navigationpaneModule) {
            var node = select('[data-uid="' + pathId + '"]', parent.navigationpaneModule.treeObj.element);
            if (!node) {
                var liElement = document.querySelector('[data-id = "' + getValue('id', parent.dropData) + '"]');
                pathId = liElement.getAttribute('data-uid');
                node = select('[data-uid="' + pathId + '"]', parent.navigationpaneModule.treeObj.element);
            }
            updatePath(node, parent.dropData, parent);
        }
        read(parent, events.dropPath, parent.dropPath);
    }
}
/**
 * Gets the duplicated path
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {string} name - specifies the name.
 * @returns {object} - returns the duplicated path.
 * @private
 */
export function getDuplicateData(parent, name) {
    var data = null;
    var records = parent.isDragDrop ? parent.dragData : parent.actionRecords;
    for (var i = 0; i < records.length; i++) {
        if (getValue('name', records[i]) === name) {
            data = records[i];
            break;
        }
    }
    return data;
}
/**
 * Gets the create the virtual drag element
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
export function createVirtualDragElement(parent) {
    parent.isSearchDrag = false;
    if (parent.breadcrumbbarModule.searchObj.element.value !== '') {
        parent.isSearchDrag = true;
    }
    if (parent.activeModule !== 'navigationpane') {
        parent.dragNodes = [];
        var i = 0;
        while (i < parent.selectedItems.length) {
            parent.dragNodes.push(parent.selectedItems[i]);
            i++;
        }
        if (parent.selectedItems.length === 0 && parent.dragData && parent.dragData.length === 1) {
            parent.dragNodes.push(getItemName(parent, parent.dragData[0]));
        }
    }
    var cloneIcon = parent.createElement('div', {
        className: 'e-fe-icon ' + fileType(parent.dragData[0])
    });
    var cloneName = parent.createElement('div', {
        className: 'e-fe-name',
        innerHTML: parent.dragData[0].name
    });
    var virtualEle = parent.createElement('div', {
        className: 'e-fe-content'
    });
    virtualEle.appendChild(cloneIcon);
    virtualEle.appendChild(cloneName);
    var ele = parent.createElement('div', {
        className: CLS.CLONE
    });
    ele.appendChild(virtualEle);
    if (parent.dragNodes.length > 1) {
        var badge = parent.createElement('span', {
            className: 'e-fe-count',
            innerHTML: (parent.dragNodes.length).toString(10)
        });
        ele.appendChild(badge);
    }
    parent.virtualDragElement = ele;
    parent.element.appendChild(parent.virtualDragElement);
}
/**
 * Drops the stop handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {DragEventArgs} args - specifies the drag event arguements.
 * @returns {void}
 * @private
 */
export function dragStopHandler(parent, args) {
    var dragArgs = args;
    dragArgs.cancel = false;
    if (parent.treeExpandTimer != null) {
        window.clearTimeout(parent.treeExpandTimer);
        parent.treeExpandTimer = null;
    }
    removeDropTarget(parent);
    parent.element.classList.remove('e-fe-drop', 'e-no-drop');
    removeBlur(parent);
    parent.uploadObj.dropArea = select('#' + parent.element.id + CLS.CONTENT_ID, parent.element);
    var virtualEle = select('.' + CLS.CLONE, parent.element);
    if (virtualEle) {
        detach(virtualEle);
    }
    getTargetModule(parent, args.target);
    parent.notify(events.dropInit, args);
    removeBlur(parent, 'hover');
    dragArgs.fileDetails = parent.dragData;
    parent.trigger('fileDragStop', dragArgs, function (dragArgs) {
        if (!dragArgs.cancel && !isNOU(parent.targetModule) && parent.targetModule !== '' && parent.dragCount > 2) {
            dropHandler(parent);
        }
        parent.dragCount = 0;
    });
}
/**
 * Drag the start handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {'DragEventArgs'} args - specifies the drag event arguements.
 * @param {Draggable} dragObj - specifies the drag event arguements.
 * @returns {void}
 * @private
 */
export function dragStartHandler(parent, args, dragObj) {
    var dragArgs = args;
    dragArgs.cancel = false;
    dragArgs.fileDetails = parent.dragData;
    parent.dragCount = 0;
    parent.droppedObjects = [];
    if (!parent.allowDragAndDrop || ((parent.activeModule === 'navigationpane') &&
        (closest(args.element, 'li').getAttribute('data-uid') === parent.pathId[0]))) {
        dragArgs.cancel = true;
    }
    if ((parent.activeModule === 'navigationpane') &&
        (parent.pathId.indexOf(closest(args.element, 'li').getAttribute('data-uid')) !== -1)) {
        parent.isPathDrag = true;
    }
    else {
        parent.isPathDrag = false;
    }
    removeBlur(parent);
    if (dragArgs.cancel) {
        dragObj.intDestroy(args.event);
        dragCancel(parent);
    }
    else if (!dragArgs.cancel) {
        var i = 0;
        while (i < parent.activeElements.length) {
            addBlur(parent.activeElements[i]);
            i++;
        }
        parent.trigger('fileDragStart', dragArgs, function (dragArgs) {
            if (dragArgs.cancel) {
                dragObj.intDestroy(args.event);
                dragCancel(parent);
            }
            else {
                parent.uploadObj.dropArea = null;
            }
        });
    }
}
/**
 * Drag the cancel handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
export function dragCancel(parent) {
    removeBlur(parent);
    var virtualEle = select('.' + CLS.CLONE, parent.element);
    if (virtualEle) {
        detach(virtualEle);
    }
}
/**
 * Remove drop target handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
export function removeDropTarget(parent) {
    removeItemClass(parent, CLS.DROP_FOLDER);
    removeItemClass(parent, CLS.DROP_FILE);
}
/**
 * Remove item class handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {string} value - specifies the value.
 * @returns {void}
 * @private
 */
export function removeItemClass(parent, value) {
    var ele = parent.element.querySelectorAll('.' + value);
    for (var i = 0; i < ele.length; i++) {
        ele[i].classList.remove(value);
    }
}
/**
 * Remove item class handler
 *
 * @param {Element} scrollParent - specifies the scrolling target.
 * @param {IFileManager} parent - specifies the parent.
 * @param {string} nodeClass - specifies the node class.
 * @param {number} clientY - specifies the vertical (Y) coordinate of the mouse cursor position relative to the target element.
 * @returns {void}
 * @private
 */
export function scrollHandler(scrollParent, parent, nodeClass, clientY) {
    var position;
    var elementData = scrollParent.getBoundingClientRect();
    var node = select('.' + nodeClass, scrollParent);
    if ((clientY >= (elementData.top + scrollParent.clientHeight - 30)) && !isNullOrUndefined(node)) {
        position = (parent.targetModule === 'navigationpane' || parent.targetModule === 'detailsview') ? node.offsetHeight / 2.5 : node.offsetHeight / 4.5;
        scrollParent.scrollBy(0, position);
    }
    if (!isNullOrUndefined(node) && (clientY <= (elementData.top + 30))) {
        position = (parent.targetModule === 'navigationpane' || parent.targetModule === 'detailsview') ? node.offsetHeight / 2.5 : node.offsetHeight / 4.5;
        scrollParent.scrollBy(0, -position);
    }
}
/**
 * Dragging handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {DragEventArgs} args - specifies the arguements.
 * @returns {void}
 * @private
 */
export function draggingHandler(parent, args) {
    var dragArgs = args;
    dragArgs.fileDetails = parent.dragData;
    var canDrop = false;
    getTargetModule(parent, args.target);
    removeDropTarget(parent);
    if (parent.treeExpandTimer != null) {
        window.clearTimeout(parent.treeExpandTimer);
        parent.treeExpandTimer = null;
    }
    removeBlur(parent, 'hover');
    var node = null;
    var scrollParent;
    if (parent.targetModule === 'navigationpane') {
        node = closest(args.target, 'li');
        node.classList.add(CLS.HOVER, CLS.DROP_FOLDER);
        canDrop = true;
        /* istanbul ignore next */
        parent.treeExpandTimer = window.setTimeout(function () { parent.notify(events.dragging, args); }, 800);
        scrollParent = parent.navigationpaneModule.treeObj.element.parentElement;
        scrollHandler(scrollParent, parent, 'e-level-2', args.event.y);
    }
    else if (parent.targetModule === 'detailsview') {
        node = closest(args.target, 'tr');
        if (node && node.querySelector('.' + CLS.FOLDER) && !node.classList.contains(CLS.BLUR)) {
            node.classList.add(CLS.DROP_FOLDER);
        }
        else if (node && !node.querySelector('.' + CLS.FOLDER) && !node.classList.contains(CLS.BLUR)) {
            node.classList.add(CLS.DROP_FILE);
        }
        canDrop = true;
        scrollParent = parent.detailsviewModule.gridObj.element.querySelector('.e-content');
        scrollHandler(scrollParent, parent, 'e-row', args.event.y);
    }
    else if (parent.targetModule === 'largeiconsview') {
        node = closest(args.target, 'li');
        if (node && node.querySelector('.' + CLS.FOLDER) && !node.classList.contains(CLS.BLUR)) {
            node.classList.add(CLS.HOVER, CLS.DROP_FOLDER);
        }
        canDrop = true;
        scrollParent = parent.largeiconsviewModule.element.firstElementChild;
        scrollHandler(scrollParent, parent, 'e-large-icon', args.event.y);
        /* istanbul ignore next */
    }
    else if (parent.targetModule === 'breadcrumbbar') {
        canDrop = true;
    }
    parent.element.classList.remove('e-fe-drop', 'e-no-drop');
    parent.element.classList.add(canDrop ? 'e-fe-drop' : 'e-no-drop');
    parent.dragCount = parent.dragCount + 1;
    parent.trigger('fileDragging', dragArgs);
}
/**
 * Object to string handler
 *
 * @param {Object} data - specifies the data.
 * @returns {string} returns string converted from Object.
 * @private
 */
// Ignored the message key value in permission object
export function objectToString(data) {
    var str = '';
    var keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] !== 'message') {
            str += (i === 0 ? '' : ', ') + keys[i] + ': ' + getValue(keys[i], data);
        }
    }
    return str;
}
/**
 * Get item name handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {Object} data - specifies the data.
 * @returns {string} returns the item name.
 * @private
 */
export function getItemName(parent, data) {
    if (parent.hasId) {
        return getValue('id', data);
    }
    return getName(parent, data);
}
/**
 * Get item name handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {Object} data - specifies the data.
 * @returns {void}
 * @private
 */
export function updateRenamingData(parent, data) {
    parent.itemData = [data];
    parent.currentItemText = getValue('name', data);
    parent.isFile = getValue('isFile', data);
    parent.filterPath = getValue('filterPath', data);
}
/**
 * Get item name handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
export function doRename(parent) {
    if (!hasEditAccess(parent.itemData[0])) {
        createDeniedDialog(parent, parent.itemData[0], events.permissionEdit);
    }
    else {
        createDialog(parent, 'Rename');
    }
}
/* istanbul ignore next */
/**
 * Download handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
export function doDownload(parent) {
    var items = parent.itemData;
    for (var i = 0; i < items.length; i++) {
        if (!hasDownloadAccess(items[i])) {
            createDeniedDialog(parent, items[i], events.permissionDownload);
            return;
        }
    }
    if (parent.selectedItems.length > 0) {
        Download(parent, parent.path, parent.selectedItems);
    }
}
/**
 * Delete Files handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {Object[]} data - specifies the data.
 * @param {string[]} newIds - specifies the new Ids.
 * @returns {void}
 * @private
 */
export function doDeleteFiles(parent, data, newIds) {
    for (var i = 0; i < data.length; i++) {
        if (!hasEditAccess(data[i])) {
            createDeniedDialog(parent, data[i], events.permissionEdit);
            return;
        }
    }
    parent.itemData = data;
    Delete(parent, newIds, parent.path, 'delete');
}
/* istanbul ignore next */
/**
 * Download files handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {Object[]} data - specifies the data.
 * @param {string[]} newIds - specifies the new Ids.
 * @returns {void}
 * @private
 */
export function doDownloadFiles(parent, data, newIds) {
    for (var i = 0; i < data.length; i++) {
        if (!hasDownloadAccess(data[i])) {
            createDeniedDialog(parent, data[i], events.permissionDownload);
            return;
        }
    }
    parent.itemData = data;
    if (newIds.length > 0) {
        Download(parent, parent.path, newIds);
    }
}
/**
 * Download files handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {Object} data - specifies the data.
 * @param {string} action - specifies the actions.
 * @returns {void}
 * @private
 */
export function createDeniedDialog(parent, data, action) {
    var message = getValue('message', getValue('permission', data));
    if (message === '') {
        message = getLocaleText(parent, 'Access-Message').replace('{0}', getValue('name', data)).replace('{1}', action);
    }
    var response = {
        error: {
            code: '401',
            fileExists: null,
            message: message
        }
    };
    createDialog(parent, 'Error', response);
}
/**
 * Get Access Classes
 *
 * @param {Object} data - specifies the data.
 * @returns {string} - returns accesses classes.
 * @private
 */
export function getAccessClass(data) {
    return !hasReadAccess(data) ? 'e-fe-locked e-fe-hidden' : 'e-fe-locked';
}
/**
 * Check read access handler
 *
 * @param {Object} data - specifies the data.
 * @returns {boolean} - returns read access.
 * @private
 */
export function hasReadAccess(data) {
    var permission = getValue('permission', data);
    return (permission && !getValue('read', permission)) ? false : true;
}
/**
 * Check edit access handler
 *
 * @param {Object} data - specifies the data.
 * @returns {boolean} - returns edit access.
 * @private
 */
export function hasEditAccess(data) {
    var permission = getValue('permission', data);
    return permission ? ((getValue('read', permission) && getValue('write', permission))) : true;
}
/**
 * Check content access handler
 *
 * @param {Object} data - specifies the data.
 * @returns {boolean} - returns content access.
 * @private
 */
export function hasContentAccess(data) {
    var permission = getValue('permission', data);
    return permission ? ((getValue('read', permission) && getValue('writeContents', permission))) : true;
}
/**
 * Check upload access handler
 *
 * @param {Object} data - specifies the data.
 * @returns {boolean} - returns upload access.
 * @private
 */
export function hasUploadAccess(data) {
    var permission = getValue('permission', data);
    return permission ? ((getValue('read', permission) && getValue('upload', permission))) : true;
}
/**
 * Check download access handler
 *
 * @param {Object} data - specifies the data.
 * @returns {boolean} - returns download access.
 * @private
 */
export function hasDownloadAccess(data) {
    var permission = getValue('permission', data);
    return permission ? ((getValue('read', permission) && getValue('download', permission))) : true;
}
/**
 * Create new folder handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
export function createNewFolder(parent) {
    var details = parent.itemData[0];
    if (!hasContentAccess(details)) {
        createDeniedDialog(parent, details, events.permissionEditContents);
    }
    else {
        createDialog(parent, 'NewFolder');
    }
}
/**
 * Upload item handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
export function uploadItem(parent) {
    var details = parent.itemData[0];
    if (!hasUploadAccess(details)) {
        createDeniedDialog(parent, details, events.permissionUpload);
    }
    else {
        var eleId = '#' + parent.element.id + CLS.UPLOAD_ID;
        var uploadEle = document.querySelector(eleId);
        uploadEle.click();
    }
}
/**
 * Close dialog popup handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @returns {void}
 * @private
 */
export function closePopup(parent) {
    if (!isNullOrUndefined(parent.dialogObj)) {
        parent.dialogObj.hide();
    }
}
/**
 * Get target path from item data.
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {Object} itemData - specifies the item elements.
 * @returns {string} returns the path.
 * @private
 */
export function getTargetPath(parent, itemData) {
    if (parent.hasId && !isNOU(getValue('filterId', itemData))) {
        return getValue('filterId', itemData).replace(/\\/g, '/').replace(/^[^/]+\//, '/');
    }
    else {
        return getValue('filterPath', itemData).replace(/\\/g, '/');
    }
}
/**
 * Access control handler
 *
 * @param {IFileManager} parent - specifies the parent.
 * @param {Object[]} itemData - specifies the item elements.
 * @param {string} action - specifies the action.
 * @param {boolean} isPathPermision - specifies the path permission.
 * @returns {string} returns the path.
 * @private
 */
export function getAccessDetails(parent, itemData, action, isPathPermision) {
    var accessMessage = '';
    for (var i = 0; i < itemData.length; i++) {
        var permission = getValue('permission', itemData[i]);
        if (permission == null) {
            permission = undefined;
        }
        if (isPathPermision) {
            if (permission && (!getValue('read', permission) || !getValue('writeContents', permission))) {
                accessMessage = getValue('message', getValue('permission', itemData[i]));
                if (accessMessage === '') {
                    accessMessage = getLocaleText(parent, 'Access-Message').replace('{0}', getValue('name', itemData[i])).replace('{1}', 'writeContents');
                }
            }
        }
        else {
            var copyOrMovePermission = action === 'copy' ? getValue('copy', permission) : getValue('write', permission);
            if (permission && (!getValue('read', permission) || !copyOrMovePermission)) {
                accessMessage = getValue('message', getValue('permission', itemData[i]));
                if (accessMessage === '') {
                    accessMessage = getLocaleText(parent, 'Access-Message').replace('{0}', getValue('name', itemData[i])).replace('{1}', action);
                }
            }
        }
        if (accessMessage !== '') {
            parent.responseData = {
                cwd: null,
                details: null,
                error: {
                    code: '401',
                    message: accessMessage,
                    fileExists: null
                },
                files: null
            };
            break;
        }
    }
    return accessMessage;
}
