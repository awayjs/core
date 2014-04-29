///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.gl
{
	/**
	 *
	 */
	export class VertexDataPool
	{
		private static _pool:Object = new Object();

		constructor()
		{
		}

		public static getItem(id:string, level:number, dataType:string):away.gl.VertexData
		{
			var subGeometryDictionary:Object = <Object> (VertexDataPool._pool[id] || (VertexDataPool._pool[id] = new Object()));
			var subGeometryData:Array<VertexData> = <Array<VertexData>> (subGeometryDictionary[dataType] || (subGeometryDictionary[dataType] = new Array<VertexData>()));

			return subGeometryData[level] || (subGeometryData[level] = new VertexData());
		}

		public static disposeItem(id:string, level:number, dataType:string)
		{
			var subGeometryDictionary:Object = <Object> VertexDataPool._pool[id];
			var subGeometryData:Array<VertexData> = <Array<VertexData>> subGeometryDictionary[dataType];

			subGeometryData[level].dispose();
			subGeometryData[level] = null;
		}

		public disposeData(id:string)
		{
			var subGeometryDictionary:Object = <Object> VertexDataPool._pool[id];

			for (var key in subGeometryDictionary) {
				var subGeometryData:Array<VertexData> = <Array<VertexData>> subGeometryDictionary[key];

				var len:number = subGeometryData.length;
				for (var i:number = 0; i < len; i++) {
					subGeometryData[i].dispose();
					subGeometryData[i] = null;
				}
			}

			VertexDataPool._pool[id] = null;
		}
	}
}