function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState('projects');

    const navItems = [
        { id: 'projects', label: 'Projects' },
        { id: 'analytics', label: 'Analytics' },
        { id: 'cp', label: 'Skills & CP' },
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'contact', label: 'Contact' },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for sticky header
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
        setActiveSection(id);
    };

    // Scroll spy effect
    React.useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;
            
            for (const item of navItems) {
                const element = document.getElementById(item.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(item.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="w-full relative" data-name="Navbar" data-file="components/Navbar.js">
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative group py-1 ${
                            activeSection === item.id 
                            ? 'text-[var(--primary-color)]' 
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                    >
                        {item.label}
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[var(--primary-color)] transform origin-left transition-transform duration-300 ${
                            activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}></span>
                    </button>
                ))}
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden flex items-center justify-between w-full">
                <span className="font-semibold text-gray-800 text-lg">Menu</span>
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-gray-600 hover:text-[var(--primary-color)] transition-colors focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <div className="icon-x w-6 h-6"></div> : <div className="icon-menu w-6 h-6"></div>}
                </button>
            </div>

            {/* Mobile Slide-in Menu */}
            <div className={`lg:hidden fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-gray-900">Navigation</h2>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500">
                            <div className="icon-x w-6 h-6"></div>
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`text-left text-lg font-medium py-2 px-4 rounded-lg transition-colors ${
                                    activeSection === item.id 
                                    ? 'bg-teal-50 text-[var(--primary-color)]' 
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <div className="mt-auto text-xs text-gray-400 text-center">
                        &copy; 2025 Pranab Debnath
                    </div>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </nav>
    );
}
