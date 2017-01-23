import * as React from 'react';
import * as DayPicker from 'react-day-picker';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

interface ISingleDateProps{
  onDayClick : (selectedDay : string) => void;
  setSingleDate : string;
}

export default class SingleDate extends React.Component<ISingleDateProps,{}> {
  
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
  }
  
  state = {
    selectedDay: null,
  };

  handleDayClick(e, day){
    this.setState({
      selectedDay: day,
    });

    this.props.onDayClick(day.toString());
  }

  render() {
    const { selectedDay } = this.state;
    return (
      <div>
        <DayPicker
          selectedDays={ day => DateUtils.isSameDay(selectedDay, day) } onDayClick={this.handleDayClick}
        />
        <p>
          { selectedDay ? selectedDay.toLocaleDateString() : 'Please select a day 👻' }
        </p>
      </div>
    );
  }
}