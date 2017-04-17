//React 
import * as React from 'react'
import * as ReactDOM from 'react-dom'

//React Router
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import AppFrame from './appFrame';
import { LoginComponent } from './components/login/component';
import { NotFoundComponent } from './components/notFound/component';
import { ContactUsComponent } from './components/contactUs/component';
import { WhoWeAreComponent } from './components/whoWeAre/component'; 
import { HomeComponent } from './components/home/component';
import { RegisterNeedHelpComponent  } from './components/register/NeedHelp/component'; 
import { RegistrationConfirmation } from './components/register/registrationConfirmation';
import { Jobs } from './components/jobs/component';
import { Administration } from './components/administration/component';
import { HowToHelpComponent } from './components/register/HowToHelp/component';
import { RegisterWantToHelpComponent } from './components/register/WantToHelp/component';
import { PasswordReset } from './components/login/passwordReset/component';
import { SignOut } from './components/login/signOut/component';

import { DonateNowComponent } from './components/donateNow/component';

import { requireAuth } from '../src/components/firebaseAuth/component';
import { ListView } from './components/lists/simpleList';
import { BootstrapList } from './components/lists/bootstrapList';

import { NeedList } from './components/needs/needList';
import { GoogleMapHost } from './components/googleMaps/host';
import { FirebaseFileUpload } from './components/administration/ImageUpload/component';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={AppFrame} >
            <IndexRoute component={HomeComponent} />
            <Route path="/home" component={HomeComponent} />
            <Route path="/register/howToHelp" component={HowToHelpComponent} />
            <Route path="/register/WantToHelp(/:ID)" component={RegisterWantToHelpComponent} /> 
            <Route path="/register/:requestType(/:Type)(/:ID)" component={RegisterNeedHelpComponent} />                    
            <Route path="/confirm" component={RegistrationConfirmation } />    
            <Route path="/aboutUs" component={WhoWeAreComponent} />
            <Route path="/donate(/:causeId)" component={DonateNowComponent} />
            <Route path="/viewNeeds" component={NeedList} onEnter={requireAuth} />          
            <Route path="/contactUs" component={ContactUsComponent} />
            <Route path="/login" component={LoginComponent}/>
            <Route path="/login/passwordReset" component={PasswordReset}/>
            <Route path="/login/signout" component={SignOut}/>     
            <Route path="/jobs" component={Jobs} onEnter={requireAuth} />
            <Route path="/administration" component={Administration} onEnter={requireAuth} />
        </Route>
        <Route path="*" component={NotFoundComponent} />
    </Router>,
    document.getElementById('body'));



    /* How to connect to Node API https://typescript-node-api-pyjfiuehfx.now.sh/api/v1/users */

