import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { IMultiSelect } from '../../interfaces';

export interface IMultiSelectComponentProps{
    defaultData : Array<IMultiSelect>;
	userSetOptions : Array<IMultiSelect>;
    onChange : (selectedValue : Array<IMultiSelect>) => void;
}

@observer
export class MultiSelectComponent extends React.Component<IMultiSelectComponentProps,{}>{
    @observable data : Array<IMultiSelect>;
	@observable allChecked : boolean;
    
    constructor(props){
        super(props);

        this.data = this.props.defaultData;
		this.allChecked = this.data.filter(x => x.checked).length == this.data.length;
    }

	componentDidMount = () => {
		console.log('component did mount');
	}

	handleItemChange = (e) => {
		var selectedValues = [],
			newData = [];

		this.data.map(item => {
			if(item.value === e.target.value) {
				item.checked = e.target.checked;
			}
			if(item.checked) {
				selectedValues.push(item);
			}
			newData.push(item);
		});

        this.data = newData;

		//Should tick/untick top checkbox based on whether all items in the list are checked/unchecked
		this.allChecked = this.data.filter(x => x.checked).length == this.data.length;

		(this.refs['selectAll'] as HTMLInputElement).checked = this.allChecked;

		if(this.props.onChange) {
			this.props.onChange(selectedValues);
		}
	}
	
	toggleSelectAll = (e) => {	
		let newData = [];
		let selectedValues = [];

		this.data.map(item => {
			item.checked = e.target.checked;
			newData.push(item);
			if(e.target.checked){
				selectedValues.push(item);
			}
		});

        this.data = newData;

		if(this.props.onChange) {
			this.props.onChange(selectedValues);
		}
	}
	
	shouldSet = (item : IMultiSelect) => {
		const userHasSavedOption  = this.props.userSetOptions.filter(x => x.value === item.value);

		if(this.props.userSetOptions){
			if(userHasSavedOption.length > 0){
				item.checked = userHasSavedOption[0].checked
			}else{
				item.checked = false;
			}
		}else{
			item.checked ? true : false;
		}
		return item.checked;
	}

	renderOptions = () => {
		return(
			this.data.map((item : IMultiSelect, index) => {
				return(
				<div key={'chk-' + index} className="checkbox">
					<label>
						<input
							type="checkbox"
							value={item.value}
							onChange={this.handleItemChange}
							checked={item.checked ? true : false} /> {item.label}
					</label>
				</div>
				)
			})
		);
	}		

	render() {

		const options = this.renderOptions();

		return (
			<div>
				<div>
					<label>
						<input
							type="checkbox"
							value={false}
							onChange={this.toggleSelectAll}
							ref='selectAll'/> Select All
					</label>				
				</div>
				<div>
					{options}
				</div>
			</div>
		)
	}
}