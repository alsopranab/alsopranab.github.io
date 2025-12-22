function Contact() {
    try {
        const [formData, setFormData] = React.useState({
            name: '',
            email: '',
            subject: '',
            message: ''
        });

        // Phone lock state
        const [isPhoneUnlocked, setIsPhoneUnlocked] = React.useState(false);
        const [isUnlocking, setIsUnlocking] = React.useState(false);
        const [accessCode, setAccessCode] = React.useState('');
        const [lockError, setLockError] = React.useState('');
        const [decryptedPhone, setDecryptedPhone] = React.useState('');

        // Encrypted phone number data (XOR obfuscation)
        // Hidden from plain text inspection
        // Decodes to: +91 9366036448
        // Key: Be1lieveInYourself
        const binaryData = [105, 92, 0, 76, 80, 86, 64, 83, 121, 93, 111, 91, 65, 74];

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            // Construct mailto link
            const subject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
            const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
            window.location.href = `mailto:carrer.pranab@gmail.com?subject=${subject}&body=${body}`;
        };

        const handleUnlock = (e) => {
            e.preventDefault();
            const key = accessCode.trim();
            
            if (!key) {
                setLockError('Please enter the access code.');
                return;
            }

            try {
                // Attempt decryption
                const decrypted = binaryData.map((byte, i) => {
                    return String.fromCharCode(byte ^ key.charCodeAt(i % key.length));
                }).join('');

                // Validate if the decryption resulted in a likely phone number (starts with +)
                if (decrypted.startsWith('+91')) {
                    setDecryptedPhone(decrypted);
                    setIsPhoneUnlocked(true);
                    setIsUnlocking(false);
                    setLockError('');
                } else {
                    console.error('Decryption failed. Result:', decrypted);
                    setLockError('Incorrect access code.');
                }
            } catch (err) {
                console.error(err);
                setLockError('An error occurred.');
            }
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
                            Open to roles in Data Analytics, Business Intelligence, and Automation. Happy to discuss projects, collaborations, or consulting opportunities.
                        </p>
                        
                        <div className="space-y-4 mt-6">
                            <div className="flex items-center gap-5 p-5 bg-white rounded-xl border border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[var(--primary-color)] opacity-80">
                                    <div className="icon-map-pin w-5 h-5"></div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-0.5">Location</div>
                                    <div className="text-gray-900 font-normal">Bengaluru, India</div>
                                </div>
                            </div>

                            <a href="mailto:carrer.pranab@gmail.com" className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:border-[var(--primary-color)] transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[var(--primary-color)] group-hover:bg-[var(--primary-color)] group-hover:text-white transition-colors">
                                    <div className="icon-mail"></div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-medium uppercase">Email</div>
                                    <div className="text-gray-900 font-medium break-all">carrer.pranab@gmail.com</div>
                                </div>
                            </a>

                            {/* Password Protected Phone Number */}
                            <div className="flex flex-col gap-2 p-4 bg-white rounded-lg border border-gray-100 shadow-sm transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isPhoneUnlocked ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                        <div className={isPhoneUnlocked ? "icon-phone" : "icon-lock"}></div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500 font-medium uppercase">Phone</div>
                                        {isPhoneUnlocked ? (
                                            <a href={`tel:${decryptedPhone.replace(/\s/g, '')}`} className="text-gray-900 font-medium hover:text-[var(--primary-color)]">
                                                {decryptedPhone}
                                            </a>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-400 font-medium">Locked *********</span>
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
                                
                                {isUnlocking && !isPhoneUnlocked && (
                                    <div className="mt-2 pl-14 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <form onSubmit={handleUnlock} className="flex gap-2">
                                            <input 
                                                type="password" 
                                                placeholder="Enter access code" 
                                                className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[var(--primary-color)] outline-none"
                                                value={accessCode}
                                                onChange={(e) => setAccessCode(e.target.value)}
                                                autoFocus
                                            />
                                            <button type="submit" className="px-3 py-1 bg-[var(--primary-color)] text-white text-xs rounded hover:bg-[var(--primary-light)]">
                                                Verify
                                            </button>
                                        </form>
                                        {lockError && <p className="text-xs text-red-500 mt-1">{lockError}</p>}
                                        <p className="text-xs text-gray-400 mt-2">
                                            Please <a href="mailto:carrer.pranab@gmail.com?subject=Request Phone Access" className="text-[var(--primary-color)] hover:underline">email me</a> to request the access code.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="card">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
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
                            <button type="submit" className="w-full btn btn-primary flex items-center justify-center gap-2">
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
