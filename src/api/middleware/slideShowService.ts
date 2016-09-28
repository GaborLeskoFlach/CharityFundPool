import * as promise from 'es6-promise'

//Import WebAPI interfaces
import { ApiService } from '../../api/componentServices/slideShowService/service';
import { IApiService } from '../../api/componentServices/slideShowService/interfaces';

//Import Mock API service
import { IMockApiService_SlideShow } from '../../api/mockApi/slideShowService/interface';
import { MockApiService } from '../../api/mockApi/slideShowService/mockService';

export class Middleware_SlideShow {

    public fetchslides(mockIt:boolean) : Promise<any>{		

        if(mockIt)
        {            
            let apiService : IMockApiService_SlideShow = new MockApiService();
            return apiService.fetchSlides();
        }else{
            let apiService : IApiService = new ApiService();
            
            return apiService.fetchSlides().then(response => response.json())
        }
    }
}