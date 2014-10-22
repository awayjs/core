var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitivePrefabBase = require("awayjs-core/lib/prefabs/PrimitivePrefabBase");

/**
* A UV Cylinder primitive mesh.
*/
var PrimitiveTorusPrefab = (function (_super) {
    __extends(PrimitiveTorusPrefab, _super);
    /**
    * Creates a new <code>Torus</code> object.
    * @param radius The radius of the torus.
    * @param tuebRadius The radius of the inner tube of the torus.
    * @param segmentsR Defines the number of horizontal segments that make up the torus.
    * @param segmentsT Defines the number of vertical segments that make up the torus.
    * @param yUp Defines whether the torus poles should lay on the Y-axis (true) or on the Z-axis (false).
    */
    function PrimitiveTorusPrefab(radius, tubeRadius, segmentsR, segmentsT, yUp) {
        if (typeof radius === "undefined") { radius = 50; }
        if (typeof tubeRadius === "undefined") { tubeRadius = 50; }
        if (typeof segmentsR === "undefined") { segmentsR = 16; }
        if (typeof segmentsT === "undefined") { segmentsT = 8; }
        if (typeof yUp === "undefined") { yUp = true; }
        _super.call(this);
        this._numVertices = 0;

        this._radius = radius;
        this._tubeRadius = tubeRadius;
        this._segmentsR = segmentsR;
        this._segmentsT = segmentsT;
        this._yUp = yUp;
    }
    Object.defineProperty(PrimitiveTorusPrefab.prototype, "radius", {
        /**
        * The radius of the torus.
        */
        get: function () {
            return this._radius;
        },
        set: function (value) {
            this._radius = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitiveTorusPrefab.prototype, "tubeRadius", {
        /**
        * The radius of the inner tube of the torus.
        */
        get: function () {
            return this._tubeRadius;
        },
        set: function (value) {
            this._tubeRadius = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitiveTorusPrefab.prototype, "segmentsR", {
        /**
        * Defines the number of horizontal segments that make up the torus. Defaults to 16.
        */
        get: function () {
            return this._segmentsR;
        },
        set: function (value) {
            this._segmentsR = value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitiveTorusPrefab.prototype, "segmentsT", {
        /**
        * Defines the number of vertical segments that make up the torus. Defaults to 8.
        */
        get: function () {
            return this._segmentsT;
        },
        set: function (value) {
            this._segmentsT = value;
            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitiveTorusPrefab.prototype, "yUp", {
        /**
        * Defines whether the torus poles should lay on the Y-axis (true) or on the Z-axis (false).
        */
        get: function () {
            return this._yUp;
        },
        set: function (value) {
            this._yUp = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });


    /**
    * @inheritDoc
    */
    PrimitiveTorusPrefab.prototype._pBuildGeometry = function (target, geometryType) {
        var indices;
        var positions;
        var normals;
        var tangents;

        var i, j;
        var x, y, z, nx, ny, nz, revolutionAngleR, revolutionAngleT;
        var vidx;
        var fidx;
        var numIndices = 0;

        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;

            // evaluate target number of vertices, triangles and indices
            this._numVertices = (this._segmentsT + 1) * (this._segmentsR + 1); // segmentsT + 1 because of closure, segmentsR + 1 because of closure
            numIndices = this._segmentsT * this._segmentsR * 6; // each level has segmentR quads, each of 2 triangles

            // need to initialize raw arrays or can be reused?
            if (this._numVertices == triangleGeometry.numVertices) {
                indices = triangleGeometry.indices;
                positions = triangleGeometry.positions;
                normals = triangleGeometry.vertexNormals;
                tangents = triangleGeometry.vertexTangents;
            } else {
                indices = new Array(numIndices);
                positions = new Array(this._numVertices * 3);
                normals = new Array(this._numVertices * 3);
                tangents = new Array(this._numVertices * 3);

                this._pInvalidateUVs();
            }

            vidx = 0;
            fidx = 0;

            // evaluate revolution steps
            var revolutionAngleDeltaR = 2 * Math.PI / this._segmentsR;
            var revolutionAngleDeltaT = 2 * Math.PI / this._segmentsT;

            var comp1, comp2;
            var t1, t2, n1, n2;
            var startIndex = 0;
            var nextVertexIndex = 0;

            // surface
            var a, b, c, d, length;

            for (j = 0; j <= this._segmentsT; ++j) {
                startIndex = nextVertexIndex * 3;

                for (i = 0; i <= this._segmentsR; ++i) {
                    // revolution vertex
                    revolutionAngleR = i * revolutionAngleDeltaR;
                    revolutionAngleT = j * revolutionAngleDeltaT;

                    length = Math.cos(revolutionAngleT);
                    nx = length * Math.cos(revolutionAngleR);
                    ny = length * Math.sin(revolutionAngleR);
                    nz = Math.sin(revolutionAngleT);

                    x = this._radius * Math.cos(revolutionAngleR) + this._tubeRadius * nx;
                    y = this._radius * Math.sin(revolutionAngleR) + this._tubeRadius * ny;
                    z = (j == this._segmentsT) ? 0 : this._tubeRadius * nz;

                    if (this._yUp) {
                        n1 = -nz;
                        n2 = ny;
                        t1 = 0;
                        t2 = (length ? nx / length : x / this._radius);
                        comp1 = -z;
                        comp2 = y;
                    } else {
                        n1 = ny;
                        n2 = nz;
                        t1 = (length ? nx / length : x / this._radius);
                        t2 = 0;
                        comp1 = y;
                        comp2 = z;
                    }

                    if (i == this._segmentsR) {
                        positions[vidx] = x;
                        positions[vidx + 1] = positions[startIndex + 1];
                        positions[vidx + 2] = positions[startIndex + 2];
                    } else {
                        positions[vidx] = x;
                        positions[vidx + 1] = comp1;
                        positions[vidx + 2] = comp2;
                    }

                    normals[vidx] = nx;
                    normals[vidx + 1] = n1;
                    normals[vidx + 2] = n2;
                    tangents[vidx] = -(length ? ny / length : y / this._radius);
                    tangents[vidx + 1] = t1;
                    tangents[vidx + 2] = t2;

                    vidx += 3;

                    // close triangle
                    if (i > 0 && j > 0) {
                        a = nextVertexIndex; // current
                        b = nextVertexIndex - 1; // previous
                        c = b - this._segmentsR - 1; // previous of last level
                        d = a - this._segmentsR - 1; // current of last level

                        indices[fidx++] = a;
                        indices[fidx++] = b;
                        indices[fidx++] = c;

                        indices[fidx++] = a;
                        indices[fidx++] = c;
                        indices[fidx++] = d;
                    }

                    nextVertexIndex++;
                }
            }

            // build real data from raw data
            triangleGeometry.updateIndices(indices);

            triangleGeometry.updatePositions(positions);
            triangleGeometry.updateVertexNormals(normals);
            triangleGeometry.updateVertexTangents(tangents);
        } else if (geometryType == "lineSubGeometry") {
            //TODO
        }
    };

    /**
    * @inheritDoc
    */
    PrimitiveTorusPrefab.prototype._pBuildUVs = function (target, geometryType) {
        var i, j;
        var uvs;

        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;

            // need to initialize raw array or can be reused?
            if (triangleGeometry.uvs && this._numVertices == triangleGeometry.numVertices) {
                uvs = triangleGeometry.uvs;
            } else {
                uvs = new Array(this._numVertices * 2);
            }

            // current uv component index
            var index = 0;

            for (j = 0; j <= this._segmentsT; ++j) {
                for (i = 0; i <= this._segmentsR; ++i) {
                    // revolution vertex
                    uvs[index++] = (i / this._segmentsR) * triangleGeometry.scaleU;
                    uvs[index++] = (j / this._segmentsT) * triangleGeometry.scaleV;
                }
            }

            // build real data from raw data
            triangleGeometry.updateUVs(uvs);
        } else if (geometryType == "lineSubGeometry") {
            //nothing to do here
        }
    };
    return PrimitiveTorusPrefab;
})(PrimitivePrefabBase);

module.exports = PrimitiveTorusPrefab;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZWZhYnMvUHJpbWl0aXZlVG9ydXNQcmVmYWIudHMiXSwibmFtZXMiOlsiUHJpbWl0aXZlVG9ydXNQcmVmYWIiLCJQcmltaXRpdmVUb3J1c1ByZWZhYi5jb25zdHJ1Y3RvciIsIlByaW1pdGl2ZVRvcnVzUHJlZmFiLl9wQnVpbGRHZW9tZXRyeSIsIlByaW1pdGl2ZVRvcnVzUHJlZmFiLl9wQnVpbGRVVnMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdGQUdxRjs7QUFFckY7O0VBRUc7QUFDSDtJQUFtQ0EsdUNBQW1CQTtJQXlGckRBOzs7Ozs7O01BREdBO0lBQ0hBLDhCQUFZQSxNQUFrQkEsRUFBRUEsVUFBc0JBLEVBQUVBLFNBQXFCQSxFQUFFQSxTQUFvQkEsRUFBRUEsR0FBa0JBO1FBQTNHQyxxQ0FBQUEsTUFBTUEsR0FBVUEsRUFBRUE7QUFBQUEsUUFBRUEseUNBQUFBLFVBQVVBLEdBQVVBLEVBQUVBO0FBQUFBLFFBQUVBLHdDQUFBQSxTQUFTQSxHQUFVQSxFQUFFQTtBQUFBQSxRQUFFQSx3Q0FBQUEsU0FBU0EsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFBRUEsa0NBQUFBLEdBQUdBLEdBQVdBLElBQUlBO0FBQUFBLFFBRXRIQSxXQUFNQSxLQUFBQSxDQUFDQTtRQXBGUkEsS0FBUUEsWUFBWUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7O1FBc0YvQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUE7UUFDckJBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLFVBQVVBO1FBQzdCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxTQUFTQTtRQUMzQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsU0FBU0E7UUFDM0JBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBO0lBQ2hCQSxDQUFDQTtJQXRGREQ7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLE9BQU9BO1FBQ3BCQSxDQUFDQTtRQUVEQSxLQUFBQSxVQUFrQkEsS0FBWUE7WUFF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QSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFFQTtnQkFDdENBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLEVBQUVBLENBQUNBLENBQUVBO29CQUN0Q0Esb0JBQW9CQTtvQkFDcEJBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUVBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUE7b0JBQzVEQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFFQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BO2lCQUM1REE7YUFDREE7O1lBRURBLGdDQUFnQ0E7WUFDaENBLGdCQUFnQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7U0FFL0JBLE1BQU1BLElBQUlBLFlBQVlBLElBQUlBLGlCQUFpQkEsQ0FBRUE7WUFDN0NBLG9CQUFvQkE7U0FDcEJBO0lBQ0ZBLENBQUNBO0lBQ0ZILDRCQUFDQTtBQUFEQSxDQUFDQSxFQTVSa0MsbUJBQW1CLEVBNFJyRDs7QUFFRCxxQ0FBOEIsQ0FBQSIsImZpbGUiOiJwcmVmYWJzL1ByaW1pdGl2ZVRvcnVzUHJlZmFiLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2JiYXRlbWFuL1dlYnN0b3JtUHJvamVjdHMvYXdheWpzLWNvcmUvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN1Ykdlb21ldHJ5QmFzZVx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvU3ViR2VvbWV0cnlCYXNlXCIpO1xuaW1wb3J0IFRyaWFuZ2xlU3ViR2VvbWV0cnlcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9UcmlhbmdsZVN1Ykdlb21ldHJ5XCIpO1xuaW1wb3J0IElBc3NldFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9saWJyYXJ5L0lBc3NldFwiKTtcbmltcG9ydCBQcmltaXRpdmVQcmVmYWJCYXNlXHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9wcmVmYWJzL1ByaW1pdGl2ZVByZWZhYkJhc2VcIik7XG5cbi8qKlxuICogQSBVViBDeWxpbmRlciBwcmltaXRpdmUgbWVzaC5cbiAqL1xuY2xhc3MgUHJpbWl0aXZlVG9ydXNQcmVmYWIgZXh0ZW5kcyBQcmltaXRpdmVQcmVmYWJCYXNlIGltcGxlbWVudHMgSUFzc2V0XG57XG5cdHByaXZhdGUgX3JhZGl1czpudW1iZXI7XG5cdHByaXZhdGUgX3R1YmVSYWRpdXM6bnVtYmVyO1xuXHRwcml2YXRlIF9zZWdtZW50c1I6bnVtYmVyO1xuXHRwcml2YXRlIF9zZWdtZW50c1Q6bnVtYmVyO1xuXHRwcml2YXRlIF95VXA6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfbnVtVmVydGljZXM6bnVtYmVyID0gMDtcblxuXHQvKipcblx0ICogVGhlIHJhZGl1cyBvZiB0aGUgdG9ydXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHJhZGl1cygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3JhZGl1cztcblx0fVxuXG5cdHB1YmxpYyBzZXQgcmFkaXVzKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX3JhZGl1cyA9IHZhbHVlO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgcmFkaXVzIG9mIHRoZSBpbm5lciB0dWJlIG9mIHRoZSB0b3J1cy5cblx0ICovXG5cdHB1YmxpYyBnZXQgdHViZVJhZGl1cygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3R1YmVSYWRpdXM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHR1YmVSYWRpdXModmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fdHViZVJhZGl1cyA9IHZhbHVlO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSBudW1iZXIgb2YgaG9yaXpvbnRhbCBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIHRvcnVzLiBEZWZhdWx0cyB0byAxNi5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2VnbWVudHNSKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2VnbWVudHNSO1xuXHR9XG5cblx0cHVibGljIHNldCBzZWdtZW50c1IodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fc2VnbWVudHNSID0gdmFsdWU7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlVVZzKCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgbnVtYmVyIG9mIHZlcnRpY2FsIHNlZ21lbnRzIHRoYXQgbWFrZSB1cCB0aGUgdG9ydXMuIERlZmF1bHRzIHRvIDguXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNlZ21lbnRzVCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NlZ21lbnRzVDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgc2VnbWVudHNUKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX3NlZ21lbnRzVCA9IHZhbHVlO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVVWcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgd2hldGhlciB0aGUgdG9ydXMgcG9sZXMgc2hvdWxkIGxheSBvbiB0aGUgWS1heGlzICh0cnVlKSBvciBvbiB0aGUgWi1heGlzIChmYWxzZSkuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHlVcCgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl95VXA7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHlVcCh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0dGhpcy5feVVwID0gdmFsdWU7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgPGNvZGU+VG9ydXM8L2NvZGU+IG9iamVjdC5cblx0ICogQHBhcmFtIHJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoZSB0b3J1cy5cblx0ICogQHBhcmFtIHR1ZWJSYWRpdXMgVGhlIHJhZGl1cyBvZiB0aGUgaW5uZXIgdHViZSBvZiB0aGUgdG9ydXMuXG5cdCAqIEBwYXJhbSBzZWdtZW50c1IgRGVmaW5lcyB0aGUgbnVtYmVyIG9mIGhvcml6b250YWwgc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSB0b3J1cy5cblx0ICogQHBhcmFtIHNlZ21lbnRzVCBEZWZpbmVzIHRoZSBudW1iZXIgb2YgdmVydGljYWwgc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSB0b3J1cy5cblx0ICogQHBhcmFtIHlVcCBEZWZpbmVzIHdoZXRoZXIgdGhlIHRvcnVzIHBvbGVzIHNob3VsZCBsYXkgb24gdGhlIFktYXhpcyAodHJ1ZSkgb3Igb24gdGhlIFotYXhpcyAoZmFsc2UpLlxuXHQgKi9cblx0Y29uc3RydWN0b3IocmFkaXVzOm51bWJlciA9IDUwLCB0dWJlUmFkaXVzOm51bWJlciA9IDUwLCBzZWdtZW50c1I6bnVtYmVyID0gMTYsIHNlZ21lbnRzVDpudW1iZXIgPSA4LCB5VXA6Ym9vbGVhbiA9IHRydWUpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fcmFkaXVzID0gcmFkaXVzO1xuXHRcdHRoaXMuX3R1YmVSYWRpdXMgPSB0dWJlUmFkaXVzO1xuXHRcdHRoaXMuX3NlZ21lbnRzUiA9IHNlZ21lbnRzUjtcblx0XHR0aGlzLl9zZWdtZW50c1QgPSBzZWdtZW50c1Q7XG5cdFx0dGhpcy5feVVwID0geVVwO1xuXHR9XG5cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBfcEJ1aWxkR2VvbWV0cnkodGFyZ2V0OlN1Ykdlb21ldHJ5QmFzZSwgZ2VvbWV0cnlUeXBlOnN0cmluZylcblx0e1xuXHRcdHZhciBpbmRpY2VzOkFycmF5PG51bWJlcj4gLyp1aW50Ki87XG5cdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXHRcdHZhciBub3JtYWxzOkFycmF5PG51bWJlcj47XG5cdFx0dmFyIHRhbmdlbnRzOkFycmF5PG51bWJlcj47XG5cblx0XHR2YXIgaTpudW1iZXIsIGo6bnVtYmVyO1xuXHRcdHZhciB4Om51bWJlciwgeTpudW1iZXIsIHo6bnVtYmVyLCBueDpudW1iZXIsIG55Om51bWJlciwgbno6bnVtYmVyLCByZXZvbHV0aW9uQW5nbGVSOm51bWJlciwgcmV2b2x1dGlvbkFuZ2xlVDpudW1iZXI7XG5cdFx0dmFyIHZpZHg6bnVtYmVyO1xuXHRcdHZhciBmaWR4Om51bWJlcjtcblx0XHR2YXIgbnVtSW5kaWNlczpudW1iZXIgPSAwO1xuXG5cdFx0aWYgKGdlb21ldHJ5VHlwZSA9PSBcInRyaWFuZ2xlU3ViR2VvbWV0cnlcIikge1xuXG5cdFx0XHR2YXIgdHJpYW5nbGVHZW9tZXRyeTpUcmlhbmdsZVN1Ykdlb21ldHJ5ID0gPFRyaWFuZ2xlU3ViR2VvbWV0cnk+IHRhcmdldDtcblxuXHRcdFx0Ly8gZXZhbHVhdGUgdGFyZ2V0IG51bWJlciBvZiB2ZXJ0aWNlcywgdHJpYW5nbGVzIGFuZCBpbmRpY2VzXG5cdFx0XHR0aGlzLl9udW1WZXJ0aWNlcyA9ICh0aGlzLl9zZWdtZW50c1QgKyAxKSoodGhpcy5fc2VnbWVudHNSICsgMSk7IC8vIHNlZ21lbnRzVCArIDEgYmVjYXVzZSBvZiBjbG9zdXJlLCBzZWdtZW50c1IgKyAxIGJlY2F1c2Ugb2YgY2xvc3VyZVxuXHRcdFx0bnVtSW5kaWNlcyA9IHRoaXMuX3NlZ21lbnRzVCp0aGlzLl9zZWdtZW50c1IqNjsgLy8gZWFjaCBsZXZlbCBoYXMgc2VnbWVudFIgcXVhZHMsIGVhY2ggb2YgMiB0cmlhbmdsZXNcblxuXHRcdFx0Ly8gbmVlZCB0byBpbml0aWFsaXplIHJhdyBhcnJheXMgb3IgY2FuIGJlIHJldXNlZD9cblx0XHRcdGlmICh0aGlzLl9udW1WZXJ0aWNlcyA9PSB0cmlhbmdsZUdlb21ldHJ5Lm51bVZlcnRpY2VzKSB7XG5cdFx0XHRcdGluZGljZXMgPSB0cmlhbmdsZUdlb21ldHJ5LmluZGljZXM7XG5cdFx0XHRcdHBvc2l0aW9ucyA9IHRyaWFuZ2xlR2VvbWV0cnkucG9zaXRpb25zO1xuXHRcdFx0XHRub3JtYWxzID0gdHJpYW5nbGVHZW9tZXRyeS52ZXJ0ZXhOb3JtYWxzO1xuXHRcdFx0XHR0YW5nZW50cyA9IHRyaWFuZ2xlR2VvbWV0cnkudmVydGV4VGFuZ2VudHM7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbmRpY2VzID0gbmV3IEFycmF5PG51bWJlcj4obnVtSW5kaWNlcylcblx0XHRcdFx0cG9zaXRpb25zID0gbmV3IEFycmF5PG51bWJlcj4odGhpcy5fbnVtVmVydGljZXMqMyk7XG5cdFx0XHRcdG5vcm1hbHMgPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLl9udW1WZXJ0aWNlcyozKTtcblx0XHRcdFx0dGFuZ2VudHMgPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLl9udW1WZXJ0aWNlcyozKTtcblxuXHRcdFx0XHR0aGlzLl9wSW52YWxpZGF0ZVVWcygpO1xuXHRcdFx0fVxuXG5cblx0XHRcdHZpZHggPSAwO1xuXHRcdFx0ZmlkeCA9IDA7XG5cblx0XHRcdC8vIGV2YWx1YXRlIHJldm9sdXRpb24gc3RlcHNcblx0XHRcdHZhciByZXZvbHV0aW9uQW5nbGVEZWx0YVI6bnVtYmVyID0gMipNYXRoLlBJL3RoaXMuX3NlZ21lbnRzUjtcblx0XHRcdHZhciByZXZvbHV0aW9uQW5nbGVEZWx0YVQ6bnVtYmVyID0gMipNYXRoLlBJL3RoaXMuX3NlZ21lbnRzVDtcblxuXHRcdFx0dmFyIGNvbXAxOm51bWJlciwgY29tcDI6bnVtYmVyO1xuXHRcdFx0dmFyIHQxOm51bWJlciwgdDI6bnVtYmVyLCBuMTpudW1iZXIsIG4yOm51bWJlcjtcblx0XHRcdHZhciBzdGFydEluZGV4Om51bWJlciA9IDA7XG5cdFx0XHR2YXIgbmV4dFZlcnRleEluZGV4Om51bWJlciA9IDA7XG5cblx0XHRcdC8vIHN1cmZhY2Vcblx0XHRcdHZhciBhOm51bWJlciwgYjpudW1iZXIsIGM6bnVtYmVyLCBkOm51bWJlciwgbGVuZ3RoOm51bWJlcjtcblxuXHRcdFx0Zm9yIChqID0gMDsgaiA8PSB0aGlzLl9zZWdtZW50c1Q7ICsraikge1xuXG5cdFx0XHRcdHN0YXJ0SW5kZXggPSBuZXh0VmVydGV4SW5kZXgqMztcblxuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDw9IHRoaXMuX3NlZ21lbnRzUjsgKytpKSB7XG5cblx0XHRcdFx0XHQvLyByZXZvbHV0aW9uIHZlcnRleFxuXHRcdFx0XHRcdHJldm9sdXRpb25BbmdsZVIgPSBpKnJldm9sdXRpb25BbmdsZURlbHRhUjtcblx0XHRcdFx0XHRyZXZvbHV0aW9uQW5nbGVUID0gaipyZXZvbHV0aW9uQW5nbGVEZWx0YVQ7XG5cblx0XHRcdFx0XHRsZW5ndGggPSBNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGVUKTtcblx0XHRcdFx0XHRueCA9IGxlbmd0aCpNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGVSKTtcblx0XHRcdFx0XHRueSA9IGxlbmd0aCpNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGVSKTtcblx0XHRcdFx0XHRueiA9IE1hdGguc2luKHJldm9sdXRpb25BbmdsZVQpO1xuXG5cdFx0XHRcdFx0eCA9IHRoaXMuX3JhZGl1cypNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGVSKSArIHRoaXMuX3R1YmVSYWRpdXMqbng7XG5cdFx0XHRcdFx0eSA9IHRoaXMuX3JhZGl1cypNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGVSKSArIHRoaXMuX3R1YmVSYWRpdXMqbnk7XG5cdFx0XHRcdFx0eiA9IChqID09IHRoaXMuX3NlZ21lbnRzVCk/IDAgOiB0aGlzLl90dWJlUmFkaXVzKm56O1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3lVcCkge1xuXG5cdFx0XHRcdFx0XHRuMSA9IC1uejtcblx0XHRcdFx0XHRcdG4yID0gbnk7XG5cdFx0XHRcdFx0XHR0MSA9IDA7XG5cdFx0XHRcdFx0XHR0MiA9IChsZW5ndGg/IG54L2xlbmd0aCA6IHgvdGhpcy5fcmFkaXVzKTtcblx0XHRcdFx0XHRcdGNvbXAxID0gLXo7XG5cdFx0XHRcdFx0XHRjb21wMiA9IHk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bjEgPSBueTtcblx0XHRcdFx0XHRcdG4yID0gbno7XG5cdFx0XHRcdFx0XHR0MSA9IChsZW5ndGg/IG54L2xlbmd0aCA6IHgvdGhpcy5fcmFkaXVzKTtcblx0XHRcdFx0XHRcdHQyID0gMDtcblx0XHRcdFx0XHRcdGNvbXAxID0geTtcblx0XHRcdFx0XHRcdGNvbXAyID0gejtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoaSA9PSB0aGlzLl9zZWdtZW50c1IpIHtcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IHg7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyAxXTtcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSBwb3NpdGlvbnNbc3RhcnRJbmRleCArIDJdO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSB4O1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IGNvbXAyO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSBueDtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IG4xO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gbjI7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeF0gPSAtKGxlbmd0aD8gbnkvbGVuZ3RoIDogeS90aGlzLl9yYWRpdXMpO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAxXSA9IHQxO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAyXSA9IHQyO1xuXG5cdFx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdFx0Ly8gY2xvc2UgdHJpYW5nbGVcblx0XHRcdFx0XHRpZiAoaSA+IDAgJiYgaiA+IDApIHtcblx0XHRcdFx0XHRcdGEgPSBuZXh0VmVydGV4SW5kZXg7IC8vIGN1cnJlbnRcblx0XHRcdFx0XHRcdGIgPSBuZXh0VmVydGV4SW5kZXggLSAxOyAvLyBwcmV2aW91c1xuXHRcdFx0XHRcdFx0YyA9IGIgLSB0aGlzLl9zZWdtZW50c1IgLSAxOyAvLyBwcmV2aW91cyBvZiBsYXN0IGxldmVsXG5cdFx0XHRcdFx0XHRkID0gYSAtIHRoaXMuX3NlZ21lbnRzUiAtIDE7IC8vIGN1cnJlbnQgb2YgbGFzdCBsZXZlbFxuXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBhO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYjtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGM7XG5cblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGE7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBjO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gZDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRuZXh0VmVydGV4SW5kZXgrKztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBidWlsZCByZWFsIGRhdGEgZnJvbSByYXcgZGF0YVxuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVJbmRpY2VzKGluZGljZXMpO1xuXG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZVBvc2l0aW9ucyhwb3NpdGlvbnMpO1xuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVWZXJ0ZXhOb3JtYWxzKG5vcm1hbHMpO1xuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVWZXJ0ZXhUYW5nZW50cyh0YW5nZW50cyk7XG5cblx0XHR9IGVsc2UgaWYgKGdlb21ldHJ5VHlwZSA9PSBcImxpbmVTdWJHZW9tZXRyeVwiKSB7XG5cdFx0XHQvL1RPRE9cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBfcEJ1aWxkVVZzKHRhcmdldDpTdWJHZW9tZXRyeUJhc2UsIGdlb21ldHJ5VHlwZTpzdHJpbmcpXG5cdHtcblxuXHRcdHZhciBpOm51bWJlciwgajpudW1iZXI7XG5cdFx0dmFyIHV2czpBcnJheTxudW1iZXI+O1xuXG5cblx0XHRpZiAoZ2VvbWV0cnlUeXBlID09IFwidHJpYW5nbGVTdWJHZW9tZXRyeVwiKSB7XG5cblx0XHRcdHZhciB0cmlhbmdsZUdlb21ldHJ5OlRyaWFuZ2xlU3ViR2VvbWV0cnkgPSA8VHJpYW5nbGVTdWJHZW9tZXRyeT4gdGFyZ2V0O1xuXG5cdFx0XHQvLyBuZWVkIHRvIGluaXRpYWxpemUgcmF3IGFycmF5IG9yIGNhbiBiZSByZXVzZWQ/XG5cdFx0XHRpZiAodHJpYW5nbGVHZW9tZXRyeS51dnMgJiYgdGhpcy5fbnVtVmVydGljZXMgPT0gdHJpYW5nbGVHZW9tZXRyeS5udW1WZXJ0aWNlcykge1xuXHRcdFx0XHR1dnMgPSB0cmlhbmdsZUdlb21ldHJ5LnV2cztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHV2cyA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuX251bVZlcnRpY2VzKjIpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjdXJyZW50IHV2IGNvbXBvbmVudCBpbmRleFxuXHRcdFx0dmFyIGluZGV4Om51bWJlciA9IDA7XG5cblx0XHRcdC8vIHN1cmZhY2Vcblx0XHRcdGZvciAoaiA9IDA7IGogPD0gdGhpcy5fc2VnbWVudHNUOyArK2opIHtcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9zZWdtZW50c1I7ICsraSkge1xuXHRcdFx0XHRcdC8vIHJldm9sdXRpb24gdmVydGV4XG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0gKCBpL3RoaXMuX3NlZ21lbnRzUiApKnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVVO1xuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggai90aGlzLl9zZWdtZW50c1QgKSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBidWlsZCByZWFsIGRhdGEgZnJvbSByYXcgZGF0YVxuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVVVnModXZzKTtcblxuXHRcdH0gZWxzZSBpZiAoZ2VvbWV0cnlUeXBlID09IFwibGluZVN1Ykdlb21ldHJ5XCIpIHtcblx0XHRcdC8vbm90aGluZyB0byBkbyBoZXJlXG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCA9IFByaW1pdGl2ZVRvcnVzUHJlZmFiOyJdfQ==