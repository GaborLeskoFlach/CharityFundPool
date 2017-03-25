import * as React from 'react';

export interface IWhoWeAreComponentProps{

}

export class WhoWeAreComponent extends React.Component<IWhoWeAreComponentProps,{}>{

    constructor(props){
        super(props);
    }

    render(){
        return(
            
            <div className="container">
                <div className="section-title">
                    <h1>Who we are</h1>
                </div>
                <div className="row">
                    <div id="donate-section">   
                        <div className="container">
                            <div className="donate-section padding">				
                                <div className="donate-tab text-center">
                                    <div id="donate">
                                        <ul className="tab-list list-inline" role="tablist" >
                                            <li className="active"><a href="#ourStory" role="tab" data-toggle="tab">Our Story</a></li>
                                            <li><a href="#mission" role="tab" data-toggle="tab">Mission </a></li>
                                            <li><a href="#ourActivity" role="tab" data-toggle="tab">Our Activity </a></li>
                                        </ul>
                                       
                                        <fieldset className="tab-content">
                                            <div className="tab-pane fade in active" id="ourStory">
                                                <h4>Give the Life-changing Gift of Education in Citytown.</h4>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> <p>I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth,</p>
                                            </div>
                                            <div className="tab-pane fade " id="mission">								
                                                <h1>CHARITY FUND POOL</h1>
                                                <h2>GOLD COIN DONATIONS</h2>
                                                <ul>
                                                    <li><h3>Supplying resources, equipment and labour direct to charities </h3></li>
                                                    <li><h3>Providing a forum to connect those who need help with those who want to help</h3></li>
                                                    <li><h3>Guaranteed minimum of 90% of funds raised go direct</h3></li>
                                                    <li><h3>A running total along with an account of where every dollar goes can be viewed online</h3></li>
                                                    <li><h3>All requests for assistance can be viewed online</h3></li>
                                                </ul>
                                            </div>
                                            <div className="tab-pane fade " id="ourActivity">								
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p> <p>I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth,</p>
                                            </div>                                
                                        </fieldset>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                   
            </div>   
        )
    }

}