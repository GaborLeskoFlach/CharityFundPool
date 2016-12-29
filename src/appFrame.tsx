import * as React from 'react';
import { Link } from 'react-router';
import { isUserLoggedIn, signIn } from './components/firebaseAuth/component';

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
    requiresAuthentication : boolean;  
}

let tabList : Array<ITab>  = [
    { id: 1, name: 'Home', to:'/home', requiresAuthentication : false},
    { id: 2, name: 'About Us', to:'/aboutUs', requiresAuthentication : false},
    { id: 3, name: 'Donate', to:'/donate', requiresAuthentication : false},
    { id: 4, name: 'View Needs', to:'/viewNeeds', requiresAuthentication : false},   
    { id: 5, name: 'Contact Us', to:'/contactUs', requiresAuthentication : false},      
    { id: 7, name: 'Search for Jobs',  to:'/jobs', requiresAuthentication : false},
    { id: 8, name: 'Administration',  to:'/administration', requiresAuthentication : false},
    { id: 9, name: 'Sign In',  to:'/login', requiresAuthentication : false},
    { id: 9, name: 'Sign Out',  to:'/login/signout', requiresAuthentication : false},
];

/*
function userLoggedIn() : string{
    if(isUserLoggedIn()){
        return 'Sign Out';
    }else{
        return 'Sign In';
    }
}

function shouldSignOut(){
    if(isUserLoggedIn()){
        return '/login/signout';
    }else{
        return '/login';
    }
}
*/

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


export default class AppFrame extends React.Component<INavigationComponentProps,{}>{
    
    private isUserAuthenticated : boolean = false;

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(tab : ITab){
       console.log('Click a Tab: ' + tab.name);
    }

    durationFn(deltaTop : number) {
        return deltaTop;
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
                                    <h1><img className="img-responsive" src="templates/images/default_profile_image.png" alt="User profile image" /></h1>
                                </a>                    
                            </div>	

                            <nav className="collapse navbar-collapse navbar-right">					
                                <ul className="nav navbar-nav">                                    
                                    
                                    {tabList.map((tab : ITab, index : number) => {
                                        return (<Tab key={index} tabProps={tab} handleClick={() => this.handleClick} history={this.props.history} />)
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

