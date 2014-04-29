///<reference path="../../_definitions.ts"/>

module away.gl
{

	export class ContextGL
	{

		private _drawing:boolean;
		private _blendEnabled:boolean;
		private _blendSourceFactor:number;
		private _blendDestinationFactor:number;

		private _currentWrap:number = 0;
		private _currentFilter:number = 0;
		private _currentMipFilter:number = 0;

		private _indexBufferList:IndexBuffer[] = [];
		private _vertexBufferList:VertexBuffer[] = [];
		private _textureList:TextureBase[] = [];
		private _programList:Program[] = [];

		private _samplerStates:away.gl.SamplerState[] = [];

		public static MAX_SAMPLERS:number = 8;

		//@protected
		public _gl:WebGLRenderingContext;

		//@protected
		public _currentProgram:Program;

		constructor(canvas:HTMLCanvasElement)
		{
			try {
				this._gl = <WebGLRenderingContext> canvas.getContext("experimental-webgl", { premultipliedAlpha:false, alpha:false });
				if (!this._gl) {
					this._gl = <WebGLRenderingContext> canvas.getContext("webgl", { premultipliedAlpha:false, alpha:false });
				}
			} catch (e) {
				//this.dispatchEvent( new away.events.AwayEvent( away.events.AwayEvent.INITIALIZE_FAILED, e ) );
			}

			if (this._gl) {
				//this.dispatchEvent( new away.events.AwayEvent( away.events.AwayEvent.INITIALIZE_SUCCESS ) );
			} else {
				//this.dispatchEvent( new away.events.AwayEvent( away.events.AwayEvent.INITIALIZE_FAILED, e ) );
				alert("WebGL is not available.");
			}

			for (var i:number = 0; i < ContextGL.MAX_SAMPLERS; ++i) {
				this._samplerStates[ i ] = new away.gl.SamplerState();
				this._samplerStates[ i ].wrap = this._gl.REPEAT;
				this._samplerStates[ i ].filter = this._gl.LINEAR;
				this._samplerStates[ i ].mipfilter = 0;
			}
		}

		public gl():WebGLRenderingContext
		{
			return this._gl;
		}

		public clear(red:number = 0, green:number = 0, blue:number = 0, alpha:number = 1, depth:number = 1, stencil:number = 0, mask:number = ContextGLClearMask.ALL)
		{
			if (!this._drawing) {
				this.updateBlendStatus();
				this._drawing = true;
			}
			this._gl.clearColor(red, green, blue, alpha);
			this._gl.clearDepth(depth);
			this._gl.clearStencil(stencil);
			this._gl.clear(mask);
		}

		public configureBackBuffer(width:number, height:number, antiAlias:number, enableDepthAndStencil:boolean = true)
		{
			if (enableDepthAndStencil) {
				this._gl.enable(this._gl.STENCIL_TEST);
				this._gl.enable(this._gl.DEPTH_TEST);
			}

			this._gl.viewport['width'] = width;
			this._gl.viewport['height'] = height;

			this._gl.viewport(0, 0, width, height);
		}

		public createCubeTexture(size:number, format:string, optimizeForRenderToTexture:boolean, streamingLevels:number = 0):away.gl.CubeTexture
		{
			var texture:away.gl.CubeTexture = new away.gl.CubeTexture(this._gl, size);
			this._textureList.push(texture);
			return texture;
		}

		public createIndexBuffer(numIndices:number):away.gl.IndexBuffer
		{
			var indexBuffer:IndexBuffer = new away.gl.IndexBuffer(this._gl, numIndices);
			this._indexBufferList.push(indexBuffer);
			return indexBuffer;
		}

		public createProgram():Program
		{
			var program:Program = new away.gl.Program(this._gl);
			this._programList.push(program);
			return program;
		}

		public createTexture(width:number, height:number, format:string, optimizeForRenderToTexture:boolean, streamingLevels:number = 0):Texture
		{
			//TODO streaming
			var texture:Texture = new away.gl.Texture(this._gl, width, height);
			this._textureList.push(texture);
			return texture;
		}

