export interface DWLink {
	URL: string;
	Description: string;
}

export interface ISlideShowCarouselData {
	Modified: string;
	DWAUTBusinessStructure: string[];
	DWAUTLocation: string[];
	DWPublishedDate: string;
	DWExpiryDate: string;
	DWLink: DWLink;	
	OriginalPath:string;
	ID: number;
	DisplayName: string;
	DWTitle:string;
	DWIsFeatured : boolean;
	DWNewsShortdesc : string;
	DWNewsThumbnailImage : string;
	DWNewsImage : string;	
	likesCount : number;
	commentsCount : number;
}