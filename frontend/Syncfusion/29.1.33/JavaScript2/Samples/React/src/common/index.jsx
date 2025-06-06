import { createRoot } from 'react-dom/client';
import * as React from 'react';
import { Ajax, Animation, L10n, setCulture, setCurrencyCode, loadCldr, Browser, createElement, closest, enableRipple, select, selectAll, registerLicense, getComponent } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-react-buttons';
import { ListBase } from '@syncfusion/ej2-react-lists';
import { DataManager, DataUtil, Query } from '@syncfusion/ej2-data';
import { Popup, Tooltip } from '@syncfusion/ej2-react-popups';
import { DropDownList } from '@syncfusion/ej2-react-dropdowns';
import * as elasticlunr from 'elasticlunr';
import * as searchJson from './search-index.json';
import { LeftPane, setSelectList } from './leftpane';
import { Sidebar } from '@syncfusion/ej2-navigations';
import { Locale } from './locale-string';
import { Content, initialize } from './component-content';
import '../../node_modules/es6-promise/dist/es6-promise';
import * as numberingSystems from '../common/cldr-data/supplemental/numberingSystems.json';
import * as currencyData from '../common/cldr-data/supplemental/currencyData.json';
import * as deCultureData from '../common/cldr-data/main/de/all.json';
import * as arCultureData from '../common/cldr-data/main/ar/all.json';
import * as swissCultureDate from '../common/cldr-data/main/fr-CH/all.json';
import * as enCultureData from '../common/cldr-data/main/en/all.json';
import * as chinaCultureData from '../common/cldr-data/main/zh/all.json';
import { useEffect, useState } from 'react';
let cBlock = ['ts-src-tab', 'html-src-tab'];
const matchedCurrency = {
    'en': 'USD',
    'de': 'EUR',
    'ar': 'AED',
    'zh': 'CNY',
    'fr-CH': 'CHF'
};
loadCldr(numberingSystems, chinaCultureData, enCultureData, swissCultureDate, currencyData, deCultureData, arCultureData);
L10n.load(Locale);
setCulture('en');
registerLicense('{SyncfusionJSLicensekey}');
/**
 * Mobile View.
 */
let isMobile = window.matchMedia('(max-width:550px)').matches;
/**
 * tablet mode
 */
let isTablet = window.matchMedia('(min-width:600px) and (max-width: 850px)').matches;
/**
 * PC mode
 */
let isPc = window.matchMedia('(min-width:850px)').matches;
let resizeManualTrigger = false;
/**
 * Themes to be redirect
 */
const themesToRedirect = ['material', 'material-dark', 'bootstrap4', 'bootstrap', 'bootstrap-dark', 'fabric', 'fabric-dark'];
/**
 * default theme on sample loaded
 */
export let selectedTheme = location.hash.split('/')[1] || localStorage.getItem('ej2-theme') || 'tailwind3';
localStorage.removeItem('ej2-theme');
const themeCollection = ['material3', 'bootstrap5', 'fluent2', 'tailwind3', 'fluent2-highcontrast', 'highcontrast', 'tailwind', 'fluent'];
let themeList = document.getElementById('themelist');
/**
 * Toggle Pane Animation
 */
let toggleAnim = new Animation({ duration: 500, timingFunction: 'ease' });
let leftToggle = select('#sb-toggle-left');
let sbRightPane = select('.sb-right-pane');
let sbContentOverlay = select('.sb-content-overlay');
let sbBodyOverlay = select('.sb-body-overlay');
let sbHeader = select('#sample-header');
let leftPane = select('.sb-left-pane');
let mobileOverlay = select('.sb-mobile-overlay');
let resetSearch = select('.sb-reset-icon');
export let sidebar;
let settingsidebar;
/**
 * SB Popups.
 */
