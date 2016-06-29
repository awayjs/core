"use strict";
/**
 * Provides constant values for camera lens projection options use the the <code>coordinateSystem</code> property
 *
 * @see away.projections.PerspectiveLens#coordinateSystem
 */
var CoordinateSystem = (function () {
    function CoordinateSystem() {
    }
    /**
     * Default option, projects to a left-handed coordinate system
     */
    CoordinateSystem.LEFT_HANDED = "leftHanded";
    /**
     * Projects to a right-handed coordinate system
     */
    CoordinateSystem.RIGHT_HANDED = "rightHanded";
    return CoordinateSystem;
}());
exports.CoordinateSystem = CoordinateSystem;
