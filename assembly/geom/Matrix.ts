/** An unmanaged class that represents a single Vector3D. */
@unmanaged export class Matrix {
    a: f32;
    b: f32;
    c: f32;
    d: f32;
    tx: f32;
    ty: f32;
}

  /** Initial setup, allocates 1000 vectors up front. */
let matrixPool = [] as Array<Matrix>;

function allocateMatricies(count: i32): void {
    for (let i = 0; i < count; i++) {
        matrixPool.push(new Matrix());
    }
}
allocateMatricies(1000);

export function Matrix_allocate(a: f32, b: f32, c: f32, d: f32, tx: f32, ty: f32): Matrix {
    if (matrixPool.length == 0) {
        allocateMatricies(1000);
    }
    let matrix = matrixPool.pop();
    matrix.a = a;
    matrix.b = b;
    matrix.c = c;
    matrix.d = d;
    matrix.tx = tx;
    matrix.ty = ty;

    return matrix;
}


export function Matrix_allocateUnset(): Matrix {
    if (matrixPool.length == 0) {
        allocateMatricies(1000);
    }
    return matrixPool.pop();
}

export function Matrix_free(matrix: Matrix): void {
    matrixPool.push(matrix);
}

// @ts-ignore
@lazy let adMask = f32x4(1, 0, 0, 1);
// @ts-ignore
@lazy let adaa = v128(0,  1,  2,  3,
    12, 13, 14, 15,
    0,  0,  0,  0,
    0,  0,  0,  0);
// @ts-ignore
@lazy let bcaa = v128(4, 5, 6, 7, 8, 9, 10, 11,
    0, 0, 0, 0, 0, 0, 0, 0);
export function concat(m: Matrix, n: Matrix): void {
    if (ASC_FEATURE_SIMD) {
        let mv128 = v128.load(changetype<usize>(m));
        let nv128 = v128.load(changetype<usize>(n));
        let abcd = v128.mul(
            v128.mul(mv128, adMask),
            v128.mul(nv128, adMask),
        );
        // two lanes, tx, ty
        let mtxy = v128.load_ext<f32>(changetype<usize>(m), offsetof<Matrix>("tx"));
        let ntxy = v128.load_ext<f32>(changetype<usize>(n), offsetof<Matrix>("tx"));
        let nad = v128.extend_low<f32>(v128.swizzle(nv128, adaa));
        let mbc = v128.extend_low<f32>(v128.swizzle(mv128, bcaa));
        let nbc = v128.extend_low<f32>(v128.swizzle(nv128, bcaa));

        // TODO: Complete this operation
    } else {
        let a =  m.a * n.a;
        let b =  0.0;
        let c =  0.0;
        let d =  m.d * n.d;
        let tx = m.tx * n.a + n.tx;
        let ty = m.ty * n.d + n.ty;
    
        if (m.b !== 0.0 || m.c !== 0.0 || n.b !== 0.0 || n.c !== 0.0) {
            a  += m.b * n.c;
            d  += m.c * n.b;
            b  += m.a * n.b + m.b * n.d;
            c  += m.c * n.a + m.d * n.c;
            tx += m.ty * n.c;
            ty += m.tx * n.b;
        }
    
        m.a = a;
        m.b = b;
        m.c = c;
        m.d = d;
        m.tx = tx;
        m.ty = ty;
    }
}