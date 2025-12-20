function Certifications() {
    const [selectedCert, setSelectedCert] = React.useState(null);

    const certs = [
        { 
            title: "Top SQL 50", 
            issuer: "LeetCode", 
            color: "bg-yellow-500/10 border-yellow-500/30", 
            icon: "code",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
        },
        { 
            title: "SQL Advanced", 
            issuer: "HackerRank", 
            color: "bg-green-500/10 border-green-500/30", 
            icon: "database",
            image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
        },
        { 
            title: "Data Analysis", 
            issuer: "Google", 
            color: "bg-blue-500/10 border-blue-500/30", 
            icon: "chart-bar",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
        },
        { 
            title: "Python for Data Science", 
            issuer: "IBM", 
            color: "bg-indigo-500/10 border-indigo-500/30", 
            icon: "terminal",
            image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
        },
        { 
            title: "Machine Learning", 
            issuer: "Stanford Online", 
            color: "bg-purple-500/10 border-purple-500/30", 
            icon: "cpu",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
        },
    ];

    return (
        <section id="certifications" className="section-padding overflow-hidden" data-name="certifications" data-file="components/Certifications.js">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">
                Certifications & <span className="text-blue-400">Awards</span>
            </h2>

            {/* Horizontal Scroll Container */}
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory px-4 scrollbar-hide -mx-4 md:mx-0">
                {certs.map((cert, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => setSelectedCert(cert)}
                        className={`snap-center flex-shrink-0 w-80 group relative aspect-[4/3] rounded-2xl border backdrop-blur-sm overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl ${cert.color}`}
                    >
                        {/* Placeholder for Image */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                <div className={`icon-${cert.icon} text-3xl text-slate-300 group-hover:text-white transition-colors`}></div>
                            </div>
                            <h3 className="font-bold text-lg text-slate-200 group-hover:text-white">{cert.title}</h3>
                            <p className="text-sm text-slate-400">{cert.issuer}</p>
                            <div className="mt-4 px-4 py-2 bg-white/10 rounded-full text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                View Certificate
                            </div>
                        </div>
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                ))}
            </div>
            
            <div className="mt-4 flex justify-center gap-2">
                <div className="text-slate-500 text-sm flex items-center gap-2">
                    <div className="icon-arrow-left"></div> Scroll <div className="icon-arrow-right"></div>
                </div>
            </div>

            <Lightbox 
                isOpen={!!selectedCert} 
                onClose={() => setSelectedCert(null)} 
                title={selectedCert?.title}
                image={selectedCert?.image} 
            />
        </section>
    );
}
