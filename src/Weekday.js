import React, { PropTypes } from 'react';
import DayPickerPropTypes from './PropTypes';

export default function Weekday({
  weekday,
  className,
  weekdaysLong,
  weekdaysShort,
  localeUtils,
  locale,
}) {
  let hasWeekDay = weekday !== undefined;

  let title;
  if (weekdaysLong && hasWeekDay) {
    title = weekdaysLong[weekday];
  } else if(hasWeekDay) {
    title = localeUtils.formatWeekdayLong(weekday, locale);
  }
  let content;
  if (weekdaysShort && hasWeekDay) {
    content = weekdaysShort[weekday];
  } else if (hasWeekDay) {
    content = localeUtils.formatWeekdayShort(weekday, locale);
  }

  return (
    <div className={ className }>
      <abbr title={ title }>
        {content}
      </abbr>
    </div>
  );
}

export const WeekdayPropTypes = {
  weekday: PropTypes.number,
  className: PropTypes.string,
  locale: PropTypes.string,
  localeUtils: DayPickerPropTypes.localeUtils,

  weekdaysLong: PropTypes.arrayOf(PropTypes.string),
  weekdaysShort: PropTypes.arrayOf(PropTypes.string),
};

Weekday.propTypes = WeekdayPropTypes;
