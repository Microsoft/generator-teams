module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/Yotilities.ts":
/*!*******************************!*\
  !*** ./src/app/Yotilities.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const ts = __webpack_require__(/*! typescript */ "typescript");
let path = __webpack_require__(/*! path */ "path");
const packagePath = "package.json";
/**
 * Utility class for the Generator
 */
class Yotilities {
    /**
     * Validates a URL
     * @param url Url to validate
     */
    static validateUrl(url) {
        return /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
    }
    /**
     * Renames a file based on passed options
     * @param filename path and name to file
     * @param options object with replacement properties
     */
    static fixFileNames(filename, options) {
        if (filename !== undefined) {
            var basename = path.basename(filename);
            if (basename[0] === '_') {
                var filename = '.' + basename.substr(1);
                var dirname = path.dirname(filename);
                filename = path.join(dirname, filename);
            }
            for (var prop in options) {
                if (options.hasOwnProperty(prop) && typeof options[prop] === 'string') {
                    filename = filename.replace(new RegExp("{" + prop + "}", 'g'), options[prop]);
                }
            }
        }
        return filename;
    }
    static addAdditionalDeps(dependencies, fs) {
        var pkg = fs.readJSON(packagePath);
        dependencies.forEach(dep => {
            pkg.dependencies[dep[0]] = dep[1];
        });
        fs.writeJSON(packagePath, pkg);
    }
    static insertTsExportDeclaration(fileName, literal, comment, fs) {
        let clientTs = fs.read(fileName);
        const src = ts.createSourceFile(fileName, clientTs, ts.ScriptTarget.ES5, true, ts.ScriptKind.TS);
        const exp = ts.createExportDeclaration(undefined, undefined, undefined, ts.createLiteral(literal));
        if (comment !== undefined) {
            const cmt = ts.addSyntheticLeadingComment(exp, ts.SyntaxKind.SingleLineCommentTrivia, ` ${comment}`);
        }
        const update = ts.updateSourceFileNode(src, [
            ...src.statements,
            exp
        ]);
        const printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed,
            removeComments: false,
        });
        fs.write(fileName, printer.printFile(update));
    }
    static insertImportDeclaration(fileName, identifier, literal, comment, fs) {
        let clientTs = fs.read(fileName);
        const src = ts.createSourceFile(fileName, clientTs, ts.ScriptTarget.ES5, true, ts.ScriptKind.TS);
        const imp = ts.createImportDeclaration(undefined, undefined, ts.createImportClause(ts.createIdentifier(identifier), undefined), ts.createLiteral(literal));
        if (comment !== undefined) {
            const cmt = ts.addSyntheticLeadingComment(imp, ts.SyntaxKind.SingleLineCommentTrivia, ` ${comment}`);
        }
        const update = ts.updateSourceFileNode(src, [
            imp,
            ...src.statements
        ]);
        const printer = ts.createPrinter({
            newLine: ts.NewLineKind.LineFeed,
            removeComments: false,
        });
        fs.write(fileName, printer.printFile(update));
    }
}
exports.Yotilities = Yotilities;


/***/ }),

/***/ "./src/connector/ConnectorGenerator.ts":
/*!*********************************************!*\
  !*** ./src/connector/ConnectorGenerator.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const Generator = __webpack_require__(/*! yeoman-generator */ "yeoman-generator");
