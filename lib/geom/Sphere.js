"use strict";
var Sphere = (function () {
    /**
     * Create a Sphere with ABCD coefficients
     */
    function Sphere(x, y, z, radius) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        if (radius === void 0) { radius = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
        this.radius = radius;
    }
    Sphere.prototype.rayIntersection = function (position, direction, targetNormal) {
        if (this.containsPoint(position))
            return 0;
        var px = position.x - this.x, py = position.y - this.y, pz = position.z - this.z;
        var vx = direction.x, vy = direction.y, vz = direction.z;
        var rayEntryDistance;
        var a = vx * vx + vy * vy + vz * vz;
        var b = 2 * (px * vx + py * vy + pz * vz);
        var c = px * px + py * py + pz * pz - this.radius * this.radius;
        var det = b * b - 4 * a * c;
        if (det >= 0) {
            var sqrtDet = Math.sqrt(det);
            rayEntryDistance = (-b - sqrtDet) / (2 * a);
            if (rayEntryDistance >= 0) {
                targetNormal.x = px + rayEntryDistance * vx;
                targetNormal.y = py + rayEntryDistance * vy;
                targetNormal.z = pz + rayEntryDistance * vz;
                targetNormal.normalize();
                return rayEntryDistance;
            }
        }
        // ray misses sphere
        return -1;
    };
    Sphere.prototype.containsPoint = function (position) {
        var px = position.x - this.x;
        var py = position.y - this.y;
        var pz = position.z - this.z;
        var distance = Math.sqrt(px * px + py * py + pz * pz);
        return distance <= this.radius;
    };
    Sphere.prototype.toString = function () {
        return "Sphere [x:" + this.x + ", y:" + this.y + ", z:" + this.z + ", radius:" + this.radius + "]";
    };
    return Sphere;
}());
exports.Sphere = Sphere;
