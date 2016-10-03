import * as React from 'react';
import { Link } from 'react-router';
import * as Scroll from 'react-scroll';

var ScrollLink = Scroll.Link;
var DirectLink = Scroll.DirectLink;
var Element    = Scroll.Element;
var Events     = Scroll.Events;
var scroll     = Scroll.animateScroll;
var scrollSpy  = Scroll.scrollSpy;

interface INavigationComponentProps{
    children : any;
}

interface ITabProps{
    tabProps : ITab;
    handleClick : () => void;
}

interface ITab{
    id : number;
    name : string;
    className? : string;
    to? : string;
    spy? : boolean;
    smooth? : boolean;
    duration? : number;
    href? : string;
}

let tabList : Array<ITab>  = [
    { id: 1, name: 'Home', className:'what-we-do', href:'/',  to:'what-we-do', spy:true, smooth:true, duration:500},
    { id: 2, name: 'Who we are', className : 'who-we-are', href:'/', to:'who-we-are', spy:true, smooth:true, duration:500},
    { id: 3, name: 'Causes', className : 'cause-list' , href:'/', to:'cause-list', spy:true, smooth:true, duration:500},
    { id: 4, name: 'News & Blog', className : 'recent-posts' , href:'/',  to:'recent-posts', spy:true, smooth:true, duration:500},
    { id: 5, name: 'Volunteer', className : 'our-members' , href:'/',  to:'our-members', spy:true, smooth:true, duration:500},
    { id: 6, name: 'Contact', className : 'contact-us' , href:'/', to:'contact-us', spy:true, smooth:true, duration:500},
    { id: 7, name: 'Sign In', href:'/login', to : '' },  
    { id: 8, name: 'Test 1', href:'/test1', to : '' }, 
    { id: 9, name: 'Test 2', href:'/test2', to : '' },
    { id: 10, name: 'Test 3', href:'/test3', to : '' }  
];

class Tab extends React.Component<ITabProps,{}>{
    
    constructor(props){
        super(props);
    }

    render(){

        const { className, to, spy, smooth, duration, name, href }  : any = this.props.tabProps;

        if(href != undefined){
            return(
                <li className='active'>
                    <Link activeClassName="active" to={href} >{ name }</Link>             
                </li>            
            )
        }else
        {
            return(
                <li className='active'>
                    <ScrollLink activeClass="active" className={className} to={to} spy={spy} smooth={smooth} duration={duration} >{ name }</ScrollLink>             
                </li>            
            )
        }
    }
}


export default class AppFrame extends React.Component<INavigationComponentProps,{}>{
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        scrollSpy.update();
    }

    componentWillUnmount(){
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    handleClick(tab : ITab){
       //TODO => any custom stuff on Link click
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
                                    <h1><img className="img-responsive" src="templates/images/logo_custom.png" alt="Custom Logo Placeholder" /></h1>
                                </a>                    
                            </div>	

                            <nav className="collapse navbar-collapse navbar-right">					
                                <ul className="nav navbar-nav">                                    
                                    
                                    {tabList.map((tab : ITab, index : number) => {
                                        return (<Tab key={index} tabProps={tab} handleClick={this.handleClick.bind(this)} />)									
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

/*
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

                                        <nav className="collapse navbar-collapse navbar-right">					
                                            <ul className="nav navbar-nav">                                    
                                                <li><Link to="/test1">go to Test1</Link></li>
                                                <li><Link to="/test2">go to Test2</Link></li>
                                                <li><Link to="/test3">go to Test3</Link></li>
                                            </ul>		
                                        </nav> 
                                        
                                    </div>
                                </div>
                            </header>
                        </div>
                    </div>
                </header>

                {this.props.children}

                
            </div>
            
        )
    }
}*/