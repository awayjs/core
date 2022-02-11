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
  for (let i = 0; i < count; i++) {
    vecpool.push(new Vector3D());
  }
}
allocateVectors(1000);

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
  return left.x * right.x + left.y * right.y + left.z * right.z;
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
 * @param dest - The destination vector.
 * @param src - The source vector.
 */
export function Vector3D_copy(dest: Vector3D, src: Vector3D): void {
  if (ASC_FEATURE_SIMD) {
    v128.store(changetype<usize>(dest), v128.load(changetype<usize>(src)));
  } else {
    memory.copy(
      changetype<usize>(dest),
      changetype<usize>(src),
      offsetof<Vector3D>(),
    );
  }
}

/**
 * Combine two vectors.
 *
 * @param left - The lefthand operand of this function.
 * @param right - The righthand operand of this function.
 * @param ascl - The scale applied to the left vector (default: 1)
 * @param bscl - The scale applied to the right vector (default: 1)
 * @param target - The vector which will store the result.
 */
export function Vector3D_combine(left: Vector3D, right: Vector3D, ascl: f32, bscl: f32, target: Vector3D): void {

  if (ASC_FEATURE_SIMD) {
    let leftv128 = v128.load(changetype<usize>(left));
    let rightv128 = v128.load(changetype<usize>(right));
    v128.store(
      changetype<usize>(target),
      v128.add<f32>(
        v128.mul<f32>(leftv128, v128.splat<f32>(ascl)),
        v128.mul<f32>(rightv128, v128.splat<f32>(bscl)),
      ),
    );
  } else {
    target.x = left.x * ascl + right.x * bscl;
    target.y = left.y * ascl + right.y * bscl;
    target.z = left.z * ascl + right.z * bscl;
  }
  target.z = 1;
}

/**
 * The following constant is used as a global (lazily) if required,
 * which selects the Z, X, and Y, lanes respectively when used as the
 * second argument of a `v128.swizzle` instruction.
 */
// @ts-ignore: decorator is allowed here
@lazy let selectZXY = v128(
  8, 9, 10, 11,
  0, 1, 2, 3,
  4, 5, 6, 7,
  12, 13, 14, 15,
);

/**
 * The following constant is used as a global (lazily) if required,
 * which selects the Y, Z, and X, lanes respectively when used as the
 * second argument of a `v128.swizzle` instruction.
 */
// @ts-ignore: decorator is allowed here
@lazy let selectYZX = v128(
  4, 5, 6, 7,
  8, 9, 10, 11,
  0, 1, 2, 3,
  12, 13, 14, 15,
);

/**
 * Perform the cross product of two vectors.
 *
 * @param left - Lefthand operand.
 * @param right - Righthand operand.
 * @param store - The vector to store the operation to.
 */
export function Vector3d_crossProduct(left: Vector3D, right: Vector3D, store: Vector3D): void {
  if (ASC_FEATURE_SIMD) {
    let leftSimd = v128.load(changetype<usize>(left));
    let rightSimd = v128.load(changetype<usize>(right));
    v128.store(
      changetype<usize>(store),
      v128.sub<f32>(
        v128.mul<f32>(
          v128.swizzle(leftSimd, selectYZX),
          v128.swizzle(rightSimd, selectZXY),
        ),
        v128.mul<f32>(
          v128.swizzle(leftSimd, selectZXY),
          v128.swizzle(rightSimd, selectYZX),
        ),
      ),
    );
  } else {
    store.x = left.y * right.z - left.z * right.y;
    store.y = left.z * right.x - left.x * right.z;
    store.z = left.x * right.y - left.y * right.x;
  }
}

/**
 * Calculate the distance between two vectors.
 *
 * @param left - The lefthand operand.
 * @param right - The righthand operand.
 * @returns The length of the distance between two vectors.
 */
export function Vector3D_distance(left: Vector3D, right: Vector3D): f32 {
  if (ASC_FEATURE_SIMD) {
    let simd = v128.sub<f32>(
      v128.load(changetype<usize>(left)),
      v128.load(changetype<usize>(right)),
    );
    simd = v128.mul<f32>(simd, simd);
    return sqrt<f32>(
      v128.extract_lane<f32>(simd, 0)
      + v128.extract_lane<f32>(simd, 1)
      + v128.extract_lane<f32>(simd, 2)
    );
  } else {
    let x = left.x - right.x;
    let y = left.y - right.y;
    let z = left.z - right.z;
    return sqrt<f32>(x * x + y * y + z * z);
  }
}

// @ts-ignore: decorator is valid here
@lazy const sizeofXYZ = offsetof<Vector3D>() - sizeof<f32>();

