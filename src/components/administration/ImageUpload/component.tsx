import * as React from 'react';
import { _firebaseStorage } from '../../firebaseAuth/component';
let FirebaseFileUploader = require('react-firebase-file-uploader').default;

interface IState{
      username?: string;
      avatar?: string;
      isUploading?: boolean;
      progress?: number;
      avatarURL?: string;
}

export class ProfilePage extends React.Component<{},IState> {
  
    constructor(props){
        super(props);

        this.state = {
            username: '',
            avatar: '',
            isUploading: false,
            progress: 0,
            avatarURL: ''          
        }
    }

    handleChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    handleUploadStart = () => {
        this.setState({isUploading: true, progress: 0});
    }

    handleProgress = (progress) => {
        this.setState({progress});
    }

    handleUploadError = (error) => {
        this.setState({isUploading: false});
        console.error(error);
    }

    handleUploadSuccess = (filename) => {
        this.setState({
            avatar: filename, 
            progress: 100, 
            isUploading: false
        });

        _firebaseStorage.ref('images').child(filename).getDownloadURL()
        .then(url => {
            this.setState({avatarURL: url})
        }).catch(error =>{
            console.log('Ooops something went wrong => {0}', error.message);
        })
    }

    render() {
        return (
        <div className="container">
            <div className="section-title-center">
                <h1>Welcome to Charity Fund Pool</h1>				
            </div>
            <div className="text-center who-we-are">
                <div className="row">
                    <div className="col-sm-12">
                            <form>
                                <label>Username:</label>
                                <input type="text" value={this.state.username} name="username" onChange={this.handleChangeUsername} />
                                <label>Avatar:</label>
                                
                                {this.state.isUploading &&
                                    <p>Progress: {this.state.progress}</p>
                                }
                                {this.state.avatarURL &&
                                    <img src={this.state.avatarURL} />
                                }
                                
                                <FirebaseFileUploader
                                    accept="image/*"
                                    name="avatar"
                                    storageRef={_firebaseStorage.ref('images')}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    onProgress={this.handleProgress}
                                />
                            </form>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}