let switcherPopup;
let themeSwitherPopup;
let searchPopup;
let settingsPopup;
let searchInstance;
let settingElement = select('.sb-setting-btn');
let openedPopup;
let headerThemeSwitch = document.getElementById('header-theme-switcher');
let prevAction;
let themeDropDown;
let themeModeDropDown;
let cultureDropDown;
let currencyDropDown;
let newYear = new Date().getFullYear();
let copyRight = document.querySelector('.sb-footer-copyright');
copyRight.innerHTML = "Copyright © 2001 - " + newYear + " Syncfusion<sup>®</sup> Inc.";
isMobile = window.matchMedia('(max-width:550px)').matches;
if (Browser.isDevice || isMobile) {
    if (sidebar) {
        sidebar.destroy();
    }
    sidebar = new Sidebar({ width: '280px', showBackdrop: true, closeOnDocumentClick: true, enableGestures: false, change: resizeFunction });
    sidebar.appendTo('#left-sidebar');
}
else {
    sidebar = new Sidebar({
        width: '282px', target: document.querySelector('.sb-content '),
        showBackdrop: false,
        closeOnDocumentClick: false,
        enableGestures: false,
        change: resizeFunction
    });
    sidebar.appendTo('#left-sidebar');
}
let openNew = new Tooltip({
    content: 'Open Next.js Demos'
});
openNew.appendTo('.sb-nextjs-wrapper');
/**
 * constant to process the sample url
 */
const urlRegex = /(npmci\.syncfusion\.com|ej2\.syncfusion\.com)(\/)(development|production)*/;
const sampleRegex = /#\/(([^\/]+\/)+[^\/\.]+)/;
const sbArray = ['angular', 'nextjs', 'typescript', 'javascript', 'aspnetcore', 'aspnetmvc', 'vue', 'blazor'];
const sbObj = { 'angular': 'angular', 'nextjs': 'nextjs', 'typescript': '', 'javascript': 'javascript', 'vue': 'vue', 'blazor': 'blazor' };
/**
 * constant for search operations
 */
let searchEle = select('#search-popup');
let inputele = select('#search-input');
let searchOverlay = select('.e-search-overlay');
let searchButton = document.getElementById('sb-trigger-search');
export let setResponsiveElement = select('.setting-responsive');
/**
 * Mouse or touch setting
 */
let switchText = localStorage.getItem('ej2-switch') || 'mouse';
if (Browser.isDevice || window.screen.width <= 850) {
    switchText = 'touch';
}
changeMouseOrTouch(switchText);
overlay();
/**
 * Mobile View
 */
const thememode = document.getElementById('theme-mode');
const mobilemodeicon = document.getElementById('mobile-mode-icon');
if (isMobile) {
    select('.sb-left-pane-footer').appendChild(select('.sb-footer-left'));
    select('#left-sidebar').classList.add('sb-hide');
    leftToggle.classList.remove('toggle-active');
    if (selectedTheme.includes('highcontrast')) {
        thememode.classList.add('hidden');
    }
    if (selectedTheme.includes('-dark')) {
        mobilemodeicon.classList.add('pane-light-theme');
    }
    else {
        mobilemodeicon.classList.add('pane-dark-theme');
    }
}
if (Browser.isDevice || isMobile) {
    leftToggle.setAttribute('aria-expanded', 'false');
    select('.sb-nextjs-mobile-wrapper').classList.toggle('sb-hide');
}
else {
    leftToggle.setAttribute('aria-expanded', 'true');
    select('.sb-nextjs-wrapper').classList.toggle('sb-hide');
}
/**
 * Tab View
 */
if (isTablet || (Browser.isDevice && isPc)) {
    leftToggle.classList.remove('toggle-active');
    select('.sb-right-pane').classList.add('control-fullview');
}
changeMouseOrTouch(switchText);
localStorage.removeItem('ej2-switch');
enableRipple((selectedTheme && selectedTheme.indexOf('material') !== -1) || !selectedTheme);
loadTheme(selectedTheme);
/**
 * SB Switch Link Updation
 */
