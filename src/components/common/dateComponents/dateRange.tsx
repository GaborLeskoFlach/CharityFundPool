import * as React from 'react';
import * as moment from 'moment';
import * as DayPicker from 'react-day-picker';
import { DateUtils } from 'react-day-picker';
import { IDateRange } from '../../interfaces';
import 'react-day-picker/lib/style.css';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

interface IDateRangeProps{
  onDateRangeClick : (range : IDateRange ) => void;
  setDateRange : { from?: Date, to?: Date };
}

@observer
export default class DateRange extends React.Component<IDateRangeProps,{}> {
  @observable range : { from? : Date, to? : Date };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);

    if(this.props.setDateRange.from){
      let rangeToSet = { from : this.props.setDateRange.from, to : this.props.setDateRange.to }; 
      this.range = rangeToSet;
    }else{
      this.range = { from : null, to : null }
    }
  }

  componentWillReceiveProps = (nextProps : IDateRangeProps) => {
    if(nextProps.setDateRange.from){
      let rangeToSet = { from : nextProps.setDateRange.from, to : nextProps.setDateRange.to }; 
      this.range = rangeToSet;
    }else{
      this.range = { from : null, to : null }
    }
  }

  handleDayClick(e, day) {
    //1. retrieve set Date(s) from DayPicker component
    const rangeToSet : { from?: Date, to?: Date } = DateUtils.addDayToRange(day, this.range);
    //2. set State
    this.range = { from : rangeToSet.from, to : rangeToSet.to }; 
    //3. let calling component know what the selection is
    const rangeSet : IDateRange = { from : this.range.from ? this.range.from : null, to : this.range.to ? this.range.to : null }
    this.props.onDateRangeClick(rangeSet);
  }

  handleResetClick(e) {
    e.preventDefault();
    this.range.from = null;
    this.range.to = null;
  }

  render() {
    const { from, to } = this.range;

    return (
      <div className="RangeExample">
        { !from && !to && <p>Please select the <strong>first day</strong>.</p> }
        { from && !to && <p>Please select the <strong>last day</strong>.</p> }
        { from && to &&
          <p>
            You chose from { moment(from).format('L') } to { moment(to).format('L') }.
            { ' ' }<a href="#" onClick={ this.handleResetClick }>Reset</a>
          </p>
        }
        <DayPicker
          ref="daypicker"
          numberOfMonths={ 2 }
          selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
          onDayClick={ this.handleDayClick }
        />
      </div>
    );
  }

}
