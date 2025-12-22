function Analytics() {
    try {
        return (
            <div className="space-y-8" data-name="Analytics" data-file="components/Analytics.js">
                <h2 className="section-title font-light text-3xl border-b border-gray-100 pb-4">
                    <div className="icon-chart-bar text-[var(--primary-color)] w-6 h-6 opacity-80"></div>
                    GitHub Analytics
                </h2>

                <div className="card">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-medium text-gray-800">Contribution Activity</h3>
                        <span className="text-xs text-gray-400 font-light">Last Year</span>
                    </div>
                    
                    {/* Github Contribution Graph Image Embed */}
                    <div className="w-full overflow-x-auto pb-2">
                        <img 
                            src="https://ghchart.rshah.org/0F766E/alsopranab" 
                            alt="Pranab's Github Chart" 
                            className="min-w-[600px] w-full"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card">
                        <h3 className="font-semibold text-gray-800 mb-4">Tech Stack & Languages</h3>
                        {/* Placeholder for language stats since we don't have a backend to aggregate all repos efficiently on the fly without heavy API usage */}
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="font-medium text-gray-700">SQL / PLpgSQL</span>
                                    <span className="text-gray-500">45%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-[var(--primary-color)] h-2 rounded-full" style={{width: '45%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="font-medium text-gray-700">Python</span>
                                    <span className="text-gray-500">30%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '30%'}}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="font-medium text-gray-700">JavaScript</span>
                                    <span className="text-gray-500">20%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-yellow-400 h-2 rounded-full" style={{width: '20%'}}></div>
                                </div>
                            </div>
                             <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="font-medium text-gray-700">Power BI / DAX</span>
                                    <span className="text-gray-500">5%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '5%'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card flex flex-col justify-center">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                <div className="icon-activity text-xl"></div>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-gray-900">Consistency Matters</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    These charts highlight ongoing contributions, preferred tech stack, and consistency in solving real-world problems through code.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Analytics component error:', error);
        return null;
    }
}
