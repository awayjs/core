#!/usr/bin/env node

var typedoc = require('typedoc');
var handlebars = require('handlebars');
var fs = require('fs');
var nav = require("../../node_modules/typedoc/dist/lib/output/models/NavigationItem.js");

console.log("~awaydoc~ running typedoc API...");

// Initialize typedoc API.
var options = {
    "out": "docs/bin",
    "name": "core",
    "json": "",
    "theme": "docs/theme",
    "mode": "modules",
    "logger": "console",
    "moduleResolution": "node",
    "includeDeclarations": true,
    "ignoreCompilerErrors": true,
    "excludePrivate": true,
    "excludeNotExported": true,
    "excludeExternals": false,
    "includes": "docs/includes",
    "tsconfig": "tsconfig.json"
};
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

        // Always keep the nav at the project root.
        app.renderer.removeComponent('toc');
        function buildToc(model, parent, level) {
            var children = model.children || [];
            children.forEach((child) => {
                var item = nav.NavigationItem.create(child, parent, true);
                if(level == 0) {
                    buildToc(child, item, level + 1);
                }
            });
        }
        this.listenTo(app.renderer, 'beginPage', function onRendererBeginPage(page){
            var model = page.project;
            page.toc = new nav.NavigationItem();
            buildToc(model, page.toc, 0);
        });

        // Keep camelcase in URLs.
        var origGetUrls = app.renderer.theme.getUrls;
        app.renderer.theme.getUrls = function modGetURls(project) {
            console.log("~awaydoc~   modifying theme.getUrls()");

            // Reflection.getAlias() uses toLowerCase(),
            // here, we state that we want the original class names as aliases.
            function applyAlias(obj) {
                if (obj.children) {
                    obj.children.forEach((child) => {
                        child._alias = child.name;
                        applyAlias(child);
                    });
                }
            }
            applyAlias(project);

            return origGetUrls.call(this, project);
        }

        return success;
    };
})();

// Trigger doc generation.
var files = app.expandInputFiles(["lib"]);
app.generateDocs(files, options.out);
if(options.json && options.json !== "") {
    app.generateJson(files, options.json);
}