// Important: DO NOT remove this `ErrorBoundary` component.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center p-8 bg-slate-900 rounded-2xl shadow-xl border border-slate-800">
            <h1 className="text-2xl font-bold text-red-500 mb-4">System Error</h1>
            <p className="text-slate-400 mb-6">The dashboard encountered an unexpected issue.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-full text-white transition-colors"
            >
              Reboot System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    return (
      <div className="min-h-screen bg-[var(--bg-dark)] text-slate-100" data-name="app" data-file="app.js">
        <Header />
        <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <GitHubStats />
            <Certifications />
            <Dashboard />
            <Testimonials />
            <Contact />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
