
declare const __assembly: ICoreExports;

export interface AssemblyVector3D {
    type: "AssemblyVector";
}

export interface ICoreExports {
    Vector3D_allocate(x: f32, y: f32, z: f32, w: f32): AssemblyVector3D;
    Vector3D_free(vec: AssemblyVector3D): void;
    Vector3D_length(vec: AssemblyVector3D): number;
    Vector3D_dotProduct(left: AssemblyVector3D, right: AssemblyVector3D): number;
    Vector3D_angleBetween(left: AssemblyVector3D, right: AssemblyVector3D): number;
}
