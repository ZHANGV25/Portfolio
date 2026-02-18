"use client";

interface NavbarProps {
  theme: "dark" | "light";
}

export default function Navbar({ theme }: NavbarProps) {
  const textColor = theme === "dark" ? "text-white" : "text-zinc-950";
  const borderColor = theme === "dark" ? "border-white/10" : "border-zinc-200";
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-colors duration-600 ${textColor}`}>
      <a href="#" className="text-sm font-semibold tracking-[0.15em] uppercase">
        Victor Zhang
      </a>
      
      <div className="hidden md:flex items-center gap-10">
        {["Projects", "Experience", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[11px] tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-opacity duration-300"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}
