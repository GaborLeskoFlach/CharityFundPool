import * as promise from 'es6-promise'
import { IApiService } from './interfaces';
import WebApiHeaders from '../../serviceConfig/headers';
import WebApiRequestOptions from '../../serviceConfig/requestOptions';
import webApiUrls from '../../serviceConfig/webApiBaseUrl';
import webApiActionMethods from '../../serviceConfig/webApiActionMethods';

export class ApiService implements IApiService{

  private baseUrl : string;
	private headers : Headers;
	private requestOptions : RequestInit;

  constructor(){
    this.baseUrl = new webApiUrls().WebAPI_News_Endpoint_URL;
  }

	public fetchSlides() : Promise<any>{			
			this.headers = new WebApiHeaders().headers;
			this.requestOptions = WebApiRequestOptions.requestOptions_POST;

			const url : string = webApiActionMethods.GetNewsItems;
			return fetch(this.baseUrl + url,this.requestOptions);
	}
}