export function setSbLink() {
    let hrefLink = location.hash.split('/').slice(1);
    let href = location.href = '#/' + selectedTheme + '/' + hrefLink.slice(1).join('/');
    let link = href.match(urlRegex);
    let sample = href.match(sampleRegex);
    for (let sb of sbArray) {
        let ele = select('#' + sb);
        if (sb === 'aspnetcore' || sb === 'aspnetmvc') {
            ele.href = sb === 'aspnetcore' ? 'https://ej2.syncfusion.com/aspnetcore/' : 'https://ej2.syncfusion.com/aspnetmvc/';
        }
        else if (sb === 'nextjs') {
            ele.href = 'https://ej2.syncfusion.com/nextjs/demos/' + sample[1];
        }
        else if (sb === 'blazor') {
            ele.href = 'https://blazor.syncfusion.com/demos/';
        }
        else if (sb === 'vue' && location.href.includes('grid/overview')) {
            ele.href = ((link) ? ('http://' + link[1] + '/' + (link[3] ? (link[3] + '/') : '')) : ('https://ej2.syncfusion.com/')) + 'vue/demos/#/' + selectedTheme + '/grid/grid-overview.html';
        }
        else {
            ele.href = ((link) ? ('http://' + link[1] + '/' + (link[3] ? (link[3] + '/') : '')) :
                ('https://ej2.syncfusion.com/')) + (sbObj[sb] ? (sb + '/') : '') +
                'demos/#/' + (sample ? (sample[1] + (sb !== 'typescript' ? '' : '.html')) : '');
        }
    }
}
/**
 * Set Mouse or Touch on page load
 */
function changeMouseOrTouch(str) {
    let activeEle = setResponsiveElement.querySelector('.active');
    if (activeEle) {
        activeEle.classList.remove('active');
    }
    if (str === 'mouse') {
        document.body.classList.remove('e-bigger');
    }
    else {
        document.body.classList.add('e-bigger');
    }
    setResponsiveElement.querySelector('#' + str).classList.add('active');
}
/**
 * Render Sample Browser Popups
 */
