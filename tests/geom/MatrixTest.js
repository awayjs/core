"use strict";
var Matrix_1 = require("awayjs-core/lib/geom/Matrix");
var MatrixTest = (function () {
    function MatrixTest() {
        this.ma = new Matrix_1.default(10, 11, 12, 13, 14, 15);
        this.mb = new Matrix_1.default(0, 1, 2, 3, 4, 5);
        this.ma.concat(this.mb);
        console.log(this.ma);
    }
    return MatrixTest;
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdlb20vTWF0cml4VGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUJBQXVCLDZCQUE2QixDQUFDLENBQUE7QUFFckQ7SUFNQztRQUhRLE9BQUUsR0FBVSxJQUFJLGdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQyxPQUFFLEdBQVUsSUFBSSxnQkFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFJaEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFDRixpQkFBQztBQUFELENBWEEsQUFXQyxJQUFBIiwiZmlsZSI6Imdlb20vTWF0cml4VGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXRyaXhcdFx0XHRcdFx0ZnJvbSBcImF3YXlqcy1jb3JlL2xpYi9nZW9tL01hdHJpeFwiO1xuXG5jbGFzcyBNYXRyaXhUZXN0XG57XG5cblx0cHJpdmF0ZSBtYTpNYXRyaXggPSBuZXcgTWF0cml4KDEwLCAxMSwgMTIsIDEzLCAxNCwgMTUpO1xuXHRwcml2YXRlIG1iOk1hdHJpeCA9IG5ldyBNYXRyaXgoMCwgMSwgMiwgMywgNCwgNSk7XG5cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0dGhpcy5tYS5jb25jYXQodGhpcy5tYik7XG5cdFx0Y29uc29sZS5sb2codGhpcy5tYSk7XG5cdH1cbn0iXSwic291cmNlUm9vdCI6Ii4vdGVzdHMifQ==
