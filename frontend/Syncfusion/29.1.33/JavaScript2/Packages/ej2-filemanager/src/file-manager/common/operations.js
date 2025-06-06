import { Ajax, Fetch, createElement, select, extend } from '@syncfusion/ej2-base';
import { isNullOrUndefined as isNOU, setValue, getValue } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { createDialog, createExtDialog } from '../pop-up/dialog';
import { fileType, setNodeId, getLocaleText, setDateObject, doPasteUpdate, getPathObject } from '../common/utility';
import { generatePath, getAccessDetails, getTargetPath } from '../common/utility';
import { getUid } from '@syncfusion/ej2-grids';
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Function to read the content from given path in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} event - specifies the event.
 * @param {string} path - specifies the path.
 * @returns {void}
 * @private
 */
export function read(parent, event, path) {
    var itemData = parent.itemData;
    for (var i = 0; i < itemData.length; i++) {
        if (isNOU(getValue('hasChild', itemData[i]))) {
            setValue('hasChild', false, itemData[i]);
        }
    }
    var data = { action: 'read', path: path, showHiddenItems: parent.showHiddenItems, data: itemData };
    createAjax(parent, data, readSuccess, event);
}
/**
 * Function to create new folder in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} itemName - specifies the item name.
 * @returns {void}
 * @private
 */
export function createFolder(parent, itemName) {
    var data = { action: 'create', path: parent.path, name: itemName, data: parent.itemData };
    createAjax(parent, data, createSuccess, itemName);
}
/**
 * Function to filter the files in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string}  event - specifies the event.
 * @returns {void}
 * @private
 */
export function filter(parent, event) {
    var data = { action: 'filter', path: parent.path, showHiddenItems: parent.showHiddenItems, data: [getPathObject(parent)] };
    var filterData;
    var filterDataVal = parent.filterData ? extend(filterData, data, parent.filterData) : data;
    createAjax(parent, filterDataVal, filterSuccess, event, getValue('action', filterDataVal));
}
/**
 * Function to rename the folder/file in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} path - specifies the path.
 * @param {string} itemNewName - specifies the item's new name.
 * @returns {void}
 * @private
 */
export function rename(parent, path, itemNewName) {
    var name;
    var newName;
    if (parent.breadcrumbbarModule.searchObj.element.value === '' && !parent.isFiltered) {
        name = parent.currentItemText;
        newName = itemNewName;
    }
    else {
        var fPath = parent.filterPath;
        if (parent.hasId) {
            name = parent.currentItemText;
            newName = itemNewName;
        }
        else {
            fPath = fPath.replace(/\\/g, '/');
            name = fPath.replace(path, '') + parent.currentItemText;
            newName = fPath.replace(path, '') + itemNewName;
        }
    }
    var data = {
        action: 'rename', path: path, name: name, newName: newName, data: parent.itemData, showFileExtension: parent.showFileExtension
    };
    createAjax(parent, data, renameSuccess, path);
}
/**
 * Function to paste file's and folder's in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} path - specifies the path.
 * @param {string[]} names - specifies the names.
 * @param {string} targetPath - specifies the target path.
 * @param {string} pasteOperation - specifies the paste operation.
 * @param {string[]} renameItems - specifies the rename items.
 * @param {Object[]} actionRecords - specifies the action records.
 * @returns {void}
 * @private
 */
export function paste(parent, path, names, targetPath, pasteOperation, renameItems, actionRecords) {
    var data = {
        action: pasteOperation, path: path, targetData: parent.itemData[0],
        targetPath: targetPath, names: names, renameFiles: renameItems, data: actionRecords
    };
    parent.destinationPath = targetPath;
    createAjax(parent, data, pasteSuccess, path, pasteOperation, targetPath);
}
/**
 * Function to delete file's and folder's in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string[]} items - specifies the items.
 * @param {string} path - specifies the path.
 * @param {string} operation - specifies the operation.
 * @returns {void}
 * @private
 */
export function Delete(parent, items, path, operation) {
    var data = { action: operation, path: path, names: items, data: parent.itemData };
    createAjax(parent, data, deleteSuccess, path);
}
/* istanbul ignore next */
/**
 * Function to get details of file's and folder's in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string[]} names - specifies the names.
 * @param {string} path - specifies the path.
 * @param {string} operation - specifies the operation data.
 * @returns {void}
 * @private
 */
export function GetDetails(parent, names, path, operation) {
    var data = { action: operation, path: path, names: names, data: parent.itemData };
    createAjax(parent, data, detailsSuccess, path, operation);
}
/**
 * Checks whether fileSystemData is enabled.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @returns {boolean} - returns the boolean value.
 */
export function isFileSystemData(parent) {
    var isFileSystemData = parent.fileSystemData.length >= 0 && isNOU(parent.ajaxSettings.url);
    return isFileSystemData;
}
/**
 * Function to check whether file already exist or not.
 *
 * @param {Record<string, any>} fileSystemData - specifies the file data.
 * @param {string} name - specifies the name.
 * @returns {boolean} - returns the boolean value.
 * @private
 */
function isFileExists(fileSystemData, name) {
    var isExists = fileSystemData.some(function (item) { return item.name === name; });
    return isExists;
}
/**
 * Function to find the index value of a file or folder.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {number} id - specifies the id.
 * @returns {number} - returns the index value.
 * @private
 */
