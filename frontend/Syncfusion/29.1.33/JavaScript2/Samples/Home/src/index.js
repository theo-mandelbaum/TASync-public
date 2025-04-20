"use strict";
exports.__esModule = true;
var elasticlunr = require("./lib/elasticlunr");
require("../node_modules/es6-promise/dist/es6-promise");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_dropdowns_1 = require("@syncfusion/ej2-dropdowns");
var ej2_navigations_1 = require("@syncfusion/ej2-navigations");
var ej2_popups_1 = require("@syncfusion/ej2-popups");
var content = "Copyright © 2001 - " + new Date().getFullYear() + " Syncfusion<sup>®</sup> Inc. All Rights Reserved";
var copyRightDesktop = document.querySelector('#copyright-desktop').querySelector('a');
var copyRightMobile = document.querySelector('#copyright').querySelector('a');
copyRightDesktop.innerHTML = content;
copyRightMobile.innerHTML = content;
ej2_base_1.registerLicense('{SyncfusionJSLicensekey}');
var carouselObjMob = new ej2_navigations_1.Carousel({
    cssClass: 'db-carousel',
    interval: 5000,
    items: [
        { template: '#itemTemplate1' },
        { template: '#itemTemplate2' },
        { template: '#itemTemplate3' },
        { template: '#itemTemplate4' },
        { template: '#itemTemplate5' },
        { template: '#itemTemplate6' },
        { template: '#itemTemplate7' },
        { template: '#itemTemplate8' },
        { template: '#itemTemplate17' },
        { template: '#itemTemplate19' },
        { template: '#itemTemplate20' },
        { template: '#itemTemplate21' },
        { template: '#itemTemplate22' },
        { template: '#itemTemplate28' },
        { template: '#itemTemplate29' },
        { template: '#itemTemplate32' },
        { template: '#itemTemplate34' },
        { template: '#itemTemplate39' },
        { template: '#itemTemplate40' },
        { template: '#itemTemplate41' },
        { template: '#itemTemplate42' }
    ],
    buttonsVisibility: 'Visible',
    showIndicators: false
});
carouselObjMob.appendTo(document.getElementById('carouselmob'));
var carouselObjDesk = new ej2_navigations_1.Carousel({
    cssClass: 'db-carousel',
    interval: 5000,
    items: [
        { template: '#itemTemplate9' },
        { template: '#itemTemplate10' },
        { template: '#itemTemplate11' },
        { template: '#itemTemplate12' },
        { template: '#itemTemplate13' },
        { template: '#itemTemplate14' },
        { template: '#itemTemplate15' },
        { template: '#itemTemplate16' },
        { template: '#itemTemplate18' },
        { template: '#itemTemplate23' },
        { template: '#itemTemplate24' },
        { template: '#itemTemplate25' },
        { template: '#itemTemplate26' },
        { template: '#itemTemplate27' },
        { template: '#itemTemplate30' },
        { template: '#itemTemplate32' },
        { template: '#itemTemplate33' },
        { template: '#itemTemplate35' },
        { template: '#itemTemplate36' },
        { template: '#itemTemplate37' },
        { template: '#itemTemplate38' }
    ],
    buttonsVisibility: 'Visible',
    showIndicators: false
});
carouselObjDesk.appendTo(document.getElementById('carouseldesk'));
var sbMatcher = {
    typescript: "demos/",
    javascript: "javascript/demos/",
    angular: "angular/demos/",
    react: "react/demos/",
    vue: "vue/demos/"
};
var sbLocation = {
    "index.html": "Typescript/",
    "": "TypeScript/",
    "angular.html": "Angular/",
    "react.html": "React/",
    "javascript.html": "JavaScript/",
    "vue.html": "Vue/"
};
var toolbarItemCollection = [
    {
        template: "   <a class=\"tab-link\" href=\"./index.html#platform\" aria-controls=\"typescript\" role=\"tab\"\n        data-toggle=\"tab\">\n        JavaScript\n    </a>",
        align: "Center"
    },
    {
        template: "<a class=\"tab-link\" href=\"./angular.html#platform\" aria-controls=\"angular\" role=\"tab\"\n        data-toggle=\"tab\">\n        Angular\n    </a>",
        align: "Center"
    },
    {
        template: "  <a class=\"tab-link\" href=\"./react.html#platform\" aria-controls=\"react\" role=\"tab\"\n        data-toggle=\"tab\">\n        React\n    </a>",
        align: "Center"
    },
    {
        template: "<a class=\"tab-link\" href=\"./vue.html#platform\" aria-controls=\"vue\" role=\"tab\" data-toggle=\"tab\">\n        Vue\n    </a>",
        align: "Center"
    },
    {
        template: "  <a class=\"tab-link\" href=\"./javascript.html#platform\" aria-controls=\"javascript\" role=\"tab\"\n        data-toggle=\"tab\">\n        JavaScript (ES5)\n    </a>",
        align: "Center"
    },
];
var id = window.activeId;
if (!ej2_base_1.isNullOrUndefined(id)) {
    toolbarItemCollection[id].cssClass = "active";
}
var toolbar = new ej2_navigations_1.Toolbar({
    height: "72px",
    items: toolbarItemCollection
});
toolbar.appendTo("#platform");
var platformFocus = document.getElementsByClassName('e-toolbar-item active e-template');
if (platformFocus && platformFocus[0]) {
    platformFocus[0].scrollIntoView();
}
var htmlMatch = ["typescript", "javascript", "vue"];
var ej2Regex = /ej2.syncfusion.com/;
var urlRegex = /(npmci\.syncfusion\.com|ej2\.syncfusion\.com)(\/)(development\/|production\/)*/;
var platform = ej2_base_1.select("body").getAttribute("data-sb-name");
var curSbPath = sbMatcher[platform];
var href = location.href;
var link = href.match(urlRegex);
var curLink = (ej2Regex.test(location.origin) ? "https" : "http") +
    "://" +
    (link ? link[0] : "npmci.syncfusion.com/development/") +
    curSbPath;
