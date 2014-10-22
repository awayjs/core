var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitivePrefabBase = require("awayjs-core/lib/prefabs/PrimitivePrefabBase");

/**
* A Cube primitive prefab.
*/
var PrimitiveCubePrefab = (function (_super) {
    __extends(PrimitiveCubePrefab, _super);
    /**
    * Creates a new Cube object.
    * @param width The size of the cube along its X-axis.
    * @param height The size of the cube along its Y-axis.
    * @param depth The size of the cube along its Z-axis.
    * @param segmentsW The number of segments that make up the cube along the X-axis.
    * @param segmentsH The number of segments that make up the cube along the Y-axis.
    * @param segmentsD The number of segments that make up the cube along the Z-axis.
    * @param tile6 The type of uv mapping to use. When true, a texture will be subdivided in a 2x3 grid, each used for a single face. When false, the entire image is mapped on each face.
    */
    function PrimitiveCubePrefab(width, height, depth, segmentsW, segmentsH, segmentsD, tile6) {
        if (typeof width === "undefined") { width = 100; }
        if (typeof height === "undefined") { height = 100; }
        if (typeof depth === "undefined") { depth = 100; }
        if (typeof segmentsW === "undefined") { segmentsW = 1; }
        if (typeof segmentsH === "undefined") { segmentsH = 1; }
        if (typeof segmentsD === "undefined") { segmentsD = 1; }
        if (typeof tile6 === "undefined") { tile6 = true; }
        _super.call(this);

        this._width = width;
        this._height = height;
        this._depth = depth;
        this._segmentsW = segmentsW;
        this._segmentsH = segmentsH;
        this._segmentsD = segmentsD;
        this._tile6 = tile6;
    }
    Object.defineProperty(PrimitiveCubePrefab.prototype, "width", {
        /**
        * The size of the cube along its X-axis.
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


    Object.defineProperty(PrimitiveCubePrefab.prototype, "height", {
        /**
        * The size of the cube along its Y-axis.
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


    Object.defineProperty(PrimitiveCubePrefab.prototype, "depth", {
        /**
        * The size of the cube along its Z-axis.
        */
        get: function () {
            return this._depth;
        },
        set: function (value) {
            this._depth = value;

            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitiveCubePrefab.prototype, "tile6", {
        /**
        * The type of uv mapping to use. When false, the entire image is mapped on each face.
        * When true, a texture will be subdivided in a 3x2 grid, each used for a single face.
        * Reading the tiles from left to right, top to bottom they represent the faces of the
        * cube in the following order: bottom, top, back, left, front, right. This creates
        * several shared edges (between the top, front, left and right faces) which simplifies
        * texture painting.
        */
        get: function () {
            return this._tile6;
        },
        set: function (value) {
            this._tile6 = value;

            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitiveCubePrefab.prototype, "segmentsW", {
        /**
        * The number of segments that make up the cube along the X-axis. Defaults to 1.
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


    Object.defineProperty(PrimitiveCubePrefab.prototype, "segmentsH", {
        /**
        * The number of segments that make up the cube along the Y-axis. Defaults to 1.
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


    Object.defineProperty(PrimitiveCubePrefab.prototype, "segmentsD", {
        /**
        * The number of segments that make up the cube along the Z-axis. Defaults to 1.
        */
        get: function () {
            return this._segmentsD;
        },
        set: function (value) {
            this._segmentsD = value;

            this._pInvalidateGeometry();
            this._pInvalidateUVs();
        },
        enumerable: true,
        configurable: true
    });


    /**
    * @inheritDoc
    */
    PrimitiveCubePrefab.prototype._pBuildGeometry = function (target, geometryType) {
        var indices;
        var positions;
        var normals;
        var tangents;

        var tl, tr, bl, br;
        var i, j, inc = 0;

        var vidx, fidx;
        var hw, hh, hd;
        var dw, dh, dd;

        var outer_pos;
        var numIndices;
        var numVertices;

        // half cube dimensions
        hw = this._width / 2;
        hh = this._height / 2;
        hd = this._depth / 2;

        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;

            numVertices = ((this._segmentsW + 1) * (this._segmentsH + 1) + (this._segmentsW + 1) * (this._segmentsD + 1) + (this._segmentsH + 1) * (this._segmentsD + 1)) * 2;

            numIndices = ((this._segmentsW * this._segmentsH + this._segmentsW * this._segmentsD + this._segmentsH * this._segmentsD) * 12);

            if (numVertices == triangleGeometry.numVertices && triangleGeometry.indices != null) {
                indices = triangleGeometry.indices;
                positions = triangleGeometry.positions;
                normals = triangleGeometry.vertexNormals;
                tangents = triangleGeometry.vertexTangents;
            } else {
                indices = new Array(numIndices);
                positions = new Array(numVertices * 3);
                normals = new Array(numVertices * 3);
                tangents = new Array(numVertices * 3);

                this._pInvalidateUVs();
            }

            vidx = 0;
            fidx = 0;

            // Segment dimensions
            dw = this._width / this._segmentsW;
            dh = this._height / this._segmentsH;
            dd = this._depth / this._segmentsD;

            for (i = 0; i <= this._segmentsW; i++) {
                outer_pos = -hw + i * dw;

                for (j = 0; j <= this._segmentsH; j++) {
                    // front
                    positions[vidx] = outer_pos;
                    positions[vidx + 1] = -hh + j * dh;
                    positions[vidx + 2] = -hd;
                    normals[vidx] = 0;
                    normals[vidx + 1] = 0;
                    normals[vidx + 2] = -1;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;

                    // back
                    positions[vidx] = outer_pos;
                    positions[vidx + 1] = -hh + j * dh;
                    positions[vidx + 2] = hd;
                    normals[vidx] = 0;
                    normals[vidx + 1] = 0;
                    normals[vidx + 2] = 1;
                    tangents[vidx] = -1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;

                    if (i && j) {
                        tl = 2 * ((i - 1) * (this._segmentsH + 1) + (j - 1));
                        tr = 2 * (i * (this._segmentsH + 1) + (j - 1));
                        bl = tl + 2;
                        br = tr + 2;

                        indices[fidx++] = tl;
                        indices[fidx++] = bl;
                        indices[fidx++] = br;
                        indices[fidx++] = tl;
                        indices[fidx++] = br;
                        indices[fidx++] = tr;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = br + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tl + 1;
                    }
                }
            }

            inc += 2 * (this._segmentsW + 1) * (this._segmentsH + 1);

            for (i = 0; i <= this._segmentsW; i++) {
                outer_pos = -hw + i * dw;

                for (j = 0; j <= this._segmentsD; j++) {
                    // top
                    positions[vidx] = outer_pos;
                    positions[vidx + 1] = hh;
                    positions[vidx + 2] = -hd + j * dd;
                    normals[vidx] = 0;
                    normals[vidx + 1] = 1;
                    normals[vidx + 2] = 0;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;

                    // bottom
                    positions[vidx] = outer_pos;
                    positions[vidx + 1] = -hh;
                    positions[vidx + 2] = -hd + j * dd;
                    normals[vidx] = 0;
                    normals[vidx + 1] = -1;
                    normals[vidx + 2] = 0;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;

                    if (i && j) {
                        tl = inc + 2 * ((i - 1) * (this._segmentsD + 1) + (j - 1));
                        tr = inc + 2 * (i * (this._segmentsD + 1) + (j - 1));
                        bl = tl + 2;
                        br = tr + 2;

                        indices[fidx++] = tl;
                        indices[fidx++] = bl;
                        indices[fidx++] = br;
                        indices[fidx++] = tl;
                        indices[fidx++] = br;
                        indices[fidx++] = tr;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = br + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tl + 1;
                    }
                }
            }

            inc += 2 * (this._segmentsW + 1) * (this._segmentsD + 1);

            for (i = 0; i <= this._segmentsD; i++) {
                outer_pos = hd - i * dd;

                for (j = 0; j <= this._segmentsH; j++) {
                    // left
                    positions[vidx] = -hw;
                    positions[vidx + 1] = -hh + j * dh;
                    positions[vidx + 2] = outer_pos;
                    normals[vidx] = -1;
                    normals[vidx + 1] = 0;
                    normals[vidx + 2] = 0;
                    tangents[vidx] = 0;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = -1;
                    vidx += 3;

                    // right
                    positions[vidx] = hw;
                    positions[vidx + 1] = -hh + j * dh;
                    positions[vidx + 2] = outer_pos;
                    normals[vidx] = 1;
                    normals[vidx + 1] = 0;
                    normals[vidx + 2] = 0;
                    tangents[vidx] = 0;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 1;
                    vidx += 3;

                    if (i && j) {
                        tl = inc + 2 * ((i - 1) * (this._segmentsH + 1) + (j - 1));
                        tr = inc + 2 * (i * (this._segmentsH + 1) + (j - 1));
                        bl = tl + 2;
                        br = tr + 2;

                        indices[fidx++] = tl;
                        indices[fidx++] = bl;
                        indices[fidx++] = br;
                        indices[fidx++] = tl;
                        indices[fidx++] = br;
                        indices[fidx++] = tr;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = br + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tr + 1;
                        indices[fidx++] = bl + 1;
                        indices[fidx++] = tl + 1;
                    }
                }
            }

            triangleGeometry.updateIndices(indices);

            triangleGeometry.updatePositions(positions);
            triangleGeometry.updateVertexNormals(normals);
            triangleGeometry.updateVertexTangents(tangents);
        } else if (geometryType == "lineSubGeometry") {
            var lineGeometry = target;

            var numSegments = this._segmentsH * 4 + this._segmentsW * 4 + this._segmentsD * 4;
            var startPositions;
            var endPositions;
            var thickness;

            if (lineGeometry.indices != null && numSegments == lineGeometry.numSegments) {
                startPositions = lineGeometry.startPositions;
                endPositions = lineGeometry.endPositions;
                thickness = lineGeometry.thickness;
            } else {
                startPositions = new Array(numSegments * 3);
                endPositions = new Array(numSegments * 3);
                thickness = new Array(numSegments);
            }

            vidx = 0;

            fidx = 0;

            for (i = 0; i < this._segmentsH; ++i) {
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = i * this._height / this._segmentsH - hh;
                startPositions[vidx + 2] = -hd;

                endPositions[vidx] = hw;
                endPositions[vidx + 1] = i * this._height / this._segmentsH - hh;
                endPositions[vidx + 2] = -hd;

                thickness[fidx++] = 1;

                vidx += 3;

                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = hh - i * this._height / this._segmentsH;
                startPositions[vidx + 2] = hd;

                endPositions[vidx] = hw;
                endPositions[vidx + 1] = hh - i * this._height / this._segmentsH;
                endPositions[vidx + 2] = hd;

                thickness[fidx++] = 1;

                vidx += 3;
            }

            for (i = 0; i < this._segmentsW; ++i) {
                startPositions[vidx] = i * this._width / this._segmentsW - hw;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = -hd;

                endPositions[vidx] = i * this._width / this._segmentsW - hw;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = -hd;

                thickness[fidx++] = 1;

                vidx += 3;

                startPositions[vidx] = hw - i * this._width / this._segmentsW;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = hd;

                endPositions[vidx] = hw - i * this._width / this._segmentsW;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = hd;

                thickness[fidx++] = 1;

                vidx += 3;
            }

            for (i = 0; i < this._segmentsH; ++i) {
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = i * this._height / this._segmentsH - hh;
                startPositions[vidx + 2] = -hd;

                endPositions[vidx] = -hw;
                endPositions[vidx + 1] = i * this._height / this._segmentsH - hh;
                endPositions[vidx + 2] = hd;

                thickness[fidx++] = 1;

                vidx += 3;

                startPositions[vidx] = hw;
                startPositions[vidx + 1] = hh - i * this._height / this._segmentsH;
                startPositions[vidx + 2] = -hd;

                endPositions[vidx] = hw;
                endPositions[vidx + 1] = hh - i * this._height / this._segmentsH;
                endPositions[vidx + 2] = hd;

                thickness[fidx++] = 1;

                vidx += 3;
            }

            for (i = 0; i < this._segmentsD; ++i) {
                startPositions[vidx] = hw;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = i * this._depth / this._segmentsD - hd;

                endPositions[vidx] = hw;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = i * this._depth / this._segmentsD - hd;

                thickness[fidx++] = 1;

                vidx += 3;

                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = hd - i * this._depth / this._segmentsD;

                endPositions[vidx] = -hw;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = hd - i * this._depth / this._segmentsD;

                thickness[fidx++] = 1;

                vidx += 3;
            }

            for (i = 0; i < this._segmentsD; ++i) {
                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = hd - i * this._depth / this._segmentsD;

                endPositions[vidx] = hw;
                endPositions[vidx + 1] = -hh;
                endPositions[vidx + 2] = hd - i * this._depth / this._segmentsD;

                thickness[fidx++] = 1;

                vidx += 3;

                startPositions[vidx] = -hw;
                startPositions[vidx + 1] = hh;
                startPositions[vidx + 2] = i * this._depth / this._segmentsD - hd;

                endPositions[vidx] = hw;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = i * this._depth / this._segmentsD - hd;

                thickness[fidx++] = 1;

                vidx += 3;
            }

            for (i = 0; i < this._segmentsW; ++i) {
                startPositions[vidx] = hw - i * this._width / this._segmentsW;
                startPositions[vidx + 1] = -hh;
                startPositions[vidx + 2] = -hd;

                endPositions[vidx] = hw - i * this._width / this._segmentsW;
                endPositions[vidx + 1] = -hh;
                endPositions[vidx + 2] = hd;

                thickness[fidx++] = 1;

                vidx += 3;

                startPositions[vidx] = i * this._width / this._segmentsW - hw;
                startPositions[vidx + 1] = hh;
                startPositions[vidx + 2] = -hd;

                endPositions[vidx] = i * this._width / this._segmentsW - hw;
                endPositions[vidx + 1] = hh;
                endPositions[vidx + 2] = hd;

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
    PrimitiveCubePrefab.prototype._pBuildUVs = function (target, geometryType) {
        var i, j, index;
        var uvs;

        var u_tile_dim, v_tile_dim;
        var u_tile_step, v_tile_step;
        var tl0u, tl0v;
        var tl1u, tl1v;
        var du, dv;
        var numVertices;

        if (geometryType == "triangleSubGeometry") {
            numVertices = ((this._segmentsW + 1) * (this._segmentsH + 1) + (this._segmentsW + 1) * (this._segmentsD + 1) + (this._segmentsH + 1) * (this._segmentsD + 1)) * 2;

            var triangleGeometry = target;

            if (numVertices == triangleGeometry.numVertices && triangleGeometry.uvs != null) {
                uvs = triangleGeometry.uvs;
            } else {
                uvs = new Array(numVertices * 2);
            }

            if (this._tile6) {
                u_tile_dim = u_tile_step = 1 / 3;
                v_tile_dim = v_tile_step = 1 / 2;
            } else {
                u_tile_dim = v_tile_dim = 1;
                u_tile_step = v_tile_step = 0;
            }

            // Create planes two and two, the same way that they were
            // constructed in the buildGeometry() function. First calculate
            // the top-left UV coordinate for both planes, and then loop
            // over the points, calculating the UVs from these numbers.
            // When tile6 is true, the layout is as follows:
            //       .-----.-----.-----. (1,1)
            //       | Bot |  T  | Bak |
            //       |-----+-----+-----|
            //       |  L  |  F  |  R  |
            // (0,0)'-----'-----'-----'
            index = 0;

            // FRONT / BACK
            tl0u = 1 * u_tile_step;
            tl0v = 1 * v_tile_step;
            tl1u = 2 * u_tile_step;
            tl1v = 0 * v_tile_step;
            du = u_tile_dim / this._segmentsW;
            dv = v_tile_dim / this._segmentsH;
            for (i = 0; i <= this._segmentsW; i++) {
                for (j = 0; j <= this._segmentsH; j++) {
                    uvs[index++] = (tl0u + i * du) * triangleGeometry.scaleU;
                    uvs[index++] = (tl0v + (v_tile_dim - j * dv)) * triangleGeometry.scaleV;

                    uvs[index++] = (tl1u + (u_tile_dim - i * du)) * triangleGeometry.scaleU;
                    uvs[index++] = (tl1v + (v_tile_dim - j * dv)) * triangleGeometry.scaleV;
                }
            }

            // TOP / BOTTOM
            tl0u = 1 * u_tile_step;
            tl0v = 0 * v_tile_step;
            tl1u = 0 * u_tile_step;
            tl1v = 0 * v_tile_step;
            du = u_tile_dim / this._segmentsW;
            dv = v_tile_dim / this._segmentsD;
            for (i = 0; i <= this._segmentsW; i++) {
                for (j = 0; j <= this._segmentsD; j++) {
                    uvs[index++] = (tl0u + i * du) * triangleGeometry.scaleU;
                    uvs[index++] = (tl0v + (v_tile_dim - j * dv)) * triangleGeometry.scaleV;

                    uvs[index++] = (tl1u + i * du) * triangleGeometry.scaleU;
                    uvs[index++] = (tl1v + j * dv) * triangleGeometry.scaleV;
                }
            }

            // LEFT / RIGHT
            tl0u = 0 * u_tile_step;
            tl0v = 1 * v_tile_step;
            tl1u = 2 * u_tile_step;
            tl1v = 1 * v_tile_step;
            du = u_tile_dim / this._segmentsD;
            dv = v_tile_dim / this._segmentsH;
            for (i = 0; i <= this._segmentsD; i++) {
                for (j = 0; j <= this._segmentsH; j++) {
                    uvs[index++] = (tl0u + i * du) * triangleGeometry.scaleU;
                    uvs[index++] = (tl0v + (v_tile_dim - j * dv)) * triangleGeometry.scaleV;

                    uvs[index++] = (tl1u + (u_tile_dim - i * du)) * triangleGeometry.scaleU;
                    uvs[index++] = (tl1v + (v_tile_dim - j * dv)) * triangleGeometry.scaleV;
                }
            }

            triangleGeometry.updateUVs(uvs);
        } else if (geometryType == "lineSubGeometry") {
            //nothing to do here
        }
    };
    return PrimitiveCubePrefab;
})(PrimitivePrefabBase);

module.exports = PrimitiveCubePrefab;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZWZhYnMvUHJpbWl0aXZlQ3ViZVByZWZhYi50cyJdLCJuYW1lcyI6WyJQcmltaXRpdmVDdWJlUHJlZmFiIiwiUHJpbWl0aXZlQ3ViZVByZWZhYi5jb25zdHJ1Y3RvciIsIlByaW1pdGl2ZUN1YmVQcmVmYWIuX3BCdWlsZEdlb21ldHJ5IiwiUHJpbWl0aXZlQ3ViZVByZWZhYi5fcEJ1aWxkVVZzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnRkFJcUY7O0FBRXJGOztFQUVHO0FBQ0g7SUFBa0NBLHNDQUFtQkE7SUFxQnBEQTs7Ozs7Ozs7O01BREdBO0lBQ0hBLDZCQUFZQSxLQUFrQkEsRUFBRUEsTUFBbUJBLEVBQUVBLEtBQWtCQSxFQUFFQSxTQUFvQkEsRUFBRUEsU0FBb0JBLEVBQUVBLFNBQW9CQSxFQUFFQSxLQUFvQkE7UUFBbkpDLG9DQUFBQSxLQUFLQSxHQUFVQSxHQUFHQTtBQUFBQSxRQUFFQSxxQ0FBQUEsTUFBTUEsR0FBVUEsR0FBR0E7QUFBQUEsUUFBRUEsb0NBQUFBLEtBQUtBLEdBQVVBLEdBQUdBO0FBQUFBLFFBQUVBLHdDQUFBQSxTQUFTQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFFQSx3Q0FBQUEsU0FBU0EsR0FBVUEsQ0FBQ0E7QUFBQUEsUUFBRUEsd0NBQUFBLFNBQVNBLEdBQVVBLENBQUNBO0FBQUFBLFFBQUVBLG9DQUFBQSxLQUFLQSxHQUFXQSxJQUFJQTtBQUFBQSxRQUU5SkEsV0FBTUEsS0FBQUEsQ0FBQ0E7O1FBRVBBLElBQUlBLENBQUNBLE1BQU1BLEdBQUdBLEtBQUtBO1FBQ25CQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxNQUFNQTtRQUNyQkEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsS0FBS0E7UUFDbkJBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLFNBQVNBO1FBQzNCQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxTQUFTQTtRQUMzQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsU0FBU0E7UUFDM0JBLElBQUlBLENB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QTs7Z0JBRXRCQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFFQTtvQkFDdENBLFFBQVFBO29CQUNSQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxTQUFTQTtvQkFDM0JBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBO29CQUNoQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUE7b0JBQ3pCQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQTtvQkFDakJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO29CQUNyQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3RCQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQTtvQkFDbEJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO29CQUN0QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7b0JBQ3RCQSxJQUFJQSxJQUFJQSxDQUFDQTs7b0JBRVRBLE9BQU9BO29CQUNQQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxTQUFTQTtvQkFDM0JBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBO29CQUNoQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUE7b0JBQ3hCQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQTtvQkFDakJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO29CQUNyQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7b0JBQ3JCQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDbkJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO29CQUN0QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7b0JBQ3RCQSxJQUFJQSxJQUFJQSxDQUFDQTs7b0JBRVRBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUVBO3dCQUNYQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDaERBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO3dCQUMxQ0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7d0JBQ1hBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBOzt3QkFFWEEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUE7d0JBQ3BCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQTt3QkFDcEJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBO3dCQUNwQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUE7d0JBQ3BCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQTt3QkFDcEJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBO3dCQUNwQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7d0JBQ3hCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTt3QkFDeEJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO3dCQUN4QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7d0JBQ3hCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTt3QkFDeEJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO3FCQUN4QkE7aUJBQ0RBO2FBQ0RBOztZQUVEQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQTs7WUFFcERBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUVBO2dCQUN0Q0EsU0FBU0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUE7O2dCQUV0QkEsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBRUE7b0JBQ3RDQSxNQUFNQTtvQkFDTkEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsU0FBU0E7b0JBQzNCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQTtvQkFDeEJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBO29CQUNoQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7b0JBQ2pCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtvQkFDckJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO29CQUNyQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7b0JBQ2xCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtvQkFDdEJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO29CQUN0QkEsSUFBSUEsSUFBSUEsQ0FBQ0E7O29CQUVUQSxTQUFTQTtvQkFDVEEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsU0FBU0E7b0JBQzNCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQTtvQkFDekJBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBO29CQUNoQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7b0JBQ2pCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDdEJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO29CQUNyQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7b0JBQ2xCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtvQkFDdEJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO29CQUN0QkEsSUFBSUEsSUFBSUEsQ0FBQ0E7O29CQUVUQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFFQTt3QkFDWEEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ3REQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDaERBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO3dCQUNYQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTs7d0JBRVhBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBO3dCQUNwQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUE7d0JBQ3BCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQTt3QkFDcEJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBO3dCQUNwQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUE7d0JBQ3BCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQTt3QkFDcEJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO3dCQUN4QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7d0JBQ3hCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTt3QkFDeEJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO3dCQUN4QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7d0JBQ3hCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTtxQkFDeEJBO2lCQUNEQTthQUNEQTs7WUFFREEsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7O1lBRXBEQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFFQTtnQkFDdENBLFNBQVNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBOztnQkFFckJBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUVBO29CQUN0Q0EsT0FBT0E7b0JBQ1BBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBO29CQUNyQkEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUE7b0JBQzlCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxTQUFTQTtvQkFDN0JBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNsQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7b0JBQ25CQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtvQkFDbkJBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBO29CQUNsQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7b0JBQ3BCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtvQkFDckJBLElBQUlBLElBQUlBLENBQUNBOztvQkFFVEEsUUFBUUE7b0JBQ1JBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBO29CQUNwQkEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUE7b0JBQzlCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxTQUFTQTtvQkFDN0JBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBO29CQUNqQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7b0JBQ25CQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtvQkFDbkJBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBO29CQUNsQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7b0JBQ3BCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtvQkFDcEJBLElBQUlBLElBQUlBLENBQUNBOztvQkFFVEEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBRUE7d0JBQ1hBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO3dCQUN0REEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBQ2hEQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTt3QkFDWEEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7O3dCQUVYQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQTt3QkFDcEJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBO3dCQUNwQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUE7d0JBQ3BCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQTt3QkFDcEJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBO3dCQUNwQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUE7d0JBQ3BCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTt3QkFDeEJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO3dCQUN4QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7d0JBQ3hCQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQTt3QkFDeEJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO3dCQUN4QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0E7cUJBQ3hCQTtpQkFDREE7YUFDREE7O1lBRURBLGdCQUFnQkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7O1lBRXZDQSxnQkFBZ0JBLENBQUNBLGVBQWVBLENBQUNBLFNBQVNBLENBQUNBO1lBQzNDQSxnQkFBZ0JBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFDN0NBLGdCQUFnQkEsQ0FBQ0Esb0JBQW9CQSxDQUFDQSxRQUFRQSxDQUFDQTtTQUUvQ0EsTUFBTUEsSUFBSUEsWUFBWUEsSUFBSUEsaUJBQWlCQSxDQUFFQTtZQUM3Q0EsSUFBSUEsWUFBWUEsR0FBcUNBLE1BQU1BOztZQUUzREEsSUFBSUEsV0FBV0EsR0FBVUEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBQ0EsQ0FBQ0EsR0FBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBQ0EsQ0FBQ0E7WUFDbkZBLElBQUlBLGNBQWNBO1lBQ2xCQSxJQUFJQSxZQUFZQTtZQUNoQkEsSUFBSUEsU0FBU0E7O1lBRWJBLElBQUlBLFlBQVlBLENBQUNBLE9BQU9BLElBQUlBLElBQUlBLElBQUlBLFdBQVdBLElBQUlBLFlBQVlBLENBQUNBLFdBQVdBLENBQUVBO2dCQUM1RUEsY0FBY0EsR0FBR0EsWUFBWUEsQ0FBQ0EsY0FBY0E7Z0JBQzVDQSxZQUFZQSxHQUFHQSxZQUFZQSxDQUFDQSxZQUFZQTtnQkFDeENBLFNBQVNBLEdBQUdBLFlBQVlBLENBQUNBLFNBQVNBO2FBQ2xDQSxLQUFNQTtnQkFDTkEsY0FBY0EsR0FBR0EsSUFBSUEsS0FBS0EsQ0FBU0EsV0FBV0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2pEQSxZQUFZQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFTQSxXQUFXQSxHQUFDQSxDQUFDQSxDQUFDQTtnQkFDL0NBLFNBQVNBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLFdBQVdBLENBQUNBO2FBQzFDQTs7WUFFREEsSUFBSUEsR0FBR0EsQ0FBQ0E7O1lBRVJBLElBQUlBLEdBQUdBLENBQUNBOztZQUdSQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFFQTtnQkFDckNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBO2dCQUMxQkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUE7Z0JBQzlEQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQTs7Z0JBRTlCQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQTtnQkFDdkJBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEVBQUVBO2dCQUM1REEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUE7O2dCQUU1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7O2dCQUVyQkEsSUFBSUEsSUFBSUEsQ0FBQ0E7O2dCQUVUQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQTtnQkFDMUJBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBO2dCQUM5REEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUE7O2dCQUU3QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUE7Z0JBQ3ZCQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQTtnQkFDNURBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBOztnQkFFM0JBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBOztnQkFFckJBLElBQUlBLElBQUlBLENBQUNBO2FBQ1RBOztZQUVEQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFFQTtnQkFDckNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE1BQU1BLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEVBQUVBO2dCQUN6REEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUE7Z0JBQzlCQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQTs7Z0JBRTlCQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQTtnQkFDdkRBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBO2dCQUMzQkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUE7O2dCQUU1QkEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7O2dCQUVyQkEsSUFBSUEsSUFBSUEsQ0FBQ0E7O2dCQUVUQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQTtnQkFDekRBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBO2dCQUM5QkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUE7O2dCQUU3QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUE7Z0JBQ3ZEQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQTtnQkFDM0JBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBOztnQkFFM0JBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBOztnQkFFckJBLElBQUlBLElBQUlBLENBQUNBO2FBQ1RBOztZQUdEQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFFQTtnQkFDckNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBO2dCQUMxQkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUE7Z0JBQzlEQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQTs7Z0JBRTlCQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQTtnQkFDeEJBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEVBQUVBO2dCQUM1REEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUE7O2dCQUUzQkEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7O2dCQUVyQkEsSUFBSUEsSUFBSUEsQ0FBQ0E7O2dCQUVUQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQTtnQkFDekJBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBO2dCQUM5REEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUE7O2dCQUU5QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUE7Z0JBQ3ZCQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQTtnQkFDNURBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBOztnQkFFM0JBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBOztnQkFFckJBLElBQUlBLElBQUlBLENBQUNBO2FBQ1RBOztZQUVEQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFFQTtnQkFDckNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBO2dCQUN6QkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUE7Z0JBQzlCQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQTs7Z0JBRTdEQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQTtnQkFDdkJBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBO2dCQUMzQkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUE7O2dCQUUzREEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7O2dCQUVyQkEsSUFBSUEsSUFBSUEsQ0FBQ0E7O2dCQUVUQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQTtnQkFDMUJBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBO2dCQUM5QkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUE7O2dCQUU3REEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUE7Z0JBQ3hCQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQTtnQkFDM0JBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE1BQU1BLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBOztnQkFFM0RBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBOztnQkFFckJBLElBQUlBLElBQUlBLENBQUNBO2FBQ1RBOztZQUlEQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFFQTtnQkFDckNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBO2dCQUMxQkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUE7Z0JBQzlCQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQTs7Z0JBRTdEQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQTtnQkFDdkJBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBO2dCQUM1QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUE7O2dCQUUzREEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7O2dCQUVyQkEsSUFBSUEsSUFBSUEsQ0FBQ0E7O2dCQUVUQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQTtnQkFDMUJBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBO2dCQUM3QkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUE7O2dCQUU3REEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsRUFBRUE7Z0JBQ3ZCQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQTtnQkFDM0JBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE1BQU1BLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLEVBQUVBOztnQkFFM0RBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBOztnQkFFckJBLElBQUlBLElBQUlBLENBQUNBO2FBQ1RBOztZQUVEQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFFQTtnQkFDckNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUNBLElBQUlBLENBQUNBLE1BQU1BLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBO2dCQUN6REEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUE7Z0JBQzlCQSxjQUFjQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQTs7Z0JBRTlCQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQTtnQkFDdkRBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBO2dCQUM1QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUE7O2dCQUUzQkEsU0FBU0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7O2dCQUVyQkEsSUFBSUEsSUFBSUEsQ0FBQ0E7O2dCQUVUQSxjQUFjQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxHQUFHQSxFQUFFQTtnQkFDekRBLGNBQWNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBO2dCQUM3QkEsY0FBY0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUE7O2dCQUU5QkEsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsRUFBRUE7Z0JBQ3ZEQSxZQUFZQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQTtnQkFDM0JBLFlBQVlBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBOztnQkFFM0JBLFNBQVNBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBOztnQkFFckJBLElBQUlBLElBQUlBLENBQUNBO2FBQ1RBOztZQUVEQSxnQ0FBZ0NBO1lBQ2hDQSxZQUFZQSxDQUFDQSxlQUFlQSxDQUFDQSxjQUFjQSxFQUFFQSxZQUFZQSxDQUFDQTtZQUMxREEsWUFBWUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7U0FDdkNBO0lBQ0ZBLENBQUNBOztJQUtERjs7TUFER0E7K0NBQ0hBLFVBQWtCQSxNQUFzQkEsRUFBRUEsWUFBbUJBO1FBRTVERyxJQUFJQSxDQUFDQSxFQUFTQSxDQUFDQSxFQUFTQSxLQUFLQTtRQUM3QkEsSUFBSUEsR0FBR0E7O1FBRVBBLElBQUlBLFVBQVVBLEVBQVNBLFVBQVVBO1FBQ2pDQSxJQUFJQSxXQUFXQSxFQUFTQSxXQUFXQTtRQUNuQ0EsSUFBSUEsSUFBSUEsRUFBU0EsSUFBSUE7UUFDckJBLElBQUlBLElBQUlBLEVBQVNBLElBQUlBO1FBQ3JCQSxJQUFJQSxFQUFFQSxFQUFTQSxFQUFFQTtRQUNqQkEsSUFBSUEsV0FBV0E7O1FBRWZBLElBQUlBLFlBQVlBLElBQUlBLHFCQUFxQkEsQ0FBRUE7WUFFMUNBLFdBQVdBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBOztZQUV6SkEsSUFBSUEsZ0JBQWdCQSxHQUE2Q0EsTUFBTUE7O1lBRXZFQSxJQUFJQSxXQUFXQSxJQUFJQSxnQkFBZ0JBLENBQUNBLFdBQVdBLElBQUlBLGdCQUFnQkEsQ0FBQ0EsR0FBR0EsSUFBSUEsSUFBSUEsQ0FBRUE7Z0JBQ2hGQSxHQUFHQSxHQUFHQSxnQkFBZ0JBLENBQUNBLEdBQUdBO2FBQzFCQSxLQUFNQTtnQkFDTkEsR0FBR0EsR0FBR0EsSUFBSUEsS0FBS0EsQ0FBU0EsV0FBV0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7YUFDdENBOztZQUVEQSxJQUFJQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFFQTtnQkFDaEJBLFVBQVVBLEdBQUdBLFdBQVdBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBO2dCQUM5QkEsVUFBVUEsR0FBR0EsV0FBV0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0E7YUFDOUJBLEtBQU1BO2dCQUNOQSxVQUFVQSxHQUFHQSxVQUFVQSxHQUFHQSxDQUFDQTtnQkFDM0JBLFdBQVdBLEdBQUdBLFdBQVdBLEdBQUdBLENBQUNBO2FBQzdCQTs7WUFFREEseURBQXlEQTtZQUN6REEsK0RBQStEQTtZQUMvREEsNERBQTREQTtZQUM1REEsMkRBQTJEQTtZQUUzREEsZ0RBQWdEQTtZQUNoREEsa0NBQWtDQTtZQUNsQ0EsNEJBQTRCQTtZQUM1QkEsNEJBQTRCQTtZQUM1QkEsNEJBQTRCQTtZQUM1QkEsMkJBQTJCQTtZQUUzQkEsS0FBS0EsR0FBR0EsQ0FBQ0E7O1lBRVRBLGVBQWVBO1lBQ2ZBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLFdBQVdBO1lBQ3BCQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxXQUFXQTtZQUNwQkEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsV0FBV0E7WUFDcEJBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLFdBQVdBO1lBQ3BCQSxFQUFFQSxHQUFHQSxVQUFVQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQTtZQUMvQkEsRUFBRUEsR0FBR0EsVUFBVUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUE7WUFDL0JBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUVBO2dCQUN0Q0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBRUE7b0JBQ3RDQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFFQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BO29CQUN0REEsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsSUFBSUEsR0FBR0EsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQTs7b0JBRXBFQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxJQUFJQSxHQUFHQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BO29CQUNwRUEsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsSUFBSUEsR0FBR0EsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQTtpQkFDcEVBO2FBQ0RBOztZQUVEQSxlQUFlQTtZQUNmQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxXQUFXQTtZQUNwQkEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsV0FBV0E7WUFDcEJBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLFdBQVdBO1lBQ3BCQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxXQUFXQTtZQUNwQkEsRUFBRUEsR0FBR0EsVUFBVUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUE7WUFDL0JBLEVBQUVBLEdBQUdBLFVBQVVBLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBO1lBQy9CQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFFQTtnQkFDdENBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBLEVBQUVBLENBQUVBO29CQUN0Q0EsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQTtvQkFDckRBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLElBQUlBLEdBQUdBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLENBQUNBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUE7O29CQUVwRUEsR0FBR0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBRUEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsZ0JBQWdCQSxDQUFDQSxNQUFNQTtvQkFDckRBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUE7aUJBQ3JEQTthQUNEQTs7WUFFREEsZUFBZUE7WUFDZkEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsV0FBV0E7WUFDcEJBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLFdBQVdBO1lBQ3BCQSxJQUFJQSxHQUFHQSxDQUFDQSxHQUFDQSxXQUFXQTtZQUNwQkEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBQ0EsV0FBV0E7WUFDcEJBLEVBQUVBLEdBQUdBLFVBQVVBLEdBQUNBLElBQUlBLENBQUNBLFVBQVVBO1lBQy9CQSxFQUFFQSxHQUFHQSxVQUFVQSxHQUFDQSxJQUFJQSxDQUFDQSxVQUFVQTtZQUMvQkEsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBRUE7Z0JBQ3RDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFFQTtvQkFDdENBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLElBQUlBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUE7b0JBQ3JEQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxJQUFJQSxHQUFHQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BOztvQkFFcEVBLEdBQUdBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLEdBQUdBLENBQUVBLElBQUlBLEdBQUdBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLEdBQUNBLEVBQUVBLENBQUNBLENBQUNBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUE7b0JBQ3BFQSxHQUFHQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxJQUFJQSxHQUFHQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFDQSxnQkFBZ0JBLENBQUNBLE1BQU1BO2lCQUNwRUE7YUFDREE7O1lBRURBLGdCQUFnQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7U0FFL0JBLE1BQU1BLElBQUlBLFlBQVlBLElBQUlBLGlCQUFpQkEsQ0FBRUE7WUFDN0NBLG9CQUFvQkE7U0FDcEJBO0lBQ0ZBLENBQUNBO0lBQ0ZILDJCQUFDQTtBQUFEQSxDQUFDQSxFQWpwQmlDLG1CQUFtQixFQWlwQnBEOztBQUVELG9DQUE2QixDQUFBIiwiZmlsZSI6InByZWZhYnMvUHJpbWl0aXZlQ3ViZVByZWZhYi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5lU3ViR2VvbWV0cnlcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL0xpbmVTdWJHZW9tZXRyeVwiKTtcbmltcG9ydCBTdWJHZW9tZXRyeUJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL1N1Ykdlb21ldHJ5QmFzZVwiKTtcbmltcG9ydCBUcmlhbmdsZVN1Ykdlb21ldHJ5XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2Jhc2UvVHJpYW5nbGVTdWJHZW9tZXRyeVwiKTtcbmltcG9ydCBJQXNzZXRcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvbGlicmFyeS9JQXNzZXRcIik7XG5pbXBvcnQgUHJpbWl0aXZlUHJlZmFiQmFzZVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvcHJlZmFicy9QcmltaXRpdmVQcmVmYWJCYXNlXCIpO1xuXG4vKipcbiAqIEEgQ3ViZSBwcmltaXRpdmUgcHJlZmFiLlxuICovXG5jbGFzcyBQcmltaXRpdmVDdWJlUHJlZmFiIGV4dGVuZHMgUHJpbWl0aXZlUHJlZmFiQmFzZSBpbXBsZW1lbnRzIElBc3NldFxue1xuXHRwcml2YXRlIF93aWR0aDpudW1iZXI7XG5cdHByaXZhdGUgX2hlaWdodDpudW1iZXI7XG5cdHByaXZhdGUgX2RlcHRoOm51bWJlcjtcblx0cHJpdmF0ZSBfdGlsZTY6Ym9vbGVhbjtcblxuXHRwcml2YXRlIF9zZWdtZW50c1c6bnVtYmVyO1xuXHRwcml2YXRlIF9zZWdtZW50c0g6bnVtYmVyO1xuXHRwcml2YXRlIF9zZWdtZW50c0Q6bnVtYmVyO1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IEN1YmUgb2JqZWN0LlxuXHQgKiBAcGFyYW0gd2lkdGggVGhlIHNpemUgb2YgdGhlIGN1YmUgYWxvbmcgaXRzIFgtYXhpcy5cblx0ICogQHBhcmFtIGhlaWdodCBUaGUgc2l6ZSBvZiB0aGUgY3ViZSBhbG9uZyBpdHMgWS1heGlzLlxuXHQgKiBAcGFyYW0gZGVwdGggVGhlIHNpemUgb2YgdGhlIGN1YmUgYWxvbmcgaXRzIFotYXhpcy5cblx0ICogQHBhcmFtIHNlZ21lbnRzVyBUaGUgbnVtYmVyIG9mIHNlZ21lbnRzIHRoYXQgbWFrZSB1cCB0aGUgY3ViZSBhbG9uZyB0aGUgWC1heGlzLlxuXHQgKiBAcGFyYW0gc2VnbWVudHNIIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBjdWJlIGFsb25nIHRoZSBZLWF4aXMuXG5cdCAqIEBwYXJhbSBzZWdtZW50c0QgVGhlIG51bWJlciBvZiBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGN1YmUgYWxvbmcgdGhlIFotYXhpcy5cblx0ICogQHBhcmFtIHRpbGU2IFRoZSB0eXBlIG9mIHV2IG1hcHBpbmcgdG8gdXNlLiBXaGVuIHRydWUsIGEgdGV4dHVyZSB3aWxsIGJlIHN1YmRpdmlkZWQgaW4gYSAyeDMgZ3JpZCwgZWFjaCB1c2VkIGZvciBhIHNpbmdsZSBmYWNlLiBXaGVuIGZhbHNlLCB0aGUgZW50aXJlIGltYWdlIGlzIG1hcHBlZCBvbiBlYWNoIGZhY2UuXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcih3aWR0aDpudW1iZXIgPSAxMDAsIGhlaWdodDpudW1iZXIgPSAxMDAsIGRlcHRoOm51bWJlciA9IDEwMCwgc2VnbWVudHNXOm51bWJlciA9IDEsIHNlZ21lbnRzSDpudW1iZXIgPSAxLCBzZWdtZW50c0Q6bnVtYmVyID0gMSwgdGlsZTY6Ym9vbGVhbiA9IHRydWUpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fd2lkdGggPSB3aWR0aDtcblx0XHR0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy5fZGVwdGggPSBkZXB0aDtcblx0XHR0aGlzLl9zZWdtZW50c1cgPSBzZWdtZW50c1c7XG5cdFx0dGhpcy5fc2VnbWVudHNIID0gc2VnbWVudHNIO1xuXHRcdHRoaXMuX3NlZ21lbnRzRCA9IHNlZ21lbnRzRDtcblx0XHR0aGlzLl90aWxlNiA9IHRpbGU2O1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBzaXplIG9mIHRoZSBjdWJlIGFsb25nIGl0cyBYLWF4aXMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHdpZHRoKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fd2lkdGg7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHdpZHRoKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX3dpZHRoID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHNpemUgb2YgdGhlIGN1YmUgYWxvbmcgaXRzIFktYXhpcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgaGVpZ2h0KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faGVpZ2h0O1xuXHR9XG5cblx0cHVibGljIHNldCBoZWlnaHQodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5faGVpZ2h0ID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHNpemUgb2YgdGhlIGN1YmUgYWxvbmcgaXRzIFotYXhpcy5cblx0ICovXG5cdHB1YmxpYyBnZXQgZGVwdGgoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kZXB0aDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgZGVwdGgodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fZGVwdGggPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgdHlwZSBvZiB1diBtYXBwaW5nIHRvIHVzZS4gV2hlbiBmYWxzZSwgdGhlIGVudGlyZSBpbWFnZSBpcyBtYXBwZWQgb24gZWFjaCBmYWNlLlxuXHQgKiBXaGVuIHRydWUsIGEgdGV4dHVyZSB3aWxsIGJlIHN1YmRpdmlkZWQgaW4gYSAzeDIgZ3JpZCwgZWFjaCB1c2VkIGZvciBhIHNpbmdsZSBmYWNlLlxuXHQgKiBSZWFkaW5nIHRoZSB0aWxlcyBmcm9tIGxlZnQgdG8gcmlnaHQsIHRvcCB0byBib3R0b20gdGhleSByZXByZXNlbnQgdGhlIGZhY2VzIG9mIHRoZVxuXHQgKiBjdWJlIGluIHRoZSBmb2xsb3dpbmcgb3JkZXI6IGJvdHRvbSwgdG9wLCBiYWNrLCBsZWZ0LCBmcm9udCwgcmlnaHQuIFRoaXMgY3JlYXRlc1xuXHQgKiBzZXZlcmFsIHNoYXJlZCBlZGdlcyAoYmV0d2VlbiB0aGUgdG9wLCBmcm9udCwgbGVmdCBhbmQgcmlnaHQgZmFjZXMpIHdoaWNoIHNpbXBsaWZpZXNcblx0ICogdGV4dHVyZSBwYWludGluZy5cblx0ICovXG5cdHB1YmxpYyBnZXQgdGlsZTYoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdGlsZTY7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHRpbGU2KHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl90aWxlNiA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBudW1iZXIgb2Ygc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBjdWJlIGFsb25nIHRoZSBYLWF4aXMuIERlZmF1bHRzIHRvIDEuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNlZ21lbnRzVygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NlZ21lbnRzVztcblx0fVxuXG5cdHB1YmxpYyBzZXQgc2VnbWVudHNXKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX3NlZ21lbnRzVyA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlVVZzKCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIG51bWJlciBvZiBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGN1YmUgYWxvbmcgdGhlIFktYXhpcy4gRGVmYXVsdHMgdG8gMS5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2VnbWVudHNIKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2VnbWVudHNIO1xuXHR9XG5cblx0cHVibGljIHNldCBzZWdtZW50c0godmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fc2VnbWVudHNIID0gdmFsdWU7XG5cblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVVVnMoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgbnVtYmVyIG9mIHNlZ21lbnRzIHRoYXQgbWFrZSB1cCB0aGUgY3ViZSBhbG9uZyB0aGUgWi1heGlzLiBEZWZhdWx0cyB0byAxLlxuXHQgKi9cblx0cHVibGljIGdldCBzZWdtZW50c0QoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zZWdtZW50c0Q7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHNlZ21lbnRzRCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9zZWdtZW50c0QgPSB2YWx1ZTtcblxuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVVWcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgX3BCdWlsZEdlb21ldHJ5KHRhcmdldDpTdWJHZW9tZXRyeUJhc2UsIGdlb21ldHJ5VHlwZTpzdHJpbmcpXG5cdHtcblx0XHR2YXIgaW5kaWNlczpBcnJheTxudW1iZXI+IC8qdWludCovO1xuXHRcdHZhciBwb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcblx0XHR2YXIgbm9ybWFsczpBcnJheTxudW1iZXI+O1xuXHRcdHZhciB0YW5nZW50czpBcnJheTxudW1iZXI+O1xuXG5cdFx0dmFyIHRsOm51bWJlciwgdHI6bnVtYmVyLCBibDpudW1iZXIsIGJyOm51bWJlcjtcblx0XHR2YXIgaTpudW1iZXIsIGo6bnVtYmVyLCBpbmM6bnVtYmVyID0gMDtcblxuXHRcdHZhciB2aWR4Om51bWJlciwgZmlkeDpudW1iZXI7IC8vIGluZGljZXNcblx0XHR2YXIgaHc6bnVtYmVyLCBoaDpudW1iZXIsIGhkOm51bWJlcjsgLy8gaGFsdmVzXG5cdFx0dmFyIGR3Om51bWJlciwgZGg6bnVtYmVyLCBkZDpudW1iZXI7IC8vIGRlbHRhc1xuXG5cdFx0dmFyIG91dGVyX3BvczpudW1iZXI7XG5cdFx0dmFyIG51bUluZGljZXM6bnVtYmVyO1xuXHRcdHZhciBudW1WZXJ0aWNlczpudW1iZXI7XG5cblx0XHQvLyBoYWxmIGN1YmUgZGltZW5zaW9uc1xuXHRcdGh3ID0gdGhpcy5fd2lkdGgvMjtcblx0XHRoaCA9IHRoaXMuX2hlaWdodC8yO1xuXHRcdGhkID0gdGhpcy5fZGVwdGgvMjtcblxuXHRcdGlmIChnZW9tZXRyeVR5cGUgPT0gXCJ0cmlhbmdsZVN1Ykdlb21ldHJ5XCIpIHtcblxuXHRcdFx0dmFyIHRyaWFuZ2xlR2VvbWV0cnk6VHJpYW5nbGVTdWJHZW9tZXRyeSA9IDxUcmlhbmdsZVN1Ykdlb21ldHJ5PiB0YXJnZXQ7XG5cblx0XHRcdG51bVZlcnRpY2VzID0gKCh0aGlzLl9zZWdtZW50c1cgKyAxKSoodGhpcy5fc2VnbWVudHNIICsgMSkgKyAodGhpcy5fc2VnbWVudHNXICsgMSkqKHRoaXMuX3NlZ21lbnRzRCArIDEpICsgKHRoaXMuX3NlZ21lbnRzSCArIDEpKih0aGlzLl9zZWdtZW50c0QgKyAxKSkqMjtcblxuXHRcdFx0bnVtSW5kaWNlcyA9ICgodGhpcy5fc2VnbWVudHNXKnRoaXMuX3NlZ21lbnRzSCArIHRoaXMuX3NlZ21lbnRzVyp0aGlzLl9zZWdtZW50c0QgKyB0aGlzLl9zZWdtZW50c0gqdGhpcy5fc2VnbWVudHNEKSoxMik7XG5cblx0XHRcdGlmIChudW1WZXJ0aWNlcyA9PSB0cmlhbmdsZUdlb21ldHJ5Lm51bVZlcnRpY2VzICYmIHRyaWFuZ2xlR2VvbWV0cnkuaW5kaWNlcyAhPSBudWxsKSB7XG5cdFx0XHRcdGluZGljZXMgPSB0cmlhbmdsZUdlb21ldHJ5LmluZGljZXM7XG5cdFx0XHRcdHBvc2l0aW9ucyA9IHRyaWFuZ2xlR2VvbWV0cnkucG9zaXRpb25zO1xuXHRcdFx0XHRub3JtYWxzID0gdHJpYW5nbGVHZW9tZXRyeS52ZXJ0ZXhOb3JtYWxzO1xuXHRcdFx0XHR0YW5nZW50cyA9IHRyaWFuZ2xlR2VvbWV0cnkudmVydGV4VGFuZ2VudHM7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbmRpY2VzID0gbmV3IEFycmF5PG51bWJlcj4obnVtSW5kaWNlcyk7XG5cdFx0XHRcdHBvc2l0aW9ucyA9IG5ldyBBcnJheTxudW1iZXI+KG51bVZlcnRpY2VzKjMpO1xuXHRcdFx0XHRub3JtYWxzID0gbmV3IEFycmF5PG51bWJlcj4obnVtVmVydGljZXMqMyk7XG5cdFx0XHRcdHRhbmdlbnRzID0gbmV3IEFycmF5PG51bWJlcj4obnVtVmVydGljZXMqMyk7XG5cblx0XHRcdFx0dGhpcy5fcEludmFsaWRhdGVVVnMoKTtcblx0XHRcdH1cblxuXHRcdFx0dmlkeCA9IDA7XG5cdFx0XHRmaWR4ID0gMDtcblxuXHRcdFx0Ly8gU2VnbWVudCBkaW1lbnNpb25zXG5cdFx0XHRkdyA9IHRoaXMuX3dpZHRoL3RoaXMuX3NlZ21lbnRzVztcblx0XHRcdGRoID0gdGhpcy5faGVpZ2h0L3RoaXMuX3NlZ21lbnRzSDtcblx0XHRcdGRkID0gdGhpcy5fZGVwdGgvdGhpcy5fc2VnbWVudHNEO1xuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDw9IHRoaXMuX3NlZ21lbnRzVzsgaSsrKSB7XG5cdFx0XHRcdG91dGVyX3BvcyA9IC1odyArIGkqZHc7XG5cblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8PSB0aGlzLl9zZWdtZW50c0g7IGorKykge1xuXHRcdFx0XHRcdC8vIGZyb250XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0gb3V0ZXJfcG9zO1xuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSAtaGggKyBqKmRoO1xuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSAtaGQ7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IDA7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMV0gPSAwO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gLTE7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeF0gPSAxO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAxXSA9IDA7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDJdID0gMDtcblx0XHRcdFx0XHR2aWR4ICs9IDM7XG5cblx0XHRcdFx0XHQvLyBiYWNrXG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0gb3V0ZXJfcG9zO1xuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSAtaGggKyBqKmRoO1xuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZDtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHhdID0gMDtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IDA7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSAxO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gLTE7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDFdID0gMDtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSAwO1xuXHRcdFx0XHRcdHZpZHggKz0gMztcblxuXHRcdFx0XHRcdGlmIChpICYmIGopIHtcblx0XHRcdFx0XHRcdHRsID0gMiooKGkgLSAxKSoodGhpcy5fc2VnbWVudHNIICsgMSkgKyAoaiAtIDEpKTtcblx0XHRcdFx0XHRcdHRyID0gMiooaSoodGhpcy5fc2VnbWVudHNIICsgMSkgKyAoaiAtIDEpKTtcblx0XHRcdFx0XHRcdGJsID0gdGwgKyAyO1xuXHRcdFx0XHRcdFx0YnIgPSB0ciArIDI7XG5cblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRsO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYmw7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBicjtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRsO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYnI7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSB0cjtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRyICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJyICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJsICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRyICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJsICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRsICsgMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aW5jICs9IDIqKHRoaXMuX3NlZ21lbnRzVyArIDEpKih0aGlzLl9zZWdtZW50c0ggKyAxKTtcblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9zZWdtZW50c1c7IGkrKykge1xuXHRcdFx0XHRvdXRlcl9wb3MgPSAtaHcgKyBpKmR3O1xuXG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPD0gdGhpcy5fc2VnbWVudHNEOyBqKyspIHtcblx0XHRcdFx0XHQvLyB0b3Bcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSBvdXRlcl9wb3M7XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IGhoO1xuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSAtaGQgKyBqKmRkO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSAwO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDFdID0gMTtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAyXSA9IDA7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeF0gPSAxO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAxXSA9IDA7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDJdID0gMDtcblx0XHRcdFx0XHR2aWR4ICs9IDM7XG5cblx0XHRcdFx0XHQvLyBib3R0b21cblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSBvdXRlcl9wb3M7XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IC1oaDtcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gLWhkICsgaipkZDtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHhdID0gMDtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IC0xO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gMDtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IDE7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDFdID0gMDtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSAwO1xuXHRcdFx0XHRcdHZpZHggKz0gMztcblxuXHRcdFx0XHRcdGlmIChpICYmIGopIHtcblx0XHRcdFx0XHRcdHRsID0gaW5jICsgMiooKGkgLSAxKSoodGhpcy5fc2VnbWVudHNEICsgMSkgKyAoaiAtIDEpKTtcblx0XHRcdFx0XHRcdHRyID0gaW5jICsgMiooaSoodGhpcy5fc2VnbWVudHNEICsgMSkgKyAoaiAtIDEpKTtcblx0XHRcdFx0XHRcdGJsID0gdGwgKyAyO1xuXHRcdFx0XHRcdFx0YnIgPSB0ciArIDI7XG5cblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRsO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYmw7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBicjtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRsO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYnI7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSB0cjtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRyICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJyICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJsICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRyICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJsICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRsICsgMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aW5jICs9IDIqKHRoaXMuX3NlZ21lbnRzVyArIDEpKih0aGlzLl9zZWdtZW50c0QgKyAxKTtcblxuXHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9zZWdtZW50c0Q7IGkrKykge1xuXHRcdFx0XHRvdXRlcl9wb3MgPSBoZCAtIGkqZGQ7XG5cblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8PSB0aGlzLl9zZWdtZW50c0g7IGorKykge1xuXHRcdFx0XHRcdC8vIGxlZnRcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSAtaHc7XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHgrMV0gPSAtaGggKyBqKmRoO1xuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4KzJdID0gb3V0ZXJfcG9zO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSAtMTtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHgrMV0gPSAwO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCsyXSA9IDA7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeF0gPSAwO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHgrMV0gPSAwO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHgrMl0gPSAtMTtcblx0XHRcdFx0XHR2aWR4ICs9IDM7XG5cblx0XHRcdFx0XHQvLyByaWdodFxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IGh3O1xuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4KzFdID0gLWhoICsgaipkaDtcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCsyXSA9IG91dGVyX3Bvcztcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHhdID0gMTtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHgrMV0gPSAwO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCsyXSA9IDA7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeF0gPSAwO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHgrMV0gPSAwO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHgrMl0gPSAxO1xuXHRcdFx0XHRcdHZpZHggKz0gMztcblxuXHRcdFx0XHRcdGlmIChpICYmIGopIHtcblx0XHRcdFx0XHRcdHRsID0gaW5jICsgMiooKGkgLSAxKSoodGhpcy5fc2VnbWVudHNIICsgMSkgKyAoaiAtIDEpKTtcblx0XHRcdFx0XHRcdHRyID0gaW5jICsgMiooaSoodGhpcy5fc2VnbWVudHNIICsgMSkgKyAoaiAtIDEpKTtcblx0XHRcdFx0XHRcdGJsID0gdGwgKyAyO1xuXHRcdFx0XHRcdFx0YnIgPSB0ciArIDI7XG5cblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRsO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYmw7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBicjtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRsO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYnI7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSB0cjtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRyICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJyICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJsICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRyICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGJsICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IHRsICsgMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVJbmRpY2VzKGluZGljZXMpO1xuXG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZVBvc2l0aW9ucyhwb3NpdGlvbnMpO1xuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVWZXJ0ZXhOb3JtYWxzKG5vcm1hbHMpO1xuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVWZXJ0ZXhUYW5nZW50cyh0YW5nZW50cyk7XG5cblx0XHR9IGVsc2UgaWYgKGdlb21ldHJ5VHlwZSA9PSBcImxpbmVTdWJHZW9tZXRyeVwiKSB7XG5cdFx0XHR2YXIgbGluZUdlb21ldHJ5OkxpbmVTdWJHZW9tZXRyeSA9IDxMaW5lU3ViR2VvbWV0cnk+IHRhcmdldDtcblxuXHRcdFx0dmFyIG51bVNlZ21lbnRzOm51bWJlciA9IHRoaXMuX3NlZ21lbnRzSCo0ICsgIHRoaXMuX3NlZ21lbnRzVyo0ICsgdGhpcy5fc2VnbWVudHNEKjQ7XG5cdFx0XHR2YXIgc3RhcnRQb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcblx0XHRcdHZhciBlbmRQb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcblx0XHRcdHZhciB0aGlja25lc3M6QXJyYXk8bnVtYmVyPjtcblxuXHRcdFx0aWYgKGxpbmVHZW9tZXRyeS5pbmRpY2VzICE9IG51bGwgJiYgbnVtU2VnbWVudHMgPT0gbGluZUdlb21ldHJ5Lm51bVNlZ21lbnRzKSB7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zID0gbGluZUdlb21ldHJ5LnN0YXJ0UG9zaXRpb25zO1xuXHRcdFx0XHRlbmRQb3NpdGlvbnMgPSBsaW5lR2VvbWV0cnkuZW5kUG9zaXRpb25zO1xuXHRcdFx0XHR0aGlja25lc3MgPSBsaW5lR2VvbWV0cnkudGhpY2tuZXNzO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnMgPSBuZXcgQXJyYXk8bnVtYmVyPihudW1TZWdtZW50cyozKTtcblx0XHRcdFx0ZW5kUG9zaXRpb25zID0gbmV3IEFycmF5PG51bWJlcj4obnVtU2VnbWVudHMqMyk7XG5cdFx0XHRcdHRoaWNrbmVzcyA9IG5ldyBBcnJheTxudW1iZXI+KG51bVNlZ21lbnRzKTtcblx0XHRcdH1cblxuXHRcdFx0dmlkeCA9IDA7XG5cblx0XHRcdGZpZHggPSAwO1xuXG5cdFx0XHQvL2Zyb250L2JhY2sgZmFjZVxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuX3NlZ21lbnRzSDsgKytpKSB7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0gLWh3O1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBpKnRoaXMuX2hlaWdodC90aGlzLl9zZWdtZW50c0ggLSBoaDtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gLWhkO1xuXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IGh3O1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gaSp0aGlzLl9oZWlnaHQvdGhpcy5fc2VnbWVudHNIIC0gaGhcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAyXSA9IC1oZDtcblxuXHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XG5cblx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0gLWh3O1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBoaCAtIGkqdGhpcy5faGVpZ2h0L3RoaXMuX3NlZ21lbnRzSDtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gaGQ7XG5cblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHhdID0gaHc7XG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBoaCAtIGkqdGhpcy5faGVpZ2h0L3RoaXMuX3NlZ21lbnRzSDtcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAyXSA9IGhkO1xuXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcblxuXHRcdFx0XHR2aWR4ICs9IDM7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9zZWdtZW50c1c7ICsraSkge1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4XSA9IGkqdGhpcy5fd2lkdGgvdGhpcy5fc2VnbWVudHNXIC0gaHc7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IC1oaDtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gLWhkO1xuXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IGkqdGhpcy5fd2lkdGgvdGhpcy5fc2VnbWVudHNXIC0gaHc7XG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBoaDtcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAyXSA9IC1oZDtcblxuXHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XG5cblx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0gaHcgLSBpKnRoaXMuX3dpZHRoL3RoaXMuX3NlZ21lbnRzVztcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDFdID0gLWhoO1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZDtcblxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSBodyAtIGkqdGhpcy5fd2lkdGgvdGhpcy5fc2VnbWVudHNXO1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gaGg7XG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZDtcblxuXHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XG5cblx0XHRcdFx0dmlkeCArPSAzO1xuXHRcdFx0fVxuXG5cdFx0XHQvL2xlZnQvcmlnaHQgZmFjZVxuXHRcdFx0Zm9yIChpID0gMDsgaSA8IHRoaXMuX3NlZ21lbnRzSDsgKytpKSB7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0gLWh3O1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBpKnRoaXMuX2hlaWdodC90aGlzLl9zZWdtZW50c0ggLSBoaDtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gLWhkO1xuXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IC1odztcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAxXSA9IGkqdGhpcy5faGVpZ2h0L3RoaXMuX3NlZ21lbnRzSCAtIGhoXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZDtcblxuXHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XG5cblx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0gaHc7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IGhoIC0gaSp0aGlzLl9oZWlnaHQvdGhpcy5fc2VnbWVudHNIO1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSAtaGQ7XG5cblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHhdID0gaHc7XG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBoaCAtIGkqdGhpcy5faGVpZ2h0L3RoaXMuX3NlZ21lbnRzSDtcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAyXSA9IGhkO1xuXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcblxuXHRcdFx0XHR2aWR4ICs9IDM7XG5cdFx0XHR9XG5cblx0XHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9zZWdtZW50c0Q7ICsraSkge1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4XSA9IGh3XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IC1oaDtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gaSp0aGlzLl9kZXB0aC90aGlzLl9zZWdtZW50c0QgLSBoZDtcblxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSBodztcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAxXSA9IGhoO1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gaSp0aGlzLl9kZXB0aC90aGlzLl9zZWdtZW50c0QgLSBoZDtcblxuXHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XG5cblx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0gLWh3O1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMV0gPSAtaGg7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAyXSA9IGhkIC0gaSp0aGlzLl9kZXB0aC90aGlzLl9zZWdtZW50c0Q7XG5cblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHhdID0gLWh3O1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gaGg7XG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZCAtIGkqdGhpcy5fZGVwdGgvdGhpcy5fc2VnbWVudHNEO1xuXG5cdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcblxuXHRcdFx0XHR2aWR4ICs9IDM7XG5cdFx0XHR9XG5cblxuXHRcdFx0Ly90b3AvYm90dG9tIGZhY2Vcblx0XHRcdGZvciAoaSA9IDA7IGkgPCB0aGlzLl9zZWdtZW50c0Q7ICsraSkge1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4XSA9IC1odztcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDFdID0gLWhoO1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBoZCAtIGkqdGhpcy5fZGVwdGgvdGhpcy5fc2VnbWVudHNEO1xuXG5cdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IGh3O1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gLWhoO1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gaGQgLSBpKnRoaXMuX2RlcHRoL3RoaXMuX3NlZ21lbnRzRDtcblxuXHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XG5cblx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0gLWh3O1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMV0gPSBoaDtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gaSp0aGlzLl9kZXB0aC90aGlzLl9zZWdtZW50c0QgLSBoZDtcblxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSBodztcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAxXSA9IGhoO1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gaSp0aGlzLl9kZXB0aC90aGlzLl9zZWdtZW50c0QgLSBoZDtcblxuXHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XG5cblx0XHRcdFx0dmlkeCArPSAzO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGkgPSAwOyBpIDwgdGhpcy5fc2VnbWVudHNXOyArK2kpIHtcblx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeF0gPSBodyAtIGkqdGhpcy5fd2lkdGgvdGhpcy5fc2VnbWVudHNXO1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMV0gPSAtaGg7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAyXSA9IC1oZDtcblxuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSBodyAtIGkqdGhpcy5fd2lkdGgvdGhpcy5fc2VnbWVudHNXO1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gLWhoO1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gaGQ7XG5cblx0XHRcdFx0dGhpY2tuZXNzW2ZpZHgrK10gPSAxO1xuXG5cdFx0XHRcdHZpZHggKz0gMztcblxuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4XSA9IGkqdGhpcy5fd2lkdGgvdGhpcy5fc2VnbWVudHNXIC0gaHc7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IGhoO1xuXHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSAtaGQ7XG5cblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHhdID0gaSp0aGlzLl93aWR0aC90aGlzLl9zZWdtZW50c1cgLSBodztcblx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAxXSA9IGhoO1xuXHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gaGQ7XG5cblx0XHRcdFx0dGhpY2tuZXNzW2ZpZHgrK10gPSAxO1xuXG5cdFx0XHRcdHZpZHggKz0gMztcblx0XHRcdH1cblxuXHRcdFx0Ly8gYnVpbGQgcmVhbCBkYXRhIGZyb20gcmF3IGRhdGFcblx0XHRcdGxpbmVHZW9tZXRyeS51cGRhdGVQb3NpdGlvbnMoc3RhcnRQb3NpdGlvbnMsIGVuZFBvc2l0aW9ucyk7XG5cdFx0XHRsaW5lR2VvbWV0cnkudXBkYXRlVGhpY2tuZXNzKHRoaWNrbmVzcyk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEBpbmhlcml0RG9jXG5cdCAqL1xuXHRwdWJsaWMgX3BCdWlsZFVWcyh0YXJnZXQ6U3ViR2VvbWV0cnlCYXNlLCBnZW9tZXRyeVR5cGU6c3RyaW5nKVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyLCBqOm51bWJlciwgaW5kZXg6bnVtYmVyO1xuXHRcdHZhciB1dnM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdHZhciB1X3RpbGVfZGltOm51bWJlciwgdl90aWxlX2RpbTpudW1iZXI7XG5cdFx0dmFyIHVfdGlsZV9zdGVwOm51bWJlciwgdl90aWxlX3N0ZXA6bnVtYmVyO1xuXHRcdHZhciB0bDB1Om51bWJlciwgdGwwdjpudW1iZXI7XG5cdFx0dmFyIHRsMXU6bnVtYmVyLCB0bDF2Om51bWJlcjtcblx0XHR2YXIgZHU6bnVtYmVyLCBkdjpudW1iZXI7XG5cdFx0dmFyIG51bVZlcnRpY2VzOm51bWJlcjtcblxuXHRcdGlmIChnZW9tZXRyeVR5cGUgPT0gXCJ0cmlhbmdsZVN1Ykdlb21ldHJ5XCIpIHtcblxuXHRcdFx0bnVtVmVydGljZXMgPSAoKHRoaXMuX3NlZ21lbnRzVyArIDEpKih0aGlzLl9zZWdtZW50c0ggKyAxKSArICh0aGlzLl9zZWdtZW50c1cgKyAxKSoodGhpcy5fc2VnbWVudHNEICsgMSkgKyAodGhpcy5fc2VnbWVudHNIICsgMSkqKHRoaXMuX3NlZ21lbnRzRCArIDEpKSoyO1xuXG5cdFx0XHR2YXIgdHJpYW5nbGVHZW9tZXRyeTpUcmlhbmdsZVN1Ykdlb21ldHJ5ID0gPFRyaWFuZ2xlU3ViR2VvbWV0cnk+IHRhcmdldDtcblxuXHRcdFx0aWYgKG51bVZlcnRpY2VzID09IHRyaWFuZ2xlR2VvbWV0cnkubnVtVmVydGljZXMgJiYgdHJpYW5nbGVHZW9tZXRyeS51dnMgIT0gbnVsbCkge1xuXHRcdFx0XHR1dnMgPSB0cmlhbmdsZUdlb21ldHJ5LnV2cztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHV2cyA9IG5ldyBBcnJheTxudW1iZXI+KG51bVZlcnRpY2VzKjIpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fdGlsZTYpIHtcblx0XHRcdFx0dV90aWxlX2RpbSA9IHVfdGlsZV9zdGVwID0gMS8zO1xuXHRcdFx0XHR2X3RpbGVfZGltID0gdl90aWxlX3N0ZXAgPSAxLzI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR1X3RpbGVfZGltID0gdl90aWxlX2RpbSA9IDE7XG5cdFx0XHRcdHVfdGlsZV9zdGVwID0gdl90aWxlX3N0ZXAgPSAwO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDcmVhdGUgcGxhbmVzIHR3byBhbmQgdHdvLCB0aGUgc2FtZSB3YXkgdGhhdCB0aGV5IHdlcmVcblx0XHRcdC8vIGNvbnN0cnVjdGVkIGluIHRoZSBidWlsZEdlb21ldHJ5KCkgZnVuY3Rpb24uIEZpcnN0IGNhbGN1bGF0ZVxuXHRcdFx0Ly8gdGhlIHRvcC1sZWZ0IFVWIGNvb3JkaW5hdGUgZm9yIGJvdGggcGxhbmVzLCBhbmQgdGhlbiBsb29wXG5cdFx0XHQvLyBvdmVyIHRoZSBwb2ludHMsIGNhbGN1bGF0aW5nIHRoZSBVVnMgZnJvbSB0aGVzZSBudW1iZXJzLlxuXG5cdFx0XHQvLyBXaGVuIHRpbGU2IGlzIHRydWUsIHRoZSBsYXlvdXQgaXMgYXMgZm9sbG93czpcblx0XHRcdC8vICAgICAgIC4tLS0tLS4tLS0tLS4tLS0tLS4gKDEsMSlcblx0XHRcdC8vICAgICAgIHwgQm90IHwgIFQgIHwgQmFrIHxcblx0XHRcdC8vICAgICAgIHwtLS0tLSstLS0tLSstLS0tLXxcblx0XHRcdC8vICAgICAgIHwgIEwgIHwgIEYgIHwgIFIgIHxcblx0XHRcdC8vICgwLDApJy0tLS0tJy0tLS0tJy0tLS0tJ1xuXG5cdFx0XHRpbmRleCA9IDA7XG5cblx0XHRcdC8vIEZST05UIC8gQkFDS1xuXHRcdFx0dGwwdSA9IDEqdV90aWxlX3N0ZXA7XG5cdFx0XHR0bDB2ID0gMSp2X3RpbGVfc3RlcDtcblx0XHRcdHRsMXUgPSAyKnVfdGlsZV9zdGVwO1xuXHRcdFx0dGwxdiA9IDAqdl90aWxlX3N0ZXA7XG5cdFx0XHRkdSA9IHVfdGlsZV9kaW0vdGhpcy5fc2VnbWVudHNXO1xuXHRcdFx0ZHYgPSB2X3RpbGVfZGltL3RoaXMuX3NlZ21lbnRzSDtcblx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fc2VnbWVudHNXOyBpKyspIHtcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8PSB0aGlzLl9zZWdtZW50c0g7IGorKykge1xuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggdGwwdSArIGkqZHUgKSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTtcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIHRsMHYgKyAodl90aWxlX2RpbSAtIGoqZHYpKSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcblxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggdGwxdSArICh1X3RpbGVfZGltIC0gaSpkdSkpKnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVVO1xuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggdGwxdiArICh2X3RpbGVfZGltIC0gaipkdikpKnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVWO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRPUCAvIEJPVFRPTVxuXHRcdFx0dGwwdSA9IDEqdV90aWxlX3N0ZXA7XG5cdFx0XHR0bDB2ID0gMCp2X3RpbGVfc3RlcDtcblx0XHRcdHRsMXUgPSAwKnVfdGlsZV9zdGVwO1xuXHRcdFx0dGwxdiA9IDAqdl90aWxlX3N0ZXA7XG5cdFx0XHRkdSA9IHVfdGlsZV9kaW0vdGhpcy5fc2VnbWVudHNXO1xuXHRcdFx0ZHYgPSB2X3RpbGVfZGltL3RoaXMuX3NlZ21lbnRzRDtcblx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fc2VnbWVudHNXOyBpKyspIHtcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8PSB0aGlzLl9zZWdtZW50c0Q7IGorKykge1xuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggdGwwdSArIGkqZHUpKnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVVO1xuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggdGwwdiArICh2X3RpbGVfZGltIC0gaipkdikpKnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVWO1xuXG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0gKCB0bDF1ICsgaSpkdSkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVU7XG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0gKCB0bDF2ICsgaipkdikqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVY7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gTEVGVCAvIFJJR0hUXG5cdFx0XHR0bDB1ID0gMCp1X3RpbGVfc3RlcDtcblx0XHRcdHRsMHYgPSAxKnZfdGlsZV9zdGVwO1xuXHRcdFx0dGwxdSA9IDIqdV90aWxlX3N0ZXA7XG5cdFx0XHR0bDF2ID0gMSp2X3RpbGVfc3RlcDtcblx0XHRcdGR1ID0gdV90aWxlX2RpbS90aGlzLl9zZWdtZW50c0Q7XG5cdFx0XHRkdiA9IHZfdGlsZV9kaW0vdGhpcy5fc2VnbWVudHNIO1xuXHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9zZWdtZW50c0Q7IGkrKykge1xuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDw9IHRoaXMuX3NlZ21lbnRzSDsgaisrKSB7XG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0gKCB0bDB1ICsgaSpkdSkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVU7XG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0gKCB0bDB2ICsgKHZfdGlsZV9kaW0gLSBqKmR2KSkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVY7XG5cblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIHRsMXUgKyAodV90aWxlX2RpbSAtIGkqZHUpKSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTtcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIHRsMXYgKyAodl90aWxlX2RpbSAtIGoqZHYpKSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZVVWcyh1dnMpO1xuXG5cdFx0fSBlbHNlIGlmIChnZW9tZXRyeVR5cGUgPT0gXCJsaW5lU3ViR2VvbWV0cnlcIikge1xuXHRcdFx0Ly9ub3RoaW5nIHRvIGRvIGhlcmVcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0ID0gUHJpbWl0aXZlQ3ViZVByZWZhYjsiXX0=