type t = {bscFlags: array<string>}

let getGlobalyOpenedModules = bsConfig => {
  bsConfig.bscFlags
  ->Array.filter(bscFlag => {
    bscFlag->String.includes("-open")
  })
  ->Array.map(bscFlag => {
    bscFlag
    ->String.replace("-open", "")
    ->String.trim
    ->String.split(".")
    ->Array.unsafe_get(0)
    ->ModuleName.unsafeFromString
  })
}

let lint = (bsConfig, ~prohibitedModuleNames) => {
  let globalyOpenedModules = bsConfig->getGlobalyOpenedModules
  let maybeOpenedProhibitedModule = prohibitedModuleNames->Array.find(prohibitedModule => {
    globalyOpenedModules->Array.some(globalyOpenedModule => {
      globalyOpenedModule === prohibitedModule
    })
  })
  switch maybeOpenedProhibitedModule {
  | Some(openedProhibitedModule) => Error(#HAS_OPENED_PROHIBITED_MODULE(openedProhibitedModule))
  | None => Ok()
  }
}

let struct = S.json(
  S.object(o => {
    bscFlags: o->S.field("bsc-flags", S.option(S.array(S.string()))->S.defaulted([])),
  }),
)

let fromJsonString = jsonString => jsonString->S.parseWith(struct)->S.Result.mapErrorToString

module TestData = {
  let make = (~bscFlags) => {
    bscFlags: bscFlags,
  }
}
