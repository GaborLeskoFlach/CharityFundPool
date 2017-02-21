import {observable, action, IObservableArray, computed} from 'mobx';
import { _firebaseStorage } from '../firebaseAuth/component';

export class ImageUploadController {

    constructor() {
        this.file = '';
        this.imagePreviewUrl = '';
    }

    @observable file : any;
    @observable imagePreviewUrl : string;

    @action("Upload an image")
    setImageToUpload = action((file : any, imagePreviewUrl : string) => {
        this.file = file;
        this.imagePreviewUrl = imagePreviewUrl;        
    })

}
