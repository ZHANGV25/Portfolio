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
    <section id="experience" style={{ padding: "128px 32px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: 96 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#71717a", marginBottom: 16 }}>Experience</div>
        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#09090b", marginBottom: 64 }}>
          Where I&apos;ve <span style={{ opacity: 0.2 }}>_</span> Worked
        </h2>

        <div>
          {experience.map((e, i) => (
            <div key={i} style={{
              position: "relative",
              paddingLeft: 32,
              paddingBottom: 48,
              borderLeft: "1px solid rgba(0,0,0,0.12)",
            }}>
              <div style={{
                position: "absolute",
                left: -5,
                top: 8,
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#09090b",
                border: "2px solid #f0f0f0",
              }} />
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 4, marginBottom: 8 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: "#09090b" }}>{e.role}</h3>
                  <p style={{ color: "#52525b", fontSize: 14 }}>{e.company}{e.location && ` · ${e.location}`}</p>
                </div>
                <span style={{ color: "#a1a1aa", fontSize: 12, fontFamily: "monospace", flexShrink: 0 }}>{e.date}</span>
              </div>
              <p style={{ color: "#71717a", fontSize: 14, lineHeight: 1.6, fontWeight: 300 }}>{e.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#71717a", marginBottom: 16 }}>Awards</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {awards.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <span style={{ fontSize: 18, marginTop: 2 }}>🏆</span>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: "#09090b" }}>{a.title}</h4>
                  {a.org && <p style={{ color: "#71717a", fontSize: 12 }}>{a.org}</p>}
                  <p style={{ color: "#a1a1aa", fontSize: 12, fontFamily: "monospace" }}>{a.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#71717a", marginBottom: 16 }}>Education</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {education.map((e, i) => (
              <div key={i}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: "#09090b" }}>{e.school}</h4>
                <p style={{ color: "#52525b", fontSize: 12 }}>{e.degree}</p>
                <p style={{ color: "#a1a1aa", fontSize: 12, fontFamily: "monospace" }}>{e.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
