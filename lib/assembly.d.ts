
declare const __assembly: ICoreExports;

interface WASMVector3D {
    type: "WASMVector3D";
}

interface ICoreExports {
    Vector3D_add(left: WASMVector3D, right: WASMVector3D, set: WASMVector3D): void;
    Vector3D_allocate(x: f32, y: f32, z: f32, w: f32): WASMVector3D;
    Vector3D_angleBetween(left: WASMVector3D, right: WASMVector3D): number;
    Vector3D_combine(left: WASMVector3D, right: WASMVector3D, ascl: number, bscl: number, target: WASMVector3D): void;
    Vector3D_copy(dest: WASMVector3D, src: WASMVector3D): void;
    Vector3d_crossProduct(left: WASMVector3D, right: WASMVector3D, store: WASMVector3D): void;
    Vector3D_distance(left: WASMVector3D, right: WASMVector3D): f32;
    Vector3D_dotProduct(left: WASMVector3D, right: WASMVector3D): number;
    Vector3D_equals(left: WASMVector3D, right: WASMVector3D, allFour: 1 | 0): 1 | 0;
    Vector3D_free(vec: WASMVector3D): void;
    Vector3D_identity(vec: WASMVector3D): void;
    Vector3D_length(vec: WASMVector3D): number;
    Vector3D_lengthSquared(vec: WASMVector3D): number;
    Vector3D_nearEquals(left: WASMVector3D, right: WASMVector3D, tolerance: number, allFour: 1 | 0): 1 | 0;
    Vector3D_negate(vec: WASMVector3D): void;
    Vector3D_normalize(vec: WASMVector3D, thickness: number): number;
    Vector3D_project(vec: WASMVector3D): void;
    Vector3D_scaleBy(vec: WASMVector3D, scale: number): void;
    Vector3D_sub(left: WASMVector3D, right: WASMVector3D, set: WASMVector3D): void;
    memory: WebAssembly.Memory;
}
