import * as promise from 'es6-promise'

//Import WebAPI interfaces
import { ApiService } from '../../api/componentServices/wsCarouselService/service';
import { IApiService } from '../../api/componentServices/wsCarouselService/interfaces';

//Import Mock API service
import { IMockApiService_WS } from '../../api/mockApi/wsCarouselService/interface';
import { MockApiService } from '../../api/mockApi/wsCarouselService/mockService';

export class Middleware_WS {

    public fetchWSItems(mockIt:boolean) : Promise<any>{		

        if(mockIt)
        {            
            let apiService : IMockApiService_WS = new MockApiService();
            return apiService.fetchMyWSData();
        }else{
            let apiService : IApiService = new ApiService();
            return apiService.fetchMyWSData().then(response => response.json());
        }
    }
}