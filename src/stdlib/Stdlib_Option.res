include Belt.Option

let getExn = ()

let getExnWithMessage = (option, message) => {
  switch option {
  | Some(value) => value
  | None => Js.Exn.raiseError(message)
  }
}