		public createVertexBuffer(numVertices:number, data32PerVertex:number):away.gl.VertexBuffer
		{
			var vertexBuffer:VertexBuffer = new away.gl.VertexBuffer(this._gl, numVertices, data32PerVertex);
			this._vertexBufferList.push(vertexBuffer);
			return vertexBuffer;
		}

		public dispose()
		{
			var i:number;
			for (i = 0; i < this._indexBufferList.length; ++i)
				this._indexBufferList[i].dispose();

			this._indexBufferList = null;

			for (i = 0; i < this._vertexBufferList.length; ++i)
				this._vertexBufferList[i].dispose();

			this._vertexBufferList = null;

			for (i = 0; i < this._textureList.length; ++i)
				this._textureList[i].dispose();

			this._textureList = null;

			for (i = 0; i < this._programList.length; ++i)
				this._programList[i].dispose();

			for (i = 0; i < this._samplerStates.length; ++i)
				this._samplerStates[i] = null;

			this._programList = null;
		}

		public drawToBitmapData(destination:away.base.BitmapData)
		{
			var arrayBuffer:ArrayBuffer = new ArrayBuffer(destination.width*destination.height*4);

			this._gl.readPixels(0, 0, destination.width, destination.height, this._gl.RGBA, this._gl.UNSIGNED_BYTE, new Uint8Array(arrayBuffer));

			var byteArray:away.utils.ByteArray = new away.utils.ByteArray();
			byteArray.setArrayBuffer(arrayBuffer);

			destination.setPixels(new away.geom.Rectangle(0, 0, destination.width, destination.height), byteArray);
		}

		public drawTriangles(indexBuffer:IndexBuffer, firstIndex:number = 0, numTriangles:number = -1)
		{
			if (!this._drawing)
				throw "Need to clear before drawing if the buffer has not been cleared since the last present() call.";

			this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, indexBuffer.glBuffer);
			this._gl.drawElements(this._gl.TRIANGLES, (numTriangles == -1)? indexBuffer.numIndices : numTriangles*3, this._gl.UNSIGNED_SHORT, firstIndex);
		}

		public present()
		{
			this._drawing = false;
			//this._gl.useProgram( null );
		}