function findIndexById(parent, id) {
    var index = parent.fileSystemData.findIndex(function (item) {
        return !isNOU(item) && String(item.id) === String(id);
    });
    return index;
}
/**
 * Function to get the entire data of a file or folder using id value.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {number | string} id - specifies the id.
 * @returns {Object} - returns the data.
 * @private
 */
function filterById(parent, id) {
    var data = parent.fileSystemData.filter(function (item) { return String(item.id) === String(id); })[0];
    return data;
}
/**
 * Function to get the entire data of a file or folder for a parent.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {number | string} parentId - specifies the parent id.
 * @returns {Object[]} - returns the data.
 * @private
 */
function filterByParent(parent, parentId) {
    var data = parent.fileSystemData.filter(function (item) { return String(item.parentId) === String(parentId); });
    return data;
}
/**
 * Function to create a new copied file or folder.
 *
 * @param {Record<string, any>} data - specifies the file or folder data.
 * @param {Record<string, any>} target - specifies the target data.
 * @param {string} itemName - specifies the item name.
 * @param {boolean} isCopy - specifies the copy operation.
 * @returns {Record<string, Object>} - returns the data.
 * @private
 */
function createNewItem(data, target, itemName, isCopy) {
    var newItem = {};
    //Construct the new folder details.
    for (var key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            newItem[key] = null;
        }
    }
    var currentDate = new Date();
    var folderPath = String(target.id) !== String(0) && !isNOU(target.parentId) ? target.filterPath + target.name + '\\' : '\\';
    Object.assign(newItem, {
        dateCreated: currentDate,
        dateModified: currentDate,
        filterPath: folderPath,
        hasChild: isCopy ? data.hasChild : false,
        id: getUid(itemName === null ? data.name : itemName),
        isFile: isCopy ? data.isFile : false,
        name: itemName === null ? data.name : itemName,
        parentId: target.id,
        size: isCopy ? data.size : 0,
        type: isCopy ? data.type : ''
    });
    return newItem;
}
/**
 * Function to create an error response.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} message - specifies the error message.
 * @param {string} code - specifies the error code.
 * @param {Object[]} fileName - specifies the file name.
 * @returns {void}
 * @private
 */
function createErrorObject(parent, message, code, fileName) {
    parent.responseData = {
        cwd: null,
        details: null,
        error: {
            code: code,
            message: message,
            fileExists: fileName != null ? fileName : null
        },
        files: null
    };
}
/**
 * Function to trigger folder creation.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {BeforeSendEventArgs} eventArgs - specifies the eventArgs.
 * @returns {void}
 * @private
 */
function triggerFolderCreation(parent, data, eventArgs) {
    var createEventArgs = {
        folderName: getValue('name', data),
        cancel: false,
        path: getValue('path', data),
        parentFolder: getValue('data', data)
    };
    parent.trigger('beforeFolderCreate', createEventArgs, function (args) {
        if (args.cancel) {
            eventArgs.cancel = true;
            return;
        }
        if (isFileSystemData(parent)) {
            if (!isFileExists(parent.fileSystemData, args.folderName)) {
                var data_1 = args.parentFolder[0];
                var newObject = createNewItem(data_1, data_1, args.folderName, false);
                parent.fileSystemData.push(newObject);
            }
            else {
                var message = 'A file or folder with the name ' + args.folderName + ' already exists.';
                createErrorObject(parent, message, '400', null);
            }
        }
    });
}
/**
 * Function to trigger delete operation.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {BeforeSendEventArgs} eventArgs - specifies the eventArgs.
 * @returns {void}
 * @private
 */
function triggerDeleteOperation(parent, data, eventArgs) {
    var deleteEventArgs = {
        cancel: false,
        itemData: getValue('data', data),
        path: getValue('path', data)
    };
    parent.trigger('beforeDelete', deleteEventArgs, function (args) {
        if (args.cancel) {
            eventArgs.cancel = true;
            return;
        }
        if (isFileSystemData(parent)) {
            args.itemData.forEach(function (itemData) {
                var index = findIndexById(parent, itemData.id);
                if (index !== -1) {
                    parent.fileSystemData.splice(index, 1);
                }
                if (!itemData.isFile) {
                    var subItems = parent.fileSystemData.filter(function (obj) { return obj.filterPath.includes(itemData.name); });
                    subItems.forEach(function (subItem) {
                        var index = findIndexById(parent, subItem.id);
                        if (index !== -1) {
                            parent.fileSystemData.splice(index, 1);
                        }
                    });
                }
            });
        }
    });
}
/**
 * Function to trigger rename operation.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {BeforeSendEventArgs} eventArgs - specifies the eventArgs.
 * @returns {void}
 * @private
 */
function triggerRenameOperation(parent, data, eventArgs) {
    var renameEventArgs = {
        cancel: false,
        newName: getValue('newName', data),
        itemData: getValue('data', data),
        path: getValue('path', data)
    };
    parent.trigger('beforeRename', renameEventArgs, function (args) {
        if (args.cancel) {
            eventArgs.cancel = true;
            return;
        }
        if (isFileSystemData(parent)) {
            if (!isFileExists(parent.fileSystemData, args.newName)) {
                var fileData = filterById(parent, args.itemData[0].id);
                var oldName = fileData.name;
                fileData.name = args.newName;
                updateChildrenFilterPath(parent, fileData.id, oldName, args.newName);
            }
            else {
                var message = 'Cannot rename' + args.itemData[0].name + 'to' + args.newName + ': destination already exists.';
                createErrorObject(parent, message, '400', null);
            }
        }
    });
}
/**
 * Function to update child item filter path.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string | number} parentId - specifies the parent id.
 * @param {string} oldName - specifies the previous name.
 * @param {string} newName - specifies the new name.
 * @returns {void}
 * @private
 */
