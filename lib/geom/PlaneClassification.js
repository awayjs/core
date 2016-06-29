"use strict";
var PlaneClassification = (function () {
    function PlaneClassification() {
    }
    // "back" is synonymous with "in", but used for planes (back of plane is "inside" a solid volume walled by a plane)
    PlaneClassification.BACK = 0;
    PlaneClassification.FRONT = 1;
    PlaneClassification.IN = 0;
    PlaneClassification.OUT = 1;
    PlaneClassification.INTERSECT = 2;
    return PlaneClassification;
}());
exports.PlaneClassification = PlaneClassification;
