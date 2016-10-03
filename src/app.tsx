//React 
import * as React from 'react'
import * as ReactDOM from 'react-dom'

//React Router
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import AppFrame from './appFrame';
import { LoginComponent } from './components/login/component';
import { NotFoundComponent } from './components/notFound/component';
import { RecentPostsComponent } from './components/recentPosts/component';
import { DonateNowComponent } from './components/donateNow/component'; 
import { JoinUsComponent } from './components/joinUs/component';

import {Test1Component } from './components/test/test1Component';
import {Test2Component } from './components/test/test2Component';
import {Test3Component } from './components/test/test3Component';

import { HomeComponent } from './components/home/component';

//TODO : Gabor to figure out why Route params don't work

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={AppFrame} >
            <IndexRoute component={HomeComponent} />
            <Route path="/test1" component={Test1Component} />
            <Route path="/test2" component={Test2Component} />
            <Route path="/test3" component={Test3Component} />
            <Route path="/login" component={LoginComponent}/>
            <Route path="/donate" component={DonateNowComponent} />
            <Route path="/joinUs" component={JoinUsComponent}>
                <Route path="/joinUs/:type" component={JoinUsComponent} />
            </Route>             
        </Route>
        <Route path="*" component={NotFoundComponent} />
    </Router>,
    document.getElementById('body'));

