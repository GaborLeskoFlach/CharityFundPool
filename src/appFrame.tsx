import * as React from 'react';
import { WhoWeAreComponent } from './components/whoweare/component';
import { WhatWeDoComponent } from './components/whatwedo/component';
import { NavigationComponent } from './components/navigation/component'; 
import { CauseListComponent } from './components/causes/component';
import { FooterComponent } from './components/footer/component';
import { RecentPostsComponent } from './components/recentPosts/component';
import { VolunteerComponent } from './components/volunteer/component';
import { ContactUsComponent } from './components/contactUs/component';

export default class AppFrame extends React.Component<any, any> {
    render() {
        return (
            <div>
                <div className="preloader">
                    <div id="loaderImage"></div>
                </div>

                <header id="navigation">
                    <div className="navbar navbar-fixed-top animated fadeIn" role="banner">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="index.html">
                                    <h1><img className="img-responsive" src="templates/images/logo_custom.png" alt="Custom Logo Placeholder" /></h1>
                                </a>                    
                            </div>	
                        
                        <div id="navigation-placeholder"></div>
                            <NavigationComponent />
                        </div>                    
                    </div>
                </header>
                            
                <div id="firebase-content"></div>

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