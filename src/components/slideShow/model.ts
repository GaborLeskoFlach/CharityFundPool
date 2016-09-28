import {observable, action, IObservableArray, computed} from 'mobx';
import { ISlideShowCarouselData, DWLink } from './interfaces';
import { IDWSlideShowComponentProps } from './component'; 

//Import Middleware Service
import { Middleware_SlideShow } from '../../api/Middleware/slideShowService';

/// Represents JSON Response from WebAPI Call
export class DWSlideModel implements ISlideShowCarouselData{

    constructor(
            public Modified: string,
            public DWAUTBusinessStructure: string[],
            public DWAUTLocation: string[],
            public DWPublishedDate: string,
            public DWExpiryDate: string,
            public DWLink: DWLink,
            public ID: number,
            public DisplayName: string,
            public OriginalPath : string,
            public DWTitle : string,
            public DWNewsThumbnailImage :string,
            public DWNewsImage : string,
            public DWIsFeatured : boolean,
            public DWNewsShortdesc : string,
            public likesCount : number,
            public commentsCount : number)
        {
           ///Any other logic to be added here
        }
}

export class DWSlides {

    constructor() {
        this.currentSlideIndex = 0;       
        this.isLoading = true;
        this.slides = [];
        this.autoplay = true;
        this.autoplayID = 0;
        this.autoplayInterval = 3000;
        this.autoplayPaused = false;        
        this.showControls = false;
        this.showIndicators = true; 
    }

    @observable slides : Array<DWSlideModel>;
    @observable currentSlideIndex: number;
    @observable isLoading: boolean;
    @observable autoplay : boolean;
    @observable autoplayID : number;
    @observable autoplayInterval : number;
    @observable autoplayPaused : boolean;    
    @observable showIndicators : boolean;
    @observable showControls : boolean;

    @action("move slider right")
    toggleNext = action(() => {
        var current = this.currentSlideIndex;
        var next = current + 1;
        if (next > this.slides.length - 1) {
        next = 0;
        }
        this.currentSlideIndex = next;
    });

    @action("move slider left")
    togglePrev = action(() => {
        var current = this.currentSlideIndex;
        var prev = current - 1;
        if (prev < 0) {
        prev = this.slides.length - 1;
        }
        this.currentSlideIndex = prev;
    });

    @action("setting active index")
    toggleSlide = action((newIndex : number) => {
        var index = this.slides.map(function (el) {
            return (
                el.ID
            );
        });

        this.currentSlideIndex = index.indexOf(newIndex);     
    });


    ///////////////////////////////
    // Data Manipulation methods
    ///////////////////////////////
    getSlides(){

        let apiService : Middleware_SlideShow = new Middleware_SlideShow();
        this.isLoading = true;   
        let mockIt : boolean = true;    

        apiService.fetchslides(mockIt)  
            .then(response => {
                response.map((child : ISlideShowCarouselData) =>  
                    this.slides.push(
                        new DWSlideModel(
                            null,
                            null,
                            null,
                            null,
                            null,
                            null,
                            child.ID, 
                            child.DisplayName,
                            child.OriginalPath, 
                            child.DWTitle, 
                            child.DWNewsThumbnailImage, 
                            child.DWNewsImage,
                            child.DWIsFeatured, 
                            child.DWNewsShortdesc, 
                            child.likesCount, 
                            child.commentsCount
                            ))
                );

                this.isLoading = false;               
            })
    }
}

export class DWSlideShowCarouselMain implements IDWSlideShowComponentProps{    
    public slide : DWSlides;

    constructor(){
        this.slide = new DWSlides();
        this.slide.getSlides();
    }
}
