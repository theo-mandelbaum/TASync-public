define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.openPalette = exports.addEvents = void 0;
    var isMobile;
    function addEvents() {
        isMobile = window.matchMedia('(max-width:550px)').matches;
        if (isMobile) {
            var paletteIcon = document.getElementById('palette-icon');
            if (paletteIcon) {
                paletteIcon.addEventListener('click', openPalette, false);
            }
        }
    }
    exports.addEvents = addEvents;
    function openPalette() {
        var paletteSpace = document.getElementById('palette-space');
        isMobile = window.matchMedia('(max-width:550px)').matches;
        if (isMobile) {
            if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
                paletteSpace.classList.add('sb-mobile-palette-open');
            }
            else {
                paletteSpace.classList.remove('sb-mobile-palette-open');
            }
        }
    }
    exports.openPalette = openPalette;
});
