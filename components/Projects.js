function Projects() {
    const [activeCode, setActiveCode] = React.useState(null);

    const projects = [
        {
            title: "E-commerce Sales Dashboard",
            desc: "Interactive dashboard analyzing customer purchase behavior and seasonal trends using Python and Tableau.",
            tags: ["Python", "SQL", "Tableau"],
            icon: "shopping-cart",
            codeSnippet: `
import pandas as pd
import matplotlib.pyplot as plt

# Load sales data
df = pd.read_csv('sales_data.csv')

# Calculate monthly revenue
monthly_revenue = df.groupby('month')['revenue'].sum()

# Identify top performing products
top_products = df.groupby('product_id')['sales'].count().sort_values(ascending=False).head(5)

print(f"Top Product: {top_products.index[0]}")
            `,
            lang: "python",
            file: "analysis.py"
        },
        {
            title: "Customer Churn Prediction",
            desc: "Machine learning model to identify at-risk customers, achieving 85% accuracy on test data.",
            tags: ["Scikit-learn", "Pandas", "Matplotlib"],
            icon: "users",
            codeSnippet: `
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy:.2f}")
            `,
            lang: "python",
            file: "train_model.py"
        },
        {
            title: "Supply Chain Optimization",
            desc: "SQL-based analysis of inventory turnover reducing storage costs by 15% for a retail client.",
            tags: ["Advanced SQL", "Excel", "Optimization"],
            icon: "truck",
            codeSnippet: `
SELECT 
    warehouse_id,
    product_id,
    AVG(inventory_level) as avg_inventory,
    SUM(quantity_sold) as total_sold,
    (SUM(quantity_sold) / AVG(inventory_level)) as turnover_ratio
FROM inventory_log
WHERE date >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
GROUP BY warehouse_id, product_id
HAVING turnover_ratio < 0.5;
            `,
            lang: "sql",
            file: "optimization.sql"
        },
        {
            title: "Social Media Sentiment Analysis",
            desc: "NLP pipeline processing 50k+ tweets to gauge brand sentiment during product launches.",
            tags: ["NLP", "NLTK", "API Integration"],
            icon: "message-circle",
            codeSnippet: `
const analyzeSentiment = async (text) => {
    const response = await fetch('https://api.sentiment.io/analyze', {
        method: 'POST',
        body: JSON.stringify({ text })
    });
    return await response.json();
};

// Batch process
tweets.forEach(tweet => {
    const score = analyzeSentiment(tweet.content);
    console.log(score);
});
            `,
            lang: "javascript",
            file: "sentiment.js"
        }
    ];

    return (
        <section id="projects" className="section-padding" data-name="projects" data-file="components/Projects.js">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                <span className="text-[var(--primary)]">02.</span> Featured Projects
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                    <div key={idx} className="card group hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-[var(--primary)] group-hover:text-[var(--primary)] transition-colors">
                                <div className={`icon-${project.icon} text-2xl`}></div>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setActiveCode(activeCode === idx ? null : idx)}
                                    className={`text-xs flex items-center gap-1 px-3 py-1.5 rounded-full transition-all ${activeCode === idx ? 'bg-[var(--primary)] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                                >
                                    <div className="icon-code text-sm"></div> 
                                    {activeCode === idx ? 'Hide Code' : 'View Code'}
                                </button>
                                <a href="#" className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all">
                                    <div className="icon-external-link text-sm"></div> Demo
                                </a>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors">
                            {project.title}
                        </h3>
                        
                        <p className="text-[var(--text-muted)] mb-6">
                            {project.desc}
                        </p>

                        {/* Collapsible Code Viewer */}
                        {activeCode === idx && (
                            <div className="mb-6 animate-fade-in-up">
                                <CodeViewer code={project.codeSnippet} language={project.lang} title={project.file} />
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs font-medium text-violet-200 bg-violet-500/10 px-3 py-1.5 rounded-full border border-violet-500/20 hover:border-violet-500/50 hover:shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all cursor-default">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="text-center mt-12">
                <a href="https://github.com" target="_blank" className="btn btn-outline inline-flex items-center gap-2 group">
                    View Full Project Archive 
                    <div className="icon-arrow-right group-hover:translate-x-1 transition-transform"></div>
                </a>
            </div>
        </section>
    );
}
