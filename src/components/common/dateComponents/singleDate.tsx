import * as React from 'react';
import * as DayPicker from 'react-day-picker';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
let moment = require('moment')

interface ISingleDateProps{
  onDayClick : (selectedDay : Date) => void;
  setSingleDate : Date;
}

@observer
export default class SingleDate extends React.Component<ISingleDateProps,{}> {
  @observable selectedDay : Date;

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);

    if(this.props.setSingleDate){
        this.selectedDay = this.props.setSingleDate;
    }
  }
  
  handleDayClick(e, day){
    if(moment(day).isSame(this.selectedDay)){
      this.selectedDay = null;
    }else{
      this.selectedDay = day;
      this.props.onDayClick(day);
    }
  }

  render() {
    return (
      <div>
        <DayPicker
          selectedDays={ day => DateUtils.isSameDay(this.selectedDay, day) } onDayClick={this.handleDayClick}
        />
        <p>
          { new moment(this.selectedDay).isValid() ? this.selectedDay.toLocaleDateString() : 'Please select a day' }
        </p>
      </div>
    );
  }
}