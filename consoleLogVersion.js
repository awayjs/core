"use strict";
exports.__esModule = true;
var fs = require("fs");


// read in the /src/index.ts

// search and replace the string "#BUILD_VIA_NPM_VERSION_PATCH_TO_DISPLAY_VERSION_HERE#"
// with the new version number from package.json

// update /src/index.ts with the new content

console.log("update src/index.ts with version:", process.env.npm_package_version);

fs.readFile("./src/index.ts", 'utf8', function(err, data) {
    if (err) throw err;
    var re = /(.*\-\s+)(.*)(\s+);.*)/g;
    data = data.replace(re, process.env.npm_package_version);//#BUILD_VIA_NPM_VERSION_PATCH_TO_DISPLAY_VERSION_HERE#", process.env.npm_package_version);
    fs.writeFile("./src/index.ts", data, function(err) {
        if (err) throw err;    
        console.log("Updated ./src/index.ts with inserted version ", process.env.npm_package_version);
    }); 
});           