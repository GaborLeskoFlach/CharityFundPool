import * as React from 'react';

export interface IFooterComponentProps{

}

export class FooterComponent extends React.Component<IFooterComponentProps,{}>{

    constructor(props){
        super(props);
    }


    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <a href="index.html"><img className="img-responsive" src="" alt="Logo" /></a>
                    </div>
                    <div className="col-sm-4">
                        <div className="copyright-text">
                            <p>&copy; copyright 2016 by <a href="#"> LiquidSpaceDesign Ltd.</a> All rights reserved.</p>
                        </div>					
                    </div>
                    <div className="col-sm-4">
                        <div className="footer-socials">
                            <ul>
                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                <li><a href="#"><i className="fa fa-vimeo-square"></i></a></li>
                                <li><a href="#"><i className="fa fa-youtube"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}