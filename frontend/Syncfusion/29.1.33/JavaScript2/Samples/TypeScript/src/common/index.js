define(["require", "exports", "@syncfusion/ej2-popups", "@syncfusion/ej2-notifications", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-data", "@syncfusion/ej2-dropdowns", "@syncfusion/ej2-buttons", "@syncfusion/ej2-navigations", "@syncfusion/ej2-lists", "@syncfusion/ej2-grids", "crossroads", "./propertypane", "./locale-string", "./sampleList", "./lib/elasticlunr", "./search-index.json", "./lib/highlightjs", "hasher", "../common/cldr-data/supplemental/numberingSystems.json", "../common/cldr-data/supplemental/currencyData.json", "../common/cldr-data/main/de/all.json", "../common/cldr-data/main/ar/all.json", "../common/cldr-data/main/fr-CH/all.json", "../common/cldr-data/main/en/all.json", "../common/cldr-data/main/zh/all.json", "../common/pack.json", "../../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ej2_popups_1, ej2_notifications_1, ej2_base_1, ej2_base_2, ej2_data_1, ej2_dropdowns_1, ej2_buttons_1, ej2_navigations_1, ej2_lists_1, ej2_grids_1, crossroads_1, propertypane_1, locale_string_1, samplesJSON, elasticlunr, searchJson, hljs, hasher, numberingSystems, currencyData, deCultureData, arCultureData, swissCultureDate, enCultureData, chinaCultureData, packageJson) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var packages = JSON.stringify(packageJson.dependencies);
    var cBlock = ['ts-src-tab', 'html-src-tab'];
    var crossRoads = (0, crossroads_1.create)();
    var matchedCurrency = {
        'en': 'USD',
        'de': 'EUR',
        'ar': 'AED',
        'zh': 'CNY',
        'fr-CH': 'CHF'
    };
    (0, ej2_base_2.loadCldr)(numberingSystems, chinaCultureData, enCultureData, swissCultureDate, currencyData, deCultureData, arCultureData);
    ej2_base_1.L10n.load(locale_string_1.Locale);
    (0, ej2_base_1.setCulture)('en');
    (0, ej2_base_2.registerLicense)('{SyncfusionJSLicensekey}');
    var switcherPopup;
    var preventToggle;
    var themeSwitherPopup;
    var openedPopup;
    var searchPopup;
    var settingsPopup;
    var prevAction;
    var sidebar;
    var settingsidebar;
    var searchInstance;
    var headerThemeSwitch = document.getElementById('header-theme-switcher');
    var settingElement = (0, ej2_base_2.select)('.sb-setting-btn');
    var themeList = document.getElementById('themelist');
    var themeCollection = ['material3', 'bootstrap5', 'fluent2', 'tailwind3', 'fluent2-highcontrast', 'highcontrast', 'tailwind', 'fluent', 'material3-dark', 'bootstrap5-dark', 'fluent2-dark', 'tailwind3-dark', 'tailwind-dark', 'fluent-dark'];
    var themesToRedirect = ['material', 'material-dark', 'bootstrap4', 'bootstrap', 'bootstrap-dark', 'fabric', 'fabric-dark'];
    var darkIgnore = ['highcontrast', 'fluent2-highcontrast'];
    var themeDarkButton = document.getElementById('sb-dark-theme');
    var darkButton = document.getElementById('sb-dark-span');
    var themeModeDropDown;
    var themeDropDown;
    var cultureDropDown;
    var currencyDropDown;
    var contentTab;
    var sourceTab;
    var sourceTabItems = [];
    var isExternalNavigation = true;
    var defaultTree = false;
    var intialLoadCompleted = false;
    var resizeManualTrigger = false;
    var reloadPageForRedirection = false;
    var leftToggle = (0, ej2_base_2.select)('#sb-toggle-left');
    var sbRightPane = (0, ej2_base_2.select)('.sb-right-pane');
    var sbContentOverlay = (0, ej2_base_2.select)('.sb-content-overlay');
    var sbBodyOverlay = (0, ej2_base_2.select)('.sb-body-overlay');
    var sbHeader = (0, ej2_base_2.select)('#sample-header');
    var resetSearch = (0, ej2_base_2.select)('.sb-reset-icon');
    var newYear = new Date().getFullYear();
    var copyRight = document.querySelector('.sb-footer-copyright');
    copyRight.innerHTML = "Copyright © 2001 - " + newYear + " Syncfusion<sup>®</sup> Inc.";
    var urlRegex = /(npmci\.syncfusion\.com|ej2\.syncfusion\.com)(\/)(development|production)*/;
    var sampleRegex = /#\/(([^\/]+\/)+[^\/\.]+)/;
    var reg = /.*custom code start([\S\s]*?)custom code end.*/g;
    var sbArray = ['angular', 'react', 'nextjs', 'javascript', 'aspnetcore', 'aspnetmvc', 'vue', 'blazor'];
    var inputele = (0, ej2_base_2.select)('#search-input');
    var searchOverlay = (0, ej2_base_2.select)('.e-search-overlay');
    var searchButton = document.getElementById('sb-trigger-search');
    var setResponsiveElement = (0, ej2_base_2.select)('.setting-responsive');
    var isMobile = window.matchMedia('(max-width:550px)').matches;
    var isTablet = window.matchMedia('(min-width:600px) and (max-width: 850px)').matches;
    var isPc = window.matchMedia('(min-width:850px)').matches;
    var selectedTheme = location.hash.split('/')[1] || 'tailwind3';
    var toggleAnim = new ej2_base_1.Animation({ duration: 500, timingFunction: 'ease' });
    var controlSampleData = {};
    var samplesList = getSampleList();
    var samplesTreeList = [];
    var execFunction = {};
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (ej2_base_1.Browser.isDevice || isMobile) {
        if (sidebar) {
            sidebar.destroy();
        }
        sidebar = new ej2_navigations_1.Sidebar({ width: '280px', showBackdrop: true, closeOnDocumentClick: true, enableGestures: false, change: resizeFunction });
        sidebar.appendTo('#left-sidebar');
    }
    else {
        sidebar = new ej2_navigations_1.Sidebar({
            width: '282px', target: document.querySelector('.sb-content '),
            showBackdrop: false,
            closeOnDocumentClick: false,
            enableGestures: false,
            change: resizeFunction
        });
        sidebar.appendTo('#left-sidebar');
    }
    settingsidebar = new ej2_navigations_1.Sidebar({
        position: 'Right', width: '282', zIndex: '1003', showBackdrop: true, type: 'Over', enableGestures: false,
        closeOnDocumentClick: true, close: closeRightSidebar
    });
    settingsidebar.appendTo('#right-sidebar');
    function closeRightSidebar(args) {
        var targetEle = args.event ? args.event.target : null;
        if (targetEle && targetEle.closest('.e-popup'))
            args.cancel = true;
    }
    window.apiList = samplesJSON.apiList;
    var sampleNameElement = document.querySelector('#component-name>.sb-sample-text');
    var breadCrumbComponent = document.querySelector('.sb-bread-crumb-text>.category-text');
    var breadCrumSeperator = (0, ej2_base_2.select)('.category-seperator');
    var breadCrumbSubCategory = document.querySelector('.sb-bread-crumb-text>.component');
    var breadCrumbSample = document.querySelector('.sb-bread-crumb-text>.crumb-sample');
    var hsplitter = '<div class="sb-toolbar-splitter sb-custom-item"></div>';
    var openNewTemplate = "<div class=\"sb-custom-item sb-open-new-wrapper\"><a id=\"openNew\" target=\"_blank\" aria-label=\"Open new sample\">\n <div class=\"sb-icons sb-icon-Popout\"></div></a></div>";
    var sampleNavigation = "<div class=\"sb-custom-item sample-navigation\"><button id='prev-sample' role='tab' class=\"sb-navigation-prev\" \n     aria-label=\"Navigate to previous sample\">\n <span class='sb-icons sb-icon-Previous'></span>\n </button>\n <button  id='next-sample' role='tab' class=\"sb-navigation-next\" aria-label=\"Navigate to next sample\">\n <span class='sb-icons sb-icon-Next'></span>\n </button>\n </div>";
    var plnrTemplate = '<span class="sb-icons sb-icons-plnkr" role="presentation"></span><span class="sb-plnkr-text">Edit in StackBlitz</span>';
    var contentToolbarTemplate = '<div class="sb-desktop-setting"><button id="open-plnkr" role="tab" aria-label="Open Edit in StackBlitz" tabindex="0" class="sb-custom-item sb-plnr-section">' +
        plnrTemplate + '</button>' + hsplitter + openNewTemplate + hsplitter +
        '</div>' + sampleNavigation + '<div class="sb-icons sb-mobile-setting sb-hide"></div>';
    var tabContentToolbar = (0, ej2_base_1.createElement)('div', { className: 'sb-content-toolbar', innerHTML: contentToolbarTemplate });
    var apiGrid;
    var demoSection = (0, ej2_base_2.select)('.sb-demo-section');
    if (ej2_base_1.Browser.isDevice || isMobile) {
        leftToggle.setAttribute('aria-expanded', 'false');
    }
    else {
        leftToggle.setAttribute('aria-expanded', 'true');
    }
    window.navigateSample = (window.navigateSample !== undefined) ? window.navigateSample : function () { return; };
    var isInitRedirected;
    var samplePath = [];
    var defaultSamples = [];
    var samplesAr = [];
    var currentControlID;
    var currentSampleID;
    var currentControl;
    function preventTabSwipe(e) {
        if (e.isSwiped) {
            e.cancel = true;
        }
    }
    function dynamicTab(e) {
        var blockEle = this.element.querySelector('#e-content' + this.tabId + '_' + e.selectedIndex).children[0];
        blockEle.innerHTML = this.items[e.selectedIndex].data;
        blockEle.innerHTML = blockEle.innerHTML.replace(reg, '');
        blockEle.classList.add('sb-src-code');
        if (blockEle) {
            hljs.highlightBlock(blockEle);
        }
    }
    function dynamicTabCreation(obj) {
        var tabObj;
        if (obj) {
            tabObj = obj;
        }
        else {
            tabObj = this;
        }
        var contentEle = tabObj.element.querySelector('#e-content' + tabObj.tabId + '_' + tabObj.selectedItem);
        if (!contentEle) {
            return;
        }
        var blockEle = tabObj.element.querySelector('#e-content' + tabObj.tabId + '_' + tabObj.selectedItem).children[0];
        blockEle.innerHTML = tabObj.items[tabObj.selectedItem].data;
        blockEle.innerHTML = blockEle.innerHTML.replace(reg, '');
        blockEle.classList.add('sb-src-code');
        if (blockEle) {
            hljs.highlightBlock(blockEle);
        }
    }
    function renderSbPopups() {
        switcherPopup = new ej2_popups_1.Popup(document.getElementById('sb-switcher-popup'), {
            relateTo: document.querySelector('.sb-header-text-right'), position: { X: 'left' },
            collision: { X: 'flip', Y: 'flip' },
            offsetX: 0,
            offsetY: -15,
        });
        themeSwitherPopup = new ej2_popups_1.Popup(document.getElementById('theme-switcher-popup'), {
            offsetY: 2,
            relateTo: document.querySelector('.theme-wrapper'), position: { X: 'left', Y: 'bottom' },
            collision: { X: 'flip', Y: 'flip' }
        });
        searchPopup = new ej2_dropdowns_1.AutoComplete({
            dataSource: [],
            filtering: function (e) {
                if (e.text && e.text.length < 3) {
                    return;
                }
                var val = searchInstance.search(e.text, {
                    fields: {
                        component: { boost: 1 },
                        name: { boost: 2 }
                    },
                    expand: true,
                    boolean: 'AND'
                });
                var value = [];
                if (ej2_base_1.Browser.isDevice) {
                    for (var _i = 0, val_1 = val; _i < val_1.length; _i++) {
                        var file = val_1[_i];
                        if (file.doc.hideOnDevice !== true) {
                            value = value.concat(file);
                        }
                    }
                }
                var query = new ej2_data_1.Query().take(10).select('doc');
                var fields = this.fields;
                var searchValue = ej2_base_1.Browser.isDevice ? value : val;
                e.updateData(searchValue, query, fields);
            },
            placeholder: 'Search here...',
            noRecordsTemplate: '<div class="search-no-record">We’re sorry. We cannot find any matches for your search term.</div>',
            fields: { groupBy: 'doc.component', value: 'doc.uid', text: 'doc.name' },
            highlight: true,
            select: function (e) {
                var data = e.itemData.doc;
                var hashval = '#/' + location.hash.split('/')[1] + '/' + data.dir + '/' + data.url + '.html';
                searchPopup.hidePopup();
                searchOverlay.classList.add('e-search-hidden');
                if (location.hash !== hashval) {
                    sampleOverlay();
                    location.hash = hashval;
                    window.hashString = location.hash;
                    setSelectList();
                }
            }
        }, inputele);
        settingsPopup = new ej2_popups_1.Popup(document.getElementById('settings-popup'), {
            offsetY: 5,
            zIndex: 1001,
            relateTo: settingElement,
            position: { X: 'right', Y: 'bottom' },
            collision: { X: 'flip', Y: 'flip' }
        });
        if (!isMobile) {
            settingsPopup.hide();
            settingsidebar.hide();
        }
        else {
            (0, ej2_base_2.select)('.sb-mobile-preference').appendChild((0, ej2_base_2.select)('#settings-popup'));
        }
        searchPopup.hidePopup();
        switcherPopup.hide();
        themeSwitherPopup.hide();
        themeDropDown = new ej2_dropdowns_1.DropDownList({
            index: themeCollection.indexOf(selectedTheme.split('-')[0]),
            change: function (e) { switchTheme(e.value); }
        });
        themeModeDropDown = new ej2_dropdowns_1.DropDownList({
            index: (location.hash.split('/')[1] && location.hash.split('/')[1].includes('-dark')) ? 1 : 0,
            change: function (e) { darkSwitch(); }
        });
        themeModeDropDown.appendTo('#sb-theme-mode');
        cultureDropDown = new ej2_dropdowns_1.DropDownList({
            index: 0,
            change: function (e) {
                var value = e.value;
                changeRtl({
                    locale: value, currencyCode: matchedCurrency[value],
                    enableRtl: value === 'ar'
                });
                currencyDropDown.value = matchedCurrency[value];
                loadCulture(value);
            }
        });
        function loadCulture(cul) {
            var inputElement = document.getElementById('cultureID');
            inputElement.value = cul;
            if ('oninput' in inputElement) {
                inputElement.dispatchEvent(new Event('input'));
            }
        }
        currencyDropDown = new ej2_dropdowns_1.DropDownList({
            index: 0,
            change: function (e) {
                loadCurrency(e.value);
                changeRtl({ currencyCode: e.value });
            }
        });
        function loadCurrency(cul) {
            var inputElement = document.getElementById('currencyID');
            inputElement.value = cul;
            if ('oninput' in inputElement) {
                inputElement.dispatchEvent(new Event('input'));
            }
        }
        cultureDropDown.appendTo('#sb-setting-culture');
        currencyDropDown.appendTo('#sb-setting-currency');
        themeDropDown.appendTo('#sb-setting-theme');
        contentTab = new ej2_navigations_1.Tab({
            selected: changeTab, selecting: preventTabSwipe
        }, '#sb-content');
        sourceTab = new ej2_navigations_1.Tab({
            items: [],
            headerPlacement: 'Bottom', cssClass: 'sb-source-code-section',
            created: dynamicTabCreation,
            selected: dynamicTab,
            selecting: preventTabSwipe
        }, '#sb-source-tab');
        (0, ej2_base_1.enableRipple)(selectedTheme.indexOf('material') !== -1 || !selectedTheme);
        apiGrid = new ej2_grids_1.Grid({
            width: '100%',
            dataSource: [],
            allowTextWrap: true,
            columns: [
                { field: 'name', headerText: 'Name', template: '#template', width: 180, textAlign: 'Center' },
                { field: 'type', headerText: 'Type', width: 180 },
                { field: 'description', headerText: 'Description', template: '#template-description', width: 200 },
            ],
            dataBound: dataBound
        });
        apiGrid.appendTo('#api-grid');
        var prevbutton = new ej2_buttons_1.Button({ iconCss: 'sb-icons sb-icon-Previous', cssClass: 'e-flat' }, '#mobile-prev-sample');
        var nextbutton = new ej2_buttons_1.Button({
            iconCss: 'sb-icons sb-icon-Next',
            cssClass: 'e-flat', iconPosition: 'Right'
        }, '#mobile-next-sample');
        var tabHeader = document.getElementById('sb-content-header');
        tabHeader.appendChild(tabContentToolbar);
        var openNew = new ej2_popups_1.Tooltip({
            content: 'Open in New Window'
        });
        openNew.appendTo('.sb-open-new-wrapper');
        var previous = new ej2_popups_1.Tooltip({
            content: 'Previous Sample'
        });
        previous.appendTo('#prev-sample');
        var next = new ej2_popups_1.Tooltip({
            content: 'Next Sample'
        });
        (0, ej2_base_2.select)('#right-pane').addEventListener('scroll', function (event) {
            next.close();
            openNew.close();
            previous.close();
        });
        next.appendTo('#next-sample');
    }
    function checkApiTableDataSource() {
        var hash = location.hash.split('/');
        var data = window.apiList[hash[2] + '/' + hash[3].replace('.html', '')] || [];
        if (!data.length || (isMobile || isTablet)) {
            contentTab.hideTab(2);
        }
        else {
            contentTab.hideTab(2, false);
        }
    }
    function changeTab(args) {
        if (args.selectedIndex === 2) {
            var hash = location.hash.split('/');
            var data = window.apiList[hash[2] + '/' + hash[3].replace('.html', '')] || [];
            if (data.length) {
                apiGrid.dataSource = data;
            }
            else {
                apiGrid.dataSource = [];
            }
        }
        if (args.selectedIndex === 1) {
            sourceTab.items = sourceTabItems;
            sourceTab.refresh();
            renderCopyCode();
            dynamicTabCreation(sourceTab);
        }
        if (args.selectedItem && args.selectedItem.innerText === 'DEMO') {
            var demoSection_1 = document.getElementsByClassName('sb-demo-section')[0];
            var componentToIgnore = ['tab'];
            if (demoSection_1) {
                var elementList = demoSection_1.getElementsByClassName('e-control e-lib');
                for (var i = 0; i < elementList.length; i++) {
                    var instance = elementList[i].ej2_instances;
                    if (instance && instance[0] && typeof instance[0].refresh === 'function' && componentToIgnore.indexOf(instance[0].getModuleName()) === -1 && ['rich-text-editor', 'ai-assistview', 'chat-ui'].indexOf(currentControl) === -1) {
                        instance[0].refresh();
                    }
                    if (instance && instance[0] && instance[0].getModuleName() !== 'DashboardLayout')
                        break;
                }
            }
        }
    }
    function changeRtl(args) {
        var elementlist = (0, ej2_base_2.selectAll)('.e-control', document.getElementById('control-content'));
        for (var _i = 0, elementlist_1 = elementlist; _i < elementlist_1.length; _i++) {
            var control = elementlist_1[_i];
            var eleinstance = control.ej2_instances;
            if (eleinstance) {
                for (var _a = 0, eleinstance_1 = eleinstance; _a < eleinstance_1.length; _a++) {
                    var instance = eleinstance_1[_a];
                    if (instance.getModuleName() === "inplaceeditor" && args.currencyCode) {
                        (0, ej2_base_1.extend)(args, instance.model, { currency: args.currencyCode });
                        instance.setProperties({ model: args });
                    }
                    else {
                        instance.setProperties(args);
                    }
                }
            }
        }
    }
    function dataBound(args) {
        if (!this.getRows()) {
            return;
        }
        var gridtrs = this.getRows().length;
        var trs = this.getRows();
        for (var count = 0; count < gridtrs; count++) {
            var tr1 = trs[count];
            if (tr1.getBoundingClientRect().height > 100) {
                var desDiv = tr1.querySelector('.sb-sample-description');
                var tag = (0, ej2_base_1.createElement)('a', { id: 'showtag', innerHTML: ' show more...' });
                tag.addEventListener('click', tagShowmore.bind(this, desDiv));
                desDiv.classList.add('e-custDesription');
                desDiv.appendChild(tag);
            }
        }
    }
    function tagShowmore(target) {
        target.classList.remove('e-custDesription');
        target.querySelector('#showtag').classList.add('e-display');
        var hideEle = target.querySelector('#hidetag');
        if (!hideEle) {
            var tag = (0, ej2_base_1.createElement)('a', { id: 'hidetag', attrs: {}, innerHTML: ' hide less..' });
            target.appendChild(tag);
            tag.addEventListener('click', taghideless.bind(this, target));
        }
        else {
            hideEle.classList.remove('e-display');
        }
    }
    function taghideless(target) {
        target.querySelector('#hidetag').classList.add('e-display');
        target.querySelector('#showtag').classList.remove('e-display');
        target.classList.add('e-custDesription');
    }
    function setPressedAttribute(ele) {
        var status = ele.classList.contains('active');
        ele.setAttribute('aria-pressed', status ? 'true' : 'false');
    }
    function sbHeaderClick(action, preventSearch) {
        if (openedPopup) {
            openedPopup.hide(new ej2_base_1.Animation({ name: 'FadeOut', duration: 300, delay: 0 }));
        }
        if (preventSearch !== true && !searchOverlay.classList.contains('sb-hide')) {
            searchOverlay.classList.add('sb-hide');
            searchButton.classList.remove('active');
            setPressedAttribute(searchButton);
        }
        var curPopup;
        switch (action) {
            case 'changeSampleBrowser':
                curPopup = switcherPopup;
                break;
            case 'changeTheme':
                headerThemeSwitch.classList.toggle('active');
                setPressedAttribute(headerThemeSwitch);
                curPopup = themeSwitherPopup;
                break;
            case 'toggleSettings':
                settingElement.classList.toggle('active');
                setPressedAttribute(settingElement);
                themeDropDown.index = themeCollection.indexOf(selectedTheme);
                curPopup = settingsPopup;
                break;
        }
        if (action === 'closePopup') {
            headerThemeSwitch.classList.remove('active');
            settingElement.classList.remove('active');
            setPressedAttribute(headerThemeSwitch);
            setPressedAttribute(settingElement);
            if (settingsidebar.isOpen && preventSearch && preventSearch.target && preventSearch.target.closest !== undefined &&
                (preventSearch.target.closest('#sb-setting-theme_popup') || preventSearch.target.closest('#sb-setting-culture_popup') ||
                    preventSearch.target.closest('#sb-setting-currency_popup') || preventSearch.target.closest('.e-sidebar-overlay'))) {
                settingsidebar.hide();
            }
        }
        if (curPopup && curPopup !== openedPopup) {
            curPopup.show(new ej2_base_1.Animation({ name: 'FadeIn', duration: 400, delay: 0 }));
            openedPopup = curPopup;
        }
        else {
            openedPopup = null;
        }
        prevAction = action;
    }
    function toggleSearchOverlay() {
        sbHeaderClick('closePopup', true);
        inputele.value = '';
        searchPopup.hidePopup();
        searchButton.classList.toggle('active');
        setPressedAttribute(searchButton);
        searchOverlay.classList.toggle('sb-hide');
        if (!searchOverlay.classList.contains('sb-hide')) {
            inputele.focus();
        }
    }
    function changeTheme(e) {
        var target = e.target;
        target = (0, ej2_base_1.closest)(target, 'li');
        var themeName = target.id;
        switchTheme(themeName);
        var imageEditorElem = document.querySelector(".e-image-editor");
        if (imageEditorElem != null) {
            var imageEditor = (0, ej2_base_2.getComponent)(document.getElementById(imageEditorElem.id), 'image-editor');
            imageEditor.theme = themeName;
        }
    }
    function switchTheme(str) {
        var hash = location.hash.split('/');
        if (hash[1] !== str) {
            if (hash[1].includes('-dark') && darkIgnore.indexOf(str) === -1) {
                str = str + '-dark';
            }
            hash[1] = str;
            location.hash = hash.join('/');
        }
    }
    themeDarkButton.addEventListener('click', darkSwitch);
    function darkSwitch() {
        var hash = location.hash.split('/');
        var darkTheme = hash[1];
        darkTheme = darkTheme.includes("-dark") ? darkTheme.replace("-dark", "") : darkIgnore.indexOf(darkTheme) === 0 ? darkTheme : darkTheme + '-dark';
        hash[1] = darkTheme;
        location.hash = hash.join('/');
        location.reload();
    }
    function highlight(searchString, listElement) {
        var regex = new RegExp(searchString.split(' ').join('|'), 'gi');
        var contentElements = (0, ej2_base_2.selectAll)('.e-list-item .e-text-content .e-list-text', listElement);
        for (var i = 0; i < contentElements.length; i++) {
            var spanText = (0, ej2_base_2.select)('.sb-highlight');
            if (spanText) {
                contentElements[i].innerHTML = contentElements[i].text;
            }
            contentElements[i].innerHTML = contentElements[i].innerHTML.replace(regex, function (matched) {
                return '<span class="sb-highlight">' + matched + '</span>';
            });
        }
    }
    function setMouseOrTouch(e) {
        var ele = (0, ej2_base_1.closest)(e.target, '.sb-responsive-items');
        var switchType = ele.id;
        changeMouseOrTouch(switchType);
        sbHeaderClick('closePopup');
        localStorage.setItem('ej2-switch', switchType);
        location.reload();
    }
    function onNextButtonClick(arg) {
        sampleOverlay();
        var curSampleUrl = location.hash;
        var inx = samplesAr.indexOf(curSampleUrl);
        if (inx !== -1) {
            var prevhref = samplesAr[inx];
            var curhref = samplesAr[inx + 1];
            location.href = curhref;
        }
        window.hashString = location.hash;
        setSelectList();
    }
    function onPrevButtonClick(arg) {
        sampleOverlay();
        var curSampleUrl = location.hash;
        var inx = samplesAr.indexOf(curSampleUrl);
        if (inx !== -1) {
            var prevhref = samplesAr[inx];
            var curhref = samplesAr[inx - 1];
            location.href = curhref;
        }
        window.hashString = location.hash;
        setSelectList();
    }
    function processResize(e) {
        var toggle = sidebar.isOpen;
        isMobile = window.matchMedia('(max-width:550px)').matches;
        isTablet = window.matchMedia('(min-width:550px) and (max-width: 850px)').matches;
        if (isTablet) {
            resizeManualTrigger = false;
        }
        if (resizeManualTrigger || (isMobile && (0, ej2_base_2.select)('#right-sidebar').classList.contains('sb-hide'))) {
            return;
        }
        isPc = window.matchMedia('(min-width:850px)').matches;
        processDeviceDependables();
        setLeftPaneHeight();
        var leftPane = (0, ej2_base_2.select)('.sb-left-pane');
        var rightPane = (0, ej2_base_2.select)('.sb-right-pane');
        var footer = (0, ej2_base_2.select)('.sb-footer-left');
        var pref = (0, ej2_base_2.select)('#settings-popup');
        if (isTablet || isMobile) {
            contentTab.hideTab(2);
        }
        else {
            contentTab.hideTab(2, false);
        }
        if (toggle && !isPc) {
            toggleLeftPane();
        }
        if (isMobile || isTablet) {
            sidebar.target = null;
            sidebar.showBackdrop = true;
            sidebar.closeOnDocumentClick = true;
            (0, ej2_base_2.select)('.sb-left-footer-links').appendChild(footer);
            if (isTablet) {
                (0, ej2_base_2.select)('.sb-footer').appendChild(footer);
            }
            if (isVisible('.sb-mobile-overlay')) {
                removeMobileOverlay();
            }
            if (!pref.parentElement.classList.contains('sb-mobile-preference')) {
                (0, ej2_base_2.select)('.sb-mobile-preference').appendChild(pref);
                settingsPopup.show();
            }
            var propPanel = (0, ej2_base_2.select)('#control-content .property-section');
            if (propPanel) {
                (0, ej2_base_2.select)('.sb-mobile-prop-pane').appendChild(propPanel);
                (0, ej2_base_2.select)('.sb-mobile-setting').classList.remove('sb-hide');
            }
            if (isVisible('.sb-mobile-overlay')) {
                removeMobileOverlay();
            }
        }
        if (isPc) {
            sidebar.target = document.querySelector('.sb-content ');
            sidebar.showBackdrop = false;
            sidebar.closeOnDocumentClick = false;
            if (isVisible('.sb-mobile-overlay')) {
                removeMobileOverlay();
            }
            if (isPc && !ej2_base_1.Browser.isDevice && isVisible('.sb-left-pane')) {
                rightPane.classList.remove('control-fullview');
            }
            if (pref.parentElement.classList.contains('sb-mobile-preference')) {
                (0, ej2_base_2.select)('#sb-popup-section').appendChild(pref);
                settingsidebar.hide();
                settingsPopup.hide();
            }
            var mobilePropPane = (0, ej2_base_2.select)('.sb-mobile-prop-pane .property-section');
            if (mobilePropPane) {
                (0, ej2_base_2.select)('#control-content').appendChild(mobilePropPane);
            }
            if (!(0, ej2_base_2.select)('.sb-mobile-right-pane').classList.contains('sb-hide')) {
                toggleRightPane();
            }
        }
        if (switcherPopup) {
            switcherPopup.refreshPosition();
        }
    }
    function resizeFunction() {
        if (!isMobile && !isTablet) {
            resizeManualTrigger = true;
            setTimeout(function () { return cusResize(); }, 400);
        }
    }
    function resetInput(arg) {
        arg.preventDefault();
        arg.stopPropagation();
        document.getElementById('search-input').value = '';
        document.getElementById('search-input-wrapper').setAttribute('data-value', '');
        searchPopup.hidePopup();
    }
    function bindEvents() {
        document.getElementById('sb-switcher').addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            sbHeaderClick('changeSampleBrowser');
        });
        (0, ej2_base_2.select)('.sb-header-text-right').addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            sbHeaderClick('changeSampleBrowser');
        });
        document.getElementById('sb-switcher').addEventListener('keydown', function (e) {
            if (e.keyCode === 'Enter' || e.keyCode === ' ') {
                sbHeaderClick('changeSampleBrowser');
            }
        });
        headerThemeSwitch.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            sbHeaderClick('changeTheme');
        });
        headerThemeSwitch.addEventListener('keydown', function (e) {
            if (e.keyCode === 'Enter' || e.keyCode === ' ') {
                sbHeaderClick('changeTheme');
            }
        });
        themeList.addEventListener('click', changeTheme);
        document.addEventListener('click', sbHeaderClick.bind(this, 'closePopup'));
        settingElement.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            sbHeaderClick('toggleSettings');
        });
        settingElement.addEventListener('keydown', function (e) {
            if (e.keyCode === 'Enter' || e.keyCode === ' ') {
                sbHeaderClick('toggleSettings');
            }
        });
        searchButton.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSearchOverlay();
        });
        document.getElementById('settings-popup').addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        inputele.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        setResponsiveElement.addEventListener('click', setMouseOrTouch);
        (0, ej2_base_2.select)('#sb-left-back').addEventListener('click', showHideControlTree);
        leftToggle.addEventListener('click', toggleLeftPane);
        leftToggle.addEventListener('keydown', function (e) {
            if (e.keyCode === 'Enter' || e.keyCode === ' ') {
                toggleLeftPane();
            }
        });
        (0, ej2_base_2.select)('.sb-header-settings').addEventListener('click', viewMobilePrefPane);
        (0, ej2_base_2.select)('.sb-mobile-setting').addEventListener('click', viewMobilePropPane);
        resetSearch.addEventListener('click', resetInput);
        document.getElementById('open-plnkr').addEventListener('click', function () {
            var plnkrForm = (0, ej2_base_2.select)('#stack-form');
            if (plnkrForm) {
                plnkrForm.submit();
            }
        });
        document.getElementById('switch-sb').addEventListener('click', function (e) {
            var target = (0, ej2_base_1.closest)(e.target, 'li');
            if (target) {
                var anchor = target.querySelector('a');
                if (anchor) {
                    anchor.click();
                }
            }
        });
        (0, ej2_base_2.select)('#next-sample').addEventListener('click', onNextButtonClick);
        (0, ej2_base_2.select)('#mobile-next-sample').addEventListener('click', onNextButtonClick);
        (0, ej2_base_2.select)('#prev-sample').addEventListener('click', onPrevButtonClick);
        (0, ej2_base_2.select)('#mobile-prev-sample').addEventListener('click', onPrevButtonClick);
        window.addEventListener('resize', processResize);
        (0, ej2_base_2.select)('.sb-right-pane').addEventListener('click', function () {
            if (isTablet && isLeftPaneOpen()) {
                toggleLeftPane();
            }
        });
        document.getElementById("theme-studio").addEventListener("click", function (event) {
            event.preventDefault();
            var href = "https://ej2.syncfusion.com/themestudio/?theme=".concat(selectedTheme);
            window.open(href, '_blank');
        });
    }
    function copyCode() {
        var copyElem = (0, ej2_base_2.selectAll)('.sb-src-code')[sourceTab.selectedItem];
        var textArea = (0, ej2_base_1.createElement)('textArea');
        textArea.textContent = copyElem.textContent.trim();
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        (0, ej2_base_1.detach)(textArea);
        (0, ej2_base_2.select)('.copy-tooltip').ej2_instances[0].close();
    }
    function renderCopyCode() {
        var ele = (0, ej2_base_1.createElement)('div', { className: 'copy-tooltip', innerHTML: '<div class="e-icons copycode"></div>' });
        document.getElementById('sb-source-tab').appendChild(ele);
        (0, ej2_base_2.select)('.copycode').addEventListener('click', copyCode);
        var copiedTooltip = new ej2_popups_1.Tooltip({
            content: 'Copied to clipboard ',
            position: 'BottomCenter',
            opensOn: 'Click',
            closeDelay: 500
        });
        copiedTooltip.appendTo(ele);
        (0, ej2_base_2.select)('.copycode').addEventListener('click', copyCode);
    }
    function setSbLink() {
        var hrefLink = location.hash.split('/').slice(1);
        var aiControlRegex = /ai-(?!assistview\b)[a-z-]+/;
        var desktopSettings = (0, ej2_base_2.select)('.sb-desktop-setting');
        if (desktopSettings) {
            desktopSettings.style.display = aiControlRegex.test(location.hash) ? 'none' : '';
        }
        var href = location.href = '#/' + selectedTheme + '/' + hrefLink.slice(1).join('/');
        var link = href.match(urlRegex);
        var sample = href.match(sampleRegex)[1];
        for (var _i = 0, sbArray_1 = sbArray; _i < sbArray_1.length; _i++) {
            var sb = sbArray_1[_i];
            var ele = (0, ej2_base_2.select)('#' + sb);
            if (sb === 'aspnetcore' || sb === 'aspnetmvc') {
                ele.href = sb === 'aspnetcore' ? 'https://ej2.syncfusion.com/aspnetcore/' : 'https://ej2.syncfusion.com/aspnetmvc/';
            }
            else if (sb === 'nextjs') {
                var defaultSamplePath = sample.includes('grid/grid-overview') ? sample.split('/')[0] + '/grid/overview' : sample;
                ele.href = 'https://ej2.syncfusion.com/nextjs/demos/' + defaultSamplePath;
            }
            else if (sb === 'blazor') {
                ele.href = 'https://blazor.syncfusion.com/demos/';
            }
            else if (sb === 'react' && location.href.includes('grid/grid-overview.html')) {
                ele.href = ((link) ? ('http://' + link[1] + '/' + (link[3] ? (link[3] + '/') : '')) : ('https://ej2.syncfusion.com/')) + 'react/demos/#/' + selectedTheme + '/grid/overview';
            }
            else {
                ele.href = ((link) ? ('http://' + link[1] + '/' + (link[3] ? (link[3] + '/') : '')) : ('https://ej2.syncfusion.com/')) +
                    sb + '/' + 'demos/#/' + sample + (sb === 'javascript' ? '.html' : '');
            }
        }
    }
    function changeMouseOrTouch(str) {
        var activeEle = setResponsiveElement.querySelector('.active');
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
    function loadTheme(theme) {
        theme = themesToRedirect.indexOf(theme) !== -1 ? 'tailwind3' : theme;
        theme = theme.includes('bootstrap5') ? theme.replace('bootstrap5', 'bootstrap5.3') : theme;
        var body = document.body;
        if (body.classList.length > 0) {
            for (var _i = 0, themeCollection_1 = themeCollection; _i < themeCollection_1.length; _i++) {
                var themeItem = themeCollection_1[_i];
                body.classList.remove(themeItem);
                body.classList.remove(themeItem + '-dark');
            }
        }
        body.classList.add(theme);
        if (darkIgnore.indexOf(theme) !== -1) {
            themeDarkButton.style.display = "none";
            document.getElementById("mobiledarkswitch").style.display = "none";
        }
        if (!isMobile) {
            if (!theme.includes('-dark')) {
                darkButton.innerHTML = "DARK";
                document.getElementById("dark-icon").style.display = "inline-block";
                themeList.querySelector('.active').classList.remove('active');
                theme == 'bootstrap5.3' ? themeList.querySelector('#bootstrap5').classList.add('active') :
                    themeList.querySelector('#' + theme).classList.add('active');
            }
            else {
                darkButton.innerHTML = "LIGHT";
                document.getElementById("light-icon").style.display = "inline-block";
                themeList.querySelector('.active').classList.remove('active');
                theme == 'bootstrap5.3-dark' ? themeList.querySelector('#bootstrap5').classList.add('active') :
                    themeList.querySelector('#' + theme.replace('-dark', "")).classList.add('active');
            }
        }
        var doc = document.getElementById('themelink');
        doc.setAttribute('href', './styles/' + theme + '.css');
        var ajax = new ej2_base_1.Ajax('./styles/' + theme + '.css', 'GET', true);
        ajax.send().then(function (result) {
            selectedTheme = theme;
            selectedTheme = selectedTheme === "bootstrap5.3" ? 'bootstrap5' : selectedTheme === "bootstrap5.3-dark" ? "bootstrap5-dark" : selectedTheme;
            renderLeftPaneComponents();
            renderSbPopups();
            bindEvents();
            if (isTablet || isMobile) {
                contentTab.hideTab(2);
            }
            processDeviceDependables();
            addRoutes(samplesList);
            routeDefault();
            if (isTablet && isLeftPaneOpen()) {
                toggleLeftPane();
            }
            elasticlunr.clearStopWords();
            searchInstance = elasticlunr.Index.load(searchJson);
            hasher.initialized.add(parseHash);
            hasher.changed.add(parseHash);
            hasher.init();
            if (reloadPageForRedirection) {
                window.location.reload();
            }
        });
    }
    function removeMobileOverlay() {
        (0, ej2_base_2.select)('.sb-mobile-overlay').classList.add('sb-hide');
    }
    function isLeftPaneOpen() {
        return sidebar.isOpen;
    }
    function isVisible(elem) {
        return !(0, ej2_base_2.select)(elem).classList.contains('sb-hide');
    }
    function setLeftPaneHeight() {
        var leftPane = (0, ej2_base_2.select)('.sb-left-pane');
        leftPane.style.height = isMobile ? (document.body.offsetHeight + 'px') : '';
    }
    function toggleLeftPane() {
        var reverse = sidebar.isOpen;
        (0, ej2_base_2.select)('#left-sidebar').classList.remove('sb-hide');
        leftToggle.setAttribute('aria-expanded', (!reverse).toString());
        if (!reverse) {
            leftToggle.classList.add('toggle-active');
        }
        else {
            leftToggle.classList.remove('toggle-active');
        }
        if (sidebar) {
            reverse = sidebar.isOpen;
            if (reverse) {
                sidebar.hide();
            }
            else {
                sidebar.show();
            }
        }
    }
    function cusResize() {
        var event;
        if (typeof (Event) === 'function') {
            event = new Event('resize');
        }
        else {
            event = document.createEvent('Event');
            event.initEvent('resize', true, true);
        }
        window.dispatchEvent(event);
    }
    function toggleRightPane() {
        (0, ej2_base_2.select)('#right-sidebar').classList.remove('sb-hide');
        themeDropDown.index = themeCollection.indexOf(selectedTheme);
        if (isMobile) {
            settingsidebar.toggle();
        }
    }
    function viewMobilePrefPane() {
        (0, ej2_base_2.select)('.sb-mobile-prop-pane').classList.add('sb-hide');
        (0, ej2_base_2.select)('.sb-mobile-preference').classList.remove('sb-hide');
        toggleRightPane();
    }
    function viewMobilePropPane() {
        (0, ej2_base_2.select)('.sb-mobile-preference').classList.add('sb-hide');
        (0, ej2_base_2.select)('.sb-mobile-prop-pane').classList.remove('sb-hide');
        toggleRightPane();
    }
    function getSampleList() {
        if (ej2_base_1.Browser.isDevice) {
            var tempList = (0, ej2_base_1.extend)([], samplesJSON.samplesList);
            var sampleList = [];
            for (var _i = 0, tempList_1 = tempList; _i < tempList_1.length; _i++) {
                var temp = tempList_1[_i];
                if (temp.hideOnDevice == true) {
                    continue;
                }
                var data = new ej2_data_1.DataManager(temp.samples);
                temp.samples = data.executeLocal(new ej2_data_1.Query().where('hideOnDevice', 'notEqual', true));
                sampleList = sampleList.concat(temp);
            }
            return sampleList;
        }
        return samplesJSON.samplesList;
    }
    function renderLeftPaneComponents() {
        samplesTreeList = getTreeviewList(samplesList);
        var sampleTreeView = new ej2_navigations_1.TreeView({
            fields: {
                dataSource: samplesTreeList, id: 'id', parentID: 'pid',
                text: 'name', hasChildren: 'hasChild', htmlAttributes: 'url'
            },
            nodeClicked: controlSelect,
            nodeTemplate: '<div><span class="tree-text">${name}</span>' +
                '${if(type === "update")}<span class="e-badge sb-badge e-samplestatus ${type} tree tree-badge">Updated</span>' +
                '${else}${if(type)}<span class="e-badge sb-badge e-samplestatus ${type} tree tree-badge">${type}</span>${/if}${/if}</div>'
        }, '#controlTree');
        var controlList = new ej2_lists_1.ListView({
            dataSource: controlSampleData[location.hash.split('/')[2]] || controlSampleData.grid,
            fields: { id: 'uid', text: 'name', groupBy: 'order', htmlAttributes: 'data' },
            select: controlSelect,
            template: '<div class="e-text-content ${if(type)}e-icon-wrapper${/if}"> <span class="e-list-text">${name}' +
                '</span>${if(type === "update")}<span class="e-badge sb-badge e-samplestatus ${type}">Updated</span>' +
                '${else}${if(type)}<span class="e-badge sb-badge e-samplestatus ${type}">${type}</span>${/if}${/if}' +
                '${if(directory)}<div class="e-icons e-icon-collapsible"></div>${/if}</div>',
            groupTemplate: '${if(items[0]["category"])}<div class="e-text-content">' +
                '<span class="e-list-text">${items[0].category}</span>' +
                '</div>${/if}',
            actionComplete: setSelectList
        }, '#controlList');
    }
    function getTreeviewList(list) {
        var id;
        var pid;
        var tempList = [];
        var category = '';
        for (var i = 0; i < list.length; i++) {
            if (category !== list[i].category) {
                category = list[i].category;
                tempList = tempList.concat({ id: i + 1, name: list[i].category, hasChild: true, expanded: true });
                pid = i + 1;
                id = pid;
            }
            id += 1;
            tempList = tempList.concat({
                id: id,
                pid: pid,
                name: list[i].name,
                type: list[i].type,
                url: {
                    'data-path': '/' + list[i].directory + '/' + list[i].samples[0].url + '.html',
                    'control-name': list[i].directory,
                }
            });
            controlSampleData[list[i].directory] = getSamples(list[i].samples);
        }
        return tempList;
    }
    function getSamples(samples) {
        var tempSamples = [];
        for (var i = 0; i < samples.length; i++) {
            tempSamples[i] = samples[i];
            tempSamples[i].data = { 'sample-name': samples[i].url, 'data-path': '/' + samples[i].dir + '/' + samples[i].url + '.html' };
        }
        return tempSamples;
    }
    function controlSelect(arg) {
        var path = (arg.node || arg.item).getAttribute('data-path');
        var curHashCollection = '/' + location.hash.split('/').slice(2).join('/');
        if (path) {
            controlListRefresh(arg.node || arg.item);
            if (path !== curHashCollection) {
                sampleOverlay();
                var theme_1 = location.hash.split('/')[1] || 'tailwind3';
                if (arg.item && ((isMobile && !(0, ej2_base_2.select)('#left-sidebar').classList.contains('sb-hide')) ||
                    ((isTablet || (ej2_base_1.Browser.isDevice && isPc)) && isLeftPaneOpen()))) {
                    toggleLeftPane();
                }
                window.hashString = '#/' + theme_1 + path;
                setTimeout(function () {
                    location.hash = '#/' + theme_1 + path;
                }, 600);
            }
        }
    }
    function controlListRefresh(ele) {
        var samples = controlSampleData[ele.getAttribute('control-name')];
        if (samples) {
            var listView = (0, ej2_base_2.select)('#controlList').ej2_instances[0];
            listView.dataSource = samples;
            showHideControlTree();
        }
    }
    function showHideControlTree() {
        var controlTree = (0, ej2_base_2.select)('#controlTree');
        var controlList = (0, ej2_base_2.select)('#controlSamples');
        var reverse = (0, ej2_base_2.select)('#controlTree').style.display === 'none';
        reverse ? viewSwitch(controlList, controlTree, reverse) : viewSwitch(controlTree, controlList, reverse);
    }
    function viewSwitch(from, to, reverse) {
        var anim = new ej2_base_1.Animation({ duration: 500, timingFunction: 'ease' });
        var controlTree = (0, ej2_base_2.select)('#controlTree');
        var controlList = (0, ej2_base_2.select)('#controlList');
        controlTree.style.overflowY = 'hidden';
        controlList.classList.remove('e-view');
        controlList.classList.remove('sb-control-list-top');
        controlList.classList.add('sb-adjust-juggle');
        to.style.display = '';
        anim.animate(from, {
            name: reverse ? 'SlideRightOut' : 'SlideLeftOut', end: function () {
                controlTree.style.overflowY = 'auto';
                from.style.display = 'none';
                controlList.classList.add('e-view');
                controlList.classList.add('sb-control-list-top');
                controlList.classList.remove('sb-adjust-juggle');
            }
        });
        anim.animate(to, { name: reverse ? 'SlideLeftIn' : 'SlideRightIn' });
    }
    function setSelectList() {
        var hString = window.hashString || location.hash;
        var hash = hString.split('/');
        var list = (0, ej2_base_2.select)('#controlList').ej2_instances[0];
        var control = (0, ej2_base_2.select)('[control-name="' + hash[2] + '"]');
        var eles = document.querySelectorAll('#controlList .e-list-item.e-level-1');
        for (var _i = 0, _a = eles; _i < _a.length; _i++) {
            var ele = _a[_i];
            ele.tabIndex = 0;
        }
        if (control) {
            var data = list.dataSource;
            var samples = controlSampleData[control.getAttribute('control-name')];
            if (JSON.stringify(data) !== JSON.stringify(samples)) {
                list.dataSource = samples;
                list.dataBind();
            }
            var selectSample = (0, ej2_base_2.select)('[sample-name="' + hash.slice(-1)[0].split('.html')[0] + '"]');
            if (selectSample) {
                if ((0, ej2_base_2.select)('#controlTree').style.display !== 'none') {
                    showHideControlTree();
                }
                list.selectItem(selectSample);
                selectSample.scrollIntoView({ block: "nearest" });
            }
        }
        else {
            showHideControlTree();
            list.selectItem((0, ej2_base_2.select)('[sample-name="grid-overview"]'));
        }
    }
    function toggleButtonState(id, state) {
        var ele = document.getElementById(id);
        var mobileEle = document.getElementById('mobile-' + id);
        ele.disabled = state;
        mobileEle.disabled = state;
        if (state) {
            mobileEle.classList.add('e-disabled');
            ele.classList.add('e-disabled');
        }
        else {
            mobileEle.classList.remove('e-disabled');
            ele.classList.remove('e-disabled');
        }
    }
    function setPropertySectionHeight() {
        var propertypane = (0, ej2_base_2.select)('.property-section');
        var ele = document.querySelector('.control-section');
        if (ele && propertypane) {
            ele.classList.add('sb-property-border');
        }
        else {
            ele.classList.remove('sb-property-border');
        }
    }
    function routeDefault() {
        crossRoads.addRoute('', function () {
            window.location.href = '#/' + selectedTheme + '/grid/grid-overview.html';
            isInitRedirected = true;
        });
        crossRoads.bypassed.add(function (request) {
            var hash = request.split('.html')[0].split('/');
            if (samplePath.indexOf(hash.slice(1).join('/')) === -1) {
                location.hash = '#/' + hash[0] + '/' + (defaultSamples[hash[1]] || 'grid/grid-overview.html');
                isInitRedirected = true;
                reloadPageForRedirection = true;
            }
        });
    }
    function destroyControls() {
        var elementlist = (0, ej2_base_2.selectAll)('.e-control', document.getElementById('control-content'));
        for (var _i = 0, elementlist_2 = elementlist; _i < elementlist_2.length; _i++) {
            var control = elementlist_2[_i];
            var eleinstance = control.ej2_instances;
            if (eleinstance) {
                for (var _a = 0, eleinstance_2 = eleinstance; _a < eleinstance_2.length; _a++) {
                    var instance = eleinstance_2[_a];
                    if (instance.element && document.contains(instance.element)) {
                        instance.destroy();
                    }
                }
            }
        }
    }
    function loadScriptfile(path) {
        var scriptEle = document.querySelector('script[src="' + path + '"]');
        var doFun;
        var p2 = new Promise(function (resolve, reject) {
            doFun = resolve;
        });
        if (!scriptEle) {
            scriptEle = document.createElement('script');
            scriptEle.setAttribute('type', 'text/javascript');
            scriptEle.setAttribute('src', path);
            scriptEle.onload = doFun;
            if (typeof scriptEle !== 'undefined') {
                document.getElementsByTagName('head')[0].appendChild(scriptEle);
            }
        }
        else {
            doFun();
        }
        return p2;
    }
    function getExecFunction(sample) {
        if (execFunction.hasOwnProperty(sample)) {
            return execFunction[sample];
        }
        else {
            return execFunction[sample] = window.default;
        }
    }
    function errorHandler(error) {
        document.getElementById('control-content').innerHTML = error ? error : 'Not Available';
        (0, ej2_base_2.select)('#control-content').classList.add('error-content');
        removeOverlay();
    }
    function plunker(results) {
        var plnkr = JSON.parse(results);
        var prevForm = (0, ej2_base_2.select)('#stack-form');
        if (prevForm) {
            (0, ej2_base_1.detach)(prevForm);
        }
        var form = (0, ej2_base_1.createElement)('form');
        var res = 'https://stackblitz.com/run';
        form.setAttribute('action', res);
        form.setAttribute('method', 'post');
        form.setAttribute('target', '_blank');
        form.id = 'stack-form';
        form.style.display = 'none';
        document.body.appendChild(form);
        var plunks = Object.keys(plnkr);
        for (var x = 0; x < plunks.length; x++) {
            createStackInput((plunks[x] === 'package.json' ? 'project[dependencies]' : 'project[files][' + plunks[x] + ']'), plnkr[plunks[x]], form);
        }
        createStackInput('project[template]', 'typescript', form);
        createStackInput('project[description]', 'Essential JS 2 Sample', form);
        createStackInput('project[settings]', '{"compile":{"clearConsole":true}}', form);
    }
    function createStackInput(name, value, form) {
        var input = (0, ej2_base_1.createElement)('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', name);
        input.setAttribute('value', value.replace(/{{theme}}/g, selectedTheme).replace(/{{ripple}}/, (selectedTheme.indexOf('material') !== -1) ? 'import { enableRipple } from \'@syncfusion/ej2-base\';\nenableRipple(true);\n' : ''));
        form.appendChild(input);
    }
    function addRoutes(samplesList) {
        var _loop_1 = function (node) {
            defaultSamples[node.directory] = node.directory + '/' + node.samples[0].url + '.html';
            var dataManager = new ej2_data_1.DataManager(node.samples);
            var samples = dataManager.executeLocal(new ej2_data_1.Query().sortBy('order', 'ascending'));
            var _loop_2 = function (subNode) {
                var control = node.directory;
                var sample = subNode.url;
                samplePath = samplePath.concat(control + '/' + sample);
                var sampleName = node.name + ' / ' + ((node.name !== subNode.category) ?
                    (subNode.category + ' / ') : '') + subNode.name;
                var selectedTheme_1 = location.hash.split('/')[1] ? location.hash.split('/')[1] : 'tailwind3';
                var urlString = '/' + selectedTheme_1 + '/' + control + '/' + sample + '.html';
                samplesAr.push('#' + urlString);
                crossRoads.addRoute(urlString, function () {
                    var controlID = node.uid;
                    var sampleID = subNode.uid;
                    document.getElementById('open-plnkr').disabled = true;
                    var openNew = (0, ej2_base_2.select)('#openNew');
                    if (openNew) {
                        openNew.href = location.href.split('#')[0] + node.directory + '/' + subNode.url + '/index.html';
                    }
                    setSbLink();
                    var sourcePromise = [];
                    var sObj = [];
                    sourcePromise.push((new ej2_base_1.Ajax('src/' + control + '/' + sample + '.ts', 'GET', true)).send());
                    sObj.push({
                        header: { text: sample + '.ts' },
                        data: '',
                        content: sample + '.ts'
                    });
                    sourcePromise.push((new ej2_base_1.Ajax('src/' + control + '/' + sample + '.html', 'GET', true)).send());
                    sObj.push({
                        header: { text: sample + '.html' },
                        data: '',
                        content: sample + '.html'
                    });
                    if (subNode.sourceFiles) {
                        sourcePromise = [];
                        sObj = [];
                        var sourcefiles = subNode.sourceFiles;
                        for (var _i = 0, sourcefiles_1 = sourcefiles; _i < sourcefiles_1.length; _i++) {
                            var sfile = sourcefiles_1[_i];
                            var spromise = (new ej2_base_1.Ajax(sfile.path, 'GET', true)).send();
                            sourcePromise.push(spromise);
                            sObj.push({
                                header: { text: sfile.displayName },
                                data: '',
                                content: sfile.displayName
                            });
                        }
                    }
                    var content;
                    Promise.all(sourcePromise).then(function (results) {
                        results.forEach(function (value, index) {
                            var srcobj = sObj[index];
                            if (srcobj.content.indexOf('.html') > 0) {
                                content = getStringWithOutDescription(value.toString(), /(\'|\")description/g);
                                content = getStringWithOutDescription(content.toString(), /(\'|\")action-description/g);
                            }
                            var defRegex = /(this.|export |\(window as any\).)default (= |)\(\)(: void|) => {/g;
                            var resValue = value.toString().replace(defRegex, '');
                            resValue = resValue.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                            var lInd = resValue.lastIndexOf('};');
                            resValue = resValue.substring(0, lInd) + resValue.substring(lInd + 2);
                            content = srcobj.content.indexOf('.html') > 0 ? content.replace(/@section (ActionDescription|Description){[^}]*}/g, '').replace(/&/g, '&amp;')
                                .replace(/"/g, '&quot;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : resValue;
                            sObj[index].data = content;
                        });
                        sourceTabItems = sObj;
                    });
                    var ajaxHTML = new ej2_base_1.Ajax('src/' + control + '/' + sample + '.html', 'GET', true);
                    var p1 = ajaxHTML.send();
                    var p2 = loadScriptfile('src/' + control + '/' + sample + '.js');
                    sampleNameElement.innerHTML = node.name;
                    sampleNameElement.setAttribute('title', node.name);
                    contentTab.selectedItem = 0;
                    breadCrumbComponent.innerHTML = node.name;
                    if (node.name !== subNode.category) {
                        breadCrumbSubCategory.innerHTML = subNode.category;
                        breadCrumbSubCategory.style.display = '';
                        breadCrumSeperator.style.display = '';
                    }
                    else {
                        breadCrumbSubCategory.style.display = 'none';
                        breadCrumSeperator.style.display = 'none';
                    }
                    breadCrumbSample.innerHTML = subNode.name;
                    var title = document.querySelector('title');
                    title.innerHTML = node.name + ' · ' + subNode.name + ' · Essential JS 2 · Syncfusion ';
                    var plunk = new ej2_base_1.Ajax('src/' + control + '/' + sample + '-stack.json', 'GET', true);
                    var p3 = plunk.send();
                    p3.then(function (result) {
                        document.getElementById('open-plnkr').disabled = false;
                        plunker(result);
                    });
                    Promise.all([
                        p1,
                        p2
                    ]).then(function (results) {
                        var htmlString = results[0].toString();
                        destroyControls();
                        currentControlID = controlID;
                        currentSampleID = sampleID;
                        currentControl = node.directory;
                        var curIndex = samplesAr.indexOf(location.hash);
                        var samLength = samplesAr.length - 1;
                        if (curIndex === samLength) {
                            toggleButtonState('next-sample', true);
                        }
                        else {
                            toggleButtonState('next-sample', false);
                        }
                        if (curIndex === 0) {
                            toggleButtonState('prev-sample', true);
                        }
                        else {
                            toggleButtonState('prev-sample', false);
                        }
                        (0, ej2_base_2.select)('#control-content').classList.remove('error-content');
                        document.getElementById('control-content').innerHTML = htmlString;
                        var controlEle = document.querySelector('.control-section');
                        var controlString = controlEle.innerHTML;
                        controlEle.innerHTML = '';
                        controlEle.appendChild((0, ej2_base_1.createElement)('div', { className: 'control-wrapper', innerHTML: controlString }));
                        (0, propertypane_1.renderPropertyPane)('#property');
                        (0, propertypane_1.renderDescription)();
                        (0, propertypane_1.renderActionDescription)();
                        var htmlCode = (0, ej2_base_1.createElement)('div', { innerHTML: htmlString });
                        var description = htmlCode.querySelector('#description');
                        if (description) {
                            (0, ej2_base_1.detach)(description);
                        }
                        var actionDesc = htmlCode.querySelector('#action-description');
                        if (actionDesc) {
                            (0, ej2_base_1.detach)(actionDesc);
                        }
                        getExecFunction(control + sample)();
                        window.navigateSample();
                        isExternalNavigation = defaultTree = false;
                        checkApiTableDataSource();
                        setPropertySectionHeight();
                        removeOverlay();
                        var mobilePropPane = (0, ej2_base_2.select)('.sb-mobile-prop-pane .property-section');
                        if (mobilePropPane) {
                            (0, ej2_base_1.detach)(mobilePropPane);
                        }
                        var propPanel = (0, ej2_base_2.select)('#control-content .property-section');
                        if (isMobile) {
                            if (propPanel) {
                                (0, ej2_base_2.select)('.sb-mobile-setting').classList.remove('sb-hide');
                                (0, ej2_base_2.select)('.sb-mobile-prop-pane').appendChild(propPanel);
                            }
                            else {
                                (0, ej2_base_2.select)('.sb-mobile-setting').classList.add('sb-hide');
                            }
                        }
                    });
                });
            };
            for (var _a = 0, samples_1 = samples; _a < samples_1.length; _a++) {
                var subNode = samples_1[_a];
                _loop_2(subNode);
            }
        };
        for (var _i = 0, samplesList_1 = samplesList; _i < samplesList_1.length; _i++) {
            var node = samplesList_1[_i];
            _loop_1(node);
        }
        var isTempLocaion;
        if (location.hash.indexOf('.html') === -1) {
            isTempLocaion = location.hash + ".html";
        }
        else {
            isTempLocaion = location.hash;
        }
        if (ej2_base_1.Browser.isDevice) {
            if (location.hash && location.hash !== "" && samplesAr.indexOf(isTempLocaion) == -1) {
                var toastObj_1 = new ej2_notifications_1.Toast({
                    position: {
                        X: 'Right'
                    }
                });
                toastObj_1.appendTo('#sb-home');
                setTimeout(function () {
                    toastObj_1.show({
                        content: "".concat(location.hash.split('/')[2], " component not supported in mobile device")
                    });
                }, 200);
            }
        }
    }
    function removeOverlay() {
        document.body.setAttribute('aria-busy', 'false');
        sbContentOverlay.classList.add('sb-hide');
        sbRightPane.classList.remove('sb-right-pane-overlay');
        sbHeader.classList.remove('sb-right-pane-overlay');
        mobNavOverlay(false);
        if (!sbBodyOverlay.classList.contains('sb-hide')) {
            sbBodyOverlay.classList.add('sb-hide');
        }
        if (!isMobile) {
            sbRightPane.scrollTop = 0;
        }
        else {
            sbRightPane.scrollTop = 74;
        }
        if (cultureDropDown.value !== 'en') {
            changeRtl({
                locale: cultureDropDown.value,
                enableRtl: cultureDropDown.value === 'ar',
                currencyCode: currencyDropDown.value
            });
        }
    }
    function sampleOverlay() {
        document.body.setAttribute('aria-busy', 'true');
        sbHeader.classList.add('sb-right-pane-overlay');
        sbRightPane.classList.add('sb-right-pane-overlay');
        mobNavOverlay(true);
        sbContentOverlay.classList.remove('sb-hide');
    }
    function mobNavOverlay(isOverlay) {
        if (ej2_base_1.Browser.isDevice) {
            var mobileFoorter = (0, ej2_base_2.select)('.sb-mobilefooter');
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
    function checkSampleLength(directory) {
        var data = new ej2_data_1.DataManager(samplesList);
        var controls = data.executeLocal(new ej2_data_1.Query().where('directory', 'equal', directory));
        return controls[0].samples.length > 1;
    }
    function parseHash(newHash, oldHash) {
        var newTheme = newHash.split('/')[0];
        var control = newHash.split('/')[1];
        if (newTheme !== selectedTheme && themeCollection.indexOf(newTheme) !== -1) {
            location.reload();
        }
        samplesJSON.skipCommonChunk = window.sampleSkip || [];
        if (newHash.length && !(0, ej2_base_2.select)('#' + control + '-common') && checkSampleLength(control) &&
            samplesJSON.skipCommonChunk.indexOf(control) === -1) {
            var scriptElement = document.createElement('script');
            scriptElement.src = 'src/' + control + '/common.js';
            scriptElement.id = control + '-common';
            scriptElement.type = 'text/javascript';
            scriptElement.onload = function () {
                crossRoads.parse(newHash);
            };
            document.getElementsByTagName('head')[0].appendChild(scriptElement);
        }
        else {
            crossRoads.parse(newHash);
        }
    }
    function getSourceTabHeader(index) {
        return document.querySelectorAll('.sb-source-code-section>.e-tab-header .e-tab-text')[index];
    }
    function processDeviceDependables() {
        if (ej2_base_1.Browser.isDevice) {
            (0, ej2_base_2.select)('.sb-desktop-setting').classList.add('sb-hide');
        }
        else {
            (0, ej2_base_2.select)('.sb-desktop-setting').classList.remove('sb-hide');
        }
    }
    function checkTabHideStatus() {
        if (!intialLoadCompleted) {
            contentTab.hideTab(1);
            intialLoadCompleted = true;
        }
    }
    function getStringWithOutDescription(code, descRegex) {
        var lines = code.split('\n');
        var desStartLine = null;
        var desEndLine = null;
        var desInsideDivCnt = 0;
        for (var i = 0; i < lines.length; i++) {
            var curLine = lines[i];
            if (desStartLine) {
                if (/<div/g.test(curLine)) {
                    desInsideDivCnt = desInsideDivCnt + 1;
                }
                if (desInsideDivCnt && /<\/div>/g.test(curLine)) {
                    desInsideDivCnt = desInsideDivCnt - 1;
                }
                else if (!desEndLine && /<\/div>/g.test(curLine)) {
                    desEndLine = i + 1;
                }
            }
            if (descRegex.test(curLine)) {
                desStartLine = i;
            }
        }
        if (desEndLine && desStartLine) {
            lines.splice(desStartLine, desEndLine - desStartLine);
        }
        return lines.join('\n');
    }
    function loadJSON() {
        var switchText = localStorage.getItem('ej2-switch') || 'mouse';
        if (ej2_base_1.Browser.isDevice || window.screen.width <= 850) {
            switchText = 'touch';
        }
        setLeftPaneHeight();
        if (isMobile) {
            (0, ej2_base_2.select)('.sb-left-footer-links').appendChild((0, ej2_base_2.select)('.sb-footer-left'));
            (0, ej2_base_2.select)('#left-sidebar').classList.add('sb-hide');
            leftToggle.classList.remove('toggle-active');
        }
        if (isTablet || (ej2_base_1.Browser.isDevice && isPc)) {
            leftToggle.classList.remove('toggle-active');
            (0, ej2_base_2.select)('.sb-right-pane').classList.add('control-fullview');
        }
        overlay();
        changeMouseOrTouch(switchText);
        (0, ej2_base_1.enableRipple)(selectedTheme.indexOf('material') !== -1 || !selectedTheme);
        localStorage.removeItem('ej2-switch');
        loadTheme(selectedTheme);
    }
    loadJSON();
});
