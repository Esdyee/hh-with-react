import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./style/full-calendar.css";
import { useRef, useState } from "react";
import {
    DateSelectArg,
    EventApi,
    EventClickArg,
} from "@fullcalendar/core/index.js";
import { INITIAL_EVENTS, createEventId } from "./utils/event-util";

const FullCalendarTest = () => {
    const calendarRef = useRef<FullCalendar>(null);
    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);

    const [events, setEvents] = useState([
        { title: "Existing Event", start: new Date() },
    ]);

    // const handleDateClick = (info: any) => {
    //     let title = prompt("Enter Event Title");
    //     let calendarApi = info.view.calendar;

    //     calendarApi.unselect(); // clear date selection

    //     if (title) {
    //         setEvents([...events, { title, start: info.date }]);
    //     }
    // };

    const renderEventContent = (eventInfo: any) => {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        );
    };

    function handleEvents(events: EventApi[]) {
        setCurrentEvents(events);
    }

    function handleDateSelect(selectInfo: DateSelectArg) {
        let title = prompt("Please enter a new title for your event");
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
            });
        }
    }

    function handleEventClick(clickInfo: EventClickArg) {
        if (
            confirm(
                `Are you sure you want to delete the event '${clickInfo.event.title}'`,
            )
        ) {
            // clickInfo.event.remove();
            
            // go handleWeekView
            handleWeekView();
        }
    }
    

    const handleWeekView = () => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            // calendarApi.changeView("timeGridWeek"); // 주간 뷰로 변경
            calendarApi.changeView("timeGridDay"); // 일간 뷰로 변경
        }
    };

    return (
        <>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                // weekends={weekendsVisible}
                initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                select={handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            />
        </>
    );
};

export default FullCalendarTest;