		public setBlendFactors(sourceFactor:string, destinationFactor:string)
		{
			//TODO optimise with table lookup

			this._blendEnabled = true;

			switch (sourceFactor) {
				case away.gl.ContextGLBlendFactor.ONE:
					this._blendSourceFactor = this._gl.ONE;
					break;
				case away.gl.ContextGLBlendFactor.DESTINATION_ALPHA:
					this._blendSourceFactor = this._gl.DST_ALPHA;
					break;
				case away.gl.ContextGLBlendFactor.DESTINATION_COLOR:
					this._blendSourceFactor = this._gl.DST_COLOR;
					break;
				case away.gl.ContextGLBlendFactor.ONE:
					this._blendSourceFactor = this._gl.ONE;
					break;
				case away.gl.ContextGLBlendFactor.ONE_MINUS_DESTINATION_ALPHA:
					this._blendSourceFactor = this._gl.ONE_MINUS_DST_ALPHA;
					break;
				case away.gl.ContextGLBlendFactor.ONE_MINUS_DESTINATION_COLOR:
					this._blendSourceFactor = this._gl.ONE_MINUS_DST_COLOR;
					break;
				case away.gl.ContextGLBlendFactor.ONE_MINUS_SOURCE_ALPHA:
					this._blendSourceFactor = this._gl.ONE_MINUS_SRC_ALPHA;
					break;
				case away.gl.ContextGLBlendFactor.ONE_MINUS_SOURCE_COLOR:
					this._blendSourceFactor = this._gl.ONE_MINUS_SRC_COLOR;
					break;
				case away.gl.ContextGLBlendFactor.SOURCE_ALPHA:
					this._blendSourceFactor = this._gl.SRC_ALPHA;
					break;
				case away.gl.ContextGLBlendFactor.SOURCE_COLOR:
					this._blendSourceFactor = this._gl.SRC_COLOR;
					break;
				case away.gl.ContextGLBlendFactor.ZERO:
					this._blendSourceFactor = this._gl.ZERO;
					break;
				default:
					throw "Unknown blend source factor"; // TODO error
					break;
			}

			switch (destinationFactor) {
				case away.gl.ContextGLBlendFactor.ONE:
					this._blendDestinationFactor = this._gl.ONE;
					break;
				case away.gl.ContextGLBlendFactor.DESTINATION_ALPHA:
					this._blendDestinationFactor = this._gl.DST_ALPHA;
					break;
				case away.gl.ContextGLBlendFactor.DESTINATION_COLOR:
					this._blendDestinationFactor = this._gl.DST_COLOR;
					break;
				case away.gl.ContextGLBlendFactor.ONE:
					this._blendDestinationFactor = this._gl.ONE;
					break;
				case away.gl.ContextGLBlendFactor.ONE_MINUS_DESTINATION_ALPHA:
					this._blendDestinationFactor = this._gl.ONE_MINUS_DST_ALPHA;
					break;
				case away.gl.ContextGLBlendFactor.ONE_MINUS_DESTINATION_COLOR:
					this._blendDestinationFactor = this._gl.ONE_MINUS_DST_COLOR;
					break;
				case away.gl.ContextGLBlendFactor.ONE_MINUS_SOURCE_ALPHA:
					this._blendDestinationFactor = this._gl.ONE_MINUS_SRC_ALPHA;
					break;
				case away.gl.ContextGLBlendFactor.ONE_MINUS_SOURCE_COLOR:
					this._blendDestinationFactor = this._gl.ONE_MINUS_SRC_COLOR;
					break;
				case away.gl.ContextGLBlendFactor.SOURCE_ALPHA:
					this._blendDestinationFactor = this._gl.SRC_ALPHA;
					break;
				case away.gl.ContextGLBlendFactor.SOURCE_COLOR:
					this._blendDestinationFactor = this._gl.SRC_COLOR;
					break;
				case away.gl.ContextGLBlendFactor.ZERO:
					this._blendDestinationFactor = this._gl.ZERO;
					break;
				default:
					throw "Unknown blend destination factor"; // TODO error
					break;
			}

			this.updateBlendStatus();
		}

		public setColorMask(red:boolean, green:boolean, blue:boolean, alpha:boolean)
		{
			this._gl.colorMask(red, green, blue, alpha);
		}

		public setCulling(triangleFaceToCull:string, coordinateSystem:string = "leftHanded")
		{
			if (triangleFaceToCull == ContextGLTriangleFace.NONE) {
				this._gl.disable(this._gl.CULL_FACE);
			} else {
				this._gl.enable(this._gl.CULL_FACE);
				switch (triangleFaceToCull) {
					case ContextGLTriangleFace.BACK:
						this._gl.cullFace((coordinateSystem == "leftHanded")? this._gl.FRONT : this._gl.BACK);
						break
					case ContextGLTriangleFace.FRONT:
						this._gl.cullFace((coordinateSystem == "leftHanded")? this._gl.BACK : this._gl.FRONT);
						break;
					case ContextGLTriangleFace.FRONT_AND_BACK:
						this._gl.cullFace(this._gl.FRONT_AND_BACK);
						break;
					default:
						throw "Unknown ContextGLTriangleFace type."; // TODO error
				}
			}
		}

