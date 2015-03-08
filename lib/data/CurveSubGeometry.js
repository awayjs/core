var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SubGeometryBase = require("awayjs-core/lib/data/SubGeometryBase");
var Vector3D = require("awayjs-core/lib/geom/Vector3D");
var SubGeometryEvent = require("awayjs-core/lib/events/SubGeometryEvent");
/**
 * @class away.base.CurveSubGeometry
 */
var CurveSubGeometry = (function (_super) {
    __extends(CurveSubGeometry, _super);
    /**
     *
     */
    function CurveSubGeometry(concatenatedArrays) {
        _super.call(this, concatenatedArrays);
        this._positionsDirty = true;
        this._curvesDirty = true;
        this._faceNormalsDirty = true;
        this._vertexNormalsDirty = true;
        this._uvsDirty = true;
        this._secondaryUVsDirty = true;
        this._jointIndicesDirty = true;
        this._jointWeightsDirty = true;
        this._concatenateArrays = true;
        this._autoDeriveNormals = false;
        this._useFaceWeights = false;
        this._autoDeriveUVs = false;
        this._scaleU = 1;
        this._scaleV = 1;
    }
    Object.defineProperty(CurveSubGeometry.prototype, "subGeometryType", {
        get: function () {
            return CurveSubGeometry.SUB_GEOMETRY_TYPE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "scaleU", {
        /**
         *
         */
        get: function () {
            return this._scaleU;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "scaleV", {
        /**
         *
         */
        get: function () {
            return this._scaleV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "useCondensedIndices", {
        /**
         * Offers the option of enabling GPU accelerated animation on skeletons larger than 32 joints
         * by condensing the number of joint index values required per mesh. Only applicable to
         * skeleton animations that utilise more than one mesh object. Defaults to false.
         */
        get: function () {
            return this._useCondensedIndices;
        },
        set: function (value) {
            if (this._useCondensedIndices == value)
                return;
            this._useCondensedIndices = value;
        },
        enumerable: true,
        configurable: true
    });
    CurveSubGeometry.prototype._pUpdateStrideOffset = function () {
        if (this._concatenateArrays) {
            this._pOffset[CurveSubGeometry.VERTEX_DATA] = 0;
            //always have positions
            this._pOffset[CurveSubGeometry.POSITION_DATA] = 0;
            var stride = 3;
            if (this._curves != null) {
                this._pOffset[CurveSubGeometry.CURVE_DATA] = stride;
                stride += 2;
            }
            if (this._uvs != null) {
                this._pOffset[CurveSubGeometry.UV_DATA] = stride;
                stride += 2;
            }
            this._pStride[CurveSubGeometry.VERTEX_DATA] = stride;
            this._pStride[CurveSubGeometry.POSITION_DATA] = stride;
            this._pStride[CurveSubGeometry.CURVE_DATA] = stride;
            this._pStride[CurveSubGeometry.UV_DATA] = stride;
            var len = this._pNumVertices * stride;
            if (this._pVertices == null)
                this._pVertices = new Array(len);
            else if (this._pVertices.length != len)
                this._pVertices.length = len;
        }
        else {
            this._pOffset[CurveSubGeometry.POSITION_DATA] = 0;
            this._pOffset[CurveSubGeometry.CURVE_DATA] = 0;
            this._pOffset[CurveSubGeometry.UV_DATA] = 0;
            this._pStride[CurveSubGeometry.POSITION_DATA] = 3;
            this._pStride[CurveSubGeometry.CURVE_DATA] = 2;
            this._pStride[CurveSubGeometry.UV_DATA] = 2;
        }
        this._pStrideOffsetDirty = false;
    };
    Object.defineProperty(CurveSubGeometry.prototype, "autoDeriveUVs", {
        /**
         * Defines whether a UV buffer should be automatically generated to contain dummy UV coordinates.
         * Set to true if a geometry lacks UV data but uses a material that requires it, or leave as false
         * in cases where UV data is explicitly defined or the material does not require UV data.
         */
        get: function () {
            return this._autoDeriveUVs;
        },
        set: function (value) {
            if (this._autoDeriveUVs == value)
                return;
            this._autoDeriveUVs = value;
            if (value)
                this.notifyUVsUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "autoDeriveNormals", {
        /**
         * True if the vertex normals should be derived from the geometry, false if the vertex normals are set
         * explicitly.
         */
        get: function () {
            return this._autoDeriveNormals;
        },
        //remove
        set: function (value) {
            if (this._autoDeriveNormals == value)
                return;
            this._autoDeriveNormals = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "vertices", {
        /**
         *
         */
        get: function () {
            if (this._positionsDirty)
                this.updatePositions(this._positions);
            if (this._curvesDirty)
                this.updateCurves(this._curves);
            if (this._uvsDirty)
                this.updateUVs(this._uvs);
            return this._pVertices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "positions", {
        /**
         *
         */
        get: function () {
            if (this._positionsDirty)
                this.updatePositions(this._positions);
            return this._positions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "curves", {
        /**
         *
         */
        get: function () {
            if (this._curvesDirty)
                this.updateCurves(this._curves);
            return this._curves;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "faceNormals", {
        /**
         * The raw data of the face normals, in the same order as the faces are listed in the index list.
         */
        get: function () {
            if (this._faceNormalsDirty)
                this.updateFaceNormals();
            return this._faceNormals;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "uvs", {
        /**
         *
         */
        get: function () {
            if (this._uvsDirty)
                this.updateUVs(this._uvs);
            return this._uvs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "useFaceWeights", {
        /**
         * Indicates whether or not to take the size of faces into account when auto-deriving vertex normals and tangents.
         */
        get: function () {
            return this._useFaceWeights;
        },
        set: function (value) {
            if (this._useFaceWeights == value)
                return;
            this._useFaceWeights = value;
            this._faceNormalsDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurveSubGeometry.prototype, "condensedIndexLookUp", {
        get: function () {
            return this._condensedIndexLookUp;
        },
        enumerable: true,
        configurable: true
    });
    CurveSubGeometry.prototype.getBoundingPositions = function () {
        if (this._positionsDirty)
            this.updatePositions(this._positions);
        return this._positions;
    };
    /**
     *
     */
    CurveSubGeometry.prototype.updatePositions = function (values) {
        var i;
        var index;
        var stride;
        var positions;
        this._positions = values;
        if (this._positions == null)
            this._positions = new Array();
        this._pNumVertices = this._positions.length / 3;
        if (this._concatenateArrays) {
            var len = this._pNumVertices * this.getStride(CurveSubGeometry.VERTEX_DATA);
            if (this._pVertices == null)
                this._pVertices = new Array(len);
            else if (this._pVertices.length != len)
                this._pVertices.length = len;
            i = 0;
            index = this.getOffset(CurveSubGeometry.POSITION_DATA);
            stride = this.getStride(CurveSubGeometry.POSITION_DATA);
            positions = this._pVertices;
            while (i < values.length) {
                positions[index] = values[i++];
                positions[index + 1] = values[i++];
                positions[index + 2] = values[i++];
                index += stride;
            }
        }
        this.pInvalidateBounds();
        this.notifyPositionsUpdate();
        this._positionsDirty = false;
    };
    /**
     * Updates the vertex normals based on the geometry.
     */
    CurveSubGeometry.prototype.updateCurves = function (values) {
        var i;
        var index;
        var offset;
        var stride;
        var curves;
        if (true) {
            if ((this._curves == null || values == null) && (this._curves != null || values != null)) {
                if (this._concatenateArrays)
                    this._pNotifyVerticesUpdate();
                else
                    this._pStrideOffsetDirty = true;
            }
            this._curves = values;
            if (values != null && this._concatenateArrays) {
                i = 0;
                index = this.getOffset(CurveSubGeometry.CURVE_DATA);
                stride = this.getStride(CurveSubGeometry.CURVE_DATA);
                curves = this._pVertices;
                while (i < values.length) {
                    curves[index] = values[i++];
                    curves[index + 1] = values[i++];
                    index += stride;
                }
            }
        }
        this.notifyCurvesUpdate();
        this._curvesDirty = false;
    };
    /**
     * Updates the uvs based on the geometry.
     */
    CurveSubGeometry.prototype.updateUVs = function (values) {
        var i;
        var index;
        var offset;
        var stride;
        var uvs;
        if (!this._autoDeriveUVs) {
            if ((this._uvs == null || values == null) && (this._uvs != null || values != null)) {
                if (this._concatenateArrays)
                    this._pNotifyVerticesUpdate();
                else
                    this._pStrideOffsetDirty = true;
            }
            this._uvs = values;
            if (values != null && this._concatenateArrays) {
                i = 0;
                index = this.getOffset(CurveSubGeometry.UV_DATA);
                stride = this.getStride(CurveSubGeometry.UV_DATA);
                uvs = this._pVertices;
                while (i < values.length) {
                    uvs[index] = values[i++];
                    uvs[index + 1] = values[i++];
                    index += stride;
                }
            }
        }
        else {
            if (this._uvs == null) {
                this._uvs = new Array(this._positions.length * 2 / 3);
                if (this._concatenateArrays)
                    this._pNotifyVerticesUpdate();
                else
                    this._pStrideOffsetDirty = true;
            }
            offset = this.getOffset(CurveSubGeometry.UV_DATA);
            stride = this.getStride(CurveSubGeometry.UV_DATA);
            //autoderived uvs
            uvs = this._concatenateArrays ? this._pVertices : this._uvs;
            i = 0;
            index = offset;
            var uvIdx = 0;
            //clear uv values
            var lenV = uvs.length;
            while (index < lenV) {
                if (this._concatenateArrays) {
                    this._uvs[i++] = uvs[index] = uvIdx * .5;
                    this._uvs[i++] = uvs[index + 1] = 1.0 - (uvIdx & 1);
                }
                else {
                    uvs[index] = uvIdx * .5;
                    uvs[index + 1] = 1.0 - (uvIdx & 1);
                }
                if (++uvIdx == 3)
                    uvIdx = 0;
                index += stride;
            }
        }
        this.notifyUVsUpdate();
        this._uvsDirty = false;
    };
    /**
     *
     */
    CurveSubGeometry.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._positions = null;
        this._curves = null;
        this._uvs = null;
        this._faceNormals = null;
        this._faceWeights = null;
    };
    /**
     * Updates the face indices of the CurveSubGeometry.
     *
     * @param indices The face indices to upload.
     */
    CurveSubGeometry.prototype.updateIndices = function (indices) {
        _super.prototype.updateIndices.call(this, indices);
        this._faceNormalsDirty = true;
        if (this._autoDeriveNormals)
            this._vertexNormalsDirty = true;
    };
    /**
     * Clones the current object
     * @return An exact duplicate of the current object.
     */
    CurveSubGeometry.prototype.clone = function () {
        var clone = new CurveSubGeometry(this._concatenateArrays);
        clone.updateIndices(this._pIndices.concat());
        clone.updatePositions(this._positions.concat());
        if (this._curves)
            clone.updateCurves(this._curves.concat());
        else
            clone.updateCurves(null);
        if (this._uvs && !this._autoDeriveUVs)
            clone.updateUVs(this._uvs.concat());
        else
            clone.updateUVs(null);
        return clone;
    };
    CurveSubGeometry.prototype.scaleUV = function (scaleU, scaleV) {
        if (scaleU === void 0) { scaleU = 1; }
        if (scaleV === void 0) { scaleV = 1; }
        var index;
        var offset;
        var stride;
        var uvs;
        uvs = this._uvs;
        var ratioU = scaleU / this._scaleU;
        var ratioV = scaleV / this._scaleV;
        this._scaleU = scaleU;
        this._scaleV = scaleV;
        var len = uvs.length;
        offset = 0;
        stride = 2;
        index = offset;
        while (index < len) {
            uvs[index] *= ratioU;
            uvs[index + 1] *= ratioV;
            index += stride;
        }
        this.notifyUVsUpdate();
    };
    /**
     * Scales the geometry.
     * @param scale The amount by which to scale.
     */
    CurveSubGeometry.prototype.scale = function (scale) {
        var i;
        var index;
        var offset;
        var stride;
        var positions;
        positions = this._positions;
        var len = positions.length;
        offset = 0;
        stride = 3;
        i = 0;
        index = offset;
        while (i < len) {
            positions[index] *= scale;
            positions[index + 1] *= scale;
            positions[index + 2] *= scale;
            i += 3;
            index += stride;
        }
        this.notifyPositionsUpdate();
    };
    CurveSubGeometry.prototype.applyTransformation = function (transform) {
        var positions;
        if (this._concatenateArrays) {
            positions = this._pVertices;
        }
        else {
            positions = this._positions;
        }
        var len = this._positions.length / 3;
        var i;
        var i1;
        var i2;
        var vector = new Vector3D();
        var invTranspose;
        var vi0 = this.getOffset(CurveSubGeometry.POSITION_DATA);
        var vStride = this.getStride(CurveSubGeometry.POSITION_DATA);
        for (i = 0; i < len; ++i) {
            i1 = vi0 + 1;
            i2 = vi0 + 2;
            // bake position
            vector.x = positions[vi0];
            vector.y = positions[i1];
            vector.z = positions[i2];
            vector = transform.transformVector(vector);
            positions[vi0] = vector.x;
            positions[i1] = vector.y;
            positions[i2] = vector.z;
            vi0 += vStride;
        }
        this.notifyPositionsUpdate();
    };
    /**
     * Updates the normals for each face.
     */
    CurveSubGeometry.prototype.updateFaceNormals = function () {
        var i = 0;
        var j = 0;
        var k = 0;
        var index;
        var offset;
        var stride;
        var x1, x2, x3;
        var y1, y2, y3;
        var z1, z2, z3;
        var dx1, dy1, dz1;
        var dx2, dy2, dz2;
        var cx, cy, cz;
        var d;
        var positions = this._positions;
        var len = this._pIndices.length;
        if (this._faceNormals == null)
            this._faceNormals = new Array(len);
        if (this._useFaceWeights && this._faceWeights == null)
            this._faceWeights = new Array(len / 3);
        while (i < len) {
            index = this._pIndices[i++] * 3;
            x1 = positions[index];
            y1 = positions[index + 1];
            z1 = positions[index + 2];
            index = this._pIndices[i++] * 3;
            x2 = positions[index];
            y2 = positions[index + 1];
            z2 = positions[index + 2];
            index = this._pIndices[i++] * 3;
            x3 = positions[index];
            y3 = positions[index + 1];
            z3 = positions[index + 2];
            dx1 = x3 - x1;
            dy1 = y3 - y1;
            dz1 = z3 - z1;
            dx2 = x2 - x1;
            dy2 = y2 - y1;
            dz2 = z2 - z1;
            cx = dz1 * dy2 - dy1 * dz2;
            cy = dx1 * dz2 - dz1 * dx2;
            cz = dy1 * dx2 - dx1 * dy2;
            d = Math.sqrt(cx * cx + cy * cy + cz * cz);
            // length of cross product = 2*triangle area
            if (this._useFaceWeights) {
                var w = d * 10000;
                if (w < 1)
                    w = 1;
                this._faceWeights[k++] = w;
            }
            d = 1 / d;
            this._faceNormals[j++] = cx * d;
            this._faceNormals[j++] = cy * d;
            this._faceNormals[j++] = cz * d;
        }
        this._faceNormalsDirty = false;
    };
    CurveSubGeometry.prototype._pNotifyVerticesUpdate = function () {
        this._pStrideOffsetDirty = true;
        this.notifyPositionsUpdate();
        this.notifyCurvesUpdate();
        this.notifyUVsUpdate();
    };
    CurveSubGeometry.prototype.notifyPositionsUpdate = function () {
        if (this._positionsDirty)
            return;
        this._positionsDirty = true;
        if (!this._positionsUpdated)
            this._positionsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, CurveSubGeometry.POSITION_DATA);
        this.dispatchEvent(this._positionsUpdated);
    };
    CurveSubGeometry.prototype.notifyCurvesUpdate = function () {
        if (this._curvesDirty)
            return;
        this._curvesDirty = true;
        if (!this._curvesUpdated)
            this._curvesUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, CurveSubGeometry.CURVE_DATA);
        this.dispatchEvent(this._curvesUpdated);
    };
    CurveSubGeometry.prototype.notifyUVsUpdate = function () {
        if (this._uvsDirty)
            return;
        this._uvsDirty = true;
        if (!this._uvsUpdated)
            this._uvsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, CurveSubGeometry.UV_DATA);
        this.dispatchEvent(this._uvsUpdated);
    };
    CurveSubGeometry.SUB_GEOMETRY_TYPE = "curve";
    CurveSubGeometry.POSITION_DATA = "positions";
    CurveSubGeometry.CURVE_DATA = "curves";
    CurveSubGeometry.UV_DATA = "uvs";
    //TODO - move these to StageGL
    CurveSubGeometry.POSITION_FORMAT = "float3";
    CurveSubGeometry.CURVE_FORMAT = "float2";
    CurveSubGeometry.UV_FORMAT = "float2";
    return CurveSubGeometry;
})(SubGeometryBase);
module.exports = CurveSubGeometry;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9kYXRhL0N1cnZlU3ViR2VvbWV0cnkudHMiXSwibmFtZXMiOlsiQ3VydmVTdWJHZW9tZXRyeSIsIkN1cnZlU3ViR2VvbWV0cnkuY29uc3RydWN0b3IiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnN1Ykdlb21ldHJ5VHlwZSIsIkN1cnZlU3ViR2VvbWV0cnkuc2NhbGVVIiwiQ3VydmVTdWJHZW9tZXRyeS5zY2FsZVYiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnVzZUNvbmRlbnNlZEluZGljZXMiLCJDdXJ2ZVN1Ykdlb21ldHJ5Ll9wVXBkYXRlU3RyaWRlT2Zmc2V0IiwiQ3VydmVTdWJHZW9tZXRyeS5hdXRvRGVyaXZlVVZzIiwiQ3VydmVTdWJHZW9tZXRyeS5hdXRvRGVyaXZlTm9ybWFscyIsIkN1cnZlU3ViR2VvbWV0cnkudmVydGljZXMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnBvc2l0aW9ucyIsIkN1cnZlU3ViR2VvbWV0cnkuY3VydmVzIiwiQ3VydmVTdWJHZW9tZXRyeS5mYWNlTm9ybWFscyIsIkN1cnZlU3ViR2VvbWV0cnkudXZzIiwiQ3VydmVTdWJHZW9tZXRyeS51c2VGYWNlV2VpZ2h0cyIsIkN1cnZlU3ViR2VvbWV0cnkuY29uZGVuc2VkSW5kZXhMb29rVXAiLCJDdXJ2ZVN1Ykdlb21ldHJ5LmdldEJvdW5kaW5nUG9zaXRpb25zIiwiQ3VydmVTdWJHZW9tZXRyeS51cGRhdGVQb3NpdGlvbnMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnVwZGF0ZUN1cnZlcyIsIkN1cnZlU3ViR2VvbWV0cnkudXBkYXRlVVZzIiwiQ3VydmVTdWJHZW9tZXRyeS5kaXNwb3NlIiwiQ3VydmVTdWJHZW9tZXRyeS51cGRhdGVJbmRpY2VzIiwiQ3VydmVTdWJHZW9tZXRyeS5jbG9uZSIsIkN1cnZlU3ViR2VvbWV0cnkuc2NhbGVVViIsIkN1cnZlU3ViR2VvbWV0cnkuc2NhbGUiLCJDdXJ2ZVN1Ykdlb21ldHJ5LmFwcGx5VHJhbnNmb3JtYXRpb24iLCJDdXJ2ZVN1Ykdlb21ldHJ5LnVwZGF0ZUZhY2VOb3JtYWxzIiwiQ3VydmVTdWJHZW9tZXRyeS5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlIiwiQ3VydmVTdWJHZW9tZXRyeS5ub3RpZnlQb3NpdGlvbnNVcGRhdGUiLCJDdXJ2ZVN1Ykdlb21ldHJ5Lm5vdGlmeUN1cnZlc1VwZGF0ZSIsIkN1cnZlU3ViR2VvbWV0cnkubm90aWZ5VVZzVXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLGVBQWUsV0FBYSxzQ0FBc0MsQ0FBQyxDQUFDO0FBRTNFLElBQU8sUUFBUSxXQUFlLCtCQUErQixDQUFDLENBQUM7QUFDL0QsSUFBTyxnQkFBZ0IsV0FBYSx5Q0FBeUMsQ0FBQyxDQUFDO0FBRS9FLEFBR0E7O0dBREc7SUFDRyxnQkFBZ0I7SUFBU0EsVUFBekJBLGdCQUFnQkEsVUFBd0JBO0lBaVI3Q0E7O09BRUdBO0lBQ0hBLFNBcFJLQSxnQkFBZ0JBLENBb1JUQSxrQkFBMEJBO1FBRXJDQyxrQkFBTUEsa0JBQWtCQSxDQUFDQSxDQUFDQTtRQXpRbkJBLG9CQUFlQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUMvQkEsaUJBQVlBLEdBQVdBLElBQUlBLENBQUNBO1FBQzVCQSxzQkFBaUJBLEdBQVdBLElBQUlBLENBQUNBO1FBQzlCQSx3QkFBbUJBLEdBQVdBLElBQUlBLENBQUNBO1FBQ3RDQSxjQUFTQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUN6QkEsdUJBQWtCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUNsQ0EsdUJBQWtCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUNsQ0EsdUJBQWtCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQVlsQ0EsdUJBQWtCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUNsQ0EsdUJBQWtCQSxHQUFXQSxLQUFLQSxDQUFDQTtRQUNuQ0Esb0JBQWVBLEdBQVdBLEtBQUtBLENBQUNBO1FBQzdCQSxtQkFBY0EsR0FBV0EsS0FBS0EsQ0FBQ0E7UUFLbENBLFlBQU9BLEdBQVVBLENBQUNBLENBQUNBO1FBQ25CQSxZQUFPQSxHQUFVQSxDQUFD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LENBQUNBLGFBQWFBLEdBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7WUFFakZBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLElBQUlBLElBQUlBLENBQUNBO2dCQUMzQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsSUFBSUEsS0FBS0EsQ0FBU0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDMUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLElBQUlBLEdBQUdBLENBQUNBO2dCQUN0Q0EsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFFOUJBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ05BLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7WUFDdkRBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7WUFDeERBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1lBRTVCQSxPQUFPQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtnQkFDMUJBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO2dCQUMvQkEsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ25DQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDbkNBLEtBQUtBLElBQUlBLE1BQU1BLENBQUNB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LEVBQUVBLEVBQVNBLENBQUNBO1FBQ3BDQSxJQUFJQSxDQUFRQSxDQUFDQTtRQUViQSxJQUFJQSxTQUFTQSxHQUFpQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0E7UUFFOUNBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBO1FBRXZDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxJQUFJQSxJQUFJQSxDQUFDQTtZQUM3QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsS0FBS0EsQ0FBU0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFFNUNBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGVBQWVBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLElBQUlBLElBQUlBLENBQUNBO1lBQ3JEQSxJQUFJQSxDQUFDQSxZQUFZQSxHQUFHQSxJQUFJQSxLQUFLQSxDQUFTQSxHQUFHQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUU5Q0EsT0FBT0EsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDaEJBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1lBQzlCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUN0QkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQzFCQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtZQUM5QkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQzFCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQkEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDOUJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBQ3RCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ2RBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ2RBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ2RBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ2RBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ2RBLEdBQUdBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ2RBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBO1lBQ3ZCQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQTtZQUN2QkEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0E7WUFDdkJBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLEdBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUNBLEVBQUVB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Q0EsV0FBV0EsR0FBR0EsSUFBSUEsZ0JBQWdCQSxDQUFDQSxnQkFBZ0JBLENBQUNBLGdCQUFnQkEsRUFBRUEsZ0JBQWdCQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtRQUV6R0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7SUFDekNBLENBQUNBO0lBanVCVTlCLGtDQUFpQkEsR0FBVUEsT0FBT0EsQ0FBQ0E7SUFFbkNBLDhCQUFhQSxHQUFVQSxXQUFXQSxDQUFDQTtJQUNoQ0EsMkJBQVVBLEdBQVVBLFFBQVFBLENBQUNBO0lBQ2hDQSx3QkFBT0EsR0FBVUEsS0FBS0EsQ0FBQ0E7SUFFckNBLDhCQUE4QkE7SUFDaEJBLGdDQUFlQSxHQUFVQSxRQUFRQSxDQUFDQTtJQUNsQ0EsNkJBQVlBLEdBQVVBLFFBQVFBLENBQUNBO0lBQy9CQSwwQkFBU0EsR0FBVUEsUUFBUUEsQ0FBQ0E7SUF5dEIzQ0EsdUJBQUNBO0FBQURBLENBcHVCQSxBQW91QkNBLEVBcHVCOEIsZUFBZSxFQW91QjdDO0FBRUQsQUFBMEIsaUJBQWpCLGdCQUFnQixDQUFDIiwiZmlsZSI6ImRhdGEvQ3VydmVTdWJHZW9tZXRyeS5qcyIsInNvdXJjZVJvb3QiOiIuLi8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3ViR2VvbWV0cnlCYXNlXHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2RhdGEvU3ViR2VvbWV0cnlCYXNlXCIpO1xuaW1wb3J0IE1hdHJpeDNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeDNEXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9nZW9tL1ZlY3RvcjNEXCIpO1xuaW1wb3J0IFN1Ykdlb21ldHJ5RXZlbnRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZXZlbnRzL1N1Ykdlb21ldHJ5RXZlbnRcIik7XG5cbi8qKlxuICogQGNsYXNzIGF3YXkuYmFzZS5DdXJ2ZVN1Ykdlb21ldHJ5XG4gKi9cbmNsYXNzIEN1cnZlU3ViR2VvbWV0cnkgZXh0ZW5kcyBTdWJHZW9tZXRyeUJhc2Vcbntcblx0cHVibGljIHN0YXRpYyBTVUJfR0VPTUVUUllfVFlQRTpzdHJpbmcgPSBcImN1cnZlXCI7XG5cblx0cHVibGljIHN0YXRpYyBQT1NJVElPTl9EQVRBOnN0cmluZyA9IFwicG9zaXRpb25zXCI7XG4gICAgcHVibGljIHN0YXRpYyBDVVJWRV9EQVRBOnN0cmluZyA9IFwiY3VydmVzXCI7XG5cdHB1YmxpYyBzdGF0aWMgVVZfREFUQTpzdHJpbmcgPSBcInV2c1wiO1xuXG5cdC8vVE9ETyAtIG1vdmUgdGhlc2UgdG8gU3RhZ2VHTFxuXHRwdWJsaWMgc3RhdGljIFBPU0lUSU9OX0ZPUk1BVDpzdHJpbmcgPSBcImZsb2F0M1wiO1xuXHRwdWJsaWMgc3RhdGljIENVUlZFX0ZPUk1BVDpzdHJpbmcgPSBcImZsb2F0MlwiO1xuXHRwdWJsaWMgc3RhdGljIFVWX0ZPUk1BVDpzdHJpbmcgPSBcImZsb2F0MlwiO1xuXG5cdHByaXZhdGUgX3Bvc2l0aW9uc0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9jdXJ2ZXNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfZmFjZU5vcm1hbHNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcbiAgICBwcml2YXRlIF92ZXJ0ZXhOb3JtYWxzRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX3V2c0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9zZWNvbmRhcnlVVnNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfam9pbnRJbmRpY2VzRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2pvaW50V2VpZ2h0c0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXG5cdHByaXZhdGUgX3Bvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXHRwcml2YXRlIF9jdXJ2ZXM6QXJyYXk8bnVtYmVyPjtcblx0cHJpdmF0ZSBfdXZzOkFycmF5PG51bWJlcj47XG5cblxuXHRwcml2YXRlIF91c2VDb25kZW5zZWRJbmRpY2VzOmJvb2xlYW47XG5cdHByaXZhdGUgX2NvbmRlbnNlZEpvaW50SW5kaWNlczpBcnJheTxudW1iZXI+O1xuXHRwcml2YXRlIF9jb25kZW5zZWRJbmRleExvb2tVcDpBcnJheTxudW1iZXI+O1xuXG5cblx0cHJpdmF0ZSBfY29uY2F0ZW5hdGVBcnJheXM6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2F1dG9EZXJpdmVOb3JtYWxzOmJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSBfdXNlRmFjZVdlaWdodHM6Ym9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2F1dG9EZXJpdmVVVnM6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdHByaXZhdGUgX2ZhY2VOb3JtYWxzOkFycmF5PG51bWJlcj47XG5cdHByaXZhdGUgX2ZhY2VXZWlnaHRzOkFycmF5PG51bWJlcj47XG5cblx0cHJpdmF0ZSBfc2NhbGVVOm51bWJlciA9IDE7XG5cdHByaXZhdGUgX3NjYWxlVjpudW1iZXIgPSAxO1xuXG5cdHByaXZhdGUgX3Bvc2l0aW9uc1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcblx0cHJpdmF0ZSBfY3VydmVzVXBkYXRlZDpTdWJHZW9tZXRyeUV2ZW50O1xuXHRwcml2YXRlIF91dnNVcGRhdGVkOlN1Ykdlb21ldHJ5RXZlbnQ7XG5cdHByaXZhdGUgX3NlY29uZGFyeVVWc1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcblxuXG5cdHB1YmxpYyBnZXQgc3ViR2VvbWV0cnlUeXBlKCk6c3RyaW5nXG5cdHtcblx0XHRyZXR1cm4gQ3VydmVTdWJHZW9tZXRyeS5TVUJfR0VPTUVUUllfVFlQRTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBzY2FsZVUoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zY2FsZVU7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgc2NhbGVWKCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2NhbGVWO1xuXHR9XG5cblx0LyoqXG5cdCAqIE9mZmVycyB0aGUgb3B0aW9uIG9mIGVuYWJsaW5nIEdQVSBhY2NlbGVyYXRlZCBhbmltYXRpb24gb24gc2tlbGV0b25zIGxhcmdlciB0aGFuIDMyIGpvaW50c1xuXHQgKiBieSBjb25kZW5zaW5nIHRoZSBudW1iZXIgb2Ygam9pbnQgaW5kZXggdmFsdWVzIHJlcXVpcmVkIHBlciBtZXNoLiBPbmx5IGFwcGxpY2FibGUgdG9cblx0ICogc2tlbGV0b24gYW5pbWF0aW9ucyB0aGF0IHV0aWxpc2UgbW9yZSB0aGFuIG9uZSBtZXNoIG9iamVjdC4gRGVmYXVsdHMgdG8gZmFsc2UuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHVzZUNvbmRlbnNlZEluZGljZXMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXNlQ29uZGVuc2VkSW5kaWNlcztcblx0fVxuXG5cdHB1YmxpYyBzZXQgdXNlQ29uZGVuc2VkSW5kaWNlcyh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3VzZUNvbmRlbnNlZEluZGljZXMgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl91c2VDb25kZW5zZWRJbmRpY2VzID0gdmFsdWU7XG5cdH1cblxuXHRwdWJsaWMgX3BVcGRhdGVTdHJpZGVPZmZzZXQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XG5cdFx0XHR0aGlzLl9wT2Zmc2V0W0N1cnZlU3ViR2VvbWV0cnkuVkVSVEVYX0RBVEFdID0gMDtcblxuXHRcdFx0Ly9hbHdheXMgaGF2ZSBwb3NpdGlvbnNcblx0XHRcdHRoaXMuX3BPZmZzZXRbQ3VydmVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBXSA9IDA7XG5cdFx0XHR2YXIgc3RyaWRlOm51bWJlciA9IDM7XG5cblx0XHRcdGlmICh0aGlzLl9jdXJ2ZXMgIT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLl9wT2Zmc2V0W0N1cnZlU3ViR2VvbWV0cnkuQ1VSVkVfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHRcdHN0cmlkZSArPSAyO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fdXZzICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fcE9mZnNldFtDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEFdID0gc3RyaWRlO1xuXHRcdFx0XHRzdHJpZGUgKz0gMjtcblx0XHRcdH1cblxuXG5cblx0XHRcdHRoaXMuX3BTdHJpZGVbQ3VydmVTdWJHZW9tZXRyeS5WRVJURVhfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW0N1cnZlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQV0gPSBzdHJpZGU7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW0N1cnZlU3ViR2VvbWV0cnkuQ1VSVkVfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW0N1cnZlU3ViR2VvbWV0cnkuVVZfREFUQV0gPSBzdHJpZGU7XG5cblx0XHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcE51bVZlcnRpY2VzKnN0cmlkZTtcblxuXHRcdFx0aWYgKHRoaXMuX3BWZXJ0aWNlcyA9PSBudWxsKVxuXHRcdFx0XHR0aGlzLl9wVmVydGljZXMgPSBuZXcgQXJyYXk8bnVtYmVyPihsZW4pO1xuXHRcdFx0ZWxzZSBpZiAodGhpcy5fcFZlcnRpY2VzLmxlbmd0aCAhPSBsZW4pXG5cdFx0XHRcdHRoaXMuX3BWZXJ0aWNlcy5sZW5ndGggPSBsZW47XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcE9mZnNldFtDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEFdID0gMDtcblx0XHRcdHRoaXMuX3BPZmZzZXRbQ3VydmVTdWJHZW9tZXRyeS5DVVJWRV9EQVRBXSA9IDA7XG5cdFx0XHR0aGlzLl9wT2Zmc2V0W0N1cnZlU3ViR2VvbWV0cnkuVVZfREFUQV0gPSAwO1xuXG5cblx0XHRcdHRoaXMuX3BTdHJpZGVbQ3VydmVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBXSA9IDM7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW0N1cnZlU3ViR2VvbWV0cnkuQ1VSVkVfREFUQV0gPSAyO1xuXHRcdFx0dGhpcy5fcFN0cmlkZVtDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEFdID0gMjtcblx0XHR9XG5cblx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSBmYWxzZTtcblx0fVxuXG5cblxuXHQvKipcblx0ICogRGVmaW5lcyB3aGV0aGVyIGEgVVYgYnVmZmVyIHNob3VsZCBiZSBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCB0byBjb250YWluIGR1bW15IFVWIGNvb3JkaW5hdGVzLlxuXHQgKiBTZXQgdG8gdHJ1ZSBpZiBhIGdlb21ldHJ5IGxhY2tzIFVWIGRhdGEgYnV0IHVzZXMgYSBtYXRlcmlhbCB0aGF0IHJlcXVpcmVzIGl0LCBvciBsZWF2ZSBhcyBmYWxzZVxuXHQgKiBpbiBjYXNlcyB3aGVyZSBVViBkYXRhIGlzIGV4cGxpY2l0bHkgZGVmaW5lZCBvciB0aGUgbWF0ZXJpYWwgZG9lcyBub3QgcmVxdWlyZSBVViBkYXRhLlxuXHQgKi9cblx0cHVibGljIGdldCBhdXRvRGVyaXZlVVZzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2F1dG9EZXJpdmVVVnM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGF1dG9EZXJpdmVVVnModmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9hdXRvRGVyaXZlVVZzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYXV0b0Rlcml2ZVVWcyA9IHZhbHVlO1xuXG5cdFx0aWYgKHZhbHVlKVxuXHRcdFx0dGhpcy5ub3RpZnlVVnNVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUcnVlIGlmIHRoZSB2ZXJ0ZXggbm9ybWFscyBzaG91bGQgYmUgZGVyaXZlZCBmcm9tIHRoZSBnZW9tZXRyeSwgZmFsc2UgaWYgdGhlIHZlcnRleCBub3JtYWxzIGFyZSBzZXRcblx0ICogZXhwbGljaXRseS5cblx0ICovXG5cdHB1YmxpYyBnZXQgYXV0b0Rlcml2ZU5vcm1hbHMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYXV0b0Rlcml2ZU5vcm1hbHM7XG5cdH1cblxuICAgIC8vcmVtb3ZlXG5cdHB1YmxpYyBzZXQgYXV0b0Rlcml2ZU5vcm1hbHModmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9hdXRvRGVyaXZlTm9ybWFscyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2F1dG9EZXJpdmVOb3JtYWxzID0gdmFsdWU7XG5cblx0fVxuXG5cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgdmVydGljZXMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fcG9zaXRpb25zRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVBvc2l0aW9ucyh0aGlzLl9wb3NpdGlvbnMpO1xuXG4gICAgICAgIGlmICh0aGlzLl9jdXJ2ZXNEaXJ0eSlcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ3VydmVzKHRoaXMuX2N1cnZlcyk7XG5cblx0XHRpZiAodGhpcy5fdXZzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVVWcyh0aGlzLl91dnMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3BWZXJ0aWNlcztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBwb3NpdGlvbnMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fcG9zaXRpb25zRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVBvc2l0aW9ucyh0aGlzLl9wb3NpdGlvbnMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBjdXJ2ZXMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fY3VydmVzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZUN1cnZlcyh0aGlzLl9jdXJ2ZXMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2N1cnZlcztcblx0fVxuXG5cblxuXHQvKipcblx0ICogVGhlIHJhdyBkYXRhIG9mIHRoZSBmYWNlIG5vcm1hbHMsIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSBmYWNlcyBhcmUgbGlzdGVkIGluIHRoZSBpbmRleCBsaXN0LlxuXHQgKi9cblx0cHVibGljIGdldCBmYWNlTm9ybWFscygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdGlmICh0aGlzLl9mYWNlTm9ybWFsc0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVGYWNlTm9ybWFscygpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2ZhY2VOb3JtYWxzO1xuXHR9XG5cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgdXZzKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0aWYgKHRoaXMuX3V2c0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVVVnModGhpcy5fdXZzKTtcblxuXHRcdHJldHVybiB0aGlzLl91dnM7XG5cdH1cblxuXG5cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRvIHRha2UgdGhlIHNpemUgb2YgZmFjZXMgaW50byBhY2NvdW50IHdoZW4gYXV0by1kZXJpdmluZyB2ZXJ0ZXggbm9ybWFscyBhbmQgdGFuZ2VudHMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHVzZUZhY2VXZWlnaHRzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3VzZUZhY2VXZWlnaHRzO1xuXHR9XG5cblx0cHVibGljIHNldCB1c2VGYWNlV2VpZ2h0cyh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3VzZUZhY2VXZWlnaHRzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fdXNlRmFjZVdlaWdodHMgPSB2YWx1ZTtcblxuXG5cdFx0dGhpcy5fZmFjZU5vcm1hbHNEaXJ0eSA9IHRydWU7XG5cdH1cblxuXG5cdHB1YmxpYyBnZXQgY29uZGVuc2VkSW5kZXhMb29rVXAoKTpBcnJheTxudW1iZXI+XG5cdHtcblxuXG5cdFx0cmV0dXJuIHRoaXMuX2NvbmRlbnNlZEluZGV4TG9va1VwO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihjb25jYXRlbmF0ZWRBcnJheXM6Ym9vbGVhbilcblx0e1xuXHRcdHN1cGVyKGNvbmNhdGVuYXRlZEFycmF5cyk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0Qm91bmRpbmdQb3NpdGlvbnMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fcG9zaXRpb25zRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVBvc2l0aW9ucyh0aGlzLl9wb3NpdGlvbnMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIHVwZGF0ZVBvc2l0aW9ucyh2YWx1ZXM6QXJyYXk8bnVtYmVyPilcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xuXHRcdHZhciBwb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdHRoaXMuX3Bvc2l0aW9ucyA9IHZhbHVlcztcblxuXHRcdGlmICh0aGlzLl9wb3NpdGlvbnMgPT0gbnVsbClcblx0XHRcdHRoaXMuX3Bvc2l0aW9ucyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG5cblx0XHR0aGlzLl9wTnVtVmVydGljZXMgPSB0aGlzLl9wb3NpdGlvbnMubGVuZ3RoLzM7XG5cblx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcblx0XHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcE51bVZlcnRpY2VzKnRoaXMuZ2V0U3RyaWRlKEN1cnZlU3ViR2VvbWV0cnkuVkVSVEVYX0RBVEEpO1xuXG5cdFx0XHRpZiAodGhpcy5fcFZlcnRpY2VzID09IG51bGwpXG5cdFx0XHRcdHRoaXMuX3BWZXJ0aWNlcyA9IG5ldyBBcnJheTxudW1iZXI+KGxlbik7XG5cdFx0XHRlbHNlIGlmICh0aGlzLl9wVmVydGljZXMubGVuZ3RoICE9IGxlbilcblx0XHRcdFx0dGhpcy5fcFZlcnRpY2VzLmxlbmd0aCA9IGxlbjtcblxuXHRcdFx0aSA9IDA7XG5cdFx0XHRpbmRleCA9IHRoaXMuZ2V0T2Zmc2V0KEN1cnZlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQSk7XG5cdFx0XHRzdHJpZGUgPSB0aGlzLmdldFN0cmlkZShDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEEpO1xuXHRcdFx0cG9zaXRpb25zID0gdGhpcy5fcFZlcnRpY2VzO1xuXG5cdFx0XHR3aGlsZSAoaSA8IHZhbHVlcy5sZW5ndGgpIHtcblx0XHRcdFx0cG9zaXRpb25zW2luZGV4XSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRwb3NpdGlvbnNbaW5kZXggKyAxXSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRwb3NpdGlvbnNbaW5kZXggKyAyXSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5wSW52YWxpZGF0ZUJvdW5kcygpO1xuXG5cdFx0dGhpcy5ub3RpZnlQb3NpdGlvbnNVcGRhdGUoKTtcblxuXHRcdHRoaXMuX3Bvc2l0aW9uc0RpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgdmVydGV4IG5vcm1hbHMgYmFzZWQgb24gdGhlIGdlb21ldHJ5LlxuXHQgKi9cblx0cHVibGljIHVwZGF0ZUN1cnZlcyh2YWx1ZXM6QXJyYXk8bnVtYmVyPilcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xuXHRcdHZhciBvZmZzZXQ6bnVtYmVyO1xuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xuXHRcdHZhciBjdXJ2ZXM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdGlmICh0cnVlKSB7XG5cdFx0XHRpZiAoKHRoaXMuX2N1cnZlcyA9PSBudWxsIHx8IHZhbHVlcyA9PSBudWxsKSAmJiAodGhpcy5fY3VydmVzICE9IG51bGwgfHwgdmFsdWVzICE9IG51bGwpKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cylcblx0XHRcdFx0XHR0aGlzLl9wTm90aWZ5VmVydGljZXNVcGRhdGUoKTtcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2N1cnZlcyA9IHZhbHVlcztcblxuXHRcdFx0aWYgKHZhbHVlcyAhPSBudWxsICYmIHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XG5cdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRpbmRleCA9IHRoaXMuZ2V0T2Zmc2V0KEN1cnZlU3ViR2VvbWV0cnkuQ1VSVkVfREFUQSk7XG5cdFx0XHRcdHN0cmlkZSA9IHRoaXMuZ2V0U3RyaWRlKEN1cnZlU3ViR2VvbWV0cnkuQ1VSVkVfREFUQSk7XG4gICAgICAgICAgICAgICAgY3VydmVzID0gdGhpcy5fcFZlcnRpY2VzO1xuXG5cdFx0XHRcdHdoaWxlIChpIDwgdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJ2ZXNbaW5kZXhdID0gdmFsdWVzW2krK107XG4gICAgICAgICAgICAgICAgICAgIGN1cnZlc1tpbmRleCArIDFdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMubm90aWZ5Q3VydmVzVXBkYXRlKCk7XG5cblx0XHR0aGlzLl9jdXJ2ZXNEaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSB1dnMgYmFzZWQgb24gdGhlIGdlb21ldHJ5LlxuXHQgKi9cblx0cHVibGljIHVwZGF0ZVVWcyh2YWx1ZXM6QXJyYXk8bnVtYmVyPilcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xuXHRcdHZhciBvZmZzZXQ6bnVtYmVyO1xuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xuXHRcdHZhciB1dnM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdGlmICghdGhpcy5fYXV0b0Rlcml2ZVVWcykge1xuXHRcdFx0aWYgKCh0aGlzLl91dnMgPT0gbnVsbCB8fCB2YWx1ZXMgPT0gbnVsbCkgJiYgKHRoaXMuX3V2cyAhPSBudWxsIHx8IHZhbHVlcyAhPSBudWxsKSkge1xuXHRcdFx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpXG5cdFx0XHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl91dnMgPSB2YWx1ZXM7XG5cblx0XHRcdGlmICh2YWx1ZXMgIT0gbnVsbCAmJiB0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xuXHRcdFx0XHRpID0gMDtcblx0XHRcdFx0aW5kZXggPSB0aGlzLmdldE9mZnNldChDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEEpO1xuXHRcdFx0XHRzdHJpZGUgPSB0aGlzLmdldFN0cmlkZShDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEEpO1xuXHRcdFx0XHR1dnMgPSB0aGlzLl9wVmVydGljZXM7XG5cblx0XHRcdFx0d2hpbGUgKGkgPCB2YWx1ZXMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0dXZzW2luZGV4XSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRcdHV2c1tpbmRleCArIDFdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKHRoaXMuX3V2cyA9PSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX3V2cyA9IG5ldyBBcnJheTxudW1iZXI+KHRoaXMuX3Bvc2l0aW9ucy5sZW5ndGgqMi8zKTtcblxuXHRcdFx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpXG5cdFx0XHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRvZmZzZXQgPSB0aGlzLmdldE9mZnNldChDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEEpO1xuXHRcdFx0c3RyaWRlID0gdGhpcy5nZXRTdHJpZGUoQ3VydmVTdWJHZW9tZXRyeS5VVl9EQVRBKTtcblxuXHRcdFx0Ly9hdXRvZGVyaXZlZCB1dnNcblx0XHRcdHV2cyA9IHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzPyB0aGlzLl9wVmVydGljZXMgOiB0aGlzLl91dnM7XG5cblx0XHRcdGkgPSAwO1xuXHRcdFx0aW5kZXggPSBvZmZzZXQ7XG5cdFx0XHR2YXIgdXZJZHg6bnVtYmVyID0gMDtcblxuXHRcdFx0Ly9jbGVhciB1diB2YWx1ZXNcblx0XHRcdHZhciBsZW5WOm51bWJlciA9IHV2cy5sZW5ndGg7XG5cdFx0XHR3aGlsZSAoaW5kZXggPCBsZW5WKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xuXHRcdFx0XHRcdHRoaXMuX3V2c1tpKytdID0gdXZzW2luZGV4XSA9IHV2SWR4Ki41O1xuXHRcdFx0XHRcdHRoaXMuX3V2c1tpKytdID0gdXZzW2luZGV4ICsgMV0gPSAxLjAgLSAodXZJZHggJiAxKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR1dnNbaW5kZXhdID0gdXZJZHgqLjU7XG5cdFx0XHRcdFx0dXZzW2luZGV4ICsgMV0gPSAxLjAgLSAodXZJZHggJiAxKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICgrK3V2SWR4ID09IDMpXG5cdFx0XHRcdFx0dXZJZHggPSAwO1xuXG5cdFx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLm5vdGlmeVVWc1VwZGF0ZSgpO1xuXG5cdFx0dGhpcy5fdXZzRGlydHkgPSBmYWxzZTtcblx0fVxuXG5cblxuXG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHRzdXBlci5kaXNwb3NlKCk7XG5cblx0XHR0aGlzLl9wb3NpdGlvbnMgPSBudWxsO1xuXHRcdHRoaXMuX2N1cnZlcyA9IG51bGw7XG5cdFx0dGhpcy5fdXZzID0gbnVsbDtcblxuXHRcdHRoaXMuX2ZhY2VOb3JtYWxzID0gbnVsbDtcblx0XHR0aGlzLl9mYWNlV2VpZ2h0cyA9IG51bGw7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgZmFjZSBpbmRpY2VzIG9mIHRoZSBDdXJ2ZVN1Ykdlb21ldHJ5LlxuXHQgKlxuXHQgKiBAcGFyYW0gaW5kaWNlcyBUaGUgZmFjZSBpbmRpY2VzIHRvIHVwbG9hZC5cblx0ICovXG5cdHB1YmxpYyB1cGRhdGVJbmRpY2VzKGluZGljZXM6QXJyYXk8bnVtYmVyPilcblx0e1xuXHRcdHN1cGVyLnVwZGF0ZUluZGljZXMoaW5kaWNlcyk7XG5cblx0XHR0aGlzLl9mYWNlTm9ybWFsc0RpcnR5ID0gdHJ1ZTtcblxuXHRcdGlmICh0aGlzLl9hdXRvRGVyaXZlTm9ybWFscylcblx0XHRcdHRoaXMuX3ZlcnRleE5vcm1hbHNEaXJ0eSA9IHRydWU7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBDbG9uZXMgdGhlIGN1cnJlbnQgb2JqZWN0XG5cdCAqIEByZXR1cm4gQW4gZXhhY3QgZHVwbGljYXRlIG9mIHRoZSBjdXJyZW50IG9iamVjdC5cblx0ICovXG5cdHB1YmxpYyBjbG9uZSgpOkN1cnZlU3ViR2VvbWV0cnlcblx0e1xuXHRcdHZhciBjbG9uZTpDdXJ2ZVN1Ykdlb21ldHJ5ID0gbmV3IEN1cnZlU3ViR2VvbWV0cnkodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpO1xuXHRcdGNsb25lLnVwZGF0ZUluZGljZXModGhpcy5fcEluZGljZXMuY29uY2F0KCkpO1xuXHRcdGNsb25lLnVwZGF0ZVBvc2l0aW9ucyh0aGlzLl9wb3NpdGlvbnMuY29uY2F0KCkpO1xuXG5cdFx0aWYgKHRoaXMuX2N1cnZlcylcblx0XHRcdGNsb25lLnVwZGF0ZUN1cnZlcyh0aGlzLl9jdXJ2ZXMuY29uY2F0KCkpO1xuXHRcdGVsc2Vcblx0XHRcdGNsb25lLnVwZGF0ZUN1cnZlcyhudWxsKTtcblxuXHRcdGlmICh0aGlzLl91dnMgJiYgIXRoaXMuX2F1dG9EZXJpdmVVVnMpXG5cdFx0XHRjbG9uZS51cGRhdGVVVnModGhpcy5fdXZzLmNvbmNhdCgpKTtcblx0XHRlbHNlXG5cdFx0XHRjbG9uZS51cGRhdGVVVnMobnVsbCk7XG5cblx0XHRyZXR1cm4gY2xvbmU7XG5cdH1cblxuXHRwdWJsaWMgc2NhbGVVVihzY2FsZVU6bnVtYmVyID0gMSwgc2NhbGVWOm51bWJlciA9IDEpXG5cdHtcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xuXHRcdHZhciBvZmZzZXQ6bnVtYmVyO1xuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xuXHRcdHZhciB1dnM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdHV2cyA9IHRoaXMuX3V2cztcblxuXHRcdHZhciByYXRpb1U6bnVtYmVyID0gc2NhbGVVL3RoaXMuX3NjYWxlVTtcblx0XHR2YXIgcmF0aW9WOm51bWJlciA9IHNjYWxlVi90aGlzLl9zY2FsZVY7XG5cblx0XHR0aGlzLl9zY2FsZVUgPSBzY2FsZVU7XG5cdFx0dGhpcy5fc2NhbGVWID0gc2NhbGVWO1xuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB1dnMubGVuZ3RoO1xuXG5cdFx0b2Zmc2V0ID0gMDtcblx0XHRzdHJpZGUgPSAyO1xuXG5cdFx0aW5kZXggPSBvZmZzZXQ7XG5cblx0XHR3aGlsZSAoaW5kZXggPCBsZW4pIHtcblx0XHRcdHV2c1tpbmRleF0gKj0gcmF0aW9VO1xuXHRcdFx0dXZzW2luZGV4ICsgMV0gKj0gcmF0aW9WO1xuXHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdH1cblxuXHRcdHRoaXMubm90aWZ5VVZzVXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogU2NhbGVzIHRoZSBnZW9tZXRyeS5cblx0ICogQHBhcmFtIHNjYWxlIFRoZSBhbW91bnQgYnkgd2hpY2ggdG8gc2NhbGUuXG5cdCAqL1xuXHRwdWJsaWMgc2NhbGUoc2NhbGU6bnVtYmVyKVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBpbmRleDpudW1iZXI7XG5cdFx0dmFyIG9mZnNldDpudW1iZXI7XG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XG5cdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXG5cdFx0cG9zaXRpb25zID0gdGhpcy5fcG9zaXRpb25zO1xuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSBwb3NpdGlvbnMubGVuZ3RoO1xuXG5cdFx0b2Zmc2V0ID0gMDtcblx0XHRzdHJpZGUgPSAzO1xuXG5cdFx0aSA9IDA7XG5cdFx0aW5kZXggPSBvZmZzZXQ7XG5cdFx0d2hpbGUgKGkgPCBsZW4pIHtcblx0XHRcdHBvc2l0aW9uc1tpbmRleF0gKj0gc2NhbGU7XG5cdFx0XHRwb3NpdGlvbnNbaW5kZXggKyAxXSAqPSBzY2FsZTtcblx0XHRcdHBvc2l0aW9uc1tpbmRleCArIDJdICo9IHNjYWxlO1xuXG5cdFx0XHRpICs9IDM7XG5cdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0fVxuXG5cdFx0dGhpcy5ub3RpZnlQb3NpdGlvbnNVcGRhdGUoKTtcblx0fVxuXG5cdHB1YmxpYyBhcHBseVRyYW5zZm9ybWF0aW9uKHRyYW5zZm9ybTpNYXRyaXgzRClcblx0e1xuXHRcdHZhciBwb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xuXHRcdFx0cG9zaXRpb25zID0gdGhpcy5fcFZlcnRpY2VzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwb3NpdGlvbnMgPSB0aGlzLl9wb3NpdGlvbnM7XG5cdFx0fVxuXG5cdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wb3NpdGlvbnMubGVuZ3RoLzM7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBpMTpudW1iZXI7XG5cdFx0dmFyIGkyOm51bWJlcjtcblx0XHR2YXIgdmVjdG9yOlZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCk7XG5cblx0XHR2YXIgaW52VHJhbnNwb3NlOk1hdHJpeDNEO1xuXG5cblxuXHRcdHZhciB2aTA6bnVtYmVyID0gdGhpcy5nZXRPZmZzZXQoQ3VydmVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBKTtcblx0XHR2YXIgdlN0cmlkZTpudW1iZXIgPSB0aGlzLmdldFN0cmlkZShDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEEpO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG5cdFx0XHRpMSA9IHZpMCArIDE7XG5cdFx0XHRpMiA9IHZpMCArIDI7XG5cblx0XHRcdC8vIGJha2UgcG9zaXRpb25cblx0XHRcdHZlY3Rvci54ID0gcG9zaXRpb25zW3ZpMF07XG5cdFx0XHR2ZWN0b3IueSA9IHBvc2l0aW9uc1tpMV07XG5cdFx0XHR2ZWN0b3IueiA9IHBvc2l0aW9uc1tpMl07XG5cdFx0XHR2ZWN0b3IgPSB0cmFuc2Zvcm0udHJhbnNmb3JtVmVjdG9yKHZlY3Rvcik7XG5cdFx0XHRwb3NpdGlvbnNbdmkwXSA9IHZlY3Rvci54O1xuXHRcdFx0cG9zaXRpb25zW2kxXSA9IHZlY3Rvci55O1xuXHRcdFx0cG9zaXRpb25zW2kyXSA9IHZlY3Rvci56O1xuXHRcdFx0dmkwICs9IHZTdHJpZGU7XG5cblx0XHR9XG5cblx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uc1VwZGF0ZSgpO1xuXHR9XG5cblxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSBub3JtYWxzIGZvciBlYWNoIGZhY2UuXG5cdCAqL1xuXHRwcml2YXRlIHVwZGF0ZUZhY2VOb3JtYWxzKClcblx0e1xuXHRcdHZhciBpOm51bWJlciA9IDA7XG5cdFx0dmFyIGo6bnVtYmVyID0gMDtcblx0XHR2YXIgazpudW1iZXIgPSAwO1xuXHRcdHZhciBpbmRleDpudW1iZXI7XG5cdFx0dmFyIG9mZnNldDpudW1iZXI7XG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XG5cblx0XHR2YXIgeDE6bnVtYmVyLCB4MjpudW1iZXIsIHgzOm51bWJlcjtcblx0XHR2YXIgeTE6bnVtYmVyLCB5MjpudW1iZXIsIHkzOm51bWJlcjtcblx0XHR2YXIgejE6bnVtYmVyLCB6MjpudW1iZXIsIHozOm51bWJlcjtcblx0XHR2YXIgZHgxOm51bWJlciwgZHkxOm51bWJlciwgZHoxOm51bWJlcjtcblx0XHR2YXIgZHgyOm51bWJlciwgZHkyOm51bWJlciwgZHoyOm51bWJlcjtcblx0XHR2YXIgY3g6bnVtYmVyLCBjeTpudW1iZXIsIGN6Om51bWJlcjtcblx0XHR2YXIgZDpudW1iZXI7XG5cblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj4gPSB0aGlzLl9wb3NpdGlvbnM7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3BJbmRpY2VzLmxlbmd0aDtcblxuXHRcdGlmICh0aGlzLl9mYWNlTm9ybWFscyA9PSBudWxsKVxuXHRcdFx0dGhpcy5fZmFjZU5vcm1hbHMgPSBuZXcgQXJyYXk8bnVtYmVyPihsZW4pO1xuXG5cdFx0aWYgKHRoaXMuX3VzZUZhY2VXZWlnaHRzICYmIHRoaXMuX2ZhY2VXZWlnaHRzID09IG51bGwpXG5cdFx0XHR0aGlzLl9mYWNlV2VpZ2h0cyA9IG5ldyBBcnJheTxudW1iZXI+KGxlbi8zKTtcblxuXHRcdHdoaWxlIChpIDwgbGVuKSB7XG5cdFx0XHRpbmRleCA9IHRoaXMuX3BJbmRpY2VzW2krK10qMztcblx0XHRcdHgxID0gcG9zaXRpb25zW2luZGV4XTtcblx0XHRcdHkxID0gcG9zaXRpb25zW2luZGV4ICsgMV07XG5cdFx0XHR6MSA9IHBvc2l0aW9uc1tpbmRleCArIDJdO1xuXHRcdFx0aW5kZXggPSB0aGlzLl9wSW5kaWNlc1tpKytdKjM7XG5cdFx0XHR4MiA9IHBvc2l0aW9uc1tpbmRleF07XG5cdFx0XHR5MiA9IHBvc2l0aW9uc1tpbmRleCArIDFdO1xuXHRcdFx0ejIgPSBwb3NpdGlvbnNbaW5kZXggKyAyXTtcblx0XHRcdGluZGV4ID0gdGhpcy5fcEluZGljZXNbaSsrXSozO1xuXHRcdFx0eDMgPSBwb3NpdGlvbnNbaW5kZXhdO1xuXHRcdFx0eTMgPSBwb3NpdGlvbnNbaW5kZXggKyAxXTtcblx0XHRcdHozID0gcG9zaXRpb25zW2luZGV4ICsgMl07XG5cdFx0XHRkeDEgPSB4MyAtIHgxO1xuXHRcdFx0ZHkxID0geTMgLSB5MTtcblx0XHRcdGR6MSA9IHozIC0gejE7XG5cdFx0XHRkeDIgPSB4MiAtIHgxO1xuXHRcdFx0ZHkyID0geTIgLSB5MTtcblx0XHRcdGR6MiA9IHoyIC0gejE7XG5cdFx0XHRjeCA9IGR6MSpkeTIgLSBkeTEqZHoyO1xuXHRcdFx0Y3kgPSBkeDEqZHoyIC0gZHoxKmR4Mjtcblx0XHRcdGN6ID0gZHkxKmR4MiAtIGR4MSpkeTI7XG5cdFx0XHRkID0gTWF0aC5zcXJ0KGN4KmN4ICsgY3kqY3kgKyBjeipjeik7XG5cdFx0XHQvLyBsZW5ndGggb2YgY3Jvc3MgcHJvZHVjdCA9IDIqdHJpYW5nbGUgYXJlYVxuXG5cdFx0XHRpZiAodGhpcy5fdXNlRmFjZVdlaWdodHMpIHtcblx0XHRcdFx0dmFyIHc6bnVtYmVyID0gZCoxMDAwMDtcblxuXHRcdFx0XHRpZiAodyA8IDEpXG5cdFx0XHRcdFx0dyA9IDE7XG5cblx0XHRcdFx0dGhpcy5fZmFjZVdlaWdodHNbaysrXSA9IHc7XG5cdFx0XHR9XG5cblx0XHRcdGQgPSAxL2Q7XG5cblx0XHRcdHRoaXMuX2ZhY2VOb3JtYWxzW2orK10gPSBjeCpkO1xuXHRcdFx0dGhpcy5fZmFjZU5vcm1hbHNbaisrXSA9IGN5KmQ7XG5cdFx0XHR0aGlzLl9mYWNlTm9ybWFsc1tqKytdID0gY3oqZDtcblx0XHR9XG5cblx0XHR0aGlzLl9mYWNlTm9ybWFsc0RpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpXG5cdHtcblx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xuXG5cdFx0dGhpcy5ub3RpZnlQb3NpdGlvbnNVcGRhdGUoKTtcblx0XHR0aGlzLm5vdGlmeUN1cnZlc1VwZGF0ZSgpO1xuXHRcdHRoaXMubm90aWZ5VVZzVXBkYXRlKCk7XG5cdH1cblxuXHRwcml2YXRlIG5vdGlmeVBvc2l0aW9uc1VwZGF0ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fcG9zaXRpb25zRGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9wb3NpdGlvbnNEaXJ0eSA9IHRydWU7XG5cblx0XHRpZiAoIXRoaXMuX3Bvc2l0aW9uc1VwZGF0ZWQpXG5cdFx0XHR0aGlzLl9wb3NpdGlvbnNVcGRhdGVkID0gbmV3IFN1Ykdlb21ldHJ5RXZlbnQoU3ViR2VvbWV0cnlFdmVudC5WRVJUSUNFU19VUERBVEVELCBDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEEpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3Bvc2l0aW9uc1VwZGF0ZWQpO1xuXHR9XG5cblx0cHJpdmF0ZSBub3RpZnlDdXJ2ZXNVcGRhdGUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2N1cnZlc0RpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fY3VydmVzRGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKCF0aGlzLl9jdXJ2ZXNVcGRhdGVkKVxuXHRcdFx0dGhpcy5fY3VydmVzVXBkYXRlZCA9IG5ldyBTdWJHZW9tZXRyeUV2ZW50KFN1Ykdlb21ldHJ5RXZlbnQuVkVSVElDRVNfVVBEQVRFRCwgQ3VydmVTdWJHZW9tZXRyeS5DVVJWRV9EQVRBKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9jdXJ2ZXNVcGRhdGVkKTtcblx0fVxuXG5cblxuXHRwcml2YXRlIG5vdGlmeVVWc1VwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3V2c0RpcnR5KVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuX3V2c0RpcnR5ID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIXRoaXMuX3V2c1VwZGF0ZWQpXG4gICAgICAgICAgICB0aGlzLl91dnNVcGRhdGVkID0gbmV3IFN1Ykdlb21ldHJ5RXZlbnQoU3ViR2VvbWV0cnlFdmVudC5WRVJUSUNFU19VUERBVEVELCBDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEEpO1xuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl91dnNVcGRhdGVkKTtcbiAgICB9XG59XG5cbmV4cG9ydCA9IEN1cnZlU3ViR2VvbWV0cnk7Il19