function Contact() {
    try {
        const [formData, setFormData] = React.useState({
            name: '',
            email: '',
            subject: '',
            message: ''
        });

        // Password / unlock state (UI only)
        const [isUnlocking, setIsUnlocking] = React.useState(false);
        const [accessCode, setAccessCode] = React.useState('');
        const [lockError, setLockError] = React.useState('');
        const [isVerified, setIsVerified] = React.useState(false);

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

        const handleUnlock = (e) => {
            e.preventDefault();

            if (!accessCode.trim()) {
                setLockError('Please enter the access code.');
                return;
            }

            // No decryption, no secrets — intent-based verification only
            setIsVerified(true);
            setLockError('');
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
                                    <div className="text-xs text-gray-500 font-medium uppercase">Email</div>
                                    <div className="text-gray-900 font-medium break-all">
                                        carrer.pranab@gmail.com
                                    </div>
                                </div>
                            </a>

                            {/* Phone (Password Protected UI) */}
                            <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        isVerified ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        <div className={isVerified ? 'icon-check' : 'icon-lock'}></div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500 font-medium uppercase">
                                            Phone
                                        </div>

                                        {isVerified ? (
                                            <div className="text-sm text-gray-600 font-medium">
                                                Access request verified. Please email to receive the number.
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-400 font-medium">
                                                    Locked *********
                                                </span>
                                                {!isUnlocking && (
                                                    <button
                                                        onClick={() => setIsUnlocking(true)}
                                                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-gray-600 font-medium"
                                                    >
                                                        Unlock
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {isUnlocking && !isVerified && (
                                    <div className="mt-2 pl-14">
                                        <form onSubmit={handleUnlock} className="flex gap-2">
                                            <input
                                                type="password"
                                                placeholder="Enter access code"
                                                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[var(--primary-color)] outline-none"
                                                value={accessCode}
                                                onChange={(e) => setAccessCode(e.target.value)}
                                                autoFocus
                                            />
                                            <button
                                                type="submit"
                                                className="px-3 py-1 bg-[var(--primary-color)] text-white text-xs rounded hover:bg-[var(--primary-light)]"
                                            >
                                                Verify
                                            </button>
                                        </form>

                                        {lockError && (
                                            <p className="text-xs text-red-500 mt-1">{lockError}</p>
                                        )}

                                        <p className="text-xs text-gray-400 mt-2">
                                            Please{' '}
                                            <a
                                                href="mailto:carrer.pranab@gmail.com?subject=Request Phone Access"
                                                className="text-[var(--primary-color)] hover:underline"
                                            >
                                                email me
                                            </a>{' '}
                                            to receive the phone number.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Send a Message
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Your Name"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="your@email.com"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="subject"
                                required
                                placeholder="Project Inquiry"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                            <textarea
                                name="message"
                                rows="4"
                                required
                                placeholder="How can I help you?"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 resize-none"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full btn btn-primary"
                            >
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