function updateChildrenFilterPath(parent, parentId, oldName, newName) {
    parent.fileSystemData.forEach(function (item) {
        if (String(item.parentId) === String(parentId)) {
            var oldPath = item.filterPath;
            var newPath = oldPath.replace(oldName + '\\', newName + '\\');
            item.filterPath = newPath;
            updateChildrenFilterPath(parent, item.id, oldName, newName);
        }
    });
}
/**
 * Function to trigger move or copy operation.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {BeforeSendEventArgs} eventArgs - specifies the eventArgs.
 * @returns {void}
 * @private
 */
function triggerMoveOrCopyOperation(parent, data, eventArgs) {
    var moveEventArgs = {
        cancel: false,
        itemData: getValue('data', data),
        isCopy: getValue('action', data) === 'copy' ? true : false,
        path: getValue('path', data),
        targetData: getValue('targetData', data),
        targetPath: getValue('targetPath', data)
    };
    parent.trigger('beforeMove', moveEventArgs, function (args) {
        if (args.cancel) {
            eventArgs.cancel = true;
            return;
        }
        if (isFileSystemData(parent)) {
            var message = 'File Already Exists';
            var action = getValue('action', data);
            var itemPermission = getAccessDetails(parent, args.itemData, action, false);
            var pathPermission = getAccessDetails(parent, [args.targetData], action, true);
            var file_1 = [];
            parent.pasteNodes = [];
            if (itemPermission === '' && pathPermission === '') {
                if (args.isCopy) {
                    var folderSubItems_1 = filterByParent(parent, args.targetData.id);
                    var copiedFolders = args.itemData;
                    copiedFolders.forEach(function (itemData) {
                        if (!isFileExists(folderSubItems_1, itemData.name) || getValue('renameFiles', data).length > 0) {
                            if (getValue('renameFiles', data).length > 0) {
                                var names = itemData.name.split('.');
                                var name_1 = itemData.name.includes('.') ? names[0] + '(' + parent.existingFileCount + ').' + names[1] : names[0] + '(' + parent.existingFileCount + ')';
                                copyFolderItems(parent, itemData, args.targetData, name_1);
                                parent.responseData.error = null;
                                parent.existingFileCount++;
                                return;
                            }
                            copyFolderItems(parent, itemData, args.targetData, null);
                        }
                        else {
                            file_1.push(itemData.name);
                        }
                    });
                    if (file_1.length > 0) {
                        createErrorObject(parent, message, '400', file_1);
                    }
                    return;
                }
                var target_1 = args.targetData;
                var getTargetFiles = filterByParent(parent, target_1.id);
                for (var i = 0; i < args.itemData.length; i++) {
                    var currItem = args.itemData[i];
                    if (!isFileExists(getTargetFiles, currItem.name) || getValue('renameFiles', data).length > 0) {
                        if (!target_1.hasChild) {
                            target_1.hasChild = !currItem.isFile;
                            var targetItem = parent.fileSystemData
                                .filter(function (item) { return String(item.id) === String(target_1.id); });
                            if (targetItem.length > 0) {
                                targetItem[0].hasChild = target_1.hasChild;
                            }
                        }
                        if (!currItem.isFile) {
                            //Check whether the source folder include other sub folders or not.
                            var subItems = currItem.parentId !== 0
                                ? filterByParent(parent, currItem.parentId) : [];
                            var itemData = filterById(parent, currItem.parentId);
                            itemData.hasChild = subItems.length > 1 ? true : false;
                        }
                        var fileData = filterById(parent, currItem.id);
                        if (getValue('renameFiles', data).length > 0) {
                            var names = currItem.name.split('.');
                            currItem.name = currItem.name.includes('.') ? names[0] + '(' + parent.existingFileCount + ').' + names[1] : names[0] + '(' + parent.existingFileCount + ')';
                            fileData.name = currItem.name;
                            parent.responseData.error = null;
                            parent.existingFileCount++;
                            parent.dropData = target_1;
                            parent.dropPath = args.path;
                            var pathArray = args.targetPath.replace(/^\/|\/$/g, '').split('/');
                            target_1 = filterById(parent, pathArray[pathArray.length - 1]);
                        }
                        fileData.parentId = target_1.id;
                        fileData.filterPath = target_1.id === 0 ? '\\' : target_1.filterPath + target_1.name + '\\';
                    }
                    else {
                        file_1.push(currItem.name);
                    }
                }
                if (file_1.length > 0) {
                    createErrorObject(parent, message, '400', file_1);
                }
            }
        }
    });
}
/**
 * Function to trigger search operation.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {BeforeSendEventArgs} eventArgs - specifies the eventArgs.
 * @returns {void}
 * @private
 */
