import { isNullOrUndefined, classList, createElement, Browser } from '@syncfusion/ej2-base';
var globalTimeOut = {};
var DEFT_MAT_WIDTH = 30;
var DEFT_MAT3_WIDTH = 30;
var DEFT_FAB_WIDTH = 30;
var DEFT_FLUENT_WIDTH = 30;
var DEFT_FLUENT2_WIDTH = 30;
var DEFT_BOOT_WIDTH = 30;
var DEFT_BOOT4_WIDTH = 36;
var DEFT_BOOT5_WIDTH = 36;
var CLS_SHOWSPIN = 'e-spin-show';
var CLS_HIDESPIN = 'e-spin-hide';
var CLS_MATERIALSPIN = 'e-spin-material';
var CLS_MATERIAL3SPIN = 'e-spin-material3';
var CLS_TAILWIND3SPIN = 'e-spin-tailwind3';
var CLS_FABRICSPIN = 'e-spin-fabric';
var CLS_FLUENTSPIN = 'e-spin-fluent';
var CLS_FLUENT2SPIN = 'e-spin-fluent2';
var CLS_TAILWINDSPIN = 'e-spin-tailwind';
var CLS_BOOTSPIN = 'e-spin-bootstrap';
var CLS_BOOT4SPIN = 'e-spin-bootstrap4';
var CLS_BOOT5SPIN = 'e-spin-bootstrap5';
var CLS_HIGHCONTRASTSPIN = 'e-spin-high-contrast';
var CLS_SPINWRAP = 'e-spinner-pane';
var CLS_SPININWRAP = 'e-spinner-inner';
var CLS_SPINCIRCLE = 'e-path-circle';
var CLS_SPINARC = 'e-path-arc';
var CLS_SPINLABEL = 'e-spin-label';
var CLS_SPINTEMPLATE = 'e-spin-template';
var spinTemplate = null;
var spinCSSClass = null;
/**
 * Function to change the Spinners in a page globally from application end.
 * ```
 * E.g : blazorSpinner({ action: "Create", options: {target: targetElement}, type: "" });
 * ```
 *
 * @param {string} action - specifies the string
 * @param {CreateArgs} options - specifies the args
 * @param {string} target - specifies the target
 * @param {string} type - specifes the type
 * @returns {void}
 * @private
 */
export function Spinner(action, options, target, type) {
    switch (action) {
        case 'Create':
            /* eslint-disable */
            var element = document.querySelector(options.target);
            var args = {
                type: type, target: element, cssClass: options.cssClass,
                label: options.label, width: options.width
            };
            /* eslint-enable */
            createSpinner(args);
            break;
        case 'Show':
            showSpinner(document.querySelector(target));
            break;
        case 'Hide':
            hideSpinner(document.querySelector(target));
            break;
        case 'Set': {
            var setArgs = { cssClass: options.cssClass, type: type };
            setSpinner(setArgs);
            break;
        }
    }
}
/**
 * Create a spinner for the specified target element.
 * ```
 * E.g : createSpinner({ target: targetElement, width: '34px', label: 'Loading..' });
 * ```
 *
 * @param {SpinnerArgs} args - specifies the args
 * @param {CreateElementArgs} internalCreateElement - specifis the element args
 * @returns {void}
 * @private
 */
