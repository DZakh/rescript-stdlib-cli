// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Lint from "./interactors/Lint.mjs";
import * as RunCli from "./interactors/RunCli.mjs";
import * as LoadBsConfig from "./interactors/LoadBsConfig.mjs";
import * as LoadSourceDirs from "./interactors/LoadSourceDirs.mjs";
import * as RunHelpCommand from "./interactors/RunHelpCommand.mjs";
import * as RunLintCommand from "./interactors/RunLintCommand.mjs";
import * as RunHelpLintCommand from "./interactors/RunHelpLintCommand.mjs";

var runCli = RunCli.make(RunLintCommand.make(Lint.make(LoadBsConfig.make(undefined), LoadSourceDirs.make(undefined))), RunHelpCommand.make(undefined), RunHelpLintCommand.make(undefined));

runCli();

export {
  runCli ,
}
/* runCli Not a pure module */
