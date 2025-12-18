import React, { useState } from "react";
import Calendar from "./components/Calendar";

const navSections = [
  {
    title: "Menu",
    items: ["Dashboard", "Accounts"]
  },
  {
    title: "Leads",
    items: ["Contacts", "Leads", "Calendar"]
  },
  {
    title: "Cases",
    items: ["Cases", "Activities", "Users"]
  }
];

const App: React.FC = () => {
  const [activePage, setActivePage] = useState("Calendar");

  const renderPageContent = () => {
    if (activePage === "Calendar") {
      return <Calendar />;
    }

    if (activePage === "Login") {
      return (
        <div className="generic-page auth-page">
          <h2>Login</h2>
          <p>Sign in to access your CRMHUB workspace.</p>
          <form className="auth-form">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        </div>
      );
    }

    if (activePage === "Signup") {
      return (
        <div className="generic-page auth-page">
          <h2>Create account</h2>
          <p>Join CRMHUB to manage your customers and calendar.</p>
          <form className="auth-form">
            <input type="text" placeholder="Full name" />
            <input type="email" placeholder="Work email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Sign up</button>
          </form>
        </div>
      );
    }

    if (activePage === "Profile") {
      return (
        <div className="generic-page">
          <h2>User profile</h2>
          <p>Manage your CRMHUB account details here.</p>
          <ul>
            <li>Name: Grace</li>
            <li>Role: Admin</li>
            <li>Email: grace@example.com</li>
          </ul>
        </div>
      );
    }

    return (
      <div className="generic-page">
        <h2>{activePage}</h2>
        <p>
          This is the <strong>{activePage}</strong> workspace. You can plug in
          real data or components here later.
        </p>
      </div>
    );
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-dot" />
          <span>CRMHUB</span>
        </div>

        <div className="sidebar-menu">
          {navSections.map((section) => (
            <div key={section.title} className="sidebar-section">
              <div className="sidebar-section-title">{section.title}</div>
              {section.items.map((item) => (
                <button
                  key={item}
                  className={`sidebar-item ${
                    activePage === item ? "active" : ""
                  }`}
                  onClick={() => setActivePage(item)}
                >
                  <span className="sidebar-dot" />
                  {item}
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="search-box">
            <span role="img" aria-label="search">
              🔍
            </span>
            <input placeholder="Search" />
          </div>
          <div className="topbar-actions">
            <button
              className="text-btn"
              onClick={() => setActivePage("Login")}
            >
              Login
            </button>
            <button
              className="text-btn primary"
              onClick={() => setActivePage("Signup")}
            >
              Sign up
            </button>
            <button
              className="icon-btn"
              onClick={() => setActivePage("Activities")}
              aria-label="Notifications"
            >
              🔔
            </button>
            <button
              className="icon-btn"
              onClick={() => setActivePage("Settings")}
              aria-label="Settings"
            >
              ⚙️
            </button>
            <button
              className="avatar"
              onClick={() => setActivePage("Profile")}
              aria-label="Open profile"
            >
              G
            </button>
          </div>
        </header>

        <section className="content">
          {renderPageContent()}
        </section>
      </main>
    </div>
  );
};

export default App;

