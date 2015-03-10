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
    Object.defineProperty(CurveSubGeometry.prototype, "assetType", {
        get: function () {
            return CurveSubGeometry.assetType;
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
    CurveSubGeometry.assetType = "[asset CurveSubGeometry]";
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF3YXlqcy1jb3JlL2xpYi9kYXRhL0N1cnZlU3ViR2VvbWV0cnkudHMiXSwibmFtZXMiOlsiQ3VydmVTdWJHZW9tZXRyeSIsIkN1cnZlU3ViR2VvbWV0cnkuY29uc3RydWN0b3IiLCJDdXJ2ZVN1Ykdlb21ldHJ5LmFzc2V0VHlwZSIsIkN1cnZlU3ViR2VvbWV0cnkuc2NhbGVVIiwiQ3VydmVTdWJHZW9tZXRyeS5zY2FsZVYiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnVzZUNvbmRlbnNlZEluZGljZXMiLCJDdXJ2ZVN1Ykdlb21ldHJ5Ll9wVXBkYXRlU3RyaWRlT2Zmc2V0IiwiQ3VydmVTdWJHZW9tZXRyeS5hdXRvRGVyaXZlVVZzIiwiQ3VydmVTdWJHZW9tZXRyeS5hdXRvRGVyaXZlTm9ybWFscyIsIkN1cnZlU3ViR2VvbWV0cnkudmVydGljZXMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnBvc2l0aW9ucyIsIkN1cnZlU3ViR2VvbWV0cnkuY3VydmVzIiwiQ3VydmVTdWJHZW9tZXRyeS5mYWNlTm9ybWFscyIsIkN1cnZlU3ViR2VvbWV0cnkudXZzIiwiQ3VydmVTdWJHZW9tZXRyeS51c2VGYWNlV2VpZ2h0cyIsIkN1cnZlU3ViR2VvbWV0cnkuY29uZGVuc2VkSW5kZXhMb29rVXAiLCJDdXJ2ZVN1Ykdlb21ldHJ5LmdldEJvdW5kaW5nUG9zaXRpb25zIiwiQ3VydmVTdWJHZW9tZXRyeS51cGRhdGVQb3NpdGlvbnMiLCJDdXJ2ZVN1Ykdlb21ldHJ5LnVwZGF0ZUN1cnZlcyIsIkN1cnZlU3ViR2VvbWV0cnkudXBkYXRlVVZzIiwiQ3VydmVTdWJHZW9tZXRyeS5kaXNwb3NlIiwiQ3VydmVTdWJHZW9tZXRyeS51cGRhdGVJbmRpY2VzIiwiQ3VydmVTdWJHZW9tZXRyeS5jbG9uZSIsIkN1cnZlU3ViR2VvbWV0cnkuc2NhbGVVViIsIkN1cnZlU3ViR2VvbWV0cnkuc2NhbGUiLCJDdXJ2ZVN1Ykdlb21ldHJ5LmFwcGx5VHJhbnNmb3JtYXRpb24iLCJDdXJ2ZVN1Ykdlb21ldHJ5LnVwZGF0ZUZhY2VOb3JtYWxzIiwiQ3VydmVTdWJHZW9tZXRyeS5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlIiwiQ3VydmVTdWJHZW9tZXRyeS5ub3RpZnlQb3NpdGlvbnNVcGRhdGUiLCJDdXJ2ZVN1Ykdlb21ldHJ5Lm5vdGlmeUN1cnZlc1VwZGF0ZSIsIkN1cnZlU3ViR2VvbWV0cnkubm90aWZ5VVZzVXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFPLGVBQWUsV0FBYSxzQ0FBc0MsQ0FBQyxDQUFDO0FBRTNFLElBQU8sUUFBUSxXQUFlLCtCQUErQixDQUFDLENBQUM7QUFDL0QsSUFBTyxnQkFBZ0IsV0FBYSx5Q0FBeUMsQ0FBQyxDQUFDO0FBRS9FLEFBR0E7O0dBREc7SUFDRyxnQkFBZ0I7SUFBU0EsVUFBekJBLGdCQUFnQkEsVUFBd0JBO0lBaVI3Q0E7O09BRUdBO0lBQ0hBLFNBcFJLQSxnQkFBZ0JBLENBb1JUQSxrQkFBMEJBO1FBRXJDQyxrQkFBTUEsa0JBQWtCQSxDQUFDQSxDQUFDQTtRQXpRbkJBLG9CQUFlQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUMvQkEsaUJBQVlBLEdBQVdBLElBQUlBLENBQUNBO1FBQzVCQSxzQkFBaUJBLEdBQVdBLElBQUlBLENBQUNBO1FBQzlCQSx3QkFBbUJBLEdBQVdBLElBQUlBLENBQUNBO1FBQ3RDQSxjQUFTQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUN6QkEsdUJBQWtCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUNsQ0EsdUJBQWtCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUNsQ0EsdUJBQWtCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQVlsQ0EsdUJBQWtCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUNsQ0EsdUJBQWtCQSxHQUFXQSxLQUFLQSxDQUFDQTtRQUNuQ0Esb0JBQWVBLEdBQVdBLEtBQUtBLENBQUNBO1FBQzdCQSxtQkFBY0EsR0FBV0EsS0FBS0EsQ0FBQ0E7UUFLbENBLFlBQU9BLEdBQVVBLENBQUNBLENBQUNBO1FBQ25CQSxZQUFPQSxHQUFVQSxDQUFDQSxDQUFDQTtJQThPM0JBLENBQUNBO0lBdE9ERCxzQkFBV0EsdUNBQVNBO2FBQXBCQTtZQUVDRSxNQUFNQSxDQUFDQSxnQkFBZ0JBLENBQUNBLFNBQVNBLENBQUNBO1FBQ25DQSxDQUFDQTs7O09BQUFGO0lBS0RBLHNCQUFXQSxvQ0FBTUE7UUFIakJBOztXQUVHQTthQUNIQTtZQUVDRyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUNyQkEsQ0FBQ0E7OztPQUFBSDtJQUtEQSxzQkFBV0Esb0NBQU1BO1FBSGpCQTs7V0FFR0E7YUFDSEE7WUFFQ0ksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7UUFDckJBLENBQUNBOzs7T0FBQUo7SUFPREEsc0JBQVdBLGlEQUFtQkE7UUFMOUJBOzs7O1dBSUdBO2FBQ0hBO1lBRUNLLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLG9CQUFvQkEsQ0FBQ0E7UUFDbENBLENBQUNBO2FBRURMLFVBQStCQSxLQUFhQTtZQUUzQ0ssRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxJQUFJQSxLQUFLQSxDQUFDQTtnQkFDdENBLE1BQU1BLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLG9CQUFvQkEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFDbkNBLENBQUNBOzs7T0FSQUw7SUFVTUEsK0NBQW9CQSxHQUEzQkE7UUFFQ00sRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM3QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxXQUFXQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUVoREEsQUFDQUEsdUJBRHVCQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxhQUFhQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNsREEsSUFBSUEsTUFBTUEsR0FBVUEsQ0FBQ0EsQ0FBQ0E7WUFFdEJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUMxQkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQTtnQkFDcERBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBO1lBQ2JBLENBQUNBO1lBRURBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQTtnQkFDakRBLE1BQU1BLElBQUlBLENBQUNBLENBQUNBO1lBQ2JBLENBQUNBO1lBSURBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDckRBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDdkRBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFDcERBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0E7WUFFakRBLElBQUlBLEdBQUdBLEdBQVVBLElBQUlBLENBQUNBLGFBQWFBLEdBQUNBLE1BQU1BLENBQUNBO1lBRTNDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDM0JBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFV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QUFhQSxHQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxnQkFBZ0JBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO1lBRWpGQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxJQUFJQSxJQUFJQSxDQUFDQTtnQkFDM0JBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxJQUFJQSxHQUFHQSxDQUFDQTtnQkFDdENBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBLE1BQU1BLEdBQUdBLEdBQUdBLENBQUNBO1lBRTlCQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNOQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxnQkFBZ0JBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1lBQ3ZEQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxnQkFBZ0JBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBO1lBQ3hEQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQTtZQUU1QkEsT0FBT0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7Z0JBQzFCQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDL0JBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO2dCQUNuQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ25DQSxLQUFLQSxJQUFJQSxNQUFNQSxDQUFDQTtZQUNqQkEs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QUFTQSxDQUFDQTtRQUNwQ0EsSUFBSUEsQ0FBUUEsQ0FBQ0E7UUFFYkEsSUFBSUEsU0FBU0EsR0FBaUJBLElBQUlBLENBQUNBLFVBQVVBLENBQUNBO1FBRTlDQSxJQUFJQSxHQUFHQSxHQUFVQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUV2Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsSUFBSUEsSUFBSUEsQ0FBQ0E7WUFDN0JBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLEtBQUtBLENBQVNBLEdBQUdBLENBQUNBLENBQUNBO1FBRTVDQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxlQUFlQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxJQUFJQSxJQUFJQSxDQUFDQTtZQUNyREEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsS0FBS0EsQ0FBU0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFOUNBLE9BQU9BLENBQUNBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ2hCQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQTtZQUM5QkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQzFCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQkEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDOUJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBQ3RCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1lBQzlCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtZQUN0QkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO1lBQzFCQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUNkQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxDQUFDQTtZQUN2QkEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsQ0FBQ0E7WUFDdkJBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLENBQUNBO1lBQ3ZCQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUNyQ0EsQUFFQUEsNENBRjRDQTtZQUU1Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFCQSxJQUFJQSxDQUFDQSxHQUFVQSxDQUFDQSxHQUFDQSxLQUFLQSxDQUFDQTtnQkFFdkJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNUQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFUEEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUJBLENBQUNBO1lBRURBLENBQUNBLEdBQUdBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBO1lBRVJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUNBLENBQUNBLENBQUNBO1lBQzlCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFDQSxDQUFDQSxDQUFDQTtZQUM5QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDL0JBLENBQUNBO1FBRURBLElBQUlBLENBQUNBLGlCQUFpQkEsR0FBR0EsS0FBS0EsQ0FBQ0E7SUFDaENBLENBQUNBO0lBRU0xQixpREFBc0JBLEdBQTdCQTtRQUVDMkIsSUFBSUEsQ0FBQ0EsbUJBQW1CQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUVoQ0EsSUFBSUEsQ0FBQ0EscUJBQXFCQSxFQUFFQSxDQUFDQTtRQUM3QkEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxFQUFFQSxDQUFDQTtRQUMxQkEsSUFBSUEsQ0FBQ0EsZUFBZUEsRUFBRUEsQ0FBQ0E7SUFDeEJBLENBQUNBO0lBRU8zQixnREFBcUJBLEdBQTdCQTtRQUVDNEIsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0E7WUFDeEJBLE1BQU1BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLGVBQWVBLEdBQUdBLElBQUlBLENBQUNBO1FBRTVCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBO1lBQzNCQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLElBQUlBLGdCQUFnQkEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLGdCQUFnQkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7UUFFbEhBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0E7SUFDNUNBLENBQUNBO0lBRU81Qiw2Q0FBa0JBLEdBQTFCQTtRQUVDNkIsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0E7WUFDckJBLE1BQU1BLENBQUNBO1FBRVJBLElBQUlBLENBQUNBLFlBQVlBLEdBQUdBLElBQUlBLENBQUNBO1FBRXpCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxjQUFjQSxDQUFDQTtZQUN4QkEsSUFBSUEsQ0FBQ0EsY0FBY0EsR0FBR0EsSUFBSUEsZ0JBQWdCQSxDQUFDQSxnQkFBZ0JBLENBQUNBLGdCQUFnQkEsRUFBRUEsZ0JBQWdCQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUU1R0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0E7SUFDekNBLENBQUNBO0lBSU83QiwwQ0FBZUEsR0FBdkJBO1FBQ084QixFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQTtZQUNmQSxNQUFNQSxDQUFDQTtRQUVYQSxJQUFJQSxDQUFDQSxTQUFTQSxHQUFHQSxJQUFJQSxDQUFDQTtRQUV0QkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7WUFDbEJBLElBQUlBLENBQUNBLFdBQVdBLEdBQUdBLElBQUlBLGdCQUFnQkEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLGdCQUFnQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFFekdBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLENBQUNBO0lBQ3pDQSxDQUFDQTtJQWp1QlU5QiwwQkFBU0EsR0FBVUEsMEJBQTBCQSxDQUFDQTtJQUU5Q0EsOEJBQWFBLEdBQVVBLFdBQVdBLENBQUNBO0lBQ2hDQSwyQkFBVUEsR0FBVUEsUUFBUUEsQ0FBQ0E7SUFDaENBLHdCQUFPQSxHQUFVQSxLQUFLQSxDQUFDQTtJQUVyQ0EsOEJBQThCQTtJQUNoQkEsZ0NBQWVBLEdBQVVBLFFBQVFBLENBQUNBO0lBQ2xDQSw2QkFBWUEsR0FBVUEsUUFBUUEsQ0FBQ0E7SUFDL0JBLDBCQUFTQSxHQUFVQSxRQUFRQSxDQUFDQTtJQXl0QjNDQSx1QkFBQ0E7QUFBREEsQ0FwdUJBLEFBb3VCQ0EsRUFwdUI4QixlQUFlLEVBb3VCN0M7QUFFRCxBQUEwQixpQkFBakIsZ0JBQWdCLENBQUMiLCJmaWxlIjoiZGF0YS9DdXJ2ZVN1Ykdlb21ldHJ5LmpzIiwic291cmNlUm9vdCI6Ii4uLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdWJHZW9tZXRyeUJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvZGF0YS9TdWJHZW9tZXRyeUJhc2VcIik7XG5pbXBvcnQgTWF0cml4M0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vTWF0cml4M0RcIik7XG5pbXBvcnQgVmVjdG9yM0RcdFx0XHRcdFx0PSByZXF1aXJlKFwiYXdheWpzLWNvcmUvbGliL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgU3ViR2VvbWV0cnlFdmVudFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvU3ViR2VvbWV0cnlFdmVudFwiKTtcblxuLyoqXG4gKiBAY2xhc3MgYXdheS5iYXNlLkN1cnZlU3ViR2VvbWV0cnlcbiAqL1xuY2xhc3MgQ3VydmVTdWJHZW9tZXRyeSBleHRlbmRzIFN1Ykdlb21ldHJ5QmFzZVxue1xuXHRwdWJsaWMgc3RhdGljIGFzc2V0VHlwZTpzdHJpbmcgPSBcIlthc3NldCBDdXJ2ZVN1Ykdlb21ldHJ5XVwiO1xuXG5cdHB1YmxpYyBzdGF0aWMgUE9TSVRJT05fREFUQTpzdHJpbmcgPSBcInBvc2l0aW9uc1wiO1xuICAgIHB1YmxpYyBzdGF0aWMgQ1VSVkVfREFUQTpzdHJpbmcgPSBcImN1cnZlc1wiO1xuXHRwdWJsaWMgc3RhdGljIFVWX0RBVEE6c3RyaW5nID0gXCJ1dnNcIjtcblxuXHQvL1RPRE8gLSBtb3ZlIHRoZXNlIHRvIFN0YWdlR0xcblx0cHVibGljIHN0YXRpYyBQT1NJVElPTl9GT1JNQVQ6c3RyaW5nID0gXCJmbG9hdDNcIjtcblx0cHVibGljIHN0YXRpYyBDVVJWRV9GT1JNQVQ6c3RyaW5nID0gXCJmbG9hdDJcIjtcblx0cHVibGljIHN0YXRpYyBVVl9GT1JNQVQ6c3RyaW5nID0gXCJmbG9hdDJcIjtcblxuXHRwcml2YXRlIF9wb3NpdGlvbnNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfY3VydmVzRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2ZhY2VOb3JtYWxzRGlydHk6Ym9vbGVhbiA9IHRydWU7XG4gICAgcHJpdmF0ZSBfdmVydGV4Tm9ybWFsc0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF91dnNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfc2Vjb25kYXJ5VVZzRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX2pvaW50SW5kaWNlc0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9qb2ludFdlaWdodHNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblxuXHRwcml2YXRlIF9wb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcblx0cHJpdmF0ZSBfY3VydmVzOkFycmF5PG51bWJlcj47XG5cdHByaXZhdGUgX3V2czpBcnJheTxudW1iZXI+O1xuXG5cblx0cHJpdmF0ZSBfdXNlQ29uZGVuc2VkSW5kaWNlczpib29sZWFuO1xuXHRwcml2YXRlIF9jb25kZW5zZWRKb2ludEluZGljZXM6QXJyYXk8bnVtYmVyPjtcblx0cHJpdmF0ZSBfY29uZGVuc2VkSW5kZXhMb29rVXA6QXJyYXk8bnVtYmVyPjtcblxuXG5cdHByaXZhdGUgX2NvbmNhdGVuYXRlQXJyYXlzOmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9hdXRvRGVyaXZlTm9ybWFsczpib29sZWFuID0gZmFsc2U7XG5cdHByaXZhdGUgX3VzZUZhY2VXZWlnaHRzOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9hdXRvRGVyaXZlVVZzOmJvb2xlYW4gPSBmYWxzZTtcblxuXHRwcml2YXRlIF9mYWNlTm9ybWFsczpBcnJheTxudW1iZXI+O1xuXHRwcml2YXRlIF9mYWNlV2VpZ2h0czpBcnJheTxudW1iZXI+O1xuXG5cdHByaXZhdGUgX3NjYWxlVTpudW1iZXIgPSAxO1xuXHRwcml2YXRlIF9zY2FsZVY6bnVtYmVyID0gMTtcblxuXHRwcml2YXRlIF9wb3NpdGlvbnNVcGRhdGVkOlN1Ykdlb21ldHJ5RXZlbnQ7XG5cdHByaXZhdGUgX2N1cnZlc1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcblx0cHJpdmF0ZSBfdXZzVXBkYXRlZDpTdWJHZW9tZXRyeUV2ZW50O1xuXHRwcml2YXRlIF9zZWNvbmRhcnlVVnNVcGRhdGVkOlN1Ykdlb21ldHJ5RXZlbnQ7XG5cblxuXHRwdWJsaWMgZ2V0IGFzc2V0VHlwZSgpOnN0cmluZ1xuXHR7XG5cdFx0cmV0dXJuIEN1cnZlU3ViR2VvbWV0cnkuYXNzZXRUeXBlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjYWxlVSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NjYWxlVTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBzY2FsZVYoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zY2FsZVY7XG5cdH1cblxuXHQvKipcblx0ICogT2ZmZXJzIHRoZSBvcHRpb24gb2YgZW5hYmxpbmcgR1BVIGFjY2VsZXJhdGVkIGFuaW1hdGlvbiBvbiBza2VsZXRvbnMgbGFyZ2VyIHRoYW4gMzIgam9pbnRzXG5cdCAqIGJ5IGNvbmRlbnNpbmcgdGhlIG51bWJlciBvZiBqb2ludCBpbmRleCB2YWx1ZXMgcmVxdWlyZWQgcGVyIG1lc2guIE9ubHkgYXBwbGljYWJsZSB0b1xuXHQgKiBza2VsZXRvbiBhbmltYXRpb25zIHRoYXQgdXRpbGlzZSBtb3JlIHRoYW4gb25lIG1lc2ggb2JqZWN0LiBEZWZhdWx0cyB0byBmYWxzZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgdXNlQ29uZGVuc2VkSW5kaWNlcygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl91c2VDb25kZW5zZWRJbmRpY2VzO1xuXHR9XG5cblx0cHVibGljIHNldCB1c2VDb25kZW5zZWRJbmRpY2VzKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fdXNlQ29uZGVuc2VkSW5kaWNlcyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3VzZUNvbmRlbnNlZEluZGljZXMgPSB2YWx1ZTtcblx0fVxuXG5cdHB1YmxpYyBfcFVwZGF0ZVN0cmlkZU9mZnNldCgpXG5cdHtcblx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcblx0XHRcdHRoaXMuX3BPZmZzZXRbQ3VydmVTdWJHZW9tZXRyeS5WRVJURVhfREFUQV0gPSAwO1xuXG5cdFx0XHQvL2Fsd2F5cyBoYXZlIHBvc2l0aW9uc1xuXHRcdFx0dGhpcy5fcE9mZnNldFtDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEFdID0gMDtcblx0XHRcdHZhciBzdHJpZGU6bnVtYmVyID0gMztcblxuXHRcdFx0aWYgKHRoaXMuX2N1cnZlcyAhPSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX3BPZmZzZXRbQ3VydmVTdWJHZW9tZXRyeS5DVVJWRV9EQVRBXSA9IHN0cmlkZTtcblx0XHRcdFx0c3RyaWRlICs9IDI7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl91dnMgIT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLl9wT2Zmc2V0W0N1cnZlU3ViR2VvbWV0cnkuVVZfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHRcdHN0cmlkZSArPSAyO1xuXHRcdFx0fVxuXG5cblxuXHRcdFx0dGhpcy5fcFN0cmlkZVtDdXJ2ZVN1Ykdlb21ldHJ5LlZFUlRFWF9EQVRBXSA9IHN0cmlkZTtcblx0XHRcdHRoaXMuX3BTdHJpZGVbQ3VydmVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBXSA9IHN0cmlkZTtcblx0XHRcdHRoaXMuX3BTdHJpZGVbQ3VydmVTdWJHZW9tZXRyeS5DVVJWRV9EQVRBXSA9IHN0cmlkZTtcblx0XHRcdHRoaXMuX3BTdHJpZGVbQ3VydmVTdWJHZW9tZXRyeS5VVl9EQVRBXSA9IHN0cmlkZTtcblxuXHRcdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wTnVtVmVydGljZXMqc3RyaWRlO1xuXG5cdFx0XHRpZiAodGhpcy5fcFZlcnRpY2VzID09IG51bGwpXG5cdFx0XHRcdHRoaXMuX3BWZXJ0aWNlcyA9IG5ldyBBcnJheTxudW1iZXI+KGxlbik7XG5cdFx0XHRlbHNlIGlmICh0aGlzLl9wVmVydGljZXMubGVuZ3RoICE9IGxlbilcblx0XHRcdFx0dGhpcy5fcFZlcnRpY2VzLmxlbmd0aCA9IGxlbjtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9wT2Zmc2V0W0N1cnZlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQV0gPSAwO1xuXHRcdFx0dGhpcy5fcE9mZnNldFtDdXJ2ZVN1Ykdlb21ldHJ5LkNVUlZFX0RBVEFdID0gMDtcblx0XHRcdHRoaXMuX3BPZmZzZXRbQ3VydmVTdWJHZW9tZXRyeS5VVl9EQVRBXSA9IDA7XG5cblxuXHRcdFx0dGhpcy5fcFN0cmlkZVtDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEFdID0gMztcblx0XHRcdHRoaXMuX3BTdHJpZGVbQ3VydmVTdWJHZW9tZXRyeS5DVVJWRV9EQVRBXSA9IDI7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW0N1cnZlU3ViR2VvbWV0cnkuVVZfREFUQV0gPSAyO1xuXHRcdH1cblxuXHRcdHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgYSBVViBidWZmZXIgc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIHRvIGNvbnRhaW4gZHVtbXkgVVYgY29vcmRpbmF0ZXMuXG5cdCAqIFNldCB0byB0cnVlIGlmIGEgZ2VvbWV0cnkgbGFja3MgVVYgZGF0YSBidXQgdXNlcyBhIG1hdGVyaWFsIHRoYXQgcmVxdWlyZXMgaXQsIG9yIGxlYXZlIGFzIGZhbHNlXG5cdCAqIGluIGNhc2VzIHdoZXJlIFVWIGRhdGEgaXMgZXhwbGljaXRseSBkZWZpbmVkIG9yIHRoZSBtYXRlcmlhbCBkb2VzIG5vdCByZXF1aXJlIFVWIGRhdGEuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGF1dG9EZXJpdmVVVnMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYXV0b0Rlcml2ZVVWcztcblx0fVxuXG5cdHB1YmxpYyBzZXQgYXV0b0Rlcml2ZVVWcyh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2F1dG9EZXJpdmVVVnMgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9hdXRvRGVyaXZlVVZzID0gdmFsdWU7XG5cblx0XHRpZiAodmFsdWUpXG5cdFx0XHR0aGlzLm5vdGlmeVVWc1VwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRydWUgaWYgdGhlIHZlcnRleCBub3JtYWxzIHNob3VsZCBiZSBkZXJpdmVkIGZyb20gdGhlIGdlb21ldHJ5LCBmYWxzZSBpZiB0aGUgdmVydGV4IG5vcm1hbHMgYXJlIHNldFxuXHQgKiBleHBsaWNpdGx5LlxuXHQgKi9cblx0cHVibGljIGdldCBhdXRvRGVyaXZlTm9ybWFscygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9hdXRvRGVyaXZlTm9ybWFscztcblx0fVxuXG4gICAgLy9yZW1vdmVcblx0cHVibGljIHNldCBhdXRvRGVyaXZlTm9ybWFscyh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2F1dG9EZXJpdmVOb3JtYWxzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fYXV0b0Rlcml2ZU5vcm1hbHMgPSB2YWx1ZTtcblxuXHR9XG5cblxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB2ZXJ0aWNlcygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdGlmICh0aGlzLl9wb3NpdGlvbnNEaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlUG9zaXRpb25zKHRoaXMuX3Bvc2l0aW9ucyk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2N1cnZlc0RpcnR5KVxuICAgICAgICAgICAgdGhpcy51cGRhdGVDdXJ2ZXModGhpcy5fY3VydmVzKTtcblxuXHRcdGlmICh0aGlzLl91dnNEaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlVVZzKHRoaXMuX3V2cyk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcFZlcnRpY2VzO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHBvc2l0aW9ucygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdGlmICh0aGlzLl9wb3NpdGlvbnNEaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlUG9zaXRpb25zKHRoaXMuX3Bvc2l0aW9ucyk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcG9zaXRpb25zO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGN1cnZlcygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdGlmICh0aGlzLl9jdXJ2ZXNEaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlQ3VydmVzKHRoaXMuX2N1cnZlcyk7XG5cblx0XHRyZXR1cm4gdGhpcy5fY3VydmVzO1xuXHR9XG5cblxuXG5cdC8qKlxuXHQgKiBUaGUgcmF3IGRhdGEgb2YgdGhlIGZhY2Ugbm9ybWFscywgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlIGZhY2VzIGFyZSBsaXN0ZWQgaW4gdGhlIGluZGV4IGxpc3QuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGZhY2VOb3JtYWxzKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0aWYgKHRoaXMuX2ZhY2VOb3JtYWxzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZUZhY2VOb3JtYWxzKCk7XG5cblx0XHRyZXR1cm4gdGhpcy5fZmFjZU5vcm1hbHM7XG5cdH1cblxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB1dnMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fdXZzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVVWcyh0aGlzLl91dnMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3V2cztcblx0fVxuXG5cblxuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdG8gdGFrZSB0aGUgc2l6ZSBvZiBmYWNlcyBpbnRvIGFjY291bnQgd2hlbiBhdXRvLWRlcml2aW5nIHZlcnRleCBub3JtYWxzIGFuZCB0YW5nZW50cy5cblx0ICovXG5cdHB1YmxpYyBnZXQgdXNlRmFjZVdlaWdodHMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdXNlRmFjZVdlaWdodHM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IHVzZUZhY2VXZWlnaHRzKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fdXNlRmFjZVdlaWdodHMgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl91c2VGYWNlV2VpZ2h0cyA9IHZhbHVlO1xuXG5cblx0XHR0aGlzLl9mYWNlTm9ybWFsc0RpcnR5ID0gdHJ1ZTtcblx0fVxuXG5cblx0cHVibGljIGdldCBjb25kZW5zZWRJbmRleExvb2tVcCgpOkFycmF5PG51bWJlcj5cblx0e1xuXG5cblx0XHRyZXR1cm4gdGhpcy5fY29uZGVuc2VkSW5kZXhMb29rVXA7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdGNvbnN0cnVjdG9yKGNvbmNhdGVuYXRlZEFycmF5czpib29sZWFuKVxuXHR7XG5cdFx0c3VwZXIoY29uY2F0ZW5hdGVkQXJyYXlzKTtcblx0fVxuXG5cdHB1YmxpYyBnZXRCb3VuZGluZ1Bvc2l0aW9ucygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdGlmICh0aGlzLl9wb3NpdGlvbnNEaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlUG9zaXRpb25zKHRoaXMuX3Bvc2l0aW9ucyk7XG5cblx0XHRyZXR1cm4gdGhpcy5fcG9zaXRpb25zO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgdXBkYXRlUG9zaXRpb25zKHZhbHVlczpBcnJheTxudW1iZXI+KVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBpbmRleDpudW1iZXI7XG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XG5cdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXG5cdFx0dGhpcy5fcG9zaXRpb25zID0gdmFsdWVzO1xuXG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9ucyA9PSBudWxsKVxuXHRcdFx0dGhpcy5fcG9zaXRpb25zID0gbmV3IEFycmF5PG51bWJlcj4oKTtcblxuXHRcdHRoaXMuX3BOdW1WZXJ0aWNlcyA9IHRoaXMuX3Bvc2l0aW9ucy5sZW5ndGgvMztcblxuXHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xuXHRcdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wTnVtVmVydGljZXMqdGhpcy5nZXRTdHJpZGUoQ3VydmVTdWJHZW9tZXRyeS5WRVJURVhfREFUQSk7XG5cblx0XHRcdGlmICh0aGlzLl9wVmVydGljZXMgPT0gbnVsbClcblx0XHRcdFx0dGhpcy5fcFZlcnRpY2VzID0gbmV3IEFycmF5PG51bWJlcj4obGVuKTtcblx0XHRcdGVsc2UgaWYgKHRoaXMuX3BWZXJ0aWNlcy5sZW5ndGggIT0gbGVuKVxuXHRcdFx0XHR0aGlzLl9wVmVydGljZXMubGVuZ3RoID0gbGVuO1xuXG5cdFx0XHRpID0gMDtcblx0XHRcdGluZGV4ID0gdGhpcy5nZXRPZmZzZXQoQ3VydmVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBKTtcblx0XHRcdHN0cmlkZSA9IHRoaXMuZ2V0U3RyaWRlKEN1cnZlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQSk7XG5cdFx0XHRwb3NpdGlvbnMgPSB0aGlzLl9wVmVydGljZXM7XG5cblx0XHRcdHdoaWxlIChpIDwgdmFsdWVzLmxlbmd0aCkge1xuXHRcdFx0XHRwb3NpdGlvbnNbaW5kZXhdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdHBvc2l0aW9uc1tpbmRleCArIDFdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdHBvc2l0aW9uc1tpbmRleCArIDJdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLnBJbnZhbGlkYXRlQm91bmRzKCk7XG5cblx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uc1VwZGF0ZSgpO1xuXG5cdFx0dGhpcy5fcG9zaXRpb25zRGlydHkgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSB2ZXJ0ZXggbm9ybWFscyBiYXNlZCBvbiB0aGUgZ2VvbWV0cnkuXG5cdCAqL1xuXHRwdWJsaWMgdXBkYXRlQ3VydmVzKHZhbHVlczpBcnJheTxudW1iZXI+KVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBpbmRleDpudW1iZXI7XG5cdFx0dmFyIG9mZnNldDpudW1iZXI7XG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XG5cdFx0dmFyIGN1cnZlczpBcnJheTxudW1iZXI+O1xuXG5cdFx0aWYgKHRydWUpIHtcblx0XHRcdGlmICgodGhpcy5fY3VydmVzID09IG51bGwgfHwgdmFsdWVzID09IG51bGwpICYmICh0aGlzLl9jdXJ2ZXMgIT0gbnVsbCB8fCB2YWx1ZXMgIT0gbnVsbCkpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKVxuXHRcdFx0XHRcdHRoaXMuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fY3VydmVzID0gdmFsdWVzO1xuXG5cdFx0XHRpZiAodmFsdWVzICE9IG51bGwgJiYgdGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcblx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdGluZGV4ID0gdGhpcy5nZXRPZmZzZXQoQ3VydmVTdWJHZW9tZXRyeS5DVVJWRV9EQVRBKTtcblx0XHRcdFx0c3RyaWRlID0gdGhpcy5nZXRTdHJpZGUoQ3VydmVTdWJHZW9tZXRyeS5DVVJWRV9EQVRBKTtcbiAgICAgICAgICAgICAgICBjdXJ2ZXMgPSB0aGlzLl9wVmVydGljZXM7XG5cblx0XHRcdFx0d2hpbGUgKGkgPCB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnZlc1tpbmRleF0gPSB2YWx1ZXNbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgY3VydmVzW2luZGV4ICsgMV0gPSB2YWx1ZXNbaSsrXTtcblx0XHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5ub3RpZnlDdXJ2ZXNVcGRhdGUoKTtcblxuXHRcdHRoaXMuX2N1cnZlc0RpcnR5ID0gZmFsc2U7XG5cdH1cblxuXG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIHV2cyBiYXNlZCBvbiB0aGUgZ2VvbWV0cnkuXG5cdCAqL1xuXHRwdWJsaWMgdXBkYXRlVVZzKHZhbHVlczpBcnJheTxudW1iZXI+KVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyO1xuXHRcdHZhciBpbmRleDpudW1iZXI7XG5cdFx0dmFyIG9mZnNldDpudW1iZXI7XG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XG5cdFx0dmFyIHV2czpBcnJheTxudW1iZXI+O1xuXG5cdFx0aWYgKCF0aGlzLl9hdXRvRGVyaXZlVVZzKSB7XG5cdFx0XHRpZiAoKHRoaXMuX3V2cyA9PSBudWxsIHx8IHZhbHVlcyA9PSBudWxsKSAmJiAodGhpcy5fdXZzICE9IG51bGwgfHwgdmFsdWVzICE9IG51bGwpKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cylcblx0XHRcdFx0XHR0aGlzLl9wTm90aWZ5VmVydGljZXNVcGRhdGUoKTtcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3V2cyA9IHZhbHVlcztcblxuXHRcdFx0aWYgKHZhbHVlcyAhPSBudWxsICYmIHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XG5cdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRpbmRleCA9IHRoaXMuZ2V0T2Zmc2V0KEN1cnZlU3ViR2VvbWV0cnkuVVZfREFUQSk7XG5cdFx0XHRcdHN0cmlkZSA9IHRoaXMuZ2V0U3RyaWRlKEN1cnZlU3ViR2VvbWV0cnkuVVZfREFUQSk7XG5cdFx0XHRcdHV2cyA9IHRoaXMuX3BWZXJ0aWNlcztcblxuXHRcdFx0XHR3aGlsZSAoaSA8IHZhbHVlcy5sZW5ndGgpIHtcblx0XHRcdFx0XHR1dnNbaW5kZXhdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdFx0dXZzW2luZGV4ICsgMV0gPSB2YWx1ZXNbaSsrXTtcblx0XHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAodGhpcy5fdXZzID09IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fdXZzID0gbmV3IEFycmF5PG51bWJlcj4odGhpcy5fcG9zaXRpb25zLmxlbmd0aCoyLzMpO1xuXG5cdFx0XHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cylcblx0XHRcdFx0XHR0aGlzLl9wTm90aWZ5VmVydGljZXNVcGRhdGUoKTtcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdG9mZnNldCA9IHRoaXMuZ2V0T2Zmc2V0KEN1cnZlU3ViR2VvbWV0cnkuVVZfREFUQSk7XG5cdFx0XHRzdHJpZGUgPSB0aGlzLmdldFN0cmlkZShDdXJ2ZVN1Ykdlb21ldHJ5LlVWX0RBVEEpO1xuXG5cdFx0XHQvL2F1dG9kZXJpdmVkIHV2c1xuXHRcdFx0dXZzID0gdGhpcy5fY29uY2F0ZW5hdGVBcnJheXM/IHRoaXMuX3BWZXJ0aWNlcyA6IHRoaXMuX3V2cztcblxuXHRcdFx0aSA9IDA7XG5cdFx0XHRpbmRleCA9IG9mZnNldDtcblx0XHRcdHZhciB1dklkeDpudW1iZXIgPSAwO1xuXG5cdFx0XHQvL2NsZWFyIHV2IHZhbHVlc1xuXHRcdFx0dmFyIGxlblY6bnVtYmVyID0gdXZzLmxlbmd0aDtcblx0XHRcdHdoaWxlIChpbmRleCA8IGxlblYpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XG5cdFx0XHRcdFx0dGhpcy5fdXZzW2krK10gPSB1dnNbaW5kZXhdID0gdXZJZHgqLjU7XG5cdFx0XHRcdFx0dGhpcy5fdXZzW2krK10gPSB1dnNbaW5kZXggKyAxXSA9IDEuMCAtICh1dklkeCAmIDEpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHV2c1tpbmRleF0gPSB1dklkeCouNTtcblx0XHRcdFx0XHR1dnNbaW5kZXggKyAxXSA9IDEuMCAtICh1dklkeCAmIDEpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCsrdXZJZHggPT0gMylcblx0XHRcdFx0XHR1dklkeCA9IDA7XG5cblx0XHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMubm90aWZ5VVZzVXBkYXRlKCk7XG5cblx0XHR0aGlzLl91dnNEaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblxuXG5cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBkaXNwb3NlKClcblx0e1xuXHRcdHN1cGVyLmRpc3Bvc2UoKTtcblxuXHRcdHRoaXMuX3Bvc2l0aW9ucyA9IG51bGw7XG5cdFx0dGhpcy5fY3VydmVzID0gbnVsbDtcblx0XHR0aGlzLl91dnMgPSBudWxsO1xuXG5cdFx0dGhpcy5fZmFjZU5vcm1hbHMgPSBudWxsO1xuXHRcdHRoaXMuX2ZhY2VXZWlnaHRzID0gbnVsbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSBmYWNlIGluZGljZXMgb2YgdGhlIEN1cnZlU3ViR2VvbWV0cnkuXG5cdCAqXG5cdCAqIEBwYXJhbSBpbmRpY2VzIFRoZSBmYWNlIGluZGljZXMgdG8gdXBsb2FkLlxuXHQgKi9cblx0cHVibGljIHVwZGF0ZUluZGljZXMoaW5kaWNlczpBcnJheTxudW1iZXI+KVxuXHR7XG5cdFx0c3VwZXIudXBkYXRlSW5kaWNlcyhpbmRpY2VzKTtcblxuXHRcdHRoaXMuX2ZhY2VOb3JtYWxzRGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKHRoaXMuX2F1dG9EZXJpdmVOb3JtYWxzKVxuXHRcdFx0dGhpcy5fdmVydGV4Tm9ybWFsc0RpcnR5ID0gdHJ1ZTtcblxuXHR9XG5cblx0LyoqXG5cdCAqIENsb25lcyB0aGUgY3VycmVudCBvYmplY3Rcblx0ICogQHJldHVybiBBbiBleGFjdCBkdXBsaWNhdGUgb2YgdGhlIGN1cnJlbnQgb2JqZWN0LlxuXHQgKi9cblx0cHVibGljIGNsb25lKCk6Q3VydmVTdWJHZW9tZXRyeVxuXHR7XG5cdFx0dmFyIGNsb25lOkN1cnZlU3ViR2VvbWV0cnkgPSBuZXcgQ3VydmVTdWJHZW9tZXRyeSh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cyk7XG5cdFx0Y2xvbmUudXBkYXRlSW5kaWNlcyh0aGlzLl9wSW5kaWNlcy5jb25jYXQoKSk7XG5cdFx0Y2xvbmUudXBkYXRlUG9zaXRpb25zKHRoaXMuX3Bvc2l0aW9ucy5jb25jYXQoKSk7XG5cblx0XHRpZiAodGhpcy5fY3VydmVzKVxuXHRcdFx0Y2xvbmUudXBkYXRlQ3VydmVzKHRoaXMuX2N1cnZlcy5jb25jYXQoKSk7XG5cdFx0ZWxzZVxuXHRcdFx0Y2xvbmUudXBkYXRlQ3VydmVzKG51bGwpO1xuXG5cdFx0aWYgKHRoaXMuX3V2cyAmJiAhdGhpcy5fYXV0b0Rlcml2ZVVWcylcblx0XHRcdGNsb25lLnVwZGF0ZVVWcyh0aGlzLl91dnMuY29uY2F0KCkpO1xuXHRcdGVsc2Vcblx0XHRcdGNsb25lLnVwZGF0ZVVWcyhudWxsKTtcblxuXHRcdHJldHVybiBjbG9uZTtcblx0fVxuXG5cdHB1YmxpYyBzY2FsZVVWKHNjYWxlVTpudW1iZXIgPSAxLCBzY2FsZVY6bnVtYmVyID0gMSlcblx0e1xuXHRcdHZhciBpbmRleDpudW1iZXI7XG5cdFx0dmFyIG9mZnNldDpudW1iZXI7XG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XG5cdFx0dmFyIHV2czpBcnJheTxudW1iZXI+O1xuXG5cdFx0dXZzID0gdGhpcy5fdXZzO1xuXG5cdFx0dmFyIHJhdGlvVTpudW1iZXIgPSBzY2FsZVUvdGhpcy5fc2NhbGVVO1xuXHRcdHZhciByYXRpb1Y6bnVtYmVyID0gc2NhbGVWL3RoaXMuX3NjYWxlVjtcblxuXHRcdHRoaXMuX3NjYWxlVSA9IHNjYWxlVTtcblx0XHR0aGlzLl9zY2FsZVYgPSBzY2FsZVY7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHV2cy5sZW5ndGg7XG5cblx0XHRvZmZzZXQgPSAwO1xuXHRcdHN0cmlkZSA9IDI7XG5cblx0XHRpbmRleCA9IG9mZnNldDtcblxuXHRcdHdoaWxlIChpbmRleCA8IGxlbikge1xuXHRcdFx0dXZzW2luZGV4XSAqPSByYXRpb1U7XG5cdFx0XHR1dnNbaW5kZXggKyAxXSAqPSByYXRpb1Y7XG5cdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0fVxuXG5cdFx0dGhpcy5ub3RpZnlVVnNVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTY2FsZXMgdGhlIGdlb21ldHJ5LlxuXHQgKiBAcGFyYW0gc2NhbGUgVGhlIGFtb3VudCBieSB3aGljaCB0byBzY2FsZS5cblx0ICovXG5cdHB1YmxpYyBzY2FsZShzY2FsZTpudW1iZXIpXG5cdHtcblx0XHR2YXIgaTpudW1iZXI7XG5cdFx0dmFyIGluZGV4Om51bWJlcjtcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj47XG5cblx0XHRwb3NpdGlvbnMgPSB0aGlzLl9wb3NpdGlvbnM7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHBvc2l0aW9ucy5sZW5ndGg7XG5cblx0XHRvZmZzZXQgPSAwO1xuXHRcdHN0cmlkZSA9IDM7XG5cblx0XHRpID0gMDtcblx0XHRpbmRleCA9IG9mZnNldDtcblx0XHR3aGlsZSAoaSA8IGxlbikge1xuXHRcdFx0cG9zaXRpb25zW2luZGV4XSAqPSBzY2FsZTtcblx0XHRcdHBvc2l0aW9uc1tpbmRleCArIDFdICo9IHNjYWxlO1xuXHRcdFx0cG9zaXRpb25zW2luZGV4ICsgMl0gKj0gc2NhbGU7XG5cblx0XHRcdGkgKz0gMztcblx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHR9XG5cblx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uc1VwZGF0ZSgpO1xuXHR9XG5cblx0cHVibGljIGFwcGx5VHJhbnNmb3JtYXRpb24odHJhbnNmb3JtOk1hdHJpeDNEKVxuXHR7XG5cdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXG5cdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XG5cdFx0XHRwb3NpdGlvbnMgPSB0aGlzLl9wVmVydGljZXM7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBvc2l0aW9ucyA9IHRoaXMuX3Bvc2l0aW9ucztcblx0XHR9XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3Bvc2l0aW9ucy5sZW5ndGgvMztcblx0XHR2YXIgaTpudW1iZXI7XG5cdFx0dmFyIGkxOm51bWJlcjtcblx0XHR2YXIgaTI6bnVtYmVyO1xuXHRcdHZhciB2ZWN0b3I6VmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcblxuXHRcdHZhciBpbnZUcmFuc3Bvc2U6TWF0cml4M0Q7XG5cblxuXG5cdFx0dmFyIHZpMDpudW1iZXIgPSB0aGlzLmdldE9mZnNldChDdXJ2ZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEEpO1xuXHRcdHZhciB2U3RyaWRlOm51bWJlciA9IHRoaXMuZ2V0U3RyaWRlKEN1cnZlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQSk7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcblx0XHRcdGkxID0gdmkwICsgMTtcblx0XHRcdGkyID0gdmkwICsgMjtcblxuXHRcdFx0Ly8gYmFrZSBwb3NpdGlvblxuXHRcdFx0dmVjdG9yLnggPSBwb3NpdGlvbnNbdmkwXTtcblx0XHRcdHZlY3Rvci55ID0gcG9zaXRpb25zW2kxXTtcblx0XHRcdHZlY3Rvci56ID0gcG9zaXRpb25zW2kyXTtcblx0XHRcdHZlY3RvciA9IHRyYW5zZm9ybS50cmFuc2Zvcm1WZWN0b3IodmVjdG9yKTtcblx0XHRcdHBvc2l0aW9uc1t2aTBdID0gdmVjdG9yLng7XG5cdFx0XHRwb3NpdGlvbnNbaTFdID0gdmVjdG9yLnk7XG5cdFx0XHRwb3NpdGlvbnNbaTJdID0gdmVjdG9yLno7XG5cdFx0XHR2aTAgKz0gdlN0cmlkZTtcblxuXHRcdH1cblxuXHRcdHRoaXMubm90aWZ5UG9zaXRpb25zVXBkYXRlKCk7XG5cdH1cblxuXG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIG5vcm1hbHMgZm9yIGVhY2ggZmFjZS5cblx0ICovXG5cdHByaXZhdGUgdXBkYXRlRmFjZU5vcm1hbHMoKVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyID0gMDtcblx0XHR2YXIgajpudW1iZXIgPSAwO1xuXHRcdHZhciBrOm51bWJlciA9IDA7XG5cdFx0dmFyIGluZGV4Om51bWJlcjtcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcblxuXHRcdHZhciB4MTpudW1iZXIsIHgyOm51bWJlciwgeDM6bnVtYmVyO1xuXHRcdHZhciB5MTpudW1iZXIsIHkyOm51bWJlciwgeTM6bnVtYmVyO1xuXHRcdHZhciB6MTpudW1iZXIsIHoyOm51bWJlciwgejM6bnVtYmVyO1xuXHRcdHZhciBkeDE6bnVtYmVyLCBkeTE6bnVtYmVyLCBkejE6bnVtYmVyO1xuXHRcdHZhciBkeDI6bnVtYmVyLCBkeTI6bnVtYmVyLCBkejI6bnVtYmVyO1xuXHRcdHZhciBjeDpudW1iZXIsIGN5Om51bWJlciwgY3o6bnVtYmVyO1xuXHRcdHZhciBkOm51bWJlcjtcblxuXHRcdHZhciBwb3NpdGlvbnM6QXJyYXk8bnVtYmVyPiA9IHRoaXMuX3Bvc2l0aW9ucztcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcEluZGljZXMubGVuZ3RoO1xuXG5cdFx0aWYgKHRoaXMuX2ZhY2VOb3JtYWxzID09IG51bGwpXG5cdFx0XHR0aGlzLl9mYWNlTm9ybWFscyA9IG5ldyBBcnJheTxudW1iZXI+KGxlbik7XG5cblx0XHRpZiAodGhpcy5fdXNlRmFjZVdlaWdodHMgJiYgdGhpcy5fZmFjZVdlaWdodHMgPT0gbnVsbClcblx0XHRcdHRoaXMuX2ZhY2VXZWlnaHRzID0gbmV3IEFycmF5PG51bWJlcj4obGVuLzMpO1xuXG5cdFx0d2hpbGUgKGkgPCBsZW4pIHtcblx0XHRcdGluZGV4ID0gdGhpcy5fcEluZGljZXNbaSsrXSozO1xuXHRcdFx0eDEgPSBwb3NpdGlvbnNbaW5kZXhdO1xuXHRcdFx0eTEgPSBwb3NpdGlvbnNbaW5kZXggKyAxXTtcblx0XHRcdHoxID0gcG9zaXRpb25zW2luZGV4ICsgMl07XG5cdFx0XHRpbmRleCA9IHRoaXMuX3BJbmRpY2VzW2krK10qMztcblx0XHRcdHgyID0gcG9zaXRpb25zW2luZGV4XTtcblx0XHRcdHkyID0gcG9zaXRpb25zW2luZGV4ICsgMV07XG5cdFx0XHR6MiA9IHBvc2l0aW9uc1tpbmRleCArIDJdO1xuXHRcdFx0aW5kZXggPSB0aGlzLl9wSW5kaWNlc1tpKytdKjM7XG5cdFx0XHR4MyA9IHBvc2l0aW9uc1tpbmRleF07XG5cdFx0XHR5MyA9IHBvc2l0aW9uc1tpbmRleCArIDFdO1xuXHRcdFx0ejMgPSBwb3NpdGlvbnNbaW5kZXggKyAyXTtcblx0XHRcdGR4MSA9IHgzIC0geDE7XG5cdFx0XHRkeTEgPSB5MyAtIHkxO1xuXHRcdFx0ZHoxID0gejMgLSB6MTtcblx0XHRcdGR4MiA9IHgyIC0geDE7XG5cdFx0XHRkeTIgPSB5MiAtIHkxO1xuXHRcdFx0ZHoyID0gejIgLSB6MTtcblx0XHRcdGN4ID0gZHoxKmR5MiAtIGR5MSpkejI7XG5cdFx0XHRjeSA9IGR4MSpkejIgLSBkejEqZHgyO1xuXHRcdFx0Y3ogPSBkeTEqZHgyIC0gZHgxKmR5Mjtcblx0XHRcdGQgPSBNYXRoLnNxcnQoY3gqY3ggKyBjeSpjeSArIGN6KmN6KTtcblx0XHRcdC8vIGxlbmd0aCBvZiBjcm9zcyBwcm9kdWN0ID0gMip0cmlhbmdsZSBhcmVhXG5cblx0XHRcdGlmICh0aGlzLl91c2VGYWNlV2VpZ2h0cykge1xuXHRcdFx0XHR2YXIgdzpudW1iZXIgPSBkKjEwMDAwO1xuXG5cdFx0XHRcdGlmICh3IDwgMSlcblx0XHRcdFx0XHR3ID0gMTtcblxuXHRcdFx0XHR0aGlzLl9mYWNlV2VpZ2h0c1trKytdID0gdztcblx0XHRcdH1cblxuXHRcdFx0ZCA9IDEvZDtcblxuXHRcdFx0dGhpcy5fZmFjZU5vcm1hbHNbaisrXSA9IGN4KmQ7XG5cdFx0XHR0aGlzLl9mYWNlTm9ybWFsc1tqKytdID0gY3kqZDtcblx0XHRcdHRoaXMuX2ZhY2VOb3JtYWxzW2orK10gPSBjeipkO1xuXHRcdH1cblxuXHRcdHRoaXMuX2ZhY2VOb3JtYWxzRGlydHkgPSBmYWxzZTtcblx0fVxuXG5cdHB1YmxpYyBfcE5vdGlmeVZlcnRpY2VzVXBkYXRlKClcblx0e1xuXHRcdHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSA9IHRydWU7XG5cblx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uc1VwZGF0ZSgpO1xuXHRcdHRoaXMubm90aWZ5Q3VydmVzVXBkYXRlKCk7XG5cdFx0dGhpcy5ub3RpZnlVVnNVcGRhdGUoKTtcblx0fVxuXG5cdHByaXZhdGUgbm90aWZ5UG9zaXRpb25zVXBkYXRlKClcblx0e1xuXHRcdGlmICh0aGlzLl9wb3NpdGlvbnNEaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3Bvc2l0aW9uc0RpcnR5ID0gdHJ1ZTtcblxuXHRcdGlmICghdGhpcy5fcG9zaXRpb25zVXBkYXRlZClcblx0XHRcdHRoaXMuX3Bvc2l0aW9uc1VwZGF0ZWQgPSBuZXcgU3ViR2VvbWV0cnlFdmVudChTdWJHZW9tZXRyeUV2ZW50LlZFUlRJQ0VTX1VQREFURUQsIEN1cnZlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQSk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fcG9zaXRpb25zVXBkYXRlZCk7XG5cdH1cblxuXHRwcml2YXRlIG5vdGlmeUN1cnZlc1VwZGF0ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fY3VydmVzRGlydHkpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9jdXJ2ZXNEaXJ0eSA9IHRydWU7XG5cblx0XHRpZiAoIXRoaXMuX2N1cnZlc1VwZGF0ZWQpXG5cdFx0XHR0aGlzLl9jdXJ2ZXNVcGRhdGVkID0gbmV3IFN1Ykdlb21ldHJ5RXZlbnQoU3ViR2VvbWV0cnlFdmVudC5WRVJUSUNFU19VUERBVEVELCBDdXJ2ZVN1Ykdlb21ldHJ5LkNVUlZFX0RBVEEpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX2N1cnZlc1VwZGF0ZWQpO1xuXHR9XG5cblxuXG5cdHByaXZhdGUgbm90aWZ5VVZzVXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5fdXZzRGlydHkpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fdXZzRGlydHkgPSB0cnVlO1xuXG4gICAgICAgIGlmICghdGhpcy5fdXZzVXBkYXRlZClcbiAgICAgICAgICAgIHRoaXMuX3V2c1VwZGF0ZWQgPSBuZXcgU3ViR2VvbWV0cnlFdmVudChTdWJHZW9tZXRyeUV2ZW50LlZFUlRJQ0VTX1VQREFURUQsIEN1cnZlU3ViR2VvbWV0cnkuVVZfREFUQSk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3V2c1VwZGF0ZWQpO1xuICAgIH1cbn1cblxuZXhwb3J0ID0gQ3VydmVTdWJHZW9tZXRyeTsiXX0=