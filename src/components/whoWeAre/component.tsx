import * as React from 'react';

export interface IWhoWeAreComponentProps{

}

export class WhoWeAreComponent extends React.Component<IWhoWeAreComponentProps,{}>{

    constructor(props){
        super(props);
    }

    render(){


        const customStyle : React.CSSProperties = {
            textAlign : 'left'
        }

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
                                            <li><a href="#mission" role="tab" data-toggle="tab">Our Mission </a></li>
                                        </ul>
                                       
                                        <fieldset className="tab-content">
                                            <div className="tab-pane fade in active" id="ourStory" style={customStyle}>
                                                <ul>
                                                    <li><h4>Hi,</h4></li>
                                                    <br/>
                                                    <li><h4>My name is Michael Alexandrakis (Drakis) and I am the Founder of Charity Fund Pool (C.F.P.)</h4></li>
                                                    <br/>
                                                    <li><h4>It is my pleasure to welcome you to our community and I sincerely hope you get as much out of C.F.P. as I and many others already have.</h4></li>
                                                    <li><h4>We are a not for profit website designed to make giving and receiving help as easy as possible. This will become your one stop shop for anything volunteer or donation related.</h4></li>
                                                    <li><h4>Having been through all the ups and downs life can throw at you I am fully aware of how hard it can be to get the help you need at times. I am also aware it can also be quite a challenge providing help to those who need it through the right channels. Through out all of my life I have always tried to be there for friends and family. I have also had times when I have needed help from those close to me.</h4></li>
                                                    <li><h4>A few years ago I decided to look in to doing regular volunteer work in a formal capacity in my community. Well, this was clearly not going to be as easy as it sounded. Lucky for me I was pointed in the right direction by a friend and I have been doing a regular Saturday shift ever since. I absolutely love it. Meet great people, have some fun and contribute by giving back to my community.</h4></li>
                                                    <li><h4>When I decided I wanted to give back and do some volunteer work in my community the first thing that struck me was how difficult it was. Where do I start looking? Which organisation will suit my desires and skill set? How do I go about signing up? Why do I have to give so much notice before being booked in? What if my free time doesn’t fit in with their requirements?</h4></li>
                                                    <li><h4>All of these questions made wanting to give my free time to help in a volunteer capacity very difficult indeed. While going through this long winded process I quickly came to the conclusion that there must be a better way. Through my work I have also met a number of people who feel the same as me so I started thinking of ways to make the process far more user friendly.</h4></li>
                                                    <li><h4>As founder of C.F.P. it became my mission to make it as easy as possible for people who need help to get it and for those who want to help to provide it. Using the technology which is now at our fingertips we have provided a very simple online community designed specifically to cater for each individual or charity organisation’s needs.</h4></li>
                                                    <li><h4>Once you have registered as wanting to help you can browse jobs in your area that suit your skill set and time restraints. With a simple click of a button you are away.</h4></li>
                                                    <li><h4>We are also raising funds to support charities registered on our website. No money will be given direct to charities. Instead the funds raised will go towards providing goods and facilities for these organisations, which we will purchase and deliver direct. To enable C.F.P. members to keep track of all funds raised we will link every dollar to a project.</h4></li>
                                                    <li><h4>It is our guarantee the 90% of the funds raised will go direct to providing the goods and facilities to make life easier for those in need. The remaining 10% will go towards running C.F.P.</h4></li>
                                                    <li><h4>So register now (if you haven’t already done so) and help make your community a better place to live.</h4></li>
                                                    <li><h4>Thank you for taking the time to visit our website and please tell all your friends if you agree that C.F.P. will make a difference in your community.</h4></li>
                                                    <br />
                                                    <li><h4>Warmest Regards,</h4></li>
                                                    <br/>
                                                    <li><h4>Michael Alexandrakis</h4></li>
                                                    <br/>
                                                    <li><h4>Founding Member</h4></li>
                                                    <br/>
                                                    <li><h4>Charity Fund Pool</h4></li>
                                                </ul>                                              
                                            </div>
                                            <div className="tab-pane fade " id="mission" style={customStyle}>								
                                                <h2>Gold Coin Donations</h2>
                                                <br/>
                                                <ul>
                                                    <li><h4>Supplying resources, equipment and labour direct to charities </h4></li>
                                                    <br/>
                                                    <li><h4>Providing a forum to connect those who need help with those who want to help</h4></li>
                                                    <br/>
                                                    <li><h4>Guaranteed minimum of 90% of funds raised go direct</h4></li>
                                                    <br/>
                                                    <li><h4>A running total along with an account of where every dollar goes can be viewed online</h4></li>
                                                    <br/>
                                                    <li><h4>All requests for assistance can be viewed online</h4></li>
                                                </ul>
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