function triggerSearchOperation(parent, data, eventArgs) {
    var searchEventArgs = {
        searchResults: getValue('data', data),
        cancel: false,
        path: getValue('path', data),
        searchText: getValue('searchString', data),
        caseSensitive: getValue('caseSensitive', data),
        showHiddenItems: getValue('showHiddenItems', data)
    };
    parent.trigger('search', searchEventArgs, function (args) {
        setValue('data', args.searchResults, data);
        if (args.cancel) {
            eventArgs.cancel = true;
        }
    });
}
/**
 * Function to trigger client side events.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {BeforeSendEventArgs} eventArgs - specifies the eventArgs.
 * @returns {void}
 * @private
 */
function triggerClientEvents(parent, data, eventArgs) {
    switch (getValue('action', data)) {
        case 'create': {
            triggerFolderCreation(parent, data, eventArgs);
            break;
        }
        case 'delete': {
            triggerDeleteOperation(parent, data, eventArgs);
            break;
        }
        case 'rename': {
            triggerRenameOperation(parent, data, eventArgs);
            break;
        }
        case 'move':
        case 'copy': {
            triggerMoveOrCopyOperation(parent, data, eventArgs);
            break;
        }
        case 'search': {
            triggerSearchOperation(parent, data, eventArgs);
            break;
        }
    }
}
/**
 * Creates an AJAX request for the file manager.
 *
 * @param {IFileManager} parent - The parent file manager instance.
 * @param {Object} data - The data object for the AJAX request.
 * @param {Function} fn - The callback function to be executed after the AJAX request.
 * @param {string} [event] - The event type for the AJAX request.
 * @param {string} [operation] - The operation type for the AJAX request.
 * @param {string} [targetPath] - The target path for the AJAX request.
 * @returns {void}
 * @private
 */
function createAjax(parent, data, fn, event, operation, targetPath) {
    var ajaxSettings = {
        url: parent.ajaxSettings.url,
        type: 'POST',
        mode: true,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        onSuccess: null,
        onFailure: null,
        beforeSend: null
    };
    var eventArgs = { action: getValue('action', data), ajaxSettings: ajaxSettings, cancel: false };
    triggerClientEvents(parent, data, eventArgs);
    parent.trigger('beforeSend', eventArgs, function (beforeSendArgs) {
        if (!beforeSendArgs.cancel) {
            parent.notify(events.beforeRequest, {});
            if (isFileSystemData(parent)) {
                var filePath = event === 'node-expand' || event === 'finalize-end' || event === 'rename-end-parent'
                    ? getValue('path', data) : parent.path;
                var pathArray = filePath.replace(/^\/|\/$/g, '').split('/');
                var idValue = event === 'rename-end-parent' || (event === 'path-changed' && getValue('data', data).length !== 0 && isNOU(parent.renamedItem))
                    ? getValue('data', data)[0].id : pathArray[pathArray.length - 1];
                var action = getValue('action', data);
                var isFileOperation = (action === 'move' || action === 'rename' || action === 'copy' || action === 'delete' || action === 'search') && event !== 'rename-end';
                if (action === 'read' || action === 'create' || event === 'rename-end') {
                    var rootId = parent.fileSystemData
                        .filter(function (item) { return isNOU(item.parentId); })
                        .length > 0
                        ? parent.fileSystemData
                            .filter(function (item) { return isNOU(item.parentId); })[0].id
                        : 0;
                    parent.responseData = {
                        cwd: filterById(parent, parent.path === '/' && event !== 'node-expand' && event !== 'rename-end-parent' ? rootId : idValue),
                        details: null,
                        error: null,
                        files: filterByParent(parent, parent.path === '/' && event !== 'node-expand' && event !== 'rename-end-parent' ? rootId : idValue)
                    };
                    if (isNOU(parent.responseData.cwd)) {
                        var message = 'Cannot load empty data within the File Manager.';
                        createErrorObject(parent, message, '400', null);
                    }
                }
                else if (isFileOperation && parent.responseData.error === null) {
                    var itemData = action === 'search' || action === 'delete' ? getValue('data', data) : [];
                    if (itemData.length === 0) {
                        if (action === 'copy') {
                            itemData = parent.pasteNodes.map(function (item) { return filterById(parent, item); });
                        }
                        else {
                            itemData = getValue('data', data).map(function (item) { return filterById(parent, item.id); });
                        }
                    }
                    parent.responseData = {
                        cwd: null,
                        details: null,
                        error: null,
                        files: itemData
                    };
                }
                else if (getValue('action', data) === 'details') {
                    var itemData = getValue('data', data);
                    var details = itemData[0];
                    var isMultipleFiles = itemData.length > 1;
                    var itemNames = itemData.map(function (item) { return item.name; });
                    var totalSize = isMultipleFiles ? getSize(itemData.reduce(function (accumulator, currentObject) { return accumulator + (currentObject.size || 0); }, 0)) : getSize(details.size);
                    var path = (parent.pathNames.includes(details.name) || isMultipleFiles ? parent.pathNames.join('/') : parent.pathNames.join('/') + '/' + details.name);
                    parent.responseData.details = Object.assign({
                        location: path,
                        multipleFiles: isMultipleFiles,
                        name: itemNames.join(', '),
                        size: totalSize
                    }, isMultipleFiles ? {} : {
                        created: details.dateCreated,
                        isFile: details.isFile,
                        modified: details.dateModified,
                        permission: details.permission
                    });
                }
                performReadOperation(parent, parent.responseData, fn, data, event, operation, targetPath, beforeSendArgs);
                return;
            }
            var ajax = new Ajax({
                url: getValue('url', beforeSendArgs.ajaxSettings),
                type: getValue('type', beforeSendArgs.ajaxSettings),
                mode: getValue('mode', beforeSendArgs.ajaxSettings),
                dataType: getValue('dataType', beforeSendArgs.ajaxSettings),
                contentType: getValue('contentType', beforeSendArgs.ajaxSettings),
                data: getValue('data', beforeSendArgs.ajaxSettings),
                beforeSend: getValue('beforeSend', beforeSendArgs.ajaxSettings),
                onSuccess: function (result) {
                    if (isNOU(result)) {
                        var result_1 = {
                            error: {
                                fileExists: null,
                                message: getLocaleText(parent, 'Server-Error') + ' ' + parent.ajaxSettings.url,
                                code: '406'
                            },
                            files: null
                        };
                        triggerAjaxFailure(parent, beforeSendArgs, fn, result_1, event, operation, targetPath);
                        return;
                    }
                    if (typeof (result) === 'string') {
                        result = JSON.parse(result);
                    }
                    performReadOperation(parent, result, fn, data, event, operation, targetPath, beforeSendArgs);
                },
                onFailure: function () {
                    var result = {
                        files: null,
                        error: {
                            code: '404',
                            message: getLocaleText(parent, 'Network-Error') + ' ' + parent.ajaxSettings.url,
                            fileExists: null
                        }
                    };
                    triggerAjaxFailure(parent, beforeSendArgs, fn, result, event, operation, targetPath);
                }
            });
            ajax.send();
        }
    });
}
/**
 * Function to get file size.
 *
 * @param {number} size - specifies the size.
 * @returns {string} - returns the size.
 * @private
 */
