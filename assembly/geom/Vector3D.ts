/** Initial setup, allocates 1000 vectors up front. */
let vecpool = [] as Array<StaticArray<f32>>;
for (let i = 0; i < 1000; i++) {
  vecpool.push(new StaticArray<f32>(4));
}

/** Allocate a Vec3, alternatively allocate a new managed object. */
export function Vector3D_allocate(x: f32, y: f32, z: f32, w: f32): StaticArray<f32> {
  let vec = vecpool.length == 0
    ? new StaticArray<f32>(4)
    : vecpool.pop();

  unchecked(vec[0] = x);
  unchecked(vec[1] = y);
  unchecked(vec[2] = z);
  unchecked(vec[3] = w);

  return vec;
}

/** Free a Vec3 and add it back to the pool. */
export function Vector3D_free(vec: StaticArray<f32>): void {
  vecpool.push(vec);
}

/**
 * Assemblyscript Vector3D_add. Adds two Vec3 references together using SIMD
 * if it's enabled. The result is added and stored in `set`.
 *
 * @param {StaticArray<f32>} left - The left side of the add operation.
 * @param {StaticArray<f32>} right - The right side of the add operation.
 * @param {StaticArray<f32>} set - The vector being set.
 */
export function Vector3D_add(left: StaticArray<f32>, right: StaticArray<f32>, set: StaticArray<f32>): void {
  if (ASC_FEATURE_SIMD) {
    let leftv128 = v128.load(changetype<usize>(left));
    let rightv128 = v128.load(changetype<usize>(right));
    v128.store(
      changetype<usize>(set),
      v128.add<f32>(leftv128, rightv128),
    );
  } else {
    set[0] = left[0] + right[0];
    set[1] = left[1] + right[1];
    set[2] = left[2] + right[2];
    set[3] = left[3] + right[3];
  }
}

/**
 * Assemblyscript Vector3D_sub. Adds two Vec3 references together using SIMD
 * if it's enabled. The result is added and stored in `set`.
 *
 * @param {StaticArray<f32>} left - The left side of the add operation.
 * @param {StaticArray<f32>} right - The right side of the add operation.
 * @param {StaticArray<f32>} set - The vector being set.
 */
export function Vector3D_sub(left: StaticArray<f32>, right: StaticArray<f32>, set: StaticArray<f32>): void {
  if (ASC_FEATURE_SIMD) {
    let leftv128 = v128.load(changetype<usize>(left));
    let rightv128 = v128.load(changetype<usize>(right));
    v128.store(
      changetype<usize>(set),
      v128.sub<f32>(leftv128, rightv128),
    );
  } else {
    set[0] = left[0] - right[0];
    set[1] = left[1] - right[1];
    set[2] = left[2] - right[2];
    set[3] = left[3] - right[3];
  }
}

/**
 * Assemblyscript Vector3D_mul. Multiplu two Vec3 references together using SIMD
 * if it's enabled. The result is added and stored in `set`.
 *
 * @param {StaticArray<f32>} left - The left side of the add operation.
 * @param {StaticArray<f32>} right - The right side of the add operation.
 * @param {StaticArray<f32>} set - The vector being set.
 */
export function Vector3D_mul(left: StaticArray<f32>, right: StaticArray<f32>, set: StaticArray<f32>): void {
  if (ASC_FEATURE_SIMD) {
    let leftv128 = v128.load(changetype<usize>(left));
    let rightv128 = v128.load(changetype<usize>(right));
    v128.store(
      changetype<usize>(set),
      v128.mul<f32>(leftv128, rightv128),
    );
  } else {
    set[0] = left[0] * right[0];
    set[1] = left[1] * right[1];
    set[2] = left[2] * right[2];
    set[3] = left[3] * right[3];
  }
}

/**
 * Assemblyscript Vector3D_mul. Multiplu two Vec3 references together using SIMD
 * if it's enabled. The result is added and stored in `set`.
 *
 * @param {StaticArray<f32>} left - The left side of the add operation.
 * @param {StaticArray<f32>} right - The right side of the add operation.
 * @param {StaticArray<f32>} set - The vector being set.
 */
export function Vector3D_div(left: StaticArray<f32>, right: StaticArray<f32>, set: StaticArray<f32>): void {
  if (ASC_FEATURE_SIMD) {
    let leftv128 = v128.load(changetype<usize>(left));
    let rightv128 = v128.load(changetype<usize>(right));
    v128.store(
      changetype<usize>(set),
      v128.div<f32>(leftv128, rightv128),
    );
  } else {
    set[0] = left[0] / right[0];
    set[1] = left[1] / right[1];
    set[2] = left[2] / right[2];
    set[3] = left[3] / right[3];
  }
}
