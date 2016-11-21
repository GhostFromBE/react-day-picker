import React, { PropTypes } from 'react';
import * as DateUtils from './DateUtils';

export default function Week({
    month,
    week,
    children,
    showWeekNumber,
    weekClassName,
}) {
    let days = [];

    week.forEach( (day, i) => {
        if(showWeekNumber && i % 7 == 0)
            days.push(<div key={i} className="DayPicker-WeekNumber">{DateUtils.getWeekNumber(day)}</div>);

        days.push(children(day, month));
    });

    return (
        <div className={ weekClassName } role="gridcell">
            {days}
        </div>
    );
}

Week.propTypes = {
    month: PropTypes.instanceOf(Date).isRequired,
    children: PropTypes.func.isRequired,
    weekClassName: PropTypes.string,
    showWeekNumber: PropTypes.bool
};