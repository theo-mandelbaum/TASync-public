import { L10n, createElement, isNullOrUndefined } from '@syncfusion/ej2-base';
import { CheckBox, Button } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { ListView } from '@syncfusion/ej2-lists';
import { DialogUtility } from '@syncfusion/ej2-popups';
/**
 * The Table of contents dialog is used to insert or edit table of contents at selection.
 */
var TableOfContentsDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    function TableOfContentsDialog(documentHelper) {
        var _this = this;
        this.changeStyleClickHandler = this.onChangeStyleClick.bind(this);
        this.changingStyleClickHandler = this.onChangingStyleClick.bind(this);
        this.resetClickHandler = this.onResetClick.bind(this);
        this.selectHandlerClickHandler = this.onSelectHandlerClick.bind(this);
        this.showDialogHandler = this.onShowDialog.bind(this);
        /**
         * @private
         * @returns {void}
         */
        this.loadTableofContentDialog = function () {
            _this.documentHelper.updateFocus();
            _this.pageNumber.checked = true;
            _this.rightAlign.disabled = false;
            _this.rightAlign.checked = true;
            _this.tabLeader.enabled = true;
            _this.hyperlink.checked = true;
            _this.style.checked = true;
            _this.outline.checked = true;
            _this.outline.disabled = false;
            _this.showLevel.enabled = true;
        };
        /**
         * @private
         * @returns {void}
         */
        this.closeTableOfContentDialog = function () {
            _this.unWireEventsAndBindings();
            _this.documentHelper.updateFocus();
        };
        /**
         * @private
         * @returns {void}
         */
        this.onCancelButtonClick = function () {
            _this.documentHelper.dialog3.hide();
            _this.unWireEventsAndBindings();
            _this.documentHelper.updateFocus();
        };
        /**
         * @param {SelectEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.selectHandler = function (args) {
            _this.textBoxInput.value = args.text;
            var value = _this.textBoxInput;
            value.setSelectionRange(0, args.text.length);
            value.focus();
        };
        /**
         * @private
         * @returns {void}
         */
        this.showStyleDialog = function () {
            if (!isNullOrUndefined(_this.documentHelper.owner.styleDialogModule)) {
                _this.documentHelper.owner.styleDialogModule.show(_this.textBoxInput.value);
            }
        };
        /**
         * @returns {void}
         */
        this.reset = function () {
            _this.showLevel.enabled = true;
            _this.showLevel.value = 3;
            _this.outline.disabled = false;
            _this.outline.checked = true;
            var values = ['1', '2', '3', null, null, null, null, null, null];
            _this.changeByValue(values);
            _this.normal.value = null;
        };
        /**
         * @param {KeyboardEvent} args - Specifies the event args.
         * @returns {void}
         */
        this.changeStyle = function (args) {
            var headingLevel = 0;
            if (!isNullOrUndefined(args.srcElement.value)) {
                var headingValue = args.srcElement.value;
                headingLevel = parseInt(headingValue);
                if (!headingValue.match(/^[0-9]+$/) && headingValue !== '') {
                    _this.initAlertDialog(false);
                    return;
                }
                else if (headingLevel < 1 || headingLevel > 9) {
                    _this.initAlertDialog(true);
                    return;
                }
                else {
                    var value = _this.getElementValue(args.srcElement);
                    if (headingValue !== value && headingValue !== '') {
                        _this.showLevel.enabled = false;
                    }
                    else {
                        _this.showLevel.enabled = true;
                        _this.checkLevel();
                    }
                }
            }
        };
        /**
         * @param {KeyboardEvent} args - Specifies the event args.
         * @returns {void}
         */
        this.changeHeadingStyle = function (args) {
            var headingLevel = 0;
            if (!isNullOrUndefined(args.srcElement.value)) {
                var headingValue = args.srcElement.value;
                headingLevel = parseInt(headingValue);
                if (!headingValue.match(/^[0-9]+$/) && headingValue !== '') {
                    _this.initAlertDialog(false);
                    return;
                }
                else if (headingLevel < 1 || headingLevel > 9) {
                    _this.initAlertDialog(true);
                    return;
                }
                else {
                    if (headingValue === '') {
                        _this.showLevel.enabled = true;
                    }
                    else {
                        _this.showLevel.enabled = false;
                    }
                    if (_this.normal === args.srcElement) {
                        _this.outline.checked = false;
                        _this.outline.disabled = true;
                    }
                }
            }
        };
        /**
         * @param {ChangeEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.changePageNumberValue = function (args) {
            if (args.checked) {
                _this.rightAlign.checked = true;
                _this.rightAlign.disabled = false;
                _this.tabLeader.enabled = true;
            }
            else {
                _this.rightAlign.disabled = true;
                _this.tabLeader.enabled = false;
            }
        };
        /**
         * @param {ChangeEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.changeRightAlignValue = function (args) {
            if (args.checked) {
                _this.tabLeader.enabled = true;
            }
            else {
                _this.tabLeader.enabled = false;
            }
        };
        /**
         * @param {ChangeEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.changeStyleValue = function (args) {
            if (args.checked) {
                _this.heading1.disabled = false;
                _this.heading2.disabled = false;
                _this.heading3.disabled = false;
                _this.heading4.disabled = false;
                _this.heading5.disabled = false;
                _this.heading6.disabled = false;
                _this.heading7.disabled = false;
                _this.heading8.disabled = false;
                _this.heading9.disabled = false;
                _this.normal.disabled = false;
            }
            else {
                _this.heading1.disabled = true;
                _this.heading2.disabled = true;
                _this.heading3.disabled = true;
                _this.heading4.disabled = true;
                _this.heading5.disabled = true;
                _this.heading6.disabled = true;
                _this.heading7.disabled = true;
                _this.heading8.disabled = true;
                _this.heading9.disabled = true;
                _this.normal.disabled = true;
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.applyTableOfContentProperties = function () {
            var tocSettings = {
                startLevel: 1,
                endLevel: _this.showLevel.value,
                includeHyperlink: _this.hyperlink.checked,
                includePageNumber: _this.pageNumber.checked,
                rightAlign: _this.rightAlign.checked,
                tabLeader: _this.tabLeader.value,
                includeOutlineLevels: _this.outline.checked
            };
            if (_this.applyLevelSetting(tocSettings)) {
                _this.documentHelper.owner.editorModule.insertTableOfContents(tocSettings);
                _this.documentHelper.dialog3.hide();
                _this.documentHelper.updateFocus();
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.unWireEventsAndBindings = function () {
            _this.pageNumber.checked = false;
            _this.rightAlign.checked = false;
            if (_this.tabLeader) {
                _this.tabLeader.value = '';
            }
            _this.hyperlink.checked = false;
            _this.style.checked = false;
            _this.outline.checked = false;
            if (_this.normal) {
                _this.normal.value = '';
            }
        };
        this.documentHelper = documentHelper;
    }
    TableOfContentsDialog.prototype.getModuleName = function () {
        return 'TableOfContentsDialog';
    };
    /* eslint-disable   */
    /**
     * @private
     * @param {L10n} localValue - Specifies the locale value
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    TableOfContentsDialog.prototype.initTableOfContentDialog = function (locale, isRtl) {
        var instance = this;
        var ownerId = this.documentHelper.owner.containerId;
        var id = ownerId + '_toc_dialog';
        this.target = createElement('div', { id: id, className: 'e-de-toc-dlg-container' });
        this.generalDiv = createElement('div', { id: 'general_div', className: 'e-de-toc-dlg-sub-container' });
        this.target.appendChild(this.generalDiv);
        this.genLabel = createElement('div', { id: ownerId + '_genLabel', className: 'e-de-toc-dlg-main-heading', styles: 'margin-bottom: 13px;', innerHTML: locale.getConstant('General') });
        this.generalDiv.appendChild(this.genLabel);
        var leftGeneralDivStyles;
        var rightBottomGeneralDivStyles;
        if (isRtl) {
            leftGeneralDivStyles = 'float:right;';
            rightBottomGeneralDivStyles = 'float:left;position:relative;';
        }
        else {
            leftGeneralDivStyles = 'float:left;';
            rightBottomGeneralDivStyles = 'float:right;';
        }
        this.topContainer = createElement('div', { className: 'e-de-container-row' });
        this.leftGeneralDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        this.topContainer.appendChild(this.leftGeneralDiv);
        this.rightGeneralDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        this.topContainer.appendChild(this.rightGeneralDiv);
        this.generalDiv.appendChild(this.topContainer);
        this.bottomContainer = createElement('div', { className: 'e-de-dlg-row' });
        this.leftBottomGeneralDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        this.bottomContainer.appendChild(this.leftBottomGeneralDiv);
        this.rightBottomGeneralDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        this.bottomContainer.appendChild(this.rightBottomGeneralDiv);
        this.pageNumberDiv = createElement('div', { className: 'e-de-toc-dlg-sub-container' });
        this.pageNumber1 = createElement('input', {
            attrs: { 'type': 'checkbox' }, id: this.target.id + '_pageNumber'
        });
        this.pageNumberDiv.appendChild(this.pageNumber1);
        this.rightAlignDiv = createElement('div', { className: 'e-de-toc-dlg-sub-container' });
        this.rightAlign1 = createElement('input', {
            attrs: { 'type': 'checkbox' }, id: this.target.id + '_rightAlign'
        });
        this.rightAlignDiv.appendChild(this.rightAlign1);
        this.pageNumber = new CheckBox({ label: locale.getConstant('Show page numbers'), enableRtl: isRtl, checked: true, change: this.changePageNumberValue });
        this.rightAlign = new CheckBox({ label: locale.getConstant('Right align page numbers'), enableRtl: isRtl, checked: true, change: this.changeRightAlignValue });
        this.pageNumber.appendTo(this.pageNumber1);
        this.rightAlign.appendTo(this.rightAlign1);
        this.tabDivContainer = createElement('div', { className: 'e-de-container-row' });
        this.tabDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        this.tabLeaderLabelDiv = createElement('div');
        this.tabLeaderLabel = createElement('label', { className: 'e-de-toc-dlg-heading', innerHTML: locale.getConstant('Tab leader') + ':' });
        this.tabLeaderLabelDiv.appendChild(this.tabLeaderLabel);
        this.tabLeaderDiv = createElement('div', { id: 'tabLeader_div' });
        this.tabLeader1 = createElement('select', {
            id: ownerId + '_tabLeader',
            innerHTML: '<option value="None">' + '(' + locale.getConstant('None').toLocaleLowerCase() + ')' +
                '</option><option value="Dot" selected>' + '....................' +
                '</option><option value="Hyphen">' + '-------------------' +
                '</option><option value="Underscore">' + '____________' + '</option>'
        });
        this.tabLeaderDiv.appendChild(this.tabLeader1);
        this.tabDiv.appendChild(this.tabLeaderLabelDiv);
        this.tabDiv.appendChild(this.tabLeaderDiv);
        this.leftGeneralDiv.appendChild(this.pageNumberDiv);
        this.leftGeneralDiv.appendChild(this.rightAlignDiv);
        this.tabDivContainer.appendChild(this.tabDiv);
        this.tabLeader = new DropDownList({ enableRtl: isRtl });
        this.tabLeader.appendTo(this.tabLeader1);
        this.hyperlink1 = createElement('input', {
            attrs: { 'type': 'checkbox' }, id: this.target.id + '_hyperlink'
        });
        this.rightGeneralDiv.appendChild(this.hyperlink1);
        this.hyperlink = new CheckBox({ label: locale.getConstant('Use hyperlinks instead of page numbers'), cssClass: 'e-de-toc-label', enableRtl: isRtl, checked: true });
        this.hyperlink.appendTo(this.hyperlink1);
        this.showDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        this.showLevelLabelDiv = createElement('div', { className: 'e-de-toc-dlg-show-level-div' });
        this.showLevelLabel = createElement('label', { className: 'e-de-toc-dlg-heading', innerHTML: locale.getConstant('Show levels') + ':' });
        this.showLevelLabelDiv.appendChild(this.showLevelLabel);
        this.showLevelDiv = createElement('div', { className: 'e-de-toc-dlg-showlevel-div' });
        this.showLevel1 = createElement('input', { id: ownerId + '_showLevel', attrs: { 'type': 'text', 'aria-label': 'showLevel' } });
        this.showLevelDiv.appendChild(this.showLevel1);
        this.showDiv.appendChild(this.showLevelLabelDiv);
        this.showDiv.appendChild(this.showLevelDiv);
        this.tabDivContainer.appendChild(this.showDiv);
        this.generalDiv.appendChild(this.tabDivContainer);
        this.showLevel = new NumericTextBox({ format: '#', value: 3, min: 1, max: 9, change: this.changeShowLevelValue.bind(this) });
        this.showLevel.appendTo(this.showLevel1);
        if (isRtl) {
            this.hyperlink.cssClass = 'e-de-toc-label-rtl';
            this.showLevelLabelDiv.classList.add('e-de-rtl');
            this.showLevelDiv.classList.add('e-de-rtl');
            this.rightBottomGeneralDiv.classList.add('e-de-rtl');
        }
        //let buildTableDiv: HTMLDivElement = createElement('div', { className: 'e-de-toc-dlg-sub-container' }) as HTMLDivElement;
        this.buildTableLabel = createElement('div', { className: 'e-de-toc-dlg-main-heading e-de-toc-dlg-build-table', innerHTML: locale.getConstant('Build table of contents from') + ':' });
        //leftBottomGeneralDiv.appendChild(buildTableDiv);
        // generalDiv.appendChild(buildTableLabel);
        this.generalDiv.appendChild(this.bottomContainer);
        var style = createElement('input', {
            attrs: { 'type': 'checkbox' }, id: this.target.id + '_style',
        });
        this.leftBottomGeneralDiv.appendChild(this.buildTableLabel);
        this.leftBottomGeneralDiv.appendChild(style);
        this.style = new CheckBox({ label: locale.getConstant('Styles'), enableRtl: isRtl, checked: true, change: this.changeStyleValue });
        this.style.appendTo(style);
        this.table = createElement('TABLE', { styles: 'margin-top:3px;' });
        this.tr1 = createElement('tr');
        this.td1 = createElement('td', { styles: 'width:120px;padding-left:10px;' });
        this.availableLabel = createElement('label', {
            innerHTML: locale.getConstant('Available styles'), className: 'e-de-toc-dlg-main-heading e-de-toc-dlg-sub-level-heading', id: this.target.id + '_availableLabel'
        });
        this.td1.appendChild(this.availableLabel);
        this.td2 = createElement('td');
        this.tocLabel = createElement('label', {
            innerHTML: locale.getConstant('TOC level') + ':', className: 'e-de-toc-dlg-main-heading e-de-toc-dlg-sub-level-heading',
            id: this.target.id + '_tocLabel'
        });
        this.td2.appendChild(this.tocLabel);
        this.tr1.appendChild(this.td1);
        this.tr1.appendChild(this.td2);
        this.table.appendChild(this.tr1);
        this.tableDiv = createElement('div', { id: 'table_div', className: 'e-de-toc-table-div' });
        this.table1 = createElement('TABLE');
        this.tr2 = createElement('tr');
        this.td3 = createElement('td');
        this.heading1Label = createElement('label', {
            innerHTML: locale.getConstant('Heading') + ' 1',
            className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading1Label'
        });
        this.td3.appendChild(this.heading1Label);
        this.td4 = createElement('td');
        this.heading1 = createElement('input', { id: '_heading1', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 1' } });
        this.heading1.value = '1';
        this.heading1.addEventListener('keyup', this.changeStyleClickHandler);
        this.td4.appendChild(this.heading1);
        this.tr2.appendChild(this.td3);
        this.tr2.appendChild(this.td4);
        this.tr3 = createElement('tr');
        this.td5 = createElement('td');
        this.heading2Label = createElement('label', {
            innerHTML: locale.getConstant('Heading') + ' 2',
            className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading2Label'
        });
        this.td5.appendChild(this.heading2Label);
        this.td6 = createElement('td');
        this.heading2 = createElement('input', { id: '_heading2', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 2' } });
        this.heading2.value = '2';
        this.heading2.addEventListener('keyup', this.changeStyleClickHandler);
        this.td6.appendChild(this.heading2);
        this.tr3.appendChild(this.td5);
        this.tr3.appendChild(this.td6);
        this.tr4 = createElement('tr');
        this.td7 = createElement('td');
        this.heading3Label = createElement('label', {
            innerHTML: locale.getConstant('Heading') + ' 3',
            className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading3Label'
        });
        this.td7.appendChild(this.heading3Label);
        this.td8 = createElement('td');
        this.heading3 = createElement('input', { id: '_heading3', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 3' } });
        this.heading3.value = '3';
        this.heading3.addEventListener('keyup', this.changeStyleClickHandler);
        this.td8.appendChild(this.heading3);
        this.tr4.appendChild(this.td7);
        this.tr4.appendChild(this.td8);
        this.tr5 = createElement('tr');
        this.td9 = createElement('td');
        this.heading4Label = createElement('label', {
            innerHTML: locale.getConstant('Heading') + ' 4',
            className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading4Label'
        });
        this.td9.appendChild(this.heading4Label);
        this.td10 = createElement('td');
        this.heading4 = createElement('input', { id: '_heading4', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 4' } });
        this.heading4.addEventListener('keyup', this.changeStyleClickHandler);
        this.td10.appendChild(this.heading4);
        this.tr5.appendChild(this.td9);
        this.tr5.appendChild(this.td10);
        this.tr6 = createElement('tr');
        this.td11 = createElement('td');
        this.heading5Label = createElement('label', {
            innerHTML: locale.getConstant('Heading') + ' 5',
            className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading5Label'
        });
        this.td11.appendChild(this.heading5Label);
        this.td12 = createElement('td');
        this.heading5 = createElement('input', { id: '_heading5', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 5' } });
        this.heading5.addEventListener('keyup', this.changeStyleClickHandler);
        this.td12.appendChild(this.heading5);
        this.tr6.appendChild(this.td11);
        this.tr6.appendChild(this.td12);
        this.tr7 = createElement('tr');
        this.td13 = createElement('td');
        this.heading6Label = createElement('label', {
            innerHTML: locale.getConstant('Heading') + ' 6',
            className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading6Label'
        });
        this.td13.appendChild(this.heading6Label);
        this.td14 = createElement('td');
        this.heading6 = createElement('input', { id: '_heading6', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 6' } });
        this.heading6.addEventListener('keyup', this.changeStyleClickHandler);
        this.td14.appendChild(this.heading6);
        this.tr7.appendChild(this.td13);
        this.tr7.appendChild(this.td14);
        this.tr8 = createElement('tr');
        this.td15 = createElement('td');
        this.heading7Label = createElement('label', {
            innerHTML: locale.getConstant('Heading') + ' 7',
            className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading7Label'
        });
        this.td15.appendChild(this.heading7Label);
        this.td16 = createElement('td');
        this.heading7 = createElement('input', { id: '_heading7', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 7' } });
        this.heading7.addEventListener('keyup', this.changeStyleClickHandler);
        this.td16.appendChild(this.heading7);
        this.tr8.appendChild(this.td15);
        this.tr8.appendChild(this.td16);
        this.tr9 = createElement('tr');
        this.td17 = createElement('td');
        this.heading8Label = createElement('label', {
            innerHTML: locale.getConstant('Heading') + ' 8',
            className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading8Label'
        });
        this.td17.appendChild(this.heading8Label);
        this.td18 = createElement('td');
        this.heading8 = createElement('input', { id: '_heading8', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 8' } });
        this.heading8.addEventListener('keyup', this.changeStyleClickHandler);
        this.td18.appendChild(this.heading8);
        this.tr9.appendChild(this.td17);
        this.tr9.appendChild(this.td18);
        this.tr10 = createElement('tr');
        this.td19 = createElement('td');
        this.heading9Label = createElement('label', {
            innerHTML: locale.getConstant('Heading') + ' 9',
            className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_heading9Label'
        });
        this.td19.appendChild(this.heading9Label);
        this.td20 = createElement('td');
        this.heading9 = createElement('input', { id: '_heading9', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Heading') + ' 9' } });
        this.heading9.addEventListener('keyup', this.changeStyleClickHandler);
        this.td20.appendChild(this.heading9);
        this.tr10.appendChild(this.td19);
        this.tr10.appendChild(this.td20);
        this.tr12 = createElement('tr');
        this.td23 = createElement('td');
        this.normalLabel = createElement('label', {
            innerHTML: locale.getConstant('Normal'),
            className: 'e-de-toc-dlg-sub-heading', id: this.target.id + '_normalLabel'
        });
        this.td23.appendChild(this.normalLabel);
        this.td24 = createElement('td');
        this.normal = createElement('input', { id: '_normal', className: 'e-input e-de-toc-dlg-toc-level', attrs: { 'aria-label': locale.getConstant('Normal') } });
        this.normal.addEventListener('keyup', this.changingStyleClickHandler);
        this.td24.appendChild(this.normal);
        this.tr12.appendChild(this.td23);
        this.tr12.appendChild(this.td24);
        if (isRtl) {
            this.normal.classList.add('e-de-rtl');
            this.heading1.classList.add('e-de-rtl');
            this.heading2.classList.add('e-de-rtl');
            this.heading3.classList.add('e-de-rtl');
            this.heading4.classList.add('e-de-rtl');
            this.heading5.classList.add('e-de-rtl');
            this.heading6.classList.add('e-de-rtl');
            this.heading7.classList.add('e-de-rtl');
            this.heading8.classList.add('e-de-rtl');
            this.heading9.classList.add('e-de-rtl');
        }
        this.table1.appendChild(this.tr2);
        this.table1.appendChild(this.tr3);
        this.table1.appendChild(this.tr4);
        this.table1.appendChild(this.tr5);
        this.table1.appendChild(this.tr6);
        this.table1.appendChild(this.tr7);
        this.table1.appendChild(this.tr8);
        this.table1.appendChild(this.tr9);
        this.table1.appendChild(this.tr10);
        this.table1.appendChild(this.tr12);
        this.tableDiv.appendChild(this.table1);
        this.stylesLevelDiv = createElement('div', { className: 'e-de-toc-styles-table-div' });
        this.stylesLevelDiv.appendChild(this.table);
        this.stylesLevelDiv.appendChild(this.tableDiv);
        this.leftBottomGeneralDiv.appendChild(this.stylesLevelDiv);
        //leftBottomGeneralDiv.appendChild(table); leftBottomGeneralDiv.appendChild(tableDiv);
        this.fieldsDiv = createElement('div', { id: 'fields_div', styles: 'display: flex;' });
        this.leftBottomGeneralDiv.appendChild(this.fieldsDiv);
        this.outDiv = createElement('div', { id: 'out_div' });
        this.outlineDiv = createElement('div', { id: 'outline_div', className: 'e-de-toc-dlg-sub-container e-de-toc-dlg-outline-levels' });
        this.outline1 = createElement('input', {
            attrs: { 'type': 'checkbox' }, id: '_outline'
        });
        this.outlineDiv.appendChild(this.outline1);
        this.outDiv.appendChild(this.outlineDiv);
        this.fieldsDiv.appendChild(this.outDiv);
        this.outline = new CheckBox({
            label: locale.getConstant('Outline levels'),
            enableRtl: isRtl, checked: true, cssClass: 'e-de-outline-rtl'
        });
        this.outline.appendTo(this.outline1);
        this.resetButtonDiv = createElement('div', { className: 'e-de-toc-reset-button' });
        this.fieldsDiv.appendChild(this.resetButtonDiv);
        this.resetElement = createElement('button', {
            innerHTML: locale.getConstant('Reset'), id: 'reset',
            attrs: { type: 'button' }
        });
        this.resetButtonDiv.appendChild(this.resetElement);
        this.resetButton = new Button({ cssClass: 'e-btn e-flat' });
        this.resetButton.appendTo(this.resetElement);
        this.resetElement.addEventListener('click', this.resetClickHandler);
        // let tocStylesDiv: HTMLDivElement = createElement('div', { id: 'tocStyles_div', className: 'e-de-toc-dlg-sub-container' }) as HTMLDivElement;
        this.tocStylesLabel = createElement('div', {
            id: ownerId + '_tocStylesLabel', className: 'e-de-toc-dlg-main-heading',
            innerHTML: locale.getConstant('Styles') + ':'
        });
        //rightBottomGeneralDiv.appendChild(tocStylesDiv);
        this.rightBottomGeneralDiv.appendChild(this.tocStylesLabel);
        this.textBoxDiv = createElement('div');
        this.rightBottomGeneralDiv.appendChild(this.textBoxDiv);
        this.textBoxInput = createElement('input', { className: 'e-input', attrs: { 'aria-label': 'Type of TOC' } });
        this.textBoxInput.setAttribute('type', 'text');
        this.textBoxDiv.appendChild(this.textBoxInput);
        this.listViewDiv = createElement('div', { className: 'e-de-toc-list-view' });
        var styleLocale = ['TOC 1', 'TOC 2', 'TOC 3', 'TOC 4', 'TOC 5', 'TOC 6', 'TOC 7', 'TOC 8', 'TOC 9'];
        var styleValues = this.styleLocaleValue(styleLocale, locale);
        this.listViewInstance = new ListView({ dataSource: styleValues, cssClass: 'e-toc-list-view' });
        this.listViewInstance.appendTo(this.listViewDiv);
        this.listViewInstance.addEventListener('select', this.selectHandlerClickHandler);
        this.rightBottomGeneralDiv.appendChild(this.listViewDiv);
        this.modifyButtonDiv = createElement('div', { className: 'e-de-toc-modify-button' });
        this.rightBottomGeneralDiv.appendChild(this.modifyButtonDiv);
        this.modifyElement = createElement('button', {
            innerHTML: locale.getConstant('Modify') + '...', id: 'modify',
            attrs: { type: 'button' }
        });
        this.modifyButtonDiv.appendChild(this.modifyElement);
        this.modifyButton = new Button({ cssClass: 'e-btn e-flat' });
        this.modifyButton.appendTo(this.modifyElement);
        this.modifyElement.addEventListener('click', this.showDialogHandler);
        if (isRtl) {
            this.resetButtonDiv.classList.add('e-de-rtl');
            this.tocStylesLabel.classList.add('e-de-rtl');
            this.textBoxDiv.classList.add('e-de-rtl');
            this.listViewDiv.classList.add('e-de-rtl');
            this.modifyButtonDiv.classList.add('e-de-rtl');
        }
    };
    TableOfContentsDialog.prototype.styleLocaleValue = function (styleLocale, localValue) {
        var styleName = [];
        for (var index = 0; index < styleLocale.length; index++) {
            styleName.push(localValue.getConstant(styleLocale[index]));
        }
        return styleName;
    };
    /**
     * @private
     */
    TableOfContentsDialog.prototype.show = function () {
        var localValue = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        localValue.setLocale(this.documentHelper.owner.locale);
        if (!this.target) {
            this.initTableOfContentDialog(localValue, this.documentHelper.owner.enableRtl);
        }
        this.documentHelper.dialog3.header = localValue.getConstant('Table of Contents');
        this.documentHelper.dialog3.position = { X: 'center', Y: 'center' };
        this.documentHelper.dialog3.width = 'auto';
        this.documentHelper.dialog3.height = 'auto';
        this.documentHelper.dialog3.content = this.target;
        this.documentHelper.dialog3.beforeOpen = this.loadTableofContentDialog;
        this.documentHelper.dialog3.close = this.closeTableOfContentDialog;
        this.documentHelper.dialog3.buttons = [{
                click: this.applyTableOfContentProperties,
                buttonModel: { content: localValue.getConstant('Ok'), cssClass: 'e-flat e-toc-okay', isPrimary: true }
            },
            {
                click: this.onCancelButtonClick,
                buttonModel: { content: localValue.getConstant('Cancel'), cssClass: 'e-flat e-toc-cancel' }
            }];
        this.documentHelper.dialog3.dataBind();
        this.documentHelper.dialog3.show();
    };
    TableOfContentsDialog.prototype.onSelectHandlerClick = function (args) {
        this.selectHandler(args);
    };
    TableOfContentsDialog.prototype.onShowDialog = function () {
        this.showStyleDialog();
    };
    TableOfContentsDialog.prototype.changeShowLevelValue = function (event) {
        var levels = event.value;
        var values = [];
        switch (levels) {
            case 1:
                values = ['1', null, null, null, null, null, null, null, null];
                this.changeByValue(values);
                break;
            case 2:
                values = ['1', '2', null, null, null, null, null, null, null];
                this.changeByValue(values);
                break;
            case 3:
                values = ['1', '2', '3', null, null, null, null, null, null];
                this.changeByValue(values);
                break;
            case 4:
                values = ['1', '2', '3', '4', null, null, null, null, null];
                this.changeByValue(values);
                break;
            case 5:
                values = ['1', '2', '3', '4', '5', null, null, null, null];
                this.changeByValue(values);
                break;
            case 6:
                values = ['1', '2', '3', '4', '5', '6', null, null, null];
                this.changeByValue(values);
                break;
            case 7:
                values = ['1', '2', '3', '4', '5', '6', '7', null, null];
                this.changeByValue(values);
                break;
            case 8:
                values = ['1', '2', '3', '4', '5', '6', '7', '8', null];
                this.changeByValue(values);
                break;
            case 9:
                values = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
                this.changeByValue(values);
                break;
        }
    };
    TableOfContentsDialog.prototype.changeByValue = function (headings) {
        this.heading1.value = headings[0];
        this.heading2.value = headings[1];
        this.heading3.value = headings[2];
        this.heading4.value = headings[3];
        this.heading5.value = headings[4];
        this.heading6.value = headings[5];
        this.heading7.value = headings[6];
        this.heading8.value = headings[7];
        this.heading9.value = headings[8];
    };
    TableOfContentsDialog.prototype.onResetClick = function () {
        this.reset();
    };
    TableOfContentsDialog.prototype.onChangeStyleClick = function (args) {
        this.changeStyle(args);
    };
    TableOfContentsDialog.prototype.initAlertDialog = function (isvalid) {
        var localValue = new L10n("documenteditor", this.documentHelper.owner.defaultLocale);
        localValue.setLocale(this.documentHelper.owner.locale);
        var dialogContent = isvalid ? localValue.getConstant("The number must be between") : localValue.getConstant("The Invalid number");
        DialogUtility.alert({
            title: localValue.getConstant("Information"),
            content: dialogContent,
            closeOnEscape: true,
            showCloseIcon: true,
            position: { X: "center", Y: "center" },
        }).enableRtl = this.documentHelper.owner.enableRtl;
    };
    TableOfContentsDialog.prototype.checkLevel = function () {
        if (this.heading1.value !== '') {
            this.showLevel.value = 1;
        }
        if (this.heading2.value !== '') {
            this.showLevel.value = 2;
        }
        if (this.heading3.value !== '') {
            this.showLevel.value = 3;
        }
        if (this.heading4.value !== '') {
            this.showLevel.value = 4;
        }
        if (this.heading5.value !== '') {
            this.showLevel.value = 5;
        }
        if (this.heading6.value !== '') {
            this.showLevel.value = 6;
        }
        if (this.heading7.value !== '') {
            this.showLevel.value = 7;
        }
        if (this.heading8.value !== '') {
            this.showLevel.value = 8;
        }
        if (this.heading9.value !== '') {
            this.showLevel.value = 9;
        }
    };
    TableOfContentsDialog.prototype.getElementValue = function (element) {
        switch (element) {
            case this.heading1:
                return '1';
            case this.heading2:
                return '2';
            case this.heading3:
                return '3';
            case this.heading4:
                return '4';
            case this.heading5:
                return '5';
            case this.heading6:
                return '6';
            case this.heading7:
                return '7';
            case this.heading8:
                return '8';
            case this.heading9:
                return '9';
            default:
                return '1';
        }
    };
    TableOfContentsDialog.prototype.onChangingStyleClick = function (args) {
        this.changeHeadingStyle(args);
    };
    TableOfContentsDialog.prototype.getHeadingLevel = function (index) {
        switch (index) {
            case 1:
                return parseInt(this.heading1.value);
            case 2:
                return parseInt(this.heading2.value);
            case 3:
                return parseInt(this.heading3.value);
            case 4:
                return parseInt(this.heading4.value);
            case 5:
                return parseInt(this.heading5.value);
            case 6:
                return parseInt(this.heading6.value);
            case 7:
                return parseInt(this.heading7.value);
            case 8:
                return parseInt(this.heading8.value);
            case 9:
                return parseInt(this.heading9.value);
            default:
                return 0;
        }
    };
    TableOfContentsDialog.prototype.applyLevelSetting = function (tocSettings) {
        tocSettings.levelSettings = {};
        var headingPrefix = 'Heading ';
        var newStartLevel = 0;
        var newEndLevel = 0;
        var isEndLevel = false;
        for (var i = 1; i <= tocSettings.endLevel; i++) {
            var outlineLevelValue = this.getTOCInputValue(i);
            var outlineLevel = this.getHeadingLevel(i);
            if (i === outlineLevel && outlineLevelValue.match(/^[0-9]+$/)) {
                if (newStartLevel === 0) {
                    newStartLevel = i;
                    isEndLevel = false;
                }
                if (!isEndLevel) {
                    newEndLevel = i;
                }
            }
            else {
                isEndLevel = true;
                if (!outlineLevelValue.match(/^[0-9]+$/)) {
                    this.initAlertDialog(false);
                    return false;
                }
                else if (outlineLevel < 1 || outlineLevel > 9) {
                    this.initAlertDialog(true);
                    return false;
                }
                else {
                    var headingStyle = headingPrefix + i.toString();
                    tocSettings.levelSettings[headingStyle] = outlineLevel;
                }
            }
        }
        tocSettings.startLevel = newStartLevel;
        tocSettings.endLevel = newEndLevel;
        if (newEndLevel) {
            for (var j = newEndLevel + 1; j <= 9; j++) {
                var outlineHeader = this.getTOCInputValue(j);
                var outlineLevel = this.getHeadingLevel(j);
                if (!outlineHeader.match(/^[0-9]+$/) && outlineHeader !== "") {
                    this.initAlertDialog(false);
                    return false;
                }
                else {
                    if (outlineLevel < 1 || outlineLevel > 9) {
                        this.initAlertDialog(true);
                        return false;
                    }
                }
            }
        }
        if (this.normal.value !== '') {
            var normalvalue = parseInt(this.normal.value);
            if (!this.normal.value.match(/^[0-9]+$/)) {
                this.initAlertDialog(false);
                return false;
            }
            else if (normalvalue < 1 || normalvalue > 9) {
                this.initAlertDialog(true);
                return false;
            }
            else {
                tocSettings.levelSettings["Normal"] = normalvalue;
            }
        }
        return true;
    };
    TableOfContentsDialog.prototype.getTOCInputValue = function (input) {
        switch (input) {
            case 1:
                return this.heading1.value;
            case 2:
                return this.heading2.value;
            case 3:
                return this.heading3.value;
            case 4:
                return this.heading4.value;
            case 5:
                return this.heading5.value;
            case 6:
                return this.heading6.value;
            case 7:
                return this.heading7.value;
            case 8:
                return this.heading8.value;
            case 9:
                return this.heading9.value;
            default:
                return "";
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TableOfContentsDialog.prototype.destroy = function () {
        if (this.pageNumber) {
            this.pageNumber.destroy();
            this.pageNumber = undefined;
        }
        if (this.rightAlign) {
            this.rightAlign.destroy();
            this.rightAlign = undefined;
        }
        if (this.tabLeader) {
            this.tabLeader.destroy();
            this.tabLeader = undefined;
        }
        if (this.showLevel) {
            this.showLevel.destroy();
            this.showLevel = undefined;
        }
        if (this.hyperlink) {
            this.hyperlink.destroy();
            this.hyperlink = undefined;
        }
        if (this.style) {
            this.style.destroy();
            this.style = undefined;
        }
        if (this.outline) {
            this.outline.destroy();
            this.outline = undefined;
        }
        if (this.listViewInstance) {
            this.listViewInstance.destroy();
            this.listViewInstance = undefined;
        }
        this.removeEvents();
        this.removeElements();
        this.heading1 = undefined;
        this.heading2 = undefined;
        this.heading3 = undefined;
        this.heading4 = undefined;
        this.heading5 = undefined;
        this.heading6 = undefined;
        this.heading7 = undefined;
        this.heading8 = undefined;
        this.heading9 = undefined;
        this.normal = undefined;
        this.textBoxInput = undefined;
        this.documentHelper = undefined;
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            for (var count = 0; count < this.target.childNodes.length; count++) {
                this.target.removeChild(this.target.childNodes[count]);
                count--;
            }
            this.target = undefined;
        }
    };
    TableOfContentsDialog.prototype.removeEvents = function () {
        if (this.heading1) {
            this.heading1.removeEventListener('keyup', this.changeStyleClickHandler);
        }
        if (this.heading2) {
            this.heading2.removeEventListener('keyup', this.changeStyleClickHandler);
        }
        if (this.heading3) {
            this.heading3.removeEventListener('keyup', this.changeStyleClickHandler);
        }
        if (this.heading4) {
            this.heading4.removeEventListener('keyup', this.changeStyleClickHandler);
        }
        if (this.heading5) {
            this.heading5.removeEventListener('keyup', this.changeStyleClickHandler);
        }
        if (this.heading6) {
            this.heading6.removeEventListener('keyup', this.changeStyleClickHandler);
        }
        if (this.heading7) {
            this.heading7.removeEventListener('keyup', this.changeStyleClickHandler);
        }
        if (this.heading8) {
            this.heading8.removeEventListener('keyup', this.changeStyleClickHandler);
        }
        if (this.heading9) {
            this.heading9.removeEventListener('keyup', this.changeStyleClickHandler);
        }
        if (this.normal) {
            this.normal.removeEventListener('keyup', this.changingStyleClickHandler);
        }
        if (this.resetElement) {
            this.resetElement.removeEventListener('click', this.resetClickHandler);
        }
        if (this.listViewInstance) {
            this.listViewInstance.removeEventListener('select', this.selectHandlerClickHandler);
        }
        if (this.modifyElement) {
            this.modifyElement.removeEventListener('click', this.showDialogHandler);
        }
    };
    TableOfContentsDialog.prototype.removeElements = function () {
        if (this.generalDiv) {
            this.generalDiv.remove();
            this.generalDiv = undefined;
        }
        if (this.genLabel) {
            this.genLabel.remove();
            this.genLabel = undefined;
        }
        if (this.topContainer) {
            this.topContainer.remove();
            this.topContainer = undefined;
        }
        if (this.leftGeneralDiv) {
            this.leftGeneralDiv.remove();
            this.leftGeneralDiv = undefined;
        }
        if (this.rightGeneralDiv) {
            this.rightGeneralDiv.remove();
            this.rightGeneralDiv = undefined;
        }
        if (this.bottomContainer) {
            this.bottomContainer.remove();
            this.bottomContainer = undefined;
        }
        if (this.leftBottomGeneralDiv) {
            this.leftBottomGeneralDiv.remove();
            this.leftBottomGeneralDiv = undefined;
        }
        if (this.rightBottomGeneralDiv) {
            this.rightBottomGeneralDiv.remove();
            this.rightBottomGeneralDiv = undefined;
        }
        if (this.pageNumberDiv) {
            this.pageNumberDiv.remove();
            this.pageNumberDiv = undefined;
        }
        if (this.pageNumber1) {
            this.pageNumber1.remove();
            this.pageNumber1 = undefined;
        }
        if (this.rightAlignDiv) {
            this.rightAlignDiv.remove();
            this.rightAlignDiv = undefined;
        }
        if (this.rightAlign1) {
            this.rightAlign1.remove();
            this.rightAlign1 = undefined;
        }
        if (this.tabDivContainer) {
            this.tabDivContainer.remove();
            this.tabDivContainer = undefined;
        }
        if (this.tabDiv) {
            this.tabDiv.remove();
            this.tabDiv = undefined;
        }
        if (this.tabLeaderLabelDiv) {
            this.tabLeaderLabelDiv.remove();
            this.tabLeaderLabelDiv = undefined;
        }
        if (this.tabLeaderLabel) {
            this.tabLeaderLabel.remove();
            this.tabLeaderLabel = undefined;
        }
        if (this.tabLeaderDiv) {
            this.tabLeaderDiv.remove();
            this.tabLeaderDiv = undefined;
        }
        if (this.tabLeader1) {
            this.tabLeader1.remove();
            this.tabLeader1 = undefined;
        }
        if (this.hyperlink1) {
            this.hyperlink1.remove();
            this.hyperlink1 = undefined;
        }
        if (this.hyperlink1) {
            this.hyperlink1.remove();
            this.hyperlink1 = undefined;
        }
        if (this.showDiv) {
            this.showDiv.remove();
            this.showDiv = undefined;
        }
        if (this.showLevelLabelDiv) {
            this.showLevelLabelDiv.remove();
            this.showLevelLabelDiv = undefined;
        }
        if (this.showLevelLabel) {
            this.showLevelLabel.remove();
            this.showLevelLabel = undefined;
        }
        if (this.showLevelDiv) {
            this.showLevelDiv.remove();
            this.showLevelDiv = undefined;
        }
        if (this.showLevel1) {
            this.showLevel1.remove();
            this.showLevel1 = undefined;
        }
        if (this.buildTableLabel) {
            this.buildTableLabel.remove();
            this.buildTableLabel = undefined;
        }
        if (this.table) {
            this.table.remove();
            this.table = undefined;
        }
        if (this.tr1) {
            this.tr1.remove();
            this.tr1 = undefined;
        }
        if (this.td1) {
            this.td1.remove();
            this.td1 = undefined;
        }
        if (this.availableLabel) {
            this.availableLabel.remove();
            this.availableLabel = undefined;
        }
        if (this.td2) {
            this.td2.remove();
            this.td2 = undefined;
        }
        if (this.tocLabel) {
            this.tocLabel.remove();
            this.tocLabel = undefined;
        }
        if (this.tableDiv) {
            this.tableDiv.remove();
            this.tableDiv = undefined;
        }
        if (this.table1) {
            this.table1.remove();
            this.table1 = undefined;
        }
        if (this.tr2) {
            this.tr2.remove();
            this.tr2 = undefined;
        }
        if (this.td3) {
            this.td3.remove();
            this.td3 = undefined;
        }
        if (this.heading1Label) {
            this.heading1Label.remove();
            this.heading1Label = undefined;
        }
        if (this.td4) {
            this.td4.remove();
            this.td4 = undefined;
        }
        if (this.tr3) {
            this.tr3.remove();
            this.tr3 = undefined;
        }
        if (this.td5) {
            this.td5.remove();
            this.td5 = undefined;
        }
        if (this.heading2Label) {
            this.heading2Label.remove();
            this.heading2Label = undefined;
        }
        if (this.td6) {
            this.td6.remove();
            this.td6 = undefined;
        }
        if (this.tr4) {
            this.tr4.remove();
            this.tr4 = undefined;
        }
        if (this.td7) {
            this.td7.remove();
            this.td7 = undefined;
        }
        if (this.heading3Label) {
            this.heading3Label.remove();
            this.heading3Label = undefined;
        }
        if (this.td8) {
            this.td8.remove();
            this.td8 = undefined;
        }
        if (this.tr5) {
            this.tr5.remove();
            this.tr5 = undefined;
        }
        if (this.td9) {
            this.td9.remove();
            this.td9 = undefined;
        }
        if (this.heading4Label) {
            this.heading4Label.remove();
            this.heading4Label = undefined;
        }
        if (this.td10) {
            this.td10.remove();
            this.td10 = undefined;
        }
        if (this.tr6) {
            this.tr6.remove();
            this.tr6 = undefined;
        }
        if (this.td11) {
            this.td11.remove();
            this.td11 = undefined;
        }
        if (this.heading5Label) {
            this.heading5Label.remove();
            this.heading5Label = undefined;
        }
        if (this.td12) {
            this.td12.remove();
            this.td12 = undefined;
        }
        if (this.tr7) {
            this.tr7.remove();
            this.tr7 = undefined;
        }
        if (this.td13) {
            this.td13.remove();
            this.td13 = undefined;
        }
        if (this.heading6Label) {
            this.heading6Label.remove();
            this.heading6Label = undefined;
        }
        if (this.td14) {
            this.td14.remove();
            this.td14 = undefined;
        }
        if (this.tr8) {
            this.tr8.remove();
            this.tr8 = undefined;
        }
        if (this.td15) {
            this.td15.remove();
            this.td15 = undefined;
        }
        if (this.heading7Label) {
            this.heading7Label.remove();
            this.heading7Label = undefined;
        }
        if (this.td16) {
            this.td16.remove();
            this.td16 = undefined;
        }
        if (this.tr9) {
            this.tr9.remove();
            this.tr9 = undefined;
        }
        if (this.td17) {
            this.td17.remove();
            this.td17 = undefined;
        }
        if (this.heading8Label) {
            this.heading8Label.remove();
            this.heading8Label = undefined;
        }
        if (this.td18) {
            this.td18.remove();
            this.td18 = undefined;
        }
        if (this.tr10) {
            this.tr10.remove();
            this.tr10 = undefined;
        }
        if (this.td19) {
            this.td19.remove();
            this.td19 = undefined;
        }
        if (this.heading9Label) {
            this.heading9Label.remove();
            this.heading9Label = undefined;
        }
        if (this.td20) {
            this.td20.remove();
            this.td20 = undefined;
        }
        if (this.tr12) {
            this.tr12.remove();
            this.tr12 = undefined;
        }
        if (this.td23) {
            this.td23.remove();
            this.td23 = undefined;
        }
        if (this.normalLabel) {
            this.normalLabel.remove();
            this.normalLabel = undefined;
        }
        if (this.td24) {
            this.td24.remove();
            this.td24 = undefined;
        }
        if (this.stylesLevelDiv) {
            this.stylesLevelDiv.remove();
            this.stylesLevelDiv = undefined;
        }
        if (this.fieldsDiv) {
            this.fieldsDiv.remove();
            this.fieldsDiv = undefined;
        }
        if (this.outDiv) {
            this.outDiv.remove();
            this.outDiv = undefined;
        }
        if (this.outlineDiv) {
            this.outlineDiv.remove();
            this.outlineDiv = undefined;
        }
        if (this.outline1) {
            this.outline1.remove();
            this.outline1 = undefined;
        }
        if (this.resetButtonDiv) {
            this.resetButtonDiv.remove();
            this.resetButtonDiv = undefined;
        }
        if (this.resetElement) {
            this.resetElement.remove();
            this.resetElement = undefined;
        }
        if (this.resetButton) {
            this.resetButton.destroy();
            this.resetButton = undefined;
        }
        if (this.tocStylesLabel) {
            this.tocStylesLabel.remove();
            this.tocStylesLabel = undefined;
        }
        if (this.textBoxDiv) {
            this.textBoxDiv.remove();
            this.textBoxDiv = undefined;
        }
        if (this.listViewDiv) {
            this.listViewDiv.remove();
            this.listViewDiv = undefined;
        }
        if (this.modifyButtonDiv) {
            this.modifyButtonDiv.remove();
            this.modifyButtonDiv = undefined;
        }
        if (this.modifyElement) {
            this.modifyElement.remove();
            this.modifyElement = undefined;
        }
        if (this.modifyButton) {
            this.modifyButton.destroy();
            this.modifyButton = undefined;
        }
    };
    return TableOfContentsDialog;
}());
export { TableOfContentsDialog };
