# Frontend Calendar

A modern, interactive calendar application built with React and TypeScript. This calendar app provides a comprehensive event management system with multiple view modes, conflict detection, and a clean CRM-style interface.

## Features

- **Multiple View Modes**
  - Monthly view: Full month calendar grid
  - Weekly view: Focused week view
  - Timeline view: Chronological list of upcoming events

- **Event Management**
  - Add new events with title, date, time, and duration
  - Visual event badges with color coding
  - Automatic conflict detection for overlapping events
  - Event data stored in JSON format

- **Navigation**
  - Navigate between months/weeks
  - Quick "Today" button to jump to current date
  - Arrow key navigation for date selection
  - Click on any date to select it

- **User Interface**
  - Modern CRM-style layout with sidebar navigation
  - Responsive design
  - Clean and intuitive interface
  - Search functionality (UI ready)
  - User profile and settings pages (UI ready)

## Tech Stack

- **React 18.2.0** - UI library
- **TypeScript 5.3.3** - Type safety
- **Vite 5.0.8** - Build tool and dev server
- **dayjs 1.11.13** - Date manipulation and formatting

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-calendar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open automatically in your browser at `http://localhost:5173`

### Build for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
frontend-calendar/
├── src/
│   ├── components/
│   │   ├── Calendar.tsx       # Main calendar component
│   │   └── EventBadge.tsx     # Event badge display component
│   ├── data/
│   │   └── events.json        # Sample event data
│   ├── styles/
│   │   └── calendar.css       # Calendar styles
│   ├── App.tsx                # Main application component
│   └── main.tsx               # Application entry point
├── dist/                      # Production build output
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── README.md                  # This file
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Usage

### Adding Events

1. Click the "+ Add Event" button in the calendar header
2. Fill in the event details:
   - Title (required)
   - Date
   - Time
   - Duration (in minutes)
3. Click "Save Event" to add it to the calendar

### View Modes

- **Monthly**: Click "Monthly" to see the full month grid
- **Weekly**: Click "Weekly" to focus on a single week
- **Timeline**: Click "Timeline" to see all events in chronological order

### Navigation

- Use the `‹` and `›` buttons to navigate between periods
- Click "Today" to jump to the current date
- Use the arrow pad to move the selected date:
  - `↑` - Move up one week
  - `↓` - Move down one week
  - `←` - Move left one day
  - `→` - Move right one day

### Event Conflicts

The calendar automatically detects when events overlap in time. Conflicting events are marked with a visual indicator (conflict dot) to help you identify scheduling issues.

## Data Format

Events are stored in `src/data/events.json` with the following structure:

```json
[
  {
    "title": "Event Name",
    "date": "YYYY-MM-DD",
    "time": "HH:mm",
    "duration": 60
  }
]
```

## Development

The project uses:
- **Vite** for fast development and optimized builds
- **TypeScript** for type safety
- **dayjs** for lightweight date operations
- **React Hooks** for state management

## Browser Support

Modern browsers that support ES6+ features:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and not licensed for public use.

## Contributing

This is a private project. For questions or suggestions, please contact the project maintainer.

