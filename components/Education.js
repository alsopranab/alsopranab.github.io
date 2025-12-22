function Education() {
    try {
        return (
            <div className="space-y-8" data-name="Education" data-file="components/Education.js">
                <h2 className="section-title font-light text-3xl border-b border-gray-100 pb-4">
                    <div className="icon-graduation-cap text-[var(--primary-color)] w-6 h-6 opacity-80"></div>
                    Education & Certifications
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Degree */}
                    <div className="card border-l-4 border-l-[var(--primary-color)]">
                        <h3 className="font-medium text-lg text-gray-900 mb-1">Bachelor’s Degree – Health Sciences</h3>
                        <p className="text-gray-600 text-sm mb-4 font-light">Rajiv Gandhi University of Health Sciences (RGUHS)</p>
                        <p className="text-gray-400 text-xs font-light">2019 - 2023</p>
                        <div className="mt-6 pt-4 border-t border-gray-50">
                             <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-2">Relevant Coursework</p>
                             <p className="text-sm text-gray-600 font-light leading-relaxed">Airway & Tracheostomy Care,EMA(Emergency Medication Administration),IV Therapy & Monitoring,Assistance in Surgical & Clinical Procedures (Including Lithotomy Positioning)</p>
                        </div>
                    </div>

                    {/* Certifications List */}
                    <div className="card">
                        <h3 className="font-medium text-lg text-gray-900 mb-6">Certifications</h3>
                        <div className="space-y-5">
                            <div className="flex gap-3 items-start">
                                <div className="mt-0.5 text-green-600 opacity-80">
                                    <div className="icon-check w-4 h-4"></div>
                        {/*Cerifications 1*/}
                                </div>
                                <div>
                                    <h4 className="font-normal text-gray-800 text-sm">Master Course in Healthcare Leadership & Clinical Leadership</h4>
                                    <p className="text-xs text-gray-400 font-light mt-0.5">Udemy</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1 bg-green-100 rounded p-1 h-fit">
                                    <div className="icon-check w-3 h-3 text-green-600"></div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800 text-sm">HTML, CSS, JavaScript, React - Online Certification Course</h4>
                                    <p className="text-xs text-gray-500">YouAccel Training, Blue Digital Media </p>
                                </div>
                            </div>
                             <div className="flex gap-3">
                                <div className="mt-1 bg-green-100 rounded p-1 h-fit">
                                    <div className="icon-check w-3 h-3 text-green-600"></div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800 text-sm">Master Pandas: Basics To Advanced - To Become A Data Analyst</h4>
                                    <p className="text-xs text-gray-500">Udemy</p>
                                </div>
                            </div>
{/*Just Copy and Paste this layout and add your cerifications*/}
{/*Cerifications Layout*/}
                             <div className="flex gap-3">
                                <div className="mt-1 bg-green-100 rounded p-1 h-fit">
                                    <div className="icon-check w-3 h-3 text-green-600"></div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800 text-sm">Python for Data Analysis</h4>
                                    <p className="text-xs text-gray-500">Udemy</p>
                                </div>
                            </div>
{/*CerificationsLast*/}
                                     <div className="flex gap-3">
                                <div className="mt-1 bg-green-100 rounded p-1 h-fit">
                                    <div className="icon-check w-3 h-3 text-green-600"></div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800 text-sm">Professional Certificate in SQL and SQL for Data Analysis</h4>
                                    <p className="text-xs text-gray-500">Udemy</p>
                                </div>
                            </div>
                                     <div className="flex gap-3">
                                <div className="mt-1 bg-green-100 rounded p-1 h-fit">
                                    <div className="icon-check w-3 h-3 text-green-600"></div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800 text-sm">Professional Certificate in SQL and SQL for Data Analysis</h4>
                                    <p className="text-xs text-gray-500">Udemy</p>
                                </div>
                            </div>
{/*And here is the end*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Education component error:', error);
        return null;
    }
}
