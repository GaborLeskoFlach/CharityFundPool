import * as React from 'react';
import { Link } from 'react-router';
import { _isUserLoggedIn, signIn, _firebaseApp } from './components/firebaseAuth/component';
import {observer} from 'mobx-react';
import {observable, action } from 'mobx';

enum TabType {
    Home = 1,
    AboutUs = 2,
    Donate = 3,
    ViewNeeds = 4,
    ContactUs = 5,
    SearchForJobs = 6,
    Administration = 7,
    SignInOut = 8
}

interface INavigationComponentProps{
    children : any;
    history: any;
}

interface ITabProps{
    tabProps : ITab;
    handleClick : () => void;
    history:any;
}

interface ITab{
    id : number;
    name : string;
    to? : string;  
    tabType : TabType;
}

let tabList : Array<ITab>  = [
    { id: 1, name: 'Home', to:'/home', tabType : TabType.Home },
    { id: 2, name: 'About Us', to:'/aboutUs', tabType : TabType.AboutUs },
    { id: 3, name: 'Donate', to:'/donate', tabType : TabType.Donate },
    { id: 4, name: 'View Needs', to:'/viewNeeds', tabType : TabType.ViewNeeds },   
    { id: 5, name: 'Contact Us', to:'/contactUs', tabType : TabType.ContactUs },      
    { id: 6, name: 'Search for Jobs',  to:'/jobs', tabType : TabType.SearchForJobs },
    { id: 7, name: 'Administration',  to:'/administration', tabType : TabType.Administration },
    { id: 8, name: 'Sign In',  to:'/login', tabType : TabType.SignInOut },
];

class Tab extends React.Component<ITabProps,{}>{
    
    constructor(props){
        super(props);
    }

    render(){        
        const { to, name }  : any = this.props.tabProps;

        return(
                            
            <li className='active'>
                <Link activeClassName="active" to={to} onClick={this.props.handleClick.bind(this) } >{ name }</Link>             
            </li>            
        )
    }
}

@observer
export default class AppFrame extends React.Component<INavigationComponentProps,{}>{
    @observable userLoggedIn : boolean = false;

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);        

        _firebaseApp.auth().onAuthStateChanged((user) => {
            if(user){
                this.userLoggedIn = true;
            }else{
                this.userLoggedIn = false;
            }
        });
    }

/*
        //Is this the right place to do this?
        console.log('onAuthStateChanged');

        //1. Get Mapping info for logged in User by uid
        //2. Mapping info will contain ProfileImageURL (if populated...should be otherwise Admin shouldn't be allowed to Enable particular Access to system)
        //3. Update Current User's PhotoURL property
        //4. Now current user's photo should be displayed in the Nav Bar        
        this.getMappingInfoForUser(user.uid).then(response => {
            user.updateProfile({
                displayName: "Jane Q. User",
                photoURL: response.profileImageURL
            }).then(function() {
                console.log('Update successful');
            }, function(error) {
                console.log('An error happened');
            });
        });
*/

    doesItWork(value:boolean) {
        console.log('does it work? => {0}', value);
    }

    handleClick(tab : ITab){
       console.log('Click a Tab: ' + tab.name);
    }

    durationFn(deltaTop : number) {
        return deltaTop;
    }

    renderTab = (index : number, tab : ITab) => {

        if(tab.tabType === TabType.SignInOut){
            if(this.userLoggedIn){
                tab.name = 'Sign Out';
                tab.to = '/login/signout';                
            }else{
                tab.name = "Sign In";
                tab.to = '/login';
            }
        }

        return (
            <Tab key={index} tabProps={tab} handleClick={() => this.handleClick} history={this.props.history} />
        )
    }

    render(){

        return(
            <div>
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
                                    <h4>Hello, John</h4>
                                </a>                    
                            </div>	

                            <nav className="collapse navbar-collapse navbar-right">					
                                <ul className="nav navbar-nav">                                    
                                    
                                    {tabList.map((tab : ITab, index : number) => {
                                        return (this.renderTab(index, tab))
                                    })}
                                </ul>		
                            </nav>      
                        </div>
                    </div>
                </header>
                
                {this.props.children}

            </div>
        )
    }
}

