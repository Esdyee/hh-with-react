import React, { FC } from 'react';
import { useCalendar } from '../../hooks/useCalendar';
// import WeekCalendar from './components/week-calendar/WeekCalendar';

// import YearCalendar from './components/year-calendar/YearCalendar';
// import MonthCalendar from './components/month-calendar/MonthCalendar';

import './calendar.scss';
import Header from './header/Header';

interface ICalendarProps {
}

const ReactCalendar: FC<ICalendarProps> = ({  }) => {
  const { state, functions } = useCalendar({ selectedDate: new Date() });

  return (
    <>
      {/* <Header
        onClickArrow={functions.onClickArrow}
        displayedDate={state.displayedDate}
        onChangeOption={functions.setMode}
        selectedOption={state.mode}
        selectedDay={state.selectedDay}
      /> */}
      <section className="calendar">
        <pre>
          {JSON.stringify(state.calendarDaysOfMonth, null, 2)}
        </pre>
        {/* {state.mode === 'year' && (
          <YearCalendar
            selectedDay={state.selectedDay}
            selectedMonth={state.selectedMonth}
            monthesNames={state.monthesNames}
            weekDaysNames={state.weekDaysNames}
            calendarDaysOfYear={state.calendarDaysOfYear}
            onChangeState={functions.onChangeState}
          />
        )}
        
        {state.mode === 'month' && (
          <MonthCalendar
            weekDaysNames={state.weekDaysNames}
            calendarDaysOfMonth={state.calendarDaysOfMonth}
            selectedMonth={state.selectedMonth}
            onClickArrow={functions.onClickArrow}
          />
        )}
        
        {state.mode === 'week' && (
          <WeekCalendar
            weekDays={state.weekDays}
            weekDaysNames={state.weekDaysNames}
          />
        )} */}
        
      </section>
    </>
  );
}

export default ReactCalendar;
