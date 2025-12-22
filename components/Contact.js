function Contact() {
    try {
        const [formData, setFormData] = React.useState({
            name: '',
            email: '',
            subject: '',
            message: ''
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
            );
            window.location.href = `mailto:carrer.pranab@gmail.com?subject=${subject}&body=${body}`;
        };

        return (
            <div className="space-y-8" data-name="Contact" data-file="components/Contact.js">
                <h2 className="section-title font-light text-3xl border-b border-gray-100 pb-4">
                    <div className="icon-mail text-[var(--primary-color)] w-6 h-6 opacity-80"></div>
                    Contact
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <p className="text-gray-600 text-lg leading-relaxed font-light">
                            Open to roles in Data Analytics, Business Intelligence, and Automation. 
                            Happy to discuss projects, collaborations, or consulting opportunities.
                        </p>

                        <div className="space-y-4 mt-6">
                            {/* Location */}
                            <div className="flex items-center gap-5 p-5 bg-white rounded-xl border border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[var(--primary-color)] opacity-80">
                                    <div className="icon-map-pin w-5 h-5"></div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-0.5">
                                        Location
                                    </div>
                                    <div className="text-gray-900 font-normal">
                                        Bengaluru, India
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <a
                                href="mailto:carrer.pranab@gmail.com"
                                className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:border-[var(--primary-color)] transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[var(--primary-color)] group-hover:bg-[var(--primary-color)] group-hover:text-white transition-colors">
                                    <div className="icon-mail"></div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-medium uppercase">
                                        Email
                                    </div>
                                    <div className="text-gray-900 font-medium break-all">
                                        carrer.pranab@gmail.com
                                    </div>
                                </div>
                            </a>

                            {/* Phone (Secure & Intentional) */}
                            <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                    <div className="icon-lock"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-gray-500 font-medium uppercase">
                                        Phone
                                    </div>
                                    <div className="text-gray-400 text-sm font-medium">
                                        Available on request
                                    </div>
                                    <a
                                        href="mailto:carrer.pranab@gmail.com?subject=Request Phone Number"
                                        className="text-xs text-[var(--primary-color)] hover:underline"
                                    >
                                        Request via email
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Send a Message
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition-all"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition-all"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition-all"
                                    placeholder="Project Inquiry"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition-all resize-none"
                                    placeholder="How can I help you?"
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full btn btn-primary flex items-center justify-center gap-2"
                            >
                                <div className="icon-send w-4 h-4"></div>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Contact component error:', error);
        return null;
    }
}
