class WebAPIURLBase{
    protected baseURL : string;

    constructor(){
        this.baseURL = 'https://idp.dw.oaktonapps.com/_dwapi/api';
    }

    getBaseURL() : string{
        return this.baseURL;
    }
}

export default class WebApiURLs extends WebAPIURLBase{

    constructor()
    {
        super();
    }

    get WebAPI_Alerts_Endpoint_URL() : string { return super.getBaseURL() + '/Alerts' };
    get WebAPI_News_Endpoint_URL() : string { return super.getBaseURL() + '/News' };
    get WebAPI_ETV_Endpoint_URL() : string { return super.getBaseURL() + '/ETV' };
    get WebAPI_WS_Endpoint_URL() : string { return super.getBaseURL() + '/WS' };

}