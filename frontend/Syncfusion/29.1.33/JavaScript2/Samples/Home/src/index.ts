import * as elasticlunr from "./lib/elasticlunr";
import "../node_modules/es6-promise/dist/es6-promise";
import { Query } from "@syncfusion/ej2-data";
import { Browser, isNullOrUndefined, Ajax, select, registerLicense } from "@syncfusion/ej2-base";
import { AutoComplete } from "@syncfusion/ej2-dropdowns";
import { Toolbar, ItemModel, Carousel } from "@syncfusion/ej2-navigations";
import { Popup, Tooltip } from "@syncfusion/ej2-popups";

const content: string = "Copyright © 2001 - "+ new Date().getFullYear() +" Syncfusion<sup>®</sup> Inc. All Rights Reserved";
const copyRightDesktop: HTMLElement = document.querySelector('#copyright-desktop').querySelector('a');
const copyRightMobile: HTMLElement = document.querySelector('#copyright').querySelector('a');
copyRightDesktop.innerHTML = content;
copyRightMobile.innerHTML = content;

registerLicense('{SyncfusionJSLicensekey}');
const carouselObjMob: Carousel = new Carousel({
  cssClass: 'db-carousel',
  interval:5000,
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
  showIndicators:false,
});
carouselObjMob.appendTo(document.getElementById('carouselmob'));

const carouselObjDesk: Carousel = new Carousel({
  cssClass: 'db-carousel',
  interval:5000,
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
  showIndicators:false,
});
carouselObjDesk.appendTo(document.getElementById('carouseldesk'));

const sbMatcher: { [key: string]: string } = {
  typescript: "demos/",
  javascript: "javascript/demos/",
  angular: "angular/demos/",
  react: "react/demos/",
  vue: "vue/demos/"
};
const sbLocation: { [key: string]: string } = {
  "index.html": "Typescript/",
  "": "TypeScript/",
  "angular.html": "Angular/",
  "react.html": "React/",
  "javascript.html": "JavaScript/",
  "vue.html": "Vue/"
};
let toolbarItemCollection: ItemModel[] = [
  {
    template: `   <a class="tab-link" href="./index.html#platform" aria-controls="typescript" role="tab"
        data-toggle="tab">
        JavaScript
    </a>`,
    align: "Center"
  },
  {
    template: `<a class="tab-link" href="./angular.html#platform" aria-controls="angular" role="tab"
        data-toggle="tab">
        Angular
    </a>`,
    align: "Center"
  },
  {
    template: `  <a class="tab-link" href="./react.html#platform" aria-controls="react" role="tab"
        data-toggle="tab">
        React
    </a>`,
    align: "Center"
  },
  {
    template: `<a class="tab-link" href="./vue.html#platform" aria-controls="vue" role="tab" data-toggle="tab">
        Vue
    </a>`,
    align: "Center"
  },
  {
    template: `  <a class="tab-link" href="./javascript.html#platform" aria-controls="javascript" role="tab"
        data-toggle="tab">
        JavaScript (ES5)
    </a>`,
    align: "Center"
  },
  
  
];
let id: number = (window as any).activeId;
if (!isNullOrUndefined(id)) {
  toolbarItemCollection[id].cssClass = "active";
}

let toolbar = new Toolbar({
  height: "72px",
  items: toolbarItemCollection
});
toolbar.appendTo("#platform");
let platformFocus = document.getElementsByClassName('e-toolbar-item active e-template');
if (platformFocus && platformFocus[0]) {
  platformFocus[0].scrollIntoView();
}
const htmlMatch: string[] = ["typescript", "javascript", "vue"];
const ej2Regex: RegExp = /ej2.syncfusion.com/;
const urlRegex: RegExp = /(npmci\.syncfusion\.com|ej2\.syncfusion\.com)(\/)(development\/|production\/)*/;
let platform: string = select("body").getAttribute("data-sb-name");
let curSbPath = sbMatcher[platform];
let href: string = location.href;
let link: string[] = href.match(urlRegex);
let curLink: string =
  (ej2Regex.test(location.origin) ? "https" : "http") +
  "://" +
  (link ? link[0] : "npmci.syncfusion.com/development/") +
  curSbPath;
