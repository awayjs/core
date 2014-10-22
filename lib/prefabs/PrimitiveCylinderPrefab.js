var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PrimitivePrefabBase = require("awayjs-core/lib/prefabs/PrimitivePrefabBase");

/**
* A Cylinder primitive mesh.
*/
var PrimitiveCylinderPrefab = (function (_super) {
    __extends(PrimitiveCylinderPrefab, _super);
    /**
    * Creates a new Cylinder object.
    * @param topRadius The radius of the top end of the cylinder.
    * @param bottomRadius The radius of the bottom end of the cylinder
    * @param height The radius of the bottom end of the cylinder
    * @param segmentsW Defines the number of horizontal segments that make up the cylinder. Defaults to 16.
    * @param segmentsH Defines the number of vertical segments that make up the cylinder. Defaults to 1.
    * @param topClosed Defines whether the top end of the cylinder is closed (true) or open.
    * @param bottomClosed Defines whether the bottom end of the cylinder is closed (true) or open.
    * @param yUp Defines whether the cone poles should lay on the Y-axis (true) or on the Z-axis (false).
    */
    function PrimitiveCylinderPrefab(topRadius, bottomRadius, height, segmentsW, segmentsH, topClosed, bottomClosed, surfaceClosed, yUp) {
        if (typeof topRadius === "undefined") { topRadius = 50; }
        if (typeof bottomRadius === "undefined") { bottomRadius = 50; }
        if (typeof height === "undefined") { height = 100; }
        if (typeof segmentsW === "undefined") { segmentsW = 16; }
        if (typeof segmentsH === "undefined") { segmentsH = 1; }
        if (typeof topClosed === "undefined") { topClosed = true; }
        if (typeof bottomClosed === "undefined") { bottomClosed = true; }
        if (typeof surfaceClosed === "undefined") { surfaceClosed = true; }
        if (typeof yUp === "undefined") { yUp = true; }
        _super.call(this);
        this._numVertices = 0;

        this._topRadius = topRadius;
        this._pBottomRadius = bottomRadius;
        this._height = height;
        this._pSegmentsW = segmentsW;
        this._pSegmentsH = segmentsH;
        this._topClosed = topClosed;
        this._bottomClosed = bottomClosed;
        this._surfaceClosed = surfaceClosed;
        this._yUp = yUp;
    }
    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "topRadius", {
        /**
        * The radius of the top end of the cylinder.
        */
        get: function () {
            return this._topRadius;
        },
        set: function (value) {
            this._topRadius = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "bottomRadius", {
        /**
        * The radius of the bottom end of the cylinder.
        */
        get: function () {
            return this._pBottomRadius;
        },
        set: function (value) {
            this._pBottomRadius = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "height", {
        /**
        * The radius of the top end of the cylinder.
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


    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "segmentsW", {
        /**
        * Defines the number of horizontal segments that make up the cylinder. Defaults to 16.
        */
        get: function () {
            return this._pSegmentsW;
        },
        set: function (value) {
            this.setSegmentsW(value);
        },
        enumerable: true,
        configurable: true
    });


    PrimitiveCylinderPrefab.prototype.setSegmentsW = function (value) {
        this._pSegmentsW = value;
        this._pInvalidateGeometry();
        this._pInvalidateUVs();
    };

    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "segmentsH", {
        /**
        * Defines the number of vertical segments that make up the cylinder. Defaults to 1.
        */
        get: function () {
            return this._pSegmentsH;
        },
        set: function (value) {
            this.setSegmentsH(value);
        },
        enumerable: true,
        configurable: true
    });


    PrimitiveCylinderPrefab.prototype.setSegmentsH = function (value) {
        this._pSegmentsH = value;
        this._pInvalidateGeometry();
        this._pInvalidateUVs();
    };

    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "topClosed", {
        /**
        * Defines whether the top end of the cylinder is closed (true) or open.
        */
        get: function () {
            return this._topClosed;
        },
        set: function (value) {
            this._topClosed = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "bottomClosed", {
        /**
        * Defines whether the bottom end of the cylinder is closed (true) or open.
        */
        get: function () {
            return this._bottomClosed;
        },
        set: function (value) {
            this._bottomClosed = value;
            this._pInvalidateGeometry();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(PrimitiveCylinderPrefab.prototype, "yUp", {
        /**
        * Defines whether the cylinder poles should lay on the Y-axis (true) or on the Z-axis (false).
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
    PrimitiveCylinderPrefab.prototype._pBuildGeometry = function (target, geometryType) {
        var indices;
        var positions;
        var normals;
        var tangents;

        var i;
        var j;
        var x;
        var y;
        var z;
        var vidx;
        var fidx;

        var radius;
        var revolutionAngle;

        var dr;
        var latNormElev;
        var latNormBase;
        var numIndices = 0;

        var comp1;
        var comp2;
        var startIndex = 0;
        var nextVertexIndex = 0;

        var t1;
        var t2;

        // reset utility variables
        this._numVertices = 0;

        // evaluate revolution steps
        var revolutionAngleDelta = 2 * Math.PI / this._pSegmentsW;

        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;

            // evaluate target number of vertices, triangles and indices
            if (this._surfaceClosed) {
                this._numVertices += (this._pSegmentsH + 1) * (this._pSegmentsW + 1); // segmentsH + 1 because of closure, segmentsW + 1 because of UV unwrapping
                numIndices += this._pSegmentsH * this._pSegmentsW * 6; // each level has segmentW quads, each of 2 triangles
            }
            if (this._topClosed) {
                this._numVertices += 2 * (this._pSegmentsW + 1); // segmentsW + 1 because of unwrapping
                numIndices += this._pSegmentsW * 3; // one triangle for each segment
            }
            if (this._bottomClosed) {
                this._numVertices += 2 * (this._pSegmentsW + 1);
                numIndices += this._pSegmentsW * 3;
            }

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

            // top
            if (this._topClosed && this._topRadius > 0) {
                z = -0.5 * this._height;

                for (i = 0; i <= this._pSegmentsW; ++i) {
                    // central vertex
                    if (this._yUp) {
                        t1 = 1;
                        t2 = 0;
                        comp1 = -z;
                        comp2 = 0;
                    } else {
                        t1 = 0;
                        t2 = -1;
                        comp1 = 0;
                        comp2 = z;
                    }

                    positions[vidx] = 0;
                    positions[vidx + 1] = comp1;
                    positions[vidx + 2] = comp2;
                    normals[vidx] = 0;
                    normals[vidx + 1] = t1;
                    normals[vidx + 2] = t2;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;

                    // revolution vertex
                    revolutionAngle = i * revolutionAngleDelta;
                    x = this._topRadius * Math.cos(revolutionAngle);
                    y = this._topRadius * Math.sin(revolutionAngle);

                    if (this._yUp) {
                        comp1 = -z;
                        comp2 = y;
                    } else {
                        comp1 = y;
                        comp2 = z;
                    }

                    if (i == this._pSegmentsW) {
                        positions[vidx] = positions[startIndex + 3];
                        positions[vidx + 1] = positions[startIndex + 4];
                        positions[vidx + 2] = positions[startIndex + 5];
                    } else {
                        positions[vidx] = x;
                        positions[vidx + 1] = comp1;
                        positions[vidx + 2] = comp2;
                    }

                    normals[vidx] = 0;
                    normals[vidx + 1] = t1;
                    normals[vidx + 2] = t2;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;

                    if (i > 0) {
                        // add triangle
                        indices[fidx++] = nextVertexIndex;
                        indices[fidx++] = nextVertexIndex + 1;
                        indices[fidx++] = nextVertexIndex + 2;

                        nextVertexIndex += 2;
                    }
                }

                nextVertexIndex += 2;
            }

            // bottom
            if (this._bottomClosed && this._pBottomRadius > 0) {
                z = 0.5 * this._height;

                startIndex = nextVertexIndex * 3;

                for (i = 0; i <= this._pSegmentsW; ++i) {
                    if (this._yUp) {
                        t1 = -1;
                        t2 = 0;
                        comp1 = -z;
                        comp2 = 0;
                    } else {
                        t1 = 0;
                        t2 = 1;
                        comp1 = 0;
                        comp2 = z;
                    }

                    positions[vidx] = 0;
                    positions[vidx + 1] = comp1;
                    positions[vidx + 2] = comp2;
                    normals[vidx] = 0;
                    normals[vidx + 1] = t1;
                    normals[vidx + 2] = t2;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;

                    // revolution vertex
                    revolutionAngle = i * revolutionAngleDelta;
                    x = this._pBottomRadius * Math.cos(revolutionAngle);
                    y = this._pBottomRadius * Math.sin(revolutionAngle);

                    if (this._yUp) {
                        comp1 = -z;
                        comp2 = y;
                    } else {
                        comp1 = y;
                        comp2 = z;
                    }

                    if (i == this._pSegmentsW) {
                        positions[vidx] = positions[startIndex + 3];
                        positions[vidx + 1] = positions[startIndex + 4];
                        positions[vidx + 2] = positions[startIndex + 5];
                    } else {
                        positions[vidx] = x;
                        positions[vidx + 1] = comp1;
                        positions[vidx + 2] = comp2;
                    }

                    normals[vidx] = 0;
                    normals[vidx + 1] = t1;
                    normals[vidx + 2] = t2;
                    tangents[vidx] = 1;
                    tangents[vidx + 1] = 0;
                    tangents[vidx + 2] = 0;
                    vidx += 3;

                    if (i > 0) {
                        // add triangle
                        indices[fidx++] = nextVertexIndex;
                        indices[fidx++] = nextVertexIndex + 2;
                        indices[fidx++] = nextVertexIndex + 1;

                        nextVertexIndex += 2;
                    }
                }

                nextVertexIndex += 2;
            }

            // The normals on the lateral surface all have the same incline, i.e.
            // the "elevation" component (Y or Z depending on yUp) is constant.
            // Same principle goes for the "base" of these vectors, which will be
            // calculated such that a vector [base,elev] will be a unit vector.
            dr = (this._pBottomRadius - this._topRadius);
            latNormElev = dr / this._height;
            latNormBase = (latNormElev == 0) ? 1 : this._height / dr;

            // lateral surface
            if (this._surfaceClosed) {
                var a;
                var b;
                var c;
                var d;
                var na0, na1, naComp1, naComp2;

                for (j = 0; j <= this._pSegmentsH; ++j) {
                    radius = this._topRadius - ((j / this._pSegmentsH) * (this._topRadius - this._pBottomRadius));
                    z = -(this._height / 2) + (j / this._pSegmentsH * this._height);

                    startIndex = nextVertexIndex * 3;

                    for (i = 0; i <= this._pSegmentsW; ++i) {
                        // revolution vertex
                        revolutionAngle = i * revolutionAngleDelta;
                        x = radius * Math.cos(revolutionAngle);
                        y = radius * Math.sin(revolutionAngle);
                        na0 = latNormBase * Math.cos(revolutionAngle);
                        na1 = latNormBase * Math.sin(revolutionAngle);

                        if (this._yUp) {
                            t1 = 0;
                            t2 = -na0;
                            comp1 = -z;
                            comp2 = y;
                            naComp1 = latNormElev;
                            naComp2 = na1;
                        } else {
                            t1 = -na0;
                            t2 = 0;
                            comp1 = y;
                            comp2 = z;
                            naComp1 = na1;
                            naComp2 = latNormElev;
                        }

                        if (i == this._pSegmentsW) {
                            positions[vidx] = positions[startIndex];
                            positions[vidx + 1] = positions[startIndex + 1];
                            positions[vidx + 2] = positions[startIndex + 2];
                            normals[vidx] = na0;
                            normals[vidx + 1] = latNormElev;
                            normals[vidx + 2] = na1;
                            tangents[vidx] = na1;
                            tangents[vidx + 1] = t1;
                            tangents[vidx + 2] = t2;
                        } else {
                            positions[vidx] = x;
                            positions[vidx + 1] = comp1;
                            positions[vidx + 2] = comp2;
                            normals[vidx] = na0;
                            normals[vidx + 1] = naComp1;
                            normals[vidx + 2] = naComp2;
                            tangents[vidx] = -na1;
                            tangents[vidx + 1] = t1;
                            tangents[vidx + 2] = t2;
                        }
                        vidx += 3;

                        // close triangle
                        if (i > 0 && j > 0) {
                            a = nextVertexIndex; // current
                            b = nextVertexIndex - 1; // previous
                            c = b - this._pSegmentsW - 1; // previous of last level
                            d = a - this._pSegmentsW - 1; // current of last level

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
            }

            // build real data from raw data
            triangleGeometry.updateIndices(indices);

            triangleGeometry.updatePositions(positions);
            triangleGeometry.updateVertexNormals(normals);
            triangleGeometry.updateVertexTangents(tangents);
        } else if (geometryType == "lineSubGeometry") {
            var lineGeometry = target;

            var numSegments = (this._pSegmentsH + 1) * (this._pSegmentsW) + this._pSegmentsW;
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

            for (j = 0; j <= this._pSegmentsH; ++j) {
                radius = this._topRadius - ((j / this._pSegmentsH) * (this._topRadius - this._pBottomRadius));
                z = this._height * (j / this._pSegmentsH - 0.5);

                for (i = 0; i <= this._pSegmentsW; ++i) {
                    // revolution vertex
                    revolutionAngle = i * revolutionAngleDelta;
                    x = radius * Math.cos(revolutionAngle);
                    y = radius * Math.sin(revolutionAngle);

                    if (this._yUp) {
                        comp1 = -z;
                        comp2 = y;
                    } else {
                        comp1 = y;
                        comp2 = z;
                    }

                    if (i > 0) {
                        endPositions[vidx] = x;
                        endPositions[vidx + 1] = comp1;
                        endPositions[vidx + 2] = comp2;

                        thickness[fidx++] = 1;

                        vidx += 3;

                        //vertical lines
                        startPositions[vidx] = endPositions[vidx - this._pSegmentsW * 6];
                        startPositions[vidx + 1] = endPositions[vidx + 1 - this._pSegmentsW * 6];
                        startPositions[vidx + 2] = endPositions[vidx + 2 - this._pSegmentsW * 6];

                        endPositions[vidx] = x;
                        endPositions[vidx + 1] = comp1;
                        endPositions[vidx + 2] = comp2;

                        thickness[fidx++] = 1;

                        vidx += 3;
                    }

                    if (i < this._pSegmentsW) {
                        startPositions[vidx] = x;
                        startPositions[vidx + 1] = comp1;
                        startPositions[vidx + 2] = comp2;
                    }
                }
            }

            // build real data from raw data
            lineGeometry.updatePositions(startPositions, endPositions);
            lineGeometry.updateThickness(thickness);
        }
    };

    /**
    * @inheritDoc
    */
    PrimitiveCylinderPrefab.prototype._pBuildUVs = function (target, geometryType) {
        var i;
        var j;
        var x;
        var y;
        var revolutionAngle;
        var uvs;

        if (geometryType == "triangleSubGeometry") {
            var triangleGeometry = target;

            // need to initialize raw array or can be reused?
            if (triangleGeometry.uvs && this._numVertices == triangleGeometry.numVertices) {
                uvs = triangleGeometry.uvs;
            } else {
                uvs = new Array(this._numVertices * 2);
            }

            // evaluate revolution steps
            var revolutionAngleDelta = 2 * Math.PI / this._pSegmentsW;

            // current uv component index
            var index = 0;

            // top
            if (this._topClosed) {
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    revolutionAngle = i * revolutionAngleDelta;
                    x = 0.5 + 0.5 * -Math.cos(revolutionAngle);
                    y = 0.5 + 0.5 * Math.sin(revolutionAngle);

                    uvs[index++] = 0.5 * triangleGeometry.scaleU; // central vertex
                    uvs[index++] = 0.5 * triangleGeometry.scaleV;

                    uvs[index++] = x * triangleGeometry.scaleU; // revolution vertex
                    uvs[index++] = y * triangleGeometry.scaleV;
                }
            }

            // bottom
            if (this._bottomClosed) {
                for (i = 0; i <= this._pSegmentsW; ++i) {
                    revolutionAngle = i * revolutionAngleDelta;
                    x = 0.5 + 0.5 * Math.cos(revolutionAngle);
                    y = 0.5 + 0.5 * Math.sin(revolutionAngle);

                    uvs[index++] = 0.5 * triangleGeometry.scaleU; // central vertex
                    uvs[index++] = 0.5 * triangleGeometry.scaleV;

                    uvs[index++] = x * triangleGeometry.scaleU; // revolution vertex
                    uvs[index++] = y * triangleGeometry.scaleV;
                }
            }

            // lateral surface
            if (this._surfaceClosed) {
                for (j = 0; j <= this._pSegmentsH; ++j) {
                    for (i = 0; i <= this._pSegmentsW; ++i) {
                        // revolution vertex
                        uvs[index++] = (i / this._pSegmentsW) * triangleGeometry.scaleU;
                        uvs[index++] = (j / this._pSegmentsH) * triangleGeometry.scaleV;
                    }
                }
            }

            // build real data from raw data
            triangleGeometry.updateUVs(uvs);
        } else if (geometryType == "lineSubGeometry") {
            //nothing to do here
        }
    };
    return PrimitiveCylinderPrefab;
})(PrimitivePrefabBase);

module.exports = PrimitiveCylinderPrefab;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZWZhYnMvUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWIudHMiXSwibmFtZXMiOlsiUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWIiLCJQcmltaXRpdmVDeWxpbmRlclByZWZhYi5jb25zdHJ1Y3RvciIsIlByaW1pdGl2ZUN5bGluZGVyUHJlZmFiLnNldFNlZ21lbnRzVyIsIlByaW1pdGl2ZUN5bGluZGVyUHJlZmFiLnNldFNlZ21lbnRzSCIsIlByaW1pdGl2ZUN5bGluZGVyUHJlZmFiLl9wQnVpbGRHZW9tZXRyeSIsIlByaW1pdGl2ZUN5bGluZGVyUHJlZmFiLl9wQnVpbGRVVnMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdGQUlxRjs7QUFFckY7O0VBRUc7QUFDSDtJQUFzQ0EsMENBQW1CQTtJQXlKeERBOzs7Ozs7Ozs7O01BREdBO0lBQ0hBLGlDQUFZQSxTQUFxQkEsRUFBRUEsWUFBd0JBLEVBQUVBLE1BQW1CQSxFQUFFQSxTQUFxQkEsRUFBRUEsU0FBb0JBLEVBQUVBLFNBQXdCQSxFQUFFQSxZQUEyQkEsRUFBRUEsYUFBNEJBLEVBQUVBLEdBQWtCQTtRQUExTkMsd0NBQUFBLFNBQVNBLEdBQVVBLEVBQUVBO0FBQUFBLFFBQUVBLDJDQUFBQSxZQUFZQSxHQUFVQSxFQUFFQTtBQUFBQSxRQUFFQSxxQ0FBQUEsTUFBTUEsR0FBVUEsR0FBR0E7QUFBQUEsUUFBRUEsd0NBQUFBLFNBQVNBLEdBQVVBLEVBQUVBO0FBQUFBLFFBQUVBLHdDQUFBQSxTQUFTQSxHQUFVQSxDQUFDQTtBQUFBQSxRQUFFQSx3Q0FBQUEsU0FBU0EsR0FBV0EsSUFBSUE7QUFBQUEsUUFBRUEsMkNBQUFBLFlBQVlBLEdBQVdBLElBQUlBO0FBQUFBLFFBQUVBLDRDQUFBQSxhQUFhQSxHQUFXQSxJQUFJQTtBQUFBQSxRQUFFQSxrQ0FBQUEsR0FBR0EsR0FBV0EsSUFBSUE7QUFBQUEsUUFFck9BLFdBQU1BLEtBQUFBLENBQUNBO1FBOUlSQSxLQUFRQSxZQUFZQSxHQUFVQSxDQUFDQSxDQUFDQTs7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QUlBLENBQUVBO3dCQUNkQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDVkEsS0FBS0EsR0FBR0EsQ0FBQ0E7cUJBQ1RBLEtBQU1BO3dCQUNOQSxLQUFLQSxHQUFHQSxDQUFDQTt3QkFDVEEsS0FBS0EsR0FBR0EsQ0FBQ0E7cUJBQ1RBOztvQkFFREEsSUFBSUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBRUE7d0JBQzFCQSxTQUFTQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQTt3QkFDM0NBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBO3dCQUMvQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7cUJBRS9DQSxLQUFNQTt3QkFDTkEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7d0JBQ25CQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQTt3QkFDM0JBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBO3FCQUMzQkE7O29CQUVEQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQTtvQkFDakJBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBO29CQUN0QkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUE7b0JBQ3RCQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQTtvQkFDbEJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO29CQUN0QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FB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QUNBOzRCQUNUQSxPQUFPQSxHQUFHQSxHQUFHQTs0QkFDYkEsT0FBT0EsR0FBR0EsV0FBV0E7eUJBQ3JCQTs7d0JBRURBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFdBQVdBLENBQUVBOzRCQUMxQkEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsVUFBVUEsQ0FBQ0E7NEJBQ3ZDQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQTs0QkFDL0NBLFNBQVNBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBOzRCQUMvQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0E7NEJBQ25CQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxXQUFXQTs0QkFDL0JBLE9BQU9BLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBOzRCQUN2QkEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0E7NEJBQ3BCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQTs0QkFDdkJBLFFBQVFBLENBQUNBLElBQUlBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBO3lCQUN2QkEsS0FBTUE7NEJBQ05BLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBOzRCQUNuQkEsU0FBU0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0E7NEJBQzNCQSxTQUFTQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQTs0QkFDM0JBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBOzRCQUNuQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsT0FBT0E7NEJBQzNCQSxPQUFPQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxPQUFPQTs0QkFDM0JBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBOzRCQUNyQkEsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUE7NEJBQ3ZCQSxRQUFRQSxDQUFDQSxJQUFJQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQTt5QkFDdkJBO3dCQUNEQSxJQUFJQSxJQUFJQSxDQUFDQTs7d0JBRVRBLGlCQUFpQkE7d0JBQ2pCQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFFQTs0QkFDbkJBLENBQUNBLEdBQUdBLGVBQWVBLEVBQUVBLFVBQVVBOzRCQUMvQkEsQ0FBQ0EsR0FBR0EsZUFBZUEsR0FBR0EsQ0FBQ0EsRUFBRUEsV0FBV0E7NEJBQ3BDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxDQUFDQSxFQUFFQSx5QkFBeUJBOzRCQUN2REEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsQ0FBQ0EsRUFBRUEsd0JBQXdCQTs7NEJBRXREQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQTs0QkFDbkJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBOzRCQUNuQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7OzRCQUVuQkEsT0FBT0EsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7NEJBQ25CQSxPQUFPQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQTs0QkFDbkJBLE9BQU9BLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBO3lCQUNuQkE7O3dCQUVEQSxlQUFlQSxFQUFFQTtxQkFDakJBO2lCQUNEQTthQUNEQTs7WUFFREEsZ0NBQWdDQTtZQUNoQ0EsZ0JBQWdCQSxDQUFDQSxhQUFhQSxDQUFDQSxPQUFPQSxDQUFDQTs7WUFFdkNBLGdCQUFnQkEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsU0FBU0EsQ0FBQ0E7WUFDM0NBLGdCQUFnQkEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUM3Q0EsZ0JBQWdCQSxDQUFDQSxvQkFBb0JBLENBQUNBLFFBQVFBLENBQUNBO1NBRS9DQSxNQUFNQSxJQUFJQSxZQUFZQSxJQUFJQSxpQkFBaUJBLENBQUVBO1lBQzdDQSxJQUFJQSxZQUFZQSxHQUFxQ0EsTUFBTUE7O1lBRTNEQSxJQUFJQSxXQUFXQSxHQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxXQUFXQTtZQUNyRkEsSUFBSUEsY0FBY0E7WUFDbEJBLElBQUlBLFlBQVlBO1lBQ2hCQSxJQUFJQSxTQUFTQTs7WUFFYkEsSUFBSUEsWUFBWUEsQ0FBQ0EsT0FBT0EsSUFBSUEsSUFBSUEsSUFBSUEsV0FBV0EsSUFBSUEsWUFBWUEsQ0FBQ0EsV0FBV0EsQ0FBRUE7Z0JBQzVFQSxjQUFjQSxHQUFHQSxZQUFZQSxDQUFDQSxjQUFjQTtnQkFDNUNBLFlBQVlBLEdBQUdBLFlBQVlBLENBQUNBLFlBQVlBO2dCQUN4Q0EsU0FBU0EsR0FBR0EsWUFBWUEsQ0FBQ0EsU0FBU0E7YUFDbENBLEtBQU1BO2dCQUNOQSxjQUFjQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFTQSxXQUFXQSxHQUFDQSxDQUFDQSxDQUFDQTtnQkFDakRBLFlBQVlBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLFdBQVdBLEdBQUNBLENBQUNBLENBQUNBO2dCQUMvQ0EsU0FBU0EsR0FBR0EsSUFBSUEsS0FBS0EsQ0FBU0EsV0FBV0EsQ0FBQ0E7YUFDMUNBOztZQUVEQSxJQUFJQSxHQUFHQSxDQUFDQTs7WUFFUkEsSUFBSUEsR0FBR0EsQ0FBQ0E7O1lBSVJBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFdBQVdBLEVBQUVBLEVBQUVBLENBQUNBLENBQUVBO2dCQUN2Q0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pGQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxHQUFHQSxHQUFHQSxDQUFDQTs7Z0JBRTNDQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxXQUFXQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFFQTtvQkFDdkNBLG9CQUFvQkE7b0JBQ3BCQSxlQUFlQSxHQUFHQSxDQUFDQSxHQUFDQSxvQkFBb0JBO29CQUN4Q0EsQ0FBQ0EsR0FBR0EsTUFBTUEsR0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsZUFBZUEsQ0FBQ0E7b0JBQ3BDQSxDQUFDQSxHQUFHQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxlQUFlQSxDQUFDQTs7b0JBRXBDQSxJQUFJQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFFQTt3QkFDZEEsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7d0JBQ1ZBLEtBQUtBLEdBQUdBLENBQUNBO3FCQUNUQSxLQUFNQTt3QkFDTkEsS0FBS0EsR0FBR0EsQ0FBQ0E7d0JBQ1RBLEtBQUtBLEdBQUdBLENBQUNBO3FCQUNUQTs7b0JBRURBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLENBQUVBO3dCQUNWQSxZQUFZQSxD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LElBQUlBLENBQUNBLFdBQVdBLENBQUVBLEdBQUNBLGdCQUFnQkEsQ0FBQ0EsTUFBTUE7cUJBQzdEQTtpQkFDREE7YUFDREE7O1lBRURBLGdDQUFnQ0E7WUFDaENBLGdCQUFnQkEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7U0FFL0JBLE1BQU1BLElBQUlBLFlBQVlBLElBQUlBLGlCQUFpQkEsQ0FBRUE7WUFDN0NBLG9CQUFvQkE7U0FDcEJBO0lBQ0ZBLENBQUNBO0lBQ0ZMLCtCQUFDQTtBQUFEQSxDQUFDQSxFQTVvQnFDLG1CQUFtQixFQTRvQnhEOztBQUVELHdDQUFpQyxDQUFBIiwiZmlsZSI6InByZWZhYnMvUHJpbWl0aXZlQ3lsaW5kZXJQcmVmYWIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvYmJhdGVtYW4vV2Vic3Rvcm1Qcm9qZWN0cy9hd2F5anMtY29yZS8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluZVN1Ykdlb21ldHJ5XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9MaW5lU3ViR2VvbWV0cnlcIik7XG5pbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2NvcmUvYmFzZS9TdWJHZW9tZXRyeUJhc2VcIik7XG5pbXBvcnQgVHJpYW5nbGVTdWJHZW9tZXRyeVx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL1RyaWFuZ2xlU3ViR2VvbWV0cnlcIik7XG5pbXBvcnQgSUFzc2V0XHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2xpYnJhcnkvSUFzc2V0XCIpO1xuaW1wb3J0IFByaW1pdGl2ZVByZWZhYkJhc2VcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL3ByZWZhYnMvUHJpbWl0aXZlUHJlZmFiQmFzZVwiKTtcblxuLyoqXG4gKiBBIEN5bGluZGVyIHByaW1pdGl2ZSBtZXNoLlxuICovXG5jbGFzcyBQcmltaXRpdmVDeWxpbmRlclByZWZhYiBleHRlbmRzIFByaW1pdGl2ZVByZWZhYkJhc2UgaW1wbGVtZW50cyBJQXNzZXRcbntcblx0cHVibGljIF9wQm90dG9tUmFkaXVzOm51bWJlcjtcblx0cHVibGljIF9wU2VnbWVudHNXOm51bWJlcjtcblx0cHVibGljIF9wU2VnbWVudHNIOm51bWJlcjtcblxuXHRwcml2YXRlIF90b3BSYWRpdXM6bnVtYmVyO1xuXHRwcml2YXRlIF9oZWlnaHQ6bnVtYmVyO1xuXG5cdHByaXZhdGUgX3RvcENsb3NlZDpib29sZWFuO1xuXHRwcml2YXRlIF9ib3R0b21DbG9zZWQ6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfc3VyZmFjZUNsb3NlZDpib29sZWFuO1xuXHRwcml2YXRlIF95VXA6Ym9vbGVhbjtcblx0cHJpdmF0ZSBfbnVtVmVydGljZXM6bnVtYmVyID0gMDtcblxuXHQvKipcblx0ICogVGhlIHJhZGl1cyBvZiB0aGUgdG9wIGVuZCBvZiB0aGUgY3lsaW5kZXIuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHRvcFJhZGl1cygpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3RvcFJhZGl1cztcblx0fVxuXG5cdHB1YmxpYyBzZXQgdG9wUmFkaXVzKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX3RvcFJhZGl1cyA9IHZhbHVlO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgcmFkaXVzIG9mIHRoZSBib3R0b20gZW5kIG9mIHRoZSBjeWxpbmRlci5cblx0ICovXG5cdHB1YmxpYyBnZXQgYm90dG9tUmFkaXVzKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcEJvdHRvbVJhZGl1cztcblx0fVxuXG5cdHB1YmxpYyBzZXQgYm90dG9tUmFkaXVzKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX3BCb3R0b21SYWRpdXMgPSB2YWx1ZTtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHJhZGl1cyBvZiB0aGUgdG9wIGVuZCBvZiB0aGUgY3lsaW5kZXIuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGhlaWdodCgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2hlaWdodDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgaGVpZ2h0KHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuX2hlaWdodCA9IHZhbHVlO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSBudW1iZXIgb2YgaG9yaXpvbnRhbCBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGN5bGluZGVyLiBEZWZhdWx0cyB0byAxNi5cblx0ICovXG5cdHB1YmxpYyBnZXQgc2VnbWVudHNXKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fcFNlZ21lbnRzVztcblx0fVxuXG5cdHB1YmxpYyBzZXQgc2VnbWVudHNXKHZhbHVlOm51bWJlcilcblx0e1xuXHRcdHRoaXMuc2V0U2VnbWVudHNXKHZhbHVlKTtcblx0fVxuXG5cdHB1YmxpYyBzZXRTZWdtZW50c1codmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0dGhpcy5fcFNlZ21lbnRzVyA9IHZhbHVlO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlR2VvbWV0cnkoKTtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZVVWcygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIG51bWJlciBvZiB2ZXJ0aWNhbCBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGN5bGluZGVyLiBEZWZhdWx0cyB0byAxLlxuXHQgKi9cblx0cHVibGljIGdldCBzZWdtZW50c0goKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9wU2VnbWVudHNIO1xuXHR9XG5cblx0cHVibGljIHNldCBzZWdtZW50c0godmFsdWU6bnVtYmVyKVxuXHR7XG5cblx0XHR0aGlzLnNldFNlZ21lbnRzSCh2YWx1ZSlcblxuXHR9XG5cblx0cHVibGljIHNldFNlZ21lbnRzSCh2YWx1ZTpudW1iZXIpXG5cdHtcblx0XHR0aGlzLl9wU2VnbWVudHNIID0gdmFsdWU7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHRcdHRoaXMuX3BJbnZhbGlkYXRlVVZzKCk7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgdGhlIHRvcCBlbmQgb2YgdGhlIGN5bGluZGVyIGlzIGNsb3NlZCAodHJ1ZSkgb3Igb3Blbi5cblx0ICovXG5cdHB1YmxpYyBnZXQgdG9wQ2xvc2VkKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3RvcENsb3NlZDtcblx0fVxuXG5cdHB1YmxpYyBzZXQgdG9wQ2xvc2VkKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHR0aGlzLl90b3BDbG9zZWQgPSB2YWx1ZTtcblx0XHR0aGlzLl9wSW52YWxpZGF0ZUdlb21ldHJ5KCk7XG5cdH1cblxuXHQvKipcblx0ICogRGVmaW5lcyB3aGV0aGVyIHRoZSBib3R0b20gZW5kIG9mIHRoZSBjeWxpbmRlciBpcyBjbG9zZWQgKHRydWUpIG9yIG9wZW4uXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGJvdHRvbUNsb3NlZCgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9ib3R0b21DbG9zZWQ7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGJvdHRvbUNsb3NlZCh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0dGhpcy5fYm90dG9tQ2xvc2VkID0gdmFsdWU7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERlZmluZXMgd2hldGhlciB0aGUgY3lsaW5kZXIgcG9sZXMgc2hvdWxkIGxheSBvbiB0aGUgWS1heGlzICh0cnVlKSBvciBvbiB0aGUgWi1heGlzIChmYWxzZSkuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHlVcCgpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl95VXA7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHlVcCh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0dGhpcy5feVVwID0gdmFsdWU7XG5cdFx0dGhpcy5fcEludmFsaWRhdGVHZW9tZXRyeSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgQ3lsaW5kZXIgb2JqZWN0LlxuXHQgKiBAcGFyYW0gdG9wUmFkaXVzIFRoZSByYWRpdXMgb2YgdGhlIHRvcCBlbmQgb2YgdGhlIGN5bGluZGVyLlxuXHQgKiBAcGFyYW0gYm90dG9tUmFkaXVzIFRoZSByYWRpdXMgb2YgdGhlIGJvdHRvbSBlbmQgb2YgdGhlIGN5bGluZGVyXG5cdCAqIEBwYXJhbSBoZWlnaHQgVGhlIHJhZGl1cyBvZiB0aGUgYm90dG9tIGVuZCBvZiB0aGUgY3lsaW5kZXJcblx0ICogQHBhcmFtIHNlZ21lbnRzVyBEZWZpbmVzIHRoZSBudW1iZXIgb2YgaG9yaXpvbnRhbCBzZWdtZW50cyB0aGF0IG1ha2UgdXAgdGhlIGN5bGluZGVyLiBEZWZhdWx0cyB0byAxNi5cblx0ICogQHBhcmFtIHNlZ21lbnRzSCBEZWZpbmVzIHRoZSBudW1iZXIgb2YgdmVydGljYWwgc2VnbWVudHMgdGhhdCBtYWtlIHVwIHRoZSBjeWxpbmRlci4gRGVmYXVsdHMgdG8gMS5cblx0ICogQHBhcmFtIHRvcENsb3NlZCBEZWZpbmVzIHdoZXRoZXIgdGhlIHRvcCBlbmQgb2YgdGhlIGN5bGluZGVyIGlzIGNsb3NlZCAodHJ1ZSkgb3Igb3Blbi5cblx0ICogQHBhcmFtIGJvdHRvbUNsb3NlZCBEZWZpbmVzIHdoZXRoZXIgdGhlIGJvdHRvbSBlbmQgb2YgdGhlIGN5bGluZGVyIGlzIGNsb3NlZCAodHJ1ZSkgb3Igb3Blbi5cblx0ICogQHBhcmFtIHlVcCBEZWZpbmVzIHdoZXRoZXIgdGhlIGNvbmUgcG9sZXMgc2hvdWxkIGxheSBvbiB0aGUgWS1heGlzICh0cnVlKSBvciBvbiB0aGUgWi1heGlzIChmYWxzZSkuXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcih0b3BSYWRpdXM6bnVtYmVyID0gNTAsIGJvdHRvbVJhZGl1czpudW1iZXIgPSA1MCwgaGVpZ2h0Om51bWJlciA9IDEwMCwgc2VnbWVudHNXOm51bWJlciA9IDE2LCBzZWdtZW50c0g6bnVtYmVyID0gMSwgdG9wQ2xvc2VkOmJvb2xlYW4gPSB0cnVlLCBib3R0b21DbG9zZWQ6Ym9vbGVhbiA9IHRydWUsIHN1cmZhY2VDbG9zZWQ6Ym9vbGVhbiA9IHRydWUsIHlVcDpib29sZWFuID0gdHJ1ZSlcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLl90b3BSYWRpdXMgPSB0b3BSYWRpdXM7XG5cdFx0dGhpcy5fcEJvdHRvbVJhZGl1cyA9IGJvdHRvbVJhZGl1cztcblx0XHR0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy5fcFNlZ21lbnRzVyA9IHNlZ21lbnRzVztcblx0XHR0aGlzLl9wU2VnbWVudHNIID0gc2VnbWVudHNIO1xuXHRcdHRoaXMuX3RvcENsb3NlZCA9IHRvcENsb3NlZDtcblx0XHR0aGlzLl9ib3R0b21DbG9zZWQgPSBib3R0b21DbG9zZWQ7XG5cdFx0dGhpcy5fc3VyZmFjZUNsb3NlZCA9IHN1cmZhY2VDbG9zZWQ7XG5cdFx0dGhpcy5feVVwID0geVVwO1xuXHR9XG5cblxuXHQvKipcblx0ICogQGluaGVyaXREb2Ncblx0ICovXG5cdHB1YmxpYyBfcEJ1aWxkR2VvbWV0cnkodGFyZ2V0OlN1Ykdlb21ldHJ5QmFzZSwgZ2VvbWV0cnlUeXBlOnN0cmluZylcblx0e1xuXHRcdHZhciBpbmRpY2VzOkFycmF5PG51bWJlcj4gLyp1aW50Ki87XG5cdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXHRcdHZhciBub3JtYWxzOkFycmF5PG51bWJlcj47XG5cdFx0dmFyIHRhbmdlbnRzOkFycmF5PG51bWJlcj47XG5cblx0XHR2YXIgaTpudW1iZXI7XG5cdFx0dmFyIGo6bnVtYmVyO1xuXHRcdHZhciB4Om51bWJlcjtcblx0XHR2YXIgeTpudW1iZXI7XG5cdFx0dmFyIHo6bnVtYmVyO1xuXHRcdHZhciB2aWR4Om51bWJlcjtcblx0XHR2YXIgZmlkeDpudW1iZXI7XG5cblx0XHR2YXIgcmFkaXVzOm51bWJlcjtcblx0XHR2YXIgcmV2b2x1dGlvbkFuZ2xlOm51bWJlcjtcblxuXHRcdHZhciBkcjpudW1iZXI7XG5cdFx0dmFyIGxhdE5vcm1FbGV2Om51bWJlcjtcblx0XHR2YXIgbGF0Tm9ybUJhc2U6bnVtYmVyO1xuXHRcdHZhciBudW1JbmRpY2VzOm51bWJlciA9IDA7XG5cblx0XHR2YXIgY29tcDE6bnVtYmVyO1xuXHRcdHZhciBjb21wMjpudW1iZXI7XG5cdFx0dmFyIHN0YXJ0SW5kZXg6bnVtYmVyID0gMDtcblx0XHR2YXIgbmV4dFZlcnRleEluZGV4Om51bWJlciA9IDA7XG5cblx0XHR2YXIgdDE6bnVtYmVyO1xuXHRcdHZhciB0MjpudW1iZXI7XG5cblx0XHQvLyByZXNldCB1dGlsaXR5IHZhcmlhYmxlc1xuXHRcdHRoaXMuX251bVZlcnRpY2VzID0gMDtcblxuXHRcdC8vIGV2YWx1YXRlIHJldm9sdXRpb24gc3RlcHNcblx0XHR2YXIgcmV2b2x1dGlvbkFuZ2xlRGVsdGE6bnVtYmVyID0gMipNYXRoLlBJL3RoaXMuX3BTZWdtZW50c1c7XG5cblx0XHRpZiAoZ2VvbWV0cnlUeXBlID09IFwidHJpYW5nbGVTdWJHZW9tZXRyeVwiKSB7XG5cblx0XHRcdHZhciB0cmlhbmdsZUdlb21ldHJ5OlRyaWFuZ2xlU3ViR2VvbWV0cnkgPSA8VHJpYW5nbGVTdWJHZW9tZXRyeT4gdGFyZ2V0O1xuXG5cdFx0XHQvLyBldmFsdWF0ZSB0YXJnZXQgbnVtYmVyIG9mIHZlcnRpY2VzLCB0cmlhbmdsZXMgYW5kIGluZGljZXNcblx0XHRcdGlmICh0aGlzLl9zdXJmYWNlQ2xvc2VkKSB7XG5cdFx0XHRcdHRoaXMuX251bVZlcnRpY2VzICs9ICh0aGlzLl9wU2VnbWVudHNIICsgMSkqKHRoaXMuX3BTZWdtZW50c1cgKyAxKTsgLy8gc2VnbWVudHNIICsgMSBiZWNhdXNlIG9mIGNsb3N1cmUsIHNlZ21lbnRzVyArIDEgYmVjYXVzZSBvZiBVViB1bndyYXBwaW5nXG5cdFx0XHRcdG51bUluZGljZXMgKz0gdGhpcy5fcFNlZ21lbnRzSCp0aGlzLl9wU2VnbWVudHNXKjY7IC8vIGVhY2ggbGV2ZWwgaGFzIHNlZ21lbnRXIHF1YWRzLCBlYWNoIG9mIDIgdHJpYW5nbGVzXG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5fdG9wQ2xvc2VkKSB7XG5cdFx0XHRcdHRoaXMuX251bVZlcnRpY2VzICs9IDIqKHRoaXMuX3BTZWdtZW50c1cgKyAxKTsgLy8gc2VnbWVudHNXICsgMSBiZWNhdXNlIG9mIHVud3JhcHBpbmdcblx0XHRcdFx0bnVtSW5kaWNlcyArPSB0aGlzLl9wU2VnbWVudHNXKjM7IC8vIG9uZSB0cmlhbmdsZSBmb3IgZWFjaCBzZWdtZW50XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5fYm90dG9tQ2xvc2VkKSB7XG5cdFx0XHRcdHRoaXMuX251bVZlcnRpY2VzICs9IDIqKHRoaXMuX3BTZWdtZW50c1cgKyAxKTtcblx0XHRcdFx0bnVtSW5kaWNlcyArPSB0aGlzLl9wU2VnbWVudHNXKjM7XG5cdFx0XHR9XG5cblx0XHRcdC8vIG5lZWQgdG8gaW5pdGlhbGl6ZSByYXcgYXJyYXlzIG9yIGNhbiBiZSByZXVzZWQ/XG5cdFx0XHRpZiAodGhpcy5fbnVtVmVydGljZXMgPT0gdHJpYW5nbGVHZW9tZXRyeS5udW1WZXJ0aWNlcykge1xuXHRcdFx0XHRpbmRpY2VzID0gdHJpYW5nbGVHZW9tZXRyeS5pbmRpY2VzO1xuXHRcdFx0XHRwb3NpdGlvbnMgPSB0cmlhbmdsZUdlb21ldHJ5LnBvc2l0aW9ucztcblx0XHRcdFx0bm9ybWFscyA9IHRyaWFuZ2xlR2VvbWV0cnkudmVydGV4Tm9ybWFscztcblx0XHRcdFx0dGFuZ2VudHMgPSB0cmlhbmdsZUdlb21ldHJ5LnZlcnRleFRhbmdlbnRzO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aW5kaWNlcyA9IG5ldyBBcnJheTxudW1iZXI+KG51bUluZGljZXMpXG5cdFx0XHRcdHBvc2l0aW9ucyA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuX251bVZlcnRpY2VzKjMpO1xuXHRcdFx0XHRub3JtYWxzID0gbmV3IEFycmF5PG51bWJlcj4odGhpcy5fbnVtVmVydGljZXMqMyk7XG5cdFx0XHRcdHRhbmdlbnRzID0gbmV3IEFycmF5PG51bWJlcj4odGhpcy5fbnVtVmVydGljZXMqMyk7XG5cblx0XHRcdFx0dGhpcy5fcEludmFsaWRhdGVVVnMoKTtcblx0XHRcdH1cblxuXHRcdFx0dmlkeCA9IDA7XG5cdFx0XHRmaWR4ID0gMDtcblxuXHRcdFx0Ly8gdG9wXG5cdFx0XHRpZiAodGhpcy5fdG9wQ2xvc2VkICYmIHRoaXMuX3RvcFJhZGl1cyA+IDApIHtcblxuXHRcdFx0XHR6ID0gLTAuNSp0aGlzLl9oZWlnaHQ7XG5cblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcblx0XHRcdFx0XHQvLyBjZW50cmFsIHZlcnRleFxuXHRcdFx0XHRcdGlmICh0aGlzLl95VXApIHtcblx0XHRcdFx0XHRcdHQxID0gMTtcblx0XHRcdFx0XHRcdHQyID0gMDtcblx0XHRcdFx0XHRcdGNvbXAxID0gLXo7XG5cdFx0XHRcdFx0XHRjb21wMiA9IDA7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dDEgPSAwO1xuXHRcdFx0XHRcdFx0dDIgPSAtMTtcblx0XHRcdFx0XHRcdGNvbXAxID0gMDtcblx0XHRcdFx0XHRcdGNvbXAyID0gejtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSAwO1xuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSBjb21wMTtcblx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gY29tcDI7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4XSA9IDA7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMV0gPSB0MTtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAyXSA9IHQyO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHhdID0gMTtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMV0gPSAwO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAyXSA9IDA7XG5cdFx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdFx0Ly8gcmV2b2x1dGlvbiB2ZXJ0ZXhcblx0XHRcdFx0XHRyZXZvbHV0aW9uQW5nbGUgPSBpKnJldm9sdXRpb25BbmdsZURlbHRhO1xuXHRcdFx0XHRcdHggPSB0aGlzLl90b3BSYWRpdXMqTWF0aC5jb3MocmV2b2x1dGlvbkFuZ2xlKTtcblx0XHRcdFx0XHR5ID0gdGhpcy5fdG9wUmFkaXVzKk1hdGguc2luKHJldm9sdXRpb25BbmdsZSk7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5feVVwKSB7XG5cdFx0XHRcdFx0XHRjb21wMSA9IC16O1xuXHRcdFx0XHRcdFx0Y29tcDIgPSB5O1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb21wMSA9IHk7XG5cdFx0XHRcdFx0XHRjb21wMiA9IHo7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGkgPT0gdGhpcy5fcFNlZ21lbnRzVykge1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyAzXTtcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSBwb3NpdGlvbnNbc3RhcnRJbmRleCArIDRdO1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IHBvc2l0aW9uc1tzdGFydEluZGV4ICsgNV07XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0geDtcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMV0gPSBjb21wMTtcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSBjb21wMjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRub3JtYWxzW3ZpZHhdID0gMDtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IHQxO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gdDI7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeF0gPSAxO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAxXSA9IDA7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDJdID0gMDtcblx0XHRcdFx0XHR2aWR4ICs9IDM7XG5cblx0XHRcdFx0XHRpZiAoaSA+IDApIHtcblx0XHRcdFx0XHRcdC8vIGFkZCB0cmlhbmdsZVxuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gbmV4dFZlcnRleEluZGV4O1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gbmV4dFZlcnRleEluZGV4ICsgMTtcblx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IG5leHRWZXJ0ZXhJbmRleCArIDI7XG5cblx0XHRcdFx0XHRcdG5leHRWZXJ0ZXhJbmRleCArPSAyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdG5leHRWZXJ0ZXhJbmRleCArPSAyO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBib3R0b21cblx0XHRcdGlmICh0aGlzLl9ib3R0b21DbG9zZWQgJiYgdGhpcy5fcEJvdHRvbVJhZGl1cyA+IDApIHtcblxuXHRcdFx0XHR6ID0gMC41KnRoaXMuX2hlaWdodDtcblxuXHRcdFx0XHRzdGFydEluZGV4ID0gbmV4dFZlcnRleEluZGV4KjM7XG5cblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5feVVwKSB7XG5cdFx0XHRcdFx0XHR0MSA9IC0xO1xuXHRcdFx0XHRcdFx0dDIgPSAwO1xuXHRcdFx0XHRcdFx0Y29tcDEgPSAtejtcblx0XHRcdFx0XHRcdGNvbXAyID0gMDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dDEgPSAwO1xuXHRcdFx0XHRcdFx0dDIgPSAxO1xuXHRcdFx0XHRcdFx0Y29tcDEgPSAwO1xuXHRcdFx0XHRcdFx0Y29tcDIgPSB6O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IDA7XG5cdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xuXHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSBjb21wMjtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHhdID0gMDtcblx0XHRcdFx0XHRub3JtYWxzW3ZpZHggKyAxXSA9IHQxO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gdDI7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeF0gPSAxO1xuXHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAxXSA9IDA7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDJdID0gMDtcblx0XHRcdFx0XHR2aWR4ICs9IDM7XG5cblx0XHRcdFx0XHQvLyByZXZvbHV0aW9uIHZlcnRleFxuXHRcdFx0XHRcdHJldm9sdXRpb25BbmdsZSA9IGkqcmV2b2x1dGlvbkFuZ2xlRGVsdGE7XG5cdFx0XHRcdFx0eCA9IHRoaXMuX3BCb3R0b21SYWRpdXMqTWF0aC5jb3MocmV2b2x1dGlvbkFuZ2xlKTtcblx0XHRcdFx0XHR5ID0gdGhpcy5fcEJvdHRvbVJhZGl1cypNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3lVcCkge1xuXHRcdFx0XHRcdFx0Y29tcDEgPSAtejtcblx0XHRcdFx0XHRcdGNvbXAyID0geTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29tcDEgPSB5O1xuXHRcdFx0XHRcdFx0Y29tcDIgPSB6O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChpID09IHRoaXMuX3BTZWdtZW50c1cpIHtcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4XSA9IHBvc2l0aW9uc1tzdGFydEluZGV4ICsgM107XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyA0XTtcblx0XHRcdFx0XHRcdHBvc2l0aW9uc1t2aWR4ICsgMl0gPSBwb3NpdGlvbnNbc3RhcnRJbmRleCArIDVdO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeF0gPSB4O1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xuXHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IGNvbXAyO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSAwO1xuXHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDFdID0gdDE7XG5cdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSB0Mjtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IDE7XG5cdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDFdID0gMDtcblx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSAwO1xuXHRcdFx0XHRcdHZpZHggKz0gMztcblxuXHRcdFx0XHRcdGlmIChpID4gMCkge1xuXHRcdFx0XHRcdFx0Ly8gYWRkIHRyaWFuZ2xlXG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBuZXh0VmVydGV4SW5kZXg7XG5cdFx0XHRcdFx0XHRpbmRpY2VzW2ZpZHgrK10gPSBuZXh0VmVydGV4SW5kZXggKyAyO1xuXHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gbmV4dFZlcnRleEluZGV4ICsgMTtcblxuXHRcdFx0XHRcdFx0bmV4dFZlcnRleEluZGV4ICs9IDI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bmV4dFZlcnRleEluZGV4ICs9IDI7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFRoZSBub3JtYWxzIG9uIHRoZSBsYXRlcmFsIHN1cmZhY2UgYWxsIGhhdmUgdGhlIHNhbWUgaW5jbGluZSwgaS5lLlxuXHRcdFx0Ly8gdGhlIFwiZWxldmF0aW9uXCIgY29tcG9uZW50IChZIG9yIFogZGVwZW5kaW5nIG9uIHlVcCkgaXMgY29uc3RhbnQuXG5cdFx0XHQvLyBTYW1lIHByaW5jaXBsZSBnb2VzIGZvciB0aGUgXCJiYXNlXCIgb2YgdGhlc2UgdmVjdG9ycywgd2hpY2ggd2lsbCBiZVxuXHRcdFx0Ly8gY2FsY3VsYXRlZCBzdWNoIHRoYXQgYSB2ZWN0b3IgW2Jhc2UsZWxldl0gd2lsbCBiZSBhIHVuaXQgdmVjdG9yLlxuXHRcdFx0ZHIgPSAodGhpcy5fcEJvdHRvbVJhZGl1cyAtIHRoaXMuX3RvcFJhZGl1cyk7XG5cdFx0XHRsYXROb3JtRWxldiA9IGRyL3RoaXMuX2hlaWdodDtcblx0XHRcdGxhdE5vcm1CYXNlID0gKGxhdE5vcm1FbGV2ID09IDApPyAxIDogdGhpcy5faGVpZ2h0L2RyO1xuXG5cdFx0XHQvLyBsYXRlcmFsIHN1cmZhY2Vcblx0XHRcdGlmICh0aGlzLl9zdXJmYWNlQ2xvc2VkKSB7XG5cdFx0XHRcdHZhciBhOm51bWJlcjtcblx0XHRcdFx0dmFyIGI6bnVtYmVyO1xuXHRcdFx0XHR2YXIgYzpudW1iZXI7XG5cdFx0XHRcdHZhciBkOm51bWJlcjtcblx0XHRcdFx0dmFyIG5hMDpudW1iZXIsIG5hMTpudW1iZXIsIG5hQ29tcDE6bnVtYmVyLCBuYUNvbXAyOm51bWJlcjtcblxuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDw9IHRoaXMuX3BTZWdtZW50c0g7ICsraikge1xuXHRcdFx0XHRcdHJhZGl1cyA9IHRoaXMuX3RvcFJhZGl1cyAtICgoai90aGlzLl9wU2VnbWVudHNIKSoodGhpcy5fdG9wUmFkaXVzIC0gdGhpcy5fcEJvdHRvbVJhZGl1cykpO1xuXHRcdFx0XHRcdHogPSAtKHRoaXMuX2hlaWdodC8yKSArIChqL3RoaXMuX3BTZWdtZW50c0gqdGhpcy5faGVpZ2h0KTtcblxuXHRcdFx0XHRcdHN0YXJ0SW5kZXggPSBuZXh0VmVydGV4SW5kZXgqMztcblxuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fcFNlZ21lbnRzVzsgKytpKSB7XG5cdFx0XHRcdFx0XHQvLyByZXZvbHV0aW9uIHZlcnRleFxuXHRcdFx0XHRcdFx0cmV2b2x1dGlvbkFuZ2xlID0gaSpyZXZvbHV0aW9uQW5nbGVEZWx0YTtcblx0XHRcdFx0XHRcdHggPSByYWRpdXMqTWF0aC5jb3MocmV2b2x1dGlvbkFuZ2xlKTtcblx0XHRcdFx0XHRcdHkgPSByYWRpdXMqTWF0aC5zaW4ocmV2b2x1dGlvbkFuZ2xlKTtcblx0XHRcdFx0XHRcdG5hMCA9IGxhdE5vcm1CYXNlKk1hdGguY29zKHJldm9sdXRpb25BbmdsZSk7XG5cdFx0XHRcdFx0XHRuYTEgPSBsYXROb3JtQmFzZSpNYXRoLnNpbihyZXZvbHV0aW9uQW5nbGUpO1xuXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5feVVwKSB7XG5cdFx0XHRcdFx0XHRcdHQxID0gMDtcblx0XHRcdFx0XHRcdFx0dDIgPSAtbmEwO1xuXHRcdFx0XHRcdFx0XHRjb21wMSA9IC16O1xuXHRcdFx0XHRcdFx0XHRjb21wMiA9IHk7XG5cdFx0XHRcdFx0XHRcdG5hQ29tcDEgPSBsYXROb3JtRWxldjtcblx0XHRcdFx0XHRcdFx0bmFDb21wMiA9IG5hMTtcblxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dDEgPSAtbmEwO1xuXHRcdFx0XHRcdFx0XHR0MiA9IDA7XG5cdFx0XHRcdFx0XHRcdGNvbXAxID0geTtcblx0XHRcdFx0XHRcdFx0Y29tcDIgPSB6O1xuXHRcdFx0XHRcdFx0XHRuYUNvbXAxID0gbmExO1xuXHRcdFx0XHRcdFx0XHRuYUNvbXAyID0gbGF0Tm9ybUVsZXY7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmIChpID09IHRoaXMuX3BTZWdtZW50c1cpIHtcblx0XHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXhdO1xuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDFdID0gcG9zaXRpb25zW3N0YXJ0SW5kZXggKyAxXTtcblx0XHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAyXSA9IHBvc2l0aW9uc1tzdGFydEluZGV4ICsgMl07XG5cdFx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSBuYTA7XG5cdFx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDFdID0gbGF0Tm9ybUVsZXY7XG5cdFx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDJdID0gbmExO1xuXHRcdFx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IG5hMTtcblx0XHRcdFx0XHRcdFx0dGFuZ2VudHNbdmlkeCArIDFdID0gdDE7XG5cdFx0XHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAyXSA9IHQyO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHhdID0geDtcblx0XHRcdFx0XHRcdFx0cG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbnNbdmlkeCArIDJdID0gY29tcDI7XG5cdFx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeF0gPSBuYTA7XG5cdFx0XHRcdFx0XHRcdG5vcm1hbHNbdmlkeCArIDFdID0gbmFDb21wMTtcblx0XHRcdFx0XHRcdFx0bm9ybWFsc1t2aWR4ICsgMl0gPSBuYUNvbXAyO1xuXHRcdFx0XHRcdFx0XHR0YW5nZW50c1t2aWR4XSA9IC1uYTE7XG5cdFx0XHRcdFx0XHRcdHRhbmdlbnRzW3ZpZHggKyAxXSA9IHQxO1xuXHRcdFx0XHRcdFx0XHR0YW5nZW50c1t2aWR4ICsgMl0gPSB0Mjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZpZHggKz0gMztcblxuXHRcdFx0XHRcdFx0Ly8gY2xvc2UgdHJpYW5nbGVcblx0XHRcdFx0XHRcdGlmIChpID4gMCAmJiBqID4gMCkge1xuXHRcdFx0XHRcdFx0XHRhID0gbmV4dFZlcnRleEluZGV4OyAvLyBjdXJyZW50XG5cdFx0XHRcdFx0XHRcdGIgPSBuZXh0VmVydGV4SW5kZXggLSAxOyAvLyBwcmV2aW91c1xuXHRcdFx0XHRcdFx0XHRjID0gYiAtIHRoaXMuX3BTZWdtZW50c1cgLSAxOyAvLyBwcmV2aW91cyBvZiBsYXN0IGxldmVsXG5cdFx0XHRcdFx0XHRcdGQgPSBhIC0gdGhpcy5fcFNlZ21lbnRzVyAtIDE7IC8vIGN1cnJlbnQgb2YgbGFzdCBsZXZlbFxuXG5cdFx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGE7XG5cdFx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGI7XG5cdFx0XHRcdFx0XHRcdGluZGljZXNbZmlkeCsrXSA9IGM7XG5cblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYTtcblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gYztcblx0XHRcdFx0XHRcdFx0aW5kaWNlc1tmaWR4KytdID0gZDtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0bmV4dFZlcnRleEluZGV4Kys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGJ1aWxkIHJlYWwgZGF0YSBmcm9tIHJhdyBkYXRhXG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZUluZGljZXMoaW5kaWNlcyk7XG5cblx0XHRcdHRyaWFuZ2xlR2VvbWV0cnkudXBkYXRlUG9zaXRpb25zKHBvc2l0aW9ucyk7XG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZVZlcnRleE5vcm1hbHMobm9ybWFscyk7XG5cdFx0XHR0cmlhbmdsZUdlb21ldHJ5LnVwZGF0ZVZlcnRleFRhbmdlbnRzKHRhbmdlbnRzKTtcblxuXHRcdH0gZWxzZSBpZiAoZ2VvbWV0cnlUeXBlID09IFwibGluZVN1Ykdlb21ldHJ5XCIpIHtcblx0XHRcdHZhciBsaW5lR2VvbWV0cnk6TGluZVN1Ykdlb21ldHJ5ID0gPExpbmVTdWJHZW9tZXRyeT4gdGFyZ2V0O1xuXG5cdFx0XHR2YXIgbnVtU2VnbWVudHM6bnVtYmVyID0gKHRoaXMuX3BTZWdtZW50c0ggKyAxKSoodGhpcy5fcFNlZ21lbnRzVykgKyB0aGlzLl9wU2VnbWVudHNXO1xuXHRcdFx0dmFyIHN0YXJ0UG9zaXRpb25zOkFycmF5PG51bWJlcj47XG5cdFx0XHR2YXIgZW5kUG9zaXRpb25zOkFycmF5PG51bWJlcj47XG5cdFx0XHR2YXIgdGhpY2tuZXNzOkFycmF5PG51bWJlcj47XG5cblx0XHRcdGlmIChsaW5lR2VvbWV0cnkuaW5kaWNlcyAhPSBudWxsICYmIG51bVNlZ21lbnRzID09IGxpbmVHZW9tZXRyeS5udW1TZWdtZW50cykge1xuXHRcdFx0XHRzdGFydFBvc2l0aW9ucyA9IGxpbmVHZW9tZXRyeS5zdGFydFBvc2l0aW9ucztcblx0XHRcdFx0ZW5kUG9zaXRpb25zID0gbGluZUdlb21ldHJ5LmVuZFBvc2l0aW9ucztcblx0XHRcdFx0dGhpY2tuZXNzID0gbGluZUdlb21ldHJ5LnRoaWNrbmVzcztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHN0YXJ0UG9zaXRpb25zID0gbmV3IEFycmF5PG51bWJlcj4obnVtU2VnbWVudHMqMyk7XG5cdFx0XHRcdGVuZFBvc2l0aW9ucyA9IG5ldyBBcnJheTxudW1iZXI+KG51bVNlZ21lbnRzKjMpO1xuXHRcdFx0XHR0aGlja25lc3MgPSBuZXcgQXJyYXk8bnVtYmVyPihudW1TZWdtZW50cyk7XG5cdFx0XHR9XG5cblx0XHRcdHZpZHggPSAwO1xuXG5cdFx0XHRmaWR4ID0gMDtcblxuXHRcdFx0Ly9ob3Jpem9uYWwgbGluZXNcblxuXHRcdFx0Zm9yIChqID0gMDsgaiA8PSB0aGlzLl9wU2VnbWVudHNIOyArK2opIHtcblx0XHRcdFx0cmFkaXVzID0gdGhpcy5fdG9wUmFkaXVzIC0gKChqL3RoaXMuX3BTZWdtZW50c0gpKih0aGlzLl90b3BSYWRpdXMgLSB0aGlzLl9wQm90dG9tUmFkaXVzKSk7XG5cdFx0XHRcdHogPSB0aGlzLl9oZWlnaHQqKGovdGhpcy5fcFNlZ21lbnRzSCAtIDAuNSk7XG5cblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8PSB0aGlzLl9wU2VnbWVudHNXOyArK2kpIHtcblx0XHRcdFx0XHQvLyByZXZvbHV0aW9uIHZlcnRleFxuXHRcdFx0XHRcdHJldm9sdXRpb25BbmdsZSA9IGkqcmV2b2x1dGlvbkFuZ2xlRGVsdGE7XG5cdFx0XHRcdFx0eCA9IHJhZGl1cypNYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xuXHRcdFx0XHRcdHkgPSByYWRpdXMqTWF0aC5zaW4ocmV2b2x1dGlvbkFuZ2xlKTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLl95VXApIHtcblx0XHRcdFx0XHRcdGNvbXAxID0gLXo7XG5cdFx0XHRcdFx0XHRjb21wMiA9IHk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbXAxID0geTtcblx0XHRcdFx0XHRcdGNvbXAyID0gejtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoaSA+IDApIHtcblx0XHRcdFx0XHRcdGVuZFBvc2l0aW9uc1t2aWR4XSA9IHg7XG5cdFx0XHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDFdID0gY29tcDE7XG5cdFx0XHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeCArIDJdID0gY29tcDI7XG5cblx0XHRcdFx0XHRcdHRoaWNrbmVzc1tmaWR4KytdID0gMTtcblxuXHRcdFx0XHRcdFx0dmlkeCArPSAzO1xuXG5cdFx0XHRcdFx0XHQvL3ZlcnRpY2FsIGxpbmVzXG5cdFx0XHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4XSA9IGVuZFBvc2l0aW9uc1t2aWR4IC0gdGhpcy5fcFNlZ21lbnRzVyo2XTtcblx0XHRcdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IGVuZFBvc2l0aW9uc1t2aWR4ICsgMSAtIHRoaXMuX3BTZWdtZW50c1cqNl07XG5cdFx0XHRcdFx0XHRzdGFydFBvc2l0aW9uc1t2aWR4ICsgMl0gPSBlbmRQb3NpdGlvbnNbdmlkeCArIDIgLSB0aGlzLl9wU2VnbWVudHNXKjZdO1xuXG5cdFx0XHRcdFx0XHRlbmRQb3NpdGlvbnNbdmlkeF0gPSB4O1xuXHRcdFx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xuXHRcdFx0XHRcdFx0ZW5kUG9zaXRpb25zW3ZpZHggKyAyXSA9IGNvbXAyO1xuXG5cdFx0XHRcdFx0XHR0aGlja25lc3NbZmlkeCsrXSA9IDE7XG5cblx0XHRcdFx0XHRcdHZpZHggKz0gMztcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoaSA8IHRoaXMuX3BTZWdtZW50c1cpIHtcblx0XHRcdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHhdID0geDtcblx0XHRcdFx0XHRcdHN0YXJ0UG9zaXRpb25zW3ZpZHggKyAxXSA9IGNvbXAxO1xuXHRcdFx0XHRcdFx0c3RhcnRQb3NpdGlvbnNbdmlkeCArIDJdID0gY29tcDI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGJ1aWxkIHJlYWwgZGF0YSBmcm9tIHJhdyBkYXRhXG5cdFx0XHRsaW5lR2VvbWV0cnkudXBkYXRlUG9zaXRpb25zKHN0YXJ0UG9zaXRpb25zLCBlbmRQb3NpdGlvbnMpO1xuXHRcdFx0bGluZUdlb21ldHJ5LnVwZGF0ZVRoaWNrbmVzcyh0aGlja25lc3MpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBAaW5oZXJpdERvY1xuXHQgKi9cblx0cHVibGljIF9wQnVpbGRVVnModGFyZ2V0OlN1Ykdlb21ldHJ5QmFzZSwgZ2VvbWV0cnlUeXBlOnN0cmluZylcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgajpudW1iZXI7XG5cdFx0dmFyIHg6bnVtYmVyO1xuXHRcdHZhciB5Om51bWJlcjtcblx0XHR2YXIgcmV2b2x1dGlvbkFuZ2xlOm51bWJlcjtcblx0XHR2YXIgdXZzOkFycmF5PG51bWJlcj47XG5cblx0XHRpZiAoZ2VvbWV0cnlUeXBlID09IFwidHJpYW5nbGVTdWJHZW9tZXRyeVwiKSB7XG5cblx0XHRcdHZhciB0cmlhbmdsZUdlb21ldHJ5OlRyaWFuZ2xlU3ViR2VvbWV0cnkgPSA8VHJpYW5nbGVTdWJHZW9tZXRyeT4gdGFyZ2V0O1xuXG5cdFx0XHQvLyBuZWVkIHRvIGluaXRpYWxpemUgcmF3IGFycmF5IG9yIGNhbiBiZSByZXVzZWQ/XG5cdFx0XHRpZiAodHJpYW5nbGVHZW9tZXRyeS51dnMgJiYgdGhpcy5fbnVtVmVydGljZXMgPT0gdHJpYW5nbGVHZW9tZXRyeS5udW1WZXJ0aWNlcykge1xuXHRcdFx0XHR1dnMgPSB0cmlhbmdsZUdlb21ldHJ5LnV2cztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHV2cyA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuX251bVZlcnRpY2VzKjIpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBldmFsdWF0ZSByZXZvbHV0aW9uIHN0ZXBzXG5cdFx0XHR2YXIgcmV2b2x1dGlvbkFuZ2xlRGVsdGE6bnVtYmVyID0gMipNYXRoLlBJL3RoaXMuX3BTZWdtZW50c1c7XG5cblx0XHRcdC8vIGN1cnJlbnQgdXYgY29tcG9uZW50IGluZGV4XG5cdFx0XHR2YXIgaW5kZXg6bnVtYmVyID0gMDtcblxuXHRcdFx0Ly8gdG9wXG5cdFx0XHRpZiAodGhpcy5fdG9wQ2xvc2VkKSB7XG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fcFNlZ21lbnRzVzsgKytpKSB7XG5cblx0XHRcdFx0XHRyZXZvbHV0aW9uQW5nbGUgPSBpKnJldm9sdXRpb25BbmdsZURlbHRhO1xuXHRcdFx0XHRcdHggPSAwLjUgKyAwLjUqIC1NYXRoLmNvcyhyZXZvbHV0aW9uQW5nbGUpO1xuXHRcdFx0XHRcdHkgPSAwLjUgKyAwLjUqTWF0aC5zaW4ocmV2b2x1dGlvbkFuZ2xlKTtcblxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9IDAuNSp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTsgLy8gY2VudHJhbCB2ZXJ0ZXhcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAwLjUqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVY7XG5cblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSB4KnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVVOyAvLyByZXZvbHV0aW9uIHZlcnRleFxuXHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9IHkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVY7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gYm90dG9tXG5cdFx0XHRpZiAodGhpcy5fYm90dG9tQ2xvc2VkKSB7XG5cdFx0XHRcdGZvciAoaSA9IDA7IGkgPD0gdGhpcy5fcFNlZ21lbnRzVzsgKytpKSB7XG5cblx0XHRcdFx0XHRyZXZvbHV0aW9uQW5nbGUgPSBpKnJldm9sdXRpb25BbmdsZURlbHRhO1xuXHRcdFx0XHRcdHggPSAwLjUgKyAwLjUqTWF0aC5jb3MocmV2b2x1dGlvbkFuZ2xlKTtcblx0XHRcdFx0XHR5ID0gMC41ICsgMC41Kk1hdGguc2luKHJldm9sdXRpb25BbmdsZSk7XG5cblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAwLjUqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVU7IC8vIGNlbnRyYWwgdmVydGV4XG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0gMC41KnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVWO1xuXG5cdFx0XHRcdFx0dXZzW2luZGV4KytdID0geCp0cmlhbmdsZUdlb21ldHJ5LnNjYWxlVTsgLy8gcmV2b2x1dGlvbiB2ZXJ0ZXhcblx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSB5KnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVWO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGxhdGVyYWwgc3VyZmFjZVxuXHRcdFx0aWYgKHRoaXMuX3N1cmZhY2VDbG9zZWQpIHtcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8PSB0aGlzLl9wU2VnbWVudHNIOyArK2opIHtcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDw9IHRoaXMuX3BTZWdtZW50c1c7ICsraSkge1xuXHRcdFx0XHRcdFx0Ly8gcmV2b2x1dGlvbiB2ZXJ0ZXhcblx0XHRcdFx0XHRcdHV2c1tpbmRleCsrXSA9ICggaS90aGlzLl9wU2VnbWVudHNXICkqdHJpYW5nbGVHZW9tZXRyeS5zY2FsZVU7XG5cdFx0XHRcdFx0XHR1dnNbaW5kZXgrK10gPSAoIGovdGhpcy5fcFNlZ21lbnRzSCApKnRyaWFuZ2xlR2VvbWV0cnkuc2NhbGVWO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBidWlsZCByZWFsIGRhdGEgZnJvbSByYXcgZGF0YVxuXHRcdFx0dHJpYW5nbGVHZW9tZXRyeS51cGRhdGVVVnModXZzKTtcblxuXHRcdH0gZWxzZSBpZiAoZ2VvbWV0cnlUeXBlID09IFwibGluZVN1Ykdlb21ldHJ5XCIpIHtcblx0XHRcdC8vbm90aGluZyB0byBkbyBoZXJlXG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCA9IFByaW1pdGl2ZUN5bGluZGVyUHJlZmFiOyJdfQ==