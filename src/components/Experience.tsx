"use client";

const experience = [
  {
    role: "Robotics Intern",
    company: "Robocore",
    date: "Jun – Nov 2024",
    location: "Jacksonville, FL",
    desc: "Designed and programmed a 5-degree-of-freedom robotic arm using Python, Unity, and reinforcement learning. Referenced NVIDIA research on simulation-to-real transfer.",
  },
  {
    role: "Data Science Intern",
    company: "NLP Logix",
    date: "Jun – Aug 2024",
    location: "Jacksonville, FL",
    desc: "Analyzed data and created Python-based models for predictive analytics. Presented findings to the Jacksonville Jaguars' data science team using Tableau.",
  },
  {
    role: "Volunteer Coach",
    company: "Shiva Robotics",
    date: "2023 – 2025",
    location: "Jacksonville, FL",
    desc: "Mentored students in robotics design, programming, and competition strategy.",
  },
  {
    role: "Programming Lead",
    company: "FIRST Robotics",
    date: "4 years",
    location: "",
    desc: "Led programming division for competitive 120lb robot builds. Multiple regional competitions.",
  },
];

const awards = [
  { title: "Congressional App Challenge — 1st Place", org: "Office of Congressman Aaron Bean", date: "2024" },
  { title: "Congressional App Challenge — 3rd Place", org: "Office of Congressman John Rutherford", date: "2023" },
  { title: "UNF Hackathon — 1st Place", org: "", date: "2024" },
];

const education = [
  { school: "Carnegie Mellon University", degree: "Physics / AI", date: "2025 – Present" },
  { school: "Stanton College Preparatory", degree: "4.85 GPA", date: "2021 – 2025" },
];

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 py-32 px-8 max-w-5xl mx-auto">
      {/* Experience */}
      <div className="mb-24">
        <div className="section-label mb-4 text-zinc-500">Experience</div>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-16">
          Where I&apos;ve <span className="opacity-30">_</span> Worked
        </h2>

        <div className="space-y-0">
          {experience.map((e, i) => (
            <div key={i} className="timeline-item pb-12">
              <div className="timeline-dot" />
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-2">
                <div>
                  <h3 className="text-lg font-semibold">{e.role}</h3>
                  <p className="text-zinc-400 text-sm">{e.company}{e.location && ` · ${e.location}`}</p>
                </div>
                <span className="text-zinc-600 text-xs font-mono shrink-0">{e.date}</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed font-light">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Awards & Education side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Awards */}
        <div>
          <div className="section-label mb-4 text-zinc-500">Awards</div>
          <div className="space-y-6">
            {awards.map((a, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-yellow-500/70 text-lg mt-0.5">🏆</span>
                <div>
                  <h4 className="text-sm font-semibold">{a.title}</h4>
                  {a.org && <p className="text-zinc-500 text-xs">{a.org}</p>}
                  <p className="text-zinc-600 text-xs font-mono">{a.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="section-label mb-4 text-zinc-500">Education</div>
          <div className="space-y-6">
            {education.map((e, i) => (
              <div key={i}>
                <h4 className="text-sm font-semibold">{e.school}</h4>
                <p className="text-zinc-400 text-xs">{e.degree}</p>
                <p className="text-zinc-600 text-xs font-mono">{e.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
