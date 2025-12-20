import React from "react";
import CodeViewer from "./CodeViewer";

function Projects() {
  const [activeCode, setActiveCode] = React.useState(null);

  const projects = [
    {
      title: "Uber-Data-Analysis",
      desc: "Python-based EDA of Uber trip data to analyze ride patterns, demand trends, service categories, and fare behavior.",
      tags: ["Python", "Matplotlib", "Numpy"],
      icon: "shopping-cart",
      codeSnippet: `
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

dataset = pd.read_csv("UberDataset.csv")

dataset['PURPOSE'].fillna("NOT", inplace=True)
dataset['START_DATE'] = pd.to_datetime(dataset['START_DATE'], errors='coerce')
dataset['END_DATE'] = pd.to_datetime(dataset['END_DATE'], errors='coerce')

dataset['hour'] = dataset['START_DATE'].dt.hour
dataset['day-night'] = pd.cut(
    dataset['hour'],
    bins=[0,10,15,19,24],
    labels=['Morning','Afternoon','Evening','Night'],
    right=False
)

dataset.dropna(inplace=True)
dataset.drop_duplicates(inplace=True)

sns.countplot(x='CATEGORY', data=dataset)
sns.countplot(x='PURPOSE', data=dataset)
plt.show()
      `,
      lang: "python",
      file: "uber_analysis.py"
    },

    {
      title: "DynamicReport-ETL",
      desc: "Automated XLSB → CSV → Google Sheets ETL pipeline using Apps Script.",
      tags: ["Apps Script", "ETL", "Automation"],
      icon: "users",
      codeSnippet: `
function xlsbWebendlinkgenerator() {
  const folderId = "FOLDER_ID";
  const folder = DriveApp.getFolderById(folderId);
  const query = 'subject:"Lead assign vs connectivity report" has:attachment';

  const threads = GmailApp.search(query, 0, 5);
  if (!threads.length) return;

  const msg = threads[0].getMessages().pop();
  const attachments = msg.getAttachments();

  attachments.forEach(att => {
    if (att.getName().endsWith(".xlsb")) {
      const file = folder.createFile(att);
      file.setSharing(
        DriveApp.Access.ANYONE_WITH_LINK,
        DriveApp.Permission.VIEW
      );
    }
  });
}
      `,
      lang: "javascript",
      file: "etl.gs"
    },

    {
      title: "Social Media Sentiment Analysis",
      desc: "NLP pipeline to analyze tweet sentiment during product launches.",
      tags: ["NLP", "API", "JavaScript"],
      icon: "message-circle",
      codeSnippet: `
const analyzeSentiment = async (text) => {
  const res = await fetch("https://api.sentiment.io/analyze", {
    method: "POST",
    body: JSON.stringify({ text })
  });
  return res.json();
};

tweets.forEach(async tweet => {
  const score = await analyzeSentiment(tweet.content);
  console.log(score);
});
      `,
      lang: "javascript",
      file: "sentiment.js"
    }
  ];

  return (
    <section
      id="projects"
      className="section-padding"
      data-name="projects"
      data-file="components/Projects.js"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        <span className="text-[var(--primary)]">02.</span> Featured Projects
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="card group hover:-translate-y-2 transition-transform duration-300 flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-[var(--primary)] group-hover:text-[var(--primary)] transition-colors">
                <div className={`icon-${project.icon} text-2xl`} />
              </div>

              <button
                onClick={() =>
                  setActiveCode(activeCode === idx ? null : idx)
                }
                className={`text-xs flex items-center gap-1 px-3 py-1.5 rounded-full transition-all ${
                  activeCode === idx
                    ? "bg-[var(--primary)] text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <div className="icon-code text-sm" />
                {activeCode === idx ? "Hide Code" : "View Code"}
              </button>
            </div>

            <h3 className="text-xl font-bold mb-3 group-hover:text-[var(--primary)] transition-colors">
              {project.title}
            </h3>

            <p className="text-[var(--text-muted)] mb-6">
              {project.desc}
            </p>

            {activeCode === idx && (
              <div className="mb-6 animate-fade-in-up">
                <CodeViewer
                  code={project.codeSnippet}
                  language={project.lang}
                  title={project.file}
                />
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-medium text-violet-200 bg-violet-500/10 px-3 py-1.5 rounded-full border border-violet-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="https://github.com/alsopranab"
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline inline-flex items-center gap-2 group"
        >
          View Full Project Archive
          <div className="icon-arrow-right group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}

export default Projects;
