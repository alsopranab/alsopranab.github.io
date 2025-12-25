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
  const [loading, setLoading] = React.useState(true);

  return (
    <div data-name="app" data-file="app.js">
      {/* Entry Loader */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div className={`min-h-screen flex flex-col lg:flex-row transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Mobile Header / Navbar for small screens */}
        <div className="lg:hidden sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 p-4">
            <Navbar />
        </div>

        {/* Left Sidebar (Fixed on Desktop) */}
        <aside className="w-full lg:w-[var(--sidebar-width)] lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:overflow-y-auto bg-white border-r border-gray-200 z-40">
            <Sidebar />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-[var(--sidebar-width)] px-4 md:px-8 lg:px-12 pb-12 pt-0 lg:pt-0 max-w-7xl mx-auto w-full">
            
            {/* Desktop Sticky Navbar */}
            <div className="hidden lg:block sticky top-0 bg-[var(--bg-color)]/95 backdrop-blur z-30 py-3 border-b border-gray-200/50 mb-10 shadow-sm">
                <Navbar />
            </div>

            <div className="space-y-24 mt-8 lg:mt-0">
                <section id="projects" className="scroll-mt-32">
                    <Projects />
                </section>

                <section id="analytics" className="scroll-mt-32">
                    <Analytics />
                </section>

                <section id="cp" className="scroll-mt-32">
                    <CompetitiveProgramming />
                </section>

                <section id="experience" className="scroll-mt-32">
                    <Experience />
                </section>

                <section id="education" className="scroll-mt-32">
                    <Education />
                </section>

                <section id="contact" className="scroll-mt-32">
                    <Contact />
                </section>
            </div>

            <footer className="pt-20 pb-6 text-center text-gray-400 text-sm">
                <p>&copy; 2025 Pranab Debnath. All rights reserved.</p>
                <p className="mt-1">Built with React & Tailwind CSS.</p>
            </footer>
        </main>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
