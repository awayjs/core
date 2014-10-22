var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AssetType = require("awayjs-core/lib/core/library/AssetType");

var NamedAssetBase = require("awayjs-core/lib/core/library/NamedAssetBase");
var GeometryEvent = require("awayjs-core/lib/events/GeometryEvent");

/**
*
* Geometry is a collection of SubGeometries, each of which contain the actual geometrical data such as vertices,
* normals, uvs, etc. It also contains a reference to an animation class, which defines how the geometry moves.
* A Geometry object is assigned to a Mesh, a scene graph occurence of the geometry, which in turn assigns
* the SubGeometries to its respective TriangleSubMesh objects.
*
*
*
* @see away.core.base.SubGeometry
* @see away.entities.Mesh
*
* @class Geometry
*/
var Geometry = (function (_super) {
    __extends(Geometry, _super);
    /**
    * Creates a new Geometry object.
    */
    function Geometry() {
        _super.call(this);

        this._subGeometries = new Array();
    }
    Object.defineProperty(Geometry.prototype, "assetType", {
        get: function () {
            return AssetType.GEOMETRY;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Geometry.prototype, "subGeometries", {
        /**
        * A collection of TriangleSubGeometry objects, each of which contain geometrical data such as vertices, normals, etc.
        */
        get: function () {
            return this._subGeometries;
        },
        enumerable: true,
        configurable: true
    });

    Geometry.prototype.getSubGeometries = function () {
        return this._subGeometries;
    };

    Geometry.prototype.applyTransformation = function (transform) {
        var len = this._subGeometries.length;
        for (var i = 0; i < len; ++i)
            this._subGeometries[i].applyTransformation(transform);
    };

    /**
    * Adds a new TriangleSubGeometry object to the list.
    * @param subGeometry The TriangleSubGeometry object to be added.
    */
    Geometry.prototype.addSubGeometry = function (subGeometry) {
        this._subGeometries.push(subGeometry);

        subGeometry.parentGeometry = this;

        if (this.hasEventListener(GeometryEvent.SUB_GEOMETRY_ADDED))
            this.dispatchEvent(new GeometryEvent(GeometryEvent.SUB_GEOMETRY_ADDED, subGeometry));

        this.iInvalidateBounds(subGeometry);
    };

    /**
    * Removes a new TriangleSubGeometry object from the list.
    * @param subGeometry The TriangleSubGeometry object to be removed.
    */
    Geometry.prototype.removeSubGeometry = function (subGeometry) {
        this._subGeometries.splice(this._subGeometries.indexOf(subGeometry), 1);

        subGeometry.parentGeometry = null;

        if (this.hasEventListener(GeometryEvent.SUB_GEOMETRY_REMOVED))
            this.dispatchEvent(new GeometryEvent(GeometryEvent.SUB_GEOMETRY_REMOVED, subGeometry));

        this.iInvalidateBounds(subGeometry);
    };

    /**
    * Clones the geometry.
    * @return An exact duplicate of the current Geometry object.
    */
    Geometry.prototype.clone = function () {
        var clone = new Geometry();
        var len = this._subGeometries.length;

        for (var i = 0; i < len; ++i)
            clone.addSubGeometry(this._subGeometries[i].clone());

        return clone;
    };

    /**
    * Scales the geometry.
    * @param scale The amount by which to scale.
    */
    Geometry.prototype.scale = function (scale) {
        var numSubGeoms = this._subGeometries.length;
        for (var i = 0; i < numSubGeoms; ++i)
            this._subGeometries[i].scale(scale);
    };

    /**
    * Clears all resources used by the Geometry object, including SubGeometries.
    */
    Geometry.prototype.dispose = function () {
        var numSubGeoms = this._subGeometries.length;

        for (var i = 0; i < numSubGeoms; ++i) {
            var subGeom = this._subGeometries[0];
            this.removeSubGeometry(subGeom);
            subGeom.dispose();
        }
    };

    /**
    * Scales the uv coordinates (tiling)
    * @param scaleU The amount by which to scale on the u axis. Default is 1;
    * @param scaleV The amount by which to scale on the v axis. Default is 1;
    */
    Geometry.prototype.scaleUV = function (scaleU, scaleV) {
        if (typeof scaleU === "undefined") { scaleU = 1; }
        if (typeof scaleV === "undefined") { scaleV = 1; }
        var numSubGeoms = this._subGeometries.length;

        for (var i = 0; i < numSubGeoms; ++i)
            this._subGeometries[i].scaleUV(scaleU, scaleV);
    };

    Geometry.prototype.iInvalidateBounds = function (subGeom) {
        if (this.hasEventListener(GeometryEvent.BOUNDS_INVALID))
            this.dispatchEvent(new GeometryEvent(GeometryEvent.BOUNDS_INVALID, subGeom));
    };
    return Geometry;
})(NamedAssetBase);

module.exports = Geometry;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvYmFzZS9HZW9tZXRyeS50cyJdLCJuYW1lcyI6WyJHZW9tZXRyeSIsIkdlb21ldHJ5LmNvbnN0cnVjdG9yIiwiR2VvbWV0cnkuZ2V0U3ViR2VvbWV0cmllcyIsIkdlb21ldHJ5LmFwcGx5VHJhbnNmb3JtYXRpb24iLCJHZW9tZXRyeS5hZGRTdWJHZW9tZXRyeSIsIkdlb21ldHJ5LnJlbW92ZVN1Ykdlb21ldHJ5IiwiR2VvbWV0cnkuY2xvbmUiLCJHZW9tZXRyeS5zY2FsZSIsIkdlb21ldHJ5LmRpc3Bvc2UiLCJHZW9tZXRyeS5zY2FsZVVWIiwiR2VvbWV0cnkuaUludmFsaWRhdGVCb3VuZHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGlFQUV3RTs7QUFFeEUsMkVBQWlGO0FBQ2pGLG1FQUF5RTs7QUFFekU7Ozs7Ozs7Ozs7Ozs7RUFhRztBQUNIO0lBQXVCQSwyQkFBY0E7SUF5QnBDQTs7TUFER0E7SUFDSEE7UUFFQ0MsV0FBTUEsS0FBQUEsQ0FBQ0E7O1FBRVBBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLElBQUlBLEtBQUtBLENBQWtCQSxDQUFDQTtJQUNuREEsQ0FBQ0E7SUExQkREO1FBQUFBLEtBQUFBO1lBRUNBLE9BQU9BLFNBQVNBLENBQUNBLFFBQVFBO1FBQzFCQSxDQUFDQTs7OztBQUFBQTtJQUtEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsY0FBY0E7UUFDM0JBLENBQUNBOzs7O0FBQUFBO0lBRURBLHNDQUFBQTtRQUVDRSxPQUFPQSxJQUFJQSxDQUFDQSxjQUFjQTtJQUMzQkEsQ0FBQ0E7O0lBWURGLHlDQUFBQSxVQUEyQkEsU0FBa0JBO1FBRTVDRyxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQSxNQUFNQTtRQUMzQ0EsS0FBS0EsSUFBSUEsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsRUFBRUEsQ0FBQ0E7WUFDbENBLElBQUlB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QSxFQUFFQSxNQUFpQkE7UUFBcENTLHFDQUFBQSxNQUFNQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFFQSxxQ0FBQUEsTUFBTUEsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFFbERBLElBQUlBLFdBQVdBLEdBQVVBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLE1BQU1BOztRQUVuREEsS0FBS0EsSUFBSUEsQ0FBQ0EsR0FBVUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsV0FBV0EsRUFBRUEsRUFBRUEsQ0FBQ0E7WUFDMUNBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO0lBQ2pEQSxDQUFDQTs7SUFFRFQsdUNBQUFBLFVBQXlCQSxPQUF1QkE7UUFFL0NVLElBQUlBLElBQUlBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7WUFDdERBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLGFBQWFBLENBQUNBLGFBQWFBLENBQUNBLGNBQWNBLEVBQUVBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO0lBQy9FQSxDQUFDQTtJQUNGVixnQkFBQ0E7QUFBREEsQ0FBQ0EsRUFqSXNCLGNBQWMsRUFpSXBDOztBQUVELHlCQUFrQixDQUFBIiwiZmlsZSI6ImNvcmUvYmFzZS9HZW9tZXRyeS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdWJHZW9tZXRyeUJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL1N1Ykdlb21ldHJ5QmFzZVwiKTtcbmltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9nZW9tL01hdHJpeDNEXCIpO1xuaW1wb3J0IEFzc2V0VHlwZVx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9Bc3NldFR5cGVcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IE5hbWVkQXNzZXRCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9OYW1lZEFzc2V0QmFzZVwiKTtcbmltcG9ydCBHZW9tZXRyeUV2ZW50XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2V2ZW50cy9HZW9tZXRyeUV2ZW50XCIpO1xuXG4vKipcbiAqXG4gKiBHZW9tZXRyeSBpcyBhIGNvbGxlY3Rpb24gb2YgU3ViR2VvbWV0cmllcywgZWFjaCBvZiB3aGljaCBjb250YWluIHRoZSBhY3R1YWwgZ2VvbWV0cmljYWwgZGF0YSBzdWNoIGFzIHZlcnRpY2VzLFxuICogbm9ybWFscywgdXZzLCBldGMuIEl0IGFsc28gY29udGFpbnMgYSByZWZlcmVuY2UgdG8gYW4gYW5pbWF0aW9uIGNsYXNzLCB3aGljaCBkZWZpbmVzIGhvdyB0aGUgZ2VvbWV0cnkgbW92ZXMuXG4gKiBBIEdlb21ldHJ5IG9iamVjdCBpcyBhc3NpZ25lZCB0byBhIE1lc2gsIGEgc2NlbmUgZ3JhcGggb2NjdXJlbmNlIG9mIHRoZSBnZW9tZXRyeSwgd2hpY2ggaW4gdHVybiBhc3NpZ25zXG4gKiB0aGUgU3ViR2VvbWV0cmllcyB0byBpdHMgcmVzcGVjdGl2ZSBUcmlhbmdsZVN1Yk1lc2ggb2JqZWN0cy5cbiAqXG4gKlxuICpcbiAqIEBzZWUgYXdheS5jb3JlLmJhc2UuU3ViR2VvbWV0cnlcbiAqIEBzZWUgYXdheS5lbnRpdGllcy5NZXNoXG4gKlxuICogQGNsYXNzIEdlb21ldHJ5XG4gKi9cbmNsYXNzIEdlb21ldHJ5IGV4dGVuZHMgTmFtZWRBc3NldEJhc2UgaW1wbGVtZW50cyBJQXNzZXRcbntcblx0cHJpdmF0ZSBfc3ViR2VvbWV0cmllczpBcnJheTxTdWJHZW9tZXRyeUJhc2U+O1xuXG5cdHB1YmxpYyBnZXQgYXNzZXRUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQXNzZXRUeXBlLkdFT01FVFJZO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgY29sbGVjdGlvbiBvZiBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdHMsIGVhY2ggb2Ygd2hpY2ggY29udGFpbiBnZW9tZXRyaWNhbCBkYXRhIHN1Y2ggYXMgdmVydGljZXMsIG5vcm1hbHMsIGV0Yy5cblx0ICovXG5cdHB1YmxpYyBnZXQgc3ViR2VvbWV0cmllcygpOkFycmF5PFN1Ykdlb21ldHJ5QmFzZT5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9zdWJHZW9tZXRyaWVzO1xuXHR9XG5cblx0cHVibGljIGdldFN1Ykdlb21ldHJpZXMoKTpBcnJheTxTdWJHZW9tZXRyeUJhc2U+XG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc3ViR2VvbWV0cmllcztcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IEdlb21ldHJ5IG9iamVjdC5cblx0ICovXG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl9zdWJHZW9tZXRyaWVzID0gbmV3IEFycmF5PFN1Ykdlb21ldHJ5QmFzZT4oKTtcblx0fVxuXG5cdHB1YmxpYyBhcHBseVRyYW5zZm9ybWF0aW9uKHRyYW5zZm9ybTpNYXRyaXgzRClcblx0e1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViR2VvbWV0cmllcy5sZW5ndGg7XG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbGVuOyArK2kpXG5cdFx0XHR0aGlzLl9zdWJHZW9tZXRyaWVzW2ldLmFwcGx5VHJhbnNmb3JtYXRpb24odHJhbnNmb3JtKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIGEgbmV3IFRyaWFuZ2xlU3ViR2VvbWV0cnkgb2JqZWN0IHRvIHRoZSBsaXN0LlxuXHQgKiBAcGFyYW0gc3ViR2VvbWV0cnkgVGhlIFRyaWFuZ2xlU3ViR2VvbWV0cnkgb2JqZWN0IHRvIGJlIGFkZGVkLlxuXHQgKi9cblx0cHVibGljIGFkZFN1Ykdlb21ldHJ5KHN1Ykdlb21ldHJ5OlN1Ykdlb21ldHJ5QmFzZSlcblx0e1xuXHRcdHRoaXMuX3N1Ykdlb21ldHJpZXMucHVzaChzdWJHZW9tZXRyeSk7XG5cblx0XHRzdWJHZW9tZXRyeS5wYXJlbnRHZW9tZXRyeSA9IHRoaXM7XG5cblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuU1VCX0dFT01FVFJZX0FEREVEKSlcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgR2VvbWV0cnlFdmVudChHZW9tZXRyeUV2ZW50LlNVQl9HRU9NRVRSWV9BRERFRCwgc3ViR2VvbWV0cnkpKTtcblxuXHRcdHRoaXMuaUludmFsaWRhdGVCb3VuZHMoc3ViR2VvbWV0cnkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZXMgYSBuZXcgVHJpYW5nbGVTdWJHZW9tZXRyeSBvYmplY3QgZnJvbSB0aGUgbGlzdC5cblx0ICogQHBhcmFtIHN1Ykdlb21ldHJ5IFRoZSBUcmlhbmdsZVN1Ykdlb21ldHJ5IG9iamVjdCB0byBiZSByZW1vdmVkLlxuXHQgKi9cblx0cHVibGljIHJlbW92ZVN1Ykdlb21ldHJ5KHN1Ykdlb21ldHJ5OlN1Ykdlb21ldHJ5QmFzZSlcblx0e1xuXHRcdHRoaXMuX3N1Ykdlb21ldHJpZXMuc3BsaWNlKHRoaXMuX3N1Ykdlb21ldHJpZXMuaW5kZXhPZihzdWJHZW9tZXRyeSksIDEpO1xuXG5cdFx0c3ViR2VvbWV0cnkucGFyZW50R2VvbWV0cnkgPSBudWxsO1xuXG5cdFx0aWYgKHRoaXMuaGFzRXZlbnRMaXN0ZW5lcihHZW9tZXRyeUV2ZW50LlNVQl9HRU9NRVRSWV9SRU1PVkVEKSlcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgR2VvbWV0cnlFdmVudChHZW9tZXRyeUV2ZW50LlNVQl9HRU9NRVRSWV9SRU1PVkVELCBzdWJHZW9tZXRyeSkpO1xuXG5cdFx0dGhpcy5pSW52YWxpZGF0ZUJvdW5kcyhzdWJHZW9tZXRyeSk7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvbmVzIHRoZSBnZW9tZXRyeS5cblx0ICogQHJldHVybiBBbiBleGFjdCBkdXBsaWNhdGUgb2YgdGhlIGN1cnJlbnQgR2VvbWV0cnkgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6R2VvbWV0cnlcblx0e1xuXHRcdHZhciBjbG9uZTpHZW9tZXRyeSA9IG5ldyBHZW9tZXRyeSgpO1xuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fc3ViR2VvbWV0cmllcy5sZW5ndGg7XG5cblx0XHRmb3IgKHZhciBpOm51bWJlciA9IDA7IGkgPCBsZW47ICsraSlcblx0XHRcdGNsb25lLmFkZFN1Ykdlb21ldHJ5KHRoaXMuX3N1Ykdlb21ldHJpZXNbaV0uY2xvbmUoKSk7XG5cblx0XHRyZXR1cm4gY2xvbmU7XG5cdH1cblxuXHQvKipcblx0ICogU2NhbGVzIHRoZSBnZW9tZXRyeS5cblx0ICogQHBhcmFtIHNjYWxlIFRoZSBhbW91bnQgYnkgd2hpY2ggdG8gc2NhbGUuXG5cdCAqL1xuXHRwdWJsaWMgc2NhbGUoc2NhbGU6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIG51bVN1Ykdlb21zOm51bWJlciA9IHRoaXMuX3N1Ykdlb21ldHJpZXMubGVuZ3RoO1xuXHRcdGZvciAodmFyIGk6bnVtYmVyID0gMDsgaSA8IG51bVN1Ykdlb21zOyArK2kpXG5cdFx0XHR0aGlzLl9zdWJHZW9tZXRyaWVzW2ldLnNjYWxlKHNjYWxlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDbGVhcnMgYWxsIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBHZW9tZXRyeSBvYmplY3QsIGluY2x1ZGluZyBTdWJHZW9tZXRyaWVzLlxuXHQgKi9cblx0cHVibGljIGRpc3Bvc2UoKVxuXHR7XG5cdFx0dmFyIG51bVN1Ykdlb21zOm51bWJlciA9IHRoaXMuX3N1Ykdlb21ldHJpZXMubGVuZ3RoO1xuXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbnVtU3ViR2VvbXM7ICsraSkge1xuXHRcdFx0dmFyIHN1Ykdlb206U3ViR2VvbWV0cnlCYXNlID0gdGhpcy5fc3ViR2VvbWV0cmllc1swXTtcblx0XHRcdHRoaXMucmVtb3ZlU3ViR2VvbWV0cnkoc3ViR2VvbSk7XG5cdFx0XHRzdWJHZW9tLmRpc3Bvc2UoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU2NhbGVzIHRoZSB1diBjb29yZGluYXRlcyAodGlsaW5nKVxuXHQgKiBAcGFyYW0gc2NhbGVVIFRoZSBhbW91bnQgYnkgd2hpY2ggdG8gc2NhbGUgb24gdGhlIHUgYXhpcy4gRGVmYXVsdCBpcyAxO1xuXHQgKiBAcGFyYW0gc2NhbGVWIFRoZSBhbW91bnQgYnkgd2hpY2ggdG8gc2NhbGUgb24gdGhlIHYgYXhpcy4gRGVmYXVsdCBpcyAxO1xuXHQgKi9cblx0cHVibGljIHNjYWxlVVYoc2NhbGVVOm51bWJlciA9IDEsIHNjYWxlVjpudW1iZXIgPSAxKVxuXHR7XG5cdFx0dmFyIG51bVN1Ykdlb21zOm51bWJlciA9IHRoaXMuX3N1Ykdlb21ldHJpZXMubGVuZ3RoO1xuXG5cdFx0Zm9yICh2YXIgaTpudW1iZXIgPSAwOyBpIDwgbnVtU3ViR2VvbXM7ICsraSlcblx0XHRcdHRoaXMuX3N1Ykdlb21ldHJpZXNbaV0uc2NhbGVVVihzY2FsZVUsIHNjYWxlVik7XG5cdH1cblxuXHRwdWJsaWMgaUludmFsaWRhdGVCb3VuZHMoc3ViR2VvbTpTdWJHZW9tZXRyeUJhc2UpXG5cdHtcblx0XHRpZiAodGhpcy5oYXNFdmVudExpc3RlbmVyKEdlb21ldHJ5RXZlbnQuQk9VTkRTX0lOVkFMSUQpKVxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBHZW9tZXRyeUV2ZW50KEdlb21ldHJ5RXZlbnQuQk9VTkRTX0lOVkFMSUQsIHN1Ykdlb20pKTtcblx0fVxufVxuXG5leHBvcnQgPSBHZW9tZXRyeTsiXX0=