function getSize(size) {
    var hz;
    if (size < 1024) {
        hz = size + ' B';
    }
    else if (size < 1024 * 1024) {
        hz = (size / 1024).toFixed(2) + ' KB';
    }
    else if (size < 1024 * 1024 * 1024) {
        hz = (size / 1024 / 1024).toFixed(2) + ' MB';
    }
    else {
        hz = (size / 1024 / 1024 / 1024).toFixed(2) + ' GB';
    }
    return hz;
}
/**
 * Function to perform read operation.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {Function} fn - specifies the function.
 * @param {Object} data - specifies the data.
 * @param {string} event - specifies the event.
 * @param {string} operation - specifies the operation.
 * @param {string} targetPath - specifies the targetPath.
 * @param {BeforeSendEventArgs} beforeSendArgs - specifies the eventArgs.
 * @returns {void}
 * @private
 */
function performReadOperation(parent, result, fn, data, event, operation, targetPath, beforeSendArgs) {
    parent.notify(events.afterRequest, { action: 'success' });
    var id = parent.expandedId ? parent.expandedId : parent.pathId[parent.pathId.length - 1];
    if (!isNOU(result.cwd) && (getValue('action', data) === 'read')) {
        result.cwd.name = (parent.pathId.length === 1) ? (parent.rootAliasName || result.cwd.name) : result.cwd.name;
        setValue('_fm_id', id, result.cwd);
        setValue(id, result.cwd, parent.feParent);
        if (!isNOU(result.files) || result.error.code === '401') {
            if ((event === 'finalize-end' || event === 'initial-end') && parent.pathNames.length === 0) {
                var root = getValue(parent.pathId[0], parent.feParent);
                parent.pathNames[0] = getValue('name', root);
                parent.hasId = !isNOU(getValue('id', root));
            }
            if (event === 'finalize-end') {
                generatePath(parent);
            }
        }
    }
    if (!isNOU(result.files)) {
        setDateObject(result.files);
        for (var i = 0, len = result.files.length; i < len; i++) {
            var item = result.files[i];
            setValue('_fm_iconClass', fileType(item), item);
        }
        if (getValue('action', data) === 'read') {
            setNodeId(result, id);
            setValue(id, result.files, parent.feFiles);
        }
    }
    if (!isNOU(result.details) && !isNOU(parent.rootAliasName)) {
        var rootName = parent.rootAliasName || getValue('name', result.details);
        var location_1 = getValue('location', result.details).replace(new RegExp('/', 'g'), '\\');
        if ((getValue('path', data) === '/') || (parent.hasId && getValue('path', data).match(/[/]/g).length === 1)) {
            if (getValue('names', data).length === 0) {
                setValue('name', rootName, result.details);
            }
            if (location_1.indexOf('\\') === -1) {
                location_1 = rootName;
            }
            else {
                location_1 = location_1.replace(location_1.substring(0, location_1.indexOf('\\')), rootName);
            }
        }
        else {
            location_1 = location_1.replace(location_1.substring(0, location_1.indexOf('\\')), rootName);
        }
        setValue('location', location_1, result.details);
    }
    fn(parent, result, event, operation, targetPath);
    if (!isNOU(result.files) && (event === 'path-changed' || event === 'finalize-end' || event === 'open-end' || event === 'drop-path')) {
        parent.notify(events.searchTextChange, result);
    }
    if (typeof getValue('onSuccess', beforeSendArgs.ajaxSettings) === 'function') {
        getValue('onSuccess', beforeSendArgs.ajaxSettings)();
    }
}
/**
 * Function to copy operation.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {Object} data - specifies the data.
 * @param {string} target - specifies the target.
 * @param {string} itemName - specifies the item name.
 * @returns {void}
 * @private
 */
