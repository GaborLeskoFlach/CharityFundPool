import * as fetch from 'isomorphic-fetch';

export default class WebApiHeaders {

    private _headers : Headers;

    constructor()
    {
        this._headers = new Headers();
        this._headers.append("Access-Control-Allow-Origin","origin");
        this._headers.append("Content-Type","application/json; charset=utf-8");
        this._headers.append("Accept","application/json; odata=verbose");
    }  

    public get headers() :Headers {
        return this._headers
    }   
}