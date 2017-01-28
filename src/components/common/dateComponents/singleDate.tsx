import * as React from 'react';
import * as DayPicker from 'react-day-picker';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

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
    this.selectedDay = day;
    this.props.onDayClick(day);
  }

  render() {
    return (
      <div>
        <DayPicker
          selectedDays={ day => DateUtils.isSameDay(this.selectedDay, day) } onDayClick={this.handleDayClick}
        />
        <p>
          { this.selectedDay ? this.selectedDay.toLocaleDateString() : 'Please select a day 👻' }
        </p>
      </div>
    );
  }
}