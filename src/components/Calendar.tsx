import React, { useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import eventsData from "../data/events.json";
import EventBadge from "./EventBadge";

type EventItem = {
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  duration: number; // minutes
};

type ViewMode = "monthly" | "weekly" | "timeline";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const COLORS = ["#ffb6b6", "#b6e3ff", "#c0f1d8", "#ffe1b6", "#d8c7ff", "#ffd6f2"];

const buildMonthGrid = (current: Dayjs) => {
  const startOfMonth = current.startOf("month");
  const endOfMonth = current.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");
  const days: Dayjs[] = [];
  let day = startDate;
  while (day.isBefore(endDate) || day.isSame(endDate, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }
  return days;
};

const buildWeekGrid = (current: Dayjs) => {
  const start = current.startOf("week");
  return Array.from({ length: 7 }, (_, i) => start.add(i, "day"));
};

const groupEventsByDate = (events: EventItem[]) =>
  events.reduce<Record<string, EventItem[]>>((acc, ev) => {
    acc[ev.date] = acc[ev.date] ? [...acc[ev.date], ev] : [ev];
    return acc;
  }, {});

const detectConflicts = (events: EventItem[]) => {
  const toMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };
  return events.map((ev, idx) => {
    const start = toMinutes(ev.time);
    const end = start + ev.duration;
    return events.some((other, j) => {
      if (j === idx) return false;
      const oStart = toMinutes(other.time);
      const oEnd = oStart + other.duration;
      return start < oEnd && oStart < end;
    });
  });
};

const Calendar: React.FC = () => {
  const today = dayjs().format("YYYY-MM-DD");
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [viewMode, setViewMode] = useState<ViewMode>("monthly");
  const [events, setEvents] = useState<EventItem[]>(eventsData as EventItem[]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [form, setForm] = useState({
    title: "",
    date: today,
    time: "09:00",
    duration: 60
  });

  const days =
    viewMode === "weekly"
      ? buildWeekGrid(currentMonth)
      : buildMonthGrid(currentMonth);

  const eventsByDate = useMemo(() => groupEventsByDate(events), [events]);

  const handlePrev = () =>
    setCurrentMonth((m) =>
      viewMode === "weekly" ? m.subtract(1, "week") : m.subtract(1, "month")
    );
  const handleNext = () =>
    setCurrentMonth((m) =>
      viewMode === "weekly" ? m.add(1, "week") : m.add(1, "month")
    );
  const handleToday = () => {
    const now = dayjs();
    const todayKey = now.format("YYYY-MM-DD");
    setCurrentMonth(now);
    setViewMode("monthly");
    setSelectedDate(todayKey);
  };

  const moveSelectionBy = (daysOffset: number) => {
    const base = dayjs(selectedDate);
    const next = base.add(daysOffset, "day");
    const key = next.format("YYYY-MM-DD");
    setSelectedDate(key);
    setCurrentMonth(next.startOf("month"));
  };

  const handleAddEvent = () => {
    if (!form.title.trim()) {
      alert("Please add a title");
      return;
    }
    const next: EventItem = {
      title: form.title.trim(),
      date: form.date,
      time: form.time,
      duration: Number(form.duration)
    };
    setEvents((prev) => [...prev, next]);
    setShowModal(false);
    setForm((prev) => ({
      ...prev,
      title: "",
      date: currentMonth.format("YYYY-MM-DD")
    }));
  };

  const renderTimeline = () => {
    const upcoming = [...events].sort((a, b) =>
      dayjs(`${a.date}T${a.time}`).diff(dayjs(`${b.date}T${b.time}`))
    );
    return (
      <div className="timeline">
        {upcoming.map((ev, idx) => (
          <div key={`${ev.title}-${idx}`} className="timeline-item">
            <div className="timeline-dot" />
            <div>
              <div className="timeline-title">{ev.title}</div>
              <div className="timeline-meta">
                {dayjs(ev.date).format("MMM D")} at {ev.time} • {ev.duration}m
              </div>
            </div>
          </div>
        ))}
        {upcoming.length === 0 && (
          <div className="empty">No events scheduled.</div>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-wrapper">
      <header className="calendar-header">
        <div>
          <div className="calendar-title">Calendar</div>
          <div className="calendar-subtitle">
            Full Event Schedule • {currentMonth.format("MMMM YYYY")}
          </div>
        </div>
        <div className="calendar-actions">
          <div className="view-toggle">
            {(["weekly", "monthly", "timeline"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                className={viewMode === mode ? "active" : ""}
                onClick={() => setViewMode(mode)}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          <div className="nav-buttons">
            <button onClick={handlePrev} aria-label="Previous period">
              ‹
            </button>
            <button onClick={handleNext} aria-label="Next period">
              ›
            </button>
            <button onClick={handleToday}>Today</button>
            <div className="arrow-pad" aria-label="Move selection">
              <button
                type="button"
                onClick={() => moveSelectionBy(-7)}
                aria-label="Move up a week"
              >
                ↑
              </button>
              <div className="arrow-middle">
                <button
                  type="button"
                  onClick={() => moveSelectionBy(-1)}
                  aria-label="Move left a day"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => moveSelectionBy(1)}
                  aria-label="Move right a day"
                >
                  →
                </button>
              </div>
              <button
                type="button"
                onClick={() => moveSelectionBy(7)}
                aria-label="Move down a week"
              >
                ↓
              </button>
            </div>
            <button className="primary" onClick={() => setShowModal(true)}>
              + Add Event
            </button>
          </div>
        </div>
      </header>

      {viewMode !== "timeline" && (
        <div className="weekday-row">
          {WEEKDAYS.map((d) => (
            <div key={d} className="weekday-cell">
              {d}
            </div>
          ))}
        </div>
      )}

      {viewMode === "timeline" ? (
        renderTimeline()
      ) : (
        <div className={`grid ${viewMode === "weekly" ? "week" : ""}`}>
          {days.map((day) => {
            const dateKey = day.format("YYYY-MM-DD");
            const inMonth = day.isSame(currentMonth, "month");
            const isToday = dateKey === today;
            const isSelected = dateKey === selectedDate;
            const dayEvents = eventsByDate[dateKey] || [];
            const conflicts = detectConflicts(dayEvents);

            return (
              <div
                key={dateKey + day.date()}
                className={`cell ${inMonth ? "" : "muted"} ${
                  isToday ? "today" : ""
                } ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  setSelectedDate(dateKey);
                  if (!inMonth) {
                    setCurrentMonth(day.startOf("month"));
                  }
                }}
              >
                <div className="cell-date">
                  <span className="cell-date-number">{day.date()}</span>
                  <span className="cell-date-month">
                    {!inMonth ? day.format("MMM") : ""}
                  </span>
                </div>
                <div className="cell-events">
                  {dayEvents.map((ev, idx) => (
                    <EventBadge
                      key={`${ev.title}-${idx}`}
                      title={ev.title}
                      time={ev.time}
                      duration={ev.duration}
                      color={COLORS[idx % COLORS.length]}
                      conflicted={conflicts[idx]}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="modal-header">
              <div>
                <div className="modal-title">Add Event</div>
                <div className="modal-subtitle">
                  Create a quick event on the calendar
                </div>
              </div>
              <button onClick={() => setShowModal(false)} aria-label="Close">
                ✕
              </button>
            </div>
            <div className="modal-body">
              <label>
                Title
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="e.g. Marketing Review"
                />
              </label>
              <div className="modal-grid">
                <label>
                  Date
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date: e.target.value }))
                    }
                  />
                </label>
                <label>
                  Time
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, time: e.target.value }))
                    }
                  />
                </label>
                <label>
                  Duration (minutes)
                  <input
                    type="number"
                    min={15}
                    step={15}
                    value={form.duration}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        duration: Number(e.target.value)
                      }))
                    }
                  />
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="primary" onClick={handleAddEvent}>
                Save Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;

