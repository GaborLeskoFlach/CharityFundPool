import * as React from 'react';
import * as moment from 'moment';
import * as DayPicker from 'react-day-picker';
import { DateUtils } from 'react-day-picker';

import 'react-day-picker/lib/style.css';

export default class Range extends React.Component<{},{}> {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  state = {
    from: null,
    to: null,
  };

  handleDayClick(e, day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick(e) {
    e.preventDefault();
    this.setState({
      from: null,
      to: null,
    });
  }

  render() {
    const { from, to } = this.state;
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
