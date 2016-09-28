import * as React from 'react';

import './styles.css'

export interface IDWLoaderComponentProps{
  height: any;
  width: any;
  loading : boolean;
}


export class DWLoaderComponent extends React.Component<IDWLoaderComponentProps,{}> {

  constructor() {
    super()    
  }

  render() {
    
    const style : React.CSSProperties = {
      height: this.props.height,
      width: this.props.width
    };

    let className : string = !this.props.loading ? 'ajaxloader-container-loaded' : '';

    if(this.props.loading)
    {
      return (
        <div id="ajaxloader-container" className={className} >
          <div id="ajaxloader" style={style}>          
          </div>
        </div>
      )
    }else
    {
      return (
        <div>
          {this.props.children}
        </div>
      )
    }
  }
}

