"use strict";
exports.__esModule = true;
var fs = require("fs");


// read in the /index.ts

// search and replace the string "#BUILD_VIA_NPM_VERSION_PATCH_TO_DISPLAY_VERSION_HERE#"
// with the new version number from package.json

// update /index.ts with the new content

console.log("update src/index.ts with version:", process.env.npm_package_version);

fs.readFile("./index.ts", 'utf8', function(err, data) {
    if (err) throw err;
    var re = /(.*\-\s+)(.*)(\s+\);.*)/g;
    data = data.replace(re, process.env.npm_package_version);//#BUILD_VIA_NPM_VERSION_PATCH_TO_DISPLAY_VERSION_HERE#", process.env.npm_package_version);
    fs.writeFile("./index.ts", data, function(err) {
        if (err) throw err;    
        console.log("Updated ./index.ts with inserted version ", process.env.npm_package_version);
    }); 
});           