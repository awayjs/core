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

///<reference path="../../build/ref/webgl.d.ts"/>
///<reference path="../../build/ref/js.d.ts"/>

///<reference path="errors/Error.ts" />
///<reference path="errors/ArgumentError.ts" />
///<reference path="errors/PartialImplementationError.ts" />
///<reference path="errors/AbstractMethodError.ts" />
///<reference path="errors/DocumentError.ts" />

///<reference path="events/Event.ts" />
///<reference path="events/EventDispatcher.ts" />
///<reference path="events/IEventDispatcher.ts" />
///<reference path="events/IOErrorEvent.ts" />
///<reference path="events/HTTPStatusEvent.ts" />
///<reference path="events/ParserEvent.ts" />
///<reference path="events/ProgressEvent.ts" />
///<reference path="events/LoaderEvent.ts" />
///<reference path="events/AssetEvent.ts" />
///<reference path="events/TimerEvent.ts" />
///<reference path="events/StageGLEvent.ts"/>

///<reference path="parsers/ParserBase.ts" />
///<reference path="parsers/BitmapParser.ts" />
///<reference path="parsers/CubeTextureParser.ts" />
///<reference path="parsers/Texture2DParser.ts" />
///<reference path="parsers/ParserDataFormat.ts" />
///<reference path="parsers/ParserUtils.ts" />
///<reference path="parsers/ResourceDependency.ts" />

///<reference path="core/library/IAsset.ts" />
///<reference path="core/library/IDUtil.ts" />
///<reference path="core/library/NamedAssetBase.ts" />
///<reference path="core/library/AssetType.ts" />
///<reference path="core/library/AssetLibraryIterator.ts" />
///<reference path="core/library/ConflictStrategyBase.ts" />
///<reference path="core/library/NumSuffixConflictStrategy.ts" />
///<reference path="core/library/IgnoreConflictStrategy.ts" />
///<reference path="core/library/ErrorConflictStrategy.ts" />
///<reference path="core/library/ConflictPrecedence.ts" />
///<reference path="core/library/ConflictStrategy.ts" />
///<reference path="core/library/AssetLibraryBundle.ts"/>
///<reference path="core/library/AssetLibrary.ts" />

///<reference path="core/base/BitmapData.ts"/>
///<reference path="core/base/BitmapDataChannel.ts"/>
///<reference path="core/base/BlendMode.ts"/>
///<reference path="core/base/StageGL.ts" />
///<reference path="containers/Stage.ts"/>

///<reference path="core/gl/ContextGLClearMask.ts"/>
///<reference path="core/gl/VertexBuffer.ts"/>
///<reference path="core/gl/IndexBuffer.ts"/>
///<reference path="core/gl/Program.ts"/>
///<reference path="core/gl/SamplerState.ts"/>
///<reference path="core/gl/ContextGLTextureFormat.ts"/>
///<reference path="core/gl/TextureBase.ts"/>
///<reference path="core/gl/Texture.ts" />
///<reference path="core/gl/CubeTexture.ts" />
///<reference path="core/gl/ContextGLTriangleFace.ts"/>
///<reference path="core/gl/ContextGLVertexBufferFormat.ts"/>
///<reference path="core/gl/ContextGLProgramType.ts"/>
///<reference path="core/gl/ContextGLBlendFactor.ts"/>
///<reference path="core/gl/ContextGLCompareMode.ts"/>
///<reference path="core/gl/ContextGLMipFilter.ts"/>
///<reference path="core/gl/ContextGLProfile.ts"/>
///<reference path="core/gl/ContextGLStencilAction.ts"/>
///<reference path="core/gl/ContextGLTextureFilter.ts"/>
///<reference path="core/gl/ContextGLWrapMode.ts"/>
///<reference path="core/gl/ContextGL.ts" />
///<reference path="core/gl/AGLSLContextGL.ts" />

///<reference path="core/geom/ColorTransform.ts"/>
///<reference path="core/geom/Matrix.ts" />
///<reference path="core/geom/Matrix3D.ts" />
///<reference path="core/geom/Orientation3D.ts" />
///<reference path="core/geom/Point.ts" />
///<reference path="core/geom/Rectangle.ts" />
///<reference path="core/geom/Vector3D.ts" />

///<reference path="core/geom/MathConsts.ts" />
///<reference path="core/geom/Quaternion.ts" />
///<reference path="core/geom/PlaneClassification.ts" />
///<reference path="core/geom/Plane3D.ts" />
///<reference path="core/geom/Matrix3DUtils.ts" />
///<reference path="core/geom/PoissonLookup.ts" />

///<reference path="core/net/AssetLoaderContext.ts"/>
///<reference path="core/net/AssetLoader.ts" />
///<reference path="core/net/AssetLoaderToken.ts" />
///<reference path="core/net/URLRequest.ts" />
///<reference path="core/net/URLLoaderDataFormat.ts" />
///<reference path="core/net/URLRequestMethod.ts" />
///<reference path="core/net/URLLoader.ts" />
///<reference path="core/net/URLVariables.ts" />

///<reference path="core/ui/Keyboard.ts"/>

///<reference path="managers/RTTBufferManager.ts"/>
///<reference path="managers/StageGLManager.ts"/>

///<reference path="utils/ByteArrayBase.ts"/>
///<reference path="utils/ByteArray.ts"/>
///<reference path="utils/ByteArrayBuffer.ts"/>
///<reference path="utils/ColorUtils.ts"/>
///<reference path="utils/CSS.ts" />
///<reference path="utils/Debug.ts"/>
///<reference path="utils/Delegate.ts"/>
///<reference path="utils/getTimer.ts" />
///<reference path="utils/RequestAnimationFrame.ts"/>
///<reference path="utils/TextureUtils.ts" />
///<reference path="utils/Timer.ts" />

///<reference path="textures/TextureProxyBase.ts" />
///<reference path="textures/Texture2DBase.ts" />
///<reference path="textures/CubeTextureBase.ts" />
///<reference path="textures/ATFData.ts" />
///<reference path="textures/ATFCubeTexture.ts" />
///<reference path="textures/ATFTexture.ts" />
///<reference path="textures/HTMLImageElementTexture.ts" />
///<reference path="textures/BitmapTexture.ts" />
///<reference path="textures/RenderTexture.ts" />
///<reference path="textures/HTMLImageElementCubeTexture.ts" />
///<reference path="textures/BitmapCubeTexture.ts" />
///<reference path="textures/MipmapGenerator.ts" />

///<reference path="../aglsl/Sampler.ts"/>
///<reference path="../aglsl/Token.ts"/>
///<reference path="../aglsl/Header.ts"/>
///<reference path="../aglsl/OpLUT.ts"/>
///<reference path="../aglsl/Header.ts"/>
///<reference path="../aglsl/Description.ts"/>
///<reference path="../aglsl/Destination.ts"/>
///<reference path="../aglsl/ContextGL.ts"/>
///<reference path="../aglsl/Mapping.ts"/>
///<reference path="../aglsl/assembler/OpCode.ts"/>
///<reference path="../aglsl/assembler/OpcodeMap.ts"/>
///<reference path="../aglsl/assembler/Part.ts"/>
///<reference path="../aglsl/assembler/RegMap.ts"/>
///<reference path="../aglsl/assembler/SamplerMap.ts"/>
///<reference path="../aglsl/assembler/AGALMiniAssembler.ts"/>
///<reference path="../aglsl/AGALTokenizer.ts"/>
///<reference path="../aglsl/Parser.ts"/>
///<reference path="../aglsl/AGLSLCompiler.ts"/>
