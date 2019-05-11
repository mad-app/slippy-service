import { Observable } from 'rxjs';

/*
  This is a data type for an APP.
  It will be the datatype for apps on market.
  The example App structure is as follow:

  {
    "name": "New data",
    "desc": "This is an testing environment for an app",
    "creator" : "creator_name"
  }
*/
interface Config {
  name : string,
  type : string,
  desc : string
}

interface Review {
  star : number,
  desc : string,
  writer : string,
  when : Number
}

export interface SlippyApp {
  name : string,
  desc : string,
  creator : string,
  createAt : Number,
  config? : Config[],
  review? : Review[],
  version? : string,
}

export abstract class AppData {
  abstract getApps(): Observable<SlippyApp[]>;
}
