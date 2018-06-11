"use strict";
exports.__esModule = true;
//var fs = require("fs-extra");
//var path = require("path");
/*
function readdir(dir, prefix, outputDir, result) {
    if (prefix === void 0) { prefix = ''; }
    if (outputDir === void 0) { outputDir = ""; }
    if (result === void 0) { result = []; }
    //console.log("test dir", dir );
    if (!fs.existsSync(outputDir))
        fs.mkdirSync(outputDir);
    fs.readdirSync(dir).forEach(function (file) {
        var fileName = path.join(prefix, file);
        var filePath = path.join(dir, file);
        var outPath = path.join(outputDir, file);
        if (!fs.statSync(filePath).isDirectory()) {
            if (path.extname(file) === ".swf") {
                var file1 = fs.createReadStream(filePath, { flags: 'r', encoding: "binary" });
                var dest = fs.createWriteStream(outPath, { flags: 'w', encoding: "binary" });
                file1.pipe(dest, { end: false });
                result.push(outPath);
            }
        }
        else {
            //console.log("test file", file );
            if (file != "source" && file != "Source" && file != "paper-based" && file != "Paper-based") {
                readdir(filePath, fileName, outPath, result);
            }
        }
    });
    return result;
}*/
console.log($npm_package_version);
/*var len = output.length;
var outStr = "[";
for (var i = 0; i < len; i++) {
    outStr += '{"name": "' + output[i].replace("d:\\away2017\\mw_repo\\mw_swf\\bin", ".").replace(/\\/g, "/").replace(".swf", "") + '", "props":{}},\n';
}
outStr += "]";
fs.writeFile("./bin/mathwhizz_swfs_new.txt", outStr, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});*/