var searchInstance;
var popupEle = ej2_base_1.select("#search-popup");
var mobpopupEle = ej2_base_1.select("#mob-search-popup");
var searchEle = ej2_base_1.select("#search-box");
var mobsearchEle = ej2_base_1.select("#mob-search-box");
var searchPopup = new ej2_popups_1.Popup(popupEle, {
    offsetY: 5,
    targetType: "relative",
    relateTo: searchEle,
    position: { X: "left", Y: "bottom" },
    collision: { X: "none", Y: "none" }
});
var mobsearchPopup = new ej2_popups_1.Popup(mobpopupEle, {
    offsetY: 5,
    targetType: "relative",
    relateTo: mobsearchEle,
    position: { X: "left", Y: "bottom" },
    collision: { X: "none", Y: "none" }
});
var searchBox = null;
var mobsearchBox = null;
var reRouter = ej2_base_1.select("#sb-re-route");
var suffix = htmlMatch.indexOf(platform) !== -1 ? ".html" : "";
var listObject = {
    fields: { id: "uid", groupBy: "component", text: "name" },
    template: '<div class="e-text-content e-icon-wrapper"' +
        (platform !== "react"
            ? 'data="${dir}/${url}" pid="${parentId}"'
            : 'data="${path}"') +
        'uid="${uid}">' +
        '<span class="e-list-text" role="list-item">' +
        "${name}</span></div>",
    groupTemplate: '${if(items[0]["component"])}<div class="e-text-content"><span class="e-search-group">${items[0].component}</span>' +
        "</div>${/if}"
};
searchPopup.hide();
mobsearchPopup.hide();
window.onresize = function () {
    if (searchPopup &&
        searchPopup.element.className.indexOf("e-popup-close") === -1 &&
        mobsearchPopup &&
        mobsearchPopup.element.className.indexOf("e-popup-close") === -1) {
        searchPopup.hide();
        mobsearchPopup.hide();
    }
    if (window.searchBox && window.searchBox.isPopupOpen) {
        window.searchBox.hidePopup();
    }
    if (window.mobsearchBox && window.mobsearchBox.isPopupOpen) {
        window.mobsearchBox.hidePopup();
    }
};
//To Prevent navigation to product page from mobile app
if (localStorage.getItem("isEJ2App")) {
    document.querySelector(".header-logo>a").href = "#";
    document.querySelector(".header-logo>a").target = "";
}
function initiateSearch() {
    var searchAjax;
    var jsPlatform = ["aspnetcore", "aspnetmvc", "javascript"];
    var extension = jsPlatform.indexOf(platform) !== -1 ? "js" : "json";
    searchAjax = new ej2_base_1.Ajax("./src/json/" + platform + "-search." + extension, "GET", true);
    searchAjax.send().then(function (result) {
        if (platform === "aspnetcore" ||
            platform === "aspnetmvc" ||
            platform === "javascript") {
            var stringIndex = result.indexOf("{");
            result = result.slice(stringIndex);
        }
        var searchJson = JSON.parse(result);
        elasticlunr.clearStopWords();
        var fields = {
            groupBy: "doc.component",
            value: "doc.name",
            text: "doc.name"
        };
        searchInstance = elasticlunr.Index.load(searchJson);
        var searchBox = new ej2_dropdowns_1.AutoComplete({
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
                    boolean: "AND"
                });
                var query = new ej2_data_1.Query().take(10).select("doc");
                var fields = searchBox.fields;
                e.updateData(val, query, fields);
            },
            placeholder: "Search components or features",
            noRecordsTemplate: '<div class="search-no-record">We’re sorry. We cannot find any matches for your search term.</div>',
            fields: fields,
            popupHeight: "auto",
            suggestionCount: 10,
            highlight: true,
            select: function (e) {
                var docPath = e.itemData.path
                    ? e.itemData.path.replace(":theme/", "")
                    : e.itemData.doc
                        ? e.itemData.doc.path
                        : null;
                var demoPath = docPath
                    ? docPath
                    : e.itemData.doc.dir + "/" + e.itemData.doc.url;
                if (location.href.indexOf("Home") !== -1) {
                    curLink =
                        location.origin + "/" + sbLocation[location.href.split("/")[4].split("#")[0]];
                    reRouter.href = curLink + "#/tailwind3/" + demoPath + suffix;
                }
                else if (location.href.indexOf("aspnetmvc") !== -1) {
                    reRouter.href =
                        "https://ej2.syncfusion.com/aspnetmvc/" +
                            demoPath +
                            "#/tailwind3" +
                            suffix;
                }
                else if (location.href.indexOf("aspnetcore") !== -1) {
                    reRouter.href =
                        "https://ej2.syncfusion.com/aspnetcore/" +
                            demoPath +
                            "#/tailwind3" +
                            suffix;
                }
                else {
                    reRouter.href =
                        "https://ej2.syncfusion.com/" +
                            curSbPath +
                            "#/tailwind3/" +
                            demoPath +
                            suffix;
                }
                reRouter.click();
            }
        });
        window.searchBox = searchBox;
        searchBox.appendTo("#search-box");
        var mobsearchBox = new ej2_dropdowns_1.AutoComplete({
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
                    boolean: "AND"
                });
                var query = new ej2_data_1.Query().take(10).select("doc");
                var fields = mobsearchBox.fields;
                e.updateData(val, query, fields);
            },
            placeholder: "Search components or features",
            noRecordsTemplate: '<div class="search-no-record">We’re sorry. We cannot find any matches for your search term.</div>',
            fields: fields,
            popupHeight: "auto",
            suggestionCount: 10,
            highlight: true,
            select: function (e) {
                var docPath = e.itemData.path
                    ? e.itemData.path.replace(":theme/", "")
                    : e.itemData.doc
                        ? e.itemData.doc.path
                        : null;
                var demoPath = docPath
                    ? docPath
                    : e.itemData.doc.dir + "/" + e.itemData.doc.url;
                if (location.href.indexOf("Home") !== -1) {
                    curLink =
                        location.origin + "/" + sbLocation[location.href.split("/")[4].split("#")[0]];
                    reRouter.href = curLink + "#/tailwind3/" + demoPath + suffix;
                }
                else if (location.href.indexOf("aspnetmvc") !== -1) {
                    reRouter.href =
                        "https://ej2.syncfusion.com/aspnetmvc/" +
                            demoPath +
                            "#/tailwind3" +
                            suffix;
                }
                else if (location.href.indexOf("aspnetcore") !== -1) {
                    reRouter.href =
                        "https://ej2.syncfusion.com/aspnetcore/" +
                            demoPath +
                            "#/tailwind3" +
                            suffix;
                }
                else {
                    reRouter.href =
                        "https://ej2.syncfusion.com/" +
                            curSbPath +
                            "#/tailwind3/" +
                            demoPath +
                            suffix;
                }
                reRouter.click();
            }
        });
        window.mobsearchBox = mobsearchBox;
        mobsearchBox.appendTo("#mob-search-box");
    });
    var classname_array = [
        ".typescriptbtn",
        ".angularbtn",
        ".javascriptbtn",
        ".reactbtn",
        ".netcorebtn",
        ".netmvcbtn",
        ".vuebtn",
        ".blazorbtn"
    ];
    var content = [
        "TypeScript",
        "Angular",
        "JavaScript (ES5)",
        "React",
        "ASP.NET Core",
        "ASP.NET MVC",
        "Vue",
        "Blazor"
    ];
    for (var i = 0; i < classname_array.length; i++) {
        var element = document.querySelectorAll(classname_array[i]);
        for (var j = 0; j < element.length; j++) {
            new ej2_popups_1.Tooltip({ content: content[i], position: "BottomCenter" }, element[j]);
        }
    }
    document.getElementById("mob-search").classList.add("mb-search");
    document.getElementById("mbSearch").classList.add("search-hide");
}
initiateSearch();