function renderSbPopups() {
    switcherPopup = new Popup(document.getElementById('sb-switcher-popup'), {
        relateTo: select('.sb-header-text-right'), position: { X: 'left' },
        collision: { X: 'flip', Y: 'flip' },
        offsetX: 0,
        offsetY: -15,
    });
    themeSwitherPopup = new Popup(document.getElementById('theme-switcher-popup'), {
        offsetY: 2,
        zIndex: 10012,
        relateTo: select('.theme-wrapper'), position: { X: 'left', Y: 'bottom' },
        collision: { X: 'flip', Y: 'flip' }
    });
    searchPopup = new Popup(searchEle, {
        offsetY: 5,
        relateTo: inputele, position: { X: 'left', Y: 'bottom' },
        collision: { X: 'flip', Y: 'flip' }
    });
    settingsPopup = new Popup(document.getElementById('settings-popup'), {
        offsetY: 5,
        zIndex: 10012,
        relateTo: settingElement,
        position: { X: 'right', Y: 'bottom' },
        collision: { X: 'flip', Y: 'flip' }
    });
    settingsidebar = new Sidebar({
        position: 'Right', width: '282', zIndex: '1003', showBackdrop: true, type: 'Over',
        closeOnDocumentClick: true, close: closeRightSidebar
    });
    settingsidebar.appendTo('#right-sidebar');
    if (!isMobile) {
        settingsidebar.hide();
        settingsPopup.hide();
    }
    else {
        select('.sb-mobile-preference').appendChild(select('#settings-popup'));
    }
    searchPopup.hide();
    switcherPopup.hide();
    themeSwitherPopup.hide();
    themeDropDown = new DropDownList({
        index: themeCollection.indexOf(selectedTheme.split('-')[0]),
        change: (e) => {
            if (selectedTheme.includes('-dark') && !e.value.includes('highcontrast')) {
                switchTheme(e.value + '-dark');
            }
            else {
                switchTheme(e.value);
            }
        }
    });
    themeModeDropDown = new DropDownList({
        index: selectedTheme.includes('-dark') ? 1 : 0,
        change: (e) => {
            const mode = e.value;
            if (mode === 'Dark' && !selectedTheme.includes('highcontrast')) {
                switchTheme(selectedTheme + '-dark');
            }
            else {
                switchTheme(selectedTheme.replace('-dark', ''));
            }
        }
    });
    cultureDropDown = new DropDownList({
        index: 0,
        change: (e) => {
            let value = e.value;
            currencyDropDown.value = matchedCurrency[value];
            setCulture(e.value);
            if (value == 'ar') {
                changeRtl(true);
            }
            else {
                changeRtl(false);
            }
        }
    });
    currencyDropDown = new DropDownList({
        index: 0,
        change: (e) => { setCurrencyCode(e.value); }
    });
    cultureDropDown.appendTo('#sb-setting-culture');
    currencyDropDown.appendTo('#sb-setting-currency');
    themeDropDown.appendTo('#sb-setting-theme');
    themeModeDropDown.appendTo('#sb-theme-mode');
    /**
     * add header to element
     */
    let prevbutton = new Button({ iconCss: 'sb-icons sb-icon-Previous', cssClass: 'e-flat' }, '#mobile-prev-sample');
    let nextbutton = new Button({
        iconCss: 'sb-icons sb-icon-Next',
        cssClass: 'e-flat', iconPosition: 'Right'
    }, '#mobile-next-sample');
}
function closeRightSidebar(args) {
    let targetEle = args.event ? args.event.target : null;
    if (targetEle && targetEle.closest('.e-popup'))
        args.cancel = true;
}
export function processDeviceDependables() {
    if (Browser.isDevice) {
        select('.sb-desktop-setting').classList.add('sb-hide');
    }
    else {
        select('.sb-desktop-setting').classList.remove('sb-hide');
    }
}
/**
 * Theme change function
 */
function changeTheme(e) {
    let target = e.target;
    target = closest(target, 'li');
    let themeName = target.id;
    const newTheme = (selectedTheme.includes('-dark') && !themeName.includes('highcontrast')) ? (themeName + '-dark') : themeName;
    switchTheme(newTheme);
    let imageEditorElem = document.querySelector(".e-image-editor");
    if (imageEditorElem != null) {
        let imageEditor = getComponent(document.getElementById(imageEditorElem.id), 'image-editor');
        imageEditor.theme = themeName;
    }
    // loadTheme(themeName);
}
function switchTheme(str) {
    str = str.includes('_') ? str.replace('_', '.') : str;
    let hash = location.hash.split('/');
    if (hash[1] !== str) {
        hash[1] = str;
        location.hash = hash.join('/');
        localStorage.setItem('ej2-switch', select('.active', setResponsiveElement).id);
        location.reload();
        setSbLink();
    }
}
searchOverlay.addEventListener('click', searchOverlayClick);
function searchOverlayClick() {
    toggleSearchOverlay();
}
/**
 * Header Click Event Handling
 */
function sbHeaderClick(action, preventSearch) {
    if (openedPopup) {
        openedPopup.hide(new Animation({ name: 'FadeOut', duration: 300, delay: 0 }));
    }
    if (preventSearch !== true && !searchOverlay.classList.contains('sb-hide')) {
        searchOverlay.classList.add('sb-hide');
        searchButton.classList.remove('active');
    }
    let curPopup;
    switch (action) {
        case 'changeSampleBrowser':
            curPopup = switcherPopup;
            break;
        case 'changeTheme':
            headerThemeSwitch.classList.toggle('active');
            curPopup = themeSwitherPopup;
            break;
        case 'toggleSettings':
            settingElement.classList.toggle('active');
            themeDropDown.index = themeCollection.indexOf(selectedTheme);
            curPopup = settingsPopup;
            break;
    }
    if (action === 'closePopup') {
        headerThemeSwitch.classList.remove('active');
        settingElement.classList.remove('active');
    }
    if (curPopup && curPopup !== openedPopup) {
        curPopup.show(new Animation({ name: 'FadeIn', duration: 400, delay: 0 }));
        openedPopup = curPopup;
    }
    else {
        openedPopup = null;
    }
    prevAction = action;
}
/**
 * toggle search overlay
 */
