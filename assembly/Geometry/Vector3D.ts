/** Initial setup, allocates 1000 vectors up front. */
let vecpool = [] as Array<StaticArray<f32>>;
for (let i = 0; i < 1000; i++) {
  vecpool.push(new StaticArray<f32>(4));
}

/** Allocate a Vec3, alternatively allocate a new managed object. */
export function allocVec3(): StaticArray<f32> {
  if (vecpool.length == 0) return new StaticArray<f32>(4);
  return vecpool.pop();
}

/** Free a Vec3 and add it back to the pool. */
export function freeVec3(vec: StaticArray<f32>): void {
  vecpool.push(vec);
}

/**
 * Assemblyscript vec3Add. Adds two Vec3 references together using SIMD
 * if it's enabled. The result is added and stored in `set`.
 *
 * @param {StaticArray<f32>} left - The left side of the add operation.
 * @param {StaticArray<f32>} right - The right side of the add operation.
 * @param {StaticArray<f32>} set - The vector being set.
 */
export function vec3Add(left: StaticArray<f32>, right: StaticArray<f32>, set: StaticArray<f32>): void {
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
