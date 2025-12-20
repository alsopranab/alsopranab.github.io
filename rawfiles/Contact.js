function Contact() {
    const [status, setStatus] = React.useState('idle'); // idle, submitting, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate sending
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    return (
        <section id="contact" className="section-padding max-w-4xl mx-auto" data-name="contact" data-file="components/Contact.js">
            <div className="card bg-slate-800/80 border-[var(--primary)]/30 backdrop-blur-sm">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-[var(--primary)]">05.</span> Get In Touch
                    </h2>
                    <p className="text-[var(--text-muted)] max-w-md mx-auto">
                        Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>
                </div>

                {status === 'success' ? (
                    <div className="text-center py-12">
                         <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <div className="icon-check text-3xl"></div>
                         </div>
                         <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                         <p className="text-slate-400">Thank you for reaching out. I'll check it soon.</p>
                         <button onClick={() => setStatus('idle')} className="mt-6 btn btn-outline">Send Another</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                            <input 
                                type="text" 
                                required 
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                            <input 
                                type="email" 
                                required 
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                            <textarea 
                                required 
                                rows="4" 
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all"
                                placeholder="Hello, I'd like to discuss..."
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            disabled={status === 'submitting'}
                            className="w-full btn btn-primary justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'submitting' ? (
                                <>Processing...</>
                            ) : (
                                <>Send Message <div className="icon-send text-lg ml-2"></div></>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}