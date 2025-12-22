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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black bg-gray-900 text-white px-4 py-2 rounded"
            >
              Reload Page
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
      <div className="min-h-screen flex flex-col lg:flex-row" data-name="app" data-file="app.js">
        
        {/* Mobile Header / Navbar for small screens */}
        <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-gray-200 p-4">
            <Navbar />
        </div>

        {/* Left Sidebar (Fixed on Desktop) */}
        <aside className="w-full lg:w-[var(--sidebar-width)] lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:overflow-y-auto bg-white border-r border-gray-200 z-40">
            <Sidebar />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-[var(--sidebar-width)] p-4 md:p-8 lg:p-12 space-y-16 max-w-7xl mx-auto w-full">
            
            {/* Desktop Navbar (Hidden on mobile) */}
            <div className="hidden lg:block sticky top-0 bg-[var(--bg-color)]/95 backdrop-blur z-30 py-4 mb-8 -mt-4 border-b border-gray-200/50">
                <Navbar />
            </div>

            <section id="projects" className="scroll-mt-24">
                <Projects />
            </section>

            <section id="analytics" className="scroll-mt-24">
                <Analytics />
            </section>

            <section id="cp" className="scroll-mt-24">
                <CompetitiveProgramming />
            </section>

            <section id="experience" className="scroll-mt-24">
                <Experience />
            </section>

            <section id="education" className="scroll-mt-24">
                <Education />
            </section>

            <section id="contact" className="scroll-mt-24">
                <Contact />
            </section>

            <footer className="pt-12 pb-6 text-center text-gray-400 text-sm">
                <p>&copy; 2025 Pranab Debnath. All rights reserved.</p>
                <p className="mt-1">Built with Passion · Designed for Data Analytics & Automation..</p>
            </footer>
        </main>
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
