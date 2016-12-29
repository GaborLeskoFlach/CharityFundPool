import * as React from 'react';
import { ImageUploadController } from './controller';
import {observer} from 'mobx-react';
import './styles.css';

@observer
export class ImageUpload extends React.Component<{},{}> {
  controller : ImageUploadController;

  constructor(props) {
    super(props);
    this.controller = new ImageUploadController();
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.controller.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {      
        this.controller.setImageToUpload(file, reader.result);
    }

    reader.readAsDataURL(file)
  }

  render() {
    let { imagePreviewUrl } = this.controller;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">

          <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />


        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}
