import React, { Component } from 'react';
import DayPicker, { DateUtils } from '../../../src';
import moment from 'moment';

import '../styles/with-weeks.css';

export default class WithWeekNumbers extends Component {

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleContainerMouseDown = this.handleContainerMouseDown.bind(this);
  }

  state = {
    showOverlay: false,
    value: '',
    selectedDay: null,
  };

  componentWillUnmount() {
    clearTimeout(this.clickTimeout);
  }

  input = null;
  daypicker = null;
  clickedInside = false;
  clickTimeout = null;

  handleContainerMouseDown() {
    this.clickedInside = true;
    // The input's onBlur method is called from a queue right after onMouseDown event.
    // setTimeout adds another callback in the queue, but is called later than onBlur event
    this.clickTimeout = setTimeout(() => {
      this.clickedInside = false;
    }, 0);
  }

  handleInputFocus() {
    this.setState({
      showOverlay: true,
    });
  }

  handleInputBlur() {
    const showOverlay = this.clickedInside;

    this.setState({
      showOverlay,
    });

    // Force input's focus if blur event was caused by clicking on the calendar
    if (showOverlay) {
      this.input.focus();
    }
  }

  handleInputChange(e) {
    const { value } = e.target;
    const momentDay = moment(value, 'L', true);
    if (momentDay.isValid()) {
      this.setState({
        selectedDay: momentDay.toDate(),
        value,
      }, () => {
        this.daypicker.showMonth(this.state.selectedDay);
      });
    } else {
      this.setState({ value, selectedDay: null });
    }
  }

  handleDayClick(e, day) {
    this.setState({
      value: moment(day).format('L'),
      selectedDay: day,
      showOverlay: false,
    });
    this.input.blur();
  }

  render() {
    const modifiers = {
      weekend: day => day.getDay() === 0 || day.getDay() === 6,
    };

    const next = <div>NEXT</div>;
    const locale = 'en-gb';

    var localMoment = moment();
    localMoment.locale(locale);
    const weekDaysShort = localMoment.localeData().weekdaysShort();

    return (
      <div onMouseDown={ this.handleContainerMouseDown }>
        <input
          type="text"
          ref={ el => { this.input = el; } }
          placeholder="DD/MM/YYYY"
          value={ this.state.value }
          onChange={ this.handleInputChange }
          onFocus={ this.handleInputFocus }
          onBlur={ this.handleInputBlur }
        />
        { this.state.showOverlay &&
          <div style={ { position: 'relative' } }>
            <div className="DayPicker-overlay">
              <DayPicker
                ref={ el => { this.daypicker = el; } }
                onDayClick={ this.handleDayClick }
                selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
                modifiers={ modifiers }
                showWeekNumbers
                locale="en-gb"
                weekdaysShort={weekDaysShort}
                fixedWeeks
                firstDayOfWeek={1}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}
