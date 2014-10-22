var Matrix3D = require("awayjs-core/lib/core/geom/Matrix3D");
var Vector3D = require("awayjs-core/lib/core/geom/Vector3D");

var VextMat3DTests = (function () {
    function VextMat3DTests() {
        var m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        var v = new Vector3D();

        console.log('------------------------------------ copyColumnTo'); // DONE OK

        m.copyColumnTo(0, v);
        console.log('copyColumnTo 0 ', v);
        m.copyColumnTo(1, v);
        console.log('copyColumnTo 1 ', v);
        m.copyColumnTo(2, v);
        console.log('copyColumnTo 2 ', v);
        m.copyColumnTo(3, v);
        console.log('copyColumnTo 3 ', v);

        console.log('------------------------------------ copyRowTo'); // DONE OK

        var r = new Vector3D();

        m.copyRowTo(0, r);
        console.log('copyRowTo 0 ', r);
        m.copyRowTo(1, r);
        console.log('copyRowTo 1 ', r);
        m.copyRowTo(2, r);
        console.log('copyRowTo 2 ', r);
        m.copyRowTo(3, r);
        console.log('copyRowTo 3 ', r);

        console.log('------------------------------------ copyRowFrom'); // DONE OK

        m = new Matrix3D([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

        m.copyRowFrom(0, new Vector3D(16, 15, 14, 13));
        console.log('copyRowFrom 0 ', m.rawData);
        m.copyRowFrom(1, new Vector3D(12, 11, 10, 9));
        console.log('copyRowFrom 1 ', m.rawData);
        m.copyRowFrom(2, new Vector3D(8, 7, 6, 5));
        console.log('copyRowFrom 2 ', m.rawData);
        m.copyRowFrom(3, new Vector3D(4, 3, 2, 1));
        console.log('copyRowFrom 3 ', m.rawData);

        console.log('------------------------------------ copyColumnFrom'); // DONE OK

        m = new Matrix3D([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

        m.copyColumnFrom(0, new Vector3D(16, 15, 14, 13));
        console.log('copyColumnFrom 0 ', m.rawData);
        m.copyColumnFrom(1, new Vector3D(12, 11, 10, 9));
        console.log('copyColumnFrom 1 ', m.rawData);
        m.copyColumnFrom(2, new Vector3D(8, 7, 6, 5));
        console.log('copyColumnFrom 2 ', m.rawData);
        m.copyColumnFrom(3, new Vector3D(4, 3, 2, 1));
        console.log('copyColumnFrom 3 ', m.rawData);

        console.log('------------------------------------ Append'); // DONE OK

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        var s = new Matrix3D([
            16, 15, 14, 13,
            12, 11, 10, 9,
            8, 7, 6, 5,
            4, 3, 2, 1]);

        m.append(s);

        console.log('Append Result', m.rawData);
        console.log('Appendee', s.rawData);

        console.log('------------------------------------ Prepend'); // DONE OK

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        s = new Matrix3D([
            16, 15, 14, 13,
            12, 11, 10, 9,
            8, 7, 6, 5,
            4, 3, 2, 1]);

        m.prepend(s);

        console.log('Prepend Result', m.rawData);
        console.log('Prependee', s.rawData);

        console.log('------------------------------------ Append Translation'); // DONE OK

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        m.appendTranslation(5, 6, 7);
        console.log(' Append Translation', m.rawData);

        console.log('------------------------------------ appendRotation'); // DONE OK - Pivot gives different result ( commented out for now )

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        var pivot = new Vector3D(7, 8, 9);

        var axis = new Vector3D(0, 0, 1);
        m.appendRotation(45, axis); //, pivot );
        console.log('appendRotation', m.rawData);

        console.log('------------------------------------ appendScale'); // DONE OK

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        m.appendScale(6, 7, 8);
        console.log('appendScale', m.rawData);

        console.log('------------------------------------ prepentScale'); // DONE OK

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        m.prependScale(6, 7, 8);
        console.log('prepentScale', m.rawData);

        console.log('------------------------------------ clone'); // DONE OK

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        console.log('clone', m.clone().rawData);

        console.log('------------------------------------ copyFrom'); // DONE OK

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        var cl = new Matrix3D([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        cl.copyFrom(m);

        console.log('copyFrom', cl.rawData);

        console.log('------------------------------------ copyRawDataFrom'); // DONE ok - Offet / Traspose not implemented

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        m.copyRawDataFrom([16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);

        console.log('copyRawDataFrom', m.rawData);

        console.log('------------------------------------ copyRawDataTo'); // done OK

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        var result = new Array(9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9);

        console.log('result.length: ', result.length);

        m.copyRawDataTo(result, 1, true);
        console.log('rawData', m.rawData);
        console.log('copyRawDataTo', result);

        console.log('------------------------------------ transpose'); // DONE ok - Offet / Traspose not implemented

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        m.transpose();
        console.log('transpose', m.rawData);

        console.log('------------------------------------ copyToMatrix3D'); // done ok

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        s = new Matrix3D([
            16, 15, 14, 13,
            12, 11, 10, 9,
            8, 7, 6, 5,
            4, 3, 2, 1]);

        m.copyToMatrix3D(s);
        console.log('copyToMatrix3D', m.rawData);

        console.log('------------------------------------ decompose'); /// NOT WORKING

        m = new Matrix3D([
            1, 6, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1]);

        var resultDecompose = m.decompose();
        console.log('copyToMatrix3D', resultDecompose[0]);
        console.log('copyToMatrix3D', resultDecompose[1]);
        console.log('copyToMatrix3D', resultDecompose[2]);

        console.log('------------------------------------ determinant'); // WORKING ok - good

        m = new Matrix3D([
            1, 2, 0, 6,
            2, 1, 0, 0,
            0, 0, 1, 3,
            6, 0, 3, 1]);

        console.log('determinant:', m.determinant);

        m = new Matrix3D([
            1, 2, 5, 6,
            2, 1, 0, 8,
            5, 0, 1, 3,
            6, 8, 3, 1]);

        console.log('determinant:', m.determinant);

        m = new Matrix3D([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1]);

        console.log('determinant:', m.determinant);

        console.log('------------------------------------ invert'); // WORKING ok - good

        m = new Matrix3D([
            1, 2, 5, 6,
            2, 1, 0, 8,
            5, 0, 1, 3,
            6, 8, 3, 1]);

        var b;

        b = m.invert();
        console.log('invert:', b, m.rawData);

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        b = m.invert();
        console.log('invert:', b, m.rawData);

        console.log('------------------------------------ Prepend Rotation'); // OK Good

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        axis = new Vector3D(1, 0, 0);
        m.prependRotation(45, axis);

        console.log('prependRotation:', m.rawData);

        console.log('------------------------------------ prependTranslation'); // OK Good

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        m.prependTranslation(5, 10, 15);

        console.log('prependTranslation:', m.rawData);

        console.log('------------------------------------ recompose'); // OK Good

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        var rVects = new Array();
        rVects.push(new Vector3D(5, 1, 3));
        rVects.push(new Vector3D(5, 0, 1));
        rVects.push(new Vector3D(2, 1, 3));

        m.recompose(rVects);

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        rVects = new Array();
        rVects.push(new Vector3D(1, 2, 9));
        rVects.push(new Vector3D(3, 3, 1));
        rVects.push(new Vector3D(8, 1, 8));

        m.recompose(rVects);

        console.log('recompose:', m.rawData);

        rVects = new Array();
        rVects.push(new Vector3D(1, 2, 9));
        rVects.push(new Vector3D(3, 3, 1));
        rVects.push(new Vector3D(0, 0, 0));

        var b = m.recompose(rVects);

        console.log('fail - recompose:', m.rawData, b);

        console.log('------------------------------------ transformVector '); // IT WORKS !!!

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        var tVResult = m.transformVector(new Vector3D(1, 2, 3));

        console.log(tVResult);

        console.log('------------------------------------ transformVector '); // IT WORKS !!!

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        var vout = new Array(0, 1, 2, 3, 4, 5);
        var vin = new Array(4, 5, 6);
        m.transformVectors(vin, vout);
        console.log('transformVector', vout, vin);

        console.log('------------------------------------ transpose'); // IT WORKS !!!

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        m.transpose();
        console.log('transpose', m.rawData);

        console.log('------------------------------------ getAxisRotation'); // internal class

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        //m.getAxisRotation(4 , 5 , 6 , 90 );
        //console.log( 'getAxisRotation' , m.rawData );
        console.log('------------------------------------ position'); // internal class

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16]);

        var posVect = new Vector3D(5, 10, 15);

        m.position = posVect;

        console.log('set position', m.rawData);
        console.log('get position', m.position);
    }
    VextMat3DTests.prototype.testappend = function () {
        var v = new Vector3D(0, 1, 1);
        var v1 = new Vector3D(1, 0, 1);
        var v2 = new Vector3D(7, 8, 0);

        var t = new Matrix3D([
            0, 10, 10, 1,
            10, 5, 10, 10,
            10, 10, 5, 10,
            1, 10, 10, 0]);

        var d = new Matrix3D([
            1, 50, 1, 8,
            2, 5, 12, 9,
            30, 16, 35, 10,
            4, 18, 40, 11]);
        t.append(d);

        console.log(t.rawData);
    };

    VextMat3DTests.prototype.testprependRotation = function () {
        var v = new Vector3D(0, 1, 1);
        var v1 = new Vector3D(1, 0, 1);
        var v2 = new Vector3D(7, 8, 0);

        var t = new Matrix3D([
            0, 10, 10, 1,
            10, 5, 10, 10,
            10, 10, 5, 10,
            1, 10, 10, 0]);

        var d = new Matrix3D();
        t.prependRotation(90, v);

        console.log(t.rawData);
    };

    VextMat3DTests.prototype.testcopyToMatrix3D = function () {
        var v = new Vector3D(0, 2, 3);
        var v1 = new Vector3D(4, 0, 6);
        var v2 = new Vector3D(7, 8, 0);

        var t = new Matrix3D([
            0, 10, 10, 1,
            10, 5, 10, 10,
            10, 10, 5, 10,
            1, 10, 10, 0]);

        var d = new Matrix3D();

        //t.copyToMatrix3D( d ) ;
        console.log(d.rawData);
    };

    VextMat3DTests.prototype.testDecompose = function () {
        console.log('----------------------------------------------------------------------');
        console.log('testDecompose');
        var v;
        var m;
        var r = new Array(16);

        for (var c = 0; c < 10; c++) {
            m = new Matrix3D([
                this.getRnd(-100, 100), this.getRnd(-100, 100), this.getRnd(-100, 100), this.getRnd(-100, 100),
                this.getRnd(-100, 100), this.getRnd(-100, 100), this.getRnd(-100, 100), this.getRnd(-100, 100),
                this.getRnd(-100, 100), this.getRnd(-100, 100), this.getRnd(-100, 100), this.getRnd(-100, 100),
                this.getRnd(-100, 100), this.getRnd(-100, 100), this.getRnd(-100, 100), this.getRnd(-100, 100)]);

            m.copyRawDataTo(r);

            v = m.decompose();
            this.outputDecompose(m.rawData, r, v[0], v[1], v[2]);
        }

        console.log('//------------------------------------------------------------ AS3');
        console.log('private function testDecompose( result : Vector.<Number> , original : Vector.<Number> , a1 : Vector3D , a2 : Vector3D  , a3 : Vector3D )');
        console.log('{');
        console.log('    var m 		: Matrix3D = new Matrix3D( original );');
        console.log('    var result 	: Vector.<Vector3D> = m.decompose();');
        console.log("   trace('0----------------------------------------');");
        console.log("   trace( r[0])");
        console.log("   trace( a1 )");
        console.log("   trace('1--------------------');");
        console.log("   trace( r[1])");
        console.log("   trace( a2 )");
        console.log("   trace('2--------------------');");
        console.log("   trace( r[2])");
        console.log("   trace( a3 )");
        console.log("   trace('--------------------');");
        console.log("   trace( 'TSResult: ' , result );");
        console.log("   trace( 'ASResult: ' , m.rawData );");
        console.log("   trace( 'original: ' , original );");
        console.log("   trace('--------------------');");
        console.log('}');
    };

    VextMat3DTests.prototype.outputDecompose = function (result, original, a1, a2, a3) {
        var s1 = 'new Vector3D( ' + a1.x + ' , ' + a1.y + ' , ' + a1.z + ' )';
        var s2 = 'new Vector3D( ' + a2.x + ' , ' + a2.y + ' , ' + a2.z + ' )';
        var s3 = 'new Vector3D( ' + a3.x + ' , ' + a3.y + ' , ' + a3.z + ' )';

        console.log('testDecompose( new <Number> [' + result + '], new <Number> [' + original + '] , ' + s1 + ' , ' + s2 + ' , ' + s3 + ' );');
    };

    VextMat3DTests.prototype.testPosition = function () {
        console.log('----------------------------------------------------------------------');
        console.log('testPosition');
        var v = new Vector3D(1, 2, 3);
        var p = new Vector3D(2, 2, 2);
        var pos;

        var m;
        var i;
        var r = new Array(16);

        m = new Matrix3D([
            1, 2, 4, 5,
            2, 1, 0, 8,
            4, 0, 1, 7,
            5, 8, 7, 1]);
        m.copyRawDataTo(r);
        m.position = v;
        pos = m.position;
        this.outputPosition(m.rawData, r, v);

        m = new Matrix3D([
            1, 0, 4, 5,
            0, 1, 8, 0,
            4, 8, 1, 7,
            5, 0, 7, 1]);
        m.copyRawDataTo(r);
        m.position = v;
        pos = m.position;
        this.outputPosition(m.rawData, r, v);

        m = new Matrix3D([
            1, 0, 4, 5,
            0, 1, 8, 0,
            4, 8, 1, 2,
            5, 0, 2, 1]);
        m.copyRawDataTo(r);
        m.position = v;
        pos = m.position;
        this.outputPosition(m.rawData, r, v);

        m = new Matrix3D([
            1, 0, 4, 5,
            0, 1, 8, 0,
            4, 8, 1, 1,
            5, 0, 1, 1]);
        m.copyRawDataTo(r);
        m.position = v;
        pos = m.position;
        this.outputPosition(m.rawData, r, v);

        console.log('//------------------------------------------------------------ AS3');
        console.log('private function testPosition( result : Vector.<Number> , original : Vector.<Number> , t : Vector3D )');
        console.log('{');
        console.log('    var m : Matrix3D = new Matrix3D( original );');
        console.log('    m.position = t;');
        console.log('    var p : Vector3D = m.position;');
        console.log('    trace( "TSResult: " , result );');
        console.log('    trace( "ASResult: " , m.rawData );');
        console.log('    trace( "Pos: " ,p );');
        console.log('}');
    };

    VextMat3DTests.prototype.outputPosition = function (result, original, posResult) {
        var a = 'new Vector3D( ' + posResult.x + ' , ' + posResult.y + ' , ' + posResult.z + ' )';
        console.log('testPosition( new <Number> [' + result + '], new <Number> [' + original + '] , ' + a + ');');
    };

    VextMat3DTests.prototype.testAppendScale = function () {
        console.log('----------------------------------------------------------------------');
        console.log('testAppendScale');
        var v = new Vector3D(1, 2, 3);
        var p = new Vector3D(2, 2, 2);

        var m;
        var i;
        var r = new Array(16);

        m = new Matrix3D([
            1, 2, 4, 5,
            2, 1, 0, 8,
            4, 0, 1, 7,
            5, 8, 7, 1]);
        m.copyRawDataTo(r);
        m.appendScale(v.x, v.y, v.z);

        this.outputAppendScale(m.rawData, r, v);

        m = new Matrix3D([
            1, 0, 4, 5,
            0, 1, 8, 0,
            4, 8, 1, 7,
            5, 0, 7, 1]);

        m.copyRawDataTo(r);
        m.appendScale(v.x, v.y, v.z);
        this.outputAppendScale(m.rawData, r, v);

        m = new Matrix3D([
            1, 0, 4, 5,
            0, 1, 8, 0,
            4, 8, 1, 2,
            5, 0, 2, 1]);

        m.copyRawDataTo(r);
        m.appendScale(v.x, v.y, v.z);
        this.outputAppendScale(m.rawData, r, v);

        m = new Matrix3D([
            1, 0, 4, 5,
            0, 1, 8, 0,
            4, 8, 1, 1,
            5, 0, 1, 1]);

        m.copyRawDataTo(r);
        m.appendScale(v.x, v.y, v.z);
        this.outputAppendScale(m.rawData, r, v);

        console.log('//------------------------------------------------------------ AS3');
        console.log('private function testAppendScale( result : Vector.<Number> , original : Vector.<Number> , t : Vector3D )');
        console.log('{');
        console.log('    var m : Matrix3D = new Matrix3D( original );');
        console.log('    m.appendScale( t.x , t.y , t.z );');
        console.log('    trace( "TSResult: " , result );');
        console.log('    trace( "ASResult: " , m.rawData );');
        console.log('}');
    };

    VextMat3DTests.prototype.outputAppendScale = function (result, original, v) {
        var a = 'new Vector3D( ' + v.x + ' , ' + v.y + ' , ' + v.z + ' )';
        console.log('testAppendScale( new <Number> [' + result + '], new <Number> [' + original + '] , ' + a + ');');
    };

    VextMat3DTests.prototype.testAppendTranslation = function () {
        console.log('----------------------------------------------------------------------');
        console.log('testAppendTranslation');
        var v = new Vector3D(1, 2, 3);
        var p = new Vector3D(2, 2, 2);

        var m;
        var i;
        var r = new Array(16);

        m = new Matrix3D([
            1, 2, 4, 5,
            2, 1, 0, 8,
            4, 0, 1, 7,
            5, 8, 7, 1]);
        m.copyRawDataTo(r);
        m.appendTranslation(v.x, v.y, v.z);

        this.outputAppendTranslation(m.rawData, r, v);

        m = new Matrix3D([
            1, 0, 4, 5,
            0, 1, 8, 0,
            4, 8, 1, 7,
            5, 0, 7, 1]);

        m.copyRawDataTo(r);
        m.appendTranslation(v.x, v.y, v.z);
        this.outputAppendTranslation(m.rawData, r, v);

        m = new Matrix3D([
            1, 0, 4, 5,
            0, 1, 8, 0,
            4, 8, 1, 2,
            5, 0, 2, 1]);

        m.copyRawDataTo(r);
        m.appendTranslation(v.x, v.y, v.z);
        this.outputAppendTranslation(m.rawData, r, v);

        m = new Matrix3D([
            1, 0, 4, 5,
            0, 1, 8, 0,
            4, 8, 1, 1,
            5, 0, 1, 1]);

        m.copyRawDataTo(r);
        m.appendTranslation(v.x, v.y, v.z);
        this.outputAppendTranslation(m.rawData, r, v);

        console.log('//------------------------------------------------------------ AS3');
        console.log('private function testAppendTranslation( result : Vector.<Number> , original : Vector.<Number> , t : Vector3D )');
        console.log('{');
        console.log('    var m : Matrix3D = new Matrix3D( original );');
        console.log('    m.appendTranslation( t.x , t.y , t.z );');
        console.log('    trace( "TSResult: " , result );');
        console.log('    trace( "ASResult: " , m.rawData );');
        console.log('}');
    };

    VextMat3DTests.prototype.outputAppendTranslation = function (result, original, v) {
        var a = 'new Vector3D( ' + v.x + ' , ' + v.y + ' , ' + v.z + ' )';
        console.log('testAppendTranslation( new <Number> [' + result + '], new <Number> [' + original + '] , ' + a + ');');
    };

    VextMat3DTests.prototype.testAppendRotation = function () {
        console.log('----------------------------------------------------------------------');
        console.log('testAppendRotation');

        var v = new Vector3D(1, 2, 3);
        var p = new Vector3D(2, 2, 2);

        var m;
        var i;
        var r = new Array(16);

        m = new Matrix3D([
            1, 2, 4, 5,
            2, 1, 0, 8,
            4, 0, 1, 7,
            5, 8, 7, 1]);
        m.copyRawDataTo(r);
        m.appendRotation(90, v); // , p );

        this.outputAppendRotation(m.rawData, r, v, p);

        m = new Matrix3D([
            1, 0, 4, 5,
            0, 1, 8, 0,
            4, 8, 1, 7,
            5, 0, 7, 1]);

        m.copyRawDataTo(r);
        m.appendRotation(90, v); //, p );
        this.outputAppendRotation(m.rawData, r, v, p);

        m = new Matrix3D([
            1, 0, 4, 5,
            0, 1, 8, 0,
            4, 8, 1, 2,
            5, 0, 2, 1]);

        m.copyRawDataTo(r);
        m.appendRotation(90, v); //, p );
        this.outputAppendRotation(m.rawData, r, v, p);

        m = new Matrix3D([
            1, 0, 4, 5,
            0, 1, 8, 0,
            4, 8, 1, 1,
            5, 0, 1, 1]);

        m.copyRawDataTo(r);
        m.appendRotation(90, v); //, p );
        this.outputAppendRotation(m.rawData, r, v, p);

        console.log('//------------------------------------------------------------ AS3');
        console.log('private function testAppendRotation( result : Vector.<Number> , original : Vector.<Number> , axis : Vector3D , pivot : Vector3D )');
        console.log('{');
        console.log('    var m : Matrix3D = new Matrix3D( original );');
        console.log('    m.appendRotation( 90 , axis , pivot );');
        console.log('    trace( "TSResult: " , result );');
        console.log('    trace( "ASResult: " , m.rawData );');
        console.log('}');
    };

    VextMat3DTests.prototype.testInvert = function () {
        var v = new Vector3D();
        var m;
        var i;
        var r = new Array(16);

        m = new Matrix3D([
            1, 2, 4, 5,
            2, 1, 0, 8,
            4, 0, 1, 7,
            5, 8, 7, 1]);
        m.copyRawDataTo(r);
        i = m.invert();
        this.outputInvert(i, m.rawData, r);

        m = new Matrix3D([
            1, 0, 4, 5,
            0, 1, 8, 0,
            4, 8, 1, 7,
            5, 0, 7, 1]);

        m.copyRawDataTo(r);
        i = m.invert();
        this.outputInvert(i, m.rawData, r);

        m = new Matrix3D([
            1, 0, 4, 5,
            0, 1, 8, 0,
            4, 8, 1, 2,
            5, 0, 2, 1]);

        m.copyRawDataTo(r);
        i = m.invert();
        this.outputInvert(i, m.rawData, r);
    };

    VextMat3DTests.prototype.testCopyRowTo = function () {
        var v = new Vector3D();
        var m;
        var i;
        var r = new Array(16);

        m = new Matrix3D([
            1, 2, 4, 5,
            6, 7, 8, 9,
            4, 0, 1, 7,
            5, 8, 7, 1]);

        m.copyRowTo(0, v);
        console.log(v);
        m.copyRowTo(1, v);
        console.log(v);
        m.copyRowTo(2, v);
        console.log(v);
        m.copyRowTo(3, v);
        console.log(v);
    };

    VextMat3DTests.prototype.testCopyColumnTo = function () {
        var v = new Vector3D();
        var m;
        var i;
        var r = new Array(16);

        m = new Matrix3D([
            1, 0, 4, 5,
            0, 1, 8, 0,
            4, 8, 1, 1,
            5, 0, 1, 1]);

        m = new Matrix3D([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 1, 12,
            13, 14, 15, 16]);

        m.copyColumnTo(0, v);
        console.log(v.toString());
        m.copyColumnTo(1, v);
        console.log(v.toString());
        m.copyColumnTo(2, v);
        console.log(v.toString());
        m.copyColumnTo(3, v);
        console.log(v.toString());

        v.w = v.x = v.y = v.z = 0;
        m.copyColumnFrom(0, v);
        console.log(m.rawData);
        v.w = v.x = v.y = v.z = 1;
        m.copyColumnFrom(1, v);
        console.log(m.rawData);
        v.w = v.x = v.y = v.z = 2;
        m.copyColumnFrom(2, v);
        console.log(m.rawData);
        v.w = v.x = v.y = v.z = 3;
        m.copyColumnFrom(3, v);
        console.log(m.rawData);
    };

    VextMat3DTests.prototype.outputAppendRotation = function (result, original, axis, pivot) {
        var a = 'new Vector3D( ' + axis.x + ' , ' + axis.y + ' , ' + axis.z + ' )';
        var p = 'new Vector3D( ' + pivot.x + ' , ' + pivot.y + ' , ' + pivot.z + ' )';

        console.log('testAppendRotation( new <Number> [' + result + '], new <Number> [' + original + '] , ' + a + ' , ' + p + ');');
    };

    VextMat3DTests.prototype.outputInvert = function (success, data, original) {
        console.log('testInvert(' + success + ', new <Number> [' + data + '], new <Number> [' + original + ']);');
    };

    VextMat3DTests.prototype.output = function (data, result) {
        console.log('testDeterminant( new <Number> [' + data + '], ' + result + ');');
    };

    VextMat3DTests.prototype.getRnd = function (max, min) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return VextMat3DTests;
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdlb20vVmV4dE1hdDNEVGVzdHMudHMiXSwibmFtZXMiOlsiVmV4dE1hdDNEVGVzdHMiLCJWZXh0TWF0M0RUZXN0cy5jb25zdHJ1Y3RvciIsIlZleHRNYXQzRFRlc3RzLnRlc3RhcHBlbmQiLCJWZXh0TWF0M0RUZXN0cy50ZXN0cHJlcGVuZFJvdGF0aW9uIiwiVmV4dE1hdDNEVGVzdHMudGVzdGNvcHlUb01hdHJpeDNEIiwiVmV4dE1hdDNEVGVzdHMudGVzdERlY29tcG9zZSIsIlZleHRNYXQzRFRlc3RzLm91dHB1dERlY29tcG9zZSIsIlZleHRNYXQzRFRlc3RzLnRlc3RQb3NpdGlvbiIsIlZleHRNYXQzRFRlc3RzLm91dHB1dFBvc2l0aW9uIiwiVmV4dE1hdDNEVGVzdHMudGVzdEFwcGVuZFNjYWxlIiwiVmV4dE1hdDNEVGVzdHMub3V0cHV0QXBwZW5kU2NhbGUiLCJWZXh0TWF0M0RUZXN0cy50ZXN0QXBwZW5kVHJhbnNsYXRpb24iLCJWZXh0TWF0M0RUZXN0cy5vdXRwdXRBcHBlbmRUcmFuc2xhdGlvbiIsIlZleHRNYXQzRFRlc3RzLnRlc3RBcHBlbmRSb3RhdGlvbiIsIlZleHRNYXQzRFRlc3RzLnRlc3RJbnZlcnQiLCJWZXh0TWF0M0RUZXN0cy50ZXN0Q29weVJvd1RvIiwiVmV4dE1hdDNEVGVzdHMudGVzdENvcHlDb2x1bW5UbyIsIlZleHRNYXQzRFRlc3RzLm91dHB1dEFwcGVuZFJvdGF0aW9uIiwiVmV4dE1hdDNEVGVzdHMub3V0cHV0SW52ZXJ0IiwiVmV4dE1hdDNEVGVzdHMub3V0cHV0IiwiVmV4dE1hdDNEVGVzdHMuZ2V0Um5kIl0sIm1hcHBpbmdzIjoiQUFBQSw0REFBb0U7QUFDcEUsNERBQW9FOztBQUVwRTtJQUdDQTtRQUVDQyxJQUFJQSxDQUFDQSxHQUFZQSxJQUFJQSxRQUFRQSxDQUFLQTtZQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNoQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUE7WUFDYkEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBRUEsQ0FBRUE7O1FBRWhDQSxJQUFJQSxDQUFDQSxHQUFjQSxJQUFJQSxRQUFRQSxDQUFDQSxDQUFDQTs7UUFFakNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLG1EQUFtREEsQ0FBQ0EsRUFBQ0EsVUFBVUE7O1FBRTNFQSxDQUFDQSxDQUFDQSxZQUFZQSxDQUFFQSxDQUFDQSxFQUFHQSxDQUFDQSxDQUFFQTtRQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxpQkFBaUJBLEVBQUdBLENBQUNBLENBQUVBO1FBQzNEQSxDQUFDQSxDQUFDQSxZQUFZQSxDQUFFQSxDQUFDQSxFQUFHQSxDQUFDQSxDQUFFQTtRQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxpQkFBaUJBLEVBQUdBLENBQUNBLENBQUVBO1FBQzNEQSxDQUFDQSxDQUFDQSxZQUFZQSxDQUFFQSxDQUFDQSxFQUFHQSxDQUFDQSxDQUFFQTtRQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxpQkFBaUJBLEVBQUdBLENBQUNBLENBQUVBO1FBQzNEQSxDQUFDQSxDQUFDQSxZQUFZQSxDQUFFQSxDQUFDQSxFQUFHQSxDQUFDQSxDQUFFQTtRQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxpQkFBaUJBLEVBQUdBLENBQUNBLENBQUVBOztRQUUzREEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsZ0RBQWdEQSxDQUFDQSxFQUFDQSxVQUFVQTs7UUFFeEVBLElBQUlBLENBQUNBLEdBQWNBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBOztRQUVqQ0EsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBRUEsQ0FBQ0EsRUFBR0EsQ0FBQ0EsQ0FBRUE7UUFBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsY0FBY0EsRUFBR0EsQ0FBQ0EsQ0FBRUE7UUFDckRBLENBQUNBLENBQUNBLFNBQVNBLENBQUVBLENBQUNBLEVBQUdBLENBQUNBLENBQUVBO1FBQUNBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLGNBQWNBLEVBQUdBLENBQUNBLENBQUVBO1FBQ3JEQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFFQSxDQUFDQSxFQUFHQSxDQUFDQSxDQUFFQTtRQUFDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxjQUFjQSxFQUFHQSxDQUFDQSxDQUFFQTtRQUNyREEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBRUEsQ0FBQ0EsRUFBR0EsQ0FBQ0EsQ0FBRUE7UUFBQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsY0FBY0EsRUFBR0EsQ0FBQ0EsQ0FBRUE7O1FBRXJEQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxrREFBa0RBLENBQUNBLEVBQUVBLFVBQVVBOztRQUUzRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7O1FBRXBEQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFFQSxDQUFDQSxFQUFHQSxJQUFJQSxRQUFRQSxDQUFFQSxFQUFFQSxFQUFHQSxFQUFFQSxFQUFHQSxFQUFFQSxFQUFHQSxFQUFFQSxDQUFDQSxDQUFFQTtRQUFFQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxnQkFBZ0JBLEVBQUdBLENBQUNBLENBQUNBLE9BQU9BLENBQUVBO1FBQ2pHQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFFQSxDQUFDQSxFQUFHQSxJQUFJQSxRQUFRQSxDQUFFQSxFQUFFQSxFQUFHQSxFQUFFQSxFQUFHQSxFQUFFQSxFQUFJQSxDQUFDQSxDQUFDQSxDQUFFQTtRQUFFQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxnQkFBZ0JBLEVBQUdBLENBQUNBLENBQUNBLE9BQU9BLENBQUVBO1FBQ2pHQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFFQSxDQUFDQSxFQUFHQSxJQUFJQSxRQUFRQSxDQUFHQSxDQUFDQSxFQUFJQSxDQUFDQSxFQUFJQSxDQUFDQSxFQUFJQSxDQUFDQSxDQUFDQSxDQUFFQTtRQUFFQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxnQkFBZ0JBLEVBQUdBLENBQUNBLENBQUNBLE9BQU9BLENBQUVBO1FBQ2pHQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFFQSxDQUFDQSxFQUFHQSxJQUFJQSxRQUFRQSxDQUFHQSxDQUFDQSxFQUFJQSxDQUFDQSxFQUFJQSxDQUFDQSxFQUFJQSxDQUFDQSxDQUFDQSxDQUFFQTtRQUFFQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxnQkFBZ0JBLEVBQUdBLENBQUNBLENBQUNBLE9BQU9BLENBQUVBOztRQUVqR0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EscURBQXFEQSxDQUFDQSxFQUFFQSxVQUFVQTs7UUFFOUVBLENBQUNBLEdBQUdBLElBQUlBLFFBQVFBLENBQUNBLENBQUVBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLENBQUNBLENBQUNBOztRQUVwREEsQ0FBQ0EsQ0FBQ0EsY0FBY0EsQ0FBRUEsQ0FBQ0EsRUFBR0EsSUFBSUEsUUFBUUEsQ0FBRUEsRUFBRUEsRUFBR0EsRUFBRUEsRUFBR0EsRUFBRUEsRUFBR0EsRUFBRUEsQ0FBQ0EsQ0FBRUE7UUFBRUEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsbUJBQW1CQSxFQUFHQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFFQTtRQUN2R0EsQ0FBQ0EsQ0FBQ0EsY0FBY0EsQ0FBRUEsQ0FBQ0EsRUFBR0EsSUFBSUEsUUFBUUEsQ0FBRUEsRUFBRUEsRUFBR0EsRUFBRUEsRUFBR0EsRUFBRUEsRUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBRUE7UUFBRUEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsbUJBQW1CQSxFQUFHQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFFQTtRQUN2R0EsQ0FBQ0EsQ0FBQ0EsY0FBY0EsQ0FBRUEsQ0FBQ0EsRUFBR0EsSUFBSUEsUUFBUUEsQ0FBR0EsQ0FBQ0EsRUFBSUEsQ0FBQ0EsRUFBSUEsQ0FBQ0EsRUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBRUE7UUFBRUEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsbUJBQW1CQSxFQUFHQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFFQTtRQUN2R0EsQ0FBQ0EsQ0FBQ0EsY0FBY0EsQ0FBRUEsQ0FBQ0EsRUFBR0EsSUFBSUEsUUFBUUEsQ0FBR0EsQ0FBQ0EsRUFBSUEsQ0FBQ0EsRUFBSUEsQ0FBQ0EsRUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBRUE7UUFBRUEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsbUJBQW1CQSxFQUFHQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFFQTs7UUFFdkdBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLDZDQUE2Q0EsQ0FBQ0EsRUFBRUEsVUFBVUE7O1FBRXRFQSxDQUFDQSxHQUFHQSxJQUFJQSxRQUFRQSxDQUFFQTtZQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNyQkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUE7WUFDYkEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBRUEsQ0FBRUE7O1FBRTNCQSxJQUFJ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QUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBO1lBQ2JBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUVBLENBQUVBOztRQUVuQkEsSUFBSUEsRUFBRUEsR0FBY0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsRUFBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDcEVBLEVBQUVBLENBQUNBLFFBQVFBLENBQUVBLENBQUNBLENBQUVBOztRQUVoQkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBRUEsVUFBVUEsRUFBR0EsRUFBRUEsQ0FBQ0EsT0FBT0EsQ0FBRUE7O1FBR3RDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxzREFBc0RBLENBQUNBLEVBQUVBLDZDQUE2Q0E7O1FBRWxIQSxDQUFDQSxHQUFHQSxJQUFJQSxRQUFRQSxDQUFJQTtZQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUN4QkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUE7WUFDYkEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBRUEsQ0FBRUE7O1FBRTFCQSxDQUFDQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFFQSxFQUFFQSxFQUFHQSxFQUFFQSxFQUFHQSxFQUFFQSxFQUFHQSxFQUFFQSxFQUFHQSxFQUFF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QUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFFQSxDQUFFQTs7UUFFdEJBLE9BQU9BLENBQUNBLEdBQUdBLENBQUVBLGNBQWNBLEVBQUdBLENBQUNBLENBQUNBLFdBQVdBLENBQUVBOztRQUU3Q0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsNkNBQTZDQSxDQUFDQSxFQUFFQSxvQkFBb0JBOztRQUVoRkEsQ0FBQ0EsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBRUE7WUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDeEJBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUVBLENBQUVBOztRQUV0QkEsSUFBSUEsQ0FBQ0E7O1FBRUxBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQ2RBLE9BQU9BLENBQUNBLEdBQUdBLENBQUVBLFNBQVNBLEVBQUdBLENBQUNBLEVBQUdBLENBQUNBLENBQUNBLE9BQU9BLENBQUVBOztRQUV4Q0EsQ0FBQ0EsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBSUE7WUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDeEJBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBO1lBQ2JBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUVBLENBQUVBOztRQUUxQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFDZEEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBRUEsU0FBU0EsRUFBR0EsQ0FBQ0EsRUFBR0Es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QUFFQSxFQUFFQSxFQUFFQTtZQUNiQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFFQSxDQUFFQTs7UUFFMUJBLE1BQU1BLEdBQUdBLElBQUlBLEtBQUtBLENBQVdBLENBQUNBO1FBQzlCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFHQSxJQUFJQSxRQUFRQSxDQUFFQSxDQUFDQSxFQUFHQSxDQUFDQSxFQUFHQSxDQUFDQSxDQUFFQSxDQUFFQTtRQUN6Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBR0EsSUFBSUEsUUFBUUEsQ0FBRUEsQ0FBQ0EsRUFBR0EsQ0FBQ0EsRUFBR0EsQ0FBQ0EsQ0FBRUEsQ0FBRUE7UUFDekNBLE1BQU1BLENBQUNBLElBQUlBLENBQUdBLElBQUlBLFFBQVFBLENBQUVBLENBQUNBLEVBQUdBLENBQUNBLEVBQUdBLENBQUNBLENBQUVBLENBQUVBOztRQUV6Q0EsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBRUEsTUFBTUEsQ0FBRUE7O1FBRXJCQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFFQSxZQUFZQSxFQUFHQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFFQTs7UUFHdkNBLE1BQU1BLEdBQUdBLElBQUlBLEtBQUtBLENBQVdBLENBQUNBO1FBQzlCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFHQSxJQUFJQSxRQUFRQSxDQUFFQSxDQUFDQSxFQUFHQSxDQUFDQSxFQUFHQSxDQUFDQSxDQUFFQSxDQUFFQTtRQUN6Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBR0EsSUFBSUEsUUFBUUEsQ0FBRUEsQ0FBQ0EsRUFBR0EsQ0FBQ0EsRUFBR0EsQ0FBQ0EsQ0FBRUEsQ0FBRUE7UUFDekNBLE1BQU1BLENBQUNBLElBQUlBLENBQUdBLElBQUlBLFFBQVFBLENBQUVBLENBQUNBLEVBQUdBLENBQUNBLEVBQUdBLENBQUNBLENBQUVBLENBQUVBOztRQUV6Q0EsSUFBSUEsQ0FBQ0EsR0FBYUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBRUEsTUFBTUEsQ0FBRUE7O1FBRXZDQSxPQUFPQSxD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QUdBLEdBQUdBLENBQUVBO2dCQUMxR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBRUEsQ0FBQ0EsR0FBR0EsRUFBR0EsR0FBR0EsQ0FBRUEsRUFBRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBRUEsQ0FBQ0EsR0FBR0EsRUFBR0EsR0FBR0EsQ0FBRUEsRUFBRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBRUEsQ0FBQ0EsR0FBR0EsRUFBR0EsR0FBR0EsQ0FBRUEsRUFBRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBRUEsQ0FBQ0EsR0FBR0EsRUFBR0EsR0FBR0EsQ0FBRUE7Z0JBQzFHQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFFQSxDQUFDQSxHQUFHQSxFQUFHQSxHQUFHQSxDQUFFQSxFQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFFQSxDQUFDQSxHQUFHQSxFQUFHQSxHQUFHQSxDQUFFQSxFQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFFQSxDQUFDQSxHQUFHQSxFQUFHQSxHQUFHQSxDQUFFQSxFQUFFQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFFQSxDQUFDQSxHQUFHQSxFQUFHQSxHQUFHQSxDQUFFQSxDQUFFQSxDQUFFQTs7WUFHdEhBLENBQUNBLENBQUNBLGFBQWFBLENBQUVBLENBQUNBLENBQUVBOztZQUVwQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFDakJBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLENBQUNBLENBQUNBLE9BQU9BLEVBQUdBLENBQUNBLEVBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1NBR3REQTs7UUFFREEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Esb0VBQW9FQSxDQUFDQTtRQUNqRkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBRUEsMElBQTBJQSxDQUFFQTtRQUN6SkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FB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SUFBSUEsS0FBS0EsQ0FBV0EsRUFBRUEsQ0FBRUE7O1FBRWhEQSxDQUFDQSxHQUFHQSxJQUFJQSxRQUFRQSxDQUFFQTtZQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUN4QkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBRUE7UUFDdEJBLENBQUNBLENBQUNBLGFBQWFBLENBQUVBLENBQUNBLENBQUVBO1FBQ3BCQSxDQUFDQSxDQUFDQSxRQUFRQSxHQUFHQSxDQUFDQTtRQUNkQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxRQUFRQTtRQUNoQkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBR0EsQ0FBQ0EsRUFBSUEsQ0FBQ0EsQ0FBR0E7O1FBRXpDQSxDQUFDQSxHQUFHQSxJQUFJQSxRQUFRQSxDQUFFQTtZQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUN4QkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBRUE7UUFDckJBLENBQUNBLENBQUNBLGFBQWFBLENBQUVBLENBQUNBLENBQUVBO1FBQ3BCQSxDQUFDQSxDQUFDQSxRQUFRQSxHQUFHQSxDQUFDQTtRQUNkQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxRQUFRQTtRQUNoQkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBR0EsQ0FBQ0EsRUFBSUEsQ0FBQ0EsQ0FBR0E7O1FBRXpDQSxDQUFDQSxHQUFJQSxJQUFJQSxRQUFRQSxDQUFFQTtZQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUN4QkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBRUE7UUFDckJBLENBQUNBLENBQUNBLGFBQWFBLENBQUVBLENBQUNBLENBQUVBO1FBQ3BCQSxDQUFDQSxDQUFDQSxRQUFRQSxHQUFHQSxDQUFDQTtRQUNkQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxRQUFRQTtRQUNoQkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBR0EsQ0FBQ0EsRUFBSUEsQ0FBQ0EsQ0FBR0E7O1FBRXpDQSxDQUFDQSxHQUFJQSxJQUFJQSxRQUFRQSxDQUFFQTtZQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUN4QkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBRUE7UUFDckJBLENBQUNBLENBQUNBLGFBQWFBLENBQUVBLENBQUNBLENBQUVBO1FBQ3BCQSxDQUFDQSxDQUFDQSxRQUFRQSxHQUFHQSxDQUFDQTtRQUNkQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxRQUFRQTtRQUNoQkEsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBR0EsQ0FBQ0EsRUFBSUEsQ0FBQ0EsQ0FBR0E7O1FBRXpDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxvRUFBb0VBLENBQUNBO1FBQ2pGQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFFQSx1R0FBdUdBLENBQUVBO1FBQ3RIQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUNoQkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Esa0RBQWtEQSxDQUFDQTtRQUMvREEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EscUJBQXFCQSxDQUFDQTtRQUNsQ0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Esb0NBQW9DQSxDQUFDQTtRQUNqREEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EscUNBQXFDQSxDQUFDQTtRQUNsREEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Esd0NBQXdDQSxDQUFDQTtRQUNyREEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsMEJBQTBCQSxDQUFDQTtRQUN2Q0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0E7SUFDakJBLENBQUNBOztJQUVEUCwwQ0FBQUEsVUFBc0JBLE1BQWlCQSxFQUFHQSxRQUFtQkEsRUFBR0EsU0FBb0JBO1FBRW5GUSxJQUFJQSxDQUFDQSxHQUFZQSxnQkFBZ0JBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLEdBQUdBLEtBQUtBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBO1FBQ2xHQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFFQSw4QkFBOEJBLEdBQUdBLE1BQU1BLEdBQUdBLG1CQUFtQkEsR0FBR0EsUUFBUUEsR0FBR0EsTUFBTUEsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBRUE7SUFDNUdBLENBQUNBOztJQUdEUiwyQ0FBQUE7UUFFQ1MsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBRUEsd0VBQXdFQSxDQUFDQTtRQUN0RkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBRUEsaUJBQWlCQSxDQUFDQTtRQUMvQkEsSUFBSUEsQ0FBQ0EsR0FBY0EsSUFBSUEsUUFBUUEsQ0FBRUEsQ0FBQ0EsRUFBR0EsQ0FBQ0EsRUFBR0EsQ0FBQ0EsQ0FBRUE7UUFDNUNBLElBQUlBLENBQUNBLEdBQWNBLElBQUlBLFFBQVFBLENBQUVBLENBQUNBLEVBQUdBLENBQUNBLEVBQUdBLENBQUNBLENBQUVBOztRQUU1Q0EsSUFBSUEsQ0FBQ0E7UUFDTEEsSUFBSUEsQ0FBQ0E7UUFDTEEsSUFBSUEsQ0FBQ0EsR0FBbUJBLElBQUlBLEtBQUtBLENBQVdBLEVBQUVBLENBQUVBOztRQUVoREEsQ0FBQ0EsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBRUE7WUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDL0JBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUVBLENBQUVBO1FBQ2ZBLENBQUNBLENBQUNBLGFBQWFBLENBQUVBLENBQUNBLENBQUVBO1FBQ3BCQSxDQUFDQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFFQTs7UUFFL0JBLElBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBR0EsQ0FBQ0EsRUFBSUEsQ0FBQ0EsQ0FBR0E7O1FBRTVDQSxDQUFDQSxHQUFHQSxJQUFJQSxRQUFRQSxDQUFFQTtZQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUMvQkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsRUFBRUEsQ0FBQ0Es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LENBQUNBLEVBQUlBLENBQUNBLENBQUdBOztRQUVsREEsQ0FBQ0EsR0FBR0EsSUFBSUEsUUFBUUEsQ0FBRUE7WUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDL0JBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUVBOztRQUVkQSxDQUFDQSxDQUFDQSxhQUFhQSxDQUFFQSxDQUFDQSxDQUFFQTtRQUNwQkEsQ0FBQ0EsQ0FBQ0EsaUJBQWlCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFFQTtRQUNyQ0EsSUFBSUEsQ0FBQ0EsdUJBQXVCQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFHQSxDQUFDQSxFQUFHQSxDQUFDQSxDQUFFQTs7UUFFaERBLENBQUNBLEdBQUlBLElBQUlBLFFBQVFBLENBQUVBO1lBQUdBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQy9CQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNWQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNWQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFFQTs7UUFFZEEsQ0FBQ0EsQ0FBQ0EsYUFBYUEsQ0FBRUEsQ0FBQ0EsQ0FBRUE7UUFDcEJBLENBQUNBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBRUE7UUFDckNBLElBQUlB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QUNWQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFFQTs7UUFFZEEsQ0FBQ0EsQ0FBQ0EsYUFBYUEsQ0FBRUEsQ0FBQ0EsQ0FBRUE7UUFDcEJBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1FBQ2RBLElBQUlBLENBQUNBLFlBQVlBLENBQUVBLENBQUNBLEVBQUdBLENBQUNBLENBQUNBLE9BQU9BLEVBQUdBLENBQUNBLENBQUVBOztRQUV0Q0EsQ0FBQ0EsR0FBSUEsSUFBSUEsUUFBUUEsQ0FBRUE7WUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDaENBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ1ZBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUVBOztRQUVkQSxDQUFDQSxDQUFDQSxhQUFhQSxDQUFFQSxDQUFDQSxDQUFFQTtRQUNwQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7UUFDZEEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBRUEsQ0FBQ0EsRUFBR0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsRUFBR0EsQ0FBQ0EsQ0FBRUE7SUFDdkNBLENBQUNBOztJQUVEZCx5Q0FBQUE7UUFFQ2UsSUFBSUEsQ0FBQ0EsR0FBY0EsSUFBSUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7UUFDakNBLElBQUlBLENBQUNBO1FBQ0xBLElBQUlBLENBQUNBO1FBQ0xBLElBQUlBLENBQUNBLEdBQW1CQSxJQUFJQSxLQUFLQSxDQUFXQSxFQUFFQSxDQUFFQTs7UUFFaERBLENBQUNBLEdBQUlBLElBQUlBLFFBQVFBLENBQUVBO1lBQUVBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBO1lBQzNCQSxDQUFDQSxFQUFDQSxDQUFDQSxFQUFDQSxDQUFDQSxFQUFDQSxDQUFDQTtZQUNQQSxDQUFDQSxFQUFDQSxDQUFDQSxFQUFDQSxDQUFDQSxFQUFDQSxDQUFDQTtZQUNQQSxDQUFDQSxFQUFDQSxDQUFDQSxFQUFDQSxDQUFDQSxFQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTs7UUFFVkEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFBR0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBR0EsQ0FBQ0EsQ0FBRUE7UUFDdENBLENBQUNBLENBQUNBLFNBQVNBLENBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1FBQUdBLE9BQU9BLENBQUNBLEdBQUdBLENBQUdBLENBQUNBLENBQUVBO1FBQ3RDQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUFHQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFHQSxDQUFDQSxDQUFFQTtRQUN0Q0EsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFBR0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBR0EsQ0FBQ0EsQ0FBRUE7SUFDdkNBLENBQUNBOztJQUVEZiw0Q0FBQUE7UUFFQ2dCLElBQUlBLENBQUNBLEdBQWNBLElBQUlBLFFBQVFBLENBQUNBLENBQUNBO1FBQ2pDQSxJQUFJQSxDQUFDQTtRQUNMQSxJQUFJQSxDQUFDQTtRQUNMQSxJQUFJQSxDQUFDQSxHQUFtQkEsSUFBSUEsS0FBS0EsQ0FBV0EsRUFBRUEsQ0FBRUE7O1FBRWhEQSxDQUFDQSxHQUFJQSxJQUFJQSxRQUFRQSxDQUFFQTtZQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNoQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDVkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBRUE7O1FBR2RBLENBQUNBLEdBQUlBLElBQUlBLFFBQVFBLENBQUVBO1lBQUVBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBLEVBQUNBLENBQUNBO1lBQzNCQSxDQUFDQSxFQUFDQSxDQUFDQSxFQUFDQSxDQUFDQSxFQUFDQSxDQUFDQTtZQUNQQSxDQUFDQSxFQUFDQSxFQUFFQSxFQUFDQSxDQUFDQSxFQUFDQSxFQUFFQTtZQUNUQSxFQUFFQSxFQUFDQSxFQUFFQSxFQUFDQSxFQUFFQSxFQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTs7UUFFZEEsQ0FBQ0EsQ0FBQ0EsWUFBWUEsQ0FBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFBR0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBRUE7UUFDbkRBLENBQUNBLENBQUNBLFlBQVlBLENBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1FBQUdBLE9BQU9BLENBQUNBLEdBQUdBLENBQUdBLENBQUNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUVBO1FBQ3BEQSxDQUFDQSxDQUFDQSxZQUFZQSxDQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtRQUFHQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFHQSxDQUFDQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFFQTtRQUNwREEsQ0FBQ0EsQ0FBQ0EsWUFBWUEsQ0FBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFBR0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBR0EsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBRUE7O1FBRXBEQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQTtRQUN6QkEsQ0FBQ0Es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QUFDQTtBQUFEQSxDQUFDQSxJQUFBO0FBQUEiLCJmaWxlIjoiZ2VvbS9WZXh0TWF0M0RUZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9iYmF0ZW1hbi9XZWJzdG9ybVByb2plY3RzL2F3YXlqcy1jb3JlLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXRyaXgzRFx0XHRcdFx0XHQ9IHJlcXVpcmUoXCJhd2F5anMtY29yZS9saWIvY29yZS9nZW9tL01hdHJpeDNEXCIpO1xuaW1wb3J0IFZlY3RvcjNEXHRcdFx0XHRcdD0gcmVxdWlyZShcImF3YXlqcy1jb3JlL2xpYi9jb3JlL2dlb20vVmVjdG9yM0RcIik7XG5cbmNsYXNzIFZleHRNYXQzRFRlc3RzXG57XG5cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0dmFyIG06TWF0cml4M0QgPSBuZXcgTWF0cml4M0QoICAgIFsgMSwgMiwgMywgNCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0NSwgNiwgNywgOCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0OSwgMTAsIDExLCAxMixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0MTMsIDE0LCAxNSwgMTYgXSApO1xuXG5cdFx0dmFyIHYgOiBWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXG5cdFx0Y29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBjb3B5Q29sdW1uVG8nKTsvLyBET05FIE9LXG5cblx0XHRtLmNvcHlDb2x1bW5UbyggMCAsIHYgKTtjb25zb2xlLmxvZygnY29weUNvbHVtblRvIDAgJyAsIHYgKTtcblx0XHRtLmNvcHlDb2x1bW5UbyggMSAsIHYgKTtjb25zb2xlLmxvZygnY29weUNvbHVtblRvIDEgJyAsIHYgKTtcblx0XHRtLmNvcHlDb2x1bW5UbyggMiAsIHYgKTtjb25zb2xlLmxvZygnY29weUNvbHVtblRvIDIgJyAsIHYgKTtcblx0XHRtLmNvcHlDb2x1bW5UbyggMyAsIHYgKTtjb25zb2xlLmxvZygnY29weUNvbHVtblRvIDMgJyAsIHYgKTtcblxuXHRcdGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gY29weVJvd1RvJyk7Ly8gRE9ORSBPS1xuXG5cdFx0dmFyIHIgOiBWZWN0b3IzRCA9IG5ldyBWZWN0b3IzRCgpO1xuXG5cdFx0bS5jb3B5Um93VG8oIDAgLCByICk7Y29uc29sZS5sb2coJ2NvcHlSb3dUbyAwICcgLCByICk7XG5cdFx0bS5jb3B5Um93VG8oIDEgLCByICk7Y29uc29sZS5sb2coJ2NvcHlSb3dUbyAxICcgLCByICk7XG5cdFx0bS5jb3B5Um93VG8oIDIgLCByICk7Y29uc29sZS5sb2coJ2NvcHlSb3dUbyAyICcgLCByICk7XG5cdFx0bS5jb3B5Um93VG8oIDMgLCByICk7Y29uc29sZS5sb2coJ2NvcHlSb3dUbyAzICcgLCByICk7XG5cblx0XHRjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGNvcHlSb3dGcm9tJyk7IC8vIERPTkUgT0tcblxuXHRcdG0gPSBuZXcgTWF0cml4M0QoWyAwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSk7XG5cblx0XHRtLmNvcHlSb3dGcm9tKCAwICwgbmV3IFZlY3RvcjNEKCAxNiAsIDE1ICwgMTQgLCAxMykgKTsgY29uc29sZS5sb2coJ2NvcHlSb3dGcm9tIDAgJyAsIG0ucmF3RGF0YSApO1xuXHRcdG0uY29weVJvd0Zyb20oIDEgLCBuZXcgVmVjdG9yM0QoIDEyICwgMTEgLCAxMCAsICA5KSApOyBjb25zb2xlLmxvZygnY29weVJvd0Zyb20gMSAnICwgbS5yYXdEYXRhICk7XG5cdFx0bS5jb3B5Um93RnJvbSggMiAsIG5ldyBWZWN0b3IzRCggIDggLCAgNyAsICA2ICwgIDUpICk7IGNvbnNvbGUubG9nKCdjb3B5Um93RnJvbSAyICcgLCBtLnJhd0RhdGEgKTtcblx0XHRtLmNvcHlSb3dGcm9tKCAzICwgbmV3IFZlY3RvcjNEKCAgNCAsICAzICwgIDIgLCAgMSkgKTsgY29uc29sZS5sb2coJ2NvcHlSb3dGcm9tIDMgJyAsIG0ucmF3RGF0YSApO1xuXG5cdFx0Y29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBjb3B5Q29sdW1uRnJvbScpOyAvLyBET05FIE9LXG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKFsgMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0pO1xuXG5cdFx0bS5jb3B5Q29sdW1uRnJvbSggMCAsIG5ldyBWZWN0b3IzRCggMTYgLCAxNSAsIDE0ICwgMTMpICk7IGNvbnNvbGUubG9nKCdjb3B5Q29sdW1uRnJvbSAwICcgLCBtLnJhd0RhdGEgKTtcblx0XHRtLmNvcHlDb2x1bW5Gcm9tKCAxICwgbmV3IFZlY3RvcjNEKCAxMiAsIDExICwgMTAgLCAgOSkgKTsgY29uc29sZS5sb2coJ2NvcHlDb2x1bW5Gcm9tIDEgJyAsIG0ucmF3RGF0YSApO1xuXHRcdG0uY29weUNvbHVtbkZyb20oIDIgLCBuZXcgVmVjdG9yM0QoICA4ICwgIDcgLCAgNiAsICA1KSApOyBjb25zb2xlLmxvZygnY29weUNvbHVtbkZyb20gMiAnICwgbS5yYXdEYXRhICk7XG5cdFx0bS5jb3B5Q29sdW1uRnJvbSggMyAsIG5ldyBWZWN0b3IzRCggIDQgLCAgMyAsICAyICwgIDEpICk7IGNvbnNvbGUubG9nKCdjb3B5Q29sdW1uRnJvbSAzICcgLCBtLnJhd0RhdGEgKTtcblxuXHRcdGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQXBwZW5kJyk7IC8vIERPTkUgT0tcblxuXHRcdG0gPSBuZXcgTWF0cml4M0QoIFsgMSwgMiwgMywgNCxcblx0XHRcdFx0XHRcdFx0XHRcdCAgNSwgNiwgNywgOCxcblx0XHRcdFx0XHRcdFx0XHRcdCAgOSwgMTAsIDExLCAxMixcblx0XHRcdFx0XHRcdFx0XHRcdCAgMTMsIDE0LCAxNSwgMTYgXSApO1xuXG5cdFx0dmFyIHMgOiBNYXRyaXgzRCA9IG5ldyBNYXRyaXgzRCggWyAgICAxNiAsIDE1ICwgMTQgLCAxMyAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCAgMTIgLCAxMSAsIDEwICwgIDkgLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQgICA4ICwgIDcgLCAgNiAsICA1ICxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICAgNCAsICAzICwgIDIgLCAgMSBdICk7XG5cblx0XHRtLmFwcGVuZCggcyApO1xuXG5cdFx0Y29uc29sZS5sb2coJ0FwcGVuZCBSZXN1bHQnICwgbS5yYXdEYXRhICk7XG5cdFx0Y29uc29sZS5sb2coJ0FwcGVuZGVlJyAsICAgICAgcy5yYXdEYXRhICk7XG5cblxuXHRcdGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUHJlcGVuZCcpOyAvLyBET05FIE9LXG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKCBbICAgMSwgMiwgMywgNCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0NSwgNiwgNywgOCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0OSwgMTAsIDExLCAxMixcblx0XHRcdFx0XHRcdFx0XHRcdFx0MTMsIDE0LCAxNSwgMTYgXSApO1xuXG5cdFx0cyA9IG5ldyBNYXRyaXgzRCggWyAgICAxNiAsIDE1ICwgMTQgLCAxMyAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAxMiAsIDExICwgMTAgLCAgOSAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCA4ICwgIDcgLCAgNiAsICA1ICxcblx0XHRcdFx0XHRcdFx0XHRcdFx0IDQgLCAgMyAsICAyICwgIDEgXSApO1xuXG5cdFx0bS5wcmVwZW5kKCBzICk7XG5cblx0XHRjb25zb2xlLmxvZygnUHJlcGVuZCBSZXN1bHQnICwgbS5yYXdEYXRhICk7XG5cdFx0Y29uc29sZS5sb2coJ1ByZXBlbmRlZScgLCAgICAgIHMucmF3RGF0YSApO1xuXG5cblx0XHRjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEFwcGVuZCBUcmFuc2xhdGlvbicpOyAvLyBET05FIE9LXG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKCBbIDEsIDIsIDMsIDQsXG5cdFx0XHQ1LCA2LCA3LCA4LFxuXHRcdFx0OSwgMTAsIDExLCAxMixcblx0XHRcdDEzLCAxNCwgMTUsIDE2IF0gKTtcblxuXHRcdG0uYXBwZW5kVHJhbnNsYXRpb24oIDUgLCA2ICwgNyApO1xuXHRcdGNvbnNvbGUubG9nKCcgQXBwZW5kIFRyYW5zbGF0aW9uJyAsIG0ucmF3RGF0YSApO1xuXG5cblx0XHRjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGFwcGVuZFJvdGF0aW9uJyk7IC8vIERPTkUgT0sgLSBQaXZvdCBnaXZlcyBkaWZmZXJlbnQgcmVzdWx0ICggY29tbWVudGVkIG91dCBmb3Igbm93IClcblxuXHRcdG0gPSBuZXcgTWF0cml4M0QoICAgWyAxLCAyLCAzLCA0LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ1LCA2LCA3LCA4LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ5LCAxMCwgMTEsIDEyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQxMywgMTQsIDE1LCAxNiBdICk7XG5cblxuXHRcdHZhciBwaXZvdCA6IFZlY3RvcjNEID0gbmV3IFZlY3RvcjNEICggNyAsIDggLDkgICk7XG5cblx0XHR2YXIgYXhpcyA6IFZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCAwICwgMCAsIDEgKTsgLy8gY2hlY2tlZCBmb3IgeCx5LHo7XG5cdFx0bS5hcHBlbmRSb3RhdGlvbiggNDUgLCBheGlzICk7Ly8sIHBpdm90ICk7XG5cdFx0Y29uc29sZS5sb2coICdhcHBlbmRSb3RhdGlvbicgLCBtLnJhd0RhdGEgKTtcblxuXHRcdGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYXBwZW5kU2NhbGUnKTsgLy8gRE9ORSBPS1xuXG5cdFx0bSA9IG5ldyBNYXRyaXgzRCggICBbIDEsIDIsIDMsIDQsXG5cdFx0XHQ1LCA2LCA3LCA4LFxuXHRcdFx0OSwgMTAsIDExLCAxMixcblx0XHRcdDEzLCAxNCwgMTUsIDE2IF0gKTtcblxuXHRcdG0uYXBwZW5kU2NhbGUoIDYgLCA3ICwgOCApO1xuXHRcdGNvbnNvbGUubG9nKCAnYXBwZW5kU2NhbGUnICwgbS5yYXdEYXRhICk7XG5cblx0XHRjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHByZXBlbnRTY2FsZScpOyAvLyBET05FIE9LXG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKCAgIFsgMSwgMiwgMywgNCxcblx0XHRcdDUsIDYsIDcsIDgsXG5cdFx0XHQ5LCAxMCwgMTEsIDEyLFxuXHRcdFx0MTMsIDE0LCAxNSwgMTYgXSApO1xuXG5cdFx0bS5wcmVwZW5kU2NhbGUoIDYgLCA3ICwgOCApO1xuXHRcdGNvbnNvbGUubG9nKCAncHJlcGVudFNjYWxlJyAsIG0ucmF3RGF0YSApO1xuXG5cblx0XHRjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGNsb25lJyk7IC8vIERPTkUgT0tcblxuXHRcdG0gPSBuZXcgTWF0cml4M0QoICAgWyAxLCAyLCAzLCA0LFxuXHRcdFx0NSwgNiwgNywgOCxcblx0XHRcdDksIDEwLCAxMSwgMTIsXG5cdFx0XHQxMywgMTQsIDE1LCAxNiBdICk7XG5cblxuXHRcdGNvbnNvbGUubG9nKCAnY2xvbmUnICwgbS5jbG9uZSgpLnJhd0RhdGEpO1xuXG5cdFx0Y29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBjb3B5RnJvbScpOyAvLyBET05FIE9LXG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKCAgIFsgMSwgMiwgMywgNCxcblx0XHRcdDUsIDYsIDcsIDgsXG5cdFx0XHQ5LCAxMCwgMTEsIDEyLFxuXHRcdFx0MTMsIDE0LCAxNSwgMTYgXSApO1xuXG5cdFx0dmFyIGNsIDogTWF0cml4M0QgPSBuZXcgTWF0cml4M0QoWyAwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSk7XG5cdFx0Y2wuY29weUZyb20oIG0gKVxuXG5cdFx0Y29uc29sZS5sb2coICdjb3B5RnJvbScgLCBjbC5yYXdEYXRhICk7XG5cblxuXHRcdGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gY29weVJhd0RhdGFGcm9tJyk7IC8vIERPTkUgb2sgLSBPZmZldCAvIFRyYXNwb3NlIG5vdCBpbXBsZW1lbnRlZFxuXG5cdFx0bSA9IG5ldyBNYXRyaXgzRCggICBbIDEsIDIsIDMsIDQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDUsIDYsIDcsIDgsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDksIDEwLCAxMSwgMTIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDEzLCAxNCwgMTUsIDE2IF0gKTtcblxuXHRcdG0uY29weVJhd0RhdGFGcm9tKFsgMTYgLCAxNSAsIDE0ICwgMTMgLCAxMiAsIDExICwgMTAgLCAgOSAsIDggLCAgNyAsICA2ICwgIDUgLCA0ICwgIDMgLCAgMiAsICAxIF0gKTtcblxuXHRcdGNvbnNvbGUubG9nKCAnY29weVJhd0RhdGFGcm9tJyAsIG0ucmF3RGF0YSApO1xuXG5cdFx0Y29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBjb3B5UmF3RGF0YVRvJyk7IC8vIGRvbmUgT0tcblxuXHRcdG0gPSBuZXcgTWF0cml4M0QoICAgWyAxLCAyLCAzLCA0LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ1LCA2LCA3LCA4LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ5LCAxMCwgMTEsIDEyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQxMywgMTQsIDE1LCAxNiBdICk7XG5cblx0XHR2YXIgcmVzdWx0IDogbnVtYmVyW10gPSBuZXcgQXJyYXk8bnVtYmVyPiggOSw5LDksOSw5LDksOSw5LDksOSw5LDksOSw5LDksOSw5LDksOSw5KTtcblxuXHRcdGNvbnNvbGUubG9nKCAncmVzdWx0Lmxlbmd0aDogJyAsIHJlc3VsdC5sZW5ndGggICk7XG5cblx0XHRtLmNvcHlSYXdEYXRhVG8oIHJlc3VsdCAsIDEgLCB0cnVlICk7XG5cdFx0Y29uc29sZS5sb2coICdyYXdEYXRhJyAsIG0ucmF3RGF0YSApO1xuXHRcdGNvbnNvbGUubG9nKCAnY29weVJhd0RhdGFUbycgLHJlc3VsdCApO1xuXG5cdFx0Y29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB0cmFuc3Bvc2UnKTsgLy8gRE9ORSBvayAtIE9mZmV0IC8gVHJhc3Bvc2Ugbm90IGltcGxlbWVudGVkXG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKCAgIFsgMSwgMiwgMywgNCxcblx0XHRcdDUsIDYsIDcsIDgsXG5cdFx0XHQ5LCAxMCwgMTEsIDEyLFxuXHRcdFx0MTMsIDE0LCAxNSwgMTYgXSApO1xuXG5cdFx0bS50cmFuc3Bvc2UoKVxuXHRcdGNvbnNvbGUubG9nKCAndHJhbnNwb3NlJyAsIG0ucmF3RGF0YSApO1xuXG5cblx0XHRjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGNvcHlUb01hdHJpeDNEJyk7IC8vIGRvbmUgb2tcblxuXHRcdG0gPSBuZXcgTWF0cml4M0QoICAgWyAxLCAyLCAzLCA0LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ1LCA2LCA3LCA4LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ5LCAxMCwgMTEsIDEyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQxMywgMTQsIDE1LCAxNiBdICk7XG5cblx0XHRzID0gbmV3IE1hdHJpeDNEKCBbICAgIDE2ICwgMTUgLCAxNCAsIDEzICxcblx0XHRcdDEyICwgMTEgLCAxMCAsICA5ICxcblx0XHRcdDggLCAgNyAsICA2ICwgIDUgLFxuXHRcdFx0NCAsICAzICwgIDIgLCAgMSBdICk7XG5cblx0XHRtLmNvcHlUb01hdHJpeDNEKCBzIClcblx0XHRjb25zb2xlLmxvZyggJ2NvcHlUb01hdHJpeDNEJyAsIG0ucmF3RGF0YSApO1xuXG5cblx0XHRjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRlY29tcG9zZScpOyAvLy8gTk9UIFdPUktJTkdcblxuXHRcdG0gPSBuZXcgTWF0cml4M0QoIFsgMSwgNiwgMCwgMCxcblx0XHRcdFx0XHRcdFx0XHRcdCAgMCwgMSwgMCwgMCxcblx0XHRcdFx0XHRcdFx0XHRcdCAgMCwgMCwgMSwgMCxcblx0XHRcdFx0XHRcdFx0XHRcdCAgMCwgMCwgMCwgMSBdICk7XG5cblx0XHR2YXIgcmVzdWx0RGVjb21wb3NlIDogVmVjdG9yM0RbXSA9IG0uZGVjb21wb3NlKCk7XG5cdFx0Y29uc29sZS5sb2coICdjb3B5VG9NYXRyaXgzRCcgLCByZXN1bHREZWNvbXBvc2VbMF0gKTtcblx0XHRjb25zb2xlLmxvZyggJ2NvcHlUb01hdHJpeDNEJyAsIHJlc3VsdERlY29tcG9zZVsxXSApO1xuXHRcdGNvbnNvbGUubG9nKCAnY29weVRvTWF0cml4M0QnICwgcmVzdWx0RGVjb21wb3NlWzJdICk7XG5cblx0XHRjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRldGVybWluYW50Jyk7IC8vIFdPUktJTkcgb2sgLSBnb29kXG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKCBbICAgMSwgMiwgMCwgNixcblx0XHRcdFx0XHRcdFx0XHRcdFx0MiwgMSwgMCwgMCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0MCwgMCwgMSwgMyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0NiwgMCwgMywgMSBdICk7XG5cblx0XHRjb25zb2xlLmxvZyggJ2RldGVybWluYW50OicgLCBtLmRldGVybWluYW50ICk7XG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKCBbICAgMSwgMiwgNSwgNixcblx0XHRcdFx0XHRcdFx0XHRcdFx0MiwgMSwgMCwgOCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0NSwgMCwgMSwgMyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0NiwgOCwgMywgMSBdICk7XG5cblx0XHRjb25zb2xlLmxvZyggJ2RldGVybWluYW50OicgLCBtLmRldGVybWluYW50ICk7XG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKCBbICAgMSwgMCwgMCwgMCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0MCwgMSwgMCwgMCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0MCwgMCwgMSwgMCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0MCwgMCwgMCwgMSBdICk7XG5cblx0XHRjb25zb2xlLmxvZyggJ2RldGVybWluYW50OicgLCBtLmRldGVybWluYW50ICk7XG5cblx0XHRjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGludmVydCcpOyAvLyBXT1JLSU5HIG9rIC0gZ29vZFxuXG5cdFx0bSA9IG5ldyBNYXRyaXgzRCggWyAgIDEsIDIsIDUsIDYsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDIsIDEsIDAsIDgsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDUsIDAsIDEsIDMsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDYsIDgsIDMsIDEgXSApO1xuXG5cdFx0dmFyIGIgOiBib29sZWFuO1xuXG5cdFx0YiA9IG0uaW52ZXJ0KCk7XG5cdFx0Y29uc29sZS5sb2coICdpbnZlcnQ6JyAsIGIgLCBtLnJhd0RhdGEgKTtcblxuXHRcdG0gPSBuZXcgTWF0cml4M0QoICAgWyAxLCAyLCAzLCA0LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ1LCA2LCA3LCA4LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ5LCAxMCwgMTEsIDEyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQxMywgMTQsIDE1LCAxNiBdICk7XG5cblx0XHRiID0gbS5pbnZlcnQoKTtcblx0XHRjb25zb2xlLmxvZyggJ2ludmVydDonICwgYiAsIG0ucmF3RGF0YSApO1xuXG5cdFx0Y29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQcmVwZW5kIFJvdGF0aW9uJyk7IC8vIE9LIEdvb2RcblxuXHRcdG0gPSBuZXcgTWF0cml4M0QoICAgWyAxLCAyLCAzLCA0LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ1LCA2LCA3LCA4LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ5LCAxMCwgMTEsIDEyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQxMywgMTQsIDE1LCAxNiBdICk7XG5cblx0XHRheGlzID0gbmV3IFZlY3RvcjNEKCAxICwgMCAsMCApO1xuXHRcdG0ucHJlcGVuZFJvdGF0aW9uKCA0NSAsIGF4aXMgKTtcblxuXHRcdGNvbnNvbGUubG9nKCAncHJlcGVuZFJvdGF0aW9uOicgLCBtLnJhd0RhdGEgKTtcblxuXG5cdFx0Y29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBwcmVwZW5kVHJhbnNsYXRpb24nKTsgLy8gT0sgR29vZFxuXG5cdFx0bSA9IG5ldyBNYXRyaXgzRCggICBbIDEsIDIsIDMsIDQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDUsIDYsIDcsIDgsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDksIDEwLCAxMSwgMTIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDEzLCAxNCwgMTUsIDE2IF0gKTtcblxuXHRcdG0ucHJlcGVuZFRyYW5zbGF0aW9uKCA1ICwgMTAgLCAxNSApO1xuXG5cdFx0Y29uc29sZS5sb2coICdwcmVwZW5kVHJhbnNsYXRpb246JyAsIG0ucmF3RGF0YSApO1xuXG5cblx0XHRjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHJlY29tcG9zZScpOyAvLyBPSyBHb29kXG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKCAgIFsgMSwgMiwgMywgNCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0NSwgNiwgNywgOCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0OSwgMTAsIDExLCAxMixcblx0XHRcdFx0XHRcdFx0XHRcdFx0MTMsIDE0LCAxNSwgMTYgXSApO1xuXG5cdFx0dmFyIHJWZWN0cyA6IFZlY3RvcjNEW10gPSBuZXcgQXJyYXk8VmVjdG9yM0Q+KCk7XG5cdFx0clZlY3RzLnB1c2ggKCBuZXcgVmVjdG9yM0QoIDUgLCAxICwgMyApICk7XG5cdFx0clZlY3RzLnB1c2ggKCBuZXcgVmVjdG9yM0QoIDUgLCAwICwgMSApICk7XG5cdFx0clZlY3RzLnB1c2ggKCBuZXcgVmVjdG9yM0QoIDIgLCAxICwgMyApICk7XG5cblx0XHRtLnJlY29tcG9zZSggclZlY3RzIClcblxuXHRcdG0gPSBuZXcgTWF0cml4M0QoICAgWyAxLCAyLCAzLCA0LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ1LCA2LCA3LCA4LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ5LCAxMCwgMTEsIDEyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQxMywgMTQsIDE1LCAxNiBdICk7XG5cblx0XHRyVmVjdHMgPSBuZXcgQXJyYXk8VmVjdG9yM0Q+KCk7XG5cdFx0clZlY3RzLnB1c2ggKCBuZXcgVmVjdG9yM0QoIDEgLCAyICwgOSApICk7XG5cdFx0clZlY3RzLnB1c2ggKCBuZXcgVmVjdG9yM0QoIDMgLCAzICwgMSApICk7XG5cdFx0clZlY3RzLnB1c2ggKCBuZXcgVmVjdG9yM0QoIDggLCAxICwgOCApICk7XG5cblx0XHRtLnJlY29tcG9zZSggclZlY3RzIClcblxuXHRcdGNvbnNvbGUubG9nKCAncmVjb21wb3NlOicgLCBtLnJhd0RhdGEgKTtcblxuXG5cdFx0clZlY3RzID0gbmV3IEFycmF5PFZlY3RvcjNEPigpO1xuXHRcdHJWZWN0cy5wdXNoICggbmV3IFZlY3RvcjNEKCAxICwgMiAsIDkgKSApO1xuXHRcdHJWZWN0cy5wdXNoICggbmV3IFZlY3RvcjNEKCAzICwgMyAsIDEgKSApO1xuXHRcdHJWZWN0cy5wdXNoICggbmV3IFZlY3RvcjNEKCAwICwgMCAsIDAgKSApO1xuXG5cdFx0dmFyIGIgOiBib29sZWFuID0gbS5yZWNvbXBvc2UoIHJWZWN0cyApXG5cblx0XHRjb25zb2xlLmxvZyggJ2ZhaWwgLSByZWNvbXBvc2U6JyAsIG0ucmF3RGF0YSAsIGIgKTtcblxuXHRcdGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gdHJhbnNmb3JtVmVjdG9yICcpOyAvLyBJVCBXT1JLUyAhISFcblxuXHRcdG0gPSBuZXcgTWF0cml4M0QoICAgWyAxLCAyLCAzLCA0LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ1LCA2LCA3LCA4LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ5LCAxMCwgMTEsIDEyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQxMywgMTQsIDE1LCAxNiBdICk7XG5cblxuXHRcdHZhciB0VlJlc3VsdCA6IFZlY3RvcjNEID0gbS50cmFuc2Zvcm1WZWN0b3IoIG5ldyBWZWN0b3IzRCggMSwyLDMgKSk7XG5cblx0XHRjb25zb2xlLmxvZyggdFZSZXN1bHQgKVxuXG5cblx0XHRjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHRyYW5zZm9ybVZlY3RvciAnKTsgLy8gSVQgV09SS1MgISEhXG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKCAgIFsgMSwgMiwgMywgNCxcblx0XHRcdDUsIDYsIDcsIDgsXG5cdFx0XHQ5LCAxMCwgMTEsIDEyLFxuXHRcdFx0MTMsIDE0LCAxNSwgMTYgXSApO1xuXG5cdFx0dmFyIHZvdXQgICAgOiBudW1iZXJbXSA9IG5ldyBBcnJheTxudW1iZXI+KDAgLCAxICwgMiAsIDMgLCA0ICwgNSApO1xuXHRcdHZhciB2aW4gICAgIDogbnVtYmVyW10gPSBuZXcgQXJyYXk8bnVtYmVyPig0LDUsNik7XG5cdFx0bS50cmFuc2Zvcm1WZWN0b3JzKCB2aW4gLCB2b3V0ICk7XG5cdFx0Y29uc29sZS5sb2coICd0cmFuc2Zvcm1WZWN0b3InICwgdm91dCAsIHZpbiApXG5cblxuXHRcdGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gdHJhbnNwb3NlJyk7IC8vIElUIFdPUktTICEhIVxuXG5cdFx0bSA9IG5ldyBNYXRyaXgzRCggICBbIDEsIDIsIDMsIDQsXG5cdFx0XHQ1LCA2LCA3LCA4LFxuXHRcdFx0OSwgMTAsIDExLCAxMixcblx0XHRcdDEzLCAxNCwgMTUsIDE2IF0gKTtcblxuXHRcdG0udHJhbnNwb3NlKCk7XG5cdFx0Y29uc29sZS5sb2coICd0cmFuc3Bvc2UnICwgbS5yYXdEYXRhICk7XG5cblxuXHRcdGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZ2V0QXhpc1JvdGF0aW9uJyk7IC8vIGludGVybmFsIGNsYXNzXG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKCAgIFsgMSwgMiwgMywgNCxcblx0XHRcdDUsIDYsIDcsIDgsXG5cdFx0XHQ5LCAxMCwgMTEsIDEyLFxuXHRcdFx0MTMsIDE0LCAxNSwgMTYgXSApO1xuXG5cdFx0Ly9tLmdldEF4aXNSb3RhdGlvbig0ICwgNSAsIDYgLCA5MCApO1xuXHRcdC8vY29uc29sZS5sb2coICdnZXRBeGlzUm90YXRpb24nICwgbS5yYXdEYXRhICk7XG5cblx0XHRjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHBvc2l0aW9uJyk7IC8vIGludGVybmFsIGNsYXNzXG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKCAgIFsgMSwgMiwgMywgNCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0NSwgNiwgNywgOCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0OSwgMTAsIDExLCAxMixcblx0XHRcdFx0XHRcdFx0XHRcdFx0MTMsIDE0LCAxNSwgMTYgXSApO1xuXHRcdFxuXHRcdHZhciBwb3NWZWN0IDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoIDUgLCAxMCAsIDE1ICk7XG5cblx0XHRtLnBvc2l0aW9uID0gcG9zVmVjdDtcblxuXHRcdGNvbnNvbGUubG9nKCAnc2V0IHBvc2l0aW9uJyAsIG0ucmF3RGF0YSApO1xuXHRcdGNvbnNvbGUubG9nKCAnZ2V0IHBvc2l0aW9uJyAsIG0ucG9zaXRpb24gKTtcblx0fVxuXG5cdHB1YmxpYyB0ZXN0YXBwZW5kKCkgOiB2b2lkXG5cdHtcblx0XHR2YXIgdiA6IFZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCAwICwgMSAsIDEgKVxuXHRcdHZhciB2MSA6IFZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCAxICwgMCAsIDEgKVxuXHRcdHZhciB2MiA6IFZlY3RvcjNEID0gbmV3IFZlY3RvcjNEKCA3ICwgOCAsIDAgKVxuXG5cdFx0dmFyIHQgOiBNYXRyaXgzRD0gbmV3IE1hdHJpeDNEKCBbICAgMCwgMTAsIDEwLCAxLFxuXHRcdFx0MTAsIDUsIDEwLCAxMCxcblx0XHRcdDEwLCAxMCwgNSwgMTAsXG5cdFx0XHQxLCAxMCwgMTAsIDAgXSApO1xuXG5cdFx0dmFyIGQgOiBNYXRyaXgzRD0gbmV3IE1hdHJpeDNEKCBbICAgMSwgNTAsIDEsIDgsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDIsIDUsIDEyLCA5LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQzMCwgMTYsIDM1LCAxMCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0NCwgMTgsIDQwLCAxMSBdICk7XG5cdFx0dC5hcHBlbmQoIGQgIClcblxuXHRcdGNvbnNvbGUubG9nKCB0LnJhd0RhdGEgKTtcblx0fVxuXG5cblx0cHVibGljIHRlc3RwcmVwZW5kUm90YXRpb24oKSA6IHZvaWRcblx0e1xuXHRcdHZhciB2IDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoIDAgLCAxICwgMSApXG5cdFx0dmFyIHYxIDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoIDEgLCAwICwgMSApXG5cdFx0dmFyIHYyIDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoIDcgLCA4ICwgMCApXG5cblx0XHR2YXIgdCA6IE1hdHJpeDNEPSBuZXcgTWF0cml4M0QoIFsgICAwLCAxMCwgMTAsIDEsXG5cdFx0XHQxMCwgNSwgMTAsIDEwLFxuXHRcdFx0MTAsIDEwLCA1LCAxMCxcblx0XHRcdDEsIDEwLCAxMCwgMCBdICk7XG5cblx0XHR2YXIgZCA6IE1hdHJpeDNEPSBuZXcgTWF0cml4M0QoICk7XG5cdFx0dC5wcmVwZW5kUm90YXRpb24oIDkwICwgdiApLy8sIHYxICApXG5cblx0XHRjb25zb2xlLmxvZyggdC5yYXdEYXRhICk7XG5cdH1cblxuXG5cdHB1YmxpYyB0ZXN0Y29weVRvTWF0cml4M0QoKSA6IHZvaWRcblx0e1xuXHRcdHZhciB2IDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoIDAgLCAyICwgMyApXG5cdFx0dmFyIHYxIDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoIDQgLCAwICwgNiApXG5cdFx0dmFyIHYyIDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoIDcgLCA4ICwgMCApXG5cblx0XHR2YXIgdCA6IE1hdHJpeDNEPSBuZXcgTWF0cml4M0QoIFsgICAwLCAxMCwgMTAsIDEsXG5cdFx0XHQxMCwgNSwgMTAsIDEwLFxuXHRcdFx0MTAsIDEwLCA1LCAxMCxcblx0XHRcdDEsIDEwLCAxMCwgMCBdICk7XG5cblx0XHR2YXIgZCA6IE1hdHJpeDNEPSBuZXcgTWF0cml4M0QoICk7XG5cdFx0Ly90LmNvcHlUb01hdHJpeDNEKCBkICkgO1xuXG5cdFx0Y29uc29sZS5sb2coIGQucmF3RGF0YSApO1xuXHR9XG5cblx0cHVibGljIHRlc3REZWNvbXBvc2UoKSA6IHZvaWRcblx0e1xuXHRcdGNvbnNvbGUubG9nKCAnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xuXHRcdGNvbnNvbGUubG9nKCAndGVzdERlY29tcG9zZScpO1xuXHRcdHZhciB2IDogVmVjdG9yM0RbXSA7XG5cdFx0dmFyIG06IE1hdHJpeDNEO1xuXHRcdHZhciByIDogQXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheTxudW1iZXI+ICggMTYgKSA7XG5cblx0XHRmb3IgKCB2YXIgYyA6IG51bWJlciA9IDAgOyBjIDwgMTAgOyBjICsrIClcblx0XHR7XG5cblxuXHRcdFx0bSA9IG5ldyBNYXRyaXgzRCggWyAgIHRoaXMuZ2V0Um5kKCAtMTAwICwgMTAwICksIHRoaXMuZ2V0Um5kKCAtMTAwICwgMTAwICksIHRoaXMuZ2V0Um5kKCAtMTAwICwgMTAwICksIHRoaXMuZ2V0Um5kKCAtMTAwICwgMTAwICksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5nZXRSbmQoIC0xMDAgLCAxMDAgKSwgdGhpcy5nZXRSbmQoIC0xMDAgLCAxMDAgKSwgdGhpcy5nZXRSbmQoIC0xMDAgLCAxMDAgKSwgdGhpcy5nZXRSbmQoIC0xMDAgLCAxMDAgKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmdldFJuZCggLTEwMCAsIDEwMCApLCB0aGlzLmdldFJuZCggLTEwMCAsIDEwMCApLCB0aGlzLmdldFJuZCggLTEwMCAsIDEwMCApLCB0aGlzLmdldFJuZCggLTEwMCAsIDEwMCApLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZ2V0Um5kKCAtMTAwICwgMTAwICksIHRoaXMuZ2V0Um5kKCAtMTAwICwgMTAwICksIHRoaXMuZ2V0Um5kKCAtMTAwICwgMTAwICksIHRoaXMuZ2V0Um5kKCAtMTAwICwgMTAwICkgXSApO1xuXG5cblx0XHRcdG0uY29weVJhd0RhdGFUbyggciApO1xuXG5cdFx0XHR2ID0gbS5kZWNvbXBvc2UoKTtcblx0XHRcdHRoaXMub3V0cHV0RGVjb21wb3NlKG0ucmF3RGF0YSAsIHIgLCB2WzBdLCB2WzFdLCB2WzJdKTtcblxuXG5cdFx0fVxuXG5cdFx0Y29uc29sZS5sb2coJy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEFTMycpO1xuXHRcdGNvbnNvbGUubG9nKCAncHJpdmF0ZSBmdW5jdGlvbiB0ZXN0RGVjb21wb3NlKCByZXN1bHQgOiBWZWN0b3IuPE51bWJlcj4gLCBvcmlnaW5hbCA6IFZlY3Rvci48TnVtYmVyPiAsIGExIDogVmVjdG9yM0QgLCBhMiA6IFZlY3RvcjNEICAsIGEzIDogVmVjdG9yM0QgKScgKTtcblx0XHRjb25zb2xlLmxvZygneycpO1xuXHRcdGNvbnNvbGUubG9nKCcgICAgdmFyIG0gXHRcdDogTWF0cml4M0QgPSBuZXcgTWF0cml4M0QoIG9yaWdpbmFsICk7Jyk7XG5cdFx0Y29uc29sZS5sb2coJyAgICB2YXIgcmVzdWx0IFx0OiBWZWN0b3IuPFZlY3RvcjNEPiA9IG0uZGVjb21wb3NlKCk7Jyk7XG5cdFx0Y29uc29sZS5sb2coXCIgICB0cmFjZSgnMC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcIik7XG5cdFx0Y29uc29sZS5sb2coXCIgICB0cmFjZSggclswXSlcIik7XG5cdFx0Y29uc29sZS5sb2coXCIgICB0cmFjZSggYTEgKVwiKTtcblx0XHRjb25zb2xlLmxvZyhcIiAgIHRyYWNlKCcxLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcIik7XG5cdFx0Y29uc29sZS5sb2coXCIgICB0cmFjZSggclsxXSlcIik7XG5cdFx0Y29uc29sZS5sb2coXCIgICB0cmFjZSggYTIgKVwiKTtcblx0XHRjb25zb2xlLmxvZyhcIiAgIHRyYWNlKCcyLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcIik7XG5cdFx0Y29uc29sZS5sb2coXCIgICB0cmFjZSggclsyXSlcIik7XG5cdFx0Y29uc29sZS5sb2coXCIgICB0cmFjZSggYTMgKVwiKTtcblx0XHRjb25zb2xlLmxvZyhcIiAgIHRyYWNlKCctLS0tLS0tLS0tLS0tLS0tLS0tLScpO1wiKTtcblx0XHRjb25zb2xlLmxvZyhcIiAgIHRyYWNlKCAnVFNSZXN1bHQ6ICcgLCByZXN1bHQgKTtcIik7XG5cdFx0Y29uc29sZS5sb2coXCIgICB0cmFjZSggJ0FTUmVzdWx0OiAnICwgbS5yYXdEYXRhICk7XCIpO1xuXHRcdGNvbnNvbGUubG9nKFwiICAgdHJhY2UoICdvcmlnaW5hbDogJyAsIG9yaWdpbmFsICk7XCIpO1xuXHRcdGNvbnNvbGUubG9nKFwiICAgdHJhY2UoJy0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XCIpO1xuXHRcdGNvbnNvbGUubG9nKCd9Jyk7XG5cdH1cblxuXHRwdWJsaWMgb3V0cHV0RGVjb21wb3NlKHJlc3VsdCA6IG51bWJlcltdICwgb3JpZ2luYWwgOiBudW1iZXJbXSAsIGExIDogVmVjdG9yM0QgLCBhMiA6IFZlY3RvcjNEICwgYTMgOiBWZWN0b3IzRClcblx0e1xuXHRcdHZhciBzMSA6IHN0cmluZyA9ICduZXcgVmVjdG9yM0QoICcgKyBhMS54ICsgJyAsICcgKyBhMS55ICsgJyAsICcgKyBhMS56ICsgJyApJztcblx0XHR2YXIgczIgOiBzdHJpbmcgPSAnbmV3IFZlY3RvcjNEKCAnICsgYTIueCArICcgLCAnICsgYTIueSArICcgLCAnICsgYTIueiArICcgKSc7XG5cdFx0dmFyIHMzIDogc3RyaW5nID0gJ25ldyBWZWN0b3IzRCggJyArIGEzLnggKyAnICwgJyArIGEzLnkgKyAnICwgJyArIGEzLnogKyAnICknO1xuXHRcdFxuXHRcdGNvbnNvbGUubG9nKCAndGVzdERlY29tcG9zZSggbmV3IDxOdW1iZXI+IFsnICsgcmVzdWx0ICsgJ10sIG5ldyA8TnVtYmVyPiBbJyArIG9yaWdpbmFsICsgJ10gLCAnICsgczEgKyAnICwgJysgczIgKyAnICwgJyArIHMzICsgJyApOycgKSA7XG5cdH1cblxuXHRwdWJsaWMgdGVzdFBvc2l0aW9uKCkgOiB2b2lkXG5cdHtcblx0XHRjb25zb2xlLmxvZyggJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcblx0XHRjb25zb2xlLmxvZyggJ3Rlc3RQb3NpdGlvbicpO1xuXHRcdHZhciB2IDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoIDEgLCAyICwgMyApO1xuXHRcdHZhciBwIDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoIDIgLCAyICwgMiApO1xuXHRcdHZhciBwb3MgOiBWZWN0b3IzRDtcblxuXHRcdHZhciBtOiBNYXRyaXgzRDtcblx0XHR2YXIgaSA6IGJvb2xlYW47XG5cdFx0dmFyIHIgOiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4gKCAxNiApIDtcblxuXHRcdG0gPSBuZXcgTWF0cml4M0QoIFsgICAxLCAyLCA0LCA1LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQyLCAxLCAwLCA4LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ0LCAwLCAxLCA3LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ1LCA4LCA3LCAxIF0gKTtcblx0XHRtLmNvcHlSYXdEYXRhVG8oIHIgKTtcblx0XHRtLnBvc2l0aW9uID0gdjtcblx0XHRwb3MgPSBtLnBvc2l0aW9uO1xuXHRcdHRoaXMub3V0cHV0UG9zaXRpb24obS5yYXdEYXRhICwgciAgLCB2ICApO1xuXG5cdFx0bSA9IG5ldyBNYXRyaXgzRCggWyAgIDEsIDAsIDQsIDUsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDAsIDEsIDgsIDAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDQsIDgsIDEsIDcsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDUsIDAsIDcsIDFdICk7XG5cdFx0bS5jb3B5UmF3RGF0YVRvKCByICk7XG5cdFx0bS5wb3NpdGlvbiA9IHY7XG5cdFx0cG9zID0gbS5wb3NpdGlvbjtcblx0XHR0aGlzLm91dHB1dFBvc2l0aW9uKG0ucmF3RGF0YSAsIHIgICwgdiAgKTtcblxuXHRcdG0gID0gbmV3IE1hdHJpeDNEKCBbICAxLCAwLCA0LCA1LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQwLCAxLCA4LCAwLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ0LCA4LCAxLCAyLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ1LCAwLCAyLCAxXSApO1xuXHRcdG0uY29weVJhd0RhdGFUbyggciApO1xuXHRcdG0ucG9zaXRpb24gPSB2O1xuXHRcdHBvcyA9IG0ucG9zaXRpb247XG5cdFx0dGhpcy5vdXRwdXRQb3NpdGlvbihtLnJhd0RhdGEgLCByICAsIHYgICk7XG5cblx0XHRtICA9IG5ldyBNYXRyaXgzRCggWyAgMSwgMCwgNCwgNSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0MCwgMSwgOCwgMCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0NCwgOCwgMSwgMSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0NSwgMCwgMSwgMV0gKTtcblx0XHRtLmNvcHlSYXdEYXRhVG8oIHIgKTtcblx0XHRtLnBvc2l0aW9uID0gdjtcblx0XHRwb3MgPSBtLnBvc2l0aW9uO1xuXHRcdHRoaXMub3V0cHV0UG9zaXRpb24obS5yYXdEYXRhICwgciAgLCB2ICApO1xuXG5cdFx0Y29uc29sZS5sb2coJy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEFTMycpO1xuXHRcdGNvbnNvbGUubG9nKCAncHJpdmF0ZSBmdW5jdGlvbiB0ZXN0UG9zaXRpb24oIHJlc3VsdCA6IFZlY3Rvci48TnVtYmVyPiAsIG9yaWdpbmFsIDogVmVjdG9yLjxOdW1iZXI+ICwgdCA6IFZlY3RvcjNEICknICk7XG5cdFx0Y29uc29sZS5sb2coJ3snKTtcblx0XHRjb25zb2xlLmxvZygnICAgIHZhciBtIDogTWF0cml4M0QgPSBuZXcgTWF0cml4M0QoIG9yaWdpbmFsICk7Jyk7XG5cdFx0Y29uc29sZS5sb2coJyAgICBtLnBvc2l0aW9uID0gdDsnKTtcblx0XHRjb25zb2xlLmxvZygnICAgIHZhciBwIDogVmVjdG9yM0QgPSBtLnBvc2l0aW9uOycpO1xuXHRcdGNvbnNvbGUubG9nKCcgICAgdHJhY2UoIFwiVFNSZXN1bHQ6IFwiICwgcmVzdWx0ICk7Jyk7XG5cdFx0Y29uc29sZS5sb2coJyAgICB0cmFjZSggXCJBU1Jlc3VsdDogXCIgLCBtLnJhd0RhdGEgKTsnKTtcblx0XHRjb25zb2xlLmxvZygnICAgIHRyYWNlKCBcIlBvczogXCIgLHAgKTsnKTtcblx0XHRjb25zb2xlLmxvZygnfScpO1xuXHR9XG5cdFxuXHRwdWJsaWMgb3V0cHV0UG9zaXRpb24ocmVzdWx0IDogbnVtYmVyW10gLCBvcmlnaW5hbCA6IG51bWJlcltdICwgcG9zUmVzdWx0IDogVmVjdG9yM0QgKVxuXHR7XG5cdFx0dmFyIGEgOiBzdHJpbmcgPSAnbmV3IFZlY3RvcjNEKCAnICsgcG9zUmVzdWx0LnggKyAnICwgJyArIHBvc1Jlc3VsdC55ICsgJyAsICcgKyBwb3NSZXN1bHQueiArICcgKSc7XG5cdFx0Y29uc29sZS5sb2coICd0ZXN0UG9zaXRpb24oIG5ldyA8TnVtYmVyPiBbJyArIHJlc3VsdCArICddLCBuZXcgPE51bWJlcj4gWycgKyBvcmlnaW5hbCArICddICwgJyArIGEgKyAnKTsnICkgO1xuXHR9XG5cblxuXHRwdWJsaWMgdGVzdEFwcGVuZFNjYWxlKCkgOiB2b2lkXG5cdHtcblx0XHRjb25zb2xlLmxvZyggJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcblx0XHRjb25zb2xlLmxvZyggJ3Rlc3RBcHBlbmRTY2FsZScpO1xuXHRcdHZhciB2IDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoIDEgLCAyICwgMyApO1xuXHRcdHZhciBwIDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoIDIgLCAyICwgMiApO1xuXG5cdFx0dmFyIG06IE1hdHJpeDNEO1xuXHRcdHZhciBpIDogYm9vbGVhbjtcblx0XHR2YXIgciA6IEFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPiAoIDE2ICkgO1xuXG5cdFx0bSA9IG5ldyBNYXRyaXgzRCggWyAgIDEsIDIsIDQsIDUsXG5cdFx0XHQyLCAxLCAwLCA4LFxuXHRcdFx0NCwgMCwgMSwgNyxcblx0XHRcdDUsIDgsIDcsIDEgXSApO1xuXHRcdG0uY29weVJhd0RhdGFUbyggciApO1xuXHRcdG0uYXBwZW5kU2NhbGUodi54ICwgdi55ICwgdi56ICkgO1xuXG5cdFx0dGhpcy5vdXRwdXRBcHBlbmRTY2FsZShtLnJhd0RhdGEgLCByICAsIHYgICk7XG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKCBbICAgMSwgMCwgNCwgNSxcblx0XHRcdDAsIDEsIDgsIDAsXG5cdFx0XHQ0LCA4LCAxLCA3LFxuXHRcdFx0NSwgMCwgNywgMV0gKTtcblxuXHRcdG0uY29weVJhd0RhdGFUbyggciApXG5cdFx0bS5hcHBlbmRTY2FsZSh2LnggLCB2LnkgLCB2LnogKSA7XG5cdFx0dGhpcy5vdXRwdXRBcHBlbmRTY2FsZShtLnJhd0RhdGEgLCByICwgdiApO1xuXG5cdFx0bSAgPSBuZXcgTWF0cml4M0QoIFsgIDEsIDAsIDQsIDUsXG5cdFx0XHQwLCAxLCA4LCAwLFxuXHRcdFx0NCwgOCwgMSwgMixcblx0XHRcdDUsIDAsIDIsIDFdICk7XG5cblx0XHRtLmNvcHlSYXdEYXRhVG8oIHIgKVxuXHRcdG0uYXBwZW5kU2NhbGUodi54ICwgdi55ICwgdi56ICkgO1xuXHRcdHRoaXMub3V0cHV0QXBwZW5kU2NhbGUobS5yYXdEYXRhICwgciAsIHYgICk7XG5cblx0XHRtICA9IG5ldyBNYXRyaXgzRCggWyAgMSwgMCwgNCwgNSxcblx0XHRcdDAsIDEsIDgsIDAsXG5cdFx0XHQ0LCA4LCAxLCAxLFxuXHRcdFx0NSwgMCwgMSwgMV0gKTtcblxuXHRcdG0uY29weVJhd0RhdGFUbyggciApXG5cdFx0bS5hcHBlbmRTY2FsZSh2LnggLCB2LnkgLCB2LnogKSA7XG5cdFx0dGhpcy5vdXRwdXRBcHBlbmRTY2FsZShtLnJhd0RhdGEgLCByLCB2ICApO1xuXG5cdFx0Y29uc29sZS5sb2coJy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEFTMycpO1xuXHRcdGNvbnNvbGUubG9nKCAncHJpdmF0ZSBmdW5jdGlvbiB0ZXN0QXBwZW5kU2NhbGUoIHJlc3VsdCA6IFZlY3Rvci48TnVtYmVyPiAsIG9yaWdpbmFsIDogVmVjdG9yLjxOdW1iZXI+ICwgdCA6IFZlY3RvcjNEICknICk7XG5cdFx0Y29uc29sZS5sb2coJ3snKTtcblx0XHRjb25zb2xlLmxvZygnICAgIHZhciBtIDogTWF0cml4M0QgPSBuZXcgTWF0cml4M0QoIG9yaWdpbmFsICk7Jyk7XG5cdFx0Y29uc29sZS5sb2coJyAgICBtLmFwcGVuZFNjYWxlKCB0LnggLCB0LnkgLCB0LnogKTsnKTtcblx0XHRjb25zb2xlLmxvZygnICAgIHRyYWNlKCBcIlRTUmVzdWx0OiBcIiAsIHJlc3VsdCApOycpO1xuXHRcdGNvbnNvbGUubG9nKCcgICAgdHJhY2UoIFwiQVNSZXN1bHQ6IFwiICwgbS5yYXdEYXRhICk7Jyk7XG5cdFx0Y29uc29sZS5sb2coJ30nKTtcblx0fVxuXG5cblx0cHVibGljIG91dHB1dEFwcGVuZFNjYWxlKHJlc3VsdCA6IG51bWJlcltdICwgb3JpZ2luYWwgOiBudW1iZXJbXSAsIHYgOiBWZWN0b3IzRCApXG5cdHtcblx0XHR2YXIgYSA6IHN0cmluZyA9ICduZXcgVmVjdG9yM0QoICcgKyB2LnggKyAnICwgJyArIHYueSArICcgLCAnICsgdi56ICsgJyApJztcblx0XHRjb25zb2xlLmxvZyggJ3Rlc3RBcHBlbmRTY2FsZSggbmV3IDxOdW1iZXI+IFsnICsgcmVzdWx0ICsgJ10sIG5ldyA8TnVtYmVyPiBbJyArIG9yaWdpbmFsICsgJ10gLCAnICsgYSArICcpOycgKSA7XG5cdH1cblxuXHRwdWJsaWMgdGVzdEFwcGVuZFRyYW5zbGF0aW9uKCkgOiB2b2lkXG5cdHtcblx0XHRjb25zb2xlLmxvZyggJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcblx0XHRjb25zb2xlLmxvZyggJ3Rlc3RBcHBlbmRUcmFuc2xhdGlvbicpO1xuXHRcdHZhciB2IDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoIDEgLCAyICwgMyApO1xuXHRcdHZhciBwIDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoIDIgLCAyICwgMiApO1xuXG5cdFx0dmFyIG06IE1hdHJpeDNEO1xuXHRcdHZhciBpIDogYm9vbGVhbjtcblx0XHR2YXIgciA6IEFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPiAoIDE2ICkgO1xuXG5cdFx0bSA9IG5ldyBNYXRyaXgzRCggWyAgIDEsIDIsIDQsIDUsXG5cdFx0XHQyLCAxLCAwLCA4LFxuXHRcdFx0NCwgMCwgMSwgNyxcblx0XHRcdDUsIDgsIDcsIDEgXSApO1xuXHRcdG0uY29weVJhd0RhdGFUbyggciApO1xuXHRcdG0uYXBwZW5kVHJhbnNsYXRpb24odi54ICwgdi55ICwgdi56ICkgO1xuXG5cdFx0dGhpcy5vdXRwdXRBcHBlbmRUcmFuc2xhdGlvbihtLnJhd0RhdGEgLCByICAsIHYgICk7XG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKCBbICAgMSwgMCwgNCwgNSxcblx0XHRcdDAsIDEsIDgsIDAsXG5cdFx0XHQ0LCA4LCAxLCA3LFxuXHRcdFx0NSwgMCwgNywgMV0gKTtcblxuXHRcdG0uY29weVJhd0RhdGFUbyggciApXG5cdFx0bS5hcHBlbmRUcmFuc2xhdGlvbih2LnggLCB2LnkgLCB2LnogKSA7XG5cdFx0dGhpcy5vdXRwdXRBcHBlbmRUcmFuc2xhdGlvbihtLnJhd0RhdGEgLCByICwgdiApO1xuXG5cdFx0bSAgPSBuZXcgTWF0cml4M0QoIFsgIDEsIDAsIDQsIDUsXG5cdFx0XHQwLCAxLCA4LCAwLFxuXHRcdFx0NCwgOCwgMSwgMixcblx0XHRcdDUsIDAsIDIsIDFdICk7XG5cblx0XHRtLmNvcHlSYXdEYXRhVG8oIHIgKVxuXHRcdG0uYXBwZW5kVHJhbnNsYXRpb24odi54ICwgdi55ICwgdi56ICkgO1xuXHRcdHRoaXMub3V0cHV0QXBwZW5kVHJhbnNsYXRpb24obS5yYXdEYXRhICwgciAsIHYgICk7XG5cblx0XHRtICA9IG5ldyBNYXRyaXgzRCggWyAgMSwgMCwgNCwgNSxcblx0XHRcdDAsIDEsIDgsIDAsXG5cdFx0XHQ0LCA4LCAxLCAxLFxuXHRcdFx0NSwgMCwgMSwgMV0gKTtcblxuXHRcdG0uY29weVJhd0RhdGFUbyggciApXG5cdFx0bS5hcHBlbmRUcmFuc2xhdGlvbih2LnggLCB2LnkgLCB2LnogKSA7XG5cdFx0dGhpcy5vdXRwdXRBcHBlbmRUcmFuc2xhdGlvbihtLnJhd0RhdGEgLCByLCB2ICApO1xuXG5cdFx0Y29uc29sZS5sb2coJy8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEFTMycpO1xuXHRcdGNvbnNvbGUubG9nKCAncHJpdmF0ZSBmdW5jdGlvbiB0ZXN0QXBwZW5kVHJhbnNsYXRpb24oIHJlc3VsdCA6IFZlY3Rvci48TnVtYmVyPiAsIG9yaWdpbmFsIDogVmVjdG9yLjxOdW1iZXI+ICwgdCA6IFZlY3RvcjNEICknICk7XG5cdFx0Y29uc29sZS5sb2coJ3snKTtcblx0XHRjb25zb2xlLmxvZygnICAgIHZhciBtIDogTWF0cml4M0QgPSBuZXcgTWF0cml4M0QoIG9yaWdpbmFsICk7Jyk7XG5cdFx0Y29uc29sZS5sb2coJyAgICBtLmFwcGVuZFRyYW5zbGF0aW9uKCB0LnggLCB0LnkgLCB0LnogKTsnKTtcblx0XHRjb25zb2xlLmxvZygnICAgIHRyYWNlKCBcIlRTUmVzdWx0OiBcIiAsIHJlc3VsdCApOycpO1xuXHRcdGNvbnNvbGUubG9nKCcgICAgdHJhY2UoIFwiQVNSZXN1bHQ6IFwiICwgbS5yYXdEYXRhICk7Jyk7XG5cdFx0Y29uc29sZS5sb2coJ30nKTtcblx0fVxuXG5cdHB1YmxpYyBvdXRwdXRBcHBlbmRUcmFuc2xhdGlvbihyZXN1bHQgOiBudW1iZXJbXSAsIG9yaWdpbmFsIDogbnVtYmVyW10gLCB2IDogVmVjdG9yM0QgKVxuXHR7XG5cdFx0dmFyIGEgOiBzdHJpbmcgPSAnbmV3IFZlY3RvcjNEKCAnICsgdi54ICsgJyAsICcgKyB2LnkgKyAnICwgJyArIHYueiArICcgKSc7XG5cdFx0Y29uc29sZS5sb2coICd0ZXN0QXBwZW5kVHJhbnNsYXRpb24oIG5ldyA8TnVtYmVyPiBbJyArIHJlc3VsdCArICddLCBuZXcgPE51bWJlcj4gWycgKyBvcmlnaW5hbCArICddICwgJyArIGEgKyAnKTsnICkgO1xuXHR9XG5cblx0cHVibGljIHRlc3RBcHBlbmRSb3RhdGlvbigpIDogdm9pZFxuXHR7XG5cdFx0Y29uc29sZS5sb2coICctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XG5cdFx0Y29uc29sZS5sb2coICd0ZXN0QXBwZW5kUm90YXRpb24nKTtcblxuXHRcdHZhciB2IDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoIDEgLCAyICwgMyApO1xuXHRcdHZhciBwIDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoIDIgLCAyICwgMiApO1xuXG5cdFx0dmFyIG06IE1hdHJpeDNEO1xuXHRcdHZhciBpIDogYm9vbGVhbjtcblx0XHR2YXIgciA6IEFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXk8bnVtYmVyPiAoIDE2ICkgO1xuXG5cdFx0bSA9IG5ldyBNYXRyaXgzRCggWyAgIDEsIDIsIDQsIDUsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDIsIDEsIDAsIDgsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDQsIDAsIDEsIDcsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDUsIDgsIDcsIDEgXSApO1xuXHRcdG0uY29weVJhd0RhdGFUbyggciApO1xuXHRcdG0uYXBwZW5kUm90YXRpb24oIDkwICwgdiApOy8vICwgcCApO1xuXG5cdFx0dGhpcy5vdXRwdXRBcHBlbmRSb3RhdGlvbihtLnJhd0RhdGEgLCByICAsIHYgLCBwICk7XG5cblx0XHRtID0gbmV3IE1hdHJpeDNEKCBbICAgMSwgMCwgNCwgNSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0MCwgMSwgOCwgMCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0NCwgOCwgMSwgNyxcblx0XHRcdFx0XHRcdFx0XHRcdFx0NSwgMCwgNywgMV0gKTtcblxuXHRcdG0uY29weVJhd0RhdGFUbyggciApXG5cdFx0bS5hcHBlbmRSb3RhdGlvbiggOTAgLCB2ICk7Ly8sIHAgKTtcblx0XHR0aGlzLm91dHB1dEFwcGVuZFJvdGF0aW9uKG0ucmF3RGF0YSAsIHIgLCB2ICwgcCApO1xuXG5cdFx0bSAgPSBuZXcgTWF0cml4M0QoIFsgIDEsIDAsIDQsIDUsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDAsIDEsIDgsIDAsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDQsIDgsIDEsIDIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDUsIDAsIDIsIDFdICk7XG5cblx0XHRtLmNvcHlSYXdEYXRhVG8oIHIgKVxuXHRcdG0uYXBwZW5kUm90YXRpb24oIDkwICwgdiApOy8vLCBwICk7XG5cdFx0dGhpcy5vdXRwdXRBcHBlbmRSb3RhdGlvbihtLnJhd0RhdGEgLCByICwgdiAsIHAgKTtcblxuXHRcdG0gID0gbmV3IE1hdHJpeDNEKCBbICAxLCAwLCA0LCA1LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQwLCAxLCA4LCAwLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ0LCA4LCAxLCAxLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ1LCAwLCAxLCAxXSApO1xuXG5cdFx0bS5jb3B5UmF3RGF0YVRvKCByIClcblx0XHRtLmFwcGVuZFJvdGF0aW9uKCA5MCAsIHYgKTsvLywgcCApO1xuXHRcdHRoaXMub3V0cHV0QXBwZW5kUm90YXRpb24obS5yYXdEYXRhICwgciwgdiAsIHAgICk7XG5cblx0XHRjb25zb2xlLmxvZygnLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQVMzJyk7XG5cdFx0Y29uc29sZS5sb2coICdwcml2YXRlIGZ1bmN0aW9uIHRlc3RBcHBlbmRSb3RhdGlvbiggcmVzdWx0IDogVmVjdG9yLjxOdW1iZXI+ICwgb3JpZ2luYWwgOiBWZWN0b3IuPE51bWJlcj4gLCBheGlzIDogVmVjdG9yM0QgLCBwaXZvdCA6IFZlY3RvcjNEICknICk7XG5cdFx0Y29uc29sZS5sb2coJ3snKTtcblx0XHRjb25zb2xlLmxvZygnICAgIHZhciBtIDogTWF0cml4M0QgPSBuZXcgTWF0cml4M0QoIG9yaWdpbmFsICk7Jyk7XG5cdFx0Y29uc29sZS5sb2coJyAgICBtLmFwcGVuZFJvdGF0aW9uKCA5MCAsIGF4aXMgLCBwaXZvdCApOycpO1xuXHRcdGNvbnNvbGUubG9nKCcgICAgdHJhY2UoIFwiVFNSZXN1bHQ6IFwiICwgcmVzdWx0ICk7Jyk7XG5cdFx0Y29uc29sZS5sb2coJyAgICB0cmFjZSggXCJBU1Jlc3VsdDogXCIgLCBtLnJhd0RhdGEgKTsnKTtcblx0XHRjb25zb2xlLmxvZygnfScpO1xuXHR9XG5cblx0cHVibGljIHRlc3RJbnZlcnQoKSA6IHZvaWRcblx0e1xuXHRcdHZhciB2IDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcblx0XHR2YXIgbTogTWF0cml4M0Rcblx0XHR2YXIgaSA6IGJvb2xlYW47XG5cdFx0dmFyIHIgOiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4gKCAxNiApIDtcblxuXHRcdG0gPSBuZXcgTWF0cml4M0QoIFsgICAxLCAyLCA0LCA1LFxuXHRcdFx0MiwgMSwgMCwgOCxcblx0XHRcdDQsIDAsIDEsIDcsXG5cdFx0XHQ1LCA4LCA3LCAxIF0gKTtcblx0XHRtLmNvcHlSYXdEYXRhVG8oIHIgKVxuXHRcdGkgPSBtLmludmVydCgpO1xuXHRcdHRoaXMub3V0cHV0SW52ZXJ0KCBpICwgbS5yYXdEYXRhICwgciApIDtcblxuXHRcdG0gPSBuZXcgTWF0cml4M0QoIFsgICAxLCAwLCA0LCA1LFxuXHRcdFx0MCwgMSwgOCwgMCxcblx0XHRcdDQsIDgsIDEsIDcsXG5cdFx0XHQ1LCAwLCA3LCAxXSApO1xuXG5cdFx0bS5jb3B5UmF3RGF0YVRvKCByIClcblx0XHRpID0gbS5pbnZlcnQoKTtcblx0XHR0aGlzLm91dHB1dEludmVydCggaSAsIG0ucmF3RGF0YSAsIHIgKSA7XG5cblx0XHRtICA9IG5ldyBNYXRyaXgzRCggWyAgIDEsIDAsIDQsIDUsXG5cdFx0XHQwLCAxLCA4LCAwLFxuXHRcdFx0NCwgOCwgMSwgMixcblx0XHRcdDUsIDAsIDIsIDFdICk7XG5cblx0XHRtLmNvcHlSYXdEYXRhVG8oIHIgKVxuXHRcdGkgPSBtLmludmVydCgpO1xuXHRcdHRoaXMub3V0cHV0SW52ZXJ0KCBpICwgbS5yYXdEYXRhICwgciApIDtcblx0fVxuXG5cdHB1YmxpYyB0ZXN0Q29weVJvd1RvKClcblx0e1xuXHRcdHZhciB2IDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcblx0XHR2YXIgbTogTWF0cml4M0Rcblx0XHR2YXIgaSA6IGJvb2xlYW47XG5cdFx0dmFyIHIgOiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4gKCAxNiApIDtcblxuXHRcdG0gID0gbmV3IE1hdHJpeDNEKCBbXHQxLDIsNCw1LFxuXHRcdFx0Niw3LDgsOSxcblx0XHRcdDQsMCwxLDcsXG5cdFx0XHQ1LDgsNywxXSk7XG5cblx0XHRtLmNvcHlSb3dUbyggMCwgdikgOyBjb25zb2xlLmxvZyAoIHYgKSA7XG5cdFx0bS5jb3B5Um93VG8oIDEsIHYpIDsgY29uc29sZS5sb2cgKCB2ICkgO1xuXHRcdG0uY29weVJvd1RvKCAyLCB2KSA7IGNvbnNvbGUubG9nICggdiApIDtcblx0XHRtLmNvcHlSb3dUbyggMywgdikgOyBjb25zb2xlLmxvZyAoIHYgKSA7XG5cdH1cblx0XG5cdHB1YmxpYyB0ZXN0Q29weUNvbHVtblRvKClcblx0e1xuXHRcdHZhciB2IDogVmVjdG9yM0QgPSBuZXcgVmVjdG9yM0QoKTtcblx0XHR2YXIgbTogTWF0cml4M0Rcblx0XHR2YXIgaSA6IGJvb2xlYW47XG5cdFx0dmFyIHIgOiBBcnJheTxudW1iZXI+ID0gbmV3IEFycmF5PG51bWJlcj4gKCAxNiApIDtcblxuXHRcdG0gID0gbmV3IE1hdHJpeDNEKCBbICAgMSwgMCwgNCwgNSxcblx0XHRcdDAsIDEsIDgsIDAsXG5cdFx0XHQ0LCA4LCAxLCAxLFxuXHRcdFx0NSwgMCwgMSwgMV0gKTtcblxuXG5cdFx0bSAgPSBuZXcgTWF0cml4M0QoIFtcdDEsMiwzLDQsXG5cdFx0XHQ1LDYsNyw4LFxuXHRcdFx0OSwxMCwxLDEyLFxuXHRcdFx0MTMsMTQsMTUsMTZdKTtcblxuXHRcdG0uY29weUNvbHVtblRvKCAwLCB2KSA7IGNvbnNvbGUubG9nICh2LnRvU3RyaW5nKCkgKSA7XG5cdFx0bS5jb3B5Q29sdW1uVG8oIDEsIHYpIDsgY29uc29sZS5sb2cgKCB2LnRvU3RyaW5nKCkgKSA7XG5cdFx0bS5jb3B5Q29sdW1uVG8oIDIsIHYpIDsgY29uc29sZS5sb2cgKCB2LnRvU3RyaW5nKCkgKSA7XG5cdFx0bS5jb3B5Q29sdW1uVG8oIDMsIHYpIDsgY29uc29sZS5sb2cgKCB2LnRvU3RyaW5nKCkgKSA7XG5cblx0XHR2LncgPSB2LnggPSB2LnkgPSB2LnogPSAwO1xuXHRcdG0uY29weUNvbHVtbkZyb20oIDAgICwgdiApOyBjb25zb2xlLmxvZyAobS5yYXdEYXRhICkgO1xuXHRcdHYudyA9IHYueCA9IHYueSA9IHYueiA9IDE7XG5cdFx0bS5jb3B5Q29sdW1uRnJvbSggMSAgLCB2ICk7IGNvbnNvbGUubG9nICggbS5yYXdEYXRhICkgO1xuXHRcdHYudyA9IHYueCA9IHYueSA9IHYueiA9IDI7XG5cdFx0bS5jb3B5Q29sdW1uRnJvbSggMiAgLCB2ICk7IGNvbnNvbGUubG9nICggbS5yYXdEYXRhICkgO1xuXHRcdHYudyA9IHYueCA9IHYueSA9IHYueiA9IDM7XG5cdFx0bS5jb3B5Q29sdW1uRnJvbSggMyAgLCB2ICk7IGNvbnNvbGUubG9nICggbS5yYXdEYXRhICkgO1xuXHR9XG5cblx0cHVibGljIG91dHB1dEFwcGVuZFJvdGF0aW9uKHJlc3VsdCA6IG51bWJlcltdICwgb3JpZ2luYWwgOiBudW1iZXJbXSAsIGF4aXMgOiBWZWN0b3IzRCAsIHBpdm90IDogVmVjdG9yM0QgKVxuXHR7XG5cdFx0dmFyIGEgOiBzdHJpbmcgPSAnbmV3IFZlY3RvcjNEKCAnICsgYXhpcy54ICsgJyAsICcgKyBheGlzLnkgKyAnICwgJyArIGF4aXMueiArICcgKSc7XG5cdFx0dmFyIHAgOiBzdHJpbmcgPSAnbmV3IFZlY3RvcjNEKCAnICsgcGl2b3QueCArICcgLCAnICsgcGl2b3QueSArICcgLCAnICsgcGl2b3QueiArICcgKSc7XG5cblx0XHRjb25zb2xlLmxvZyggJ3Rlc3RBcHBlbmRSb3RhdGlvbiggbmV3IDxOdW1iZXI+IFsnICsgcmVzdWx0ICsgJ10sIG5ldyA8TnVtYmVyPiBbJyArIG9yaWdpbmFsICsgJ10gLCAnICsgYSArICcgLCAnICsgcCArICcpOycgKSA7XG5cdH1cblxuXHRwdWJsaWMgb3V0cHV0SW52ZXJ0KHN1Y2Nlc3MgOiBib29sZWFuICwgZGF0YSA6IEFycmF5PG51bWJlcj4gLCBvcmlnaW5hbCA6IEFycmF5PG51bWJlcj4gKVxuXHR7XG5cdFx0Y29uc29sZS5sb2coICd0ZXN0SW52ZXJ0KCcgKyBzdWNjZXNzICsgJywgbmV3IDxOdW1iZXI+IFsnICsgZGF0YSArICddLCBuZXcgPE51bWJlcj4gWycgKyBvcmlnaW5hbCArICddKTsnICkgO1xuXHR9XG5cblx0cHVibGljIG91dHB1dCggZGF0YSA6IEFycmF5PG51bWJlcj4gLCByZXN1bHQgOiBudW1iZXIgKVxuXHR7XG5cdFx0Y29uc29sZS5sb2coICd0ZXN0RGV0ZXJtaW5hbnQoIG5ldyA8TnVtYmVyPiBbJyArIGRhdGEgKyAnXSwgJyArICByZXN1bHQgKyAnKTsnICkgO1xuXHR9XG5cblx0cHVibGljIGdldFJuZCggbWF4IDogbnVtYmVyICwgbWluIDogbnVtYmVyICkgOiBudW1iZXIge1xuXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG5cdH1cbn0iXX0=