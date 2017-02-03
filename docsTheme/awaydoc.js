#!/usr/bin/env node

var typedoc = require('typedoc');
var handlebars = require('handlebars');
var fs = require('fs');

console.log("~awaydoc~ running typedoc API...");

// Parse parameters.
var paramName;
var paramVal;
var optionsPath;
var srcPath;
if (process.argv.length > 2) {
    for(var p = 2; p < process.argv.length; p++) {
        paramName = process.argv[p];
        if (paramName === "--options") {
            paramVal = process.argv[p + 1];
            if (paramVal != null) {
                optionsPath = paramVal;
            }
        }
        if (paramName === "--source") {
            paramVal = process.argv[p + 1];
            if (paramVal != null) {
                srcPath = paramVal;
            }
        }
    }
}

// Prepare options.
// This is a json object that is passed to the typedoc api,
// and is where you set all the doc generation options.
var options;
if(optionsPath != null) {
    console.log("~awaydoc~ using options from: " + optionsPath);
    options = JSON.parse(fs.readFileSync(optionsPath, 'utf8'));
}
else {
    options = {
        "theme": ".",
        "out": "docs"
    }
}

// Prepare path.
srcPath = srcPath == null ? "src" : srcPath;
console.log("~awaydoc~ using ts sources from: " + srcPath);

// Initialize typedoc API.
console.log("~awaydoc~ options: " + JSON.stringify(options));
var app = new typedoc.Application(options);

// Register handlebars helpers.
handlebars.registerHelper('newLine', function () { return '\n'; });

// Tweak typedoc for custom output.
(function modifyTypedoc() {
    "use strict";

    // Modify Renderer.prepareTheme()
    // The theme will be modified. Intercepting this method
    // will make sure we do that when the theme is available.
    var origPrepareTheme = app.renderer.prepareTheme;
    app.renderer.prepareTheme = function modPrepareTheme() {
        console.log("~awaydoc~ modifying prepareTheme()");

        var success = origPrepareTheme.call(this);

        // (1) Modify file names.
        var origGetUrls = app.renderer.theme.getUrls;
        app.renderer.theme.getUrls = function modGetURls(project) {
            console.log("~awaydoc~   modifying theme.getUrls()");

            // Reflection.getAlias() uses toLowerCase(),
            // here, we state that we want the original class names.
            if (project.children) {
                project.children.forEach((child) => {
                    child._alias = child.name;
                });
            }

            return origGetUrls.call(this, project);
        }

        return success;
    };
})();

// Trigger doc generation.
var files = app.expandInputFiles([srcPath]);
app.generateDocs(files, options.out);
if(options.json) {
    console.log("~awaydoc~ generate JSON: " + options.json);
    app.generateJson(files, options.json);
}