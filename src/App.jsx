import { useState } from "react";
import "./App.css";

const API_URL = "https://collegewebapp-backend.onrender.com";

function App() {
  const [page, setPage] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const switchPage = (newPage) => {
    setPage(newPage);
    setMessage("");
    setError("");

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  // =========================
  // REGISTER
  // =========================

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setMessage("Registration successful! Please login.");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        setPage("login");
        setMessage("");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      setUser(data.user);

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setPage("home");
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    setUser(null);
    setPage("login");
    setMessage("");
    setError("");
  };

  // =========================
  // LOGIN / REGISTER
  // =========================

  if (page === "login" || page === "register") {
    const isLogin = page === "login";

    return (
      <div className="auth-page">
        <div className="auth-background-glow glow-one"></div>
        <div className="auth-background-glow glow-two"></div>

        <div className="auth-container">

          {/* LEFT PANEL */}

          <div className="auth-showcase">
            <div className="brand">
              <div className="brand-icon">A</div>

              <span>
                ATLAS<span>APP</span>
              </span>
            </div>

            <div className="showcase-content">
              <div className="mini-badge">
                <span className="pulse-dot"></span>
                Modern digital experience
              </div>

              <h1>
                Build.
                <br />
                <span>Explore.</span>
                <br />
                Connect.
              </h1>

              <p>
                A modern platform designed to help you discover amazing
                experiences and keep everything organized in one place.
              </p>
            </div>

            {/* Dashboard Preview */}

            <div className="preview-window">
              <div className="preview-top">
                <div className="preview-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="preview-title">
                  Atlas Dashboard
                </div>
              </div>

              <div className="preview-body">
                <div className="preview-sidebar">
                  <div className="preview-logo"></div>
                  <div className="preview-line active"></div>
                  <div className="preview-line"></div>
                  <div className="preview-line"></div>
                  <div className="preview-line"></div>
                </div>

                <div className="preview-main">
                  <div className="preview-heading"></div>

                  <div className="preview-stats">
                    <div className="preview-stat purple">
                      <strong>24</strong>
                      <span>Places</span>
                    </div>

                    <div className="preview-stat cyan">
                      <strong>12</strong>
                      <span>Saved</span>
                    </div>

                    <div className="preview-stat pink">
                      <strong>08</strong>
                      <span>Trips</span>
                    </div>
                  </div>

                  <div className="preview-chart">
                    <div className="chart-bar bar-one"></div>
                    <div className="chart-bar bar-two"></div>
                    <div className="chart-bar bar-three"></div>
                    <div className="chart-bar bar-four"></div>
                    <div className="chart-bar bar-five"></div>
                    <div className="chart-bar bar-six"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="showcase-footer">
              <div className="avatar-stack">
                <span>R</span>
                <span>A</span>
                <span>K</span>
                <span>+</span>
              </div>

              <div>
                <strong>Built for modern users</strong>
                <small>Simple • Fast • Powerful</small>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}

          <div className="auth-form-section">
            <div className="auth-card">

              <div className="mobile-brand">
                <div className="brand-icon">A</div>

                <span>
                  ATLAS<span>APP</span>
                </span>
              </div>

              <div className="auth-heading">
                <span className="form-eyebrow">
                  {isLogin ? "WELCOME BACK" : "GET STARTED"}
                </span>

                <h2>
                  {isLogin
                    ? "Welcome back"
                    : "Create your account"}
                </h2>

                <p>
                  {isLogin
                    ? "Enter your details to continue to your dashboard."
                    : "Create your account and start exploring AtlasApp."}
                </p>
              </div>

              <form
                onSubmit={isLogin ? handleLogin : handleRegister}
                className="auth-form"
              >

                {/* NAME - REGISTER ONLY */}

                {!isLogin && (
                  <div className="form-group">
                    <label>Full Name</label>

                    <div className="input-wrapper">
                      <span className="input-icon">👤</span>

                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* EMAIL */}

                <div className="form-group">
                  <label>Email Address</label>

                  <div className="input-wrapper">
                    <span className="input-icon">✉</span>

                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* PASSWORD */}

                <div className="form-group">
                  <div className="label-row">
                    <label>Password</label>

                    {isLogin && (
                      <span className="forgot-password">
                        Forgot password?
                      </span>
                    )}
                  </div>

                  <div className="input-wrapper">
                    <span className="input-icon">🔒</span>

                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* SUCCESS MESSAGE */}

                {message && (
                  <div className="message success-message">
                    <span>✓</span>
                    {message}
                  </div>
                )}

                {/* ERROR MESSAGE */}

                {error && (
                  <div className="message error-message">
                    <span>!</span>
                    {error}
                  </div>
                )}

                {/* SUBMIT BUTTON */}

                <button
                  className="primary-btn"
                  type="submit"
                  disabled={loading}
                >
                  <span>
                    {loading
                      ? "Please wait..."
                      : isLogin
                      ? "Login to Dashboard"
                      : "Create Account"}
                  </span>

                  {!loading && (
                    <span className="btn-arrow">→</span>
                  )}
                </button>
              </form>

              <div className="auth-divider">
                <span>OR</span>
              </div>

              <div className="switch-auth">
                <span>
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    switchPage(isLogin ? "register" : "login")
                  }
                >
                  {isLogin ? "Create account" : "Sign in"}
                </button>
              </div>

              <div className="security-note">
                <span>🛡</span>
                <span>
                  Your information is securely protected.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // HOME / DASHBOARD
  // =========================

  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-brand">
          <div className="brand-icon">A</div>

          <div>
            <strong>
              ATLAS<span>APP</span>
            </strong>

            <small>Digital Experience</small>
          </div>
        </div>

        <div className="sidebar-section-title">
          MAIN MENU
        </div>

        <nav className="sidebar-nav">

          <button className="sidebar-link active">
            <span>⌂</span>
            Dashboard
          </button>

          <button className="sidebar-link">
            <span>✦</span>
            Explore
          </button>

          <button className="sidebar-link">
            <span>♡</span>
            Collections
          </button>

          <button className="sidebar-link">
            <span>◫</span>
            My Trips
          </button>

        </nav>

        <div className="sidebar-section-title second">
          SETTINGS
        </div>

        <nav className="sidebar-nav">

          <button className="sidebar-link">
            <span>⚙</span>
            Settings
          </button>

          <button className="sidebar-link">
            <span>?</span>
            Help Center
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="sidebar-profile">

            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="profile-details">
              <strong>
                {user?.name || "User"}
              </strong>

              <small>
                {user?.email || "user@example.com"}
              </small>
            </div>

          </div>

          <button
            className="sidebar-logout"
            onClick={handleLogout}
          >
            ↪
          </button>

        </div>
      </aside>

      {/* MAIN CONTENT */}

      <main className="dashboard-main">

        <header className="dashboard-header">

          <div>
            <span className="dashboard-eyebrow">
              DASHBOARD
            </span>

            <h1>
              Good morning,{" "}
              <span>
                {user?.name || "User"} 👋
              </span>
            </h1>

            <p>
              Here's what's happening with your collection today.
            </p>
          </div>

          <div className="header-actions">

            <button className="notification-btn">
              🔔
              <span></span>
            </button>

            <div className="header-profile">

              <div className="header-avatar">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <div>
                <strong>
                  {user?.name || "User"}
                </strong>

                <small>Member</small>
              </div>

            </div>

          </div>
        </header>

        {/* STAT CARDS */}

        <section className="stats-grid">

          <div className="stat-card purple-card">

            <div className="stat-top">
              <div className="stat-icon">✦</div>
              <span className="stat-growth">+12%</span>
            </div>

            <div className="stat-number">24</div>

            <div className="stat-label">
              Total Places
            </div>

            <div className="stat-line"></div>

          </div>

          <div className="stat-card cyan-card">

            <div className="stat-top">
              <div className="stat-icon">♡</div>
              <span className="stat-growth">+8%</span>
            </div>

            <div className="stat-number">12</div>

            <div className="stat-label">
              Saved Places
            </div>

            <div className="stat-line"></div>

          </div>

          <div className="stat-card pink-card">

            <div className="stat-top">
              <div className="stat-icon">⌁</div>
              <span className="stat-growth">+5%</span>
            </div>

            <div className="stat-number">08</div>

            <div className="stat-label">
              Upcoming Trips
            </div>

            <div className="stat-line"></div>

          </div>

          <div className="stat-card orange-card">

            <div className="stat-top">
              <div className="stat-icon">★</div>
              <span className="stat-growth">+18%</span>
            </div>

            <div className="stat-number">96%</div>

            <div className="stat-label">
              Experience Score
            </div>

            <div className="stat-line"></div>

          </div>

        </section>

        {/* CONTENT GRID */}

        <section className="dashboard-content-grid">

          <div className="featured-section">

            <div className="section-heading">

              <div>
                <span>DISCOVER</span>
                <h2>Featured experiences</h2>
              </div>

              <button>
                View all →
              </button>

            </div>

            <div className="experience-grid">

              {/* MOUNTAIN */}

              <div className="experience-card">

                <img
                  src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80"
                  alt="Mountain landscape"
                />

                <div className="experience-overlay"></div>

                <div className="experience-content">

                  <span className="experience-tag">
                    ADVENTURE
                  </span>

                  <h3>
                    Mountain Escape
                  </h3>

                  <p>
                    Discover peaceful landscapes and unforgettable
                    views.
                  </p>

                  <button>
                    Explore →
                  </button>

                </div>
              </div>

              {/* BEACH */}

              <div className="experience-card">

                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
                  alt="Beach"
                />

                <div className="experience-overlay"></div>

                <div className="experience-content">

                  <span className="experience-tag">
                    RELAXATION
                  </span>

                  <h3>
                    Beach Paradise
                  </h3>

                  <p>
                    Relax beside beautiful beaches and crystal
                    clear water.
                  </p>

                  <button>
                    Explore →
                  </button>

                </div>
              </div>

              {/* CITY */}

              <div className="experience-card">

                <img
                  src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80"
                  alt="City"
                />

                <div className="experience-overlay"></div>

                <div className="experience-content">

                  <span className="experience-tag">
                    CITY LIFE
                  </span>

                  <h3>
                    Urban Discovery
                  </h3>

                  <p>
                    Experience vibrant cities and modern
                    architecture.
                  </p>

                  <button>
                    Explore →
                  </button>

                </div>
              </div>

            </div>
          </div>

          {/* ACTIVITY PANEL */}

          <aside className="activity-panel">

            <div className="section-heading">

              <div>
                <span>RECENT</span>
                <h2>Activity</h2>
              </div>

              <button>
                •••
              </button>

            </div>

            <div className="activity-list">

              <div className="activity-item">

                <div className="activity-icon purple">
                  ✓
                </div>

                <div>
                  <strong>
                    Profile updated
                  </strong>

                  <small>
                    Just now
                  </small>
                </div>

              </div>

              <div className="activity-item">

                <div className="activity-icon cyan">
                  ♡
                </div>

                <div>
                  <strong>
                    Saved a new place
                  </strong>

                  <small>
                    2 hours ago
                  </small>
                </div>

              </div>

              <div className="activity-item">

                <div className="activity-icon pink">
                  ★
                </div>

                <div>
                  <strong>
                    Completed an experience
                  </strong>

                  <small>
                    Yesterday
                  </small>
                </div>

              </div>

              <div className="activity-item">

                <div className="activity-icon orange">
                  +
                </div>

                <div>
                  <strong>
                    Added a new trip
                  </strong>

                  <small>
                    2 days ago
                  </small>
                </div>

              </div>

            </div>

            <div className="upgrade-card">

              <div className="upgrade-glow"></div>

              <div className="upgrade-icon">
                ✦
              </div>

              <h3>
                Unlock more
              </h3>

              <p>
                Discover more features and create better
                experiences.
              </p>

              <button>
                Explore features →
              </button>

            </div>

          </aside>

        </section>

        <footer className="dashboard-footer">
          <span>
            © 2026 AtlasApp
          </span>

          <span>
            Built with React • Express • MongoDB
          </span>
        </footer>

      </main>
    </div>
  );
}

export default App;