let searchInstance: any;

let popupEle: any = select("#search-popup");
let mobpopupEle: any = select("#mob-search-popup");

let searchEle: any = select("#search-box");
let mobsearchEle: any = select("#mob-search-box");

let searchPopup: Popup = new Popup(popupEle, {
  offsetY: 5,
  targetType: "relative",
  relateTo: searchEle,
  position: { X: "left", Y: "bottom" },
  collision: { X: "none", Y: "none" }
});
let mobsearchPopup: Popup = new Popup(mobpopupEle, {
  offsetY: 5,
  targetType: "relative",
  relateTo: mobsearchEle,
  position: { X: "left", Y: "bottom" },
  collision: { X: "none", Y: "none" }
});

let searchBox: any = null;
let mobsearchBox: any = null;

let reRouter: any = select("#sb-re-route");
let suffix: string = htmlMatch.indexOf(platform) !== -1 ? ".html" : "";
let listObject: any = {
  fields: { id: "uid", groupBy: "component", text: "name" },
  template:
    '<div class="e-text-content e-icon-wrapper"' +
    (platform !== "react"
      ? 'data="${dir}/${url}" pid="${parentId}"'
      : 'data="${path}"') +
    'uid="${uid}">' +
    '<span class="e-list-text" role="list-item">' +
    "${name}</span></div>",
  groupTemplate:
    '${if(items[0]["component"])}<div class="e-text-content"><span class="e-search-group">${items[0].component}</span>' +
    "</div>${/if}"
};

searchPopup.hide();
mobsearchPopup.hide();

window.onresize = function() {
  if (
    searchPopup &&
    searchPopup.element.className.indexOf("e-popup-close") === -1 &&
    mobsearchPopup &&
    mobsearchPopup.element.className.indexOf("e-popup-close") === -1
  ) {
    searchPopup.hide();
    mobsearchPopup.hide();
  }
  if ((<any>window).searchBox && (<any>window).searchBox.isPopupOpen) {
    (<any>window).searchBox.hidePopup();
  }
  if ((<any>window).mobsearchBox && (<any>window).mobsearchBox.isPopupOpen) {
    (<any>window).mobsearchBox.hidePopup();
  }
};
//To Prevent navigation to product page from mobile app
if (localStorage.getItem("isEJ2App")) {
  (<HTMLAnchorElement>document.querySelector(".header-logo>a")).href = "#";
  (<HTMLAnchorElement>document.querySelector(".header-logo>a")).target = "";
}