function toggleSearchOverlay() {
    sbHeaderClick('closePopup', true);
    inputele.value = '';
    searchPopup.hide();
    searchButton.classList.toggle('active');
    searchOverlay.classList.toggle('sb-hide');
    if (!searchOverlay.classList.contains('sb-hide')) {
        inputele.focus();
    }
}
/**
 * Storing the mouse action
 */
function setMouseOrTouch(e) {
    let ele = closest(e.target, '.sb-responsive-items');
    let switchType = ele.id;
    changeMouseOrTouch(switchType);
    sbHeaderClick('closePopup');
    localStorage.setItem('ej2-switch', switchType);
    location.reload();
}
function resizeFunction() {
    if (!isMobile && !isTablet) {
        resizeManualTrigger = true;
        setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 200);
    }
}
function resetInput(arg) {
    arg.preventDefault();
    arg.stopPropagation();
    document.getElementById('search-input').value = '';
    document.getElementById('search-input-wrapper').setAttribute('data-value', '');
    searchPopup.hide();
}
/**
 * Binding events for sample browser operations
 */
function bindEvents() {
    document.getElementById('sb-switcher').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('changeSampleBrowser');
    });
    document.getElementById('sb-switcher').addEventListener('keydown', function (e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            sbHeaderClick('changeSampleBrowser');
        }
    });
    select('.sb-header-text-right').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('changeSampleBrowser');
    });
    headerThemeSwitch.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('changeTheme');
    });
    headerThemeSwitch.addEventListener('keydown', function (e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            sbHeaderClick('changeTheme');
        }
    });
    themeList.addEventListener('click', changeTheme);
    document.addEventListener('click', sbHeaderClick.bind(this, 'closePopup'));
    settingElement.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('toggleSettings');
    });
    settingElement.addEventListener('keydown', function (e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            sbHeaderClick('toggleSettings');
        }
    });
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSearchOverlay();
    });
    searchButton.addEventListener('keydown', function (e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            toggleSearchOverlay();
        }
    });
    document.getElementById('settings-popup').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    inputele.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    inputele.addEventListener('keyup', onsearchInputChange);
    setResponsiveElement.addEventListener('click', setMouseOrTouch);
    leftToggle.addEventListener('click', toggleLeftPane);
    leftToggle.addEventListener('keydown', (e) => {
        if (e.keyCode === 13 || e.keyCode === 32) {
            toggleLeftPane();
        }
    });
    mobileOverlay.addEventListener('click', toggleMobileOverlay);
    select('.sb-header-settings').addEventListener('click', viewMobilePrefPane);
    resetSearch.addEventListener('click', resetInput);
    document.getElementById('switch-sb').addEventListener('click', (e) => {
        let target = closest(e.target, 'li');
        if (target) {
            let anchor = target.querySelector('a');
            if (anchor) {
                anchor.click();
            }
        }
    });
    /**
     * resize event
     */
    window.addEventListener('resize', processResize);
    select('.sb-right-pane').addEventListener('click', () => {
        if (isTablet && isLeftPaneOpen()) {
            toggleLeftPane();
        }
    });
    searchEle.addEventListener('click', (e) => {
        let curEle = closest(e.target, 'li');
        if (curEle && curEle.classList.contains('e-list-item')) {
            let tcontent = select('.e-text-content', curEle);
            let hashval = '#/' + selectedTheme + '/' + tcontent.getAttribute('data');
            inputele.value = '';
            searchPopup.hide();
            searchOverlay.classList.add('e-search-hidden');
            if (location.hash !== hashval) {
                overlay();
                location.hash = hashval;
                initialize();
                // setSelectList();
            }
        }
    });
}
/**
 * search input change
 */
