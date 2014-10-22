var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitivePrefabBase = require("awayjs-core/lib/prefabs/PrimitivePrefabBase");

/**
* A Plane primitive mesh.
*/
var PrimitivePlanePrefab = (function (_super) {
    __extends(PrimitivePlanePrefab, _super);
    /**
    * Creates a new Plane object.
    * @param width The width of the plane.
    * @param height The height of the plane.
    * @param segmentsW The number of segments that make up the plane along the X-axis.
    * @param segmentsH The number of segments that make up the plane along the Y or Z-axis.
    * @param yUp Defines whether the normal vector of the plane should point along the Y-axis (true) or Z-axis (false).
    * @param doubleSided Defines whether the plane will be visible from both sides, with correct vertex normals.
    */
    function PrimitivePlanePrefab(width, height, segmentsW, segmentsH, yUp, doubleSided) {
        if (typeof width === "undefined") { width = 100; }
        if (typeof height === "undefined") { height = 100; }
        if (typeof segmentsW === "undefined") { segmentsW = 1; }
        if (typeof segmentsH === "undefined") { segmentsH = 1; }
        if (typeof yUp === "undefined") { yUp = true; }
        if (typeof doubleSided === "undefined") { doubleSided = false; }
        _super.call(this);

        this._segmentsW = segmentsW;
        this._segmentsH = segmentsH;
        this._yUp = yUp;
        this._width = width;
        this._height = height;
        this._doubleSided = doubleSided;
    }
    Object.defineProperty(PrimitivePlanePrefab.prototype, "segmentsW", {
        /**
        * The number of segments that make up the plane along the X-axis. Defaults to 1.
        */
        get: function () {
            return this._segmentsW;
        },
        set: function (value) {
            this._segmentsW = value;

            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitivePlanePrefab.prototype, "segmentsH", {
        /**
        * The number of segments that make up the plane along the Y or Z-axis, depending on whether yUp is true or
        * false, respectively. Defaults to 1.
        */
        get: function () {
            return this._segmentsH;
        },
        set: function (value) {
            this._segmentsH = value;

            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitivePlanePrefab.prototype, "yUp", {
        /**
        *  Defines whether the normal vector of the plane should point along the Y-axis (true) or Z-axis (false). Defaults to true.
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


    Object.defineProperty(PrimitivePlanePrefab.prototype, "doubleSided", {
        /**
        * Defines whether the plane will be visible from both sides, with correct vertex normals (as opposed to bothSides on Material). Defaults to false.
        */
        get: function () {
            return this._doubleSided;
        },
        set: function (value) {
            this._doubleSided = value;

            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitivePlanePrefab.prototype, "width", {
        /**
        * The width of the plane.
        */
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;

            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitivePlanePrefab.prototype, "height", {
        /**
        * The height of the plane.
        */
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;

            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });


    /**
    * @inheritDoc
    */
    PrimitivePlanePrefab.prototype._pBuildGeometry = function (target, geometryType) {
        var indices;
        var x, y;
        var numIndices;
        var base;
        var tw = this._segmentsW + 1;
        var numVertices;

        var vidx, fidx;

        var xi;
        var yi;

        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;

            var numVertices = (this._segmentsH + 1) * tw;
            var positions;
            var normals;
            var tangents;

            if (this._doubleSided)
                numVertices *= 2;

            numIndices = this._segmentsH * this._segmentsW * 6;

            if (this._doubleSided)
                numIndices *= 2;

            if (triangleGeometry.indices != null && numIndices == triangleGeometry.indices.length) {
                indices = triangleGeometry.indices;
            } else {
                indices = new Array(numIndices);

                this._pInvalidateUVs();
            }

            if (numVertices == triangleGeometry.numVertices) {
                positions = triangleGeometry.positions;
                normals = triangleGeometry.vertexNormals;
                tangents = triangleGeometry.vertexTangents;
            } else {
                positions = new Array(numVertices * 3);
                normals = new Array(numVertices * 3);
                tangents = new Array(numVertices * 3);

                this._pInvalidateUVs();
            }

            fidx = 0;

            vidx = 0;

            for (yi = 0; yi <= this._segmentsH; ++yi) {
                for (xi = 0; xi <= this._segmentsW; ++xi) {
                    x = (xi / this._segmentsW - .5) * this._width;
                    y = (yi / this._segmentsH - .5) * this._height;

                    positions[vidx] = x;
                    if (this._yUp) {
                        positions[vidx + 1] = 0;
                        positions[vidx + 2] = y;
                    } else {
                        positions[vidx + 1] = y;
                        positions[vidx + 2] = 0;
                    }

                    normals[vidx] = 0;

                    if (this._yUp) {
                        normals[vidx + 1] = 1;
                        normals[vidx + 2] = 0;
                    } else {
                        normals[vidx + 1] = 0;
                        normals[vidx + 2] = -1;
                    }

                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;

                    vidx += 3;

                    // add vertex with same position, but with inverted normal & tangent
                    if (this._doubleSided) {
                        for (var i = vidx; i < vidx + 3; ++i) {
                            positions[i] = positions[i - 3];
                            normals[i] = -normals[i - 3];
                            tangents[i] = -tangents[i - 3];
                        }

                        vidx += 3;
                    }

                    if (xi != this._segmentsW && yi != this._segmentsH) {
                        base = xi + yi * tw;
                        var mult = this._doubleSided ? 2 : 1;

                        indices[fidx++] = base * mult;
                        indices[fidx++] = (base + tw) * mult;
                        indices[fidx++] = (base + tw + 1) * mult;
                        indices[fidx++] = base * mult;
                        indices[fidx++] = (base + tw + 1) * mult;
                        indices[fidx++] = (base + 1) * mult;

                        if (this._doubleSided) {
                            indices[fidx++] = (base + tw + 1) * mult + 1;
                            indices[fidx++] = (base + tw) * mult + 1;
                            indices[fidx++] = base * mult + 1;
                            indices[fidx++] = (base + 1) * mult + 1;
                            indices[fidx++] = (base + tw + 1) * mult + 1;
                            indices[fidx++] = base * mult + 1;
                        }
                    }
                }
            }

            triangleGeometry.updateIndices(indices);

            triangleGeometry.updatePositions(positions);
            triangleGeometry.updateVertexNormals(normals);
            triangleGeometry.updateVertexTangents(tangents);
        } else if (geometryType == "lineSubGeometry") {
            var lineGeometry = target;

            var numSegments = (this._segmentsH + 1) + tw;
            var startPositions;
            var endPositions;
            var thickness;

            var hw = this._width / 2;
            var hh = this._height / 2;

            if (lineGeometry.indices != null && numSegments == lineGeometry.numSegments) {
                startPositions = lineGeometry.startPositions;
                endPositions = lineGeometry.endPositions;
                thickness = lineGeometry.thickness;
            } else {
                startPositions = new Array(numSegments * 3);
                endPositions = new Array(numSegments * 3);
                thickness = new Array(numSegments);
            }

            fidx = 0;

            vidx = 0;

            for (yi = 0; yi <= this._segmentsH; ++yi) {
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = 0;
                startPositions[vidx + 2] = yi * this._height - hh;

                endPositions[vidx] = hw;
                endPositions[vidx + 1] = 0;
                endPositions[vidx + 2] = yi * this._height - hh;

                thickness[fidx++] = 1;

                vidx += 3;
            }

            for (xi = 0; xi <= this._segmentsW; ++xi) {
                startPositions[vidx] = xi * this._width - hw;
                startPositions[vidx + 1] = 0;
                startPositions[vidx + 2] = -hh;

                endPositions[vidx] = xi * this._width - hw;
                endPositions[vidx + 1] = 0;
                endPositions[vidx + 2] = hh;

                thickness[fidx++] = 1;

                vidx += 3;
            }

            // build real data from raw data
            lineGeometry.updatePositions(startPositions, endPositions);
            lineGeometry.updateThickness(thickness);
        }
    };

    /**
    * @inheritDoc
    */
    PrimitivePlanePrefab.prototype._pBuildUVs = function (target, geometryType) {
        var uvs;
        var numVertices;

        if (geometryType == "triangleSubGeometry") {
            numVertices = (this._segmentsH + 1) * (this._segmentsW + 1);

            if (this._doubleSided)
                numVertices *= 2;

            var triangleGeometry = target;

            if (triangleGeometry.uvs && numVertices == triangleGeometry.numVertices) {
                uvs = triangleGeometry.uvs;
            } else {
                uvs = new Array(numVertices * 2);
                this._pInvalidateGeometry();
            }

            var index = 0;

            for (var yi = 0; yi <= this._segmentsH; ++yi) {
                for (var xi = 0; xi <= this._segmentsW; ++xi) {
                    uvs[index] = (xi / this._segmentsW) * triangleGeometry.scaleU;
                    uvs[index + 1] = (1 - yi / this._segmentsH) * triangleGeometry.scaleV;
                    index += 2;

                    if (this._doubleSided) {
                        uvs[index] = (xi / this._segmentsW) * triangleGeometry.scaleU;
                        uvs[index + 1] = (1 - yi / this._segmentsH) * triangleGeometry.scaleV;
                        index += 2;
                    }
                }
            }

            triangleGeometry.updateUVs(uvs);
        } else if (geometryType == "lineSubGeometry") {
            //nothing to do here
        }
    };
    return PrimitivePlanePrefab;
})(PrimitivePrefabBase);

module.exports = PrimitivePlanePrefab;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZWZhYnMvUHJpbWl0aXZlUGxhbmVQcmVmYWIudHMiXSwibmFtZXMiOlsiUHJpbWl0aXZlUGxhbmVQcmVmYWIiLCJQcmltaXRpdmVQbGFuZVByZWZhYi5jb25zdHJ1Y3RvciIsIlByaW1pdGl2ZVBsYW5lUHJlZmFiLl9wQnVpbGRHZW9tZXRyeSIsIlByaW1pdGl2ZVBsYW5lUHJlZmFiLl9wQnVpbGRVVnMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdGQUlxRjs7QUFFckY7O0VBRUc7QUFDSDtJQUFtQ0EsdUNBQW1CQTtJQWtCckRBOzs7Ozs7OztNQURHQTtJQUNIQSw4QkFBWUEsS0FBa0JBLEVBQUVBLE1BQW1CQSxFQUFFQSxTQUFvQkEsRUFBRUEsU0FBb0JBLEVBQUVBLEdBQWtCQSxFQUFFQSxXQUEyQkE7UUFBcElDLG9DQUFBQSxLQUFLQSxHQUFVQSxHQUFHQTtBQUFBQSxRQUFFQSxxQ0FBQUEsTUFBTUEsR0FBVUEsR0FBR0E7QUFBQUEsUUFBRUEsd0NBQUFBLFNBQVNBLEdBQVVBLENBQUNBO0FBQUFBLFFBQUVBLHdDQUFBQSxTQUFTQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFFQSxrQ0FBQUEsR0FBR0EsR0FBV0EsSUFBSUE7QUFBQUEsUUFBRUEsMENBQUFBLFdBQVdBLEdBQVdBLEtBQUtBO0FBQUFBLFFBRy9JQSxXQUFNQSxLQUFBQSxDQUFDQTs7UUFFUEEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsU0FBU0E7UUFDM0JBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLFNBQVNBO1FBQzNCQSxJQUFJQSxDQUFDQSxJQUFJQSxHQUFHQSxHQUFHQTtRQUNmQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFHQSxLQUFLQTtRQUNuQkEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBR0EsTUFBTUE7UUFDckJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFdBQVdBO0lBRWhDQSxDQUFDQTtJQUtERDtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0Es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QUFDQSxFQUFFQSxFQUFFQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFFQTtvQkFDekNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEVBQUVBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE1BQU1BO29CQUN6Q0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0E7O29CQUUxQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7b0JBQ25CQSxJQUFJQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFFQTt3QkFDZEEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7d0JBQ3ZCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtxQkFDdkJBLEtBQU1BO3dCQUNOQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTt3QkFDdkJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO3FCQUN2QkE7O29CQUVEQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQTs7b0JBRWpCQSxJQUFJQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFFQTt3QkFDZEEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7d0JBQ3JCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtxQkFDckJBLEtBQU1BO3dCQUNOQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTt3QkFDckJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO3FCQUN0QkE7O29CQUVEQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQTtvQkFDbEJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO29CQUN0QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7O29CQUV0QkEsSUFBSUEsSUFBSUEsQ0FBQ0E7O29CQUVUQSxvRUFBb0VBO29CQUNwRUEsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBRUE7d0JBRXRCQSxLQUFLQSxJQUFJQSxDQUFDQSxHQUFVQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFHQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFFQTs0QkFDNUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBOzRCQUMvQkEsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7NEJBQzVCQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTt5QkFDOUJBOzt3QkFFREEsSUFBSUEsSUFBSUEsQ0FBQ0E7cUJBRVRBOztvQkFFREEsSUFBSUEsRUFBRUEsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsSUFBSUEsRUFBRUEsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBRUE7d0JBRW5EQSxJQUFJQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFDQSxFQUFFQTt3QkFDakJBLElBQUlBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLFlBQVlBLEdBQUVBLENBQUNBLEdBQUdBLENBQUNBOzt3QkFFMUNBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBO3dCQUMzQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsR0FBR0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsSUFBSUE7d0JBQ2xDQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQTt3QkFDdENBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLEdBQUNBLElBQUlBO3dCQUMzQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUE7d0JBQ3RDQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQTs7d0JBRWpDQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFFQTs0QkFFdEJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLENBQUNBOzRCQUMxQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsR0FBR0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0E7NEJBQ3RDQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxHQUFDQSxJQUFJQSxHQUFHQSxDQUFDQTs0QkFDL0JBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLElBQUlBLEdBQUdBLENBQUNBOzRCQUNyQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFB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QUFLQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BO3dCQUMvREEsS0FBS0EsSUFBSUEsQ0FBQ0E7cUJBQ1ZBO2lCQUNEQTthQUNEQTs7WUFFREEsZ0JBQWdCQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQTtTQUcvQkEsTUFBTUEsSUFBSUEsWUFBWUEsSUFBSUEsaUJBQWlCQSxDQUFFQTtZQUM3Q0Esb0JBQW9CQTtTQUNwQkE7SUFDRkEsQ0FBQ0E7SUFDRkgsNEJBQUNBO0FBQURBLENBQUNBLEVBcFhrQyxtQkFBbUIsRUFvWHJEOztBQUVELHFDQUE4QixDQUFBIiwiZmlsZSI6InByZWZhYnMvUHJpbWl0aXZlUGxhbmVQcmVmYWIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9MaW5lU3ViR2VvbWV0cnlcIik7XG5pbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9TdWJHZW9tZXRyeUJhc2VcIik7XG5pbXBvcnQgVHJpYW5nbGVTdWJHZW9tZXRyeVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL1RyaWFuZ2xlU3ViR2VvbWV0cnlcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IFByaW1pdGl2ZVByZWZhYkJhc2VcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3ByZWZhYnMvUHJpbWl0aXZlUHJlZmFiQmFzZVwiKTtcblxuLyoqXG4gKiBBIFBsYW5lIHByaW1pdGl2ZSBtZXNoLlxuICovXG5jbGFzcyBQcmltaXRpdmVQbGFuZVByZWZhYiBleHRlbmRzIFByaW1pdGl2ZVByZWZhYkJhc2UgaW1wbGVtZW50cyBJQXNzZXRcbntcblx0cHJpdmF0ZSBfc2VnbWVudHNXOm51bWJlcjtcblx0cHJpdmF0ZSBfc2VnbWVudHNIOm51bWJlcjtcblx0cHJpdmF0ZSBfeVVwOmJvb2xlYW47XG5cdHByaXZhdGUgX3dpZHRoOm51bWJlcjtcblx0cHJpdmF0ZSBfaGVpZ2h0Om51bWJlcjtcblx0cHJpdmF0ZSBfZG91YmxlU2lkZWQ6Ym9vbGVhbjtcblxuXHQvKipcblx0ICogQ3JlYXRlcyBhIG5ldyBQbGFuZSBvYmplY3QuXG5cdCAqIEBwYXJhbSB3aWR0aCBUaGUgd2lkdGggb2YgdGhlIHBsYW5lLlxuXHQgKiBAcGFyYW0gaGVpZ2h0IFRoZSBoZWlnaHQgb2YgdGhlIHBsYW5lLlxuXHQgKiBAcGFyYW0gc2VnbWVudHNXIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBwbGFuZSBhbG9uZyB0aGUgWC1heGlzLlxuXHQgKiBAcGFyYW0gc2VnbWVudHNIIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBwbGFuZSBhbG9uZyB0aGUgWSBvciBaLWF4aXMuXG5cdCAqIEBwYXJhbSB5VXAgRGVmaW5lcyB3aGV0aGVyIHRoZSBub3JtYWwgdmVjdG9yIG9mIHRoZSBwbGFuZSBzaG91bGQgcG9pbnQgYWxvbmcgdGhlIFktYXhpcyAodHJ1ZSkgb3IgWi1heGlzIChmYWxzZSkuXG5cdCAqIEBwYXJhbSBkb3VibGVTaWRlZCBEZWZpbmVzIHdoZXRoZXIgdGhlIHBsYW5lIHdpbGwgYmUgdmlzaWJsZSBmcm9tIGJvdGggc2lkZXMsIHdpdGggY29ycmVjdCB2ZXJ0ZXggbm9ybWFscy5cblx0ICovXG5cdGNvbnN0cnVjdG9yKHdpZHRoOm51bWJlciA9IDEwMCwgaGVpZ2h0Om51bWJlciA9IDEwMCwgc2VnbWVudHNXOm51bWJlciA9IDEsIHNlZ21lbnRzSDpudW1iZXIgPSAxLCB5VXA6Ym9vbGVhbiA9IHRydWUsIGRvdWJsZVNpZGVkOmJvb2xlYW4gPSBmYWxzZSlcblx0e1xuXG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuX3NlZ21lbnRzVyA9IHNlZ21lbnRzVztcblx0XHR0aGlzLl9zZWdtZW50c0ggPSBzZWdtZW50c0g7XG5cdFx0dGhpcy5feVVwID0geVVwO1xuXHRcdHRoaXMuX3dpZHRoID0gd2lkdGg7XG5cdFx0dGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMuX2RvdWJsZVNpZGVkID0gZG91YmxlU2lkZWQ7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbnVtYmVyIG9mIHNlZ21lbnRzIHRoYXQgbWFrZSB1cCB0aGUgcGxhbmUgYWxvbmcgdGhlIFgtYXhpcy4gRGVmYXVsdHMgdG8gMS5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2VnbWVudHNXKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2VnbWVudHNXO1xuXHR9XG5cblx0cHVibGljIHNldCBzZWdtZW50c1codmFsdWU6bnVtYmVyKVxuXHR7XG5cblx0XHR0aGlzLl9zZWdtZW50c1cgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVVWcygpO1xuXG5cdH1cblxuXHQvKipcblx0ICogVGhlIG51bWJlciBvZiBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIHBsYW5lIGFsb25nIHRoZSBZIG9yIFotYXhpcywgZGVwZW5kaW5nIG9uIHdoZXRoZXIgeVVwIGlzIHRydWUgb3Jcblx0ICogZmFsc2UsIHJlc3BlY3RpdmVseS4gRGVmYXVsdHMgdG8gMS5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2VnbWVudHNIKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2VnbWVudHNIO1xuXHR9XG5cblx0cHVibGljIHNldCBzZWdtZW50c0godmFsdWU6bnVtYmVyKVxuXHR7XG5cblx0XHR0aGlzLl9zZWdtZW50c0ggPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVVWcygpO1xuXG5cdH1cblxuXHQvKipcblx0ICogIERlZmluZXMgd2hldGhlciB0aGUgbm9ybWFsIHZlY3RvciBvZiB0aGUgcGxhbmUgc2hvdWxkIHBvaW50IGFsb25nIHRoZSBZLWF4aXMgKHRydWUpIG9yIFotYXhpcyAoZmFsc2UpLiBEZWZhdWx0cyB0byB0cnVlLlxuXHQgKi9cblx0cHVibGljIGdldCB5VXAoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5feVVwO1xuXHR9XG5cblx0cHVibGljIHNldCB5VXAodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdHRoaXMuX3lVcCA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgd2hldGhlciB0aGUgcGxhbmUgd2lsbCBiZSB2aXNpYmxlIGZyb20gYm90aCBzaWRlcywgd2l0aCBjb3JyZWN0IHZlcnRleCBub3JtYWxzIChhcyBvcHBvc2VkIHRvIGJvdGhTaWRlcyBvbiBNYXRlcmlhbCkuIERlZmF1bHRzIHRvIGZhbHNlLlxuXHQgKi9cblx0cHVibGljIGdldCBkb3VibGVTaWRlZCgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9kb3VibGVTaWRlZDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgZG91YmxlU2lkZWQodmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdHRoaXMuX2RvdWJsZVNpZGVkID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHdpZHRoIG9mIHRoZSBwbGFuZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgd2lkdGgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl93aWR0aDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgd2lkdGgodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fd2lkdGggPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgaGVpZ2h0IG9mIHRoZSBwbGFuZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faGVpZ2h0O1xuXHR9XG5cblx0cHVibGljIHNldCBoZWlnaHQodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5faGVpZ2h0ID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdH1cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBfcEJ1aWxkR2VvbWV0cnkodGFyZ2V0OlN1Ykdlb21ldHJ5QmFzZSwgZ2VvbWV0cnlUeXBlOnN0cmluZylcblx0e1xuXHRcdHZhciBpbmRpY2VzOkFycmF5PG51bWJlcj4gLyp1aW50Ki87XG5cdFx0dmFyIHg6bnVtYmVyLCB5Om51bWJlcjtcblx0XHR2YXIgbnVtSW5kaWNlczpudW1iZXI7XG5cdFx0dmFyIGJhc2U6bnVtYmVyO1xuXHRcdHZhciB0dzpudW1iZXIgPSB0aGlzLl9zZWdtZW50c1cgKyAxO1xuXHRcdHZhciBudW1WZXJ0aWNlczpudW1iZXI7XG5cblx0XHR2YXIgdmlkeDpudW1iZXIsIGZpZHg6bnVtYmVyOyAvLyBpbmRpY2VzXG5cblx0XHR2YXIgeGk6bnVtYmVyO1xuXHRcdHZhciB5aTpudW1iZXI7XG5cblx0XHRpZiAoZ2VvbWV0cnlUeXBlID09IFwidHJpYW5nbGVTdWJHZW9tZXRyeVwiKSB7XG5cblx0XHRcdHZhciB0cmlhbmdsZUdlb21ldHJ5OlRyaWFuZ2xlU3ViR2VvbWV0cnkgPSA8VHJpYW5nbGVTdWJHZW9tZXRyeT4gdGFyZ2V0O1xuXG5cdFx0XHR2YXIgbnVtVmVydGljZXM6bnVtYmVyID0gKHRoaXMuX3NlZ21lbnRzSCArIDEpKnR3O1xuXHRcdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXHRcdFx0dmFyIG5vcm1hbHM6QXJyYXk8bnVtYmVyPjtcblx0XHRcdHZhciB0YW5nZW50czpBcnJheTxudW1iZXI+O1xuXG5cdFx0XHRpZiAodGhpcy5fZG91YmxlU2lkZWQpXG5cdFx0XHRcdG51bVZlcnRpY2VzICo9IDI7XG5cblx0XHRcdG51bUluZGljZXMgPSB0aGlzLl9zZWdtZW50c0gqdGhpcy5fc2VnbWVudHNXKjY7XG5cblx0XHRcdGlmICh0aGlzLl9kb3VibGVTaWRlZClcblx0XHRcdFx0bnVtSW5kaWNlcyAqPSAyO1xuXG5cdFx0XHRpZiAodHJpYW5nbGVHZW9tZXRyeS5pbmRpY2VzICE9IG51bGwgJiYgbnVtSW5kaWNlcyA9PSB0cmlhbmdsZUdlb21ldHJ5LmluZGljZXMubGVuZ3RoKSB7XG5cdFx0XHRcdGluZGljZXMgPSB0cmlhbmdsZUdlb21ldHJ5LmluZGljZXM7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbmRpY2VzID0gbmV3IEFycmF5PG51bWJlcj4obnVtSW5kaWNlcyk7XG5cblx0XHRcdFx0dGhpcy5fcEludmFsaWRhdGVVVnMoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG51bVZlcnRpY2VzID09IHRyaWFuZ2xlR2VvbWV0cnkubnVtVmVydGljZXMpIHtcblx0XHRcdFx0cG9zaXRpb25zID0gdHJpYW5nbGVHZW9tZXRyeS5wb3NpdGlvbnM7XG5cdFx0XHRcdG5vcm1hbHMgPSB0cmlhbmdsZUdlb21ldHJ5LnZlcnRleE5vcm1hbHM7XG5cdFx0XHRcdHRhbmdlbnRzID0gdHJpYW5nbGVHZW9tZXRyeS52ZXJ0ZXhUYW5nZW50cztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHBvc2l0aW9ucyA9IG5ldyBBcnJheTxudW1iZXI+KG51bVZlcnRpY2VzKjMpO1xuXHRcdFx0XHRub3JtYWxzID0gbmV3IEFycmF5PG51bWJlcj4obnVtVmVydGljZXMqMyk7XG5cdFx0XHRcdHRhbmdlbnRzID0gbmV3IEFycmF5PG51bWJlcj4obnVtVmVydGljZXMqMyk7XG5cblx0XHRcdFx0dGhpcy5fcEludmFsaWRhdGVVVnMoKTtcblx0XHRcdH1cblxuXHRcdFx0ZmlkeCA9IDA7XG5cblx0XHRcdHZpZHggPSAwO1xuXG5cdFx0XHRmb3IgKHlpID0gMDsgeWkgPD0gdGhpcy5fc2VnbWVudHNIOyArK3lpKSB7XG5cblx0XHRcdFx0Zm9yICh4aSA9IDA7IHhpIDw9IHRoaXMuX3NlZ21lbnRzVzsgKyt4aSkge1xuXHRcdFx0XHRcdHggPSAoeGkvdGhpcy5fc2VnbWVudHNXIC0gLjUpKnRoaXMuX3dpZHRoO1xuXHRcdFx0XHRcdHkgPSAoeWkvdGhpcy5fc2VnbWVudHNIIC0gLjUpKnRoaXMuX2hlaWdodDtcblxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IHg7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX3lVcCkge1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IDA7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0geTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IHk7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gMDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRub3JtYWxzW3ZpZHhdID0gMDtcblxuXHRcdFx0XHRcdGlmICh0aGlzLl95VXApIHtcblx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDFdID0gMTtcblx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gMDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMV0gPSAwO1xuXHRcdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSAtMTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IDE7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDFdID0gMDtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSAwO1xuXG5cdFx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdFx0Ly8gYWRkIHZlcnRleCB3aXRoIHNhbWUgcG9zaXRpb24sIGJ1dCB3aXRoIGludmVydGVkIG5vcm1hbCAmIHRhbmdlbnRcblx0XHRcdFx0XHRpZiAodGhpcy5fZG91YmxlU2lkZWQpIHtcblxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaTpudW1iZXIgPSB2aWR4OyBpIDwgdmlkeCArIDM7ICsraSkge1xuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbnNbaV0gPSBwb3NpdGlvbnNbaSAtIDNdO1xuXHRcdFx0XHRcdFx0XHRub3JtYWxzW2ldID0gLW5vcm1hbHNbaSAtIDNdO1xuXHRcdFx0XHRcdFx0XHR0YW5nZW50c1tpXSA9IC10YW5nZW50c1tpIC0gM107XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZpZHggKz0gMztcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh4aSAhPSB0aGlzLl9zZWdtZW50c1cgJiYgeWkgIT0gdGhpcy5fc2VnbWVudHNIKSB7XG5cblx0XHRcdFx0XHRcdGJhc2UgPSB4aSArIHlpKnR3O1xuXHRcdFx0XHRcdFx0dmFyIG11bHQ6bnVtYmVyID0gdGhpcy5fZG91YmxlU2lkZWQ/IDIgOiAxO1xuXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBiYXNlKm11bHQ7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSAoYmFzZSArIHR3KSptdWx0O1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gKGJhc2UgKyB0dyArIDEpKm11bHQ7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBiYXNlKm11bHQ7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSAoYmFzZSArIHR3ICsgMSkqbXVsdDtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IChiYXNlICsgMSkqbXVsdDtcblxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX2RvdWJsZVNpZGVkKSB7XG5cblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gKGJhc2UgKyB0dyArIDEpKm11bHQgKyAxO1xuXHRcdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSAoYmFzZSArIHR3KSptdWx0ICsgMTtcblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYmFzZSptdWx0ICsgMTtcblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gKGJhc2UgKyAxKSptdWx0ICsgMTtcblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gKGJhc2UgKyB0dyArIDEpKm11bHQgKyAxO1xuXHRcdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBiYXNlKm11bHQgKyAxO1xuXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlSW5kaWNlcyhpbmRpY2VzKTtcblxuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVQb3NpdGlvbnMocG9zaXRpb25zKTtcblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlVmVydGV4Tm9ybWFscyhub3JtYWxzKTtcblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlVmVydGV4VGFuZ2VudHModGFuZ2VudHMpO1xuXG5cdFx0fSBlbHNlIGlmIChnZW9tZXRyeVR5cGUgPT0gXCJsaW5lU3ViR2VvbWV0cnlcIikge1xuXHRcdFx0dmFyIGxpbmVHZW9tZXRyeTpMaW5lU3ViR2VvbWV0cnkgPSA8TGluZVN1Ykdlb21ldHJ5PiB0YXJnZXQ7XG5cblx0XHRcdHZhciBudW1TZWdtZW50czpudW1iZXIgPSAodGhpcy5fc2VnbWVudHNIICsgMSkgKyB0dztcblx0XHRcdHZhciBzdGFydFBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXHRcdFx0dmFyIGVuZFBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXHRcdFx0dmFyIHRoaWNrbmVzczpBcnJheTxudW1iZXI+O1xuXG5cdFx0XHR2YXIgaHc6bnVtYmVyID0gdGhpcy5fd2lkdGgvMjtcblx0XHRcdHZhciBoaDpudW1iZXIgPSB0aGlzLl9oZWlnaHQvMjtcblxuXG5cdFx0XHRpZiAobGluZUdlb21ldHJ5LmluZGljZXMgIT0gbnVsbCAmJiBudW1TZWdtZW50cyA9PSBsaW5lR2VvbWV0cnkubnVtU2VnbWVudHMpIHtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnMgPSBsaW5lR2VvbWV0cnkuc3RhcnRQb3NpdGlvbnM7XG5cdFx0XHRcdGVuZFBvc2l0aW9ucyA9IGxpbmVHZW9tZXRyeS5lbmRQb3NpdGlvbnM7XG5cdFx0XHRcdHRoaWNrbmVzcyA9IGxpbmVHZW9tZXRyeS50aGlja25lc3M7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzdGFydFBvc2l0aW9ucyA9IG5ldyBBcnJheTxudW1iZXI+KG51bVNlZ21lbnRzKjMpO1xuXHRcdFx0XHRlbmRQb3NpdGlvbnMgPSBuZXcgQXJyYXk8bnVtYmVyPihudW1TZWdtZW50cyozKTtcblx0XHRcdFx0dGhpY2tuZXNzID0gbmV3IEFycmF5PG51bWJlcj4obnVtU2VnbWVudHMpO1xuXHRcdFx0fVxuXG5cdFx0XHRmaWR4ID0gMDtcblxuXHRcdFx0dmlkeCA9IDA7XG5cblx0XHRcdGZvciAoeWkgPSAwOyB5aSA8PSB0aGlzLl9zZWdtZW50c0g7ICsreWkpIHtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSAtaHc7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IDA7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAyXSA9IHlpKnRoaXMuX2hlaWdodCAtIGhoO1xuXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IGh3O1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gMDtcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAyXSA9IHlpKnRoaXMuX2hlaWdodCAtIGhoO1xuXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcblxuXHRcdFx0XHR2aWR4ICs9IDM7XG5cdFx0XHR9XG5cblxuXHRcdFx0Zm9yICh4aSA9IDA7IHhpIDw9IHRoaXMuX3NlZ21lbnRzVzsgKyt4aSkge1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4XSA9IHhpKnRoaXMuX3dpZHRoIC0gaHc7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IDA7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAyXSA9IC1oaDtcblxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSB4aSp0aGlzLl93aWR0aCAtIGh3O1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gMDtcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAyXSA9IGhoO1xuXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcblxuXHRcdFx0XHR2aWR4ICs9IDM7XG5cdFx0XHR9XG5cblx0XHRcdC8vIGJ1aWxkIHJlYWwgZGF0YSBmcm9tIHJhdyBkYXRhXG5cdFx0XHRsaW5lR2VvbWV0cnkudXBkYXRlUG9zaXRpb25zKHN0YXJ0UG9zaXRpb25zLCBlbmRQb3NpdGlvbnMpO1xuXHRcdFx0bGluZUdlb21ldHJ5LnVwZGF0ZVRoaWNrbmVzcyh0aGlja25lc3MpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIF9wQnVpbGRVVnModGFyZ2V0OlN1Ykdlb21ldHJ5QmFzZSwgZ2VvbWV0cnlUeXBlOnN0cmluZylcblx0e1xuXHRcdHZhciB1dnM6QXJyYXk8bnVtYmVyPjtcblx0XHR2YXIgbnVtVmVydGljZXM6bnVtYmVyO1xuXG5cdFx0aWYgKGdlb21ldHJ5VHlwZSA9PSBcInRyaWFuZ2xlU3ViR2VvbWV0cnlcIikge1xuXG5cdFx0XHRudW1WZXJ0aWNlcyA9ICggdGhpcy5fc2VnbWVudHNIICsgMSApKiggdGhpcy5fc2VnbWVudHNXICsgMSApO1xuXG5cdFx0XHRpZiAodGhpcy5fZG91YmxlU2lkZWQpXG5cdFx0XHRcdG51bVZlcnRpY2VzICo9IDI7XG5cblx0XHRcdHZhciB0cmlhbmdsZUdlb21ldHJ5OlRyaWFuZ2xlU3ViR2VvbWV0cnkgPSA8VHJpYW5nbGVTdWJHZW9tZXRyeT4gdGFyZ2V0O1xuXG5cdFx0XHRpZiAodHJpYW5nbGVHZW9tZXRyeS51dnMgJiYgbnVtVmVydGljZXMgPT0gdHJpYW5nbGVHZW9tZXRyeS5udW1WZXJ0aWNlcykge1xuXHRcdFx0XHR1dnMgPSB0cmlhbmdsZUdlb21ldHJ5LnV2cztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHV2cyA9IG5ldyBBcnJheTxudW1iZXI+KG51bVZlcnRpY2VzKjIpO1xuXHRcdFx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KClcblx0XHRcdH1cblxuXHRcdFx0dmFyIGluZGV4Om51bWJlciA9IDA7XG5cblx0XHRcdGZvciAodmFyIHlpOm51bWJlciA9IDA7IHlpIDw9IHRoaXMuX3NlZ21lbnRzSDsgKyt5aSkge1xuXG5cdFx0XHRcdGZvciAodmFyIHhpOm51bWJlciA9IDA7IHhpIDw9IHRoaXMuX3NlZ21lbnRzVzsgKyt4aSkge1xuXHRcdFx0XHRcdHV2c1tpbmRleF0gPSAoeGkvdGhpcy5fc2VnbWVudHNXKSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTtcblx0XHRcdFx0XHR1dnNbaW5kZXggKyAxXSA9ICgxIC0geWkvdGhpcy5fc2VnbWVudHNIKSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcblx0XHRcdFx0XHRpbmRleCArPSAyO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX2RvdWJsZVNpZGVkKSB7XG5cdFx0XHRcdFx0XHR1dnNbaW5kZXhdID0gKHhpL3RoaXMuX3NlZ21lbnRzVykqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVU7XG5cdFx0XHRcdFx0XHR1dnNbaW5kZXgrMV0gPSAoMSAtIHlpL3RoaXMuX3NlZ21lbnRzSCkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVY7XG5cdFx0XHRcdFx0XHRpbmRleCArPSAyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZVVWcyh1dnMpO1xuXG5cblx0XHR9IGVsc2UgaWYgKGdlb21ldHJ5VHlwZSA9PSBcImxpbmVTdWJHZW9tZXRyeVwiKSB7XG5cdFx0XHQvL25vdGhpbmcgdG8gZG8gaGVyZVxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgPSBQcmltaXRpdmVQbGFuZVByZWZhYjsiXX0=