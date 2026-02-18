"use client";

interface NavbarProps {
  theme: "dark" | "light";
}

export default function Navbar({ theme }: NavbarProps) {
  const isDark = theme === "dark";

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "24px 32px",
      transition: "color 0.6s ease",
      color: isDark ? "#fff" : "#09090b",
      mixBlendMode: "difference",
    }}>
      <a href="#" style={{
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.15em",
        textTransform: "uppercase" as const,
        textDecoration: "none",
        color: "inherit",
      }}>
        Victor Zhang
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        {["Projects", "Experience", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              opacity: 0.6,
              textDecoration: "none",
              color: "inherit",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}
