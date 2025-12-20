function CodeViewer({ code, language = 'javascript', title = 'script.js' }) {
    React.useEffect(() => {
        if (window.Prism) {
            window.Prism.highlightAll();
        }
    }, [code]);

    return (
        <div className="rounded-lg overflow-hidden bg-[#1e1e1e] border border-[#333] shadow-2xl font-mono text-sm my-4">
            {/* VS Code Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#333]">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    </div>
                    <span className="ml-3 text-slate-400 text-xs">{title}</span>
                </div>
                <div className="text-xs text-slate-500 uppercase">{language}</div>
            </div>
            
            {/* Code Area */}
            <div className="relative overflow-x-auto max-h-[300px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <pre className="!m-0 !p-4 !bg-transparent !text-sm">
                    <code className={`language-${language}`}>
                        {code.trim()}
                    </code>
                </pre>
            </div>
        </div>
    );
}