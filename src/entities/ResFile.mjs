// Generated by ReScript, PLEASE EDIT WITH CARE

import * as LintIssue from "./LintIssue.mjs";
import * as ModuleName from "./ModuleName.mjs";
import * as LintContext from "./LintContext.mjs";
import * as Stdlib_Option from "../stdlib/Stdlib_Option.mjs";

function make(content, path) {
  return {
          content: content,
          path: path,
          moduleName: Stdlib_Option.getExnWithMessage(ModuleName.fromPath(path), "A ResFile should always have a valid module name.")
        };
}

function lint(resFile, lintContext, prohibitedModuleNames, stdlibModuleName) {
  if (resFile.moduleName === stdlibModuleName || ModuleName.isSubmodule(resFile.moduleName, stdlibModuleName)) {
    var stdlibParentDirName = Stdlib_Option.getExnWithMessage(resFile.path.split("/").at(-2), "A ResFile should always have a directory name");
    if (stdlibModuleName.replace(/\W/g, "").toLowerCase() !== stdlibParentDirName.replace(/\W/g, "").toLowerCase()) {
      return LintContext.addIssue(lintContext, LintIssue.make(resFile.path, 0, {
                      TAG: /* ProhibitedModuleUsage */3,
                      _0: stdlibModuleName
                    }));
    } else {
      return ;
    }
  }
  resFile.content.split("\n").forEach(function (line, idx) {
        prohibitedModuleNames.forEach(function (prohibitedModule) {
              var openRe = new RegExp("^ *open " + prohibitedModule + "($|\\.)");
              if (openRe.test(line)) {
                LintContext.addIssue(lintContext, LintIssue.make(resFile.path, idx + 1 | 0, {
                          TAG: /* ProhibitedModuleOpen */0,
                          _0: prohibitedModule
                        }));
              }
              var includeRe = new RegExp("^ *include " + prohibitedModule + "($|\\.)");
              if (includeRe.test(line)) {
                LintContext.addIssue(lintContext, LintIssue.make(resFile.path, idx + 1 | 0, {
                          TAG: /* ProhibitedModuleInclude */1,
                          _0: prohibitedModule
                        }));
              }
              var assignRe = new RegExp("module.+= " + prohibitedModule + "($|\\.)");
              if (assignRe.test(line)) {
                LintContext.addIssue(lintContext, LintIssue.make(resFile.path, idx + 1 | 0, {
                          TAG: /* ProhibitedModuleAssign */2,
                          _0: prohibitedModule
                        }));
              }
              var usageRe = new RegExp("\\W" + prohibitedModule + "\\.");
              if (usageRe.test(line)) {
                return LintContext.addIssue(lintContext, LintIssue.make(resFile.path, idx + 1 | 0, {
                                TAG: /* ProhibitedModuleUsage */3,
                                _0: prohibitedModule
                              }));
              }
              
            });
      });
}

function checkIsResFile(dirItem) {
  if (dirItem.endsWith(".res")) {
    return true;
  } else {
    return dirItem.endsWith(".resi");
  }
}

export {
  make ,
  lint ,
  checkIsResFile ,
}
/* No side effect */