		// TODO ContextGLCompareMode
		public setDepthTest(depthMask:boolean, passCompareMode:string)
		{
			//TODO optimise with table lookup

			switch (passCompareMode) {
				case ContextGLCompareMode.ALWAYS:
					this._gl.depthFunc(this._gl.ALWAYS);
					break;
				case ContextGLCompareMode.EQUAL:
					this._gl.depthFunc(this._gl.EQUAL);
					break;
				case ContextGLCompareMode.GREATER:
					this._gl.depthFunc(this._gl.GREATER);
					break;
				case ContextGLCompareMode.GREATER_EQUAL:
					this._gl.depthFunc(this._gl.GEQUAL);
					break;
				case ContextGLCompareMode.LESS:
					this._gl.depthFunc(this._gl.LESS);
					break;
				case ContextGLCompareMode.LESS_EQUAL:
					this._gl.depthFunc(this._gl.LEQUAL);
					break;
				case ContextGLCompareMode.NEVER:
					this._gl.depthFunc(this._gl.NEVER);
					break;
				case ContextGLCompareMode.NOT_EQUAL:
					this._gl.depthFunc(this._gl.NOTEQUAL);
					break;
				default:
					throw "Unknown ContextGLCompareMode type."; // TODO error
					break;
			}
			this._gl.depthMask(depthMask);
		}

		public setProgram(program:away.gl.Program)
		{
			//TODO decide on construction/reference resposibilities
			this._currentProgram = program;
			program.focusProgram();
		}

		private getUniformLocationNameFromAgalRegisterIndex(programType:string, firstRegister:number):string
		{
			switch (programType) {
				case ContextGLProgramType.VERTEX:
					return "vc";
					break;
				case ContextGLProgramType.FRAGMENT:
					return "fc";
					break;
				default:
					throw "Program Type " + programType + " not supported";
			}
		}

		/*
		 public setProgramConstantsFromByteArray
		 */

		public setProgramConstantsFromMatrix(programType:string, firstRegister:number, matrix:away.geom.Matrix3D, transposedMatrix:boolean = false)
		{
			var locationName = this.getUniformLocationNameFromAgalRegisterIndex(programType, firstRegister);
			this.setGLSLProgramConstantsFromMatrix(locationName, matrix, transposedMatrix);
		}

		public static modulo:number = 0;

		public setProgramConstantsFromArray(programType:string, firstRegister:number, data:number[], numRegisters:number = -1)
		{
			for (var i:number = 0; i < numRegisters; ++i) {
				var currentIndex:number = i*4;
				var locationName:string = this.getUniformLocationNameFromAgalRegisterIndex(programType, firstRegister + i) + ( i + firstRegister );

				this.setGLSLProgramConstantsFromArray(locationName, data, currentIndex);
			}
		}

		/*
		 public setGLSLProgramConstantsFromByteArray

		 */

		public setGLSLProgramConstantsFromMatrix(locationName:string, matrix:away.geom.Matrix3D, transposedMatrix:boolean = false)
		{
			var location:WebGLUniformLocation = this._gl.getUniformLocation(this._currentProgram.glProgram, locationName);
			this._gl.uniformMatrix4fv(location, !transposedMatrix, new Float32Array(matrix.rawData));
		}

		public setGLSLProgramConstantsFromArray(locationName:string, data:number[], startIndex:number = 0)
		{/*
		 console.log( "======= setGLSLProgramConstantsFromArray ======= " )
		 console.log( "locationName : " + locationName );
		 console.log( "data : " + data );
		 console.log( "startIndex : " + startIndex );
		 console.log( "================================================ \n" )*/
			var location:WebGLUniformLocation = this._gl.getUniformLocation(this._currentProgram.glProgram, locationName);
			this._gl.uniform4f(location, data[startIndex], data[startIndex + 1], data[startIndex + 2], data[startIndex + 3]);
		}

