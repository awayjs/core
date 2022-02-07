
declare const __assembly: ICoreExports;

interface WASMVector3D {
    type: "WASMVector3D";
}

interface ICoreExports {
    Vector3D_allocate(x: f32, y: f32, z: f32, w: f32): WASMVector3D;
    Vector3D_free(vec: WASMVector3D): void;
    Vector3D_length(vec: WASMVector3D): number;
    Vector3D_dotProduct(left: WASMVector3D, right: WASMVector3D): number;
    Vector3D_angleBetween(left: WASMVector3D, right: WASMVector3D): number;
    Vector3D_lengthSquared(vec: WASMVector3D): number;
    Vector3D_add(left: WASMVector3D, right: WASMVector3D, set: WASMVector3D): void;
    Vector3D_copy(src: WASMVector3D, target: WASMVector3D): void;
    Vector3D_combine(left: WASMVector3D, right: WASMVector3D, ascl: number, bscl: number, target: WASMVector3D): void;
    memory: WebAssembly.Memory;
}
