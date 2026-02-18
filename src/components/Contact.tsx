"use client";

export default function Contact() {
  const btnStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    padding: "16px 32px",
    border: "1px solid rgba(0,0,0,0.2)",
    fontSize: 12,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 500,
    textDecoration: "none",
    color: "#09090b",
    transition: "all 0.3s",
    background: "transparent",
    cursor: "pointer",
  };

  return (
    <section id="contact" style={{
      padding: "128px 32px",
      borderTop: "1px solid rgba(0,0,0,0.06)",
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#71717a", marginBottom: 16 }}>Contact</div>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 24, color: "#09090b" }}>
          Let&apos;s Talk
        </h2>
        <p style={{ color: "#52525b", fontSize: 18, fontWeight: 300, marginBottom: 48 }}>
          Always open to interesting projects and conversations.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 64, flexWrap: "wrap" }}>
          <a href="mailto:vhzhang2020@gmail.com" style={btnStyle}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#09090b"; e.currentTarget.style.color = "#f0f0f0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#09090b"; }}
          >
            EMAIL ME
          </a>
          <a href="https://github.com/ZHANGV25" target="_blank" rel="noopener noreferrer" style={btnStyle}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#09090b"; e.currentTarget.style.color = "#f0f0f0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#09090b"; }}
          >
            GITHUB
          </a>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 32, color: "#a1a1aa", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", flexWrap: "wrap" }}>
          <span>Pittsburgh, PA</span>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#d4d4d8" }} />
          <span>(904)-307-8098</span>
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#d4d4d8" }} />
          <span>vhzhang2020@gmail.com</span>
        </div>
      </div>

      <div style={{
        marginTop: 96,
        paddingTop: 32,
        borderTop: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 900,
        margin: "96px auto 0",
        fontSize: 10,
        color: "#a1a1aa",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
      }}>
        <span>© 2026 Victor Zhang</span>
        <div style={{ display: "flex", gap: 24 }}>
          <span>Physics</span>
          <span>AI</span>
          <span>Robotics</span>
          <span>Startups</span>
        </div>
      </div>
    </section>
  );
}
