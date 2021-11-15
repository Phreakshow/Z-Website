import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import "./Styles.css"

function Calendar() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,listWeek",
        }}
        events={[
          { title: "SHIBX RELEASE", start: "2021-11-11T12:30:00Z" },
          { title: "event 2", date: "2019-04-02" },
        ]}
      />
    </div>
  );
}

export default Calendar;
