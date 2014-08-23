/**********************************************************************************************************************************************************************************************************
 * This file contains a reference to all the classes used in the project.
 ********************************************************************************************************************************************************************************************************
 *
 * The TypeScript compiler exports classes in a non deterministic manner, as the extend functionality copies the prototype chain
 * of one object onto another during initialisation and load (to create extensible functionality), the non deterministic nature of the
 * compiler can result in an extend operation referencing a class that is undefined and not yet loaded - which throw an JavaScript error.
 *
 * This file provides the compiler with a strict order in which to export the TypeScript classes to mitigate undefined extend errors
 *
 * @see https://typescript.codeplex.com/workitem/1356 @see https://typescript.codeplex.com/workitem/913
 *
 *********************************************************************************************************************************************************************************************************/

///<reference path="../../build/ref/js.d.ts"/>

///<reference path="errors/Error.ts" />
///<reference path="errors/ArgumentError.ts" />
///<reference path="errors/CastError.ts" />
///<reference path="errors/PartialImplementationError.ts" />
///<reference path="errors/AbstractMethodError.ts" />
///<reference path="errors/DocumentError.ts" />
///<reference path="errors/RangeError.ts" />

///<reference path="events/Event.ts" />
///<reference path="events/AssetEvent.ts" />
///<reference path="events/CameraEvent.ts" />
///<reference path="events/DisplayObjectEvent.ts" />
///<reference path="events/EventDispatcher.ts" />
///<reference path="events/GeometryEvent.ts" />
///<reference path="events/HTTPStatusEvent.ts" />
///<reference path="events/IEventDispatcher.ts" />
///<reference path="events/IOErrorEvent.ts" />
///<reference path="events/LightEvent.ts" />
///<reference path="events/LoaderEvent.ts" />
///<reference path="events/ParserEvent.ts" />
///<reference path="events/MouseEvent.ts"/>
///<reference path="events/MaterialEvent.ts" />
///<reference path="events/ProgressEvent.ts" />
///<reference path="events/ProjectionEvent.ts" />
///<reference path="events/RendererEvent.ts" />
///<reference path="events/SceneEvent.ts"/>
///<reference path="events/StageEvent.ts"/>
///<reference path="events/SubGeometryEvent.ts"/>
///<reference path="events/TimerEvent.ts" />

///<reference path="utils/ByteArrayBase.ts"/>
///<reference path="utils/ByteArray.ts"/>
///<reference path="utils/ByteArrayBuffer.ts"/>
///<reference path="utils/ColorUtils.ts"/>
///<reference path="utils/Cast.ts"/>
///<reference path="utils/CSS.ts" />
///<reference path="utils/Debug.ts"/>
///<reference path="utils/Delegate.ts"/>
///<reference path="utils/getTimer.ts" />
///<reference path="utils/RequestAnimationFrame.ts"/>
///<reference path="utils/TextureUtils.ts" />
///<reference path="utils/Timer.ts" />

///<reference path="core/geom/Box.ts"/>
///<reference path="core/geom/ColorTransform.ts"/>
///<reference path="core/geom/MathConsts.ts" />
///<reference path="core/geom/Matrix.ts" />
///<reference path="core/geom/Matrix3D.ts" />
///<reference path="core/geom/Matrix3DUtils.ts" />
///<reference path="core/geom/Orientation3D.ts" />
///<reference path="core/geom/PerspectiveProjection.ts" />
///<reference path="core/geom/Plane3D.ts" />
///<reference path="core/geom/PlaneClassification.ts" />
///<reference path="core/geom/Point.ts" />
///<reference path="core/geom/PoissonLookup.ts" />
///<reference path="core/geom/Quaternion.ts" />
///<reference path="core/geom/Rectangle.ts" />
///<reference path="core/geom/Transform.ts" />
///<reference path="core/geom/UVTransform.ts" />
///<reference path="core/geom/Vector3D.ts" />

///<reference path="bounds/BoundingVolumeBase.ts" />
///<reference path="bounds/NullBounds.ts" />
///<reference path="bounds/BoundingSphere.ts" />
///<reference path="bounds/AxisAlignedBoundingBox.ts" />

///<reference path="core/net/URLRequest.ts" />
///<reference path="core/net/URLLoaderDataFormat.ts" />
///<reference path="core/net/URLRequestMethod.ts" />
///<reference path="core/net/URLLoader.ts" />
///<reference path="core/net/URLVariables.ts" />

///<reference path="core/library/IAsset.ts" />
///<reference path="core/library/NamedAssetBase.ts" />
///<reference path="core/library/AssetType.ts" />

///<reference path="core/display/ContextMode.ts" />
///<reference path="core/display/IContext.ts" />