function copyFolderItems(parent, data, target, itemName) {
    var newObject = createNewItem(data, target, itemName, true);
    parent.fileSystemData.push(newObject);
    parent.pasteNodes.push(newObject.id);
    var copiedItems = filterByParent(parent, data.id);
    for (var i = 0; i < copiedItems.length; i++) {
        copyFolderItems(parent, copiedItems[i], newObject, null);
    }
}
/**
 * Function for trigger Ajax failure in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {BeforeSendEventArgs} beforeSendArgs - specifies the beforeSendArgs.
 * @param {Function} fn - specifies the function.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} event - specifies the event.
 * @param {string} operation - specifies the operation.
 * @param {string} targetPath - specifies the targetPath.
 * @returns {void}
 * @private
 */
function triggerAjaxFailure(parent, beforeSendArgs, fn, result, event, operation, targetPath) {
    parent.notify(events.afterRequest, { action: 'failure' });
    fn(parent, result, event, operation, targetPath);
    if (typeof getValue('onFailure', beforeSendArgs.ajaxSettings) === 'function') {
        getValue('onFailure', beforeSendArgs.ajaxSettings)();
    }
}
/**
 * Function for read success in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} event - specifies the event.
 * @returns {void}
 * @private
 */
function readSuccess(parent, result, event) {
    try {
        if (!isNOU(result.files)) {
            parent.notify(event, result);
            parent.notify(events.selectionChanged, {});
            var args = { action: 'read', result: result };
            parent.trigger('success', args);
        }
        else {
            if (!isNOU(result.error) && result.error.code === '401') {
                result.files = [];
                parent.notify(event, result);
                parent.notify(events.selectionChanged, {});
            }
            onFailure(parent, result, 'read');
            parent.setProperties({ path: parent.oldPath }, true);
            parent.pathNames.pop();
        }
    }
    catch (error) {
        handleCatchError(parent, error, 'read');
        parent.setProperties({ path: parent.oldPath }, true);
        parent.pathNames.pop();
    }
    if (parent.isDragDrop && parent.isDropEnd) {
        if (parent.droppedObjects.length !== 0) {
            var args = { fileDetails: parent.droppedObjects };
            parent.trigger('fileDropped', args);
        }
        parent.isDropEnd = parent.isDragDrop = false;
    }
}
/**
 * Function for filter success in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} event - specifies the event.
 * @param {string} action - specifies the action.
 * @returns {void}
 * @private
 */
function filterSuccess(parent, result, event, action) {
    try {
        if (!isNOU(result.files)) {
            parent.notify(event, result);
            var args = { action: action, result: result };
            parent.trigger('success', args);
        }
        else {
            onFailure(parent, result, action);
        }
    }
    catch (error) {
        handleCatchError(parent, error, action);
    }
}
/* istanbul ignore next */
/**
 * Function for create success in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} itemName - specifies the item name.
 * @returns {void}
 * @private
 */
function createSuccess(parent, result, itemName) {
    try {
        if (!isNOU(result.files)) {
            if (parent.dialogObj && parent.dialogObj.visible) {
                parent.dialogObj.hide();
            }
            parent.createdItem = isFileSystemData(parent) ? result.files[result.files.length - 1] : result.files[0];
            parent.breadcrumbbarModule.searchObj.value = '';
            var createEventArgs = {
                folderName: itemName,
                path: parent.path,
                parentFolder: parent.itemData
            };
            parent.trigger('folderCreate', createEventArgs);
            var args = { action: 'create', result: result };
            parent.trigger('success', args);
            parent.itemData = [getPathObject(parent)];
            read(parent, events.createEnd, parent.path);
        }
        else {
            if (result.error.code === '400') {
                if (parent.dialogObj && parent.dialogObj.visible) {
                    var ele = select('#newname', parent.dialogObj.element);
                    var error = getLocaleText(parent, 'Validation-NewFolder-Exists').replace('{0}', '"' + ele.value + '"');
                    ele.parentElement.nextElementSibling.innerHTML = error;
                }
                else {
                    var result_2 = {
                        files: null,
                        error: {
                            code: '400',
                            message: getLocaleText(parent, 'Validation-NewFolder-Exists').replace('{0}', '"' + itemName + '"'),
                            fileExists: null
                        }
                    };
                    createDialog(parent, 'Error', result_2);
                }
                var args = { action: 'create', error: result.error };
                parent.trigger('failure', args);
            }
            else {
                if (parent.dialogObj && parent.dialogObj.visible) {
                    parent.dialogObj.hide();
                }
                onFailure(parent, result, 'create');
            }
        }
    }
    catch (error) {
        if (parent.dialogObj && parent.dialogObj.visible) {
            parent.dialogObj.hide();
        }
        handleCatchError(parent, error, 'create');
    }
}
/* istanbul ignore next */
/**
 * Function to rename the folder/file in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @returns {void}
 * @private
 */
