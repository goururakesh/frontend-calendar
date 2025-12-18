import React from "react";

type EventBadgeProps = {
  title: string;
  time: string;
  duration: number;
  color: string;
  conflicted?: boolean;
};

const addAlpha = (hex: string, alpha = "33") => {
  if (!hex.startsWith("#") || (hex.length !== 7 && hex.length !== 4)) return hex;
  if (hex.length === 4) {
    // expand short hex like #abc to #aabbcc
    const r = hex[1];
    const g = hex[2];
    const b = hex[3];
    return `#${r}${r}${g}${g}${b}${b}${alpha}`;
  }
  return `${hex}${alpha}`;
};

const EventBadge: React.FC<EventBadgeProps> = ({
  title,
  time,
  duration,
  color,
  conflicted
}) => {
  const bg = addAlpha(color, "26"); // soft tint
  return (
    <div
      className={`event-badge ${conflicted ? "conflict" : ""}`}
      style={{ borderLeftColor: color, backgroundColor: bg }}
    >
      <div className="event-time">{time}</div>
      <div className="event-title">{title}</div>
      <div className="event-duration">{duration}m</div>
      {conflicted && <span className="conflict-dot" title="Overlapping event" />}
    </div>
  );
};

export default EventBadge;

