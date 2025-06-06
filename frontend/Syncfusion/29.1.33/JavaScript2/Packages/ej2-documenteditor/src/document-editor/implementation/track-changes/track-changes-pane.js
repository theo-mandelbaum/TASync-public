import { createElement, L10n, isNullOrUndefined, select, Browser, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { TextElementBox, ElementBox, ImageElementBox, FieldElementBox, TextFormField, DropDownFormField, ParagraphWidget, HeaderFooterWidget, ChartElementBox } from '../viewer/page';
import { WRowFormat, WCharacterFormat } from '../index';
import { HelperMethods } from '../editor/editor-helper';
import { Dictionary } from '../../base/index';
/**
 * Track changes pane
 */
var TrackChangesPane = /** @class */ (function () {
    function TrackChangesPane(owner, commentReviewPane) {
        this.users = [];
        this.enableButtons = true;
        this.viewTypeitems = [];
        this.sortedRevisions = [];
        this.noChangesVisibleInternal = true;
        this.isTrackingPageBreak = false;
        /***
         * @private
         */
        this.tableRevisions = new Dictionary();
        this.owner = owner;
        this.commentReviewPane = commentReviewPane;
        this.locale = new L10n('documenteditor', this.owner.defaultLocale);
        this.locale.setLocale(this.owner.locale);
        this.selectedUser = this.locale.getConstant('All');
        this.selectedType = this.locale.getConstant('All');
        this.initTrackChangePane();
        this.commentReviewPane.reviewTab.items[1].content = this.trackChangeDiv;
        if (!Browser.isIE) {
            this.commentReviewPane.reviewTab.refresh();
        }
        if (this.owner.enableRtl) {
            this.closeButton = createElement('button', {
                className: 'e-de-close-icon e-btn e-flat e-icon-btn', id: 'close',
                attrs: { type: 'button', style: 'position:absolute;top:6px;left:1px' }
            });
        }
        else {
            this.closeButton = createElement('button', {
                className: 'e-de-close-icon e-btn e-flat e-icon-btn', id: 'close',
                attrs: { type: 'button', style: 'position:absolute;top:6px;right:1px' }
            });
        }
        this.closeButton.title = this.locale.getConstant('Close');
        this.closeButton.setAttribute('aria-label', this.locale.getConstant('Close'));
        var closeSpan = createElement('span', { className: 'e-de-op-close-icon e-de-close-icon e-btn-icon e-icons' });
        this.closeButton.appendChild(closeSpan);
        this.commentReviewPane.reviewTab.element.appendChild(this.closeButton);
        this.closeButton.addEventListener('click', this.commentReviewPane.closePane.bind(this.commentReviewPane));
    }
    Object.defineProperty(TrackChangesPane.prototype, "setNoChangesVisibility", {
        get: function () {
            return this.noChangesVisibleInternal;
        },
        set: function (visible) {
            this.isChangesTabVisible = !visible;
            this.noChangeDivElement.style.display = visible ? 'block' : 'none';
            this.noChangesVisibleInternal = visible;
            this.enableDisableToolbarItem(!visible);
            this.commentReviewPane.reviewTab.hideTab(1, visible);
            this.owner.notify('reviewPane', { changes: !visible, comment: this.commentReviewPane.isCommentTabVisible });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TrackChangesPane.prototype, "currentSelectedRevision", {
        get: function () {
            return this.currentSelectedRevisionInternal;
        },
        set: function (value) {
            var selectedElement = select('.e-de-trckchanges-inner-select', this.changesInfoDiv);
            if (isNullOrUndefined(value)) {
                if (!isNullOrUndefined(selectedElement)) {
                    selectedElement.classList.remove('e-de-trckchanges-inner-select');
                }
            }
            else if (value !== this.currentSelectedRevisionInternal || isNullOrUndefined(selectedElement)) {
                if (selectedElement) {
                    selectedElement.classList.remove('e-de-trckchanges-inner-select');
                }
                if (this.changes.length > 0 && this.changes.containsKey(value)) {
                    var currentChangeView = this.changes.get(value);
                    currentChangeView.singleInnerDiv.classList.add('e-de-trckchanges-inner-select');
                }
            }
            this.currentSelectedRevisionInternal = value;
            selectedElement = select('.e-de-trckchanges-inner-select', this.changesInfoDiv);
            if (!isNullOrUndefined(selectedElement)) {
                selectedElement.parentElement.scrollIntoView({ block: 'nearest' });
            }
        },
        enumerable: true,
        configurable: true
    });
    TrackChangesPane.prototype.initTrackChangePane = function () {
        this.changes = new Dictionary();
        this.renderedChanges = new Dictionary();
        this.trackChangeDiv = createElement('div', { className: 'e-de-tc-pane' });
        this.trackChangeDiv.appendChild(this.initPaneHeader());
        this.changesInfoDiv = createElement('div', { id: 'e-de-tc-pane-revision', styles: 'overflow:auto', className: !this.owner.documentEditorSettings.showHiddenMarks ? 'e-de-tc-hide-para-mark' : '' });
        this.trackChangeDiv.appendChild(this.changesInfoDiv);
        this.noChangeDivElement = createElement('div', { styles: 'display:none;', className: 'e-de-tc-no-chng' });
        this.noChangeDivElement.textContent = this.locale.getConstant('No changes');
        this.changesInfoDiv.appendChild(this.noChangeDivElement);
        this.updateTrackChanges();
    };
    /**
     * @private
     * @returns {void}
     */
    TrackChangesPane.prototype.showHiddenParaMark = function () {
        if (!this.owner.documentEditorSettings.showHiddenMarks) {
            if (!this.changesInfoDiv.classList.contains('e-de-tc-hide-para-mark')) {
                this.changesInfoDiv.classList.add('e-de-tc-hide-para-mark');
            }
        }
        else {
            if (this.changesInfoDiv.classList.contains('e-de-tc-hide-para-mark')) {
                this.changesInfoDiv.classList.remove('e-de-tc-hide-para-mark');
            }
        }
    };
    TrackChangesPane.prototype.initPaneHeader = function () {
        var _this = this;
        this.toolbarElement = createElement('div', { className: 'e-de-track-toolbar' });
        this.toolbar = new Toolbar({
            enableRtl: this.owner.enableRtl,
            items: [
                {
                    text: this.locale.getConstant('User') + ':', cssClass: 'e-de-track-toolbar-overlay', disabled: true
                },
                {
                    template: createElement('div', { id: 'e-de-user-list', attrs: { 'role': 'button' } })
                },
                {
                    type: 'Separator'
                },
                {
                    text: this.locale.getConstant('View') + ':', cssClass: 'e-de-track-toolbar-overlay', disabled: true
                },
                {
                    template: createElement('div', { id: 'e-de-revision-list', attrs: { 'role': 'button' } })
                },
                {
                    prefixIcon: 'e-de-nav-left-arrow e-de-tc-tbr', align: 'Right', cssClass: 'e-de-nvgte-left',
                    tooltipText: this.locale.getConstant('Previous Changes'), click: this.navigatePreviousChanges.bind(this)
                },
                {
                    prefixIcon: 'e-de-nav-right-arrow e-de-tc-tbr', align: 'Right', cssClass: 'e-de-nvgte-right',
                    tooltipText: this.locale.getConstant('Next Changes'), click: this.navigateNextChanges.bind(this)
                },
                {
                    template: createElement('div', { id: 'e-de-menu-option', attrs: { 'role': 'button' } }), align: 'Right', cssClass: 'e-de-tc-tbr',
                    tooltipText: this.locale.getConstant('More Options') + '...'
                }
            ]
        });
        this.toolbar.appendTo(this.toolbarElement);
        var navigateLeftButton = select('.e-de-nvgte-left', this.toolbarElement);
        navigateLeftButton.firstChild.classList.add('e-tc-nvgte');
        var navigateRightButton = select('.e-de-nvgte-right', this.toolbarElement);
        navigateRightButton.firstChild.classList.add('e-tc-nvgte');
        //User list drop down button
        var userButtonEle = select('#e-de-user-list', this.toolbarElement);
        this.userDropDownitems = [{ text: this.locale.getConstant('All') }];
        this.userDropDown = {
            items: this.userDropDownitems,
            cssClass: 'e-de-track-pane-drop-btn e-tc-btn-bg-clr',
            select: this.onUserSelect.bind(this),
            beforeOpen: this.onUserOpen.bind(this),
            beforeItemRender: function (args) {
                _this.beforeDropDownItemRender(args, _this.selectedUser);
            }
        };
        this.userDropDownButton = new DropDownButton(this.userDropDown);
        this.userDropDownButton.appendTo(userButtonEle);
        this.userDropDownButton.content = this.getSpanView(this.userDropDown.items[0].text, 0);
        //Revision view type drop down button
        var viewTypeEle = select('#e-de-revision-list', this.toolbarElement);
        this.viewTypeitems = [{ text: this.locale.getConstant('All') }, { text: this.locale.getConstant('Inserted') }, { text: this.locale.getConstant('Deleted') }];
        this.viewTypeDropDownButton = new DropDownButton({
            items: this.viewTypeitems,
            cssClass: 'e-de-track-pane-drop-btn e-tc-btn-bg-clr',
            select: this.onTypeSelect.bind(this),
            beforeItemRender: function (args) {
                _this.beforeDropDownItemRender(args, _this.selectedType);
            }
        });
        this.viewTypeDropDownButton.content = this.getSpanView(this.viewTypeitems[0].text, 1);
        this.viewTypeDropDownButton.appendTo(viewTypeEle);
        //More menu option drop down button
        this.menuoptionEle = select('#e-de-menu-option', this.toolbarElement);
        var menuOptions = [{ text: this.locale.getConstant('Accept all') }, { text: this.locale.getConstant('Reject all') }];
        var menuDropDown = {
            items: menuOptions,
            select: this.onMenuSelect.bind(this),
            iconCss: 'e-de-menu-icon',
            cssClass: 'e-caret-hide e-tc-btn-bg-clr'
        };
        this.menuDropDownButton = new DropDownButton(menuDropDown);
        this.menuDropDownButton.appendTo(this.menuoptionEle);
        return this.toolbarElement;
    };
    TrackChangesPane.prototype.beforeDropDownItemRender = function (args, content) {
        args.element.innerHTML = '<span></span>' + args.item.text;
        var span = args.element.children[0];
        if (args.item.text === content) {
            span.style.marginRight = '10px';
            span.style.alignSelf = 'center';
            span.setAttribute('class', 'e-de-selected-item e-icons');
        }
        else {
            args.element.children[0].style.marginRight = '25px';
            args.element.children[0].classList.remove('e-de-selected-item');
        }
    };
    TrackChangesPane.prototype.onUserOpen = function (arg) {
        var ele = arg.element;
        ele.style.maxHeight = '200px';
        ele.style.overflowY = 'auto';
    };
    TrackChangesPane.prototype.enableDisableToolbarItem = function (enable) {
        var elements = this.toolbar.element.querySelectorAll('.e-de-tc-tbr');
        if (this.owner && this.owner.viewer) {
            this.toolbar.enableItems(elements[0].parentElement.parentElement, enable);
            this.toolbar.enableItems(elements[1].parentElement.parentElement, enable);
            this.toolbar.enableItems(elements[2], enable);
        }
    };
    TrackChangesPane.prototype.getSpanView = function (value, type) {
        return (type === 0 ? '<span class="e-de-track-span-user">' : '<span class="e-de-track-span-view">') + value + '</span>';
    };
    TrackChangesPane.prototype.onMenuSelect = function (arg) {
        var _this = this;
        var selectedText = arg.item.text;
        if (selectedText.match(this.locale.getConstant('Accept all'))) {
            setTimeout(function () {
                _this.owner.revisionsInternal.handleRevisionCollection(true, _this.sortedRevisions);
            }, 0);
        }
        else if (selectedText.match(this.locale.getConstant('Reject all'))) {
            setTimeout(function () {
                _this.owner.revisionsInternal.handleRevisionCollection(false, _this.sortedRevisions);
                /* eslint-disable */
            }, 0);
        }
        this.updateUsers();
    };
    TrackChangesPane.prototype.onSelection = function (revision) {
        this.currentSelectedRevision = revision;
    };
    TrackChangesPane.prototype.onUserSelect = function (arg) {
        var selectedText = arg.item.text;
        this.selectedUser = selectedText;
        this.userDropDownButton.content = this.getSpanView(selectedText, 0);
        this.sortCollectionToDisplay();
    };
    TrackChangesPane.prototype.onTypeSelect = function (arg) {
        var selectedText = arg.item.text;
        this.selectedType = selectedText;
        this.viewTypeDropDownButton.content = this.getSpanView(selectedText, 1);
        this.sortCollectionToDisplay();
    };
    TrackChangesPane.prototype.updateMenuOptions = function () {
        var revisionType;
        if (this.selectedType !== this.locale.getConstant('All')) {
            revisionType = this.selectedType === this.locale.getConstant('Inserted') ? this.locale.getConstant('Insertion')
                : this.locale.getConstant('Deletion');
        }
        if (this.selectedUser === this.locale.getConstant('All') && this.selectedType === this.locale.getConstant('All')) {
            this.menuDropDownButton.items[0].text = this.locale.getConstant('Accept all') + ' ' + this.locale.getConstant('Changes');
            this.menuDropDownButton.items[1].text = this.locale.getConstant('Reject all') + ' ' + this.locale.getConstant('Changes');
        }
        else if (this.selectedUser === this.locale.getConstant('All') && this.selectedType !== this.locale.getConstant('All')) {
            this.menuDropDownButton.items[0].text = this.locale.getConstant('Accept all') + ' ' + revisionType;
            this.menuDropDownButton.items[1].text = this.locale.getConstant('Reject all') + ' ' + revisionType;
        }
        else if (this.selectedUser !== this.locale.getConstant('All') && this.selectedType === this.locale.getConstant('All')) {
            this.menuDropDownButton.items[0].text = this.locale.getConstant('Accept all') + ' ' + this.locale.getConstant('Changes') +
                ' ' + this.locale.getConstant('By').toLowerCase() + ' ' + this.selectedUser;
            this.menuDropDownButton.items[1].text = this.locale.getConstant('Reject all') + ' ' + this.locale.getConstant('Changes') +
                ' ' + this.locale.getConstant('By').toLowerCase() + ' ' + this.selectedUser;
        }
        else {
            this.menuDropDownButton.items[0].text = this.locale.getConstant('Accept all') + ' ' + revisionType +
                ' ' + this.locale.getConstant('By').toLowerCase() + ' ' + this.selectedUser;
            this.menuDropDownButton.items[1].text = this.locale.getConstant('Reject all') + ' ' + revisionType +
                ' ' + this.locale.getConstant('By').toLowerCase() + ' ' + this.selectedUser;
        }
        if (this.owner.documentHelper.isDocumentProtected || this.owner.isReadOnly) {
            this.menuDropDownButton.disabled = true;
        }
        else {
            this.menuDropDownButton.disabled = false;
        }
    };
    TrackChangesPane.prototype.sortCollectionToDisplay = function () {
        var isRevisionVisible = false;
        this.sortedRevisions = [];
        this.updateMenuOptions();
        for (var i = 0; i < this.changes.length; i++) {
            var changes = this.changes.get(this.revisions[i]);
            var singleChangesDiv = changes.outerSingleDiv;
            if (this.selectedUser === this.locale.getConstant('All') && this.selectedType === this.locale.getConstant('All')) {
                singleChangesDiv.style.display = 'block';
            }
            else if (this.selectedUser === this.locale.getConstant('All') && this.selectedType !== this.locale.getConstant('All')) {
                if (this.locale.getConstant(changes.revisionType) === this.selectedType) {
                    singleChangesDiv.style.display = 'block';
                }
                else {
                    singleChangesDiv.style.display = 'none';
                }
            }
            else if (this.selectedUser !== this.locale.getConstant('All') && this.selectedType === this.locale.getConstant('All')) {
                if (changes.user === this.selectedUser) {
                    singleChangesDiv.style.display = 'block';
                }
                else {
                    singleChangesDiv.style.display = 'none';
                }
            }
            else {
                if (changes.user === this.selectedUser && this.locale.getConstant(changes.revisionType) === this.selectedType) {
                    singleChangesDiv.style.display = 'block';
                }
                else {
                    singleChangesDiv.style.display = 'none';
                }
            }
            if (singleChangesDiv.style.display === 'block') {
                this.sortedRevisions.push(this.revisions[i]);
            }
            isRevisionVisible = true;
        }
        this.setNoChangesVisibility = !isRevisionVisible;
    };
    TrackChangesPane.prototype.enableDisableButton = function (enableButton) {
        this.enableButtons = enableButton;
        this.updateTrackChanges();
    };
    TrackChangesPane.prototype.isUpdateTrackChanges = function (revisionCount) {
        var isUpdate = false;
        var isNoChangeDiv = false;
        if (!isNullOrUndefined(this.changesInfoDiv)) {
            if (this.changesInfoDiv.childNodes.length === 1 && this.changesInfoDiv.childNodes[0].className == 'e-de-tc-no-chng') {
                isNoChangeDiv = true;
            }
            else {
                if (revisionCount !== this.changesInfoDiv.childNodes.length) {
                    isUpdate = true;
                }
            }
        }
        if (isNoChangeDiv || revisionCount > 0) {
            isUpdate = true;
        }
        return isUpdate;
    };
    TrackChangesPane.prototype.updateCurrentTrackChanges = function (revision) {
        var currentChangeView;
        if (!isNullOrUndefined(revision)) {
            currentChangeView = this.owner.trackChangesPane.changes.get(revision);
        }
        if (!isNullOrUndefined(currentChangeView) && revision.range.length > 0) {
            var changesDiv = currentChangeView.singleInnerDiv.querySelector("#textDiv");
            while (changesDiv.firstChild) {
                currentChangeView.removeInnerChilds(changesDiv.firstChild);
                changesDiv.removeChild(changesDiv.firstChild);
            }
            currentChangeView.layoutElementText(revision.range, changesDiv);
        }
        if (!isNullOrUndefined(revision) && revision.range.length === 0) {
            this.owner.revisions.remove(revision);
        }
    };
    TrackChangesPane.prototype.updateTrackChanges = function (show) {
        if (show || isNullOrUndefined(show)) {
            if (!this.owner.isUpdateTrackChanges) {
                this.tableRevisions.clear();
                this.renderedChanges.clear();
                this.removeAllChanges();
            }
            else {
                for (var i = 0; i < this.tableRevisions.keys.length; i++) {
                    var revision = this.tableRevisions.keys[i];
                    var index = this.revisions.indexOf(revision);
                    var removeChild = (this.tableRevisions.get(revision))[(this.tableRevisions.get(revision)).length - 1] === revision;
                    if (!isNullOrUndefined(this.changes)) {
                        var changesSingleView = this.changes.get(revision);
                        if (removeChild && !isNullOrUndefined(this.changesInfoDiv)) {
                            var changesSingleView_1 = this.changes.get(revision);
                            changesSingleView_1.removeEvents();
                            changesSingleView_1.removeInnerChilds(changesSingleView_1.outerSingleDiv);
                            this.changesInfoDiv.removeChild(changesSingleView_1.outerSingleDiv);
                        }
                    }
                    if (this.renderedChanges.containsKey(revision)) {
                        this.renderedChanges.remove(revision);
                    }
                    if (this.changes.containsKey(revision)) {
                        this.changes.remove(revision);
                    }
                    this.revisions.splice(index, 1);
                }
                this.tableRevisions.clear();
            }
            if (!this.enableButtons && !this.menuoptionEle.classList.contains('e-de-overlay')) {
                this.menuoptionEle.classList.add('e-de-overlay');
            }
            else if (this.menuoptionEle.classList.contains('e-de-overlay') && !this.owner.documentHelper.isDocumentProtected && !this.owner.isReadOnly) {
                this.menuoptionEle.classList.remove('e-de-overlay');
            }
            this.isChangesTabVisible = true;
            this.owner.notify('reviewPane', { comment: this.commentReviewPane.isCommentTabVisible, changes: this.isChangesTabVisible });
            if (!this.owner.isUpdateTrackChanges) {
                for (var i = 0; i < this.owner.revisions.changes.length; i++) {
                    var revision = this.owner.revisions.changes[i];
                    var ranges = this.owner.revisions.changes[i].range[0];
                    if ((ranges instanceof TextElementBox || ranges instanceof FieldElementBox) &&
                        ranges.paragraph.containerWidget instanceof HeaderFooterWidget && isNullOrUndefined(ranges.paragraph.containerWidget.sectionFormat)) {
                        continue;
                    }
                    if (this.changes.containsKey(revision)) {
                        continue;
                    }
                    if (ranges instanceof WRowFormat) {
                        var groupedRevision = this.groupTableRevisions(this.owner.revisions.changes, i);
                        if (groupedRevision.length > 1) {
                            var changeView = void 0;
                            for (var j = 0; j < groupedRevision.length; j++) {
                                var nextRevision = groupedRevision[j];
                                if (j === 0) {
                                    this.addChanges(nextRevision);
                                    changeView = this.changes.get(revision);
                                }
                                else {
                                    var nextRowFormat = nextRevision.range[0];
                                    changeView.appendRowToTable(nextRowFormat, j);
                                    this.revisions.push(nextRevision);
                                    this.changes.add(nextRevision, changeView);
                                }
                                this.tableRevisions.add(nextRevision, groupedRevision);
                            }
                        }
                        else {
                            this.addChanges(revision);
                        }
                    }
                    else {
                        this.addChanges(revision);
                    }
                }
                for (var i = 0; i < this.renderedChanges.keys.length; i++) {
                    var changeView = this.renderedChanges.get(this.renderedChanges.keys[i]);
                    changeView.updateRevisionIndexAndCount(i + 1, this.renderedChanges.keys.length);
                }
            }
            else {
                // Use this property to insert revision order wise in pane(revision order collapsed when using i value because total 10 revision, 2nd revision is table and table contain 5 row and each row preserved as a separate revision, so after table iteration i value is 6, so next revision inserted 6th position instead of 3).
                var insertIndex = 0;
                for (var i = 0; i < this.owner.revisions.changes.length; i++) {
                    var revision = this.owner.revisions.changes[i];
                    var ranges = this.owner.revisions.changes[i].range[0];
                    if (this.changes.containsKey(revision)) {
                        var currentChangeView = this.renderedChanges.get(revision);
                        if (isNullOrUndefined(currentChangeView)) {
                            continue;
                        }
                        if (!this.enableButtons) {
                            if (!(currentChangeView.acceptButtonElement.classList.contains('e-de-overlay'))) {
                                currentChangeView.acceptButtonElement.classList.add('e-de-overlay');
                                currentChangeView.rejectButtonElement.classList.add('e-de-overlay');
                            }
                        }
                        else if (currentChangeView.acceptButtonElement.classList.contains('e-de-overlay') && !this.owner.documentHelper.isTrackedOnlyMode) {
                            currentChangeView.acceptButtonElement.classList.remove('e-de-overlay');
                            currentChangeView.rejectButtonElement.classList.remove('e-de-overlay');
                        }
                        insertIndex++;
                        continue;
                    }
                    if (ranges instanceof WRowFormat) {
                        var groupedRevision = this.groupTableRevisions(this.owner.revisions.changes, i);
                        if (groupedRevision.length > 1) {
                            if (insertIndex === 0) {
                                insertIndex = i;
                            }
                            var changeView = void 0;
                            for (var j = 0; j < groupedRevision.length; j++) {
                                var nextRevision = groupedRevision[j];
                                if (j === 0) {
                                    var currentChangeView = new ChangesSingleView(this.owner, this);
                                    this.changesInfoDiv.insertBefore(currentChangeView.createSingleChangesDiv(nextRevision), this.changesInfoDiv.children[insertIndex + 1]);
                                    this.revisions.splice(i, 0, nextRevision);
                                    this.changes.add(nextRevision, currentChangeView);
                                    this.renderedChanges.add(nextRevision, currentChangeView);
                                    changeView = this.changes.get(revision);
                                }
                                else {
                                    var nextRowFormat = nextRevision.range[0];
                                    changeView.appendRowToTable(nextRowFormat, j);
                                    this.revisions.splice(i + j, 0, nextRevision);
                                    this.changes.add(nextRevision, changeView);
                                }
                                this.tableRevisions.add(nextRevision, groupedRevision);
                            }
                            insertIndex++;
                        }
                        else {
                            var currentChangeView = new ChangesSingleView(this.owner, this);
                            this.changesInfoDiv.insertBefore(currentChangeView.createSingleChangesDiv(revision), this.changesInfoDiv.children[i + 1]);
                            this.revisions.splice(i, 0, revision);
                            this.changes.add(revision, currentChangeView);
                            this.renderedChanges.add(revision, currentChangeView);
                            this.tableRevisions.add(revision, groupedRevision);
                        }
                    }
                }
                var totalCount = document.getElementsByClassName('e-de-track-chngs-count').length;
                for (var i = 0; i < totalCount; i++) {
                    var div = document.getElementsByClassName('e-de-track-chngs-count')[i];
                    div.innerHTML = this.locale.getConstant('Changes') + ' ' + (i + 1).toString() +
                        ' ' + this.locale.getConstant('of') + ' ' + totalCount.toString();
                }
            }
            this.sortCollectionToDisplay();
            this.updateUsers();
            if (show) {
                this.currentSelectedRevision = this.currentSelectedRevisionInternal;
                this.updateHeight();
                this.owner.resize();
            }
        }
        else {
            this.currentSelectedRevision = undefined;
        }
    };
    /**
     * @private
     */
    TrackChangesPane.prototype.groupTableRevisions = function (revisions, startIndex) {
        var startRevision = revisions[startIndex];
        var groupedRevision = [startRevision];
        var currentRevisionType = startRevision.revisionType;
        var startRow = startRevision.range[0].ownerBase;
        var startTable = startRow.ownerTable;
        var rowIndex = startRow.index;
        var startParentTable = this.owner.documentHelper.layout.getParentTable(startTable);
        for (var i = startIndex + 1; i < revisions.length; i++) {
            var nextRevision = revisions[i];
            var nextRevisionType = nextRevision.revisionType;
            var change = nextRevision.range[0];
            if (change instanceof WRowFormat) {
                var nextRow = change.ownerBase;
                var nextTable = nextRow.ownerTable;
                var nextRowIndex = nextRow.index;
                if (!startTable.equals(nextTable) &&
                    (!isNullOrUndefined(startParentTable) && startParentTable.equals(this.owner.documentHelper.layout.getParentTable(nextTable)))) {
                    continue;
                }
                if (currentRevisionType === nextRevisionType && startRevision.author === nextRevision.author
                    && startTable.equals(nextTable) && (rowIndex + 1 === nextRowIndex)) {
                    groupedRevision.push(nextRevision);
                    rowIndex = nextRowIndex;
                }
                else {
                    break;
                }
            }
            else {
                var block = void 0;
                if (change instanceof WCharacterFormat) {
                    block = change.ownerBase;
                }
                else if (change instanceof ElementBox) {
                    block = change.line.paragraph;
                }
                if (block instanceof ParagraphWidget && block.isInsideTable) {
                    var nextTable = block.associatedCell.ownerTable;
                    var parentTable = this.owner.documentHelper.layout.getParentTable(nextTable);
                    if (startTable.equals(nextTable) || (!startTable.equals(nextTable) &&
                        (!isNullOrUndefined(startParentTable) && startParentTable.equals(parentTable)))) {
                        continue;
                    }
                }
                break;
            }
        }
        return groupedRevision;
    };
    TrackChangesPane.prototype.updateUsers = function () {
        if (this.users.length > 0) {
            this.userDropDownButton.removeItems(this.users);
            this.users = [];
        }
        for (var i = 0; i < this.revisions.length; i++) {
            if (this.users.indexOf(this.revisions[i].author) === -1) {
                this.users.push(this.revisions[i].author);
                this.userDropDownButton.items.push({ text: this.revisions[i].author });
            }
        }
    };
    TrackChangesPane.prototype.updateHeight = function () {
        var tabHeaderHeight = this.commentReviewPane.reviewTab.getRootElement().getElementsByClassName('e-tab-header')[0].getBoundingClientRect().height;
        this.changesInfoDiv.style.height = this.commentReviewPane.parentPaneElement.clientHeight - this.toolbarElement.clientHeight
            - tabHeaderHeight - 2 + 'px';
    };
    TrackChangesPane.prototype.removeAllChanges = function () {
        while (this.changesInfoDiv.childNodes.length > 1) {
            this.changesInfoDiv.removeChild(this.changesInfoDiv.lastChild);
        }
        this.revisions = [];
        if (this.changes && this.changes.length > 0) {
            for (var i = 0; i < this.changes.length; i++) {
                var revision = this.changes.keys[i];
                var changesSingleView = this.changes.get(revision);
                changesSingleView.clear();
            }
            this.changes.clear();
        }
    };
    /**
     * @private
     */
    TrackChangesPane.prototype.clear = function () {
        this.removeAllChanges();
        this.selectedUser = this.locale.getConstant('All');
        this.userDropDownButton.content = this.getSpanView(this.selectedUser, 0);
        this.selectedType = this.locale.getConstant('All');
        this.viewTypeDropDownButton.content = this.getSpanView(this.selectedType, 1);
        this.currentSelectedRevision = undefined;
    };
    /**
     * @private
     * @returns {void}
     */
    TrackChangesPane.prototype.destroy = function () {
        if (this.changes && this.changes.length > 0) {
            for (var i = 0; i < this.changes.length; i++) {
                var revision = this.changes.keys[i];
                var changesSingleView = this.changes.get(revision);
                changesSingleView.destroy();
            }
            this.changes.clear();
        }
        this.changes = undefined;
        if (this.toolbar) {
            this.toolbar.destroy();
            this.toolbar = undefined;
        }
        if (this.closeButton && this.closeButton.parentElement) {
            this.closeButton.parentElement.removeChild(this.closeButton);
        }
        this.closeButton = undefined;
        if (this.userDropDownButton) {
            this.userDropDownButton.destroy();
            this.userDropDownButton = undefined;
        }
        if (this.menuDropDownButton) {
            this.menuDropDownButton.destroy();
            this.menuDropDownButton = undefined;
        }
        if (this.viewTypeDropDownButton) {
            this.viewTypeDropDownButton.destroy();
            this.viewTypeDropDownButton = undefined;
        }
        if (this.userDropDown) {
            this.userDropDown = undefined;
        }
        if (this.users.length > 0) {
            this.users = [];
            this.users = undefined;
        }
        if (this.trackChangeDiv) {
            this.trackChangeDiv.innerHTML = '';
            if (this.trackChangeDiv.parentElement) {
                this.trackChangeDiv.parentElement.removeChild(this.trackChangeDiv);
            }
        }
        this.trackChangeDiv = undefined;
        if (this.changesInfoDiv) {
            this.changesInfoDiv.innerHTML = '';
            if (this.changesInfoDiv.parentElement) {
                this.changesInfoDiv.parentElement.removeChild(this.changesInfoDiv);
            }
        }
        this.changesInfoDiv = undefined;
        if (this.commentReviewPane) {
            this.commentReviewPane = undefined;
        }
        if (this.tableRevisions) {
            this.tableRevisions.destroy();
            this.tableRevisions = undefined;
        }
        if (this.renderedChanges) {
            this.renderedChanges.destroy();
            this.renderedChanges = undefined;
        }
        this.currentSelectedRevisionInternal = undefined;
        this.selectedUser = undefined;
        this.selectedType = undefined;
        this.sortedRevisions = [];
        this.sortedRevisions = undefined;
        this.viewTypeitems = [];
        this.viewTypeitems = undefined;
        this.userDropDownitems = [];
        this.userDropDownitems = undefined;
        this.revisions = [];
        this.revisions = undefined;
        this.owner = undefined;
    };
    TrackChangesPane.prototype.addChanges = function (revision) {
        var currentChangeView = new ChangesSingleView(this.owner, this);
        this.changesInfoDiv.appendChild(currentChangeView.createSingleChangesDiv(revision));
        if (!this.enableButtons) {
            if (!(currentChangeView.acceptButtonElement.classList.contains('e-de-overlay'))) {
                currentChangeView.acceptButtonElement.classList.add('e-de-overlay');
                currentChangeView.rejectButtonElement.classList.add('e-de-overlay');
            }
        }
        else if (currentChangeView.acceptButtonElement.classList.contains('e-de-overlay') && !this.owner.documentHelper.isTrackedOnlyMode) {
            currentChangeView.acceptButtonElement.classList.remove('e-de-overlay');
            currentChangeView.rejectButtonElement.classList.remove('e-de-overlay');
        }
        this.revisions.push(revision);
        this.changes.add(revision, currentChangeView);
        this.renderedChanges.add(revision, currentChangeView);
    };
    /**
         * @private
         * @returns {void}
         */
    TrackChangesPane.prototype.navigatePreviousChanges = function () {
        this.revisionNavigateInternal(false);
    };
    /**
         * @private
         * @returns {void}
         */
    TrackChangesPane.prototype.navigateNextChanges = function () {
        this.revisionNavigateInternal(true);
    };
    TrackChangesPane.prototype.revisionNavigateInternal = function (next) {
        var changes = this.renderedChanges.keys;
        if (!this.currentSelectedRevisionInternal) {
            if (changes.length === 0) {
                return;
            }
            this.currentSelectedRevision = changes[0];
        }
        if (this.currentSelectedRevision) {
            var revisions = changes;
            var revision = this.currentSelectedRevision;
            var index = revisions.indexOf(revision);
            if (next) {
                revision = (index === (revisions.length - 1)) ? revisions[0] : revisions[index + 1];
            }
            else {
                revision = index === 0 ? revisions[revisions.length - 1] : revisions[index - 1];
            }
            this.owner.documentHelper.currentSelectedRevision = revision;
            var ranges = revision.range[0];
            if (ranges instanceof WRowFormat) {
                var groupingAccept = this.groupTableRevisions(this.owner.revisions.changes, this.owner.revisions.changes.indexOf(revision));
                this.owner.selectionModule.selectTableRevision(groupingAccept);
            }
            else {
                this.owner.selectionModule.selectRevision(revision);
            }
        }
        this.currentSelectedRevision = this.owner.documentHelper.currentSelectedRevision;
    };
    return TrackChangesPane;
}());
export { TrackChangesPane };
var ChangesSingleView = /** @class */ (function () {
    function ChangesSingleView(owner, trackChangesPane) {
        this.selectRevisionHandler = this.selectRevision.bind(this);
        this.acceptButtonClickHandler = this.acceptButtonClick.bind(this);
        this.rejectButtonClickHandler = this.rejectButtonClick.bind(this);
        this.owner = owner;
        this.locale = new L10n('documenteditor', this.owner.defaultLocale);
        this.locale.setLocale(this.owner.locale);
        this.trackChangesPane = trackChangesPane;
    }
    ChangesSingleView.prototype.updateRevisionIndexAndCount = function (currentIndex, totalCount) {
        this.changesCount.innerHTML = this.locale.getConstant('Changes') + ' ' + currentIndex.toString() +
            ' ' + this.locale.getConstant('of') + ' ' + totalCount.toString();
    };
    ChangesSingleView.prototype.createSingleChangesDiv = function (revision) {
        this.revision = revision;
        this.user = revision.author;
        this.outerSingleDiv = createElement('div', { className: 'e-de-tc-outer' });
        this.singleInnerDiv = createElement('div', { className: 'e-de-trckchanges-inner' });
        this.singleInnerDiv.addEventListener('click', this.selectRevisionHandler);
        this.outerSingleDiv.appendChild(this.singleInnerDiv);
        var userNameTotalDiv = createElement('div', { className: 'e-de-track-usernme-div' });
        var userNameLabel = createElement('div', { className: 'e-de-track-user-nme' });
        userNameLabel.textContent = SanitizeHtmlHelper.sanitize(revision.author);
        if (!isNullOrUndefined(revision.author)) {
            userNameTotalDiv.style.display = 'flex';
            this.owner.documentHelper.getAvatar(userNameTotalDiv, userNameLabel, undefined, revision);
        }
        var revisionTypeLabel = createElement('div');
        if (revision.revisionType === 'Insertion') {
            this.revisionType = 'Inserted';
            revisionTypeLabel.innerHTML = this.locale.getConstant('Inserted').toUpperCase();
            revisionTypeLabel.classList.add('e-de-track-insert');
        }
        else if (revision.revisionType === 'Deletion') {
            this.revisionType = 'Deleted';
            revisionTypeLabel.innerHTML = this.locale.getConstant('Deleted').toUpperCase();
            revisionTypeLabel.classList.add('e-de-track-delete');
        }
        else if (revision.revisionType === 'MoveFrom') {
            this.revisionType = 'MoveFrom';
            revisionTypeLabel.innerHTML = this.locale.getConstant('Move From').toUpperCase();
            revisionTypeLabel.classList.add('e-de-track-delete');
            revisionTypeLabel.style.whiteSpace = 'nowrap';
        }
        else if (revision.revisionType === 'MoveTo') {
            this.revisionType = 'MoveTo';
            revisionTypeLabel.innerHTML = this.locale.getConstant('Move To').toUpperCase();
            revisionTypeLabel.classList.add('e-de-track-insert');
            revisionTypeLabel.style.whiteSpace = 'nowrap';
        }
        userNameTotalDiv.appendChild(revisionTypeLabel);
        this.singleInnerDiv.appendChild(userNameTotalDiv);
        var dateView = createElement('div', {
            className: 'e-de-track-date',
            innerHTML: HelperMethods.getModifiedDate(revision.date)
        });
        this.singleInnerDiv.appendChild(dateView);
        var changesTextDiv = createElement('div', { id: 'textDiv',
            className: 'e-de-track-chngs-text'
        });
        this.layoutElementText(revision.range, changesTextDiv);
        this.singleInnerDiv.appendChild(changesTextDiv);
        var buttonTotalDiv = createElement('div', {
            styles: 'display:inline-block;width:100%'
        });
        this.singleInnerDiv.appendChild(buttonTotalDiv);
        var buttonDiv = createElement('div', {
            styles: 'float:left;'
        });
        this.acceptButtonElement = createElement('button', { className: 'e-de-track-accept-button' });
        this.acceptButton = new Button({ cssClass: 'e-outline e-success', content: this.locale.getConstant('Accept') });
        this.acceptButtonElement.setAttribute('aria-label', this.locale.getConstant('Accept'));
        buttonDiv.appendChild(this.acceptButtonElement);
        buttonTotalDiv.appendChild(buttonDiv);
        this.acceptButton.appendTo(this.acceptButtonElement);
        if (this.owner.documentHelper.isTrackedOnlyMode) {
            this.acceptButtonElement.classList.add('e-de-overlay');
        }
        this.acceptButtonElement.addEventListener('click', this.acceptButtonClickHandler);
        buttonDiv = createElement('div', {
            styles: 'float:left;'
        });
        this.rejectButtonElement = createElement('button', { className: 'e-de-track-reject-button' });
        this.rejectButton = new Button({ cssClass: 'e-outline e-danger', content: this.locale.getConstant('Reject') });
        this.rejectButtonElement.setAttribute('aria-label', this.locale.getConstant('Reject'));
        buttonDiv.appendChild(this.rejectButtonElement);
        buttonTotalDiv.appendChild(buttonDiv);
        this.rejectButton.appendTo(this.rejectButtonElement);
        if (this.owner.documentHelper.isTrackedOnlyMode) {
            this.rejectButtonElement.classList.add('e-de-overlay');
        }
        this.rejectButtonElement.addEventListener('click', this.rejectButtonClickHandler);
        this.changesCount = createElement('div', { className: 'e-de-track-chngs-count', styles: 'float:right;' });
        var currentCount = this.owner.revisions.changes.indexOf(revision) + 1;
        var totalCount = this.owner.revisions.changes.length;
        this.changesCount.innerHTML = this.locale.getConstant('Changes') + ' ' + currentCount.toString() +
            ' ' + this.locale.getConstant('of') + ' ' + totalCount.toString();
        buttonTotalDiv.appendChild(this.changesCount);
        return this.outerSingleDiv;
    };
    /**
     * @private
     */
    ChangesSingleView.prototype.appendRowToTable = function (rowFormat, insertIndex) {
        this.tableElement.insertRow();
        for (var k = 0; k < rowFormat.ownerBase.childWidgets.length; k++) {
            this.tableElement.rows[insertIndex].insertCell();
            this.tableElement.rows[insertIndex].cells[k].classList.add('e-de-tc-tble-cell');
        }
    };
    ChangesSingleView.prototype.selectRevision = function () {
        var ranges = this.revision.range[0];
        if (ranges instanceof WRowFormat) {
            var groupingAccept = this.trackChangesPane.groupTableRevisions(this.owner.revisions.changes, this.owner.revisions.changes.indexOf(this.revision));
            this.owner.selectionModule.selectTableRevision(groupingAccept);
        }
        else {
            this.owner.selectionModule.selectRevision(this.revision);
            this.trackChangesPane.onSelection(this.revision);
        }
    };
    ChangesSingleView.prototype.layoutElementText = function (range, changesText) {
        changesText.style.width = '100%';
        var text = '';
        var toSkip = false;
        var isHyperlinkField = false;
        for (var i = 0; i < range.length; i++) {
            var element = range[i];
            if (element instanceof FieldElementBox && element.fieldType === 1) {
                toSkip = false;
                continue;
            }
            // added the condition to skip to get the field result from the field start if the link applied for multiple paragraphs.
            if (element instanceof FieldElementBox && element.fieldType === 0) {
                var fieldCode = this.owner.selectionModule.getFieldCode(element);
                if (fieldCode.match('HYPERLINK ') && range[range.indexOf(element.fieldEnd) - 1] instanceof TextElementBox) {
                    isHyperlinkField = true;
                }
            }
            if (isHyperlinkField && element instanceof FieldElementBox && (element.fieldType === 2 || element.fieldType === 1)) {
                toSkip = false;
                isHyperlinkField = false;
                continue;
            }
            if (toSkip || element instanceof ChartElementBox) {
                continue;
            }
            if (element instanceof FieldElementBox && element.fieldType === 0) {
                toSkip = true;
            }
            if (element instanceof TextElementBox) {
                text += element.text;
            }
            else if (element instanceof FieldElementBox && element.fieldType === 0) {
                var fieldCode = this.owner.selectionModule.getFieldCode(element);
                if (fieldCode.match('TOC ') || fieldCode.match('Toc')) {
                    text += '<Table of Content>';
                    changesText.appendChild(this.addSpan(text));
                    return;
                }
                else if ((fieldCode.match('HYPERLINK ') && !isHyperlinkField) || fieldCode.match('MERGEFIELD') || fieldCode.match('FORMTEXT') || fieldCode.match('PAGE ')) {
                    text += this.owner.editorModule.retrieveFieldResultantText(element.fieldEnd);
                }
                else if (element.formFieldData) {
                    var emptyChar = this.owner.documentHelper.textHelper.repeatChar(this.owner.documentHelper.textHelper.getEnSpaceCharacter(), 5);
                    if (text !== '') {
                        changesText.appendChild(this.addSpan(text));
                        text = '';
                    }
                    if (element.formFieldData instanceof TextFormField) {
                        changesText.appendChild(this.addSpan(element.formFieldData.defaultValue === '' ? emptyChar : element.formFieldData.defaultValue, 'e-de-tc-field'));
                    }
                    else if (element.formFieldData instanceof DropDownFormField) {
                        changesText.appendChild(this.addSpan(element.formFieldData.dropdownItems.length > 0 ? element.formFieldData.dropdownItems[0] : emptyChar, 'e-de-tc-field'));
                    }
                    else {
                        changesText.appendChild(this.addSpan(element.formFieldData.checked ? String.fromCharCode(9745) : String.fromCharCode(9744), 'e-de-tc-field'));
                    }
                }
            }
            else if (element instanceof ImageElementBox) {
                if (text !== '') {
                    changesText.appendChild(this.addSpan(text));
                    text = '';
                }
                var imageEle = createElement('img');
                imageEle.setAttribute('src', this.owner.documentHelper.getImageString(element));
                imageEle.classList.add('e-de-tc-shrink-img');
                changesText.appendChild(imageEle);
            }
            else if (element instanceof WRowFormat) {
                this.tableElement = createElement('table');
                this.tableElement.classList.add('e-de-track-chng-table');
                this.tableElement.insertRow();
                for (var i_1 = 0; i_1 < element.ownerBase.childWidgets.length; i_1++) {
                    this.tableElement.rows[0].insertCell();
                    this.tableElement.rows[0].cells[i_1].classList.add('e-de-tc-tble-cell');
                }
                changesText.appendChild(this.tableElement);
                return;
            }
            else if (element instanceof WCharacterFormat) {
                if (text !== '') {
                    changesText.appendChild(this.addSpan(text));
                    text = '';
                }
                var paraMark = '¶';
                if (element.ownerBase instanceof ParagraphWidget && element.ownerBase.isEndsWithPageBreak) {
                    paraMark = '............Page Break............' + paraMark;
                }
                changesText.appendChild(this.addSpan(paraMark, 'e-de-tc-pmark'));
                changesText.appendChild(createElement('br'));
            }
        }
        changesText.appendChild(this.addSpan(text));
    };
    ChangesSingleView.prototype.addSpan = function (text, cssClass) {
        var span = createElement('span');
        span.textContent = text;
        if (cssClass) {
            span.classList.add(cssClass);
        }
        return span;
    };
    ChangesSingleView.prototype.acceptButtonClick = function () {
        this.revision.accept();
        if (this.owner.enableHeaderAndFooter) {
            this.owner.editorModule.updateHeaderFooterWidget();
        }
    };
    ChangesSingleView.prototype.rejectButtonClick = function () {
        this.revision.reject();
        if (this.owner.enableHeaderAndFooter) {
            this.owner.editorModule.updateHeaderFooterWidget();
        }
    };
    ChangesSingleView.prototype.removeFromParentCollec = function () {
        if (this.trackChangesPane.changes.containsKey(this.revision)) {
            this.trackChangesPane.changes.remove(this.revision);
        }
        if (this.trackChangesPane.revisions.indexOf(this.revision) !== -1) {
            this.trackChangesPane.revisions.splice(this.trackChangesPane.revisions.indexOf(this.revision), 1);
        }
        if (this.trackChangesPane.changes.length === 0) {
            this.trackChangesPane.setNoChangesVisibility = true;
        }
        this.trackChangesPane.updateUsers();
    };
    /**
     * @private
     */
    ChangesSingleView.prototype.removeInnerChilds = function (element) {
        if (element) {
            while (element.firstChild) {
                if (element.firstChild.childNodes.length > 0) {
                    this.removeInnerChilds(element.firstChild);
                }
                element.removeChild(element.firstChild);
            }
        }
    };
    /**
     * @private
     */
    ChangesSingleView.prototype.removeEvents = function () {
        if (this.outerSingleDiv) {
            this.outerSingleDiv.removeEventListener('click', this.selectRevisionHandler);
        }
        if (this.acceptButtonElement) {
            this.acceptButtonElement.removeEventListener('click', this.acceptButtonClickHandler);
        }
        if (this.rejectButtonElement) {
            this.rejectButtonElement.removeEventListener('click', this.rejectButtonClickHandler);
        }
    };
    /**
     *
     * @private
     */
    ChangesSingleView.prototype.clear = function () {
        this.removeFromParentCollec();
        this.removeEvents();
        this.removeInnerChilds(this.outerSingleDiv);
        if (this.acceptButton) {
            this.acceptButton.destroy();
            this.acceptButton = undefined;
        }
        if (this.rejectButton) {
            this.rejectButton.destroy();
            this.rejectButton = undefined;
        }
        if (this.acceptButtonElement) {
            this.acceptButtonElement.innerHTML = '';
            if (this.acceptButtonElement.parentElement) {
                this.acceptButtonElement.parentElement.removeChild(this.acceptButtonElement);
            }
            this.acceptButtonElement = undefined;
        }
        if (this.rejectButtonElement) {
            this.rejectButtonElement.innerHTML = '';
            if (this.rejectButtonElement.parentElement) {
                this.rejectButtonElement.parentElement.removeChild(this.rejectButtonElement);
            }
            this.rejectButtonElement = undefined;
        }
        if (this.tableElement) {
            this.tableElement.innerHTML = '';
            if (this.tableElement.parentElement) {
                this.tableElement.parentElement.removeChild(this.tableElement);
            }
            this.tableElement = undefined;
        }
        if (this.singleInnerDiv) {
            this.singleInnerDiv.innerHTML = '';
            if (this.singleInnerDiv.parentElement) {
                this.singleInnerDiv.parentElement.removeChild(this.singleInnerDiv);
            }
            this.singleInnerDiv = undefined;
        }
        if (this.outerSingleDiv) {
            this.outerSingleDiv.innerHTML = '';
            if (this.outerSingleDiv.parentElement) {
                this.outerSingleDiv.parentElement.removeChild(this.outerSingleDiv);
            }
            this.outerSingleDiv = undefined;
        }
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    ChangesSingleView.prototype.destroy = function () {
        this.removeEvents();
        this.removeInnerChilds(this.outerSingleDiv);
        if (this.acceptButton) {
            this.acceptButton.destroy();
            this.acceptButton = undefined;
        }
        if (this.rejectButton) {
            this.rejectButton.destroy();
            this.rejectButton = undefined;
        }
        if (this.acceptButtonElement) {
            this.acceptButtonElement.innerHTML = '';
            if (this.acceptButtonElement.parentElement) {
                this.acceptButtonElement.parentElement.removeChild(this.acceptButtonElement);
            }
            this.acceptButtonElement = undefined;
        }
        if (this.rejectButtonElement) {
            this.rejectButtonElement.innerHTML = '';
            if (this.rejectButtonElement.parentElement) {
                this.rejectButtonElement.parentElement.removeChild(this.rejectButtonElement);
            }
            this.rejectButtonElement = undefined;
        }
        if (this.tableElement) {
            this.tableElement.innerHTML = '';
            if (this.tableElement.parentElement) {
                this.tableElement.parentElement.removeChild(this.tableElement);
            }
            this.tableElement = undefined;
        }
        if (this.singleInnerDiv) {
            this.singleInnerDiv.innerHTML = '';
            if (this.singleInnerDiv.parentElement) {
                this.singleInnerDiv.parentElement.removeChild(this.singleInnerDiv);
            }
            this.singleInnerDiv = undefined;
        }
        if (this.outerSingleDiv) {
            this.outerSingleDiv.innerHTML = '';
            if (this.outerSingleDiv.parentElement) {
                this.outerSingleDiv.parentElement.removeChild(this.outerSingleDiv);
            }
            this.outerSingleDiv = undefined;
        }
        this.revision = undefined;
        this.user = undefined;
        this.revisionType = undefined;
        this.trackChangesPane = undefined;
        this.owner = undefined;
    };
    return ChangesSingleView;
}());
export { ChangesSingleView };
