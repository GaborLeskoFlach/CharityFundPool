import * as React from 'react';
import { WhoWeAreComponent } from '../whoweare/component';
import { WhatWeDoComponent } from '../whatwedo/component';
import { CauseListComponent } from '../causes/component';
import { FooterComponent } from '../footer/component';
import { RecentPostsComponent } from '../recentPosts/component';
import { VolunteerComponent } from '../volunteer/component';
import { ContactUsComponent } from '../contactUs/component';

export class HomeComponent extends React.Component<{},{}>{

    constructor(props)
    {
        super(props);
    }

    
    render(){
        return(
            <div>
                <div id="what-we-do">
                    <WhatWeDoComponent />
                </div>

                <div id="who-we-are">
                    <WhoWeAreComponent />
                </div>

                <div id="cause-list" className="padding-bottom">
                    <CauseListComponent />
                </div>

                <div id="recent-posts" className="padding-bottom padding-top-two">
                    <RecentPostsComponent />		
                </div>

                <div id="our-members" className="padding-top-two padding-bottom-two">
                    <VolunteerComponent />		
                </div>

                <div id="contact-us">	
                    <ContactUsComponent />	
                </div>

                <footer id="footer">
                    <FooterComponent />
                </footer>     
            </div>                   
        )
    }

}