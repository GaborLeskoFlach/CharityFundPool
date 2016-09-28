import delay from "../delay";

//Import MockApi Interface
import { IMockApiService_WS } from './interface';

//Import Data from files
import wsItems from './data';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

export class MockApiService implements IMockApiService_WS {

  public fetchMyWSData() {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], wsItems));
      }, delay);
    });
  }
}