		public setScissorRectangle(rectangle:away.geom.Rectangle)
		{
			if (!rectangle) {
				this._gl.disable(this._gl.SCISSOR_TEST);
				return;
			}

			this._gl.enable(this._gl.SCISSOR_TEST);
			this._gl.scissor(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
		}

		public setTextureAt(sampler:number, texture:away.gl.TextureBase)
		{
			var locationName:string = "fs" + sampler;
			this.setGLSLTextureAt(locationName, texture, sampler);
		}

		public setGLSLTextureAt(locationName:string, texture:TextureBase, textureIndex:number)
		{
			if (!texture) {
				this._gl.activeTexture(this._gl.TEXTURE0 + (textureIndex));
				this._gl.bindTexture(this._gl.TEXTURE_2D, null);
				this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP, null);
				return;
			}

			switch (textureIndex) {
				case 0:
					this._gl.activeTexture(this._gl.TEXTURE0);
					break;
				case 1:
					this._gl.activeTexture(this._gl.TEXTURE1);
					break;
				case 2:
					this._gl.activeTexture(this._gl.TEXTURE2);
					break;
				case 3:
					this._gl.activeTexture(this._gl.TEXTURE3);
					break;
				case 4:
					this._gl.activeTexture(this._gl.TEXTURE4);
					break;
				case 5:
					this._gl.activeTexture(this._gl.TEXTURE5);
					break;
				case 6:
					this._gl.activeTexture(this._gl.TEXTURE6);
					break;
				case 7:
					this._gl.activeTexture(this._gl.TEXTURE7);
					break;
				default:
					throw "Texture " + textureIndex + " is out of bounds.";
			}

			var location:WebGLUniformLocation = this._gl.getUniformLocation(this._currentProgram.glProgram, locationName);

			if (texture.textureType == "texture2d") {
				this._gl.bindTexture(this._gl.TEXTURE_2D, (<away.gl.Texture>texture).glTexture);
				this._gl.uniform1i(location, textureIndex);
				var samplerState:away.gl.SamplerState = this._samplerStates[ textureIndex ];

				if (samplerState.wrap != this._currentWrap) {
					//this._currentWrap = samplerState.wrap;
					this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, samplerState.wrap);
					this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, samplerState.wrap);
				}