export function createSpinner(args, internalCreateElement) {
    var _a;
    if (!args.target) {
        return;
    }
    var radius;
    var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
    // eslint-disable-next-line
    var container = create_spinner_container(args.target, makeElement);
    if (!isNullOrUndefined(args.cssClass)) {
        var classNames = args.cssClass.split(' ').filter(function (className) { return className.trim() !== ''; });
        (_a = container.wrap.classList).add.apply(_a, classNames);
    }
    if (!isNullOrUndefined(args.template) || !isNullOrUndefined(spinTemplate)) {
        var template = !isNullOrUndefined(args.template) ? args.template : spinTemplate;
        container.wrap.classList.add(CLS_SPINTEMPLATE);
        replaceContent(container.wrap, template, spinCSSClass);
    }
    else {
        var theme = !isNullOrUndefined(args.type) ? args.type : getTheme(container.wrap);
        var width = !isNullOrUndefined(args.width) ? args.width : undefined;
        radius = calculateRadius(width, theme);
        setTheme(theme, container.wrap, radius, makeElement);
        if (!isNullOrUndefined(args.label)) {
            createLabel(container.inner_wrap, args.label, makeElement);
        }
    }
    container.wrap.classList.add(CLS_HIDESPIN);
    container = null;
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {string} label - specifies the string
 * @param {createElementParams} makeElement - specifies the element
 * @returns {HTMLElement} - returns the element
 */
function createLabel(container, label, makeElement) {
    var labelEle = makeElement('div', {});
    labelEle.classList.add(CLS_SPINLABEL);
    labelEle.innerHTML = label;
    container.appendChild(labelEle);
    return labelEle;
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createMaterialSpinner(container, radius, makeElement) {
    var uniqueID = random_generator();
    globalTimeOut["" + uniqueID] = { timeOut: 0, type: 'Material', radius: radius };
    create_material_element(container, uniqueID, makeElement, CLS_MATERIALSPIN);
    mat_calculate_attributes(radius, container, 'Material', CLS_MATERIALSPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createTailwind3Spinner(container, radius, makeElement) {
    var uniqueID = random_generator();
    globalTimeOut["" + uniqueID] = { timeOut: 0, type: 'Tailwind3', radius: radius };
    create_material_element(container, uniqueID, makeElement, CLS_TAILWIND3SPIN);
    mat_calculate_attributes(radius, container, 'Tailwind3', CLS_TAILWIND3SPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createMaterial3Spinner(container, radius, makeElement) {
    var uniqueID = random_generator();
    globalTimeOut["" + uniqueID] = { timeOut: 0, type: 'Material3', radius: radius };
    create_material_element(container, uniqueID, makeElement, CLS_MATERIAL3SPIN);
    mat_calculate_attributes(radius, container, 'Material3', CLS_MATERIAL3SPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createBootstrap4Spinner(container, radius, makeElement) {
    var uniqueID = random_generator();
    globalTimeOut["" + uniqueID] = { timeOut: 0, type: 'Bootstrap4', radius: radius };
    create_material_element(container, uniqueID, makeElement, CLS_BOOT4SPIN);
    mat_calculate_attributes(radius, container, 'Bootstrap4', CLS_BOOT4SPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createBootstrap5Spinner(container, radius, makeElement) {
    var uniqueID = random_generator();
    globalTimeOut["" + uniqueID] = { timeOut: 0, type: 'Bootstrap5', radius: radius };
    create_material_element(container, uniqueID, makeElement, CLS_BOOT5SPIN);
    mat_calculate_attributes(radius, container, 'Bootstrap5', CLS_BOOT5SPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {string} uniqueID - specifies the id.
 * @param {number} radius - specifies the radius
 * @returns {void}
 */
function startMatAnimate(container, uniqueID, radius) {
    var globalObject = {};
    var timeOutVar = 0;
    globalTimeOut["" + uniqueID].timeOut = 0;
    globalObject["" + uniqueID] = globalVariables(uniqueID, radius, 0, 0);
    var spinnerInfo = { uniqueID: uniqueID, container: container, globalInfo: globalObject, timeOutVar: timeOutVar };
    animateMaterial(spinnerInfo);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createFabricSpinner(container, radius, makeElement) {
    var uniqueID = random_generator();
    globalTimeOut["" + uniqueID] = { timeOut: 0, type: 'Fabric', radius: radius };
    create_fabric_element(container, uniqueID, CLS_FABRICSPIN, makeElement);
    fb_calculate_attributes(radius, container, CLS_FABRICSPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createFluentSpinner(container, radius, makeElement) {
    var uniqueID = random_generator();
    globalTimeOut["" + uniqueID] = { timeOut: 0, type: 'Fluent', radius: radius };
    create_fabric_element(container, uniqueID, CLS_FLUENTSPIN, makeElement);
    fb_calculate_attributes(radius, container, CLS_FLUENTSPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createFluent2Spinner(container, radius, makeElement) {
    var uniqueID = random_generator();
    globalTimeOut["" + uniqueID] = { timeOut: 0, type: 'Fluent2', radius: radius };
    create_fabric_element(container, uniqueID, CLS_FLUENT2SPIN, makeElement);
    fb_calculate_attributes(radius, container, CLS_FLUENT2SPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createTailwindSpinner(container, radius, makeElement) {
    var uniqueID = random_generator();
    globalTimeOut["" + uniqueID] = { timeOut: 0, type: 'Tailwind', radius: radius };
    create_fabric_element(container, uniqueID, CLS_TAILWINDSPIN, makeElement);
    fb_calculate_attributes(radius, container, CLS_TAILWINDSPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createHighContrastSpinner(container, radius, makeElement) {
    var uniqueID = random_generator();
    globalTimeOut["" + uniqueID] = { timeOut: 0, type: 'HighContrast', radius: radius };
    create_fabric_element(container, uniqueID, CLS_HIGHCONTRASTSPIN, makeElement);
    fb_calculate_attributes(radius, container, CLS_HIGHCONTRASTSPIN);
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @returns {string} - returns the string
 */
function getTheme(container) {
    var theme = window.getComputedStyle(container, ':after').getPropertyValue('content');
    return theme.replace(/['"]+/g, '');
}
/**
 *
 * @param {string} theme - specifies the theme
 * @param {HTMLElement} container - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function setTheme(theme, container, radius, makeElement) {
    var innerContainer = container.querySelector('.' + CLS_SPININWRAP);
    var svg = innerContainer.querySelector('svg');
    if (!isNullOrUndefined(svg)) {
        innerContainer.removeChild(svg);
    }
    switch (theme) {
        case 'Material':
            createMaterialSpinner(innerContainer, radius, makeElement);
            break;
        case 'Material3':
            createMaterial3Spinner(innerContainer, radius, makeElement);
            break;
        case 'Fabric':
            createFabricSpinner(innerContainer, radius, makeElement);
            break;
        case 'Fluent':
            createFluentSpinner(innerContainer, radius, makeElement);
            break;
        case 'Fluent2':
            createFluent2Spinner(innerContainer, radius, makeElement);
            break;
        case 'Bootstrap':
            createBootstrapSpinner(innerContainer, radius, makeElement);
            break;
        case 'HighContrast':
            createHighContrastSpinner(innerContainer, radius, makeElement);
            break;
        case 'Bootstrap4':
            createBootstrap4Spinner(innerContainer, radius, makeElement);
            break;
        case 'Bootstrap5':
            createBootstrap5Spinner(innerContainer, radius, makeElement);
            break;
        case 'Tailwind':
        case 'Tailwind-dark':
            createTailwindSpinner(innerContainer, radius, makeElement);
            break;
        case 'Tailwind3':
            createTailwind3Spinner(innerContainer, radius, makeElement);
            break;
    }
}
/**
 *
 * @param {HTMLElement} innerContainer - specifies the element
 * @param {number} radius - specifies the radius
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
function createBootstrapSpinner(innerContainer, radius, makeElement) {
    var uniqueID = random_generator();
    globalTimeOut["" + uniqueID] = { timeOut: 0, type: 'Bootstrap', radius: radius };
    create_bootstrap_element(innerContainer, uniqueID, makeElement);
    boot_calculate_attributes(innerContainer, radius);
}
/**
 *
 * @param {HTMLElement} innerContainer - specifies the element
 * @param {string} uniqueID - specifies the id
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
// eslint-disable-next-line
function create_bootstrap_element(innerContainer, uniqueID, makeElement) {
    var svgBoot = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var viewBoxValue = 64;
    var trans = 32;
    var defaultRadius = 2;
    svgBoot.setAttribute('id', uniqueID);
    svgBoot.setAttribute('class', CLS_BOOTSPIN);
    svgBoot.setAttribute('viewBox', '0 0 ' + viewBoxValue + ' ' + viewBoxValue);
    innerContainer.insertBefore(svgBoot, innerContainer.firstChild);
    for (var item = 0; item <= 7; item++) {
        var bootCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        bootCircle.setAttribute('class', CLS_SPINCIRCLE + '_' + item);
        bootCircle.setAttribute('r', defaultRadius + '');
        bootCircle.setAttribute('transform', 'translate(' + trans + ',' + trans + ')');
        svgBoot.appendChild(bootCircle);
    }
}
/**
 *
 * @param {HTMLElement} innerContainer - specifies the element
 * @param {number} radius - specifies the radius
 * @returns {void}
 */
// eslint-disable-next-line
function boot_calculate_attributes(innerContainer, radius) {
    var svg = innerContainer.querySelector('svg.e-spin-bootstrap');
    var x = 0;
    var y = 0;
    var rad = 24;
    svg.style.width = svg.style.height = radius + 'px';
    var startArc = 90;
    for (var item = 0; item <= 7; item++) {
        var start = defineArcPoints(x, y, rad, startArc);
        var circleEle = svg.querySelector('.' + CLS_SPINCIRCLE + '_' + item);
        circleEle.setAttribute('cx', start.x + '');
        circleEle.setAttribute('cy', start.y + '');
        startArc = startArc >= 360 ? 0 : startArc;
        startArc = startArc + 45;
    }
}
/**
 *
 * @param {number} begin - specifies the number
 * @param {number} stop  - specifirs the number
 * @returns {number[]} - returns the array of number
 */
function generateSeries(begin, stop) {
    var series = [];
    var start = begin;
    var end = stop;
    var increment = false;
    var count = 1;
    formSeries(start);
    /**
     *
     * @param {number} i - specifies the number
     * @returns {void}
     */
    function formSeries(i) {
        series.push(i);
        if (i !== end || count === 1) {
            if (i <= start && i > 1 && !increment) {
                i = parseFloat((i - 0.2).toFixed(2));
            }
            else if (i === 1) {
                i = 7;
                i = parseFloat((i + 0.2).toFixed(2));
                increment = true;
            }
            else if (i < 8 && increment) {
                i = parseFloat((i + 0.2).toFixed(2));
                if (i === 8) {
                    increment = false;
                }
            }
            else if (i <= 8 && !increment) {
                i = parseFloat((i - 0.2).toFixed(2));
            }
            ++count;
            formSeries(i);
        }
    }
    return series;
}
/**
 *
 * @param {HTMLElement} innerContainer - specifies the element
 * @returns {void}
 */
function animateBootstrap(innerContainer) {
    var svg = innerContainer.querySelector('svg.e-spin-bootstrap');
    var id = svg.getAttribute('id');
    for (var i = 1; i <= 8; i++) {
        var circleEle = (innerContainer.getElementsByClassName('e-path-circle_' +
            (i === 8 ? 0 : i))[0]);
        rotation(circleEle, i, i, generateSeries(i, i), id);
    }
    /**
     *
     * @param {SVGCircleElement} circle - specifies the circl element
     * @param {number} start - specifies the number
     * @param {number} end - specifies the end number
     * @param {number} series - specifies the series
     * @param {string} id - specifies the id
     * @returns {void}
     */
    function rotation(circle, start, end, series, id) {
        var count = 0;
        boot_animate(start);
        // eslint-disable-next-line
        function boot_animate(radius) {
            if (globalTimeOut["" + id].isAnimate) {
                ++count;
                circle.setAttribute('r', radius + '');
                if (count >= series.length) {
                    count = 0;
                }
                // eslint-disable-next-line
                globalTimeOut[id].timeOut = setTimeout(boot_animate.bind(null, series[count]), 18);
            }
        }
    }
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {string} template - specifies the template
 * @param {string} cssClass - specifies the css class.
 * @returns {void}
 */
function replaceContent(container, template, cssClass) {
    if (!isNullOrUndefined(cssClass)) {
        container.classList.add(cssClass);
    }
    var inner = container.querySelector('.e-spinner-inner');
    inner.innerHTML = template;
}
/**
 *
 * @param {string} width - specifies the width
 * @param {string} theme - specifies the string
 * @returns {number} - returns the number
 */
function calculateRadius(width, theme) {
    var defaultSize;
    switch (theme) {
        case 'Material':
            defaultSize = DEFT_MAT_WIDTH;
            break;
        case 'Material3':
            defaultSize = DEFT_MAT3_WIDTH;
            break;
        case 'Fabric':
            defaultSize = DEFT_FAB_WIDTH;
            break;
        case 'Tailwind':
        case 'Tailwind-dark':
        case 'Tailwind3':
            defaultSize = DEFT_FAB_WIDTH;
            break;
        case 'Fluent':
            defaultSize = DEFT_FLUENT_WIDTH;
            break;
        case 'Fluent2':
            defaultSize = DEFT_FLUENT2_WIDTH;
            break;
        case 'Bootstrap4':
            defaultSize = DEFT_BOOT4_WIDTH;
            break;
        case 'Bootstrap5':
            defaultSize = DEFT_BOOT5_WIDTH;
            break;
        default:
            defaultSize = DEFT_BOOT_WIDTH;
    }
    width = width ? parseFloat(width + '') : defaultSize;
    return theme === 'Bootstrap' ? width : width / 2;
}
/**
 *
 * @param {string} id - specifies the id
 * @param {number} radius - specifies the radius
 * @param {number} count - specifies the number count
 * @param {number} previousId - specifies the previous id
 * @returns {GlobalVariables} - returns the variables
 */
function globalVariables(id, radius, count, previousId) {
    return {
        radius: radius,
        count: count,
        previousId: previousId
    };
}
/**
 * @returns {string} - returns the string
 */
// eslint-disable-next-line
function random_generator() {
    var random = '';
    var combine = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        random += combine.charAt(Math.floor(Math.random() * combine.length));
    }
    return random;
}
/**
 *
 * @param {HTMLElement} innerCon - specifies the element
 * @param {string} uniqueID - specifies the unique id
 * @param {string} themeClass - specifies the string
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
// eslint-disable-next-line
function create_fabric_element(innerCon, uniqueID, themeClass, makeElement) {
    var svgFabric = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgFabric.setAttribute('id', uniqueID);
    svgFabric.setAttribute('class', themeClass);
    var fabricCirclePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    fabricCirclePath.setAttribute('class', CLS_SPINCIRCLE);
    var fabricCircleArc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    fabricCircleArc.setAttribute('class', CLS_SPINARC);
    innerCon.insertBefore(svgFabric, innerCon.firstChild);
    svgFabric.appendChild(fabricCirclePath);
    svgFabric.appendChild(fabricCircleArc);
}
/**
 *
 * @param {HTMLElement} innerContainer - specifies the element
 * @param {string} uniqueID - specifies the unique id
 * @param {createElementParams} makeElement - specifies the element
 * @param {string} cls - specifies the string
 * @returns {void}
 */
// eslint-disable-next-line
function create_material_element(innerContainer, uniqueID, makeElement, cls) {
    var svgMaterial = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    var matCirclePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svgMaterial.setAttribute('class', cls);
    svgMaterial.setAttribute('id', uniqueID);
    matCirclePath.setAttribute('class', CLS_SPINCIRCLE);
    innerContainer.insertBefore(svgMaterial, innerContainer.firstChild);
    svgMaterial.appendChild(matCirclePath);
}
/**
 *
 * @param {HTMLElement} target - specifies the element
 * @param {createElementParams} makeElement - specifies the element
 * @returns {void}
 */
// eslint-disable-next-line
function create_spinner_container(target, makeElement) {
    var spinnerContainer = makeElement('div', {});
    var spinnerInnerContainer = makeElement('div', {});
    spinnerContainer.classList.add(CLS_SPINWRAP);
    spinnerInnerContainer.classList.add(CLS_SPININWRAP);
    spinnerInnerContainer.setAttribute('aria-disabled', 'true');
    target.appendChild(spinnerContainer);
    spinnerContainer.appendChild(spinnerInnerContainer);
    // eslint-disable-next-line
    return { wrap: spinnerContainer, inner_wrap: spinnerInnerContainer };
}
/**
 *
 * @param {SpinnerInfo} spinnerInfo - specifies the spinner
 * @returns {void}
 */
function animateMaterial(spinnerInfo) {
    var start = 1;
    var end = 149;
    var duration = 1333;
    var max = 75;
    createCircle(start, end, easeAnimation, duration, spinnerInfo.globalInfo[spinnerInfo.uniqueID].count, max, spinnerInfo);
    spinnerInfo.globalInfo[spinnerInfo.uniqueID].count = ++spinnerInfo.globalInfo[spinnerInfo.uniqueID].count % 4;
}
/**
 *
 * @param {number} start - specifies the number
 * @param {number} end - specifies the end number
 * @param {Function} easing - specifies the function
 * @param {number} duration - specifies the duration
 * @param {number} count - specifies the count
 * @param {number} max - specifies the max number
 * @param {SpinnerInfo} spinnerInfo - specifies the spinner info
 * @returns {void}
 */
function createCircle(start, end, easing, duration, count, max, spinnerInfo) {
    var id = ++spinnerInfo.globalInfo[spinnerInfo.uniqueID].previousId;
    var startTime = new Date().getTime();
    var change = end - start;
    var diameter = getSize((spinnerInfo.globalInfo[spinnerInfo.uniqueID].radius * 2) + '');
    var strokeSize = getStrokeSize(diameter);
    var rotate = -90 * (spinnerInfo.globalInfo[spinnerInfo.uniqueID].count || 0);
    mat_animation(spinnerInfo);
    // eslint-disable-next-line
    function mat_animation(spinnerInfo) {
        var currentTime = Math.max(0, Math.min(new Date().getTime() - startTime, duration));
        updatePath(easing(currentTime, start, change, duration), spinnerInfo.container);
        if (id === spinnerInfo.globalInfo[spinnerInfo.uniqueID].previousId && currentTime < duration) {
            // eslint-disable-next-line
            globalTimeOut[spinnerInfo.uniqueID].timeOut = setTimeout(mat_animation.bind(null, spinnerInfo), 1);
        }
        else {
            animateMaterial(spinnerInfo);
        }
    }
    /**
     *
     * @param {number} value - specifies the number value
     * @param {HTMLElement} container - specifies the container
     * @returns {void}
     */
    function updatePath(value, container) {
        if (!isNullOrUndefined(container.querySelector('svg.e-spin-material')) || !isNullOrUndefined(container.querySelector('svg.e-spin-material3')) || !isNullOrUndefined(container.querySelector('svg.e-spin-tailwind3'))) {
            var svg = void 0;
            if (!isNullOrUndefined(container.querySelector('svg.e-spin-material')) &&
                !isNullOrUndefined(container.querySelector('svg.e-spin-material').querySelector('path.e-path-circle'))) {
                svg = container.querySelector('svg.e-spin-material');
            }
            else if (!isNullOrUndefined(container.querySelector('svg.e-spin-material3')) &&
                !isNullOrUndefined(container.querySelector('svg.e-spin-material3').querySelector('path.e-path-circle'))) {
                svg = container.querySelector('svg.e-spin-material3');
            }
            else if (!isNullOrUndefined(container.querySelector('svg.e-spin-tailwind3')) &&
                !isNullOrUndefined(container.querySelector('svg.e-spin-tailwind3').querySelector('path.e-path-circle'))) {
                svg = container.querySelector('svg.e-spin-tailwind3');
            }
            if (!isNullOrUndefined(svg)) {
                var path = svg.querySelector('path.e-path-circle');
                path.setAttribute('stroke-dashoffset', getDashOffset(diameter, strokeSize, value, max) + '');
                path.setAttribute('transform', 'rotate(' + (rotate) + ' ' + diameter / 2 + ' ' + diameter / 2 + ')');
            }
        }
    }
}
/**
 *
 * @param {number} radius - specifies the number
 * @param {HTMLElement} container - specifies the element
 * @param {string} type - specifies the string type
 * @param {string} cls - specifies the string
 * @returns {void}
 */
// eslint-disable-next-line
function mat_calculate_attributes(radius, container, type, cls) {
    var diameter = radius * 2;
    var svg = container.querySelector('svg.' + cls);
    var path = svg.querySelector('path.e-path-circle');
    var strokeSize = getStrokeSize(diameter);
    var transformOrigin = (diameter / 2) + 'px';
    svg.setAttribute('viewBox', '0 0 ' + diameter + ' ' + diameter);
    svg.style.width = svg.style.height = diameter + 'px';
    svg.style.transformOrigin = transformOrigin + ' ' + transformOrigin + ' ' + transformOrigin;
    path.setAttribute('d', drawArc(diameter, strokeSize));
    if (type === 'Material' || type === 'Material3' || type === 'Fluent2' || type === 'Tailwind3') {
        path.setAttribute('stroke-width', strokeSize + '');
        path.setAttribute('stroke-dasharray', ((diameter - strokeSize) * Math.PI * 0.75) + '');
        path.setAttribute('stroke-dashoffset', getDashOffset(diameter, strokeSize, 1, 75) + '');
    }
}
/**
 *
 * @param {string} value - specifies the value
 * @returns {number} - returns the number
 */
function getSize(value) {
    var parsed = parseFloat(value);
    return parsed;
}
/**
 *
 * @param {number} diameter - specifies the diameter
 * @param {number} strokeSize - specifies the size
 * @returns {string} - returns the string
 */
function drawArc(diameter, strokeSize) {
    var radius = diameter / 2;
    var offset = strokeSize / 2;
    return 'M' + radius + ',' + offset
        + 'A' + (radius - offset) + ',' + (radius - offset) + ' 0 1 1 ' + offset + ',' + radius;
}
/**
 *
 * @param {number} diameter - specifies the number
 * @returns {number} - returns the number
 */
function getStrokeSize(diameter) {
    return 10 / 100 * diameter;
}
/**
 *
 * @param {number} diameter - specifies the number
 * @param {number} strokeSize - specifies the stroke size
 * @param {number} value - specifies the value
 * @param {number} max - specifies the max number
 * @returns {number} - returns the number
 */
function getDashOffset(diameter, strokeSize, value, max) {
    return (diameter - strokeSize) * Math.PI * ((3 * (max) / 100) - (value / 100));
}
/**
 *
 * @param {number} current - specifies the number
 * @param {number} start - specifies the stroke size
 * @param {number} change - specifies the value
 * @param {number} duration - specifies the max number
 * @returns {number} - returns the number
 */
function easeAnimation(current, start, change, duration) {
    var timestamp = (current /= duration) * current;
    var timecount = timestamp * current;
    return start + change * (6 * timecount * timestamp + -15 * timestamp * timestamp + 10 * timecount);
}
/**
 *
 * @param {number} radius - specifies the number
 * @param {HTMLElement} innerConainer - specifies the element
 * @param {string} trgClass - specifies the class
 * @returns {void}
 */
// eslint-disable-next-line
function fb_calculate_attributes(radius, innerConainer, trgClass) {
    var centerX = radius;
    var centerY = radius;
    var diameter = radius * 2;
    var startArc = 315;
    var endArc = 45;
    var svg = innerConainer.querySelector('.' + trgClass);
    var circle = svg.querySelector('.e-path-circle');
    var path = svg.querySelector('.e-path-arc');
    var transformOrigin = (diameter / 2) + 'px';
    circle.setAttribute('d', defineCircle(centerX, centerY, radius));
    path.setAttribute('d', defineArc(centerX, centerY, radius, startArc, endArc));
    svg.setAttribute('viewBox', '0 0 ' + diameter + ' ' + diameter);
    svg.style.transformOrigin = transformOrigin + ' ' + transformOrigin + ' ' + transformOrigin;
    svg.style.width = svg.style.height = diameter + 'px';
}
/**
 *
 * @param {number} centerX - specifies the number
 * @param {number} centerY - specifies the stroke size
 * @param {number} radius - specifies the value
 * @param {number} angle - specifies the max number
 * @returns {number} - returns the number
 */
function defineArcPoints(centerX, centerY, radius, angle) {
    var radians = (angle - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(radians)),
        y: centerY + (radius * Math.sin(radians))
    };
}
/**
 *
 * @param {number} x - specifies the number
 * @param {number} y - specifies the stroke size
 * @param {number} radius - specifies the radius
 * @param {number} startArc - specifies the value
 * @param {number} endArc - specifies the max number
 * @returns {number} - returns the number
 */
function defineArc(x, y, radius, startArc, endArc) {
    var start = defineArcPoints(x, y, radius, endArc);
    var end = defineArcPoints(x, y, radius, startArc);
    var d = [
        'M', start.x, start.y,
        'A', radius, radius, 0, 0, 0, end.x, end.y
    ].join(' ');
    return d;
}
/**
 *
 * @param {number} x - specifies the number
 * @param {number} y - specifies the stroke size
 * @param {number} radius - specifies the value
 * @returns {string} - returns the string
 */
function defineCircle(x, y, radius) {
    var d = [
        'M', x, y,
        'm', -radius, 0,
        'a', radius, radius, 0, 1, 0, radius * 2, 0,
        'a', radius, radius, 0, 1, 0, -radius * 2, 0
    ].join(' ');
    return d;
}
/**
 * Function to show the Spinner.
 *
 * @param {HTMLElement} container - Specify the target of the Spinner.
 * @returns {void}
 * @private
 */
export function showSpinner(container) {
    showHideSpinner(container, false);
    container = null;
}
/**
 *
 * @param {HTMLElement} container - specifies the element
 * @param {boolean} isHide - specifies the boolean
 * @returns {void}
 */
function showHideSpinner(container, isHide) {
    var spinnerWrap;
    if (container) {
        if (container.classList.contains(CLS_SPINWRAP)) {
            spinnerWrap = container;
        }
        else {
            var spinWrapCollection = container.querySelectorAll('.' + CLS_SPINWRAP);
            if (Browser.isIE) {
                for (var i = 0; i < spinWrapCollection.length; i++) {
                    if (spinWrapCollection[i].parentElement && spinWrapCollection[i].parentElement === container) {
                        spinnerWrap = spinWrapCollection[i];
                        break;
                    }
                }
            }
            else {
                spinnerWrap = Array.from(spinWrapCollection).find(function (wrap) { return wrap.parentElement === container; }) || null;
            }
        }
    }
    if (container && spinnerWrap) {
        var inner = spinnerWrap.querySelector('.' + CLS_SPININWRAP);
        var spinCheck = isHide ? !spinnerWrap.classList.contains(CLS_SPINTEMPLATE) &&
            !spinnerWrap.classList.contains(CLS_HIDESPIN) :
            !spinnerWrap.classList.contains(CLS_SPINTEMPLATE) && !spinnerWrap.classList.contains(CLS_SHOWSPIN);
        if (spinCheck) {
            var svgEle = spinnerWrap.querySelector('svg');
            if (isNullOrUndefined(svgEle)) {
                return;
            }
            var id = svgEle.getAttribute('id');
            globalTimeOut["" + id].isAnimate = !isHide;
            switch (globalTimeOut["" + id].type) {
                case 'Material':
                case 'Material3':
                case 'Tailwind3':
                    if (isHide) {
                        clearTimeout(globalTimeOut[id].timeOut);
                    }
                    else {
                        startMatAnimate(inner, id, globalTimeOut[id].radius);
                    }
                    break;
                case 'Bootstrap':
                    if (isHide) {
                        clearTimeout(globalTimeOut[id].timeOut);
                    }
                    else {
                        animateBootstrap(inner);
                    }
                    break;
            }
        }
        if (isHide) {
            classList(spinnerWrap, [CLS_HIDESPIN], [CLS_SHOWSPIN]);
        }
        else {
            classList(spinnerWrap, [CLS_SHOWSPIN], [CLS_HIDESPIN]);
        }
        container = null;
    }
}
/**
 * Function to hide the Spinner.
 *
 * @param {HTMLElement} container - Specify the target of the Spinner.
 * @returns {void}
 * @private
 */
export function hideSpinner(container) {
    showHideSpinner(container, true);
    container = null;
}
/**
 * Function to change the Spinners in a page globally from application end.
 * ```
 * E.g : setSpinner({ cssClass: 'custom-css'; type: 'Material' });
 * ```
 *
 * @param {SetSpinnerArgs} args - specifies the args
 * @param {createElementParams} internalCreateElement - specifies the element params
 * @returns {void}
 * @private
 */
export function setSpinner(args, internalCreateElement) {
    var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
    if (args.template !== undefined) {
        spinTemplate = args.template;
        if (args.template !== undefined) {
            spinCSSClass = args.cssClass;
        }
    }
    var container = document.querySelectorAll('.' + CLS_SPINWRAP);
    for (var index = 0; index < container.length; index++) {
        ensureTemplate(args.template, container[index], args.type, args.cssClass, makeElement);
    }
}
/**
 *
 * @param {string} template - specifies the string
 * @param {HTMLElement} container - specifies the container
 * @param {string} theme - specifies the theme
 * @param {string} cssClass - specifies the string class
 * @param {createElementParams} makeEle - specifies the params
 * @returns {void}
 */
function ensureTemplate(template, container, theme, cssClass, makeEle) {
    if (isNullOrUndefined(template) && !container.classList.contains(CLS_SPINTEMPLATE)) {
        replaceTheme(container, theme, cssClass, makeEle);
        if (container.classList.contains(CLS_SHOWSPIN)) {
            container.classList.remove(CLS_SHOWSPIN);
            showSpinner(container);
        }
        else {
            container.classList.remove(CLS_HIDESPIN);
            hideSpinner(container);
        }
    }
    else {
        spinTemplate = template;
        if (!isNullOrUndefined(cssClass)) {
            spinCSSClass = cssClass;
        }
        if (!isNullOrUndefined(spinTemplate)) {
            replaceContent(container, spinTemplate, spinCSSClass);
        }
    }
}
/**
 *
 * @param {HTMLElement} container - specifies the container
 * @param {string} theme - specifies the theme
 * @param {string} cssClass - specifies the string class
 * @param {createElementParams} makeEle - specifies the params
 * @returns {void}
 */
function replaceTheme(container, theme, cssClass, makeEle) {
    if (!isNullOrUndefined(cssClass)) {
        container.classList.add(cssClass);
    }
    var svgElement = container.querySelector('svg');
    if (!isNullOrUndefined(svgElement)) {
        var radius = theme === 'Bootstrap' ? parseFloat(svgElement.style.height) : parseFloat(svgElement.style.height) / 2;
        var classNames = svgElement.getAttribute('class');
        var svgClassList = classNames.split(/\s/);
        if (svgClassList.indexOf('e-spin-material') >= 0) {
            var id = svgElement.getAttribute('id');
            clearTimeout(globalTimeOut["" + id].timeOut);
        }
        setTheme(theme, container, radius, makeEle);
    }
}
