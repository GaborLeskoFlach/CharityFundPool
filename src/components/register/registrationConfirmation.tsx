import * as React from 'react';
import { Link } from 'react-router';

export class RegistrationConfirmation extends React.Component<{},{}>{

    constructor(props){
        super(props);
    }

    render(){

        let style1 : React.CSSProperties = {
            paddingTop : '100px'
        }

        let style2 : React.CSSProperties = {
            textAlign : 'center'
        }
        return(

           <div className="container" style={style1}>
                <div className="section-title-center">
                    <h1>Thank you for registering with us</h1>				
                </div>

                <div className="text-center who-we-are padding-bottom-two padding-top-two">
                    <div className="row">
                        <div className="col-sm-12">
                            <h1>Bringing the community together</h1>
                            <h2>A CFP Consultant will let you know when you can log in</h2>
                        </div>        
                    </div>
                </div>       

			    <div className="row">
                    <div className="col-sm-4" />
				    <div className="col-sm-4" style={style2}>
                         <Link to='/' activeClassName='btn btn-primary'>Home</Link>
                    </div>
                    <div className="col-sm-4" />
                </div>
            </div>

        )
    }

}