function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 py-12" data-name="footer" data-file="components/Footer.js">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <div className="flex justify-center space-x-8 mb-8">
                    <a href="#" className="text-slate-400 hover:text-[var(--primary)] transition-colors">
                        <div className="icon-github text-2xl"></div>
                    </a>
                    <a href="#" className="text-slate-400 hover:text-[var(--primary)] transition-colors">
                        <div className="icon-linkedin text-2xl"></div>
                    </a>
                    <a href="#" className="text-slate-400 hover:text-[var(--primary)] transition-colors">
                        <div className="icon-twitter text-2xl"></div>
                    </a>
                    <a href="#" className="text-slate-400 hover:text-[var(--primary)] transition-colors">
                        <div className="icon-mail text-2xl"></div>
                    </a>
                </div>
                <p className="text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} Data Analyst Portfolio. Built with React & Tailwind.
                </p>
                <p className="text-slate-600 text-xs mt-2">
                    Designed for high-performance and scalability.
                </p>
            </div>
        </footer>
    );
}