function onsearchInputChange(e) {
    if (e.keyCode === 27) {
        toggleSearchOverlay();
    }
    let searchString = e.target.value;
    // changeInputIcons(searchString.length > 0);
    if (searchString.length <= 2) {
        searchPopup.hide();
        return;
    }
    let val = [];
    val = searchInstance.search(searchString, {
        fields: {
            component: { boost: 1 },
            name: { boost: 2 }
        },
        expand: true,
        boolean: 'AND',
    });
    val.map((item) => item['doc'] = searchInstance.documentStore.docs[item.ref]);
    let value = [];
    if (Browser.isDevice) {
        for (let file of val) {
            if (file.doc.hideOnDevice !== true || file.doc.hideOnDevice !== 'true') {
                value = value.concat(file);
            }
        }
    }
    let searchValue = Browser.isDevice ? value : val;
    if (searchValue.length) {
        let data = new DataManager(searchValue);
        let controls = data.executeLocal(new Query().take(10).select('doc'));
        let controlsAccess = [];
        for (let cont of controls) {
            controlsAccess.push(cont.doc);
        }
        let ds = DataUtil.group(controlsAccess, 'component');
        let dataSource = [];
        for (let j = 0; j < ds.length; j++) {
            let itemObj = ds[j].items;
            let field = 'name';
            let grpItem = {};
            let hdr = 'isHeader';
            grpItem[field] = ds[j].key;
            grpItem[hdr] = true;
            grpItem.items = itemObj;
            dataSource.push(grpItem);
            for (let k = 0; k < itemObj.length; k++) {
                dataSource.push(itemObj[k]);
            }
        }
        let ele = ListBase.createList(createElement, dataSource, {
            fields: { id: 'uid', groupBy: 'component', text: 'name' },
            template: '<div class="e-text-content e-icon-wrapper" data="${path}" uid="${uid}">' +
                '<span class="e-list-text">' +
                '${name}</span></div>',
            groupTemplate: '${if(items[0]["component"])}<div class="e-text-content"><span class="e-search-group">${items[0].component}</span>' +
                '</div>${/if}'
        });
        searchPopup.element.innerHTML = '';
        highlight(searchString, ele);
        searchPopup.element.appendChild(ele);
        searchPopup.show();
    }
    else {
        searchPopup.element.innerHTML = '<div class="search-no-record">We’re sorry. We cannot find any matches for your search term.</div>';
        searchPopup.show();
    }
}
function highlight(searchString, listElement) {
    let regex = new RegExp(searchString.split(' ').join('|'), 'gi');
    let contentElements = selectAll('.e-list-item .e-text-content .e-list-text', listElement);
    for (let i = 0; i < contentElements.length; i++) {
        let spanText = select('.sb-highlight');
        if (spanText) {
            contentElements[i].innerHTML = contentElements[i].text;
        }
        contentElements[i].innerHTML = contentElements[i].innerHTML.replace(regex, (matched) => {
            return '<span class="sb-highlight">' + matched + '</span>';
        });
    }
}
/**
 * Mobile Right pane toggle functions
 */
function toggleRightPane() {
    themeDropDown.index = themeCollection.indexOf(selectedTheme);
    select('#right-sidebar').classList.remove('sb-hide');
    if (isMobile) {
        settingsidebar.toggle();
    }
}
function viewMobilePrefPane() {
    select('.sb-mobile-prop-pane').classList.add('sb-hide');
    select('.sb-mobile-preference').classList.remove('sb-hide');
    toggleRightPane();
}
export function viewMobilePropPane() {
    select('.sb-mobile-preference').classList.add('sb-hide');
    select('.sb-mobile-prop-pane').classList.remove('sb-hide');
    toggleRightPane();
}
export function isLeftPaneOpen() {
    return sidebar.isOpen;
}
function isVisible(elem) {
    return !select(elem).classList.contains('sb-hide');
}
/**
 * Mobile Overlay
 */
