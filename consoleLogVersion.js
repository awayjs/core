"use strict";
exports.__esModule = true;
var fs = require("fs");


// read in the dist/index.js

// search and replace the string "#BUILD_VIA_NPM_VERSION_PATCH_TO_DISPLAY_VERSION_HERE#"
// with the new version number from package.json

// update dist/index.js with the new content
console.log("update src/index.ts with version:", process.env.npm_package_version);

fs.readFile("./src/index.ts", 'utf8', function(err, data) {
    if (err) throw err;
    data = data.replace(/\- (*?))\"\;/g, process.env.npm_package_version);//#BUILD_VIA_NPM_VERSION_PATCH_TO_DISPLAY_VERSION_HERE#", process.env.npm_package_version);
    fs.writeFile("./dist/index.js", data, function(err) {
        if (err) throw err;    
        console.log("Updated ./dist/index.js with inserted version ", process.env.npm_package_version);
    }); 
});           