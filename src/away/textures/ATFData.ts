///<reference path="../_definitions.ts"/>

module away.textures
{
	import ContextGLTextureFormat	= away.gl.ContextGLTextureFormat;
	import ByteArray				= away.utils.ByteArray;
	
	export class ATFData
	{
		public static TYPE_NORMAL:number /*int*/ = 0x0;
		public static TYPE_CUBE:number /*int*/ = 0x1;
		
		public type:number /*int*/;
		public format:string;
		public width:number /*int*/;
		public height:number /*int*/;
		public numTextures:number /*int*/;
		public data:ByteArray;
		
		/** Create a new instance by parsing the given byte array. */
		constructor(data:ByteArray)
		{
			var sign:string = data.readUTFBytes(3);
			if (sign != "ATF")
				throw new Error("ATF parsing error, unknown format " + sign);
			
			if (data[6] == 255)
				data.position = 12; // new file version
			else
				data.position = 6; // old file version
			
			var tdata:number /*uint*/ = data.readUnsignedByte();
			var _type:number /*int*/ = tdata >> 7; // UB[1]
			var _format:number /*int*/ = tdata & 0x7f; // UB[7]
			
			switch (_format) {
				case 0:
				case 1:
					this.format = ContextGLTextureFormat.BGRA;
					break;
				case 2:
				case 3:
					this.format = ContextGLTextureFormat.COMPRESSED;
					break;
				case 4:
				case 5:
					this.format = ContextGLTextureFormat.COMPRESSED_ALPHA;
					break; // explicit string to stay compatible 
				// with older versions
				default:
					throw new Error("Invalid ATF format");
			}
			
			switch (_type) {
				case 0:
					this.type = ATFData.TYPE_NORMAL;
					break;
				case 1:
					this.type = ATFData.TYPE_CUBE;
					break;
				
				default:
					throw new Error("Invalid ATF type");
			}
			
			this.width = Math.pow(2, data.readUnsignedByte());
			this.height = Math.pow(2, data.readUnsignedByte());
			this.numTextures = data.readUnsignedByte();
			this.data = data;
		}
	
	}
}