function toggleMobileOverlay() {
    if (!select('.sb-left-pane').classList.contains('sb-hide')) {
        toggleLeftPane();
    }
    if (!select('.sb-mobile-right-pane').classList.contains('sb-hide')) {
        toggleRightPane();
    }
}
function removeMobileOverlay() {
    select('.sb-mobile-overlay').classList.add('sb-hide');
}
export function removeOverlay() {
    sbContentOverlay.classList.add('sb-hide');
    sbRightPane.classList.remove('sb-right-pane-overlay');
    sbHeader.classList.remove('sb-right-pane-overlay');
    mobNavOverlay(false);
    if (!sbBodyOverlay.classList.contains('sb-hide')) {
        sbBodyOverlay.classList.add('sb-hide');
    }
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (!isMobile) {
        sbRightPane.scrollTop = 0;
    }
    if (cultureDropDown.value == 'ar') {
        changeRtl(true);
    }
}
function changeRtl(isShow) {
    let elementlist = selectAll('.e-control', document.getElementById('control-content'));
    for (let control of elementlist) {
        let eleinstance = control.ej2_instances;
        if (eleinstance) {
            for (let instance of eleinstance) {
                instance.enableRtl = isShow;
            }
        }
    }
}
export function sampleOverlay() {
    sbHeader.classList.add('sb-right-pane-overlay');
    sbRightPane.classList.add('sb-right-pane-overlay');
    mobNavOverlay(true);
    sbContentOverlay.classList.remove('sb-hide');
}
function mobNavOverlay(isOverlay) {
    if (Browser.isDevice) {
        let mobileFoorter = select('.sb-mobilefooter');
        if (isOverlay) {
            mobileFoorter.classList.add('sb-right-pane-overlay');
        }
        else {
            mobileFoorter.classList.remove('sb-right-pane-overlay');
        }
    }
}
function overlay() {
    sbHeader.classList.add('sb-right-pane-overlay');
    sbBodyOverlay.classList.remove('sb-hide');
}
export function toggleLeftPane() {
    isMobile = document.body.offsetWidth <= 550;
    select('#left-sidebar').classList.remove('sb-hide');
    let reverse = sidebar.isOpen;
    leftToggle.setAttribute('aria-expanded', (!reverse).toString());
    if (!reverse) {
        leftToggle.classList.add('toggle-active');
    }
    else {
        leftToggle.classList.remove('toggle-active');
        //mobileOverlay.classList.add('sb-hide');
    }
    if (sidebar) {
        reverse = sidebar.isOpen;
        if (reverse) {
            sidebar.hide();
            if (!isMobile && !isTablet) {
                resizeManualTrigger = true;
            }
        }
        else {
            sidebar.show();
            resizeManualTrigger = true;
        }
    }
}
/**
 * Resize event processing
 */
