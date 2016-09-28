import * as fetch from 'isomorphic-fetch';
import WebApiHeaders from '../serviceConfig/headers';

export default class WebApiRequestOptions{

    static requestOptions_POST: RequestInit = { method: "POST", headers: new WebApiHeaders().headers, cache: 'default', mode:'cors' };
    static requestOptions_GET: RequestInit = { method: "GET", headers: new WebApiHeaders().headers, cache: 'default', mode:'cors' };

}