function Loader({ onComplete }) {
    const [progress, setProgress] = React.useState(0);
    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setVisible(false);
                        if (onComplete) onComplete();
                    }, 500);
                    return 100;
                }
                // Randomize progress increment for realistic feel
                return prev + Math.floor(Math.random() * 15) + 5;
            });
        }, 200);

        return () => clearInterval(timer);
    }, [onComplete]);

    if (!visible) return null;

    return (
        <div className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-opacity duration-500 ${progress === 100 ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-64 space-y-4">
                {/* Animated Bar Chart Icon */}
                <div className="flex items-end justify-center gap-2 h-16 mb-6">
                    <div className="w-3 bg-[var(--primary-color)] animate-[bounce_1s_infinite] rounded-t-sm" style={{ height: '40%', animationDelay: '0ms' }}></div>
                    <div className="w-3 bg-[var(--primary-color)] animate-[bounce_1.2s_infinite] rounded-t-sm" style={{ height: '70%', animationDelay: '200ms' }}></div>
                    <div className="w-3 bg-[var(--primary-color)] animate-[bounce_0.8s_infinite] rounded-t-sm" style={{ height: '50%', animationDelay: '400ms' }}></div>
                    <div className="w-3 bg-[var(--primary-color)] animate-[bounce_1.4s_infinite] rounded-t-sm" style={{ height: '90%', animationDelay: '100ms' }}></div>
                    <div className="w-3 bg-[var(--primary-color)] animate-[bounce_1.1s_infinite] rounded-t-sm" style={{ height: '60%', animationDelay: '300ms' }}></div>
                </div>

                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-[var(--primary-color)] transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 font-mono">
                    <span>LOADING DATA</span>
                    <span>{Math.min(progress, 100)}%</span>
                </div>
            </div>
        </div>
    );
}