function renameSuccess(parent, result) {
    try {
        if (!isNOU(result.files)) {
            if (!isNOU(parent.dialogObj)) {
                parent.dialogObj.hide();
            }
            var args = { action: 'rename', result: result };
            parent.trigger('success', args);
            parent.renamedItem = Array.isArray(result.files) ? result.files[0] : result.files;
            var renameEventArgs = {
                newName: parent.renamedItem.name,
                itemData: [parent.renamedItem],
                path: parent.path
            };
            parent.trigger('rename', renameEventArgs);
            if (parent.activeModule === 'navigationpane') {
                var pathObject = getPathObject(parent);
                var pathLevel = parent.pathId[parent.pathId.length - 1].split('_').length - 2;
                parent.pathId.pop();
                parent.itemData = [getValue(parent.pathId[parent.pathId.length - 1], parent.feParent)];
                var renamePath = getTargetPath(parent, parent.renamedItem);
                read(parent, events.renameEndParent, renamePath);
                if (!isNOU(pathObject) && parent.pathNames.length > 1 && pathLevel <= parent.pathNames.length - 1) {
                    parent.pathNames[pathLevel] = parent.renameText;
                    if (!parent.hasId) {
                        parent.setProperties({ path: "/" + parent.pathNames.slice(1).join('/') + "/" }, true);
                    }
                }
                parent.itemData = parent.navigationpaneModule.previousSelected.length > 0
                    ? parent.navigationpaneModule.treeObj.getTreeData(parent.navigationpaneModule.previousSelected[0]) : parent.itemData;
                read(parent, events.pathChanged, parent.path);
                parent.itemData[0] = parent.renamedItem;
                parent.renamedItem = null;
            }
            else {
                parent.itemData = [getPathObject(parent)];
                if (parent.breadcrumbbarModule.searchObj.value !== '') {
                    Search(parent, events.renameEnd, parent.path, parent.searchWord, parent.showHiddenItems, !parent.searchSettings.ignoreCase);
                }
                else {
                    if (parent.isFiltered) {
                        filter(parent, events.renameEnd);
                    }
                    else {
                        read(parent, events.renameEnd, parent.path);
                    }
                }
            }
        }
        else {
            if (result.error.code === '400' && parent.dialogObj && parent.dialogObj.visible) {
                var ele = select('#rename', parent.dialogObj.element);
                var error = getLocaleText(parent, 'Validation-Rename-Exists').replace('{0}', '"' + parent.currentItemText + '"');
                error = error.replace('{1}', '"' + ele.value + '"');
                ele.parentElement.nextElementSibling.innerHTML = error;
                var args = { action: 'rename', error: result.error };
                parent.trigger('failure', args);
            }
            else {
                if (!isNOU(parent.dialogObj)) {
                    parent.dialogObj.hide();
                }
                onFailure(parent, result, 'rename');
            }
        }
    }
    catch (error) {
        if (!isNOU(parent.dialogObj)) {
            parent.dialogObj.hide();
        }
        handleCatchError(parent, error, 'rename');
    }
}
/* istanbul ignore next */
/**
 * Function to create new folder in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} path - specifies the path.
 * @param {string} operation - specifies the operation.
 * @returns {void}
 * @private
 */
function pasteSuccess(parent, result, path, operation) {
    try {
        var moveorcopyEventArgs = {
            itemData: result.files,
            isCopy: operation === 'copy' ? true : false,
            path: path,
            targetData: parent.itemData[0],
            targetPath: parent.path
        };
        parent.trigger('move', moveorcopyEventArgs);
        if (result.error && result.error.fileExists) {
            parent.fileLength = 0;
            if (!isNOU(result.files)) {
                parent.isPasteError = true;
                doPasteUpdate(parent, operation, result);
            }
            createExtDialog(parent, 'DuplicateItems', result.error.fileExists);
            if (result.error.code === '404') {
                createDialog(parent, 'Error', result);
            }
        }
        else if (!result.error && !isNOU(result.files)) {
            parent.isPasteError = false;
            doPasteUpdate(parent, operation, result);
        }
        else if (result.error && !isNOU(result.files)) {
            parent.isPasteError = true;
            doPasteUpdate(parent, operation, result);
            createDialog(parent, 'Error', result);
        }
        else {
            onFailure(parent, result, operation);
        }
    }
    catch (error) {
        handleCatchError(parent, error, operation);
    }
}
/**
 * Function to delete success in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} path - specifies the path.
 * @returns {void}
 * @private
 */
function deleteSuccess(parent, result, path) {
    try {
        var deleteEventArgs = {
            itemData: result.files,
            path: path
        };
        parent.trigger('delete', deleteEventArgs);
        if (!isNOU(result.files)) {
            parent.setProperties({ path: path }, true);
            parent.itemData = [getPathObject(parent)];
            read(parent, events.deleteEnd, parent.path);
            if (result.error) {
                onFailure(parent, result, 'delete');
            }
            else {
                var args = { action: 'delete', result: result };
                parent.trigger('success', args);
            }
        }
        else {
            onFailure(parent, result, 'delete');
        }
    }
    catch (error) {
        handleCatchError(parent, error, 'delete');
    }
}
/**
 * Function for details success in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} path - specifies the path.
 * @param {string} operation - specifies the operation.
 * @returns {void}
 * @private
 */
function detailsSuccess(
// eslint:disable-next-line
parent, result, path, operation) {
    try {
        if (!isNOU(result.details)) {
            createDialog(parent, operation, null, result.details);
            var args = { action: 'details', result: result };
            parent.trigger('success', args);
        }
        else {
            onFailure(parent, result, 'details');
        }
    }
    catch (error) {
        handleCatchError(parent, error, 'details');
    }
}
/**
 * Function for on failure event in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} action - specifies the action.
 * @returns {void}
 * @private
 */
