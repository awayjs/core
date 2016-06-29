"use strict";
var CSS = (function () {
    function CSS() {
    }
    CSS.setElementSize = function (element, width, height) {
        if (!element)
            return;
        element.style.width = width + "px";
        element.style.height = height + "px";
        element["width"] = width;
        element["height"] = height;
    };
    CSS.setElementWidth = function (element, width) {
        if (!element)
            return;
        element.style.width = width + "px";
        element["width"] = width;
    };
    CSS.setElementHeight = function (element, height) {
        if (!element)
            return;
        element.style.height = height + "px";
        element["height"] = height;
    };
    CSS.setElementX = function (element, x) {
        if (!element)
            return;
        element.style.position = 'absolute';
        element.style.left = x + "px";
    };
    CSS.setElementY = function (element, y) {
        if (!element)
            return;
        element.style.position = 'absolute';
        element.style.top = y + "px";
    };
    CSS.getElementVisibility = function (element) {
        if (!element)
            return false;
        return element.style.visibility == 'visible';
    };
    CSS.setElementVisibility = function (element, visible) {
        if (!element)
            return;
        if (visible) {
            element.style.visibility = 'visible';
        }
        else {
            element.style.visibility = 'hidden';
        }
    };
    CSS.setElementAlpha = function (element, alpha) {
        if (element instanceof HTMLCanvasElement) {
            var context = element.getContext("2d");
            context.globalAlpha = alpha;
        }
    };
    CSS.setElementPosition = function (element, x, y, absolute) {
        if (absolute === void 0) { absolute = false; }
        if (!element)
            return;
        if (absolute) {
            element.style.position = "absolute";
        }
        else {
            element.style.position = "relative";
        }
        element.style.left = x + "px";
        element.style.top = y + "px";
    };
    return CSS;
}());
exports.CSS = CSS;
