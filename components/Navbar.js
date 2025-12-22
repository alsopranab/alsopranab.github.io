function Navbar() {
    try {
        const scrollToSection = (id) => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        };

        const navItems = [
            { id: 'projects', label: 'Projects' },
            { id: 'analytics', label: 'Analytics' },
            { id: 'cp', label: 'SQL & CP' },
            { id: 'experience', label: 'Experience' },
            { id: 'education', label: 'Education' },
            { id: 'contact', label: 'Contact' },
        ];

        return (
            <nav className="flex items-center justify-between lg:justify-start lg:gap-8 overflow-x-auto pb-1 lg:pb-0" data-name="Navbar" data-file="components/Navbar.js">
                <div className="flex gap-6 w-full lg:w-auto justify-center lg:justify-start">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="nav-link text-sm font-normal whitespace-nowrap tracking-wide"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>
        );
    } catch (error) {
        console.error('Navbar error:', error);
        return null;
    }
}
