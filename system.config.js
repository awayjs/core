System.config({
    baseURL: "../",
    defaultExtension:false,
    transpiler: "typescript",
    typescriptOptions: {
        
        "module": "system",
        "noEmitHelpers": true,
        "sourceMap": true
    },
    paths: {
        "awayjs-core/*": "awayjs-core/*.ts"
    },

    map: {
        "typescript": "./node_modules/typescript/lib/typescript.js"
    }
});