function onFailure(parent, result, action) {
    createDialog(parent, 'Error', result);
    var args = { action: action, error: result.error };
    parent.trigger('failure', args);
}
/**
 * Function for search in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} event - specifies the event.
 * @param {string} path - specifies the path.
 * @param {string} searchString - specifies the search string.
 * @param {boolean} showHiddenItems - specifies the hidden items.
 * @param {boolean} caseSensitive - specifies the casing of search text.
 * @returns {void}
 * @private
 */
export function Search(parent, event, path, searchString, showHiddenItems, caseSensitive) {
    var data = {
        action: 'search', path: path, searchString: searchString, showHiddenItems: showHiddenItems, caseSensitive: caseSensitive,
        data: parent.itemData
    };
    createAjax(parent, data, searchSuccess, event);
}
/* istanbul ignore next */
/**
 * Function for search success in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {ReadArgs} result - specifies the result.
 * @param {string} event - specifies the event.
 * @returns {void}
 * @private
 */
function searchSuccess(parent, result, event) {
    try {
        if (!isNOU(result.files)) {
            parent.notify(event, result);
            var args = { action: 'search', result: result };
            parent.trigger('success', args);
        }
        else {
            onFailure(parent, result, 'search');
        }
    }
    catch (error) {
        handleCatchError(parent, error, 'search');
    }
}
/* istanbul ignore next */
/**
 * Function for download in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {string} path - specifies the path.
 * @param {string[]} items - specifies the items.
 * @returns {void}
 * @private
 */
export function Download(parent, path, items) {
    var downloadUrl = parent.ajaxSettings.downloadUrl ? parent.ajaxSettings.downloadUrl : parent.ajaxSettings.url;
    var data = { 'action': 'download', 'path': path, 'names': items, 'data': parent.itemData };
    var ajaxSettings = {
        url: downloadUrl,
        type: 'POST',
        contentType: 'application/json',
        responseType: 'blob',
        data: JSON.stringify(data),
        onSuccess: null,
        onFailure: null,
        beforeSend: null
    };
    var eventArgs = { data: data, cancel: false, useFormPost: true, ajaxSettings: ajaxSettings };
    parent.trigger('beforeDownload', eventArgs, function (downloadArgs) {
        if (!downloadArgs.cancel) {
            if (downloadArgs.useFormPost) {
                var form = createElement('form', {
                    id: parent.element.id + '_downloadForm',
                    attrs: { action: downloadUrl, method: 'post', name: 'downloadForm', 'download': '' }
                });
                var input = createElement('input', {
                    id: parent.element.id + '_hiddenForm',
                    attrs: { name: 'downloadInput', value: JSON.stringify(downloadArgs.data), type: 'hidden' }
                });
                form.appendChild(input);
                parent.element.appendChild(form);
                document.forms.namedItem('downloadForm').submit();
                parent.element.removeChild(form);
            }
            else {
                try {
                    var contentDisposition_1;
                    var fileName_1;
                    var fetch_1 = new Fetch({
                        url: getValue('url', downloadArgs.ajaxSettings),
                        type: getValue('type', downloadArgs.ajaxSettings),
                        contentType: getValue('contentType', downloadArgs.ajaxSettings),
                        responseType: getValue('responseType', downloadArgs.ajaxSettings),
                        beforeSend: getValue('beforeSend', downloadArgs.ajaxSettings),
                        onLoad: function (e) {
                            contentDisposition_1 = e.headers.get('Content-Disposition');
                            if (contentDisposition_1) {
                                var filenameMatch = contentDisposition_1.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                                var extractedFilename = filenameMatch && filenameMatch[1];
                                fileName_1 = extractedFilename ? extractedFilename.replace(/['"]/g, '') : fileName_1;
                            }
                            else {
                                fileName_1 = parent.itemData.length > 1 ? 'files.zip' : getValue('isFile', parent.itemData[0]) ? getValue('name', parent.itemData[0]) : getValue('name', parent.itemData[0]) + '.zip';
                            }
                        },
                        onSuccess: function (e) {
                            parent.trigger('success', downloadArgs);
                            var blob = e;
                            var blobUrl = URL.createObjectURL(blob);
                            var link = document.createElement('a');
                            link.href = blobUrl;
                            link.download = fileName_1;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        },
                        onFailure: function (e) {
                            var result = {
                                error: {
                                    code: e.status.toString(),
                                    message: getLocaleText(parent, 'Network-Error') + ' ' + parent.ajaxSettings.downloadUrl
                                }
                            };
                            createDialog(parent, 'Error', result);
                            parent.trigger('failure', downloadArgs);
                        }
                    });
                    fetch_1.send(JSON.stringify(downloadArgs.data));
                }
                catch (error) {
                    handleCatchError(parent, error, 'download');
                }
            }
        }
    });
}
/**
 * Function for on catch handler in File Manager.
 *
 * @param {IFileManager} parent - specifies the parent element.
 * @param {any} error - specifies the catch error.
 * @param {string} action - specifies the action.
 * @returns {void}
 * @private
 */
function handleCatchError(parent, error, action) {
    var errorResult = {
        files: null,
        error: {
            message: error.message,
            fileExists: null
        }
    };
    onFailure(parent, errorResult, action);
}
