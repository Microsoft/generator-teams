module.exports=function(t){var e={};function o(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,o),s.l=!0,s.exports}return o.m=t,o.c=e,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(i,s,function(e){return t[e]}.bind(null,s));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=14)}([function(t,e){t.exports=require("path")},function(t,e){t.exports=require("yeoman-generator")},function(t,e){t.exports=require("lodash")},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=o(4);let s=o(0);const a="package.json";e.Yotilities=class{static validateUrl(t){return/(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(t)}static fixFileNames(t,e){if(void 0!==t){var o=s.basename(t);if("_"===o[0]){t="."+o.substr(1);var i=s.dirname(t);t=s.join(i,t)}for(var a in e)e.hasOwnProperty(a)&&"string"==typeof e[a]&&(t=t.replace(new RegExp("{"+a+"}","g"),e[a]))}return t}static addAdditionalDeps(t,e){var o=e.readJSON(a);t.forEach(t=>{o.dependencies[t[0]]=t[1]}),e.writeJSON(a,o)}static insertTsExportDeclaration(t,e,o,s){let a=s.read(t);const n=i.createSourceFile(t,a,i.ScriptTarget.ES5,!0,i.ScriptKind.TS),r=i.createExportDeclaration(void 0,void 0,void 0,i.createLiteral(e));void 0!==o&&i.addSyntheticLeadingComment(r,i.SyntaxKind.SingleLineCommentTrivia,` ${o}`);const p=i.updateSourceFileNode(n,[...n.statements,r]),c=i.createPrinter({newLine:i.NewLineKind.LineFeed,removeComments:!1});s.write(t,c.printFile(p))}}},function(t,e){t.exports=require("typescript")},function(t,e){t.exports=require("yosay")},function(t,e){t.exports=require("guid")},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.GeneratorTeamsAppOptions=class{constructor(){this.botid="",this.botType="",this.connectorType="",this.messageExtensionType=""}}},,,,,,,function(t,e,o){t.exports=o(15)},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=o(16);t.exports=i.BotGenerator},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const i=o(1),s=o(2),a=o(7),n=o(3);o(5),o(0);let r=o(6);e.BotGenerator=class extends i{constructor(t,e){super(t,e),e.force=!0,this.options=void 0===e.options?new a.GeneratorTeamsAppOptions:e.options,this.desc("Adds a Bot to a Teams project.")}prompting(){if(this.options.bot)return this.prompt([{type:"list",name:"bottype",message:"What type of Bot would you like to use?",default:"botframework",choices:[{name:"An already existing and running bot (not hosted in this solution)",value:"existing"},{name:"A new Bot Framework bot",value:"botframework"}]},{type:"input",name:"botname",message:"What is the name of your bot?",default:this.options.title+" Bot",validate:t=>t.length>0,when:t=>"existing"!=t.bottype},{type:"input",name:"botid",message:t=>{var e="I need the Microsoft App ID for the Bot. ";return"botframework"==t.botTye&&(e+="If you don't specify a value now, you will need to manually edit it later. "),e+="It's found in the Bot Framework portal (https://dev.botframework.com)."},default:t=>"botframework"==t.bottype?r.EMPTY:"",validate:t=>r.isGuid(t)},{type:"confirm",name:"staticTab",message:"Do you want to add a static tab to your bot?"},{type:"input",name:"staticTabName",message:"What is the title of your static tab for the bot? (max 16 characters)",validate:t=>t.length>0&&t.length<=16,when:t=>t.staticTab,default:t=>"About "+("existing"!=t.bottype?t.botname:this.options.title)}]).then(t=>{this.options.botid=t.botid,this.options.staticTab=t.staticTab,this.options.staticTabTitle=t.staticTabName,this.options.staticTabName=s.camelCase(t.staticTabName),this.options.botType=t.bottype,this.options.botTitle=t.botname,this.options.botName=s.camelCase(t.botname),this.options.botName.endsWith("Bot")||(this.options.botName=this.options.botName+"Bot"),this.options.staticTab&&(this.options.reactComponents=!0)})}writing(){if(this.options.bot){let o="src/manifest/manifest.json";var t=this.fs.readJSON(o),e={botId:this.options.botid,needsChannelSelector:!0,isNotificationOnly:!1,scopes:["team","personal"],commandLists:[{scopes:["team","personal"],commands:[{title:"Help",description:"Shows help information"}]}]};this.sourceRoot();let i=[];this.options.staticTab&&(i.push("src/app/scripts/{staticTabName}Tab.tsx","src/app/web/{staticTabName}Tab.html"),t.staticTabs.push({entityId:r.raw(),name:this.options.staticTabTitle,contentUrl:`${this.options.host}/${this.options.staticTabName}Tab.html`,scopes:["personal"]}),n.Yotilities.addAdditionalDeps([["msteams-ui-components-react","^0.7.3"],["react","^16.1.0"],["@types/react","16.4.7"],["react-dom","^16.2.0"],["file-loader","1.1.11"],["typestyle","1.5.1"]],this.fs)),t.bots.push(e),this.fs.writeJSON(o,t),"existing"!=this.options.botType&&(i.push("src/app/{botName}.ts"),i.push("README-{botName}.md")),i.forEach(t=>{this.fs.copyTpl(this.templatePath(t),n.Yotilities.fixFileNames(t,this.options),this.options)}),this.options.staticTab&&n.Yotilities.insertTsExportDeclaration("src/app/scripts/client.ts",`./${this.options.staticTabName}Tab`,`Automatically added for the ${this.options.staticTabName} bot tab`,this.fs),n.Yotilities.insertTsExportDeclaration("src/app/TeamsAppsComponents.ts",`./${this.options.botName}.ts`,`Automatically added for the ${this.options.botName} bot`,this.fs)}}}}]);