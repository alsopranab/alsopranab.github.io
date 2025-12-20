function Header() {
    const [scrolled, setScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'GitHub', href: '#github' },
        { name: 'Analytics', href: '#analytics' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[var(--bg-dark)]/90 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'}`} data-name="header" data-file="components/Header.js">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-[var(--nav-height)]">
                    <div className="flex-shrink-0 flex items-center">
                        <a href="#" className="text-2xl font-bold tracking-tighter text-white">
                            PRA<span className="text-[var(--accent)]">.NAB</span>
                        </a>
                    </div>
                    
                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="nav-link">
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-300 hover:text-white p-2"
                        >
                            <div className={mobileMenuOpen ? "icon-x text-2xl" : "icon-menu text-2xl"}></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[var(--bg-card)] border-b border-slate-700">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.href} 
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-slate-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
