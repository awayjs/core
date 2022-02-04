/** An unmanaged class that represents a single Vector3D. */
@unmanaged export class Vector3D {
  x: f32;
  y: f32;
  z: f32;
  w: f32;
}


/** Initial setup, allocates 1000 vectors up front. */
let vecpool = [] as Array<Vector3D>;

function allocateVectors(count: i32): void {
  for (let i = 0; i < 1000; i++) {
    vecpool.push(new Vector3D());
  }
}

/** Allocate a Vec3, alternatively allocate a new managed object. */
export function Vector3D_allocate(x: f32, y: f32, z: f32, w: f32): Vector3D {
  if (vecpool.length == 0) {
    allocateVectors(1000);
  }

  let vec = vecpool.pop();
  vec.x = x;
  vec.y = y;
  vec.z = z;
  vec.w = w;

  return vec;
}

/** Free a Vec3 and add it back to the pool. */
export function Vector3D_free(vec: Vector3D): void {
  vecpool.push(vec);
}

/**
 * Assemblyscript Vector3D_add. Adds two Vec3 references together using SIMD
 * if it's enabled. The result is added and stored in `set`.
 *
 * @param {Vector3D} left - The left side of the add operation.
 * @param {Vector3D} right - The right side of the add operation.
 * @param {Vector3D} set - The vector being set.
 */
export function Vector3D_add(left: Vector3D, right: Vector3D, set: Vector3D): void {
  if (ASC_FEATURE_SIMD) {
    let leftv128 = v128.load(changetype<usize>(left));
    let rightv128 = v128.load(changetype<usize>(right));
    v128.store(
      changetype<usize>(set),
      v128.add<f32>(leftv128, rightv128),
    );
  } else {
    set.x = left.x + right.x;
    set.y = left.y + right.y;
    set.z = left.z + right.z;
    set.w = left.w + right.w;
  }
}

/**
 * Assemblyscript Vector3D_sub. Adds two Vec3 references together using SIMD
 * if it's enabled. The result is added and stored in `set`.
 *
 * @param {Vector3D} left - The left side of the add operation.
 * @param {Vector3D} right - The right side of the add operation.
 * @param {Vector3D} set - The vector being set.
 */
export function Vector3D_sub(left: Vector3D, right: Vector3D, set: Vector3D): void {
  if (ASC_FEATURE_SIMD) {
    let leftv128 = v128.load(changetype<usize>(left));
    let rightv128 = v128.load(changetype<usize>(right));
    v128.store(
      changetype<usize>(set),
      v128.sub<f32>(leftv128, rightv128),
    );
  } else {
    set.x = left.x - right.x;
    set.y = left.y - right.y;
    set.z = left.z - right.z;
    set.w = left.w - right.w;
  }
}

/**
 * Assemblyscript Vector3D_mul. Multiplu two Vec3 references together using SIMD
 * if it's enabled. The result is added and stored in `set`.
 *
 * @param {Vector3D} left - The left side of the add operation.
 * @param {Vector3D} right - The right side of the add operation.
 * @param {Vector3D} set - The vector being set.
 */
export function Vector3D_mul(left: Vector3D, right: Vector3D, set: Vector3D): void {
  if (ASC_FEATURE_SIMD) {
    let leftv128 = v128.load(changetype<usize>(left));
    let rightv128 = v128.load(changetype<usize>(right));
    v128.store(
      changetype<usize>(set),
      v128.mul<f32>(leftv128, rightv128),
    );
  } else {
    set.x = left.x * right.x;
    set.y = left.y * right.y;
    set.z = left.z * right.z;
    set.w = left.w * right.w;
  }
}

/**
 * Assemblyscript Vector3D_mul. Multiplu two Vec3 references together using SIMD
 * if it's enabled. The result is added and stored in `set`.
 *
 * @param {Vector3D} left - The left side of the add operation.
 * @param {Vector3D} right - The right side of the add operation.
 * @param {Vector3D} set - The vector being set.
 */
export function Vector3D_div(left: Vector3D, right: Vector3D, set: Vector3D): void {
  if (ASC_FEATURE_SIMD) {
    let leftv128 = v128.load(changetype<usize>(left));
    let rightv128 = v128.load(changetype<usize>(right));
    v128.store(
      changetype<usize>(set),
      v128.div<f32>(leftv128, rightv128),
    );
  } else {
    set.x = left.x / right.x;
    set.y = left.y / right.y;
    set.z = left.z / right.z;
    set.w = left.w / right.w;
  }
}

/**
 * Calculate the length squared of a given vector.
 *
 * @param vec - The vector.
 * @returns The length of the vector squared.
 */
export function Vector3D_lengthSquared(vec: Vector3D): f32 {
  if (ASC_FEATURE_SIMD) {
    let simd = v128.load(changetype<usize>(vec));
    simd = v128.mul<f32>(simd, simd);
    return v128.extract_lane<f32>(simd, 0) + v128.extract_lane<f32>(simd, 1) + v128.extract_lane<f32>(simd, 2);
  } else {
    return vec.x * vec.x + vec.y * vec.y + vec.z * vec.z;
  }
}

/**
 * Calculate the length of the vector.
 *
 * @param vec - The vector.
 * @returns The length of the vector.
 */
export function Vector3D_length(vec: Vector3D): f32 {
  return sqrt<f32>(Vector3D_lengthSquared(vec));
}

/**
 * Calculate the dot product of two vectors.
 *
 * @param left - The first vector.
 * @param right - The second vector.
 * @returns The dot product of the two vectors.
 */
export function Vector3D_dotProduct(left: Vector3D, right: Vector3D): f32 {
  if (ASC_FEATURE_SIMD) {
    let leftv128 = v128.load(changetype<usize>(left));
    let rightv128 = v128.load(changetype<usize>(right));
    let result = v128.add<f32>(leftv128, rightv128);
    return v128.extract_lane<f32>(result, 0) + v128.extract_lane<f32>(result, 1) + v128.extract_lane<f32>(result, 2);
  } else {
    return left.x * right.x + left.y * right.y + left.z * right.z;
  }
}

/**
 * Calculate the angle between two vectors.
 *
 * @param left - The first vector.
 * @param right - The second vector.
 * @returns The angle between the two vectors.
 */
export function Vector3D_angleBetween(left: Vector3D, right: Vector3D): f32 {
  return <f32>Math.acos(
    <f64>Vector3D_dotProduct(left, right) / (<f64>(Vector3D_length(left) * Vector3D_length(right)))
  );
}

/**
 * Copy one vector values to another.
 *
 * @param left - The source vector.
 * @param right - The destination vector.
 */
export function Vector3D_copy(left: Vector3D, right: Vector3D): void {
  memory.copy(
    changetype<usize>(right),
    changetype<usize>(left),
    offsetof<Vector3D>(),
  );
}
