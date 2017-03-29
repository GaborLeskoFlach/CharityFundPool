import * as React from 'react';
import { Link } from 'react-router';
import { signIn, _firebaseApp, getMappingInfoForUser, updateRegistrationToMapping, getUserRole } from './components/firebaseAuth/component';
import { IUserMapping, UserStatus, RegistrationRoles, IRoleInfo } from './components/interfaces';
import {observer} from 'mobx-react';
import {observable, action } from 'mobx';
import './styles.css';

//Ugh...no no no....shouldn't be this way
//TODO Remove these guids immediately
const AdminUser1GUID : string = 'Dc6w5JqHUtPXxXvtHHXJ7ozjk7q1'
const AdminUser2GUID : string = 'sdUQiPafYwavy7XEdyydU9mfg6C3'


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
    canSee : Array<RegistrationRoles>
}

let tabList : Array<ITab>  = [
    { id: 1, name: 'Home', to:'/home', tabType : TabType.Home, canSee : [ RegistrationRoles.Admin, RegistrationRoles.User] },
    { id: 2, name: 'About Us', to:'/aboutUs', tabType : TabType.AboutUs, canSee : [ RegistrationRoles.Admin, RegistrationRoles.User]},
    { id: 3, name: 'Donate', to:'/donate', tabType : TabType.Donate, canSee : [ RegistrationRoles.Admin] },
    { id: 4, name: 'View Needs', to:'/viewNeeds', tabType : TabType.ViewNeeds, canSee : [ RegistrationRoles.Admin] },   
    { id: 5, name: 'Contact Us', to:'/contactUs', tabType : TabType.ContactUs, canSee : [ RegistrationRoles.Admin, RegistrationRoles.User] },      
    { id: 6, name: 'Search for Jobs',  to:'/jobs', tabType : TabType.SearchForJobs, canSee : [ RegistrationRoles.Admin, RegistrationRoles.User] },
    { id: 7, name: 'Administration',  to:'/administration', tabType : TabType.Administration, canSee : [ RegistrationRoles.Admin] },
    { id: 8, name: 'Sign In',  to:'/login', tabType : TabType.SignInOut, canSee : [ RegistrationRoles.Admin, RegistrationRoles.User] },
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
    @observable currentUser : firebase.User = null;
    registrationId : string
    currentUserRole : RegistrationRoles
    @observable isLoading : boolean = false

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount = () => {
        this.isLoading = true
        _firebaseApp.auth().onAuthStateChanged((user) => {
            if(user){
                //this.userLoggedIn = true;
                //this.currentUser = user;                
                //THis will run just once when User logs in
                //this way we can keep User Details being displayed in Navbar up-to-date
                getMappingInfoForUser(user.uid).then((response : IUserMapping) => {
                    if(response){
                        response.status = UserStatus.Enabled;
                        response.loggedInFirstTime = true;
                        response.loggedInFirstTimeDate = new Date();

                        //Extract RegistrationID from UserMapping information - Location field
                        this.registrationId = response.location.substring(response.location.lastIndexOf('/') + 1),
                        
                        updateRegistrationToMapping(response).then(() => {
                            user.updateProfile({
                                displayName: response.displayName,
                                photoURL: response.profileImageURL
                            }).then(response =>{
                                //this.userLoggedIn = true;
                                //this.currentUser = user;
                            }).catch(error => {
                                console.log('Exception occurred in UpdateProfile => {0}', error.message);
                            });
                        })                        
                    }else{
                        user.updateProfile({
                            displayName: 'Administrator',
                            photoURL : null
                        }).then(response =>{
                            //this.userLoggedIn = true;
                            //this.currentUser = user;
                        }).catch(error => {
                            console.log('Exception occurred in UpdateProfile => {0}', error.message);
                        });                        
                    }
                }).then(() => {
                    //Get User Role information so Tabs can be set based on role
                    getUserRole(user.uid).then((response : IRoleInfo) => {
                        if(response){
                            this.currentUserRole = response.registrationType                             
                        }
                        this.userLoggedIn = true;
                        this.currentUser = user;                        
                        this.isLoading = false;
                    })
                }).catch((error) => {
                    this.isLoading = false
                })
            }else{
                this.userLoggedIn = false;
                this.currentUser = null;
                this.isLoading = false
            }
        });
    }

    handleClick(tab : ITab){
       console.log('Click a Tab: ' + tab.name);
    }

    durationFn(deltaTop : number) {
        return deltaTop;
    }

    hasAdminGUID = () => {
        if(this.currentUser){
            return (this.currentUser.uid === AdminUser1GUID || this.currentUser.uid === AdminUser2GUID)
        }else{
            return false
        }
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

        if(this.currentUserRole){
            if(tab.canSee[this.currentUserRole]){
                return <Tab key={index} tabProps={tab} handleClick={() => this.handleClick} history={this.props.history} />
            }else{
                return null
            }
        }else{
            if(tab.id === 1 || tab.id === 2 || tab.id === 5 || tab.id === 8 || this.hasAdminGUID()){
                return <Tab key={index} tabProps={tab} handleClick={() => this.handleClick} history={this.props.history} />
            }
        }
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
                                    {
                                        this.currentUser && !this.isLoading &&
                                        <Avatar user={this.currentUser} />
                                    }                                    
                                </a>                    
                            </div>	

                            <nav className="collapse navbar-collapse navbar-right">					
                                <ul className="nav navbar-nav">                                    
                                    
                                    {!this.isLoading && tabList.map((tab : ITab, index : number) => {
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

interface IAvatar{
    user : firebase.User;
}

class Avatar extends React.Component<IAvatar,{}>{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="profileCardNavbar hovercard">   
                <div className="avatar">                                   
                    <img className="profileCardNavbar hovercard avatar img" src={this.props.user.photoURL} title={this.props.user.displayName}/>
                </div>
            </div>
        )
    }
}