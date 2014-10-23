import Matrix					= require("awayjs-core/lib/geom/Matrix");

class MatrixTest
{

	private ma:Matrix = new Matrix(10, 11, 12, 13, 14, 15);
	private mb:Matrix = new Matrix(0, 1, 2, 3, 4, 5);

	constructor()
	{
		this.ma.concat(this.mb);
		console.log(this.ma);
	}
}