///<reference path="core/base/BlendMode.ts"/>
///<reference path="core/base/AlignmentMode.ts"/>
///<reference path="core/base/OrientationMode.ts"/>
///<reference path="core/base/BitmapData.ts"/>
///<reference path="core/base/BitmapDataChannel.ts"/>
///<reference path="core/base/CapsStyle"/>
///<reference path="core/base/DisplayObject.ts" />
///<reference path="core/base/Geometry.ts" />
///<reference path="core/base/GradientType.ts" />
///<reference path="core/base/Graphics.ts" />
///<reference path="core/base/GraphicsPathWinding.ts" />
///<reference path="core/base/IBitmapDrawable.ts" />
///<reference path="core/base/IGraphicsData.ts" />
///<reference path="core/base/IMaterialOwner.ts" />
///<reference path="core/base/InterpolationMethod.ts" />
///<reference path="core/base/ISubMesh.ts" />
///<reference path="core/base/ISubMeshClass.ts" />
///<reference path="core/base/SubGeometryBase.ts" />
///<reference path="core/base/SubMeshBase.ts" />
///<reference path="core/base/JointStyle.ts" />
///<reference path="core/base/LineScaleMode.ts" />
///<reference path="core/base/LineSubGeometry.ts" />
///<reference path="core/base/LineSubMesh.ts" />
///<reference path="core/base/LoaderInfo.ts" />
///<reference path="core/base/PixelSnapping.ts" />
///<reference path="core/base/SpreadMethod.ts" />
///<reference path="core/base/Stage.ts" />
///<reference path="core/base/TriangleCulling.ts" />
///<reference path="core/base/TriangleSubGeometry.ts" />
///<reference path="core/base/TriangleSubMesh.ts" />

///<reference path="textures/TextureProxyBase.ts" />
///<reference path="textures/Texture2DBase.ts" />
///<reference path="textures/CubeTextureBase.ts" />
///<reference path="textures/ImageTexture.ts" />
///<reference path="textures/BitmapTexture.ts" />
///<reference path="textures/RenderTexture.ts" />
///<reference path="textures/ImageCubeTexture.ts" />
///<reference path="textures/BitmapCubeTexture.ts" />
///<reference path="textures/MipmapGenerator.ts" />
///<reference path="textures/SpecularBitmapTexture.ts" />

///<reference path="parsers/ParserBase.ts" />
///<reference path="parsers/CubeTextureParser.ts" />
///<reference path="parsers/Texture2DParser.ts" />
///<reference path="parsers/ParserDataFormat.ts" />
///<reference path="parsers/ParserUtils.ts" />
///<reference path="parsers/ResourceDependency.ts" />

///<reference path="core/library/AssetLoaderContext.ts"/>
///<reference path="core/library/AssetLoader.ts" />
///<reference path="core/library/AssetLoaderToken.ts" />
///<reference path="core/library/IDUtil.ts" />
///<reference path="core/library/AssetLibraryIterator.ts" />
///<reference path="core/library/ConflictStrategyBase.ts" />
///<reference path="core/library/NumSuffixConflictStrategy.ts" />
///<reference path="core/library/IgnoreConflictStrategy.ts" />
///<reference path="core/library/ErrorConflictStrategy.ts" />
///<reference path="core/library/ConflictPrecedence.ts" />
///<reference path="core/library/ConflictStrategy.ts" />
///<reference path="core/library/AssetLibraryBundle.ts"/>
///<reference path="core/library/AssetLibrary.ts" />

///<reference path="core/pool/EntityListItem.ts"/>
///<reference path="core/pool/EntityListItemPool.ts"/>
///<reference path="core/pool/IRenderable.ts"/>
///<reference path="core/pool/IRenderableClass.ts"/>
///<reference path="core/pool/IMaterialData.ts"/>
///<reference path="core/pool/ITextureData.ts"/>
///<reference path="core/pool/RenderablePool.ts"/>

///<reference path="core/pool/CSSRenderableBase.ts"/>
///<reference path="core/pool/CSSBillboardRenderable.ts"/>
///<reference path="core/pool/CSSLineSegmentRenderable.ts"/>
///<reference path="core/pool/CSSSkyboxRenderable.ts"/>

///<reference path="core/traverse/ICollector.ts" />
///<reference path="core/traverse/CollectorBase.ts" />
///<reference path="core/traverse/EntityCollector.ts" />
///<reference path="core/traverse/RaycastCollector.ts" />
///<reference path="core/traverse/CSSEntityCollector.ts" />
///<reference path="core/traverse/ShadowCasterCollector.ts" />

///<reference path="core/partition/NodeBase.ts" />
///<reference path="core/partition/NullNode.ts" />
///<reference path="core/partition/Partition.ts" />
///<reference path="core/partition/EntityNode.ts" />
///<reference path="core/partition/CameraNode.ts" />
///<reference path="core/partition/DirectionalLightNode.ts" />
///<reference path="core/partition/LightProbeNode.ts" />
///<reference path="core/partition/PointLightNode.ts" />
///<reference path="core/partition/SkyboxNode.ts" />

