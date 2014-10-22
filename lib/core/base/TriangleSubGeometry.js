var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SubGeometryBase = require("awayjs-core/lib/core/base/SubGeometryBase");
var TriangleSubMesh = require("awayjs-core/lib/core/base/TriangleSubMesh");

var Vector3D = require("awayjs-core/lib/core/geom/Vector3D");
var SubGeometryEvent = require("awayjs-core/lib/events/SubGeometryEvent");

/**
* @class away.base.TriangleSubGeometry
*/
var TriangleSubGeometry = (function (_super) {
    __extends(TriangleSubGeometry, _super);
    /**
    *
    */
    function TriangleSubGeometry(concatenatedArrays) {
        _super.call(this, concatenatedArrays);
        this._positionsDirty = true;
        this._faceNormalsDirty = true;
        this._faceTangentsDirty = true;
        this._vertexNormalsDirty = true;
        this._vertexTangentsDirty = true;
        this._uvsDirty = true;
        this._secondaryUVsDirty = true;
        this._jointIndicesDirty = true;
        this._jointWeightsDirty = true;
        this._concatenateArrays = true;
        this._autoDeriveNormals = true;
        this._autoDeriveTangents = true;
        this._autoDeriveUVs = false;
        this._useFaceWeights = false;
        this._scaleU = 1;
        this._scaleV = 1;

        this._pSubMeshClass = TriangleSubMesh;
    }
    Object.defineProperty(TriangleSubGeometry.prototype, "scaleU", {
        /**
        *
        */
        get: function () {
            return this._scaleU;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TriangleSubGeometry.prototype, "scaleV", {
        /**
        *
        */
        get: function () {
            return this._scaleV;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TriangleSubGeometry.prototype, "useCondensedIndices", {
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

            this.notifyJointIndicesUpdate();
        },
        enumerable: true,
        configurable: true
    });


    TriangleSubGeometry.prototype._pUpdateStrideOffset = function () {
        if (this._concatenateArrays) {
            this._pOffset[TriangleSubGeometry.VERTEX_DATA] = 0;

            //always have positions
            this._pOffset[TriangleSubGeometry.POSITION_DATA] = 0;
            var stride = 3;

            if (this._vertexNormals != null) {
                this._pOffset[TriangleSubGeometry.NORMAL_DATA] = stride;
                stride += 3;
            }

            if (this._vertexTangents != null) {
                this._pOffset[TriangleSubGeometry.TANGENT_DATA] = stride;
                stride += 3;
            }

            if (this._uvs != null) {
                this._pOffset[TriangleSubGeometry.UV_DATA] = stride;
                stride += 2;
            }

            if (this._secondaryUVs != null) {
                this._pOffset[TriangleSubGeometry.SECONDARY_UV_DATA] = stride;
                stride += 2;
            }

            if (this._jointIndices != null) {
                this._pOffset[TriangleSubGeometry.JOINT_INDEX_DATA] = stride;
                stride += this._jointsPerVertex;
            }

            if (this._jointWeights != null) {
                this._pOffset[TriangleSubGeometry.JOINT_WEIGHT_DATA] = stride;
                stride += this._jointsPerVertex;
            }

            this._pStride[TriangleSubGeometry.VERTEX_DATA] = stride;
            this._pStride[TriangleSubGeometry.POSITION_DATA] = stride;
            this._pStride[TriangleSubGeometry.NORMAL_DATA] = stride;
            this._pStride[TriangleSubGeometry.TANGENT_DATA] = stride;
            this._pStride[TriangleSubGeometry.UV_DATA] = stride;
            this._pStride[TriangleSubGeometry.SECONDARY_UV_DATA] = stride;
            this._pStride[TriangleSubGeometry.JOINT_INDEX_DATA] = stride;
            this._pStride[TriangleSubGeometry.JOINT_WEIGHT_DATA] = stride;

            var len = this._pNumVertices * stride;

            if (this._pVertices == null)
                this._pVertices = new Array(len);
            else if (this._pVertices.length != len)
                this._pVertices.length = len;
        } else {
            this._pOffset[TriangleSubGeometry.POSITION_DATA] = 0;
            this._pOffset[TriangleSubGeometry.NORMAL_DATA] = 0;
            this._pOffset[TriangleSubGeometry.TANGENT_DATA] = 0;
            this._pOffset[TriangleSubGeometry.UV_DATA] = 0;
            this._pOffset[TriangleSubGeometry.SECONDARY_UV_DATA] = 0;
            this._pOffset[TriangleSubGeometry.JOINT_INDEX_DATA] = 0;
            this._pOffset[TriangleSubGeometry.JOINT_WEIGHT_DATA] = 0;

            this._pStride[TriangleSubGeometry.POSITION_DATA] = 3;
            this._pStride[TriangleSubGeometry.NORMAL_DATA] = 3;
            this._pStride[TriangleSubGeometry.TANGENT_DATA] = 3;
            this._pStride[TriangleSubGeometry.UV_DATA] = 2;
            this._pStride[TriangleSubGeometry.SECONDARY_UV_DATA] = 2;
            this._pStride[TriangleSubGeometry.JOINT_INDEX_DATA] = this._jointsPerVertex;
            this._pStride[TriangleSubGeometry.JOINT_WEIGHT_DATA] = this._jointsPerVertex;
        }

        this._pStrideOffsetDirty = false;
    };

    Object.defineProperty(TriangleSubGeometry.prototype, "jointsPerVertex", {
        /**
        *
        */
        get: function () {
            return this._jointsPerVertex;
        },
        set: function (value) {
            if (this._jointsPerVertex == value)
                return;

            this._jointsPerVertex = value;

            this._pStrideOffsetDirty = true;

            if (this._pConcatenateArrays)
                this._pNotifyVerticesUpdate();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(TriangleSubGeometry.prototype, "autoDeriveUVs", {
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


    Object.defineProperty(TriangleSubGeometry.prototype, "autoDeriveNormals", {
        /**
        * True if the vertex normals should be derived from the geometry, false if the vertex normals are set
        * explicitly.
        */
        get: function () {
            return this._autoDeriveNormals;
        },
        set: function (value) {
            if (this._autoDeriveNormals == value)
                return;

            this._autoDeriveNormals = value;

            if (value)
                this.notifyNormalsUpdate();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(TriangleSubGeometry.prototype, "autoDeriveTangents", {
        /**
        * True if the vertex tangents should be derived from the geometry, false if the vertex normals are set
        * explicitly.
        */
        get: function () {
            return this._autoDeriveTangents;
        },
        set: function (value) {
            if (this._autoDeriveTangents == value)
                return;

            this._autoDeriveTangents = value;

            if (value)
                this.notifyTangentsUpdate();
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(TriangleSubGeometry.prototype, "vertices", {
        /**
        *
        */
        get: function () {
            if (this._positionsDirty)
                this.updatePositions(this._positions);

            if (this._vertexNormalsDirty)
                this.updateVertexNormals(this._vertexNormals);

            if (this._vertexTangentsDirty)
                this.updateVertexTangents(this._vertexTangents);

            if (this._uvsDirty)
                this.updateUVs(this._uvs);

            if (this._secondaryUVsDirty)
                this.updateSecondaryUVs(this._secondaryUVs);

            if (this._jointIndicesDirty)
                this.updateJointIndices(this._jointIndices);

            if (this._jointWeightsDirty)
                this.updateJointWeights(this._jointWeights);

            return this._pVertices;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TriangleSubGeometry.prototype, "positions", {
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

    Object.defineProperty(TriangleSubGeometry.prototype, "vertexNormals", {
        /**
        *
        */
        get: function () {
            if (this._vertexNormalsDirty)
                this.updateVertexNormals(this._vertexNormals);

            return this._vertexNormals;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TriangleSubGeometry.prototype, "vertexTangents", {
        /**
        *
        */
        get: function () {
            if (this._vertexTangentsDirty)
                this.updateVertexTangents(this._vertexTangents);

            return this._vertexTangents;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TriangleSubGeometry.prototype, "faceNormals", {
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

    Object.defineProperty(TriangleSubGeometry.prototype, "faceTangents", {
        /**
        * The raw data of the face tangets, in the same order as the faces are listed in the index list.
        */
        get: function () {
            if (this._faceTangentsDirty)
                this.updateFaceTangents();

            return this._faceTangents;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TriangleSubGeometry.prototype, "uvs", {
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

    Object.defineProperty(TriangleSubGeometry.prototype, "secondaryUVs", {
        /**
        *
        */
        get: function () {
            if (this._secondaryUVsDirty)
                this.updateSecondaryUVs(this._secondaryUVs);

            return this._secondaryUVs;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TriangleSubGeometry.prototype, "jointIndices", {
        /**
        *
        */
        get: function () {
            if (this._jointIndicesDirty)
                this.updateJointIndices(this._jointIndices);

            if (this._useCondensedIndices)
                return this._condensedJointIndices;

            return this._jointIndices;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TriangleSubGeometry.prototype, "jointWeights", {
        /**
        *
        */
        get: function () {
            if (this._jointWeightsDirty)
                this.updateJointWeights(this._jointWeights);

            return this._jointWeights;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TriangleSubGeometry.prototype, "useFaceWeights", {
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

            if (this._autoDeriveNormals)
                this.notifyNormalsUpdate();

            if (this._autoDeriveTangents)
                this.notifyTangentsUpdate();

            this._faceNormalsDirty = true;
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(TriangleSubGeometry.prototype, "numCondensedJoints", {
        get: function () {
            if (this._jointIndicesDirty)
                this.updateJointIndices(this._jointIndices);

            return this._numCondensedJoints;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(TriangleSubGeometry.prototype, "condensedIndexLookUp", {
        get: function () {
            if (this._jointIndicesDirty)
                this.updateJointIndices(this._jointIndices);

            return this._condensedIndexLookUp;
        },
        enumerable: true,
        configurable: true
    });

    TriangleSubGeometry.prototype.getBoundingPositions = function () {
        if (this._positionsDirty)
            this.updatePositions(this._positions);

        return this._positions;
    };

    /**
    *
    */
    TriangleSubGeometry.prototype.updatePositions = function (values) {
        var i;
        var index;
        var stride;
        var positions;

        this._positions = values;

        if (this._positions == null)
            this._positions = new Array();

        this._pNumVertices = this._positions.length / 3;

        if (this._concatenateArrays) {
            var len = this._pNumVertices * this.getStride(TriangleSubGeometry.VERTEX_DATA);

            if (this._pVertices == null)
                this._pVertices = new Array(len);
            else if (this._pVertices.length != len)
                this._pVertices.length = len;

            i = 0;
            index = this.getOffset(TriangleSubGeometry.POSITION_DATA);
            stride = this.getStride(TriangleSubGeometry.POSITION_DATA);
            positions = this._pVertices;

            while (i < values.length) {
                positions[index] = values[i++];
                positions[index + 1] = values[i++];
                positions[index + 2] = values[i++];
                index += stride;
            }
        }

        if (this._autoDeriveNormals)
            this.notifyNormalsUpdate();

        if (this._autoDeriveTangents)
            this.notifyTangentsUpdate();

        if (this._autoDeriveUVs)
            this.notifyUVsUpdate();

        this.pInvalidateBounds();

        this.notifyPositionsUpdate();

        this._positionsDirty = false;
    };

    /**
    * Updates the vertex normals based on the geometry.
    */
    TriangleSubGeometry.prototype.updateVertexNormals = function (values) {
        var i;
        var index;
        var offset;
        var stride;
        var normals;

        if (!this._autoDeriveNormals) {
            if ((this._vertexNormals == null || values == null) && (this._vertexNormals != null || values != null)) {
                if (this._concatenateArrays)
                    this._pNotifyVerticesUpdate();
                else
                    this._pStrideOffsetDirty = true;
            }

            this._vertexNormals = values;

            if (values != null && this._concatenateArrays) {
                i = 0;
                index = this.getOffset(TriangleSubGeometry.NORMAL_DATA);
                stride = this.getStride(TriangleSubGeometry.NORMAL_DATA);
                normals = this._pVertices;

                while (i < values.length) {
                    normals[index] = values[i++];
                    normals[index + 1] = values[i++];
                    normals[index + 2] = values[i++];
                    index += stride;
                }
            }
        } else {
            if (this._vertexNormals == null) {
                this._vertexNormals = new Array(this._positions.length);

                if (this._concatenateArrays)
                    this._pNotifyVerticesUpdate();
                else
                    this._pStrideOffsetDirty = true;
            }

            if (this._faceNormalsDirty)
                this.updateFaceNormals();

            offset = this.getOffset(TriangleSubGeometry.NORMAL_DATA);
            stride = this.getStride(TriangleSubGeometry.NORMAL_DATA);

            //autoderived normals
            normals = this._concatenateArrays ? this._pVertices : this._vertexNormals;

            var f1 = 0;
            var f2 = 1;
            var f3 = 2;

            index = offset;

            //clear normal values
            var lenV = normals.length;
            while (index < lenV) {
                normals[index] = 0;
                normals[index + 1] = 0;
                normals[index + 2] = 0;
                index += stride;
            }

            var k = 0;
            var lenI = this._pIndices.length;
            var weight;

            i = 0;

            while (i < lenI) {
                weight = this._useFaceWeights ? this._faceWeights[k++] : 1;
                index = offset + this._pIndices[i++] * stride;
                normals[index] += this._faceNormals[f1] * weight;
                normals[index + 1] += this._faceNormals[f2] * weight;
                normals[index + 2] += this._faceNormals[f3] * weight;
                index = offset + this._pIndices[i++] * stride;
                normals[index] += this._faceNormals[f1] * weight;
                normals[index + 1] += this._faceNormals[f2] * weight;
                normals[index + 2] += this._faceNormals[f3] * weight;
                index = offset + this._pIndices[i++] * stride;
                normals[index] += this._faceNormals[f1] * weight;
                normals[index + 1] += this._faceNormals[f2] * weight;
                normals[index + 2] += this._faceNormals[f3] * weight;
                f1 += 3;
                f2 += 3;
                f3 += 3;
            }

            i = 0;
            index = offset;

            while (index < lenV) {
                var vx = normals[index];
                var vy = normals[index + 1];
                var vz = normals[index + 2];
                var d = 1.0 / Math.sqrt(vx * vx + vy * vy + vz * vz);

                if (this._concatenateArrays) {
                    this._vertexNormals[i++] = normals[index] = vx * d;
                    this._vertexNormals[i++] = normals[index + 1] = vy * d;
                    this._vertexNormals[i++] = normals[index + 2] = vz * d;
                } else {
                    normals[index] = vx * d;
                    normals[index + 1] = vy * d;
                    normals[index + 2] = vz * d;
                }

                index += stride;
            }
        }

        this.notifyNormalsUpdate();

        this._vertexNormalsDirty = false;
    };

    /**
    * Updates the vertex tangents based on the geometry.
    */
    TriangleSubGeometry.prototype.updateVertexTangents = function (values) {
        var i;
        var index;
        var offset;
        var stride;
        var tangents;

        if (!this._autoDeriveTangents) {
            if ((this._vertexTangents == null || values == null) && (this._vertexTangents != null || values != null)) {
                if (this._concatenateArrays)
                    this._pNotifyVerticesUpdate();
                else
                    this._pStrideOffsetDirty = true;
            }

            this._vertexTangents = values;

            if (values != null && this._concatenateArrays) {
                i = 0;
                index = this.getOffset(TriangleSubGeometry.TANGENT_DATA);
                stride = this.getStride(TriangleSubGeometry.TANGENT_DATA);
                tangents = this._pVertices;

                while (i < values.length) {
                    tangents[index] = values[i++];
                    tangents[index + 1] = values[i++];
                    tangents[index + 2] = values[i++];
                    index += stride;
                }
            }
        } else {
            if (this._vertexTangents == null) {
                this._vertexTangents = new Array(this._positions.length);

                if (this._concatenateArrays)
                    this._pNotifyVerticesUpdate();
                else
                    this._pStrideOffsetDirty = true;
            }

            if (this._faceTangentsDirty)
                this.updateFaceTangents();

            offset = this.getOffset(TriangleSubGeometry.TANGENT_DATA);
            stride = this.getStride(TriangleSubGeometry.TANGENT_DATA);

            //autoderived tangents
            tangents = this._concatenateArrays ? this._pVertices : this._vertexTangents;

            index = offset;

            //clear tangent values
            var lenV = tangents.length;
            while (index < lenV) {
                tangents[index] = 0;
                tangents[index + 1] = 0;
                tangents[index + 2] = 0;

                index += stride;
            }

            var k = 0;
            var weight;
            var f1 = 0;
            var f2 = 1;
            var f3 = 2;

            i = 0;

            //collect face tangents
            var lenI = this._pIndices.length;
            while (i < lenI) {
                weight = this._useFaceWeights ? this._faceWeights[k++] : 1;
                index = offset + this._pIndices[i++] * stride;
                tangents[index++] += this._faceTangents[f1] * weight;
                tangents[index++] += this._faceTangents[f2] * weight;
                tangents[index] += this._faceTangents[f3] * weight;
                index = offset + this._pIndices[i++] * stride;
                tangents[index++] += this._faceTangents[f1] * weight;
                tangents[index++] += this._faceTangents[f2] * weight;
                tangents[index] += this._faceTangents[f3] * weight;
                index = offset + this._pIndices[i++] * stride;
                tangents[index++] += this._faceTangents[f1] * weight;
                tangents[index++] += this._faceTangents[f2] * weight;
                tangents[index] += this._faceTangents[f3] * weight;
                f1 += 3;
                f2 += 3;
                f3 += 3;
            }

            i = 0;
            index = offset;

            while (index < lenV) {
                var vx = tangents[index];
                var vy = tangents[index + 1];
                var vz = tangents[index + 2];
                var d = 1.0 / Math.sqrt(vx * vx + vy * vy + vz * vz);

                if (this._concatenateArrays) {
                    this._vertexTangents[i++] = tangents[index] = vx * d;
                    this._vertexTangents[i++] = tangents[index + 1] = vy * d;
                    this._vertexTangents[i++] = tangents[index + 2] = vz * d;
                } else {
                    tangents[index] = vx * d;
                    tangents[index + 1] = vy * d;
                    tangents[index + 2] = vz * d;
                }

                index += stride;
            }
        }

        this.notifyTangentsUpdate();

        this._vertexTangentsDirty = false;
    };

    /**
    * Updates the uvs based on the geometry.
    */
    TriangleSubGeometry.prototype.updateUVs = function (values) {
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
                index = this.getOffset(TriangleSubGeometry.UV_DATA);
                stride = this.getStride(TriangleSubGeometry.UV_DATA);
                uvs = this._pVertices;

                while (i < values.length) {
                    uvs[index] = values[i++];
                    uvs[index + 1] = values[i++];
                    index += stride;
                }
            }
        } else {
            if (this._uvs == null) {
                this._uvs = new Array(this._positions.length * 2 / 3);

                if (this._concatenateArrays)
                    this._pNotifyVerticesUpdate();
                else
                    this._pStrideOffsetDirty = true;
            }

            offset = this.getOffset(TriangleSubGeometry.UV_DATA);
            stride = this.getStride(TriangleSubGeometry.UV_DATA);

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
                } else {
                    uvs[index] = uvIdx * .5;
                    uvs[index + 1] = 1.0 - (uvIdx & 1);
                }

                if (++uvIdx == 3)
                    uvIdx = 0;

                index += stride;
            }
        }

        if (this._autoDeriveTangents)
            this.notifyTangentsUpdate();

        this.notifyUVsUpdate();

        this._uvsDirty = false;
    };

    /**
    * Updates the secondary uvs based on the geometry.
    */
    TriangleSubGeometry.prototype.updateSecondaryUVs = function (values) {
        var i;
        var index;
        var offset;
        var stride;
        var uvs;

        if (this._concatenateArrays && (this._secondaryUVs == null || values == null) && (this._secondaryUVs != null || values != null))
            this._pNotifyVerticesUpdate();

        this._secondaryUVs = values;

        if (values != null && this._concatenateArrays) {
            offset = this.getOffset(TriangleSubGeometry.SECONDARY_UV_DATA);
            stride = this.getStride(TriangleSubGeometry.SECONDARY_UV_DATA);

            i = 0;
            index = offset;
            uvs = this._pVertices;

            while (i < values.length) {
                uvs[index] = values[i++];
                uvs[index + 1] = values[i++];
                index += stride;
            }
        }

        this.notifySecondaryUVsUpdate();

        this._secondaryUVsDirty = false;
    };

    /**
    * Updates the joint indices
    */
    TriangleSubGeometry.prototype.updateJointIndices = function (values) {
        var i;
        var j;
        var index;
        var offset;
        var stride;
        var jointIndices;

        if (this._concatenateArrays && (this._jointIndices == null || values == null) && (this._jointIndices != null || values != null))
            this._pNotifyVerticesUpdate();

        this._jointIndices = values;

        if (values != null) {
            offset = this.getOffset(TriangleSubGeometry.JOINT_INDEX_DATA);
            stride = this.getStride(TriangleSubGeometry.JOINT_INDEX_DATA);
            if (this._useCondensedIndices) {
                i = 0;
                j = 0;
                index = offset;
                jointIndices = this._concatenateArrays ? this._pVertices : this._condensedJointIndices;
                var oldIndex;
                var newIndex = 0;
                var dic = new Object();

                if (!this._concatenateArrays)
                    this._condensedJointIndices = new Array(values.length);

                this._condensedIndexLookUp = new Array();

                while (i < values.length) {
                    for (j = 0; j < this._jointsPerVertex; j++) {
                        oldIndex = values[i++];

                        // if we encounter a new index, assign it a new condensed index
                        if (dic[oldIndex] == undefined) {
                            dic[oldIndex] = newIndex * 3; //3 required for the three vectors that store the matrix
                            this._condensedIndexLookUp[newIndex++] = oldIndex;
                        }
                        jointIndices[index + j] = dic[oldIndex];
                    }
                    index += stride;
                }
                this._numCondensedJoints = newIndex;
            } else if (this._concatenateArrays) {
                i = 0;
                index = offset;
                jointIndices = this._pVertices;

                while (i < values.length) {
                    j = 0;
                    while (j < this._jointsPerVertex)
                        jointIndices[index + j++] = values[i++];
                    index += stride;
                }
            }
        }

        this.notifyJointIndicesUpdate();

        this._jointIndicesDirty = false;
    };

    /**
    * Updates the joint weights.
    */
    TriangleSubGeometry.prototype.updateJointWeights = function (values) {
        var i;
        var j;
        var index;
        var offset;
        var stride;
        var jointWeights;

        if (this._concatenateArrays && (this._jointWeights == null || values == null) && (this._jointWeights != null || values != null))
            this._pNotifyVerticesUpdate();

        this._jointWeights = values;

        if (values != null && this._concatenateArrays) {
            offset = this.getOffset(TriangleSubGeometry.JOINT_WEIGHT_DATA);
            stride = this.getStride(TriangleSubGeometry.JOINT_WEIGHT_DATA);

            i = 0;
            index = offset;
            jointWeights = this._pVertices;

            while (i < values.length) {
                j = 0;
                while (j < this._jointsPerVertex)
                    jointWeights[index + j++] = values[i++];
                index += stride;
            }
        }

        this.notifyJointWeightsUpdate();

        this._jointWeightsDirty = false;
    };

    /**
    *
    */
    TriangleSubGeometry.prototype.dispose = function () {
        _super.prototype.dispose.call(this);

        this._positions = null;
        this._vertexNormals = null;
        this._vertexTangents = null;
        this._uvs = null;
        this._secondaryUVs = null;
        this._jointIndices = null;
        this._jointWeights = null;

        this._faceNormals = null;
        this._faceWeights = null;
        this._faceTangents = null;
    };

    /**
    * Updates the face indices of the TriangleSubGeometry.
    *
    * @param indices The face indices to upload.
    */
    TriangleSubGeometry.prototype.updateIndices = function (indices) {
        _super.prototype.updateIndices.call(this, indices);

        this._faceNormalsDirty = true;

        if (this._autoDeriveNormals)
            this._vertexNormalsDirty = true;

        if (this._autoDeriveTangents)
            this._vertexTangentsDirty = true;

        if (this._autoDeriveUVs)
            this._uvsDirty = true;
    };

    /**
    * Clones the current object
    * @return An exact duplicate of the current object.
    */
    TriangleSubGeometry.prototype.clone = function () {
        var clone = new TriangleSubGeometry(this._concatenateArrays);
        clone.updateIndices(this._pIndices.concat());
        clone.updatePositions(this._positions.concat());

        if (this._vertexNormals && !this._autoDeriveNormals)
            clone.updateVertexNormals(this._vertexNormals.concat());
        else
            clone.updateVertexNormals(null);

        if (this._uvs && !this._autoDeriveUVs)
            clone.updateUVs(this._uvs.concat());
        else
            clone.updateUVs(null);

        if (this._vertexTangents && !this._autoDeriveTangents)
            clone.updateVertexTangents(this._vertexTangents.concat());
        else
            clone.updateVertexTangents(null);

        if (this._secondaryUVs)
            clone.updateSecondaryUVs(this._secondaryUVs.concat());

        if (this._jointIndices) {
            clone.jointsPerVertex = this._jointsPerVertex;
            clone.updateJointIndices(this._jointIndices.concat());
        }

        if (this._jointWeights)
            clone.updateJointWeights(this._jointWeights.concat());

        return clone;
    };

    TriangleSubGeometry.prototype.scaleUV = function (scaleU, scaleV) {
        if (typeof scaleU === "undefined") { scaleU = 1; }
        if (typeof scaleV === "undefined") { scaleV = 1; }
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
    TriangleSubGeometry.prototype.scale = function (scale) {
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

    TriangleSubGeometry.prototype.applyTransformation = function (transform) {
        var positions;
        var normals;
        var tangents;

        if (this._concatenateArrays) {
            positions = this._pVertices;
            normals = this._pVertices;
            tangents = this._pVertices;
        } else {
            positions = this._positions;
            normals = this._vertexNormals;
            tangents = this._vertexTangents;
        }

        var len = this._positions.length / 3;
        var i;
        var i1;
        var i2;
        var vector = new Vector3D();

        var bakeNormals = this._vertexNormals != null;
        var bakeTangents = this._vertexTangents != null;
        var invTranspose;

        if (bakeNormals || bakeTangents) {
            invTranspose = transform.clone();
            invTranspose.invert();
            invTranspose.transpose();
        }

        var vi0 = this.getOffset(TriangleSubGeometry.POSITION_DATA);
        var ni0 = this.getOffset(TriangleSubGeometry.NORMAL_DATA);
        var ti0 = this.getOffset(TriangleSubGeometry.TANGENT_DATA);

        var vStride = this.getStride(TriangleSubGeometry.POSITION_DATA);
        var nStride = this.getStride(TriangleSubGeometry.NORMAL_DATA);
        var tStride = this.getStride(TriangleSubGeometry.TANGENT_DATA);

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

            // bake normal
            if (bakeNormals) {
                i1 = ni0 + 1;
                i2 = ni0 + 2;
                vector.x = normals[ni0];
                vector.y = normals[i1];
                vector.z = normals[i2];
                vector = invTranspose.deltaTransformVector(vector);
                vector.normalize();
                normals[ni0] = vector.x;
                normals[i1] = vector.y;
                normals[i2] = vector.z;
                ni0 += nStride;
            }

            // bake tangent
            if (bakeTangents) {
                i1 = ti0 + 1;
                i2 = ti0 + 2;
                vector.x = tangents[ti0];
                vector.y = tangents[i1];
                vector.z = tangents[i2];
                vector = invTranspose.deltaTransformVector(vector);
                vector.normalize();
                tangents[ti0] = vector.x;
                tangents[i1] = vector.y;
                tangents[i2] = vector.z;
                ti0 += tStride;
            }
        }

        this.notifyPositionsUpdate();
        this.notifyNormalsUpdate();
        this.notifyTangentsUpdate();
    };

    /**
    * Updates the tangents for each face.
    */
    TriangleSubGeometry.prototype.updateFaceTangents = function () {
        var i = 0;
        var index1;
        var index2;
        var index3;
        var vi;
        var v0;
        var dv1;
        var dv2;
        var denom;
        var x0, y0, z0;
        var dx1, dy1, dz1;
        var dx2, dy2, dz2;
        var cx, cy, cz;

        var positions = this._positions;
        var uvs = this._uvs;

        var len = this._pIndices.length;

        if (this._faceTangents == null)
            this._faceTangents = new Array(len);

        while (i < len) {
            index1 = this._pIndices[i];
            index2 = this._pIndices[i + 1];
            index3 = this._pIndices[i + 2];

            v0 = uvs[index1 * 2 + 1];
            dv1 = uvs[index2 * 2 + 1] - v0;
            dv2 = uvs[index3 * 2 + 1] - v0;

            vi = index1 * 3;
            x0 = positions[vi];
            y0 = positions[vi + 1];
            z0 = positions[vi + 2];
            vi = index2 * 3;
            dx1 = positions[vi] - x0;
            dy1 = positions[vi + 1] - y0;
            dz1 = positions[vi + 2] - z0;
            vi = index3 * 3;
            dx2 = positions[vi] - x0;
            dy2 = positions[vi + 1] - y0;
            dz2 = positions[vi + 2] - z0;

            cx = dv2 * dx1 - dv1 * dx2;
            cy = dv2 * dy1 - dv1 * dy2;
            cz = dv2 * dz1 - dv1 * dz2;
            denom = 1 / Math.sqrt(cx * cx + cy * cy + cz * cz);

            this._faceTangents[i++] = denom * cx;
            this._faceTangents[i++] = denom * cy;
            this._faceTangents[i++] = denom * cz;
        }

        this._faceTangentsDirty = false;
    };

    /**
    * Updates the normals for each face.
    */
    TriangleSubGeometry.prototype.updateFaceNormals = function () {
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

    TriangleSubGeometry.prototype._pNotifyVerticesUpdate = function () {
        this._pStrideOffsetDirty = true;

        this.notifyPositionsUpdate();
        this.notifyNormalsUpdate();
        this.notifyTangentsUpdate();
        this.notifyUVsUpdate();
        this.notifySecondaryUVsUpdate();
        this.notifyJointIndicesUpdate();
        this.notifyJointWeightsUpdate();
    };

    TriangleSubGeometry.prototype.notifyPositionsUpdate = function () {
        if (this._positionsDirty)
            return;

        this._positionsDirty = true;

        if (!this._positionsUpdated)
            this._positionsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.POSITION_DATA);

        this.dispatchEvent(this._positionsUpdated);
    };

    TriangleSubGeometry.prototype.notifyNormalsUpdate = function () {
        if (this._vertexNormalsDirty)
            return;

        this._vertexNormalsDirty = true;

        if (!this._normalsUpdated)
            this._normalsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.NORMAL_DATA);

        this.dispatchEvent(this._normalsUpdated);
    };

    TriangleSubGeometry.prototype.notifyTangentsUpdate = function () {
        if (this._vertexTangentsDirty)
            return;

        this._vertexTangentsDirty = true;

        if (!this._tangentsUpdated)
            this._tangentsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.TANGENT_DATA);

        this.dispatchEvent(this._tangentsUpdated);
    };

    TriangleSubGeometry.prototype.notifyUVsUpdate = function () {
        if (this._uvsDirty)
            return;

        this._uvsDirty = true;

        if (!this._uvsUpdated)
            this._uvsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.UV_DATA);

        this.dispatchEvent(this._uvsUpdated);
    };

    TriangleSubGeometry.prototype.notifySecondaryUVsUpdate = function () {
        if (this._secondaryUVsDirty)
            return;

        this._secondaryUVsDirty = true;

        if (!this._secondaryUVsUpdated)
            this._secondaryUVsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.SECONDARY_UV_DATA);

        this.dispatchEvent(this._secondaryUVsUpdated);
    };

    TriangleSubGeometry.prototype.notifyJointIndicesUpdate = function () {
        if (this._jointIndicesDirty)
            return;

        this._jointIndicesDirty = true;

        if (!this._jointIndicesUpdated)
            this._jointIndicesUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.JOINT_INDEX_DATA);

        this.dispatchEvent(this._jointIndicesUpdated);
    };

    TriangleSubGeometry.prototype.notifyJointWeightsUpdate = function () {
        if (this._jointWeightsDirty)
            return;

        this._jointWeightsDirty = true;

        if (!this._jointWeightsUpdated)
            this._jointWeightsUpdated = new SubGeometryEvent(SubGeometryEvent.VERTICES_UPDATED, TriangleSubGeometry.JOINT_WEIGHT_DATA);

        this.dispatchEvent(this._jointWeightsUpdated);
    };
    TriangleSubGeometry.POSITION_DATA = "positions";
    TriangleSubGeometry.NORMAL_DATA = "vertexNormals";
    TriangleSubGeometry.TANGENT_DATA = "vertexTangents";
    TriangleSubGeometry.UV_DATA = "uvs";
    TriangleSubGeometry.SECONDARY_UV_DATA = "secondaryUVs";
    TriangleSubGeometry.JOINT_INDEX_DATA = "jointIndices";
    TriangleSubGeometry.JOINT_WEIGHT_DATA = "jointWeights";

    TriangleSubGeometry.POSITION_FORMAT = "float3";
    TriangleSubGeometry.NORMAL_FORMAT = "float3";
    TriangleSubGeometry.TANGENT_FORMAT = "float3";
    TriangleSubGeometry.UV_FORMAT = "float2";
    TriangleSubGeometry.SECONDARY_UV_FORMAT = "float2";
    return TriangleSubGeometry;
})(SubGeometryBase);

module.exports = TriangleSubGeometry;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvYmFzZS9UcmlhbmdsZVN1Ykdlb21ldHJ5LnRzIl0sIm5hbWVzIjpbIlRyaWFuZ2xlU3ViR2VvbWV0cnkiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LmNvbnN0cnVjdG9yIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS5fcFVwZGF0ZVN0cmlkZU9mZnNldCIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkuZ2V0Qm91bmRpbmdQb3NpdGlvbnMiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LnVwZGF0ZVBvc2l0aW9ucyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkudXBkYXRlVmVydGV4Tm9ybWFscyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkudXBkYXRlVmVydGV4VGFuZ2VudHMiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LnVwZGF0ZVVWcyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkudXBkYXRlU2Vjb25kYXJ5VVZzIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS51cGRhdGVKb2ludEluZGljZXMiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LnVwZGF0ZUpvaW50V2VpZ2h0cyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkuZGlzcG9zZSIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkudXBkYXRlSW5kaWNlcyIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkuY2xvbmUiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LnNjYWxlVVYiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LnNjYWxlIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS5hcHBseVRyYW5zZm9ybWF0aW9uIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS51cGRhdGVGYWNlVGFuZ2VudHMiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5LnVwZGF0ZUZhY2VOb3JtYWxzIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS5ub3RpZnlQb3NpdGlvbnNVcGRhdGUiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5Lm5vdGlmeU5vcm1hbHNVcGRhdGUiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5Lm5vdGlmeVRhbmdlbnRzVXBkYXRlIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS5ub3RpZnlVVnNVcGRhdGUiLCJUcmlhbmdsZVN1Ykdlb21ldHJ5Lm5vdGlmeVNlY29uZGFyeVVWc1VwZGF0ZSIsIlRyaWFuZ2xlU3ViR2VvbWV0cnkubm90aWZ5Sm9pbnRJbmRpY2VzVXBkYXRlIiwiVHJpYW5nbGVTdWJHZW9tZXRyeS5ub3RpZnlKb2ludFdlaWdodHNVcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDBFQUFnRjtBQUNoRiwwRUFBZ0Y7O0FBRWhGLDREQUFvRTtBQUNwRSx5RUFBK0U7O0FBRS9FOztFQUVHO0FBQ0g7SUFBa0NBLHNDQUFlQTtJQSthaERBOztNQURHQTtJQUNIQSw2QkFBWUEsa0JBQTBCQTtRQUVyQ0MsV0FBTUEsT0FBQUEsa0JBQWtCQSxDQUFDQTtRQWhhMUJBLEtBQVFBLGVBQWVBLEdBQVdBLElBQUlBLENBQUNBO1FBQ3ZDQSxLQUFRQSxpQkFBaUJBLEdBQVdBLElBQUlBLENBQUNBO1FBQ3pDQSxLQUFRQSxrQkFBa0JBLEdBQVdBLElBQUlBLENBQUNBO1FBQzFDQSxLQUFRQSxtQkFBbUJBLEdBQVdBLElBQUlBLENBQUNBO1FBQzNDQSxLQUFRQSxvQkFBb0JBLEdBQVdBLElBQUlBLENBQUNBO1FBQzVDQSxLQUFRQSxTQUFTQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUNqQ0EsS0FBUUEsa0JBQWtCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUMxQ0EsS0FBUUEsa0JBQWtCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQUMxQ0EsS0FBUUEsa0JBQWtCQSxHQUFXQSxJQUFJQSxDQUFDQTtRQWlCMUNBLEtBQVFBLGtCQUFrQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDMUNBLEtBQVFBLGtCQUFrQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDMUNBLEtBQVFBLG1CQUFtQkEsR0FBV0EsSUFBSUEsQ0FBQ0E7UUFDM0NBLEtBQVFBLGNBQWNBLEdBQVdBLEtBQUtBLENBQUNBO1FBQ3ZDQSxLQUFRQSxlQUFlQSxHQUFXQSxLQUFLQSxDQUFDQTtRQU14Q0EsS0FBUUEsT0FBT0EsR0FBVUEsQ0FBQ0EsQ0FBQ0E7UUFDM0JBLEtBQVFBLE9BQU9BLEdBQVVBLENBQUNBLENBQUNBOztRQThYMUJBLElBQUlBLENBQUNBLGNBQWNBLEdBQUdBLGVBQWVBO0lBQ3RDQSxDQUFDQTtJQWxYREQ7UUFBQUE7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLE9BQU9BO1FBQ3BCQSxDQUFDQTs7OztBQUFBQTtJQUtEQTtRQUFBQTs7VUFER0E7YUFDSEE7WUFFQ0EsT0FBT0EsSUFBSUEsQ0FBQ0EsT0FBT0E7UUFDcEJBLENBQUNBOzs7O0FBQUFBO0lBT0RBO1FBQUFBOzs7O1VBREdBO2FBQ0hBO1lBRUNBLE9BQU9BLElBQUlBLENBQUNBLG9CQUFvQkE7UUFDakNBLENBQUNBO1FBRURBLEtBQUFBLFVBQStCQSxLQUFhQTtZQUUzQ0EsSUFBSUEsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxJQUFJQSxLQUFLQTtnQkFDckNBLE1BQU9BLENBQUFBOztZQUVSQSxJQUFJQSxDQUFDQSxvQkFBb0JBLEdBQUdBLEtBQUtBOztZQUVqQ0EsSUFBSUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxDQUFDQTtRQUNoQ0EsQ0FBQ0E7Ozs7QUFWQUE7O0lBWURBLHFEQUFBQTtRQUVDRSxJQUFJQSxJQUFJQSxDQUFDQSxrQkFBa0JBLENBQUVBO1lBQzVCQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxtQkFBbUJBLENBQUNBLFdBQVdBLENBQUNBLEdBQUdBLENBQUNBOztZQUVsREEsdUJBQXVCQTtZQUN2QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxhQUFhQSxDQUFDQSxHQUFHQSxDQUFDQTtZQUNwREEsSUFBSUEsTUFBTUEsR0FBVUEsQ0FBQ0E7O1lBRXJCQSxJQUFJQSxJQUFJQSxDQUFDQSxjQUFjQSxJQUFJQSxJQUFJQSxDQUFFQTtnQkFDaENBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsTUFBTUE7Z0JBQ3ZEQSxNQUFNQSxJQUFJQSxDQUFDQTthQUNYQTs7WUFFREEsSUFBSUEsSUFBSUEsQ0FBQ0EsZUFBZUEsSUFBSUEsSUFBSUEsQ0FBRUE7Z0JBQ2pDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxtQkFBbUJBLENBQUNBLFlBQVlBLENBQUNBLEdBQUdBLE1BQU1BO2dCQUN4REEsTUFBTUEsSUFBSUEsQ0FBQ0E7YUFDWEE7O1lBRURBLElBQUlBLElBQUlBLENBQUNBLElBQUlBLElBQUlBLElBQUlBLENBQUVBO2dCQUN0QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxNQUFNQTtnQkFDbkRBLE1BQU1BLElBQUlBLENBQUNBO2FBQ1hBOztZQUVEQSxJQUFJQSxJQUFJQSxDQUFDQSxhQUFhQSxJQUFJQSxJQUFJQSxDQUFFQTtnQkFDL0JBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxHQUFHQSxNQUFNQTtnQkFDN0RBLE1BQU1BLElBQUlBLENBQUNBO2FBQ1hBOztZQUVEQSxJQUFJQSxJQUFJQSxDQUFDQSxhQUFhQSxJQUFJQSxJQUFJQSxDQUFFQTtnQkFDL0JBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxHQUFHQSxNQUFNQTtnQkFDNURBLE1BQU1BLElBQUlBLElBQUlBLENBQUNBLGdCQUFnQkE7YUFDL0JBOztZQUVEQSxJQUFJQSxJQUFJQSxDQUFDQSxhQUFhQSxJQUFJQSxJQUFJQSxDQUFFQTtnQkFDL0JBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxHQUFHQSxNQUFNQTtnQkFDN0RBLE1BQU1BLElBQUlBLElBQUlBLENBQUNBLGdCQUFnQkE7YUFDL0JBOztZQUVEQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxtQkFBbUJBLENBQUNBLFdB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QSxHQUFHQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxNQUFNQTtnQkFDbERBLE9BQU9BLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLE1BQU1BO2dCQUNsREEsS0FBS0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsTUFBTUE7Z0JBQzNDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxNQUFNQTtnQkFDOUNBLE9BQU9BLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLE1BQU1BO2dCQUNsREEsT0FBT0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsTUFBTUE7Z0JBQ2xEQSxFQUFFQSxJQUFJQSxDQUFDQTtnQkFDUEEsRUFBRUEsSUFBSUEsQ0FBQ0E7Z0JBQ1BBLEVBQUVBLElBQUlBLENBQUNBO2FBQ1BBOztZQUVEQSxDQUFDQSxHQUFHQSxDQUFDQTtZQUNMQSxLQUFLQSxHQUFHQSxNQUFNQTs7WUFHZEEsT0FBT0EsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBRUE7Z0JBQ3BCQSxJQUFJQSxFQUFFQSxHQUFVQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQTtnQkFDOUJBLElBQUlBLEVBQUVBLEdBQVVBLE9BQU9BLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNsQ0EsSUFBSUEsRUFBRUEsR0FBVUEsT0FBT0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xDQSxJQUFJQSxDQUFD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LEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBO2dCQUN2QkEsUUFBUUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7O2dCQUV2QkEsS0FBS0EsSUFBSUEsTUFBTUE7YUFDZkE7O1lBRURBLElBQUlBLENBQUNBLEdBQVVBLENBQUNBO1lBQ2hCQSxJQUFJQSxNQUFNQTtZQUNWQSxJQUFJQSxFQUFFQSxHQUFVQSxDQUFDQTtZQUNqQkEsSUFBSUEsRUFBRUEsR0FBVUEsQ0FBQ0E7WUFDakJBLElBQUlBLEVBQUVBLEdBQVVBLENBQUNBOztZQUVqQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7O1lBRUxBLHVCQUF1QkE7WUFDdkJBLElBQUlBLElBQUlBLEdBQVVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BO1lBQ3ZDQSxPQUFPQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFFQTtnQkFDaEJBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLGVBQWVBLEdBQUVBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBO2dCQUN6REEsS0FBS0EsR0FBR0EsTUFBTUEsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsTUFBTUE7Z0JBQzNDQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxNQUFNQTtnQkFDbERBLFFBQVFBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLE1BQU1BO2dCQUNsREEsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsTUFBTUE7Z0JBQ2hEQSxLQUFLQSxHQUFHQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxNQUFNQTtnQkFDM0NBLFFBQVFBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLE1BQU1BO2dCQUNsREEsUUFBUUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsTUFBTUE7Z0JBQ2xEQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxNQUFNQTtnQkFDaERBLEtBQUtBLEdBQUdBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLE1BQU1BO2dCQUMzQ0EsUUFBUUEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsTUFBTUE7Z0JBQ2xEQSxRQUFRQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxNQUFNQTtnQkFDbERBLFFBQVFBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLE1BQU1BO2dCQUNoREEsRUFBRUEsSUFBSUEsQ0FBQ0E7Z0JBQ1BBLEVBQUVBLElBQUlBLENBQUNBO2dCQUNQQSxFQUFFQSxJQUFJQSxDQUFDQTthQUNQQTs7WUFFREEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7WUFDTEEsS0FBS0EsR0FBR0EsTUFBTUE7O1lBR2RBLE9BQU9BLEtBQUtBLEdBQUdBLElBQUlBLENBQUVBO2dCQUNwQkEsSUFBSUEsRUFBRUEsR0FBVUEsUUFBUUEsQ0FBQ0EsS0FBS0EsQ0FBQ0E7Z0JBQy9CQSxJQUFJQSxFQUFFQSxHQUFVQSxRQUFRQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDbkNBLElBQUlBLEVBQUVBLEdBQVVBLFFBQVFBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNuQ0EsSUFBSUEsQ0FBQ0EsR0FBVUEsR0FBR0EsR0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBQ0EsRUFBRUEsQ0FBQ0E7O2dCQUVuREEsSUFBSUEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFFQTtvQkFDNUJBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFFBQVFBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUNBLENBQUNBO29CQUNsREEsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsUUFBUUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBQ0EsQ0FBQ0E7b0JBQ3REQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxRQUFRQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFDQSxDQUFDQTtpQkFDdERBLEtBQU1BO29CQUNOQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFDQSxDQUFDQTtvQkFDdEJBLFFBQVFBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUNBLENBQUNBO29CQUMxQkEsUUFBUUEsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBQ0EsQ0FBQ0E7aUJBQzFCQTs7Z0JBRURBLEtBQUtBLElBQUlBLE1BQU1BO2FBQ2ZBO1NBQ0RBOztRQUVEQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLENB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LE1BQU1BLEdBQVVBLE1BQU1BLEdBQUNBLElBQUlBLENBQUNBLE9BQU9BO1FBQ3ZDQSxJQUFJQSxNQUFNQSxHQUFVQSxNQUFNQSxHQUFDQSxJQUFJQSxDQUFDQSxPQUFPQTs7UUFFdkNBLElBQUlBLENBQUNBLE9BQU9BLEdBQUdBLE1BQU1BO1FBQ3JCQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxNQUFNQTs7UUFFckJBLElBQUlBLEdBQUdBLEdBQVVBLEdBQUdBLENBQUNBLE1BQU1BOztRQUUzQkEsTUFBTUEsR0FBR0EsQ0FBQ0E7UUFDVkEsTUFBTUEsR0FBR0EsQ0FBQ0E7O1FBRVZBLEtBQUtBLEdBQUdBLE1BQU1BOztRQUVkQSxPQUFPQSxLQUFLQSxHQUFHQSxHQUFHQSxDQUFFQTtZQUNuQkEsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsTUFBTUE7WUFDcEJBLEdBQUdBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBLElBQUlBLE1BQU1BO1lBQ3hCQSxLQUFLQSxJQUFJQSxNQUFNQTtTQUNmQTs7UUFFREEsSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7SUFDdkJBLENBQUNBOztJQU1EZDs7O01BREdBOzBDQUNIQSxVQUFhQSxLQUFZQTtRQUV4QmUsSUFBSUEsQ0FBQ0E7UUFDTEEsSUFBSUEsS0FBS0E7UUFDVEEsSUFBSUEsTUFBTUE7UUFDVkEsSUFBSUEsTUFBTUE7UUFDVkEsSUFBSUEsU0FBU0E7O1FBRWJBLFNBQVNBLEdBQUdBLElBQUlBLENBQUNBLFVBQVVBOztRQUUzQkEsSUFBSUEsR0FBR0EsR0FBVUEsU0FBU0EsQ0FBQ0EsTUFBTUE7O1FBRWpDQSxNQUFNQSxHQUFHQSxDQUFDQTtRQUNWQSxNQUFNQSxHQUFHQSxDQUFDQTs7UUFFVkEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7UUFDTEEsS0FBS0EsR0FBR0EsTUFBTUE7UUFDZEEsT0FBT0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBRUE7WUFDZkEsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsS0FBS0E7WUFDekJBLFNB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LEVBQUVBLENBQUNBO1lBQ2xCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN0QkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDdEJBLEVBQUVBLEdBQUdBLE1BQU1BLEdBQUNBLENBQUNBO1lBQ2JBLEdBQUdBLEdBQUdBLFNBQVNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBO1lBQ3hCQSxHQUFHQSxHQUFHQSxTQUFTQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQTtZQUM1QkEsR0FBR0EsR0FBR0EsU0FBU0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUE7WUFDNUJBLEVBQUVBLEdBQUdBLE1BQU1BLEdBQUNBLENBQUNBO1lBQ2JBLEdBQUdBLEdBQUdBLFNBQVNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBO1lBQ3hCQSxHQUFHQSxHQUFHQSxTQUFTQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQTtZQUM1QkEsR0FBR0EsR0FBR0EsU0FBU0EsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUE7O1lBRTVCQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQTtZQUN0QkEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0E7WUFDdEJBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBO1lBQ3RCQSxLQUFLQSxHQUFHQSxDQUFDQSxHQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFDQSxFQUFFQSxDQUFDQTs7WUFFMUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEtBQUtBLEdBQUNBLEVBQUVBO1lBQ2xDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxLQUFLQSxHQUFDQSxFQUFFQTtZQUNsQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsS0FBS0EsR0FBQ0EsRUFBRUE7U0FDbENBOztRQUVEQSxJQUFJQSxDQUFDQSxrQkFBa0JBLEdBQUdBLEtBQUtBO0lBQ2hDQSxDQUFDQTs7SUFLRGpCOztNQURHQTtzREFDSEE7UUFFQ2tCLElBQUlBLENBQUNBLEdBQVVBLENBQUNBO1FBQ2hCQSxJQUFJQSxDQUFDQSxHQUFVQSxDQUFDQTtRQUNoQkEsSUFBSUEsQ0FBQ0EsR0FBVUEsQ0FBQ0E7UUFDaEJBLElBQUlBLEtBQUtBO1FBQ1RBLElBQUlBLE1BQU1BO1FBQ1ZBLElBQUlBLE1BQU1BOztRQUVWQSxJQUFJQSxFQUFFQSxFQUFTQSxFQUFFQSxFQUFTQSxFQUFFQTtRQUM1QkEsSUFBSUEsRUFBRUEsRUFBU0EsRUFBRUEsRUFBU0EsRUFBRUE7UUFDNUJBLElBQUlBLEVBQUVBLEVBQVNBLEVBQUVBLEVBQVNBLEVBQUVBO1FBQzVCQSxJQUFJQSxHQUFHQSxFQUFTQSxHQUFHQSxFQUFTQSxHQUFHQTtRQUMvQkEsSUFBSUEsR0FBR0EsRUFBU0EsR0FBR0EsRUFBU0EsR0FBR0E7UUFDL0JBLElBQUlBLEVBQUVBLEVBQVNBLEVBQUVBLEVBQVNBLEVBQUVBO1FBQzVCQSxJQUFJQSxDQUFDQTs7UUFFTEEsSUFBSUEsU0FBU0EsR0FBaUJBLElBQUlBLENBQUNBLFVBQVVBOztRQUU3Q0EsSUFBSUEsR0FBR0EsR0FBVUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUE7O1FBRXRDQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxJQUFJQSxJQUFJQTtZQUM1QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsS0FBS0EsQ0FBU0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7O1FBRTVDQSxJQUFJQSxJQUFJQSxDQUFDQSxlQUFlQSxJQUFJQSxJQUFJQSxDQUFDQSxZQUFZQSxJQUFJQSxJQUFJQTtZQUNwREEsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsS0FBS0EsQ0FBU0EsR0FBR0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O1FBRTlDQSxPQUFPQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFFQTtZQUNmQSxLQUFLQSxHQUFHQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQTtZQUM3QkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0E7WUFDckJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3pCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN6QkEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBQ0EsQ0FBQ0E7WUFDN0JBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBO1lBQ3JCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN6QkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDekJBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBO1lBQzdCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxLQUFLQSxDQUFDQTtZQUNyQkEsRUFBRUEsR0FBR0EsU0FBU0EsQ0FBQ0EsS0FBS0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDekJBLEVBQUVBLEdBQUdBLFNBQVNBLENBQUNBLEtBQUtBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3pCQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQTtZQUNiQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQTtZQUNiQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQTtZQUNiQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQTtZQUNiQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQTtZQUNiQSxHQUFHQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQTtZQUNiQSxFQUFFQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFDQSxHQUFHQTtZQUN0QkEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBQ0EsR0FBR0E7WUFDdEJBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUNBLEdBQUdBO1lBQ3RCQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFDQSxFQUFFQSxDQUFDQTs7WUFDcENBLDRDQUE0Q0E7WUFFNUNBLElBQUlBLElBQUlBLENBQUNBLGVBQWVBLENBQUVBO2dCQUN6QkEsSUFBSUEsQ0FBQ0EsR0FBVUEsQ0FBQ0EsR0FBQ0EsS0FBS0E7O2dCQUV0QkEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7b0JBQ1JBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBOztnQkFFUEEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0E7YUFDMUJBOztZQUVEQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFDQSxDQUFDQTs7WUFFUEEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBQ0EsQ0FBQ0E7WUFDN0JBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLEdB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Q0FBQ0E7O1FBRTVIQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBO0lBQzlDQSxDQUFDQTtJQS81Q0QxQixvQ0FBcUNBLFdBQVdBO0lBQ2hEQSxrQ0FBbUNBLGVBQWVBO0lBQ2xEQSxtQ0FBb0NBLGdCQUFnQkE7SUFDcERBLDhCQUErQkEsS0FBS0E7SUFDcENBLHdDQUF5Q0EsY0FBY0E7SUFDdkRBLHVDQUF3Q0EsY0FBY0E7SUFDdERBLHdDQUF5Q0EsY0FBY0E7O0lBR3ZEQSxzQ0FBdUNBLFFBQVFBO0lBQy9DQSxvQ0FBcUNBLFFBQVFBO0lBQzdDQSxxQ0FBc0NBLFFBQVFBO0lBQzlDQSxnQ0FBaUNBLFFBQVFBO0lBQ3pDQSwwQ0FBMkNBLFFBQVFBO0lBbTVDcERBLDJCQUFDQTtBQUFEQSxDQUFDQSxFQWw2Q2lDLGVBQWUsRUFrNkNoRDs7QUFFRCxvQ0FBNkIsQ0FBQSIsImZpbGUiOiJjb3JlL2Jhc2UvVHJpYW5nbGVTdWJHZW9tZXRyeS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdWJHZW9tZXRyeUJhc2VcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL1N1Ykdlb21ldHJ5QmFzZVwiKTtcbmltcG9ydCBUcmlhbmdsZVN1Yk1lc2hcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9iYXNlL1RyaWFuZ2xlU3ViTWVzaFwiKTtcbmltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9nZW9tL01hdHJpeDNEXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vVmVjdG9yM0RcIik7XG5pbXBvcnQgU3ViR2VvbWV0cnlFdmVudFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9ldmVudHMvU3ViR2VvbWV0cnlFdmVudFwiKTtcblxuLyoqXG4gKiBAY2xhc3MgYXdheS5iYXNlLlRyaWFuZ2xlU3ViR2VvbWV0cnlcbiAqL1xuY2xhc3MgVHJpYW5nbGVTdWJHZW9tZXRyeSBleHRlbmRzIFN1Ykdlb21ldHJ5QmFzZVxue1xuXHRwdWJsaWMgc3RhdGljIFBPU0lUSU9OX0RBVEE6c3RyaW5nID0gXCJwb3NpdGlvbnNcIjtcblx0cHVibGljIHN0YXRpYyBOT1JNQUxfREFUQTpzdHJpbmcgPSBcInZlcnRleE5vcm1hbHNcIjtcblx0cHVibGljIHN0YXRpYyBUQU5HRU5UX0RBVEE6c3RyaW5nID0gXCJ2ZXJ0ZXhUYW5nZW50c1wiO1xuXHRwdWJsaWMgc3RhdGljIFVWX0RBVEE6c3RyaW5nID0gXCJ1dnNcIjtcblx0cHVibGljIHN0YXRpYyBTRUNPTkRBUllfVVZfREFUQTpzdHJpbmcgPSBcInNlY29uZGFyeVVWc1wiO1xuXHRwdWJsaWMgc3RhdGljIEpPSU5UX0lOREVYX0RBVEE6c3RyaW5nID0gXCJqb2ludEluZGljZXNcIjtcblx0cHVibGljIHN0YXRpYyBKT0lOVF9XRUlHSFRfREFUQTpzdHJpbmcgPSBcImpvaW50V2VpZ2h0c1wiO1xuXG5cdC8vVE9ETyAtIG1vdmUgdGhlc2UgdG8gU3RhZ2VHTFxuXHRwdWJsaWMgc3RhdGljIFBPU0lUSU9OX0ZPUk1BVDpzdHJpbmcgPSBcImZsb2F0M1wiO1xuXHRwdWJsaWMgc3RhdGljIE5PUk1BTF9GT1JNQVQ6c3RyaW5nID0gXCJmbG9hdDNcIjtcblx0cHVibGljIHN0YXRpYyBUQU5HRU5UX0ZPUk1BVDpzdHJpbmcgPSBcImZsb2F0M1wiO1xuXHRwdWJsaWMgc3RhdGljIFVWX0ZPUk1BVDpzdHJpbmcgPSBcImZsb2F0MlwiO1xuXHRwdWJsaWMgc3RhdGljIFNFQ09OREFSWV9VVl9GT1JNQVQ6c3RyaW5nID0gXCJmbG9hdDJcIjtcblxuXHRwcml2YXRlIF9wb3NpdGlvbnNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfZmFjZU5vcm1hbHNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfZmFjZVRhbmdlbnRzRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX3ZlcnRleE5vcm1hbHNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfdmVydGV4VGFuZ2VudHNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfdXZzRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cdHByaXZhdGUgX3NlY29uZGFyeVVWc0RpcnR5OmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9qb2ludEluZGljZXNEaXJ0eTpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfam9pbnRXZWlnaHRzRGlydHk6Ym9vbGVhbiA9IHRydWU7XG5cblx0cHJpdmF0ZSBfcG9zaXRpb25zOkFycmF5PG51bWJlcj47XG5cdHByaXZhdGUgX3ZlcnRleE5vcm1hbHM6QXJyYXk8bnVtYmVyPjtcblx0cHJpdmF0ZSBfdmVydGV4VGFuZ2VudHM6QXJyYXk8bnVtYmVyPjtcblx0cHJpdmF0ZSBfdXZzOkFycmF5PG51bWJlcj47XG5cdHByaXZhdGUgX3NlY29uZGFyeVVWczpBcnJheTxudW1iZXI+O1xuXHRwcml2YXRlIF9qb2ludEluZGljZXM6QXJyYXk8bnVtYmVyPjtcblx0cHJpdmF0ZSBfam9pbnRXZWlnaHRzOkFycmF5PG51bWJlcj47XG5cblx0cHJpdmF0ZSBfdXNlQ29uZGVuc2VkSW5kaWNlczpib29sZWFuO1xuXHRwcml2YXRlIF9jb25kZW5zZWRKb2ludEluZGljZXM6QXJyYXk8bnVtYmVyPjtcblx0cHJpdmF0ZSBfY29uZGVuc2VkSW5kZXhMb29rVXA6QXJyYXk8bnVtYmVyPjtcblx0cHJpdmF0ZSBfbnVtQ29uZGVuc2VkSm9pbnRzOm51bWJlcjtcblxuXHRwcml2YXRlIF9qb2ludHNQZXJWZXJ0ZXg6bnVtYmVyO1xuXG5cdHByaXZhdGUgX2NvbmNhdGVuYXRlQXJyYXlzOmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9hdXRvRGVyaXZlTm9ybWFsczpib29sZWFuID0gdHJ1ZTtcblx0cHJpdmF0ZSBfYXV0b0Rlcml2ZVRhbmdlbnRzOmJvb2xlYW4gPSB0cnVlO1xuXHRwcml2YXRlIF9hdXRvRGVyaXZlVVZzOmJvb2xlYW4gPSBmYWxzZTtcblx0cHJpdmF0ZSBfdXNlRmFjZVdlaWdodHM6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdHByaXZhdGUgX2ZhY2VOb3JtYWxzOkFycmF5PG51bWJlcj47XG5cdHByaXZhdGUgX2ZhY2VUYW5nZW50czpBcnJheTxudW1iZXI+O1xuXHRwcml2YXRlIF9mYWNlV2VpZ2h0czpBcnJheTxudW1iZXI+O1xuXG5cdHByaXZhdGUgX3NjYWxlVTpudW1iZXIgPSAxO1xuXHRwcml2YXRlIF9zY2FsZVY6bnVtYmVyID0gMTtcblxuXHRwcml2YXRlIF9wb3NpdGlvbnNVcGRhdGVkOlN1Ykdlb21ldHJ5RXZlbnQ7XG5cdHByaXZhdGUgX25vcm1hbHNVcGRhdGVkOlN1Ykdlb21ldHJ5RXZlbnQ7XG5cdHByaXZhdGUgX3RhbmdlbnRzVXBkYXRlZDpTdWJHZW9tZXRyeUV2ZW50O1xuXHRwcml2YXRlIF91dnNVcGRhdGVkOlN1Ykdlb21ldHJ5RXZlbnQ7XG5cdHByaXZhdGUgX3NlY29uZGFyeVVWc1VwZGF0ZWQ6U3ViR2VvbWV0cnlFdmVudDtcblx0cHJpdmF0ZSBfam9pbnRJbmRpY2VzVXBkYXRlZDpTdWJHZW9tZXRyeUV2ZW50O1xuXHRwcml2YXRlIF9qb2ludFdlaWdodHNVcGRhdGVkOlN1Ykdlb21ldHJ5RXZlbnQ7XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHNjYWxlVSgpOm51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NjYWxlVTtcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCBzY2FsZVYoKTpudW1iZXJcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zY2FsZVY7XG5cdH1cblxuXHQvKipcblx0ICogT2ZmZXJzIHRoZSBvcHRpb24gb2YgZW5hYmxpbmcgR1BVIGFjY2VsZXJhdGVkIGFuaW1hdGlvbiBvbiBza2VsZXRvbnMgbGFyZ2VyIHRoYW4gMzIgam9pbnRzXG5cdCAqIGJ5IGNvbmRlbnNpbmcgdGhlIG51bWJlciBvZiBqb2ludCBpbmRleCB2YWx1ZXMgcmVxdWlyZWQgcGVyIG1lc2guIE9ubHkgYXBwbGljYWJsZSB0b1xuXHQgKiBza2VsZXRvbiBhbmltYXRpb25zIHRoYXQgdXRpbGlzZSBtb3JlIHRoYW4gb25lIG1lc2ggb2JqZWN0LiBEZWZhdWx0cyB0byBmYWxzZS5cblx0ICovXG5cdHB1YmxpYyBnZXQgdXNlQ29uZGVuc2VkSW5kaWNlcygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl91c2VDb25kZW5zZWRJbmRpY2VzO1xuXHR9XG5cblx0cHVibGljIHNldCB1c2VDb25kZW5zZWRJbmRpY2VzKHZhbHVlOmJvb2xlYW4pXG5cdHtcblx0XHRpZiAodGhpcy5fdXNlQ29uZGVuc2VkSW5kaWNlcyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3VzZUNvbmRlbnNlZEluZGljZXMgPSB2YWx1ZTtcblxuXHRcdHRoaXMubm90aWZ5Sm9pbnRJbmRpY2VzVXBkYXRlKCk7XG5cdH1cblxuXHRwdWJsaWMgX3BVcGRhdGVTdHJpZGVPZmZzZXQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XG5cdFx0XHR0aGlzLl9wT2Zmc2V0W1RyaWFuZ2xlU3ViR2VvbWV0cnkuVkVSVEVYX0RBVEFdID0gMDtcblxuXHRcdFx0Ly9hbHdheXMgaGF2ZSBwb3NpdGlvbnNcblx0XHRcdHRoaXMuX3BPZmZzZXRbVHJpYW5nbGVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBXSA9IDA7XG5cdFx0XHR2YXIgc3RyaWRlOm51bWJlciA9IDM7XG5cblx0XHRcdGlmICh0aGlzLl92ZXJ0ZXhOb3JtYWxzICE9IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fcE9mZnNldFtUcmlhbmdsZVN1Ykdlb21ldHJ5Lk5PUk1BTF9EQVRBXSA9IHN0cmlkZTtcblx0XHRcdFx0c3RyaWRlICs9IDM7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl92ZXJ0ZXhUYW5nZW50cyAhPSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX3BPZmZzZXRbVHJpYW5nbGVTdWJHZW9tZXRyeS5UQU5HRU5UX0RBVEFdID0gc3RyaWRlO1xuXHRcdFx0XHRzdHJpZGUgKz0gMztcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX3V2cyAhPSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX3BPZmZzZXRbVHJpYW5nbGVTdWJHZW9tZXRyeS5VVl9EQVRBXSA9IHN0cmlkZTtcblx0XHRcdFx0c3RyaWRlICs9IDI7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl9zZWNvbmRhcnlVVnMgIT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLl9wT2Zmc2V0W1RyaWFuZ2xlU3ViR2VvbWV0cnkuU0VDT05EQVJZX1VWX0RBVEFdID0gc3RyaWRlO1xuXHRcdFx0XHRzdHJpZGUgKz0gMjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX2pvaW50SW5kaWNlcyAhPSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX3BPZmZzZXRbVHJpYW5nbGVTdWJHZW9tZXRyeS5KT0lOVF9JTkRFWF9EQVRBXSA9IHN0cmlkZTtcblx0XHRcdFx0c3RyaWRlICs9IHRoaXMuX2pvaW50c1BlclZlcnRleDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX2pvaW50V2VpZ2h0cyAhPSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX3BPZmZzZXRbVHJpYW5nbGVTdWJHZW9tZXRyeS5KT0lOVF9XRUlHSFRfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHRcdHN0cmlkZSArPSB0aGlzLl9qb2ludHNQZXJWZXJ0ZXg7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3BTdHJpZGVbVHJpYW5nbGVTdWJHZW9tZXRyeS5WRVJURVhfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW1RyaWFuZ2xlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQV0gPSBzdHJpZGU7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW1RyaWFuZ2xlU3ViR2VvbWV0cnkuTk9STUFMX0RBVEFdID0gc3RyaWRlO1xuXHRcdFx0dGhpcy5fcFN0cmlkZVtUcmlhbmdsZVN1Ykdlb21ldHJ5LlRBTkdFTlRfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW1RyaWFuZ2xlU3ViR2VvbWV0cnkuVVZfREFUQV0gPSBzdHJpZGU7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW1RyaWFuZ2xlU3ViR2VvbWV0cnkuU0VDT05EQVJZX1VWX0RBVEFdID0gc3RyaWRlO1xuXHRcdFx0dGhpcy5fcFN0cmlkZVtUcmlhbmdsZVN1Ykdlb21ldHJ5LkpPSU5UX0lOREVYX0RBVEFdID0gc3RyaWRlO1xuXHRcdFx0dGhpcy5fcFN0cmlkZVtUcmlhbmdsZVN1Ykdlb21ldHJ5LkpPSU5UX1dFSUdIVF9EQVRBXSA9IHN0cmlkZTtcblxuXHRcdFx0dmFyIGxlbjpudW1iZXIgPSB0aGlzLl9wTnVtVmVydGljZXMqc3RyaWRlO1xuXG5cdFx0XHRpZiAodGhpcy5fcFZlcnRpY2VzID09IG51bGwpXG5cdFx0XHRcdHRoaXMuX3BWZXJ0aWNlcyA9IG5ldyBBcnJheTxudW1iZXI+KGxlbik7XG5cdFx0XHRlbHNlIGlmICh0aGlzLl9wVmVydGljZXMubGVuZ3RoICE9IGxlbilcblx0XHRcdFx0dGhpcy5fcFZlcnRpY2VzLmxlbmd0aCA9IGxlbjtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9wT2Zmc2V0W1RyaWFuZ2xlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQV0gPSAwO1xuXHRcdFx0dGhpcy5fcE9mZnNldFtUcmlhbmdsZVN1Ykdlb21ldHJ5Lk5PUk1BTF9EQVRBXSA9IDA7XG5cdFx0XHR0aGlzLl9wT2Zmc2V0W1RyaWFuZ2xlU3ViR2VvbWV0cnkuVEFOR0VOVF9EQVRBXSA9IDA7XG5cdFx0XHR0aGlzLl9wT2Zmc2V0W1RyaWFuZ2xlU3ViR2VvbWV0cnkuVVZfREFUQV0gPSAwO1xuXHRcdFx0dGhpcy5fcE9mZnNldFtUcmlhbmdsZVN1Ykdlb21ldHJ5LlNFQ09OREFSWV9VVl9EQVRBXSA9IDA7XG5cdFx0XHR0aGlzLl9wT2Zmc2V0W1RyaWFuZ2xlU3ViR2VvbWV0cnkuSk9JTlRfSU5ERVhfREFUQV0gPSAwO1xuXHRcdFx0dGhpcy5fcE9mZnNldFtUcmlhbmdsZVN1Ykdlb21ldHJ5LkpPSU5UX1dFSUdIVF9EQVRBXSA9IDA7XG5cblx0XHRcdHRoaXMuX3BTdHJpZGVbVHJpYW5nbGVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBXSA9IDM7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW1RyaWFuZ2xlU3ViR2VvbWV0cnkuTk9STUFMX0RBVEFdID0gMztcblx0XHRcdHRoaXMuX3BTdHJpZGVbVHJpYW5nbGVTdWJHZW9tZXRyeS5UQU5HRU5UX0RBVEFdID0gMztcblx0XHRcdHRoaXMuX3BTdHJpZGVbVHJpYW5nbGVTdWJHZW9tZXRyeS5VVl9EQVRBXSA9IDI7XG5cdFx0XHR0aGlzLl9wU3RyaWRlW1RyaWFuZ2xlU3ViR2VvbWV0cnkuU0VDT05EQVJZX1VWX0RBVEFdID0gMjtcblx0XHRcdHRoaXMuX3BTdHJpZGVbVHJpYW5nbGVTdWJHZW9tZXRyeS5KT0lOVF9JTkRFWF9EQVRBXSA9IHRoaXMuX2pvaW50c1BlclZlcnRleDtcblx0XHRcdHRoaXMuX3BTdHJpZGVbVHJpYW5nbGVTdWJHZW9tZXRyeS5KT0lOVF9XRUlHSFRfREFUQV0gPSB0aGlzLl9qb2ludHNQZXJWZXJ0ZXg7XG5cdFx0fVxuXG5cdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgam9pbnRzUGVyVmVydGV4KCk6bnVtYmVyXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fam9pbnRzUGVyVmVydGV4O1xuXHR9XG5cblx0cHVibGljIHNldCBqb2ludHNQZXJWZXJ0ZXgodmFsdWU6bnVtYmVyKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2pvaW50c1BlclZlcnRleCA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2pvaW50c1BlclZlcnRleCA9IHZhbHVlO1xuXG5cdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gdHJ1ZTtcblxuXHRcdGlmICh0aGlzLl9wQ29uY2F0ZW5hdGVBcnJheXMpXG5cdFx0XHR0aGlzLl9wTm90aWZ5VmVydGljZXNVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgYSBVViBidWZmZXIgc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIHRvIGNvbnRhaW4gZHVtbXkgVVYgY29vcmRpbmF0ZXMuXG5cdCAqIFNldCB0byB0cnVlIGlmIGEgZ2VvbWV0cnkgbGFja3MgVVYgZGF0YSBidXQgdXNlcyBhIG1hdGVyaWFsIHRoYXQgcmVxdWlyZXMgaXQsIG9yIGxlYXZlIGFzIGZhbHNlXG5cdCAqIGluIGNhc2VzIHdoZXJlIFVWIGRhdGEgaXMgZXhwbGljaXRseSBkZWZpbmVkIG9yIHRoZSBtYXRlcmlhbCBkb2VzIG5vdCByZXF1aXJlIFVWIGRhdGEuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGF1dG9EZXJpdmVVVnMoKTpib29sZWFuXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fYXV0b0Rlcml2ZVVWcztcblx0fVxuXG5cdHB1YmxpYyBzZXQgYXV0b0Rlcml2ZVVWcyh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2F1dG9EZXJpdmVVVnMgPT0gdmFsdWUpXG5cdFx0XHRyZXR1cm47XG5cblx0XHR0aGlzLl9hdXRvRGVyaXZlVVZzID0gdmFsdWU7XG5cblx0XHRpZiAodmFsdWUpXG5cdFx0XHR0aGlzLm5vdGlmeVVWc1VwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRydWUgaWYgdGhlIHZlcnRleCBub3JtYWxzIHNob3VsZCBiZSBkZXJpdmVkIGZyb20gdGhlIGdlb21ldHJ5LCBmYWxzZSBpZiB0aGUgdmVydGV4IG5vcm1hbHMgYXJlIHNldFxuXHQgKiBleHBsaWNpdGx5LlxuXHQgKi9cblx0cHVibGljIGdldCBhdXRvRGVyaXZlTm9ybWFscygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9hdXRvRGVyaXZlTm9ybWFscztcblx0fVxuXG5cdHB1YmxpYyBzZXQgYXV0b0Rlcml2ZU5vcm1hbHModmFsdWU6Ym9vbGVhbilcblx0e1xuXHRcdGlmICh0aGlzLl9hdXRvRGVyaXZlTm9ybWFscyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2F1dG9EZXJpdmVOb3JtYWxzID0gdmFsdWU7XG5cblx0XHRpZiAodmFsdWUpXG5cdFx0XHR0aGlzLm5vdGlmeU5vcm1hbHNVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUcnVlIGlmIHRoZSB2ZXJ0ZXggdGFuZ2VudHMgc2hvdWxkIGJlIGRlcml2ZWQgZnJvbSB0aGUgZ2VvbWV0cnksIGZhbHNlIGlmIHRoZSB2ZXJ0ZXggbm9ybWFscyBhcmUgc2V0XG5cdCAqIGV4cGxpY2l0bHkuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IGF1dG9EZXJpdmVUYW5nZW50cygpOmJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLl9hdXRvRGVyaXZlVGFuZ2VudHM7XG5cdH1cblxuXHRwdWJsaWMgc2V0IGF1dG9EZXJpdmVUYW5nZW50cyh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2F1dG9EZXJpdmVUYW5nZW50cyA9PSB2YWx1ZSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2F1dG9EZXJpdmVUYW5nZW50cyA9IHZhbHVlO1xuXG5cdFx0aWYgKHZhbHVlKVxuXHRcdFx0dGhpcy5ub3RpZnlUYW5nZW50c1VwZGF0ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHZlcnRpY2VzKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9uc0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVQb3NpdGlvbnModGhpcy5fcG9zaXRpb25zKTtcblxuXHRcdGlmICh0aGlzLl92ZXJ0ZXhOb3JtYWxzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVZlcnRleE5vcm1hbHModGhpcy5fdmVydGV4Tm9ybWFscyk7XG5cblx0XHRpZiAodGhpcy5fdmVydGV4VGFuZ2VudHNEaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlVmVydGV4VGFuZ2VudHModGhpcy5fdmVydGV4VGFuZ2VudHMpO1xuXG5cdFx0aWYgKHRoaXMuX3V2c0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVVVnModGhpcy5fdXZzKTtcblxuXHRcdGlmICh0aGlzLl9zZWNvbmRhcnlVVnNEaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlU2Vjb25kYXJ5VVZzKHRoaXMuX3NlY29uZGFyeVVWcyk7XG5cblx0XHRpZiAodGhpcy5fam9pbnRJbmRpY2VzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZUpvaW50SW5kaWNlcyh0aGlzLl9qb2ludEluZGljZXMpO1xuXG5cdFx0aWYgKHRoaXMuX2pvaW50V2VpZ2h0c0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVKb2ludFdlaWdodHModGhpcy5fam9pbnRXZWlnaHRzKTtcblxuXHRcdHJldHVybiB0aGlzLl9wVmVydGljZXM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgcG9zaXRpb25zKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9uc0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVQb3NpdGlvbnModGhpcy5fcG9zaXRpb25zKTtcblxuXHRcdHJldHVybiB0aGlzLl9wb3NpdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgdmVydGV4Tm9ybWFscygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdGlmICh0aGlzLl92ZXJ0ZXhOb3JtYWxzRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVZlcnRleE5vcm1hbHModGhpcy5fdmVydGV4Tm9ybWFscyk7XG5cblx0XHRyZXR1cm4gdGhpcy5fdmVydGV4Tm9ybWFscztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIGdldCB2ZXJ0ZXhUYW5nZW50cygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdGlmICh0aGlzLl92ZXJ0ZXhUYW5nZW50c0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVWZXJ0ZXhUYW5nZW50cyh0aGlzLl92ZXJ0ZXhUYW5nZW50cyk7XG5cblx0XHRyZXR1cm4gdGhpcy5fdmVydGV4VGFuZ2VudHM7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIHJhdyBkYXRhIG9mIHRoZSBmYWNlIG5vcm1hbHMsIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSBmYWNlcyBhcmUgbGlzdGVkIGluIHRoZSBpbmRleCBsaXN0LlxuXHQgKi9cblx0cHVibGljIGdldCBmYWNlTm9ybWFscygpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdGlmICh0aGlzLl9mYWNlTm9ybWFsc0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVGYWNlTm9ybWFscygpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2ZhY2VOb3JtYWxzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSByYXcgZGF0YSBvZiB0aGUgZmFjZSB0YW5nZXRzLCBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgZmFjZXMgYXJlIGxpc3RlZCBpbiB0aGUgaW5kZXggbGlzdC5cblx0ICovXG5cdHB1YmxpYyBnZXQgZmFjZVRhbmdlbnRzKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0aWYgKHRoaXMuX2ZhY2VUYW5nZW50c0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVGYWNlVGFuZ2VudHMoKTtcblxuXHRcdHJldHVybiB0aGlzLl9mYWNlVGFuZ2VudHM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgdXZzKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0aWYgKHRoaXMuX3V2c0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVVVnModGhpcy5fdXZzKTtcblxuXHRcdHJldHVybiB0aGlzLl91dnM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgc2Vjb25kYXJ5VVZzKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0aWYgKHRoaXMuX3NlY29uZGFyeVVWc0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVTZWNvbmRhcnlVVnModGhpcy5fc2Vjb25kYXJ5VVZzKTtcblxuXHRcdHJldHVybiB0aGlzLl9zZWNvbmRhcnlVVnM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgam9pbnRJbmRpY2VzKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0aWYgKHRoaXMuX2pvaW50SW5kaWNlc0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVKb2ludEluZGljZXModGhpcy5fam9pbnRJbmRpY2VzKTtcblxuXHRcdGlmICh0aGlzLl91c2VDb25kZW5zZWRJbmRpY2VzKVxuXHRcdFx0cmV0dXJuIHRoaXMuX2NvbmRlbnNlZEpvaW50SW5kaWNlcztcblxuXHRcdHJldHVybiB0aGlzLl9qb2ludEluZGljZXM7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdHB1YmxpYyBnZXQgam9pbnRXZWlnaHRzKCk6QXJyYXk8bnVtYmVyPlxuXHR7XG5cdFx0aWYgKHRoaXMuX2pvaW50V2VpZ2h0c0RpcnR5KVxuXHRcdFx0dGhpcy51cGRhdGVKb2ludFdlaWdodHModGhpcy5fam9pbnRXZWlnaHRzKTtcblxuXHRcdHJldHVybiB0aGlzLl9qb2ludFdlaWdodHM7XG5cdH1cblxuXHQvKipcblx0ICogSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRvIHRha2UgdGhlIHNpemUgb2YgZmFjZXMgaW50byBhY2NvdW50IHdoZW4gYXV0by1kZXJpdmluZyB2ZXJ0ZXggbm9ybWFscyBhbmQgdGFuZ2VudHMuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0IHVzZUZhY2VXZWlnaHRzKCk6Ym9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3VzZUZhY2VXZWlnaHRzO1xuXHR9XG5cblx0cHVibGljIHNldCB1c2VGYWNlV2VpZ2h0cyh2YWx1ZTpib29sZWFuKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3VzZUZhY2VXZWlnaHRzID09IHZhbHVlKVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fdXNlRmFjZVdlaWdodHMgPSB2YWx1ZTtcblxuXHRcdGlmICh0aGlzLl9hdXRvRGVyaXZlTm9ybWFscylcblx0XHRcdHRoaXMubm90aWZ5Tm9ybWFsc1VwZGF0ZSgpO1xuXG5cdFx0aWYgKHRoaXMuX2F1dG9EZXJpdmVUYW5nZW50cylcblx0XHRcdHRoaXMubm90aWZ5VGFuZ2VudHNVcGRhdGUoKTtcblxuXHRcdHRoaXMuX2ZhY2VOb3JtYWxzRGlydHkgPSB0cnVlO1xuXHR9XG5cblx0cHVibGljIGdldCBudW1Db25kZW5zZWRKb2ludHMoKTpudW1iZXJcblx0e1xuXHRcdGlmICh0aGlzLl9qb2ludEluZGljZXNEaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlSm9pbnRJbmRpY2VzKHRoaXMuX2pvaW50SW5kaWNlcyk7XG5cblx0XHRyZXR1cm4gdGhpcy5fbnVtQ29uZGVuc2VkSm9pbnRzO1xuXHR9XG5cblx0cHVibGljIGdldCBjb25kZW5zZWRJbmRleExvb2tVcCgpOkFycmF5PG51bWJlcj5cblx0e1xuXHRcdGlmICh0aGlzLl9qb2ludEluZGljZXNEaXJ0eSlcblx0XHRcdHRoaXMudXBkYXRlSm9pbnRJbmRpY2VzKHRoaXMuX2pvaW50SW5kaWNlcyk7XG5cblx0XHRyZXR1cm4gdGhpcy5fY29uZGVuc2VkSW5kZXhMb29rVXA7XG5cdH1cblxuXHQvKipcblx0ICpcblx0ICovXG5cdGNvbnN0cnVjdG9yKGNvbmNhdGVuYXRlZEFycmF5czpib29sZWFuKVxuXHR7XG5cdFx0c3VwZXIoY29uY2F0ZW5hdGVkQXJyYXlzKTtcblxuXHRcdHRoaXMuX3BTdWJNZXNoQ2xhc3MgPSBUcmlhbmdsZVN1Yk1lc2g7XG5cdH1cblxuXHRwdWJsaWMgZ2V0Qm91bmRpbmdQb3NpdGlvbnMoKTpBcnJheTxudW1iZXI+XG5cdHtcblx0XHRpZiAodGhpcy5fcG9zaXRpb25zRGlydHkpXG5cdFx0XHR0aGlzLnVwZGF0ZVBvc2l0aW9ucyh0aGlzLl9wb3NpdGlvbnMpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX3Bvc2l0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKlxuXHQgKi9cblx0cHVibGljIHVwZGF0ZVBvc2l0aW9ucyh2YWx1ZXM6QXJyYXk8bnVtYmVyPilcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xuXHRcdHZhciBwb3NpdGlvbnM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdHRoaXMuX3Bvc2l0aW9ucyA9IHZhbHVlcztcblxuXHRcdGlmICh0aGlzLl9wb3NpdGlvbnMgPT0gbnVsbClcblx0XHRcdHRoaXMuX3Bvc2l0aW9ucyA9IG5ldyBBcnJheTxudW1iZXI+KCk7XG5cblx0XHR0aGlzLl9wTnVtVmVydGljZXMgPSB0aGlzLl9wb3NpdGlvbnMubGVuZ3RoLzM7XG5cblx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcblx0XHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcE51bVZlcnRpY2VzKnRoaXMuZ2V0U3RyaWRlKFRyaWFuZ2xlU3ViR2VvbWV0cnkuVkVSVEVYX0RBVEEpO1xuXG5cdFx0XHRpZiAodGhpcy5fcFZlcnRpY2VzID09IG51bGwpXG5cdFx0XHRcdHRoaXMuX3BWZXJ0aWNlcyA9IG5ldyBBcnJheTxudW1iZXI+KGxlbik7XG5cdFx0XHRlbHNlIGlmICh0aGlzLl9wVmVydGljZXMubGVuZ3RoICE9IGxlbilcblx0XHRcdFx0dGhpcy5fcFZlcnRpY2VzLmxlbmd0aCA9IGxlbjtcblxuXHRcdFx0aSA9IDA7XG5cdFx0XHRpbmRleCA9IHRoaXMuZ2V0T2Zmc2V0KFRyaWFuZ2xlU3ViR2VvbWV0cnkuUE9TSVRJT05fREFUQSk7XG5cdFx0XHRzdHJpZGUgPSB0aGlzLmdldFN0cmlkZShUcmlhbmdsZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEEpO1xuXHRcdFx0cG9zaXRpb25zID0gdGhpcy5fcFZlcnRpY2VzO1xuXG5cdFx0XHR3aGlsZSAoaSA8IHZhbHVlcy5sZW5ndGgpIHtcblx0XHRcdFx0cG9zaXRpb25zW2luZGV4XSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRwb3NpdGlvbnNbaW5kZXggKyAxXSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRwb3NpdGlvbnNbaW5kZXggKyAyXSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2F1dG9EZXJpdmVOb3JtYWxzKVxuXHRcdFx0dGhpcy5ub3RpZnlOb3JtYWxzVXBkYXRlKCk7XG5cblx0XHRpZiAodGhpcy5fYXV0b0Rlcml2ZVRhbmdlbnRzKVxuXHRcdFx0dGhpcy5ub3RpZnlUYW5nZW50c1VwZGF0ZSgpO1xuXG5cdFx0aWYgKHRoaXMuX2F1dG9EZXJpdmVVVnMpXG5cdFx0XHR0aGlzLm5vdGlmeVVWc1VwZGF0ZSgpXG5cblx0XHR0aGlzLnBJbnZhbGlkYXRlQm91bmRzKCk7XG5cblx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uc1VwZGF0ZSgpO1xuXG5cdFx0dGhpcy5fcG9zaXRpb25zRGlydHkgPSBmYWxzZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGVzIHRoZSB2ZXJ0ZXggbm9ybWFscyBiYXNlZCBvbiB0aGUgZ2VvbWV0cnkuXG5cdCAqL1xuXHRwdWJsaWMgdXBkYXRlVmVydGV4Tm9ybWFscyh2YWx1ZXM6QXJyYXk8bnVtYmVyPilcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xuXHRcdHZhciBvZmZzZXQ6bnVtYmVyO1xuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xuXHRcdHZhciBub3JtYWxzOkFycmF5PG51bWJlcj47XG5cblx0XHRpZiAoIXRoaXMuX2F1dG9EZXJpdmVOb3JtYWxzKSB7XG5cdFx0XHRpZiAoKHRoaXMuX3ZlcnRleE5vcm1hbHMgPT0gbnVsbCB8fCB2YWx1ZXMgPT0gbnVsbCkgJiYgKHRoaXMuX3ZlcnRleE5vcm1hbHMgIT0gbnVsbCB8fCB2YWx1ZXMgIT0gbnVsbCkpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKVxuXHRcdFx0XHRcdHRoaXMuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fdmVydGV4Tm9ybWFscyA9IHZhbHVlcztcblxuXHRcdFx0aWYgKHZhbHVlcyAhPSBudWxsICYmIHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XG5cdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRpbmRleCA9IHRoaXMuZ2V0T2Zmc2V0KFRyaWFuZ2xlU3ViR2VvbWV0cnkuTk9STUFMX0RBVEEpO1xuXHRcdFx0XHRzdHJpZGUgPSB0aGlzLmdldFN0cmlkZShUcmlhbmdsZVN1Ykdlb21ldHJ5Lk5PUk1BTF9EQVRBKTtcblx0XHRcdFx0bm9ybWFscyA9IHRoaXMuX3BWZXJ0aWNlcztcblxuXHRcdFx0XHR3aGlsZSAoaSA8IHZhbHVlcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRub3JtYWxzW2luZGV4XSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRcdG5vcm1hbHNbaW5kZXggKyAxXSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRcdG5vcm1hbHNbaW5kZXggKyAyXSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAodGhpcy5fdmVydGV4Tm9ybWFscyA9PSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX3ZlcnRleE5vcm1hbHMgPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLl9wb3NpdGlvbnMubGVuZ3RoKTtcblxuXHRcdFx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpXG5cdFx0XHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fZmFjZU5vcm1hbHNEaXJ0eSlcblx0XHRcdFx0dGhpcy51cGRhdGVGYWNlTm9ybWFscygpO1xuXG5cdFx0XHRvZmZzZXQgPSB0aGlzLmdldE9mZnNldChUcmlhbmdsZVN1Ykdlb21ldHJ5Lk5PUk1BTF9EQVRBKTtcblx0XHRcdHN0cmlkZSA9IHRoaXMuZ2V0U3RyaWRlKFRyaWFuZ2xlU3ViR2VvbWV0cnkuTk9STUFMX0RBVEEpO1xuXG5cdFx0XHQvL2F1dG9kZXJpdmVkIG5vcm1hbHNcblx0XHRcdG5vcm1hbHMgPSB0aGlzLl9jb25jYXRlbmF0ZUFycmF5cz8gdGhpcy5fcFZlcnRpY2VzIDogdGhpcy5fdmVydGV4Tm9ybWFscztcblxuXHRcdFx0dmFyIGYxOm51bWJlciA9IDA7XG5cdFx0XHR2YXIgZjI6bnVtYmVyID0gMTtcblx0XHRcdHZhciBmMzpudW1iZXIgPSAyO1xuXG5cdFx0XHRpbmRleCA9IG9mZnNldDtcblxuXHRcdFx0Ly9jbGVhciBub3JtYWwgdmFsdWVzXG5cdFx0XHR2YXIgbGVuVjpudW1iZXIgPSBub3JtYWxzLmxlbmd0aDtcblx0XHRcdHdoaWxlIChpbmRleCA8IGxlblYpIHtcblx0XHRcdFx0bm9ybWFsc1tpbmRleF0gPSAwO1xuXHRcdFx0XHRub3JtYWxzW2luZGV4ICsgMV0gPSAwO1xuXHRcdFx0XHRub3JtYWxzW2luZGV4ICsgMl0gPSAwO1xuXHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBrOm51bWJlciA9IDA7XG5cdFx0XHR2YXIgbGVuSTpudW1iZXIgPSB0aGlzLl9wSW5kaWNlcy5sZW5ndGg7XG5cdFx0XHR2YXIgd2VpZ2h0Om51bWJlcjtcblxuXHRcdFx0aSA9IDA7XG5cblx0XHRcdC8vY29sbGVjdCBmYWNlIG5vcm1hbHNcblx0XHRcdHdoaWxlIChpIDwgbGVuSSkge1xuXHRcdFx0XHR3ZWlnaHQgPSB0aGlzLl91c2VGYWNlV2VpZ2h0cz8gdGhpcy5fZmFjZVdlaWdodHNbaysrXSA6IDE7XG5cdFx0XHRcdGluZGV4ID0gb2Zmc2V0ICsgdGhpcy5fcEluZGljZXNbaSsrXSpzdHJpZGU7XG5cdFx0XHRcdG5vcm1hbHNbaW5kZXhdICs9IHRoaXMuX2ZhY2VOb3JtYWxzW2YxXSp3ZWlnaHQ7XG5cdFx0XHRcdG5vcm1hbHNbaW5kZXggKyAxXSArPSB0aGlzLl9mYWNlTm9ybWFsc1tmMl0qd2VpZ2h0O1xuXHRcdFx0XHRub3JtYWxzW2luZGV4ICsgMl0gKz0gdGhpcy5fZmFjZU5vcm1hbHNbZjNdKndlaWdodDtcblx0XHRcdFx0aW5kZXggPSBvZmZzZXQgKyB0aGlzLl9wSW5kaWNlc1tpKytdKnN0cmlkZTtcblx0XHRcdFx0bm9ybWFsc1tpbmRleF0gKz0gdGhpcy5fZmFjZU5vcm1hbHNbZjFdKndlaWdodDtcblx0XHRcdFx0bm9ybWFsc1tpbmRleCArIDFdICs9IHRoaXMuX2ZhY2VOb3JtYWxzW2YyXSp3ZWlnaHQ7XG5cdFx0XHRcdG5vcm1hbHNbaW5kZXggKyAyXSArPSB0aGlzLl9mYWNlTm9ybWFsc1tmM10qd2VpZ2h0O1xuXHRcdFx0XHRpbmRleCA9IG9mZnNldCArIHRoaXMuX3BJbmRpY2VzW2krK10qc3RyaWRlO1xuXHRcdFx0XHRub3JtYWxzW2luZGV4XSArPSB0aGlzLl9mYWNlTm9ybWFsc1tmMV0qd2VpZ2h0O1xuXHRcdFx0XHRub3JtYWxzW2luZGV4ICsgMV0gKz0gdGhpcy5fZmFjZU5vcm1hbHNbZjJdKndlaWdodDtcblx0XHRcdFx0bm9ybWFsc1tpbmRleCArIDJdICs9IHRoaXMuX2ZhY2VOb3JtYWxzW2YzXSp3ZWlnaHQ7XG5cdFx0XHRcdGYxICs9IDM7XG5cdFx0XHRcdGYyICs9IDM7XG5cdFx0XHRcdGYzICs9IDM7XG5cdFx0XHR9XG5cblx0XHRcdGkgPSAwO1xuXHRcdFx0aW5kZXggPSBvZmZzZXQ7XG5cblx0XHRcdC8vYXZlcmFnZSBub3JtYWxzIGNvbGxlY3Rpb25zXG5cdFx0XHR3aGlsZSAoaW5kZXggPCBsZW5WKSB7XG5cdFx0XHRcdHZhciB2eDpudW1iZXIgPSBub3JtYWxzW2luZGV4XTtcblx0XHRcdFx0dmFyIHZ5Om51bWJlciA9IG5vcm1hbHNbaW5kZXggKyAxXTtcblx0XHRcdFx0dmFyIHZ6Om51bWJlciA9IG5vcm1hbHNbaW5kZXggKyAyXTtcblx0XHRcdFx0dmFyIGQ6bnVtYmVyID0gMS4wL01hdGguc3FydCh2eCp2eCArIHZ5KnZ5ICsgdnoqdnopO1xuXG5cdFx0XHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xuXHRcdFx0XHRcdHRoaXMuX3ZlcnRleE5vcm1hbHNbaSsrXSA9IG5vcm1hbHNbaW5kZXhdID0gdngqZDtcblx0XHRcdFx0XHR0aGlzLl92ZXJ0ZXhOb3JtYWxzW2krK10gPSBub3JtYWxzW2luZGV4ICsgMV0gPSB2eSpkO1xuXHRcdFx0XHRcdHRoaXMuX3ZlcnRleE5vcm1hbHNbaSsrXSA9IG5vcm1hbHNbaW5kZXggKyAyXSA9IHZ6KmQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bm9ybWFsc1tpbmRleF0gPSB2eCpkO1xuXHRcdFx0XHRcdG5vcm1hbHNbaW5kZXggKyAxXSA9IHZ5KmQ7XG5cdFx0XHRcdFx0bm9ybWFsc1tpbmRleCArIDJdID0gdnoqZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLm5vdGlmeU5vcm1hbHNVcGRhdGUoKTtcblxuXHRcdHRoaXMuX3ZlcnRleE5vcm1hbHNEaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIHZlcnRleCB0YW5nZW50cyBiYXNlZCBvbiB0aGUgZ2VvbWV0cnkuXG5cdCAqL1xuXHRwdWJsaWMgdXBkYXRlVmVydGV4VGFuZ2VudHModmFsdWVzOkFycmF5PG51bWJlcj4pXG5cdHtcblx0XHR2YXIgaTpudW1iZXI7XG5cdFx0dmFyIGluZGV4Om51bWJlcjtcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcblx0XHR2YXIgdGFuZ2VudHM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdGlmICghdGhpcy5fYXV0b0Rlcml2ZVRhbmdlbnRzKSB7XG5cdFx0XHRpZiAoKHRoaXMuX3ZlcnRleFRhbmdlbnRzID09IG51bGwgfHwgdmFsdWVzID09IG51bGwpICYmICh0aGlzLl92ZXJ0ZXhUYW5nZW50cyAhPSBudWxsIHx8IHZhbHVlcyAhPSBudWxsKSkge1xuXHRcdFx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpXG5cdFx0XHRcdFx0dGhpcy5fcE5vdGlmeVZlcnRpY2VzVXBkYXRlKCk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0aGlzLl9wU3RyaWRlT2Zmc2V0RGlydHkgPSB0cnVlO1xuXHRcdFx0fVxuXG5cblx0XHRcdHRoaXMuX3ZlcnRleFRhbmdlbnRzID0gdmFsdWVzO1xuXG5cdFx0XHRpZiAodmFsdWVzICE9IG51bGwgJiYgdGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcblx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdGluZGV4ID0gdGhpcy5nZXRPZmZzZXQoVHJpYW5nbGVTdWJHZW9tZXRyeS5UQU5HRU5UX0RBVEEpO1xuXHRcdFx0XHRzdHJpZGUgPSB0aGlzLmdldFN0cmlkZShUcmlhbmdsZVN1Ykdlb21ldHJ5LlRBTkdFTlRfREFUQSk7XG5cdFx0XHRcdHRhbmdlbnRzID0gdGhpcy5fcFZlcnRpY2VzO1xuXG5cdFx0XHRcdHdoaWxlIChpIDwgdmFsdWVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdHRhbmdlbnRzW2luZGV4XSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRcdHRhbmdlbnRzW2luZGV4ICsgMV0gPSB2YWx1ZXNbaSsrXTtcblx0XHRcdFx0XHR0YW5nZW50c1tpbmRleCArIDJdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0aGlzLl92ZXJ0ZXhUYW5nZW50cyA9PSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX3ZlcnRleFRhbmdlbnRzID0gbmV3IEFycmF5PG51bWJlcj4odGhpcy5fcG9zaXRpb25zLmxlbmd0aCk7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKVxuXHRcdFx0XHRcdHRoaXMuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX2ZhY2VUYW5nZW50c0RpcnR5KVxuXHRcdFx0XHR0aGlzLnVwZGF0ZUZhY2VUYW5nZW50cygpO1xuXG5cdFx0XHRvZmZzZXQgPSB0aGlzLmdldE9mZnNldChUcmlhbmdsZVN1Ykdlb21ldHJ5LlRBTkdFTlRfREFUQSk7XG5cdFx0XHRzdHJpZGUgPSB0aGlzLmdldFN0cmlkZShUcmlhbmdsZVN1Ykdlb21ldHJ5LlRBTkdFTlRfREFUQSk7XG5cblx0XHRcdC8vYXV0b2Rlcml2ZWQgdGFuZ2VudHNcblx0XHRcdHRhbmdlbnRzID0gdGhpcy5fY29uY2F0ZW5hdGVBcnJheXM/IHRoaXMuX3BWZXJ0aWNlcyA6IHRoaXMuX3ZlcnRleFRhbmdlbnRzO1xuXG5cdFx0XHRpbmRleCA9IG9mZnNldDtcblxuXHRcdFx0Ly9jbGVhciB0YW5nZW50IHZhbHVlc1xuXHRcdFx0dmFyIGxlblY6bnVtYmVyID0gdGFuZ2VudHMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKGluZGV4IDwgbGVuVikge1xuXHRcdFx0XHR0YW5nZW50c1tpbmRleF0gPSAwO1xuXHRcdFx0XHR0YW5nZW50c1tpbmRleCArIDFdID0gMDtcblx0XHRcdFx0dGFuZ2VudHNbaW5kZXggKyAyXSA9IDA7XG5cblx0XHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgazpudW1iZXIgPSAwO1xuXHRcdFx0dmFyIHdlaWdodDpudW1iZXI7XG5cdFx0XHR2YXIgZjE6bnVtYmVyID0gMDtcblx0XHRcdHZhciBmMjpudW1iZXIgPSAxO1xuXHRcdFx0dmFyIGYzOm51bWJlciA9IDI7XG5cblx0XHRcdGkgPSAwO1xuXG5cdFx0XHQvL2NvbGxlY3QgZmFjZSB0YW5nZW50c1xuXHRcdFx0dmFyIGxlbkk6bnVtYmVyID0gdGhpcy5fcEluZGljZXMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKGkgPCBsZW5JKSB7XG5cdFx0XHRcdHdlaWdodCA9IHRoaXMuX3VzZUZhY2VXZWlnaHRzPyB0aGlzLl9mYWNlV2VpZ2h0c1trKytdIDogMTtcblx0XHRcdFx0aW5kZXggPSBvZmZzZXQgKyB0aGlzLl9wSW5kaWNlc1tpKytdKnN0cmlkZTtcblx0XHRcdFx0dGFuZ2VudHNbaW5kZXgrK10gKz0gdGhpcy5fZmFjZVRhbmdlbnRzW2YxXSp3ZWlnaHQ7XG5cdFx0XHRcdHRhbmdlbnRzW2luZGV4KytdICs9IHRoaXMuX2ZhY2VUYW5nZW50c1tmMl0qd2VpZ2h0O1xuXHRcdFx0XHR0YW5nZW50c1tpbmRleF0gKz0gdGhpcy5fZmFjZVRhbmdlbnRzW2YzXSp3ZWlnaHQ7XG5cdFx0XHRcdGluZGV4ID0gb2Zmc2V0ICsgdGhpcy5fcEluZGljZXNbaSsrXSpzdHJpZGU7XG5cdFx0XHRcdHRhbmdlbnRzW2luZGV4KytdICs9IHRoaXMuX2ZhY2VUYW5nZW50c1tmMV0qd2VpZ2h0O1xuXHRcdFx0XHR0YW5nZW50c1tpbmRleCsrXSArPSB0aGlzLl9mYWNlVGFuZ2VudHNbZjJdKndlaWdodDtcblx0XHRcdFx0dGFuZ2VudHNbaW5kZXhdICs9IHRoaXMuX2ZhY2VUYW5nZW50c1tmM10qd2VpZ2h0O1xuXHRcdFx0XHRpbmRleCA9IG9mZnNldCArIHRoaXMuX3BJbmRpY2VzW2krK10qc3RyaWRlO1xuXHRcdFx0XHR0YW5nZW50c1tpbmRleCsrXSArPSB0aGlzLl9mYWNlVGFuZ2VudHNbZjFdKndlaWdodDtcblx0XHRcdFx0dGFuZ2VudHNbaW5kZXgrK10gKz0gdGhpcy5fZmFjZVRhbmdlbnRzW2YyXSp3ZWlnaHQ7XG5cdFx0XHRcdHRhbmdlbnRzW2luZGV4XSArPSB0aGlzLl9mYWNlVGFuZ2VudHNbZjNdKndlaWdodDtcblx0XHRcdFx0ZjEgKz0gMztcblx0XHRcdFx0ZjIgKz0gMztcblx0XHRcdFx0ZjMgKz0gMztcblx0XHRcdH1cblxuXHRcdFx0aSA9IDA7XG5cdFx0XHRpbmRleCA9IG9mZnNldDtcblxuXHRcdFx0Ly9hdmVyYWdlIHRhbmdlbnRzIGNvbGxlY3Rpb25zXG5cdFx0XHR3aGlsZSAoaW5kZXggPCBsZW5WKSB7XG5cdFx0XHRcdHZhciB2eDpudW1iZXIgPSB0YW5nZW50c1tpbmRleF07XG5cdFx0XHRcdHZhciB2eTpudW1iZXIgPSB0YW5nZW50c1tpbmRleCArIDFdO1xuXHRcdFx0XHR2YXIgdno6bnVtYmVyID0gdGFuZ2VudHNbaW5kZXggKyAyXTtcblx0XHRcdFx0dmFyIGQ6bnVtYmVyID0gMS4wL01hdGguc3FydCh2eCp2eCArIHZ5KnZ5ICsgdnoqdnopO1xuXG5cdFx0XHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xuXHRcdFx0XHRcdHRoaXMuX3ZlcnRleFRhbmdlbnRzW2krK10gPSB0YW5nZW50c1tpbmRleF0gPSB2eCpkO1xuXHRcdFx0XHRcdHRoaXMuX3ZlcnRleFRhbmdlbnRzW2krK10gPSB0YW5nZW50c1tpbmRleCArIDFdID0gdnkqZDtcblx0XHRcdFx0XHR0aGlzLl92ZXJ0ZXhUYW5nZW50c1tpKytdID0gdGFuZ2VudHNbaW5kZXggKyAyXSA9IHZ6KmQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGFuZ2VudHNbaW5kZXhdID0gdngqZDtcblx0XHRcdFx0XHR0YW5nZW50c1tpbmRleCArIDFdID0gdnkqZDtcblx0XHRcdFx0XHR0YW5nZW50c1tpbmRleCArIDJdID0gdnoqZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLm5vdGlmeVRhbmdlbnRzVXBkYXRlKCk7XG5cblx0XHR0aGlzLl92ZXJ0ZXhUYW5nZW50c0RpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgdXZzIGJhc2VkIG9uIHRoZSBnZW9tZXRyeS5cblx0ICovXG5cdHB1YmxpYyB1cGRhdGVVVnModmFsdWVzOkFycmF5PG51bWJlcj4pXG5cdHtcblx0XHR2YXIgaTpudW1iZXI7XG5cdFx0dmFyIGluZGV4Om51bWJlcjtcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcblx0XHR2YXIgdXZzOkFycmF5PG51bWJlcj47XG5cblx0XHRpZiAoIXRoaXMuX2F1dG9EZXJpdmVVVnMpIHtcblx0XHRcdGlmICgodGhpcy5fdXZzID09IG51bGwgfHwgdmFsdWVzID09IG51bGwpICYmICh0aGlzLl91dnMgIT0gbnVsbCB8fCB2YWx1ZXMgIT0gbnVsbCkpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKVxuXHRcdFx0XHRcdHRoaXMuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fdXZzID0gdmFsdWVzO1xuXG5cdFx0XHRpZiAodmFsdWVzICE9IG51bGwgJiYgdGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcblx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdGluZGV4ID0gdGhpcy5nZXRPZmZzZXQoVHJpYW5nbGVTdWJHZW9tZXRyeS5VVl9EQVRBKTtcblx0XHRcdFx0c3RyaWRlID0gdGhpcy5nZXRTdHJpZGUoVHJpYW5nbGVTdWJHZW9tZXRyeS5VVl9EQVRBKTtcblx0XHRcdFx0dXZzID0gdGhpcy5fcFZlcnRpY2VzO1xuXG5cdFx0XHRcdHdoaWxlIChpIDwgdmFsdWVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdHV2c1tpbmRleF0gPSB2YWx1ZXNbaSsrXTtcblx0XHRcdFx0XHR1dnNbaW5kZXggKyAxXSA9IHZhbHVlc1tpKytdO1xuXHRcdFx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0aGlzLl91dnMgPT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLl91dnMgPSBuZXcgQXJyYXk8bnVtYmVyPih0aGlzLl9wb3NpdGlvbnMubGVuZ3RoKjIvMyk7XG5cblx0XHRcdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKVxuXHRcdFx0XHRcdHRoaXMuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhpcy5fcFN0cmlkZU9mZnNldERpcnR5ID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0b2Zmc2V0ID0gdGhpcy5nZXRPZmZzZXQoVHJpYW5nbGVTdWJHZW9tZXRyeS5VVl9EQVRBKTtcblx0XHRcdHN0cmlkZSA9IHRoaXMuZ2V0U3RyaWRlKFRyaWFuZ2xlU3ViR2VvbWV0cnkuVVZfREFUQSk7XG5cblx0XHRcdC8vYXV0b2Rlcml2ZWQgdXZzXG5cdFx0XHR1dnMgPSB0aGlzLl9jb25jYXRlbmF0ZUFycmF5cz8gdGhpcy5fcFZlcnRpY2VzIDogdGhpcy5fdXZzO1xuXG5cdFx0XHRpID0gMDtcblx0XHRcdGluZGV4ID0gb2Zmc2V0O1xuXHRcdFx0dmFyIHV2SWR4Om51bWJlciA9IDA7XG5cblx0XHRcdC8vY2xlYXIgdXYgdmFsdWVzXG5cdFx0XHR2YXIgbGVuVjpudW1iZXIgPSB1dnMubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKGluZGV4IDwgbGVuVikge1xuXHRcdFx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcblx0XHRcdFx0XHR0aGlzLl91dnNbaSsrXSA9IHV2c1tpbmRleF0gPSB1dklkeCouNTtcblx0XHRcdFx0XHR0aGlzLl91dnNbaSsrXSA9IHV2c1tpbmRleCArIDFdID0gMS4wIC0gKHV2SWR4ICYgMSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dXZzW2luZGV4XSA9IHV2SWR4Ki41O1xuXHRcdFx0XHRcdHV2c1tpbmRleCArIDFdID0gMS4wIC0gKHV2SWR4ICYgMSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoKyt1dklkeCA9PSAzKVxuXHRcdFx0XHRcdHV2SWR4ID0gMDtcblxuXHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2F1dG9EZXJpdmVUYW5nZW50cylcblx0XHRcdHRoaXMubm90aWZ5VGFuZ2VudHNVcGRhdGUoKTtcblxuXHRcdHRoaXMubm90aWZ5VVZzVXBkYXRlKCk7XG5cblx0XHR0aGlzLl91dnNEaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIHNlY29uZGFyeSB1dnMgYmFzZWQgb24gdGhlIGdlb21ldHJ5LlxuXHQgKi9cblx0cHVibGljIHVwZGF0ZVNlY29uZGFyeVVWcyh2YWx1ZXM6QXJyYXk8bnVtYmVyPilcblx0e1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgaW5kZXg6bnVtYmVyO1xuXHRcdHZhciBvZmZzZXQ6bnVtYmVyO1xuXHRcdHZhciBzdHJpZGU6bnVtYmVyO1xuXHRcdHZhciB1dnM6QXJyYXk8bnVtYmVyPjtcblxuXHRcdGlmICh0aGlzLl9jb25jYXRlbmF0ZUFycmF5cyAmJiAodGhpcy5fc2Vjb25kYXJ5VVZzID09IG51bGwgfHwgdmFsdWVzID09IG51bGwpICYmICh0aGlzLl9zZWNvbmRhcnlVVnMgIT0gbnVsbCB8fCB2YWx1ZXMgIT0gbnVsbCkpXG5cdFx0XHR0aGlzLl9wTm90aWZ5VmVydGljZXNVcGRhdGUoKTtcblxuXHRcdHRoaXMuX3NlY29uZGFyeVVWcyA9IHZhbHVlcztcblxuXHRcdGlmICh2YWx1ZXMgIT0gbnVsbCAmJiB0aGlzLl9jb25jYXRlbmF0ZUFycmF5cykge1xuXHRcdFx0b2Zmc2V0ID0gdGhpcy5nZXRPZmZzZXQoVHJpYW5nbGVTdWJHZW9tZXRyeS5TRUNPTkRBUllfVVZfREFUQSk7XG5cdFx0XHRzdHJpZGUgPSB0aGlzLmdldFN0cmlkZShUcmlhbmdsZVN1Ykdlb21ldHJ5LlNFQ09OREFSWV9VVl9EQVRBKTtcblxuXHRcdFx0aSA9IDA7XG5cdFx0XHRpbmRleCA9IG9mZnNldDtcblx0XHRcdHV2cyA9IHRoaXMuX3BWZXJ0aWNlcztcblxuXHRcdFx0d2hpbGUgKGkgPCB2YWx1ZXMubGVuZ3RoKSB7XG5cdFx0XHRcdHV2c1tpbmRleF0gPSB2YWx1ZXNbaSsrXTtcblx0XHRcdFx0dXZzW2luZGV4ICsgMV0gPSB2YWx1ZXNbaSsrXTtcblx0XHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMubm90aWZ5U2Vjb25kYXJ5VVZzVXBkYXRlKCk7XG5cblx0XHR0aGlzLl9zZWNvbmRhcnlVVnNEaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIGpvaW50IGluZGljZXNcblx0ICovXG5cdHB1YmxpYyB1cGRhdGVKb2ludEluZGljZXModmFsdWVzOkFycmF5PG51bWJlcj4pXG5cdHtcblx0XHR2YXIgaTpudW1iZXI7XG5cdFx0dmFyIGo6bnVtYmVyO1xuXHRcdHZhciBpbmRleDpudW1iZXI7XG5cdFx0dmFyIG9mZnNldDpudW1iZXI7XG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XG5cdFx0dmFyIGpvaW50SW5kaWNlczpBcnJheTxudW1iZXI+O1xuXG5cdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzICYmICh0aGlzLl9qb2ludEluZGljZXMgPT0gbnVsbCB8fCB2YWx1ZXMgPT0gbnVsbCkgJiYgKHRoaXMuX2pvaW50SW5kaWNlcyAhPSBudWxsIHx8IHZhbHVlcyAhPSBudWxsKSlcblx0XHRcdHRoaXMuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpO1xuXG5cdFx0dGhpcy5fam9pbnRJbmRpY2VzID0gdmFsdWVzO1xuXG5cdFx0aWYgKHZhbHVlcyAhPSBudWxsKSB7XG5cdFx0XHRvZmZzZXQgPSB0aGlzLmdldE9mZnNldChUcmlhbmdsZVN1Ykdlb21ldHJ5LkpPSU5UX0lOREVYX0RBVEEpO1xuXHRcdFx0c3RyaWRlID0gdGhpcy5nZXRTdHJpZGUoVHJpYW5nbGVTdWJHZW9tZXRyeS5KT0lOVF9JTkRFWF9EQVRBKTtcblx0XHRcdGlmICh0aGlzLl91c2VDb25kZW5zZWRJbmRpY2VzKSB7XG5cdFx0XHRcdGkgPSAwO1xuXHRcdFx0XHRqID0gMDtcblx0XHRcdFx0aW5kZXggPSBvZmZzZXQ7XG5cdFx0XHRcdGpvaW50SW5kaWNlcyA9IHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzPyB0aGlzLl9wVmVydGljZXMgOiB0aGlzLl9jb25kZW5zZWRKb2ludEluZGljZXM7XG5cdFx0XHRcdHZhciBvbGRJbmRleDpudW1iZXI7XG5cdFx0XHRcdHZhciBuZXdJbmRleDpudW1iZXIgPSAwO1xuXHRcdFx0XHR2YXIgZGljOk9iamVjdCA9IG5ldyBPYmplY3QoKTtcblxuXHRcdFx0XHRpZiAoIXRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKVxuXHRcdFx0XHRcdHRoaXMuX2NvbmRlbnNlZEpvaW50SW5kaWNlcyA9IG5ldyBBcnJheTxudW1iZXI+KHZhbHVlcy5sZW5ndGgpO1xuXG5cdFx0XHRcdHRoaXMuX2NvbmRlbnNlZEluZGV4TG9va1VwID0gbmV3IEFycmF5PG51bWJlcj4oKTtcblxuXHRcdFx0XHR3aGlsZSAoaSA8IHZhbHVlcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgdGhpcy5fam9pbnRzUGVyVmVydGV4OyBqKyspIHtcblx0XHRcdFx0XHRcdG9sZEluZGV4ID0gdmFsdWVzW2krK107XG5cblx0XHRcdFx0XHRcdC8vIGlmIHdlIGVuY291bnRlciBhIG5ldyBpbmRleCwgYXNzaWduIGl0IGEgbmV3IGNvbmRlbnNlZCBpbmRleFxuXHRcdFx0XHRcdFx0aWYgKGRpY1tvbGRJbmRleF0gPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdGRpY1tvbGRJbmRleF0gPSBuZXdJbmRleCozOyAvLzMgcmVxdWlyZWQgZm9yIHRoZSB0aHJlZSB2ZWN0b3JzIHRoYXQgc3RvcmUgdGhlIG1hdHJpeFxuXHRcdFx0XHRcdFx0XHR0aGlzLl9jb25kZW5zZWRJbmRleExvb2tVcFtuZXdJbmRleCsrXSA9IG9sZEluZGV4O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0am9pbnRJbmRpY2VzW2luZGV4ICsgal0gPSBkaWNbb2xkSW5kZXhdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fbnVtQ29uZGVuc2VkSm9pbnRzID0gbmV3SW5kZXg7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XG5cblx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdGluZGV4ID0gb2Zmc2V0O1xuXHRcdFx0XHRqb2ludEluZGljZXMgPSB0aGlzLl9wVmVydGljZXM7XG5cblx0XHRcdFx0d2hpbGUgKGkgPCB2YWx1ZXMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdFx0d2hpbGUgKGogPCB0aGlzLl9qb2ludHNQZXJWZXJ0ZXgpXG5cdFx0XHRcdFx0XHRqb2ludEluZGljZXNbaW5kZXggKyBqKytdID0gdmFsdWVzW2krK107XG5cdFx0XHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5ub3RpZnlKb2ludEluZGljZXNVcGRhdGUoKTtcblxuXHRcdHRoaXMuX2pvaW50SW5kaWNlc0RpcnR5ID0gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgam9pbnQgd2VpZ2h0cy5cblx0ICovXG5cdHB1YmxpYyB1cGRhdGVKb2ludFdlaWdodHModmFsdWVzOkFycmF5PG51bWJlcj4pXG5cdHtcblx0XHR2YXIgaTpudW1iZXI7XG5cdFx0dmFyIGo6bnVtYmVyO1xuXHRcdHZhciBpbmRleDpudW1iZXI7XG5cdFx0dmFyIG9mZnNldDpudW1iZXI7XG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XG5cdFx0dmFyIGpvaW50V2VpZ2h0czpBcnJheTxudW1iZXI+O1xuXG5cdFx0aWYgKHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzICYmICh0aGlzLl9qb2ludFdlaWdodHMgPT0gbnVsbCB8fCB2YWx1ZXMgPT0gbnVsbCkgJiYgKHRoaXMuX2pvaW50V2VpZ2h0cyAhPSBudWxsIHx8IHZhbHVlcyAhPSBudWxsKSlcblx0XHRcdHRoaXMuX3BOb3RpZnlWZXJ0aWNlc1VwZGF0ZSgpO1xuXG5cdFx0dGhpcy5fam9pbnRXZWlnaHRzID0gdmFsdWVzO1xuXG5cdFx0aWYgKHZhbHVlcyAhPSBudWxsICYmIHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKSB7XG5cdFx0XHRvZmZzZXQgPSB0aGlzLmdldE9mZnNldChUcmlhbmdsZVN1Ykdlb21ldHJ5LkpPSU5UX1dFSUdIVF9EQVRBKTtcblx0XHRcdHN0cmlkZSA9IHRoaXMuZ2V0U3RyaWRlKFRyaWFuZ2xlU3ViR2VvbWV0cnkuSk9JTlRfV0VJR0hUX0RBVEEpO1xuXG5cdFx0XHRpID0gMDtcblx0XHRcdGluZGV4ID0gb2Zmc2V0O1xuXHRcdFx0am9pbnRXZWlnaHRzID0gdGhpcy5fcFZlcnRpY2VzO1xuXG5cdFx0XHR3aGlsZSAoaSA8IHZhbHVlcy5sZW5ndGgpIHtcblx0XHRcdFx0aiA9IDA7XG5cdFx0XHRcdHdoaWxlIChqIDwgdGhpcy5fam9pbnRzUGVyVmVydGV4KVxuXHRcdFx0XHRcdGpvaW50V2VpZ2h0c1tpbmRleCArIGorK10gPSB2YWx1ZXNbaSsrXTtcblx0XHRcdFx0aW5kZXggKz0gc3RyaWRlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMubm90aWZ5Sm9pbnRXZWlnaHRzVXBkYXRlKCk7XG5cblx0XHR0aGlzLl9qb2ludFdlaWdodHNEaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqXG5cdCAqL1xuXHRwdWJsaWMgZGlzcG9zZSgpXG5cdHtcblx0XHRzdXBlci5kaXNwb3NlKCk7XG5cblx0XHR0aGlzLl9wb3NpdGlvbnMgPSBudWxsO1xuXHRcdHRoaXMuX3ZlcnRleE5vcm1hbHMgPSBudWxsO1xuXHRcdHRoaXMuX3ZlcnRleFRhbmdlbnRzID0gbnVsbDtcblx0XHR0aGlzLl91dnMgPSBudWxsO1xuXHRcdHRoaXMuX3NlY29uZGFyeVVWcyA9IG51bGw7XG5cdFx0dGhpcy5fam9pbnRJbmRpY2VzID0gbnVsbDtcblx0XHR0aGlzLl9qb2ludFdlaWdodHMgPSBudWxsO1xuXG5cdFx0dGhpcy5fZmFjZU5vcm1hbHMgPSBudWxsO1xuXHRcdHRoaXMuX2ZhY2VXZWlnaHRzID0gbnVsbDtcblx0XHR0aGlzLl9mYWNlVGFuZ2VudHMgPSBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIGZhY2UgaW5kaWNlcyBvZiB0aGUgVHJpYW5nbGVTdWJHZW9tZXRyeS5cblx0ICpcblx0ICogQHBhcmFtIGluZGljZXMgVGhlIGZhY2UgaW5kaWNlcyB0byB1cGxvYWQuXG5cdCAqL1xuXHRwdWJsaWMgdXBkYXRlSW5kaWNlcyhpbmRpY2VzOkFycmF5PG51bWJlcj4pXG5cdHtcblx0XHRzdXBlci51cGRhdGVJbmRpY2VzKGluZGljZXMpO1xuXG5cdFx0dGhpcy5fZmFjZU5vcm1hbHNEaXJ0eSA9IHRydWU7XG5cblx0XHRpZiAodGhpcy5fYXV0b0Rlcml2ZU5vcm1hbHMpXG5cdFx0XHR0aGlzLl92ZXJ0ZXhOb3JtYWxzRGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKHRoaXMuX2F1dG9EZXJpdmVUYW5nZW50cylcblx0XHRcdHRoaXMuX3ZlcnRleFRhbmdlbnRzRGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKHRoaXMuX2F1dG9EZXJpdmVVVnMpXG5cdFx0XHR0aGlzLl91dnNEaXJ0eSA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogQ2xvbmVzIHRoZSBjdXJyZW50IG9iamVjdFxuXHQgKiBAcmV0dXJuIEFuIGV4YWN0IGR1cGxpY2F0ZSBvZiB0aGUgY3VycmVudCBvYmplY3QuXG5cdCAqL1xuXHRwdWJsaWMgY2xvbmUoKTpUcmlhbmdsZVN1Ykdlb21ldHJ5XG5cdHtcblx0XHR2YXIgY2xvbmU6VHJpYW5nbGVTdWJHZW9tZXRyeSA9IG5ldyBUcmlhbmdsZVN1Ykdlb21ldHJ5KHRoaXMuX2NvbmNhdGVuYXRlQXJyYXlzKTtcblx0XHRjbG9uZS51cGRhdGVJbmRpY2VzKHRoaXMuX3BJbmRpY2VzLmNvbmNhdCgpKTtcblx0XHRjbG9uZS51cGRhdGVQb3NpdGlvbnModGhpcy5fcG9zaXRpb25zLmNvbmNhdCgpKTtcblxuXHRcdGlmICh0aGlzLl92ZXJ0ZXhOb3JtYWxzICYmICF0aGlzLl9hdXRvRGVyaXZlTm9ybWFscylcblx0XHRcdGNsb25lLnVwZGF0ZVZlcnRleE5vcm1hbHModGhpcy5fdmVydGV4Tm9ybWFscy5jb25jYXQoKSk7XG5cdFx0ZWxzZVxuXHRcdFx0Y2xvbmUudXBkYXRlVmVydGV4Tm9ybWFscyhudWxsKTtcblxuXHRcdGlmICh0aGlzLl91dnMgJiYgIXRoaXMuX2F1dG9EZXJpdmVVVnMpXG5cdFx0XHRjbG9uZS51cGRhdGVVVnModGhpcy5fdXZzLmNvbmNhdCgpKTtcblx0XHRlbHNlXG5cdFx0XHRjbG9uZS51cGRhdGVVVnMobnVsbCk7XG5cblx0XHRpZiAodGhpcy5fdmVydGV4VGFuZ2VudHMgJiYgIXRoaXMuX2F1dG9EZXJpdmVUYW5nZW50cylcblx0XHRcdGNsb25lLnVwZGF0ZVZlcnRleFRhbmdlbnRzKHRoaXMuX3ZlcnRleFRhbmdlbnRzLmNvbmNhdCgpKTtcblx0XHRlbHNlXG5cdFx0XHRjbG9uZS51cGRhdGVWZXJ0ZXhUYW5nZW50cyhudWxsKTtcblxuXHRcdGlmICh0aGlzLl9zZWNvbmRhcnlVVnMpXG5cdFx0XHRjbG9uZS51cGRhdGVTZWNvbmRhcnlVVnModGhpcy5fc2Vjb25kYXJ5VVZzLmNvbmNhdCgpKTtcblxuXHRcdGlmICh0aGlzLl9qb2ludEluZGljZXMpIHtcblx0XHRcdGNsb25lLmpvaW50c1BlclZlcnRleCA9IHRoaXMuX2pvaW50c1BlclZlcnRleDtcblx0XHRcdGNsb25lLnVwZGF0ZUpvaW50SW5kaWNlcyh0aGlzLl9qb2ludEluZGljZXMuY29uY2F0KCkpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9qb2ludFdlaWdodHMpXG5cdFx0XHRjbG9uZS51cGRhdGVKb2ludFdlaWdodHModGhpcy5fam9pbnRXZWlnaHRzLmNvbmNhdCgpKTtcblxuXHRcdHJldHVybiBjbG9uZTtcblx0fVxuXG5cdHB1YmxpYyBzY2FsZVVWKHNjYWxlVTpudW1iZXIgPSAxLCBzY2FsZVY6bnVtYmVyID0gMSlcblx0e1xuXHRcdHZhciBpbmRleDpudW1iZXI7XG5cdFx0dmFyIG9mZnNldDpudW1iZXI7XG5cdFx0dmFyIHN0cmlkZTpudW1iZXI7XG5cdFx0dmFyIHV2czpBcnJheTxudW1iZXI+O1xuXG5cdFx0dXZzID0gdGhpcy5fdXZzO1xuXG5cdFx0dmFyIHJhdGlvVTpudW1iZXIgPSBzY2FsZVUvdGhpcy5fc2NhbGVVO1xuXHRcdHZhciByYXRpb1Y6bnVtYmVyID0gc2NhbGVWL3RoaXMuX3NjYWxlVjtcblxuXHRcdHRoaXMuX3NjYWxlVSA9IHNjYWxlVTtcblx0XHR0aGlzLl9zY2FsZVYgPSBzY2FsZVY7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHV2cy5sZW5ndGg7XG5cblx0XHRvZmZzZXQgPSAwO1xuXHRcdHN0cmlkZSA9IDI7XG5cblx0XHRpbmRleCA9IG9mZnNldDtcblxuXHRcdHdoaWxlIChpbmRleCA8IGxlbikge1xuXHRcdFx0dXZzW2luZGV4XSAqPSByYXRpb1U7XG5cdFx0XHR1dnNbaW5kZXggKyAxXSAqPSByYXRpb1Y7XG5cdFx0XHRpbmRleCArPSBzdHJpZGU7XG5cdFx0fVxuXG5cdFx0dGhpcy5ub3RpZnlVVnNVcGRhdGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTY2FsZXMgdGhlIGdlb21ldHJ5LlxuXHQgKiBAcGFyYW0gc2NhbGUgVGhlIGFtb3VudCBieSB3aGljaCB0byBzY2FsZS5cblx0ICovXG5cdHB1YmxpYyBzY2FsZShzY2FsZTpudW1iZXIpXG5cdHtcblx0XHR2YXIgaTpudW1iZXI7XG5cdFx0dmFyIGluZGV4Om51bWJlcjtcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj47XG5cblx0XHRwb3NpdGlvbnMgPSB0aGlzLl9wb3NpdGlvbnM7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHBvc2l0aW9ucy5sZW5ndGg7XG5cblx0XHRvZmZzZXQgPSAwO1xuXHRcdHN0cmlkZSA9IDM7XG5cblx0XHRpID0gMDtcblx0XHRpbmRleCA9IG9mZnNldDtcblx0XHR3aGlsZSAoaSA8IGxlbikge1xuXHRcdFx0cG9zaXRpb25zW2luZGV4XSAqPSBzY2FsZTtcblx0XHRcdHBvc2l0aW9uc1tpbmRleCArIDFdICo9IHNjYWxlO1xuXHRcdFx0cG9zaXRpb25zW2luZGV4ICsgMl0gKj0gc2NhbGU7XG5cblx0XHRcdGkgKz0gMztcblx0XHRcdGluZGV4ICs9IHN0cmlkZTtcblx0XHR9XG5cblx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uc1VwZGF0ZSgpO1xuXHR9XG5cblx0cHVibGljIGFwcGx5VHJhbnNmb3JtYXRpb24odHJhbnNmb3JtOk1hdHJpeDNEKVxuXHR7XG5cdFx0dmFyIHBvc2l0aW9uczpBcnJheTxudW1iZXI+O1xuXHRcdHZhciBub3JtYWxzOkFycmF5PG51bWJlcj47XG5cdFx0dmFyIHRhbmdlbnRzOkFycmF5PG51bWJlcj47XG5cblx0XHRpZiAodGhpcy5fY29uY2F0ZW5hdGVBcnJheXMpIHtcblx0XHRcdHBvc2l0aW9ucyA9IHRoaXMuX3BWZXJ0aWNlcztcblx0XHRcdG5vcm1hbHMgPSB0aGlzLl9wVmVydGljZXM7XG5cdFx0XHR0YW5nZW50cyA9IHRoaXMuX3BWZXJ0aWNlcztcblx0XHR9IGVsc2Uge1xuXHRcdFx0cG9zaXRpb25zID0gdGhpcy5fcG9zaXRpb25zO1xuXHRcdFx0bm9ybWFscyA9IHRoaXMuX3ZlcnRleE5vcm1hbHM7XG5cdFx0XHR0YW5nZW50cyA9IHRoaXMuX3ZlcnRleFRhbmdlbnRzO1xuXHRcdH1cblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcG9zaXRpb25zLmxlbmd0aC8zO1xuXHRcdHZhciBpOm51bWJlcjtcblx0XHR2YXIgaTE6bnVtYmVyO1xuXHRcdHZhciBpMjpudW1iZXI7XG5cdFx0dmFyIHZlY3RvcjpWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXG5cdFx0dmFyIGJha2VOb3JtYWxzOmJvb2xlYW4gPSB0aGlzLl92ZXJ0ZXhOb3JtYWxzICE9IG51bGw7XG5cdFx0dmFyIGJha2VUYW5nZW50czpib29sZWFuID0gdGhpcy5fdmVydGV4VGFuZ2VudHMgIT0gbnVsbDtcblx0XHR2YXIgaW52VHJhbnNwb3NlOk1hdHJpeDNEO1xuXG5cdFx0aWYgKGJha2VOb3JtYWxzIHx8IGJha2VUYW5nZW50cykge1xuXHRcdFx0aW52VHJhbnNwb3NlID0gdHJhbnNmb3JtLmNsb25lKCk7XG5cdFx0XHRpbnZUcmFuc3Bvc2UuaW52ZXJ0KCk7XG5cdFx0XHRpbnZUcmFuc3Bvc2UudHJhbnNwb3NlKCk7XG5cdFx0fVxuXG5cdFx0dmFyIHZpMDpudW1iZXIgPSB0aGlzLmdldE9mZnNldChUcmlhbmdsZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEEpO1xuXHRcdHZhciBuaTA6bnVtYmVyID0gdGhpcy5nZXRPZmZzZXQoVHJpYW5nbGVTdWJHZW9tZXRyeS5OT1JNQUxfREFUQSk7XG5cdFx0dmFyIHRpMDpudW1iZXIgPSB0aGlzLmdldE9mZnNldChUcmlhbmdsZVN1Ykdlb21ldHJ5LlRBTkdFTlRfREFUQSk7XG5cblx0XHR2YXIgdlN0cmlkZTpudW1iZXIgPSB0aGlzLmdldFN0cmlkZShUcmlhbmdsZVN1Ykdlb21ldHJ5LlBPU0lUSU9OX0RBVEEpO1xuXHRcdHZhciBuU3RyaWRlOm51bWJlciA9IHRoaXMuZ2V0U3RyaWRlKFRyaWFuZ2xlU3ViR2VvbWV0cnkuTk9STUFMX0RBVEEpO1xuXHRcdHZhciB0U3RyaWRlOm51bWJlciA9IHRoaXMuZ2V0U3RyaWRlKFRyaWFuZ2xlU3ViR2VvbWV0cnkuVEFOR0VOVF9EQVRBKTtcblxuXHRcdGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuXHRcdFx0aTEgPSB2aTAgKyAxO1xuXHRcdFx0aTIgPSB2aTAgKyAyO1xuXG5cdFx0XHQvLyBiYWtlIHBvc2l0aW9uXG5cdFx0XHR2ZWN0b3IueCA9IHBvc2l0aW9uc1t2aTBdO1xuXHRcdFx0dmVjdG9yLnkgPSBwb3NpdGlvbnNbaTFdO1xuXHRcdFx0dmVjdG9yLnogPSBwb3NpdGlvbnNbaTJdO1xuXHRcdFx0dmVjdG9yID0gdHJhbnNmb3JtLnRyYW5zZm9ybVZlY3Rvcih2ZWN0b3IpO1xuXHRcdFx0cG9zaXRpb25zW3ZpMF0gPSB2ZWN0b3IueDtcblx0XHRcdHBvc2l0aW9uc1tpMV0gPSB2ZWN0b3IueTtcblx0XHRcdHBvc2l0aW9uc1tpMl0gPSB2ZWN0b3Iuejtcblx0XHRcdHZpMCArPSB2U3RyaWRlO1xuXG5cdFx0XHQvLyBiYWtlIG5vcm1hbFxuXHRcdFx0aWYgKGJha2VOb3JtYWxzKSB7XG5cdFx0XHRcdGkxID0gbmkwICsgMTtcblx0XHRcdFx0aTIgPSBuaTAgKyAyO1xuXHRcdFx0XHR2ZWN0b3IueCA9IG5vcm1hbHNbbmkwXTtcblx0XHRcdFx0dmVjdG9yLnkgPSBub3JtYWxzW2kxXTtcblx0XHRcdFx0dmVjdG9yLnogPSBub3JtYWxzW2kyXTtcblx0XHRcdFx0dmVjdG9yID0gaW52VHJhbnNwb3NlLmRlbHRhVHJhbnNmb3JtVmVjdG9yKHZlY3Rvcik7XG5cdFx0XHRcdHZlY3Rvci5ub3JtYWxpemUoKTtcblx0XHRcdFx0bm9ybWFsc1tuaTBdID0gdmVjdG9yLng7XG5cdFx0XHRcdG5vcm1hbHNbaTFdID0gdmVjdG9yLnk7XG5cdFx0XHRcdG5vcm1hbHNbaTJdID0gdmVjdG9yLno7XG5cdFx0XHRcdG5pMCArPSBuU3RyaWRlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBiYWtlIHRhbmdlbnRcblx0XHRcdGlmIChiYWtlVGFuZ2VudHMpIHtcblx0XHRcdFx0aTEgPSB0aTAgKyAxO1xuXHRcdFx0XHRpMiA9IHRpMCArIDI7XG5cdFx0XHRcdHZlY3Rvci54ID0gdGFuZ2VudHNbdGkwXTtcblx0XHRcdFx0dmVjdG9yLnkgPSB0YW5nZW50c1tpMV07XG5cdFx0XHRcdHZlY3Rvci56ID0gdGFuZ2VudHNbaTJdO1xuXHRcdFx0XHR2ZWN0b3IgPSBpbnZUcmFuc3Bvc2UuZGVsdGFUcmFuc2Zvcm1WZWN0b3IodmVjdG9yKTtcblx0XHRcdFx0dmVjdG9yLm5vcm1hbGl6ZSgpO1xuXHRcdFx0XHR0YW5nZW50c1t0aTBdID0gdmVjdG9yLng7XG5cdFx0XHRcdHRhbmdlbnRzW2kxXSA9IHZlY3Rvci55O1xuXHRcdFx0XHR0YW5nZW50c1tpMl0gPSB2ZWN0b3Iuejtcblx0XHRcdFx0dGkwICs9IHRTdHJpZGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5ub3RpZnlQb3NpdGlvbnNVcGRhdGUoKTtcblx0XHR0aGlzLm5vdGlmeU5vcm1hbHNVcGRhdGUoKTtcblx0XHR0aGlzLm5vdGlmeVRhbmdlbnRzVXBkYXRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgdGFuZ2VudHMgZm9yIGVhY2ggZmFjZS5cblx0ICovXG5cdHByaXZhdGUgdXBkYXRlRmFjZVRhbmdlbnRzKClcblx0e1xuXHRcdHZhciBpOm51bWJlciA9IDA7XG5cdFx0dmFyIGluZGV4MTpudW1iZXI7XG5cdFx0dmFyIGluZGV4MjpudW1iZXI7XG5cdFx0dmFyIGluZGV4MzpudW1iZXI7XG5cdFx0dmFyIHZpOm51bWJlcjtcblx0XHR2YXIgdjA6bnVtYmVyO1xuXHRcdHZhciBkdjE6bnVtYmVyO1xuXHRcdHZhciBkdjI6bnVtYmVyO1xuXHRcdHZhciBkZW5vbTpudW1iZXI7XG5cdFx0dmFyIHgwOm51bWJlciwgeTA6bnVtYmVyLCB6MDpudW1iZXI7XG5cdFx0dmFyIGR4MTpudW1iZXIsIGR5MTpudW1iZXIsIGR6MTpudW1iZXI7XG5cdFx0dmFyIGR4MjpudW1iZXIsIGR5MjpudW1iZXIsIGR6MjpudW1iZXI7XG5cdFx0dmFyIGN4Om51bWJlciwgY3k6bnVtYmVyLCBjejpudW1iZXI7XG5cblx0XHR2YXIgcG9zaXRpb25zOkFycmF5PG51bWJlcj4gPSB0aGlzLl9wb3NpdGlvbnNcblx0XHR2YXIgdXZzOkFycmF5PG51bWJlcj4gPSB0aGlzLl91dnM7XG5cblx0XHR2YXIgbGVuOm51bWJlciA9IHRoaXMuX3BJbmRpY2VzLmxlbmd0aDtcblxuXHRcdGlmICh0aGlzLl9mYWNlVGFuZ2VudHMgPT0gbnVsbClcblx0XHRcdHRoaXMuX2ZhY2VUYW5nZW50cyA9IG5ldyBBcnJheTxudW1iZXI+KGxlbik7XG5cblx0XHR3aGlsZSAoaSA8IGxlbikge1xuXHRcdFx0aW5kZXgxID0gdGhpcy5fcEluZGljZXNbaV07XG5cdFx0XHRpbmRleDIgPSB0aGlzLl9wSW5kaWNlc1tpICsgMV07XG5cdFx0XHRpbmRleDMgPSB0aGlzLl9wSW5kaWNlc1tpICsgMl07XG5cblx0XHRcdHYwID0gdXZzW2luZGV4MSoyICsgMV07XG5cdFx0XHRkdjEgPSB1dnNbaW5kZXgyKjIgKyAxXSAtIHYwO1xuXHRcdFx0ZHYyID0gdXZzW2luZGV4MyoyICsgMV0gLSB2MDtcblxuXHRcdFx0dmkgPSBpbmRleDEqMztcblx0XHRcdHgwID0gcG9zaXRpb25zW3ZpXTtcblx0XHRcdHkwID0gcG9zaXRpb25zW3ZpICsgMV07XG5cdFx0XHR6MCA9IHBvc2l0aW9uc1t2aSArIDJdO1xuXHRcdFx0dmkgPSBpbmRleDIqMztcblx0XHRcdGR4MSA9IHBvc2l0aW9uc1t2aV0gLSB4MDtcblx0XHRcdGR5MSA9IHBvc2l0aW9uc1t2aSArIDFdIC0geTA7XG5cdFx0XHRkejEgPSBwb3NpdGlvbnNbdmkgKyAyXSAtIHowO1xuXHRcdFx0dmkgPSBpbmRleDMqMztcblx0XHRcdGR4MiA9IHBvc2l0aW9uc1t2aV0gLSB4MDtcblx0XHRcdGR5MiA9IHBvc2l0aW9uc1t2aSArIDFdIC0geTA7XG5cdFx0XHRkejIgPSBwb3NpdGlvbnNbdmkgKyAyXSAtIHowO1xuXG5cdFx0XHRjeCA9IGR2MipkeDEgLSBkdjEqZHgyO1xuXHRcdFx0Y3kgPSBkdjIqZHkxIC0gZHYxKmR5Mjtcblx0XHRcdGN6ID0gZHYyKmR6MSAtIGR2MSpkejI7XG5cdFx0XHRkZW5vbSA9IDEvTWF0aC5zcXJ0KGN4KmN4ICsgY3kqY3kgKyBjeipjeik7XG5cblx0XHRcdHRoaXMuX2ZhY2VUYW5nZW50c1tpKytdID0gZGVub20qY3g7XG5cdFx0XHR0aGlzLl9mYWNlVGFuZ2VudHNbaSsrXSA9IGRlbm9tKmN5O1xuXHRcdFx0dGhpcy5fZmFjZVRhbmdlbnRzW2krK10gPSBkZW5vbSpjejtcblx0XHR9XG5cblx0XHR0aGlzLl9mYWNlVGFuZ2VudHNEaXJ0eSA9IGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGhlIG5vcm1hbHMgZm9yIGVhY2ggZmFjZS5cblx0ICovXG5cdHByaXZhdGUgdXBkYXRlRmFjZU5vcm1hbHMoKVxuXHR7XG5cdFx0dmFyIGk6bnVtYmVyID0gMDtcblx0XHR2YXIgajpudW1iZXIgPSAwO1xuXHRcdHZhciBrOm51bWJlciA9IDA7XG5cdFx0dmFyIGluZGV4Om51bWJlcjtcblx0XHR2YXIgb2Zmc2V0Om51bWJlcjtcblx0XHR2YXIgc3RyaWRlOm51bWJlcjtcblxuXHRcdHZhciB4MTpudW1iZXIsIHgyOm51bWJlciwgeDM6bnVtYmVyO1xuXHRcdHZhciB5MTpudW1iZXIsIHkyOm51bWJlciwgeTM6bnVtYmVyO1xuXHRcdHZhciB6MTpudW1iZXIsIHoyOm51bWJlciwgejM6bnVtYmVyO1xuXHRcdHZhciBkeDE6bnVtYmVyLCBkeTE6bnVtYmVyLCBkejE6bnVtYmVyO1xuXHRcdHZhciBkeDI6bnVtYmVyLCBkeTI6bnVtYmVyLCBkejI6bnVtYmVyO1xuXHRcdHZhciBjeDpudW1iZXIsIGN5Om51bWJlciwgY3o6bnVtYmVyO1xuXHRcdHZhciBkOm51bWJlcjtcblxuXHRcdHZhciBwb3NpdGlvbnM6QXJyYXk8bnVtYmVyPiA9IHRoaXMuX3Bvc2l0aW9ucztcblxuXHRcdHZhciBsZW46bnVtYmVyID0gdGhpcy5fcEluZGljZXMubGVuZ3RoO1xuXG5cdFx0aWYgKHRoaXMuX2ZhY2VOb3JtYWxzID09IG51bGwpXG5cdFx0XHR0aGlzLl9mYWNlTm9ybWFscyA9IG5ldyBBcnJheTxudW1iZXI+KGxlbik7XG5cblx0XHRpZiAodGhpcy5fdXNlRmFjZVdlaWdodHMgJiYgdGhpcy5fZmFjZVdlaWdodHMgPT0gbnVsbClcblx0XHRcdHRoaXMuX2ZhY2VXZWlnaHRzID0gbmV3IEFycmF5PG51bWJlcj4obGVuLzMpO1xuXG5cdFx0d2hpbGUgKGkgPCBsZW4pIHtcblx0XHRcdGluZGV4ID0gdGhpcy5fcEluZGljZXNbaSsrXSozO1xuXHRcdFx0eDEgPSBwb3NpdGlvbnNbaW5kZXhdO1xuXHRcdFx0eTEgPSBwb3NpdGlvbnNbaW5kZXggKyAxXTtcblx0XHRcdHoxID0gcG9zaXRpb25zW2luZGV4ICsgMl07XG5cdFx0XHRpbmRleCA9IHRoaXMuX3BJbmRpY2VzW2krK10qMztcblx0XHRcdHgyID0gcG9zaXRpb25zW2luZGV4XTtcblx0XHRcdHkyID0gcG9zaXRpb25zW2luZGV4ICsgMV07XG5cdFx0XHR6MiA9IHBvc2l0aW9uc1tpbmRleCArIDJdO1xuXHRcdFx0aW5kZXggPSB0aGlzLl9wSW5kaWNlc1tpKytdKjM7XG5cdFx0XHR4MyA9IHBvc2l0aW9uc1tpbmRleF07XG5cdFx0XHR5MyA9IHBvc2l0aW9uc1tpbmRleCArIDFdO1xuXHRcdFx0ejMgPSBwb3NpdGlvbnNbaW5kZXggKyAyXTtcblx0XHRcdGR4MSA9IHgzIC0geDE7XG5cdFx0XHRkeTEgPSB5MyAtIHkxO1xuXHRcdFx0ZHoxID0gejMgLSB6MTtcblx0XHRcdGR4MiA9IHgyIC0geDE7XG5cdFx0XHRkeTIgPSB5MiAtIHkxO1xuXHRcdFx0ZHoyID0gejIgLSB6MTtcblx0XHRcdGN4ID0gZHoxKmR5MiAtIGR5MSpkejI7XG5cdFx0XHRjeSA9IGR4MSpkejIgLSBkejEqZHgyO1xuXHRcdFx0Y3ogPSBkeTEqZHgyIC0gZHgxKmR5Mjtcblx0XHRcdGQgPSBNYXRoLnNxcnQoY3gqY3ggKyBjeSpjeSArIGN6KmN6KTtcblx0XHRcdC8vIGxlbmd0aCBvZiBjcm9zcyBwcm9kdWN0ID0gMip0cmlhbmdsZSBhcmVhXG5cblx0XHRcdGlmICh0aGlzLl91c2VGYWNlV2VpZ2h0cykge1xuXHRcdFx0XHR2YXIgdzpudW1iZXIgPSBkKjEwMDAwO1xuXG5cdFx0XHRcdGlmICh3IDwgMSlcblx0XHRcdFx0XHR3ID0gMTtcblxuXHRcdFx0XHR0aGlzLl9mYWNlV2VpZ2h0c1trKytdID0gdztcblx0XHRcdH1cblxuXHRcdFx0ZCA9IDEvZDtcblxuXHRcdFx0dGhpcy5fZmFjZU5vcm1hbHNbaisrXSA9IGN4KmQ7XG5cdFx0XHR0aGlzLl9mYWNlTm9ybWFsc1tqKytdID0gY3kqZDtcblx0XHRcdHRoaXMuX2ZhY2VOb3JtYWxzW2orK10gPSBjeipkO1xuXHRcdH1cblxuXHRcdHRoaXMuX2ZhY2VOb3JtYWxzRGlydHkgPSBmYWxzZTtcblx0fVxuXG5cdHB1YmxpYyBfcE5vdGlmeVZlcnRpY2VzVXBkYXRlKClcblx0e1xuXHRcdHRoaXMuX3BTdHJpZGVPZmZzZXREaXJ0eSA9IHRydWU7XG5cblx0XHR0aGlzLm5vdGlmeVBvc2l0aW9uc1VwZGF0ZSgpO1xuXHRcdHRoaXMubm90aWZ5Tm9ybWFsc1VwZGF0ZSgpO1xuXHRcdHRoaXMubm90aWZ5VGFuZ2VudHNVcGRhdGUoKTtcblx0XHR0aGlzLm5vdGlmeVVWc1VwZGF0ZSgpO1xuXHRcdHRoaXMubm90aWZ5U2Vjb25kYXJ5VVZzVXBkYXRlKCk7XG5cdFx0dGhpcy5ub3RpZnlKb2ludEluZGljZXNVcGRhdGUoKTtcblx0XHR0aGlzLm5vdGlmeUpvaW50V2VpZ2h0c1VwZGF0ZSgpO1xuXHR9XG5cblx0cHJpdmF0ZSBub3RpZnlQb3NpdGlvbnNVcGRhdGUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3Bvc2l0aW9uc0RpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fcG9zaXRpb25zRGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKCF0aGlzLl9wb3NpdGlvbnNVcGRhdGVkKVxuXHRcdFx0dGhpcy5fcG9zaXRpb25zVXBkYXRlZCA9IG5ldyBTdWJHZW9tZXRyeUV2ZW50KFN1Ykdlb21ldHJ5RXZlbnQuVkVSVElDRVNfVVBEQVRFRCwgVHJpYW5nbGVTdWJHZW9tZXRyeS5QT1NJVElPTl9EQVRBKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9wb3NpdGlvbnNVcGRhdGVkKTtcblx0fVxuXG5cdHByaXZhdGUgbm90aWZ5Tm9ybWFsc1VwZGF0ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fdmVydGV4Tm9ybWFsc0RpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fdmVydGV4Tm9ybWFsc0RpcnR5ID0gdHJ1ZTtcblxuXHRcdGlmICghdGhpcy5fbm9ybWFsc1VwZGF0ZWQpXG5cdFx0XHR0aGlzLl9ub3JtYWxzVXBkYXRlZCA9IG5ldyBTdWJHZW9tZXRyeUV2ZW50KFN1Ykdlb21ldHJ5RXZlbnQuVkVSVElDRVNfVVBEQVRFRCwgVHJpYW5nbGVTdWJHZW9tZXRyeS5OT1JNQUxfREFUQSk7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fbm9ybWFsc1VwZGF0ZWQpO1xuXHR9XG5cblx0cHJpdmF0ZSBub3RpZnlUYW5nZW50c1VwZGF0ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fdmVydGV4VGFuZ2VudHNEaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3ZlcnRleFRhbmdlbnRzRGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKCF0aGlzLl90YW5nZW50c1VwZGF0ZWQpXG5cdFx0XHR0aGlzLl90YW5nZW50c1VwZGF0ZWQgPSBuZXcgU3ViR2VvbWV0cnlFdmVudChTdWJHZW9tZXRyeUV2ZW50LlZFUlRJQ0VTX1VQREFURUQsIFRyaWFuZ2xlU3ViR2VvbWV0cnkuVEFOR0VOVF9EQVRBKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl90YW5nZW50c1VwZGF0ZWQpO1xuXHR9XG5cblx0cHJpdmF0ZSBub3RpZnlVVnNVcGRhdGUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3V2c0RpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fdXZzRGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKCF0aGlzLl91dnNVcGRhdGVkKVxuXHRcdFx0dGhpcy5fdXZzVXBkYXRlZCA9IG5ldyBTdWJHZW9tZXRyeUV2ZW50KFN1Ykdlb21ldHJ5RXZlbnQuVkVSVElDRVNfVVBEQVRFRCwgVHJpYW5nbGVTdWJHZW9tZXRyeS5VVl9EQVRBKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl91dnNVcGRhdGVkKTtcblx0fVxuXG5cdHByaXZhdGUgbm90aWZ5U2Vjb25kYXJ5VVZzVXBkYXRlKClcblx0e1xuXHRcdGlmICh0aGlzLl9zZWNvbmRhcnlVVnNEaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX3NlY29uZGFyeVVWc0RpcnR5ID0gdHJ1ZTtcblxuXHRcdGlmICghdGhpcy5fc2Vjb25kYXJ5VVZzVXBkYXRlZClcblx0XHRcdHRoaXMuX3NlY29uZGFyeVVWc1VwZGF0ZWQgPSBuZXcgU3ViR2VvbWV0cnlFdmVudChTdWJHZW9tZXRyeUV2ZW50LlZFUlRJQ0VTX1VQREFURUQsIFRyaWFuZ2xlU3ViR2VvbWV0cnkuU0VDT05EQVJZX1VWX0RBVEEpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX3NlY29uZGFyeVVWc1VwZGF0ZWQpO1xuXHR9XG5cblx0cHJpdmF0ZSBub3RpZnlKb2ludEluZGljZXNVcGRhdGUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2pvaW50SW5kaWNlc0RpcnR5KVxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0dGhpcy5fam9pbnRJbmRpY2VzRGlydHkgPSB0cnVlO1xuXG5cdFx0aWYgKCF0aGlzLl9qb2ludEluZGljZXNVcGRhdGVkKVxuXHRcdFx0dGhpcy5fam9pbnRJbmRpY2VzVXBkYXRlZCA9IG5ldyBTdWJHZW9tZXRyeUV2ZW50KFN1Ykdlb21ldHJ5RXZlbnQuVkVSVElDRVNfVVBEQVRFRCwgVHJpYW5nbGVTdWJHZW9tZXRyeS5KT0lOVF9JTkRFWF9EQVRBKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLl9qb2ludEluZGljZXNVcGRhdGVkKTtcblx0fVxuXG5cdHByaXZhdGUgbm90aWZ5Sm9pbnRXZWlnaHRzVXBkYXRlKClcblx0e1xuXHRcdGlmICh0aGlzLl9qb2ludFdlaWdodHNEaXJ0eSlcblx0XHRcdHJldHVybjtcblxuXHRcdHRoaXMuX2pvaW50V2VpZ2h0c0RpcnR5ID0gdHJ1ZTtcblxuXHRcdGlmICghdGhpcy5fam9pbnRXZWlnaHRzVXBkYXRlZClcblx0XHRcdHRoaXMuX2pvaW50V2VpZ2h0c1VwZGF0ZWQgPSBuZXcgU3ViR2VvbWV0cnlFdmVudChTdWJHZW9tZXRyeUV2ZW50LlZFUlRJQ0VTX1VQREFURUQsIFRyaWFuZ2xlU3ViR2VvbWV0cnkuSk9JTlRfV0VJR0hUX0RBVEEpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuX2pvaW50V2VpZ2h0c1VwZGF0ZWQpO1xuXHR9XG59XG5cbmV4cG9ydCA9IFRyaWFuZ2xlU3ViR2VvbWV0cnk7Il19