function Lightbox({ isOpen, onClose, image, title }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
                <div className="icon-x text-4xl"></div>
            </button>
            
            <div className="max-w-5xl w-full p-4 relative" onClick={e => e.stopPropagation()}>
                <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20">
                    {image ? (
                        <img src={image} alt={title} className="w-full h-auto max-h-[80vh] object-contain bg-black" />
                    ) : (
                         <div className="w-full h-[60vh] bg-slate-900 flex items-center justify-center flex-col gap-4">
                            <div className="icon-image text-6xl text-slate-700"></div>
                            <p className="text-slate-500">Image Preview Placeholder</p>
                         </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <h3 className="text-xl font-bold text-white">{title}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
