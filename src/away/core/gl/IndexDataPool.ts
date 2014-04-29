///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.gl
{
	/**
	 *
	 */
	export class IndexDataPool
	{
		private static _pool:Object = new Object();

		constructor()
		{
		}

		public static getItem(id:string, level:number):away.gl.IndexData
		{
			var subGeometryData:Array<IndexData> = <Array<IndexData>> (IndexDataPool._pool[id] || (IndexDataPool._pool[id] = new Array<IndexData>()));

			return subGeometryData[level] || (subGeometryData[level] = new IndexData());
		}

		public static disposeItem(id:string, level:number)
		{
			var subGeometryData:Array<IndexData> = <Array<IndexData>> this._pool[id];

			subGeometryData[level].dispose();
			subGeometryData[level] = null;
		}

		public disposeData(id:string)
		{
			var subGeometryData:Array<IndexData> = <Array<IndexData>> IndexDataPool._pool[id];

			var len:number = subGeometryData.length;
			for (var i:number = 0; i < len; i++) {
				subGeometryData[i].dispose();
				subGeometryData[i] = null;
			}

			IndexDataPool._pool[id] = null;
		}
	}
}