function initiateSearch(): void {
  let searchAjax: Ajax;
  let jsPlatform: string[] = ["aspnetcore", "aspnetmvc", "javascript"];
  let extension: string = jsPlatform.indexOf(platform) !== -1 ? "js" : "json";
  searchAjax = new Ajax(
    "./src/json/" + platform + "-search." + extension,
    "GET",
    true
  );

  searchAjax.send().then((result: any) => {
    if (
      platform === "aspnetcore" ||
      platform === "aspnetmvc" ||
      platform === "javascript"
    ) {
      let stringIndex = result.indexOf("{");
      result = result.slice(stringIndex);
    }
    let searchJson: any = JSON.parse(result);
    (elasticlunr as any).clearStopWords();
    let fields: any = {
      groupBy: "doc.component",
      value: "doc.name",
      text: "doc.name"
    };
    searchInstance = (elasticlunr as any).Index.load(searchJson);
    let searchBox: AutoComplete = new AutoComplete({
      filtering: (e: any) => {
          if (e.text && e.text.length < 3) {
            return;
          }
          let val: any = searchInstance.search(e.text, {
            fields: {
              component: { boost: 1 },
              name: { boost: 2 }
            },
            expand: true,
            boolean: "AND"
          });
          let query: Query = new Query().take(10).select("doc");
          let fields: any = searchBox.fields;
          e.updateData(val, query, fields);
        },
      placeholder: "Search components or features",
      noRecordsTemplate:
        '<div class="search-no-record">We’re sorry. We cannot find any matches for your search term.</div>',
      fields: fields,
      popupHeight: "auto",
      suggestionCount: 10,
      highlight: true,
      select: (e: any) => {
        let docPath = e.itemData.path
          ? e.itemData.path.replace(":theme/", "")
          : e.itemData.doc
          ? e.itemData.doc.path
          : null;
        let demoPath = docPath
          ? docPath
          : e.itemData.doc.dir + "/" + e.itemData.doc.url;
        if (location.href.indexOf("Home") !== -1) {
          curLink =
            location.origin + "/" + sbLocation[location.href.split("/")[4].split("#")[0]];
          reRouter.href = curLink + "#/tailwind3/" + demoPath + suffix;
        } else if (location.href.indexOf("aspnetmvc") !== -1) {
          reRouter.href =
            "https://ej2.syncfusion.com/aspnetmvc/" +
            demoPath +
            "#/tailwind3" +
            suffix;
        } else if (location.href.indexOf("aspnetcore") !== -1) {
          reRouter.href =
            "https://ej2.syncfusion.com/aspnetcore/" +
            demoPath +
            "#/tailwind3" +
            suffix;
        } else {
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
    (<any>window).searchBox = searchBox;
    searchBox.appendTo("#search-box");
    let mobsearchBox: AutoComplete = new AutoComplete({
      filtering: (e: any) => {
          if (e.text && e.text.length < 3) {
            return;
          }
          let val: any = searchInstance.search(e.text, {
            fields: {
              component: { boost: 1 },
              name: { boost: 2 }
            },
            expand: true,
            boolean: "AND"
          });
          let query: Query = new Query().take(10).select("doc");
          let fields: any = mobsearchBox.fields;
          e.updateData(val, query, fields);
        },
      placeholder: "Search components or features",
      noRecordsTemplate:
        '<div class="search-no-record">We’re sorry. We cannot find any matches for your search term.</div>',
      fields: fields,
      popupHeight: "auto",
      suggestionCount: 10,
      highlight: true,
      select: (e: any) => {
        let docPath = e.itemData.path
          ? e.itemData.path.replace(":theme/", "")
          : e.itemData.doc
          ? e.itemData.doc.path
          : null;
        let demoPath = docPath
          ? docPath
          : e.itemData.doc.dir + "/" + e.itemData.doc.url;
        if (location.href.indexOf("Home") !== -1) {
          curLink =
            location.origin + "/" + sbLocation[location.href.split("/")[4].split("#")[0]];
          reRouter.href = curLink + "#/tailwind3/" + demoPath + suffix;
        } else if (location.href.indexOf("aspnetmvc") !== -1) {
          reRouter.href =
            "https://ej2.syncfusion.com/aspnetmvc/" +
            demoPath +
            "#/tailwind3" +
            suffix;
        } else if (location.href.indexOf("aspnetcore") !== -1) {
          reRouter.href =
            "https://ej2.syncfusion.com/aspnetcore/" +
            demoPath +
            "#/tailwind3" +
            suffix;
        } else {
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
    (<any>window).mobsearchBox = mobsearchBox;
    mobsearchBox.appendTo("#mob-search-box");
  });

  let classname_array: string[] = [
    ".typescriptbtn",
    ".angularbtn",
    ".javascriptbtn",
    ".reactbtn",
    ".netcorebtn",
    ".netmvcbtn",
    ".vuebtn",
    ".blazorbtn"
  ];
  let content: string[] = [
    "TypeScript",
    "Angular",
    "JavaScript (ES5)",
    "React",
    "ASP.NET Core",
    "ASP.NET MVC",
    "Vue",
    "Blazor"
  ];
  for (let i: number = 0; i < classname_array.length; i++) {
    let element: any = document.querySelectorAll(classname_array[i]);
    for (let j: number = 0; j < element.length; j++) {
      new Tooltip(
        { content: content[i], position: "BottomCenter" },
        element[j]
      );
    }
  }
  document.getElementById("mob-search").classList.add("mb-search");
  document.getElementById("mbSearch").classList.add("search-hide");
}

initiateSearch();
