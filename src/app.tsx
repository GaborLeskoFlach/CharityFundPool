//React 
import * as React from 'react'
import * as ReactDOM from 'react-dom'

//React Router
import { Router, Route, browserHistory } from 'react-router';
import AppFrame from './appFrame';
import { LoginComponent } from './components/login/component';
import { NotFoundComponent } from './components/notFound/component';
import { RecentPostsComponent } from './components/recentPosts/component';
import { DonateNowComponent } from './components/donateNow/component'; 
import { JoinUsComponent } from './components/joinUs/component';

//import { NavigationComponent } from './components/navigation/component'; 

//ReactDOM.render(<NavigationComponent />, document.getElementById('navigation-placeholder'));

ReactDOM.render(<Router history={browserHistory}>
        <Route path="/" component={AppFrame} />        
        <Route path="/login" component={LoginComponent}/>
        <Route path="/donate" component={DonateNowComponent} />
        <Route path="/joinUs" component={JoinUsComponent} />
        <Route path="*" component={NotFoundComponent} />
    </Router>,document.getElementById('body'));