				if (samplerState.filter != this._currentFilter) {
					//this._currentFilter = samplerState.filter;
					this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, samplerState.filter);
					this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, samplerState.filter);
				}

				if (samplerState.mipfilter != this._currentMipFilter) {
					//this._currentMipFilter = samplerState.mipfilter;
					this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, samplerState.mipfilter);
					this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, samplerState.mipfilter);
				}

				//this._gl.bindTexture( this._gl.TEXTURE_2D, null );
			} else if (texture.textureType == "textureCube") {

				this._gl.bindTexture(this._gl.TEXTURE_CUBE_MAP, (<away.gl.CubeTexture>texture).glTexture);
				this._gl.uniform1i(location, textureIndex);
				var samplerState:away.gl.SamplerState = this._samplerStates[ textureIndex ];

				if (samplerState.wrap != this._currentWrap) {
					//this._currentWrap = samplerState.wrap;
					this._gl.texParameteri(this._gl.TEXTURE_CUBE_MAP, this._gl.TEXTURE_WRAP_S, samplerState.wrap);
					this._gl.texParameteri(this._gl.TEXTURE_CUBE_MAP, this._gl.TEXTURE_WRAP_T, samplerState.wrap);
				}

				if (samplerState.filter != this._currentFilter) {
					//this._currentFilter = samplerState.filter;
					this._gl.texParameteri(this._gl.TEXTURE_CUBE_MAP, this._gl.TEXTURE_MIN_FILTER, samplerState.filter);
					this._gl.texParameteri(this._gl.TEXTURE_CUBE_MAP, this._gl.TEXTURE_MAG_FILTER, samplerState.filter);
				}

				if (samplerState.mipfilter != this._currentMipFilter) {
					//this._currentMipFilter = samplerState.mipfilter;
					this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, samplerState.mipfilter);
					this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, samplerState.mipfilter);
				}
				//this._gl.bindTexture( this._gl.TEXTURE_CUBE_MAP, null );
			}
		}

		public setSamplerStateAt(sampler:number, wrap:string, filter:string, mipfilter:string):void
		{
			var glWrap:number = 0;
			var glFilter:number = 0;
			var glMipFilter:number = 0;

			switch (wrap) {
				case ContextGLWrapMode.REPEAT:
					glWrap = this._gl.REPEAT;
					break;
				case ContextGLWrapMode.CLAMP:
					glWrap = this._gl.CLAMP_TO_EDGE;
					break;
				default:
					throw "Wrap is not supported: " + wrap;
			}

			switch (filter) {
				case ContextGLTextureFilter.LINEAR:
					glFilter = this._gl.LINEAR;
					break;
				case ContextGLTextureFilter.NEAREST:
					glFilter = this._gl.NEAREST;
					break;
				default:
					throw "Filter is not supported " + filter;
			}

			switch (mipfilter) {
				case ContextGLMipFilter.MIPNEAREST:
					glMipFilter = this._gl.NEAREST_MIPMAP_NEAREST;
					break;
				case ContextGLMipFilter.MIPLINEAR:
					glMipFilter = this._gl.LINEAR_MIPMAP_LINEAR;
					break;
				case ContextGLMipFilter.MIPNONE:
					glMipFilter = this._gl.NONE;
					break;
				default:
					throw "MipFilter is not supported " + mipfilter;
			}

			if (0 <= sampler && sampler < ContextGL.MAX_SAMPLERS) {
				this._samplerStates[ sampler ].wrap = glWrap;
				this._samplerStates[ sampler ].filter = glFilter;
				this._samplerStates[ sampler ].mipfilter = glMipFilter;
			} else {
				throw "Sampler is out of bounds.";
			}
		}

		public setVertexBufferAt(index:number, buffer:VertexBuffer, bufferOffset:number = 0, format:string = null)
		{
			var locationName:string = "va" + index;
			this.setGLSLVertexBufferAt(locationName, buffer, bufferOffset, format);
		}

		public setGLSLVertexBufferAt(locationName, buffer:VertexBuffer, bufferOffset:number = 0, format:string = null)
		{
			//if ( buffer == null )return;

			var location:number = this._currentProgram? this._gl.getAttribLocation(this._currentProgram.glProgram, locationName) : -1;
			if (!buffer) {
				if (location > -1)
					this._gl.disableVertexAttribArray(location);

				return;
			}

			this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer.glBuffer);

			var dimension:number;
			var type:number = this._gl.FLOAT;
			var numBytes:number = 4;

			switch (format) {
				case ContextGLVertexBufferFormat.BYTES_4:
					dimension = 4;
					break;
				case ContextGLVertexBufferFormat.FLOAT_1:
					dimension = 1;
					break;
				case ContextGLVertexBufferFormat.FLOAT_2:
					dimension = 2;
					break;
				case ContextGLVertexBufferFormat.FLOAT_3:
					dimension = 3;
					break;
				case ContextGLVertexBufferFormat.FLOAT_4:
					dimension = 4;
					break;
				default:
					throw "Buffer format " + format + " is not supported.";
			}

			this._gl.enableVertexAttribArray(location);
			this._gl.vertexAttribPointer(location, dimension, type, false, buffer.data32PerVertex*numBytes, bufferOffset*numBytes);
		}

		public setRenderToTexture(target:away.gl.TextureBase, enableDepthAndStencil:boolean = false, antiAlias:number = 0, surfaceSelector:number = 0)
		{
			var texture : away.gl.Texture = <away.gl.Texture>target;
			var frameBuffer:WebGLFramebuffer = texture.frameBuffer;
			this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, frameBuffer);

			if (enableDepthAndStencil) {
				this._gl.enable(this._gl.STENCIL_TEST);
				this._gl.enable(this._gl.DEPTH_TEST);
			}

			this._gl.viewport(0, 0, texture.width, texture.height );
		}

		public setRenderToBackBuffer()
		{
			this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);
		}

		private updateBlendStatus()
		{
			if (this._blendEnabled) {
				this._gl.enable(this._gl.BLEND);
				this._gl.blendEquation(this._gl.FUNC_ADD);
				this._gl.blendFunc(this._blendSourceFactor, this._blendDestinationFactor);
			} else {
				this._gl.disable(this._gl.BLEND);
			}
		}
	}
}