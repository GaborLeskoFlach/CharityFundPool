import * as React from 'react';


export class NotFoundComponent extends React.Component<{},{}>{

    constructor(){
        super();
    }

    render(){
        return(
            <div>
               Oppps! Someting went wrong
            </div>
        )
    }

}