// @ts-ignore: decorator is valid here
@lazy let identity = v128(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);

// @ts-ignore: decorator is valid here
@lazy let vectorIdentity = v128(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3);

/**
 * Compare two vectors to see if they are equal.
 *
 * @param {Vector3D} left - Lefthand side operand.
 * @param {Vector3D} right - Righthand side operand.
 * @param {bool} allFour - If all four lanes should be considdered.
 * @returns {bool} - Truthy if the two vectors are equal
 */
export function Vector3D_equals(left: Vector3D, right: Vector3D, allFour: bool = false): bool {
  if (ASC_FEATURE_SIMD) {
    // only considder x y and z if allFour is false
    let loadIdentity = select<v128>(identity, vectorIdentity, allFour);
    // load both vectors
    let leftSimd = v128.swizzle(
      v128.load(changetype<usize>(left)),
      loadIdentity,
    );
    let rightSimd = v128.swizzle(
      v128.load(changetype<usize>(left)),
      loadIdentity,
    );
    // if, after xor-ing the vectors, any of the lanes are truthy, they are not equal
    return !v128.any_true(v128.xor(leftSimd, rightSimd));
  } else {
    return bool(
      // compare the first two properties in a single load
      i32(load<u64>(changetype<usize>(left)) == load<u64>(changetype<usize>(right)))
      & i32(left.z == right.z)
      // last property is optional, but still performs equality to be "branchless"
      & (i32(allFour) | i32(left.w == right.w))
    );
  }
}

/** Set the target vector to an identity vector. */
export function Vector3D_identity(vec: Vector3D): void {
  if (ASC_FEATURE_SIMD) {
    v128.store(
      changetype<usize>(vec),
      f32x4(0, 0, 0, 1),
    );
  } else {
    vec.x = 0;
    vec.y = 0;
    vec.z = 0;
    vec.w = 1;
  }
}

/**
 * Determine if two vectors are close to each other.
 *
 * @param {Vector3D} left - The lefthand operand.
 * @param {Vector3D} right - The righthand operand.
 * @param {f32} tolerance - How close the vectors should be.
 * @param {bool} allFour - Should we compare all four entries?
 * @returns {bool} Truthy if the vectors are nearEqual.
 */
export function Vector3D_nearEquals(left: Vector3D, right: Vector3D, tolerance: f32, allFour: bool): bool {
  if (ASC_FEATURE_SIMD) {
    // only considder x y and z if allFour is false
    let loadIdentity = select<v128>(identity, vectorIdentity, allFour);
    // load both vectors
    let leftSimd = v128.swizzle(
      v128.load(changetype<usize>(left)),
      loadIdentity,
    );
    let rightSimd = v128.swizzle(
      v128.load(changetype<usize>(left)),
      loadIdentity,
    );
    let diff = v128.abs<f32>(v128.sub<f32>(leftSimd, rightSimd));
    // if the difference is greater than the tolerance, then it is not nearEquals
    return !v128.any_true(v128.gt<f32>(diff, v128.splat<f32>(tolerance)));
  } else {
    return bool(
      i32(abs<f32>(left.x - right.x) < tolerance)
      & i32(abs<f32>(left.y - right.y) < tolerance)
      & i32(abs<f32>(left.z - right.z) < tolerance)
      & i32(i32(allFour) | i32(abs<f32>(left.w - right.w) < tolerance))
    );
  }
}

/** Negate a given vector, multiplying the vector components by -1. */
export function Vector3D_negate(vec: Vector3D): void {
  if (ASC_FEATURE_SIMD) {
    v128.store(
      changetype<usize>(vec),
      v128.mul<f32>(
        v128.load(changetype<usize>(vec)),
        f32x4(-1, -1, -1, 1),
      ),
    );
  } else {
    vec.x = -vec.x;
    vec.y = -vec.y;
    vec.z = -vec.z;
  }
}


/**
 * Calculate the given vector.
 *
 * @param vec - The vector.
 */
 export function Vector3D_normalize(vec: Vector3D, thickness: f32): void {
  if (ASC_FEATURE_SIMD) {
    let simd = v128.load(changetype<usize>(vec));
    let squared = v128.mul<f32>(simd, simd);
    let length = sqrt<f32>(v128.extract_lane<f32>(squared, 0) + v128.extract_lane<f32>(squared, 1) + v128.extract_lane<f32>(squared, 2));
    let ratio = thickness / length;
    // TODO: Multiply original vector by ratio
  } else {
    let length = sqrt<f32>(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
    // TODO: perform normalization calculation
  }
}
