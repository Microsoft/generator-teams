module.exports=function(t){var e={};function o(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=t,o.c=e,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(i,n,function(e){return t[e]}.bind(null,n));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=20)}([function(t,e){t.exports=require("path")},function(t,e){t.exports=require("yeoman-generator")},function(t,e){t.exports=require("lodash")},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=o(4);let n=o(0);const r="package.json";e.Yotilities=class{static validateUrl(t){return/(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(t)}static fixFileNames(t,e){if(void 0!==t){var o=n.basename(t);if("_"===o[0]){t="."+o.substr(1);var i=n.dirname(t);t=n.join(i,t)}for(var r in e)e.hasOwnProperty(r)&&"string"==typeof e[r]&&(t=t.replace(new RegExp("{"+r+"}","g"),e[r]))}return t}static addAdditionalDeps(t,e){var o=e.readJSON(r);t.forEach(t=>{o.dependencies[t[0]]=t[1]}),e.writeJSON(r,o)}static insertTsExportDeclaration(t,e,o,n){let r=n.read(t);const s=i.createSourceFile(t,r,i.ScriptTarget.ES5,!0,i.ScriptKind.TS),a=i.createExportDeclaration(void 0,void 0,void 0,i.createLiteral(e));void 0!==o&&i.addSyntheticLeadingComment(a,i.SyntaxKind.SingleLineCommentTrivia,` ${o}`);const u=i.updateSourceFileNode(s,[...s.statements,a]),c=i.createPrinter({newLine:i.NewLineKind.LineFeed,removeComments:!1});n.write(t,c.printFile(u))}}},function(t,e){t.exports=require("typescript")},function(t,e){t.exports=require("yosay")},function(t,e){t.exports=require("guid")},,,,,,,,,,,,,,function(t,e,o){t.exports=o(21)},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=o(22);t.exports=i.CustomBotGenerator},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=o(1),n=o(2),r=o(3);o(5),o(0),o(6);e.CustomBotGenerator=class extends i{constructor(t,e){super(t,e),e.force=!0,this.options=e.options,this.desc("Adds an outgoing webhook to a Teams project.")}prompting(){if(this.options.customBot)return this.prompt([{type:"input",name:"title",message:"Name of your outgoing webhook?",default:this.options.title+" Outgoing Webhook"}]).then(t=>{this.options.customBotTitle=t.title,this.options.customBotName=n.camelCase(t.title),this.options.customBotName.endsWith("OutgoingWebhook")||(this.options.customBotName=this.options.customBotName+"OutgoingWebhook")})}writing(){if(this.options.customBot){let t=["README-{customBotName}.md","src/app/{customBotName}.ts"];this.sourceRoot(),t.forEach(t=>{this.fs.copyTpl(this.templatePath(t),r.Yotilities.fixFileNames(t,this.options),this.options)}),r.Yotilities.insertTsExportDeclaration("src/app/TeamsAppsComponents.ts",`./${this.options.customBotName}.ts`,`Automatically added for the ${this.options.customBotName} outgoing webhook`,this.fs)}}}}]);