///<reference path="core/pick/IPickingCollider.ts" />
///<reference path="core/pick/IPicker.ts"/>
///<reference path="core/pick/PickingCollisionVO.ts"/>
///<reference path="core/pick/RaycastPicker.ts" />

///<reference path="core/render/IRenderer.ts"/>
///<reference path="core/render/CSSRendererBase.ts"/>
///<reference path="core/render/CSSDefaultRenderer.ts"/>

///<reference path="core/sort/IEntitySorter.ts"/>
///<reference path="core/sort/RenderableMergeSort.ts"/>

///<reference path="core/text/AntiAliasType.ts"/>
///<reference path="core/text/GridFitType.ts"/>
///<reference path="core/text/TextFieldAutoSize.ts"/>
///<reference path="core/text/TextFieldType.ts"/>
///<reference path="core/text/TextFormat.ts"/>
///<reference path="core/text/TextFormatAlign.ts"/>
///<reference path="core/text/TextInteractionMode.ts"/>
///<reference path="core/text/TextLineMetrics.ts"/>

///<reference path="core/ui/Keyboard.ts"/>

///<reference path="containers/DisplayObjectContainer.ts" />
///<reference path="core/base/LightBase.ts" />

///<reference path="projections/CoordinateSystem.ts" />
///<reference path="projections/IProjection.ts" />
///<reference path="projections/ProjectionBase.ts" />
///<reference path="projections/PerspectiveProjection.ts" />
///<reference path="projections/FreeMatrixProjection.ts" />
///<reference path="projections/OrthographicProjection.ts" />
///<reference path="projections/OrthographicOffCenterProjection.ts" />
///<reference path="projections/ObliqueNearPlaneProjection.ts" />

///<reference path="entities/Camera.ts" />

///<reference path="materials/shadowmappers/ShadowMapperBase.ts"/>
///<reference path="materials/shadowmappers/CubeMapShadowMapper.ts"/>
///<reference path="materials/shadowmappers/DirectionalShadowMapper.ts"/>
///<reference path="materials/shadowmappers/CascadeShadowMapper.ts"/>
///<reference path="materials/shadowmappers/NearDirectionalShadowMapper.ts"/>

///<reference path="entities/IEntity.ts" />
///<reference path="entities/Billboard.ts" />
///<reference path="entities/DirectionalLight.ts" />
///<reference path="entities/LightProbe.ts" />
///<reference path="entities/LineSegment.ts" />
///<reference path="entities/Mesh.ts" />
///<reference path="entities/PointLight.ts" />
///<reference path="entities/Shape.ts" />
///<reference path="entities/Skybox.ts" />
///<reference path="entities/TextField.ts" />

///<reference path="managers/MouseManager.ts"/>
///<reference path="managers/StageManager.ts"/>

///<reference path="containers/Loader.ts" />
///<reference path="containers/Scene.ts" />
///<reference path="containers/View.ts" />

///<reference path="controllers/ControllerBase.ts"/>
///<reference path="controllers/LookAtController.ts"/>
///<reference path="controllers/HoverController.ts"/>
///<reference path="controllers/FirstPersonController.ts"/>
///<reference path="controllers/FollowController.ts"/>
///<reference path="controllers/SpringController.ts"/>

///<reference path="materials/lightpickers/LightPickerBase.ts"/>
///<reference path="materials/lightpickers/StaticLightPicker.ts"/>

///<reference path="materials/passes/IMaterialPass.ts"/>

///<reference path="materials/LightSources.ts"/>
///<reference path="materials/MaterialBase.ts"/>
///<reference path="materials/CSSMaterialBase.ts"/>

///<reference path="prefabs/PrefabBase.ts"/>
///<reference path="prefabs/PrimitivePrefabBase.ts"/>
///<reference path="prefabs/PrimitiveTorusPrefab.ts"/>
///<reference path="prefabs/PrimitiveCubePrefab.ts"/>
///<reference path="prefabs/PrimitivePlanePrefab.ts"/>
///<reference path="prefabs/PrimitiveCapsulePrefab.ts" />
///<reference path="prefabs/PrimitiveCylinderPrefab.ts" />
///<reference path="prefabs/PrimitiveConePrefab.ts" />
///<reference path="prefabs/PrimitivePolygonPrefab.ts" />
///<reference path="prefabs/PrimitiveSpherePrefab.ts" />

///<reference path="animators/nodes/AnimationNodeBase.ts"/>
///<reference path="animators/IAnimationSet.ts"/>
///<reference path="animators/IAnimator.ts"/>

