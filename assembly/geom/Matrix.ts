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
@lazy const adzzSwizzle: v128 = v128(0, 1, 2, 3, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 0);
// @ts-ignore
@lazy const bczzSwizzle: v128 = v128(4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0, 0, 0, 0, 0);
// @ts-ignore
@lazy const zzbcSwizzle: v128 = v128(0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 7, 8, 9, 10, 11);
// @ts-ignore
@lazy const baccSwizzle: v128 = v128(4, 5, 6, 7, 0, 1, 2, 3, 8, 9, 10, 11, 8, 9, 10, 11);
// @ts-ignore
@lazy const cbabSwizzle: v128 = v128(8, 9, 10, 11, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7);
// @ts-ignore
@lazy const zbdzSwizzle: v128 = v128(0, 0, 0, 0, 4, 5, 6, 7, 12, 13, 14, 15, 0, 0, 0, 0);
// @ts-ignore
@lazy const zdczSwizzle: v128 = v128(0, 0, 0, 0, 12, 13, 14, 15, 8, 9, 10, 11, 0, 0, 0, 0);
// @ts-ignore
@lazy const cbzzSwizzle: v128 = v128(8, 9, 10, 11, 4, 5, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0);

export function Matrix_concat(m: Matrix, n: Matrix): void {
    if (ASC_FEATURE_SIMD) {
        let mv128 = v128.load(changetype<usize>(m));
        let nv128 = v128.load(changetype<usize>(n));
        let mtxty = v128.load_zero(changetype<usize>(m), offsetof<Matrix>("tx"));
        mtxty = v128.load_lane<f32>(changetype<usize>(m), mtxty, 1, offsetof<Matrix>("ty"));
        let ntxty = v128.load_zero(changetype<usize>(n), offsetof<Matrix>("tx"));
        ntxty = v128.load_lane<f32>(changetype<usize>(n), ntxty, 1, offsetof<Matrix>("ty"));

        // TODO: Complete this operation
        let abcd = v128.mul<f32>(
            v128.mul(mv128, nv128),
            f32x4(1, 0, 0, 1)
        );
        let txty = v128.add<f32>(
            v128.mul<f32>(
                mtxty,
                v128.swizzle(nv128, adzzSwizzle)
            ),
            ntxty,
        );

        // select the bc lanes in the first two lanes
        let mbc = v128.mul<f32>(v128.swizzle(mv128, bczzSwizzle), f32x4(1, 1, 0, 0));
        // select the bc lanes in the last two lanes
        let nbc = v128.mul<f32>(v128.swizzle(mv128, zzbcSwizzle), f32x4(0, 0, 1, 1));
        // add them together
        let mbcnbc = v128.add<f32>(mbc, nbc);
        if (v128.any_true(v128.ne(mbcnbc, f32x4(0, 0, 0, 0)))) {
            abcd = v128.add<f32>(
                abcd,
                v128.add<f32>(
                    v128.mul<f32>(
                        v128.swizzle(mv128, baccSwizzle),
                        v128.swizzle(nv128, cbabSwizzle),
                    ),
                    v128.mul<f32>(
                        v128.mul<f32>(
                            v128.swizzle(mv128, zbdzSwizzle),
                            v128.swizzle(nv128, zdczSwizzle),
                        ),
                        f32x4(0, 1, 1, 0),
                    ),
                )
            );
            txty = v128.add<f32>(
                txty,
                v128.add<f32>(
                    v128.mul<f32>(
                        mtxty,
                        v128.swizzle(nv128, cbzzSwizzle),
                    ),
                    ntxty,
                ),
            )
        }
        v128.store(changetype<usize>(m), abcd);
        v128.store_lane<f32>(changetype<usize>(m), txty, 0, offsetof<Matrix>("tx"));
        v128.store_lane<f32>(changetype<usize>(m), txty, 1, offsetof<Matrix>("ty"));

    } else {
        let a =  m.a * n.a;
        let b =  0.0;
        let c =  0.0;
        let d =  m.d * n.d;
        let tx = m.tx * n.a + n.tx;
        let ty = m.ty * n.d + n.ty;
    
        if (m.b !== 0.0 || m.c !== 0.0 || n.b !== 0.0 || n.c !== 0.0) {
            a  += m.b * n.c;
            b  += m.a * n.b + m.b * n.d;
            c  += m.c * n.a + m.d * n.c;
            d  += m.c * n.b;
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

export function Matrix_copy(dst: Matrix, src: Matrix): void {
    if (ASC_FEATURE_SIMD) {
        v128.store(
            changetype<usize>(dst),
            v128.load(changetype<usize>(src)),
        );
    } else {
        store<u64>(
            changetype<usize>(dst),
            load<u64>(changetype<usize>(src)),
        );
        store<u64>(
            changetype<usize>(dst),
            load<u64>(changetype<usize>(src), offsetof<Matrix>("c")),
            offsetof<Matrix>("c"),
        );
    }
    store<u64>(
        changetype<usize>(dst),
        load<u64>(changetype<usize>(src), offsetof<Matrix>("tx")),
        offsetof<Matrix>("tx"),
    );
}

export function Matrix_createBox(mat: Matrix, scaleX: f32, scaleY: f32, rotation: f32, tx: f32, ty: f32): void {
    const u = NativeMathf.cos(rotation);
    const v = NativeMathf.sin(rotation);
    if (rotation != 0) {
        mat.a =  u * scaleX;
        mat.b =  v * scaleY;
        mat.c = -v * scaleX;
        mat.d =  u * scaleY;
    } else {
        mat.a = scaleX;
        mat.b = 0;
        mat.c = 0;
        mat.d = scaleY;
    }
    mat.tx = tx;
    mat.ty = ty;
}
