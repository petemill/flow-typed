// @flow
import type {
    $Request
} from 'express';

declare class bodyparser$RequestBodyJson extends $Request {
  body: {[key: string]: mixed};
}

declare class bodyparser$RequestBodyText extends $Request {
  body: string | Object;
}

declare class bodyparser$RequestBodyRaw extends $Request {
  body: Buffer | Object;
}

declare type bodyparser$RequestBody = bodyparser$RequestBodyRaw | bodyparser$RequestBodyText | bodyparser$RequestBodyJson;

declare module 'body-parser' {

  //scoped type references for module (an attempt)
  // declare type $RequestBodyJson = bodyparser$RequestBodyJson;
  // declare type $RequestBodyText = bodyparser$RequestBodyText;
  // declare type $RequestBodyRaw = bodyparser$RequestBodyRaw;

  //TODO middleware initialization functions: json(), raw(), urlencoded(), text()
}
