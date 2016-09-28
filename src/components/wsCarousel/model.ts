import {observable, action, IObservableArray, computed} from 'mobx';
import { IWSItemData} from './interfaces';
import { IDWMyWorkspacesComponentProps } from './component'; 

import Constants from '../constants';

import { List } from '../../utils/linq.ts';

//Import Middleware Service
import { Middleware_WS } from '../../api/Middleware/wsService';




/// Represents JSON Response from WebAPI Call
export class DWMyWorkspacesModel implements IWSItemData{

    constructor(
            public ID : number,
	        public Title : string,
	        public URL : string,
	        public WkspcAvatarImage : string,
	        public Created : Date,
	        public WkspcType : string)
        {
        }
}

export enum SortDropdownValues{
  Default,
  Alphabetical,
  LastCreated,
  Type
}

export interface IMyWorkspaceSlides {
    slides : Array<IWSItemData>;
    index : number;
}

export class MyWorkspaceSlides implements IMyWorkspaceSlides{
    constructor(
        public slides: Array<IWSItemData>,
        public index : number){
    }
}

export class DWMyWorkspaces {

    constructor() {
        this.currentSlideIndex = 0;       
        this.isLoading = true;
        this.slides = [];
        this.autoplay = false;
        this.autoplayID = 0;
        this.autoplayInterval = 3000;
        this.autoplayPaused = false;        
        this.showControls = true;
        this.showIndicators = true; 
        this.itemsPerSlide = 6;
        this.myWorkspaces = new List<IWSItemData>();
        this.selectionHasChanged = false;
    }

    @observable slides : Array<IMyWorkspaceSlides>;
    myWorkspaces :  List<IWSItemData>;
    @observable currentSlideIndex: number;
    @observable isLoading: boolean;
    @observable autoplay : boolean;
    @observable autoplayID : number;
    @observable autoplayInterval : number;
    @observable autoplayPaused : boolean;    
    @observable showIndicators : boolean;
    @observable showControls : boolean;
    @observable itemsPerSlide : number;
    @observable selectionHasChanged : boolean;

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
                el.index
            );
        });

        this.currentSlideIndex = index.indexOf(newIndex);     
    });

    @action("Sort dropdown selection has changed")
    onSelectedChange = action((selectedOption:string) => {        

        switch(selectedOption){
            case SortDropdownValues.Default.toString():                   
                this.myWorkspaces.OrderByDescending(x => x.Created);              
                break;
            case SortDropdownValues.Alphabetical.toString():
                this.myWorkspaces.OrderByDescending(x => x.Title);
                break;
            case SortDropdownValues.LastCreated.toString():                
                this.myWorkspaces.OrderBy(x => x.Created);
                break;
            case SortDropdownValues.Type.toString():                                
                this.myWorkspaces.OrderBy(x => x.WkspcType).ThenByDescending(x => x.Created);
                break;
        }

        this.populateSlidesWithContent(true);
    })

    

    ///////////////////////////////
    // Data Manipulation methods
    ///////////////////////////////

    populateSlidesWithContent(hasWorkspacesAlreadyOrdered:boolean){
        this.slides = [];

        if(!hasWorkspacesAlreadyOrdered){
            this.myWorkspaces.OrderByDescending(x => x.Created);
        }

        //Clone the original Array so we can work with the clone below and the original won't mutate.
        let myWorkspacesClone : Array<IWSItemData> = this.myWorkspaces.ToArray().slice();

        //Calculate how many Slides we're going to have based on slides.lenght and itemsPerSlide
        let noOfSlides : number = Math.ceil(myWorkspacesClone.length / this.itemsPerSlide);

        for(var i = 0; i <= noOfSlides - 1; i++){                    
            let workspacesPerSlide : Array<IWSItemData> = myWorkspacesClone.splice(0, this.itemsPerSlide);
            let slide : IMyWorkspaceSlides = new MyWorkspaceSlides(workspacesPerSlide,i);       
            this.slides.push(slide);
        }
    }

    getSlides(){

        let apiService : Middleware_WS = new Middleware_WS();
        this.isLoading = true;   
        let mockIt : boolean = true;            

        apiService.fetchWSItems(mockIt)  
            .then(response => {
                response.map((child : IWSItemData, index:number) =>  
                    this.myWorkspaces.Add(
                        new DWMyWorkspacesModel(                          
                            child.ID,
                            child.Title,
                            child.URL,
                            child.WkspcAvatarImage,
                            child.Created,
                            child.WkspcType
                            ))
                );
                
                let hasWorkspacesAlreadyOrdered : boolean = false;
                this.populateSlidesWithContent(hasWorkspacesAlreadyOrdered);

                this.isLoading = false;               
            })
    }
}

export class DWMyWorkspacesMain implements IDWMyWorkspacesComponentProps{    
    public slide : DWMyWorkspaces;

    constructor(){
        this.slide = new DWMyWorkspaces();
        this.slide.getSlides();
    }
}
