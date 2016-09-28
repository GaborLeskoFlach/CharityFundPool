import * as React from 'react';
import {render, findDOMNode} from 'react-dom'
import {observable, action, IObservableArray, computed} from 'mobx';
import {observer} from 'mobx-react';
import { todos } from './model'
import { map } from 'lodash';

interface ITodoItem{
    name : string;
    id : number;
}


@observer
export class TodosListComponent extends React.Component<{},{}> {

    constructor(props){
        super(props);
    }

    del = (id) => {
        todos.del(id)
    };

    render() {
        return (
            <ul>
                {map(todos.json, (it : ITodoItem, key) => (
                        <li onClick={this.del.bind(this, key)} key={key}>{it.name}</li>)
                )}
            </ul>
        )
    }
}