const lodash = __webpack_require__(/*! lodash */ "lodash");
const Yotilities_1 = __webpack_require__(/*! ./../app/Yotilities */ "./src/app/Yotilities.ts");
let yosay = __webpack_require__(/*! yosay */ "yosay");
let path = __webpack_require__(/*! path */ "path");
let Guid = __webpack_require__(/*! guid */ "guid");
class ConnectorGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        opts.force = true;
        this.options = opts.options;
        this.desc('Adds a Connector to a Microsoft Teams Apps project');
    }
    prompting() {
        if (this.options.connector) {
            return this.prompt([
                {
                    type: 'list',
                    name: 'connectorType',
                    message: 'What type of Connector would you like to include?',
                    default: 'new',
                    choices: [
                        {
                            name: 'An already existing and running Connector (not hosted in this solution)',
                            value: 'existing'
                        },
                        {
                            name: 'A new Connector hosted in this solution',
                            value: 'new'
                        }
                    ]
                },
                {
                    type: 'input',
                    name: 'connectorId',
                    message: 'What is the Id of your Connector (found in the Connector Developer Portal)?',
                    default: (answers) => {
                        return Guid.EMPTY;
                    },
                    validate: (input) => {
                        return Guid.isGuid(input);
                    }
                },
                {
                    type: 'input',
                    name: 'connectorName',
                    message: 'What is the name of your Connector?',
                    default: this.options.title,
                    validate: (input) => {
                        return input.length > 0;
                    },
                    when: (answers) => answers.connectorType != 'existing'
                },
            ]).then((answers) => {
                this.options.connectorId = answers.connectorId;
                this.options.connectorType = answers.connectorType;
                this.options.connectorTitle = answers.connectorName;
                this.options.connectorName = lodash.camelCase(answers.connectorName);
                if (!this.options.connectorName.endsWith('Connector')) {
                    this.options.connectorName = this.options.connectorName + 'Connector';
                }
                this.options.reactComponents = true;
            });
        }
    }
    writing() {
        if (this.options.connector) {
            if (this.options.connectorType != 'existing') {
                let templateFiles = [
                    "README-{connectorName}.md",
                    "src/app/{connectorName}.ts",
                    "src/app/web/{connectorName}.html",
                    "src/app/web/{connectorName}Connect.ejs",
                    "src/app/scripts/{connectorName}Connect.tsx",
                    "src/app/web/{connectorName}Connected.html"
                ];
                this.sourceRoot();
                templateFiles.forEach(t => {
                    this.fs.copyTpl(this.templatePath(t), Yotilities_1.Yotilities.fixFileNames(t, this.options), this.options);
                });
            }
            let manifestPath = "src/manifest/manifest.json";
            var manifest = this.fs.readJSON(manifestPath);
            manifest.connectors.push({
                connectorId: this.options.connectorId,
                scopes: ["team"],
            });
            this.fs.writeJSON(manifestPath, manifest);
            Yotilities_1.Yotilities.addAdditionalDeps([
                ['@types/ejs', '2.6.0'],
                ['@types/node-json-db', '0.0.1'],
                ['ejs', '2.6.1'],
                ['node-json-db', '0.7.5'],
                ["msteams-ui-components-react", "^0.7.3"],
                ["react", "^16.1.0"],
                ["@types/react", "16.4.7"],
                ["react-dom", "^16.2.0"],
                ["file-loader", "1.1.11"],
                ["typestyle", "1.7.2"]
            ], this.fs);
            // update client.ts
            Yotilities_1.Yotilities.insertTsExportDeclaration("src/app/scripts/client.ts", `./${this.options.connectorName}Connect`, `Automatically added for the ${this.options.connectorName} connector`, this.fs);
            Yotilities_1.Yotilities.insertTsExportDeclaration("src/app/TeamsAppsComponents.ts", `./${this.options.connectorName}`, `Automatically added for the ${this.options.connectorName} connector`, this.fs);
        }
    }
}
exports.ConnectorGenerator = ConnectorGenerator;


/***/ }),

/***/ "./src/connector/index.ts":
/*!********************************!*\
  !*** ./src/connector/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectorGenerator_1 = __webpack_require__(/*! ./ConnectorGenerator */ "./src/connector/ConnectorGenerator.ts");
module.exports = ConnectorGenerator_1.ConnectorGenerator;


/***/ }),

/***/ 4:
/*!**************************************!*\
  !*** multi ./src/connector/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\code\github\generator-teams/src/connector/index.ts */"./src/connector/index.ts");


/***/ }),

/***/ "guid":
/*!***********************!*\
  !*** external "guid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("guid");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "typescript":
/*!*****************************!*\
  !*** external "typescript" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("typescript");

/***/ }),

/***/ "yeoman-generator":
/*!***********************************!*\
  !*** external "yeoman-generator" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("yeoman-generator");

/***/ }),

/***/ "yosay":
/*!************************!*\
  !*** external "yosay" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("yosay");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map