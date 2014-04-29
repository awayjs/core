///<reference path="../../_definitions.ts"/>

/**
 * @module away.base
 */
module away.gl
{
	/**
	 *
	 */
	export class VertexData
	{
		private _dataDirty = true;

		public invalid:Array<boolean> = new Array<boolean>(8);

		public buffers:Array<VertexBuffer> = new Array<VertexBuffer>(8);

		public stageGLs:Array<away.base.StageGL> = new Array<away.base.StageGL>(8);

		public data:Array<number>;

		public dataPerVertex:number;

		constructor()
		{
		}

		public updateData(vertices:Array<number>, dataPerVertex:number, originalIndices:Array<number> = null, indexMappings:Array<number> = null)
		{
			if (this._dataDirty) {
				this._dataDirty = false;

				if (indexMappings == null) {
					this.setData(vertices, dataPerVertex);
				} else {
					var splitVerts:Array<number> = new Array<number>(originalIndices.length*dataPerVertex);
					var originalIndex:number;
					var splitIndex:number;
					var i:number = 0;
					var j:number = 0;
					while(i < originalIndices.length) {
						originalIndex = originalIndices[i];

						splitIndex = indexMappings[originalIndex]*dataPerVertex;
						originalIndex *= dataPerVertex;

						for (j = 0; j < dataPerVertex; j++)
							splitVerts[splitIndex + j] = vertices[originalIndex + j];

						i++;
					}

					this.setData(splitVerts, dataPerVertex);
				}
			}
		}

		public invalidateData()
		{
			this._dataDirty = true;
		}

		public dispose()
		{
			for (var i:number = 0; i < 8; ++i) {
				if (this.stageGLs[i]) {
					this.stageGLs[i].disposeVertexData(this);
					this.stageGLs[i] = null;
				}
			}
		}

		/**
		 * @private
		 */
		private disposeBuffers()
		{
			for (var i:number = 0; i < 8; ++i) {
				if (this.buffers[i]) {
					this.buffers[i].dispose();
					this.buffers[i] = null;
				}
			}
		}

		/**
		 * @private
		 */
		private invalidateBuffers()
		{
			for (var i:number = 0; i < 8; ++i)
				this.invalid[i] = true;
		}

		/**
		 *
		 * @param data
		 * @param dataPerVertex
		 * @private
		 */
		private setData(data:Array<number>, dataPerVertex:number)
		{
			if (this.data && this.data.length != data.length)
				this.disposeBuffers();
			else
				this.invalidateBuffers();

			this.data = data;
			this.dataPerVertex = dataPerVertex;
		}
	}
}