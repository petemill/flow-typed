/* @flow */

//accept router as function param to avoid having to import 'express'
function setupRoutes(bar: express$Router) {

  //body parsed-property access
  //https://github.com/expressjs/body-parser/blob/master/README.md
  //TODO error 'Function cannot be called on any member of intersection type'
  bar.post('/', (req: bodyparser$RequestBody, res: express$Response): void => {

    // json parsing
    // $ExpectError cannot access properties without a null check first
    const password: ?mixed = req.body.Password;
    if (req.body && typeof req.body === 'object') {
      // simple property value, unknown type or existence
      const usernameMixed: mixed = req.body.Username;
      // $ExpectError cannot infer type
      let usernameString: string = req.body.Username;
      if (req.body.Username) {
        const username: mixed = req.body.Username;
        // $ExpectError still cannot infer type
        usernameString = req.body.Username;
        // test type of value
        if (typeof req.body.Username === 'string') {
          // now can infer type
          usernameString = req.body.Username;
        }
      }
      // property value as object
      // $ExpectError cannot access properties without checking is object first
      const unknown: mixed = req.body.TestChild.gds;
      // type check property as object
      if (req.body.TestChild && typeof req.body.TestChild === 'object') {
        // allowed to refer to property as object now
        const asd: Object = req.body.TestChild;
        // allowed to directly access child property
        const help: mixed = req.body.TestChild.agdge;
      }
    }

    // text parsing
    // $ExpectError must detect that body was a string
    let bodyText: string = req.body;
    // detect if body is string
    if (typeof req.body === 'string') {
      // can infer string now
      bodyText = req.body;
    }

    // raw parsing
    // $ExpectError must detect that body is a buffer
    let bodyRaw: Buffer = req.body;
    // detect if body is raw Buffer
    if (req.body instanceof Buffer) {
      bodyRaw = req.body;
    }
  });

  // only configured for json body
  bar.post('/', (req: bodyparser$RequestBodyJson, res: $Response): void => {

    if (req.body) {
      const password: ?mixed = req.body.Password;
    }
  });

  // when only configured for 'text' body parsing
  // which by default sets req.body to {} when no body is found as text in the request
  bar.post('/', (req: bodyparser$RequestBodyText, res: $Response): void => {

    // $ExpectError never an acceptable type
    const bodyNumber:number = req.body;
    // $ExpectError still have to check for string
    let bodyString:string = req.body;
    if (typeof req.body === 'string') {
      bodyString = req.body;
    }
  });

  // when only configured for 'raw' body parsing
  // which by default sets req.body to {} when no body is found in the request
  bar.post('/', (req: bodyparser$RequestBodyRaw, res: $Response): void => {

    // $ExpectError never an acceptable type
    const bodyString:string = req.body;
    // $ExpectError still have to check for string
    let bodyContents:Buffer = req.body;
    if (req.body instanceof Buffer) {
      bodyContents = req.body;
    }
  });
}