function processResize(e) {
    let toggle = sidebar.isOpen;
    isMobile = document.body.offsetWidth <= 550;
    isTablet = document.body.offsetWidth >= 550 && document.body.offsetWidth <= 850;
    if (isTablet) {
        resizeManualTrigger = false;
    }
    if (resizeManualTrigger || (isMobile && select('#right-sidebar').classList.contains('sb-hide'))) {
        return;
    }
    isPc = document.body.offsetWidth >= 850;
    processDeviceDependables();
    let leftPane = select('.sb-left-pane');
    let rightPane = select('.sb-right-pane');
    let footer = select('.sb-footer-left');
    let pref = select('#settings-popup');
    if (toggle && !isPc) {
        toggleLeftPane();
    }
    if (isMobile || isTablet) {
        sidebar.target = null;
        sidebar.showBackdrop = true;
        sidebar.closeOnDocumentClick = true;
        if (isTablet) {
            select('.sb-footer').appendChild(footer);
        }
        if (!footer.parentElement.classList.contains('sb-left-pane-footer')) {
            select('.sb-left-pane-footer').appendChild(footer);
        }
        if (!pref.parentElement.classList.contains('sb-mobile-preference')) {
            select('.sb-mobile-preference').appendChild(pref);
        }
        settingsPopup.show();
    }
    if (isPc) {
        sidebar.target = document.querySelector('.sb-content ');
        sidebar.showBackdrop = false;
        sidebar.closeOnDocumentClick = false;
        if (footer.parentElement.classList.contains('sb-left-pane-footer')) {
            select('.sb-footer').appendChild(footer);
        }
        if (isPc && !Browser.isDevice) {
            if (isVisible('.sb-left-pane')) {
                rightPane.classList.remove('control-fullview');
            }
        }
        if (pref.parentElement.classList.contains('sb-mobile-preference')) {
            select('#sb-popup-section').appendChild(pref);
            settingsidebar.hide();
            settingsPopup.hide();
        }
        let mobilePropPane = select('.sb-mobile-prop-pane .property-section');
        if (mobilePropPane) {
            select('.control-section').appendChild(mobilePropPane);
        }
    }
    if (!select('.sb-mobile-right-pane').classList.contains('sb-hide')) {
        toggleRightPane();
    }
    if (isVisible('.sb-mobile-overlay')) {
        removeMobileOverlay();
    }
}
/**
 * Theme Loading
 */
function loadTheme(theme) {
    theme = themesToRedirect.indexOf(theme) !== -1 ? 'tailwind3' : theme;
    let body = document.body;
    if (body.classList.length > 0) {
        for (let themeItem of themeCollection) {
            body.classList.remove(themeItem);
        }
    }
    body.classList.add(theme.includes('bootstrap5') ? theme.replace('bootstrap5', 'bootstrap5_3') : theme);
    const activeTheme = theme.replace('-dark', '');
    themeList.querySelector('#' + activeTheme).classList.add('active');
    let ajax = new Ajax('./styles/' + (theme.includes('bootstrap5') ? theme.replace('bootstrap5', 'bootstrap5.3') : theme) + '.css', 'GET', true);
    ajax.send().then((result) => {
        let doc = document.getElementById('themelink');
        doc.innerHTML = result;
        selectedTheme = theme;
        //renderPopups
        renderSbPopups();
        bindEvents();
        /**
         * load elastic lunr
         */
        elasticlunr.clearStopWords();
        searchInstance = elasticlunr.Index.load(searchJson);
        createRoot(document.getElementById('left-pane-component')).render(<LeftPane />);
        setTimeout(() => {
            setSelectList();
            //removeOverlay();
            createRoot(document.getElementById('tab-component')).render(<Content />);
            if (!isMobile) {
                document.querySelector('.sb-right-pane').scrollTop = 0;
            }
        }, 400);
    });
}
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/src/service-worker.js');
}
/**
 *  themeChangebutton
 */
function ThemeChangeButton() {
    const [isVisible, setIsVisible] = useState(!selectedTheme.includes('highcontrast'));
    const handleButton = () => {
        const isDark = selectedTheme.includes('-dark');
        const isNewThemeDark = isDark ? selectedTheme.replace('-dark', '') : (selectedTheme + '-dark');
        switchTheme(isNewThemeDark);
    };
    useEffect(() => {
        setIsVisible(!selectedTheme.includes('highcontrast'));
    }, [selectedTheme]);
    const buttonClasses = `sb-themeswitch-btn ${!isVisible ? 'hidden' : ''}`;
    return (<button className={buttonClasses} onClick={handleButton}><span className={`sb-icons ${selectedTheme.includes('-dark') ? 'dark-theme' : 'light-theme'}`}></span>{selectedTheme.includes('-dark') ? 'LIGHT' : 'DARK'}</button>);
}
if (!isMobile) {
    createRoot(document.getElementById('dark-light-content')).render(<ThemeChangeButton />);
    thememode.classList.add('hidden');
}
