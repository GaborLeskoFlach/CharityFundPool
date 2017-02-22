import * as React from 'react';
import { _firebaseStorage } from '../../firebaseAuth/component';
let FirebaseFileUploader = require('react-firebase-file-uploader').default;

interface IFirebaseFileUpload{
    onFileUploaded : (uploadedFileURL : string) => void;
    onFileUploadFailed : (error : string) => void;
}

interface IState{
      username?: string;
      avatar?: string;
      isUploading?: boolean;
      progress?: number;
      avatarURL?: string;
}

export class FirebaseFileUpload extends React.Component<IFirebaseFileUpload,IState> {
  
    constructor(props){
        super(props);

        this.state = {
            avatar: '',
            isUploading: false,
            progress: 0,
            avatarURL: ''          
        }
    }

    handleUploadStart = () => {
        this.setState({isUploading: true, progress: 0});
    }

    handleProgress = (progress) => {
        this.setState({progress});
    }

    handleUploadError = (error) => {
        this.setState({isUploading: false});
        this.props.onFileUploadFailed(error);
    }

    handleUploadSuccess = (filename) => {
        this.setState({
            avatar: filename, 
            progress: 100, 
            isUploading: false
        });

        _firebaseStorage.ref('profileImages').child(filename).getDownloadURL()
        .then(url => {
            this.setState({avatarURL: url})
            this.props.onFileUploaded(url);
        }).catch(error =>{
            this.props.onFileUploadFailed(error.message);
            console.log('Ooops something went wrong => {0}', error.message);
        })
    }

    render() {
        return (
            <FirebaseFileUploader
                accept="image/*"
                name="avatar"
                storageRef={_firebaseStorage.ref('profileImages')}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
            />
        )
    }
}