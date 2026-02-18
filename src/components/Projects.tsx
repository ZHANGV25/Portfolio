"use client";

const projects = [
  {
    title: "EasyClaw",
    desc: "Consumer AI personal assistant platform. Managed OpenClaw wrapper — one-click deploy, usage-based billing.",
    tags: ["Next.js", "AWS", "Stripe", "Telegram"],
    link: "https://github.com/ZHANGV25/EasyClaw",
    linkLabel: "GitHub",
    date: "2026",
  },
  {
    title: "Quorum",
    desc: "Accounting made easy for contractors. B2C SaaS on the App Store. Backed by Schwartz Center for Entrepreneurship.",
    tags: ["Flutter", "Firebase", "REST API"],
    link: "https://usequorum.app",
    linkLabel: "usequorum.app",
    date: "2025",
  },
  {
    title: "BibleBuddy Kids",
    desc: "Duolingo for the Bible, for kids. 1,000+ iOS downloads. Congressional App Challenge 1st Place.",
    tags: ["iOS", "Swift", "EdTech"],
    link: "https://biblebuddykids.com",
    linkLabel: "biblebuddykids.com",
    date: "2023",
    award: "🏆 Congressional App Challenge 1st Place",
  },
  {
    title: "EventMonkey",
    desc: "OCR posters to calendar events. First startup. Backed by Schwartz Center for Entrepreneurship.",
    tags: ["Flutter", "Firebase", "OCR"],
    date: "2025",
  },
  {
    title: "Student Launch Challenge",
    desc: "Designed a rocket for a college-level rocketry competition while in high school. Raised $8k in funding, organized FAA licensing.",
    tags: ["Aerospace", "CAD", "MATLAB"],
    date: "2024–2025",
  },
  {
    title: "Patent Pending CT Scan",
    desc: "Provisional patent for a new CT scan method using stereoscopy techniques to limit radiation exposure.",
    tags: ["Medical", "Physics", "Patent"],
    date: "2023–Present",
  },
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "128px 32px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 80 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#71717a", marginBottom: 16 }}>Projects</div>
        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#09090b" }}>
          What I&apos;ve <span style={{ opacity: 0.2 }}>_</span> Built
        </h2>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: 24,
      }}>
        {projects.map((p) => (
          <div
            key={p.title}
            style={{
              padding: 32,
              borderRadius: 24,
              border: "1px solid rgba(0,0,0,0.08)",
              background: "rgba(255,255,255,0.7)",
              transition: "all 0.3s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
              e.currentTarget.style.background = "rgba(255,255,255,0.9)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
              e.currentTarget.style.background = "rgba(255,255,255,0.7)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Image placeholder */}
            <div style={{
              width: "100%",
              height: 176,
              borderRadius: 16,
              background: "rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.06)",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{ color: "#a1a1aa", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Screenshot</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em", color: "#09090b" }}>{p.title}</h3>
              <span style={{ color: "#a1a1aa", fontSize: 12, fontFamily: "monospace", flexShrink: 0, marginLeft: 12 }}>{p.date}</span>
            </div>

            <p style={{ color: "#52525b", fontSize: 14, lineHeight: 1.6, fontWeight: 300, marginBottom: 16 }}>{p.desc}</p>

            {p.award && (
              <div style={{ fontSize: 12, color: "#b45309", fontWeight: 500, marginBottom: 16 }}>{p.award}</div>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {p.tags.map((tag) => (
                <span key={tag} style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  borderRadius: 8,
                  background: "rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  color: "#71717a",
                }}>{tag}</span>
              ))}
            </div>

            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  color: "#52525b",
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#09090b")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#52525b")}
              >
                {p.linkLabel} →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
