import * as React from 'react';
import {observable, action, IObservableArray, computed} from 'mobx';
import {observer} from 'mobx-react';

import { IMultiSelect } from '../../interfaces';

const SelectPopover = require('react-select-popover');

import './styles.css';

export interface IMultiSelectComponent{
    data : Array<IMultiSelect>;
    onChange : (obj) => void;
}

export class MultiSelectComponent extends React.Component<IMultiSelectComponent,{}>{

    selectFieldName : string;
    selectPlaceholder : string;

    constructor(props){
        super(props);    

        this.selectFieldName = "my-select";
        this.selectPlaceholder = "Select some options...";        
    }

    onChange = (obj) => {
        this.props.onChange(obj);
    }

	render() {
		return (
            <SelectPopover 
                options={this.props.data} 
                name={this.selectFieldName} 
                selectPlaceholder={this.selectPlaceholder}  
                onChange={ this.onChange }
            />									
		)
	}
}