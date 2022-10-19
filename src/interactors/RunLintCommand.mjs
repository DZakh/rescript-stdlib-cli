// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Fs from "fs";
import * as Path from "path";
import * as Stdlib from "../Stdlib.mjs";
import * as ResFile from "../entities/ResFile.mjs";
import * as Process from "process";
import * as BsConfig from "../entities/BsConfig.mjs";
import * as SourceDirs from "../entities/SourceDirs.mjs";
import * as LintContext from "../entities/LintContext.mjs";

function make(loadBsConfig, loadSourceDirs) {
  var prohibitedModules = [
    "Belt",
    "Js",
    "ReScriptJs"
  ];
  return function () {
    return Stdlib.Result.flatMap(Stdlib.Result.flatMap(Stdlib.Result.flatMap(Stdlib.Result.mapError(loadBsConfig(), (function (loadBsConfigError) {
                              return {
                                      NAME: "BS_CONFIG_PARSE_FAILURE",
                                      VAL: loadBsConfigError.VAL
                                    };
                            })), (function (bsConfig) {
                          return Stdlib.Result.mapError(BsConfig.lint(bsConfig, prohibitedModules), (function (error) {
                                        return {
                                                NAME: "BS_CONFIG_HAS_OPENED_PROHIBITED_MODULE",
                                                VAL: error.VAL
                                              };
                                      }));
                        })), (function (param) {
                      return Stdlib.Result.mapError(loadSourceDirs(), (function (loadSourceDirsError) {
                                    return {
                                            NAME: "SOURCE_DIRS_PARSE_FAILURE",
                                            VAL: loadSourceDirsError.VAL
                                          };
                                  }));
                    })), (function (sourceDirs) {
                  var resFiles = SourceDirs.getProjectDirs(sourceDirs).flatMap(function (sourceDir) {
                          var fullDirPath = Path.resolve(Process.cwd(), sourceDir);
                          return Fs.readdirSync(fullDirPath).filter(function (dirItem) {
                                        return dirItem.endsWith(".res");
                                      }).map(function (dirItem) {
                                      return "" + fullDirPath + "/" + dirItem + "";
                                    });
                        }).map(function (resFilePath) {
                        return ResFile.make(Fs.readFileSync(resFilePath, {
                                          encoding: "utf8"
                                        }).toString(), resFilePath);
                      });
                  var lintContext = LintContext.make(undefined);
                  resFiles.forEach(function (resFile) {
                        ResFile.lint(resFile, lintContext, prohibitedModules);
                      });
                  var lintIssues = LintContext.getIssues(lintContext);
                  if (lintIssues.length !== 0) {
                    return {
                            TAG: /* Error */1,
                            _0: {
                              NAME: "LINT_FAILED_WITH_ISSUES",
                              VAL: lintIssues
                            }
                          };
                  } else {
                    return {
                            TAG: /* Ok */0,
                            _0: undefined
                          };
                  }
                }));
  };
}

export {
  make ,
}
/* fs Not a pure module */
