# Antigravity Prompt — Particle Portfolio Animation

Copy-paste everything below the line into Antigravity.

---

## Task

Replace the current hero section and project gallery in this Next.js portfolio with a full-page, scroll-driven particle animation system. The particles form different shapes as the user scrolls, each representing a project or chapter of Victor's life. The site already has a glass cursor (`GlassCursor.jsx`), plasma background (`Plasma.jsx`), and uses Framer Motion. Keep those — layer the particle canvas between the plasma (z-0) and the content (z-10).

## Technical Approach

### Particle System (Canvas 2D or WebGL)
- **Desktop:** 4,000 particles
- **Mobile (<768px):** 1,500 particles
- Each particle stores: `currentX, currentY, targetX, targetY, currentColor, targetColor, size, opacity`
- On each frame: lerp position and color toward targets with easing
- Draw particles as small circles (2-3px) with connecting lines between nearby particles (within 30px distance, low opacity lines)

### Shape Definitions
- Each shape is defined as an array of x,y coordinates (target positions for particles)
- Generate point arrays from **SVG paths**: create an offscreen canvas, draw the SVG path, sample points along edges and fill
- For shapes with fewer points than particles, distribute remaining particles randomly around the shape with slight offset (creates a "aura" effect)

### Scroll Binding
- Use `IntersectionObserver` or scroll position to determine which section is active
- When a new section enters: update all particle target positions and target colors
- Particles travel in **smooth curves** (use bezier or sine-wave offset during transition, not straight lines). Add a random curve offset per particle so they don't all take the same path.
- Transition duration: ~1.5 seconds of lerping

### Mouse/Scroll Tilt
- Track mouse position on desktop
- Apply a subtle perspective tilt to the entire particle field based on mouse position (±5 degrees on X and Y axes)
- On mobile: use `DeviceOrientationEvent` (gyroscope) for tilt if available, otherwise disable
- Mouse proximity effect: particles within 100px of cursor get gently pushed away (repulsion force)

### Color Transitions
- Each section has a primary color
- During transition, particles smoothly interpolate between the current section color and the next
- Use HSL interpolation for smooth color blending (not RGB — RGB creates muddy transitions)

## The 7 Sections

The page is structured as 7 full-viewport-height sections. The particle canvas is `position: fixed` covering the full viewport. Content cards scroll over it.

### Section 1 — EasyClaw
- **Particle Shape:** A lobster claw inside a rounded rectangle (like a container/box). The claw should be recognizable — two pincers, a body. The rounded rectangle frames it.
- **Color:** `hsl(255, 70%, 65%)` (purple/indigo)
- **Content Card (right side):**
  ```
  EasyClaw
  Consumer AI personal assistant platform. Managed OpenClaw 
  wrapper — one-click deploy, usage-based billing, Telegram 
  integration.

  Tags: Next.js · AWS · Stripe · Telegram
  Links: [GitHub]
  Date: 2026 - Present
  [Image placeholder: 400x250, labeled "Landing page screenshot"]
  ```

### Section 2 — Quorum
- **Particle Shape:** A calculator or ascending bar chart (3-4 bars increasing in height)
- **Color:** `hsl(145, 60%, 55%)` (green)
- **Content Card (left side):**
  ```
  Quorum
  Accounting made easy for contractors. B2C SaaS on the App Store.
  Backed by Schwartz Center for Entrepreneurship.

  Tags: Flutter · Firebase · REST API
  Links: [usequorum.app]
  Date: September 2025 - Present
  [Image placeholder: 400x250, labeled "App screenshot"]
  ```

### Section 3 — Rockets
- **Particle Shape:** A rocket with nosecone, body tube, and fins. Classic rocket silhouette.
- **Color:** `hsl(215, 70%, 60%)` (blue)
- **Content Card (right side):**
  ```
  Student Launch Challenge — Design Lead
  Designed a rocket for a college-level rocketry competition 
  while in high school. Raised $8k in funding, organized FAA 
  licensing and logistical efforts for the team.

  Tags: Aerospace · Composites · MATLAB · CAD
  Date: August 2024 - May 2025
  [Image placeholder: 400x250, labeled "Launch photo"]
  ```

### Section 4 — Robot Arm (Robocore)
- **Particle Shape:** A 5-DOF robotic arm with visible joint circles and segments. The most complex shape — it should look technical with distinct arm segments and a gripper at the end.
- **Color:** `hsl(185, 70%, 55%)` (cyan/teal)
- **Content Card (left side):**
  ```
  Robocore — Robotics Intern
  Designed and programmed a 5-degree-of-freedom robotic arm 
  using Python, Unity, and reinforcement learning. Referenced 
  NVIDIA research on simulation-to-real transfer.

  Location: Jacksonville, FL
  Tags: Python · Unity · Reinforcement Learning · IsaacSIM
  Date: June 2024 - November 2024
  [Image placeholder: 400x250, labeled "Robot photo"]
  ```

### Section 5 — BibleBuddy Kids
- **Particle Shape:** An open book, or a book with a cross on its cover
- **Color:** `hsl(40, 80%, 60%)` (gold/warm yellow)
- **Content Card (right side):**
  ```
  BibleBuddy Kids
  Duolingo for the Bible, for kids. 1,000+ iOS downloads.

  🏆 Congressional App Challenge 1st Place (2024)
  🏆 Congressional App Challenge 3rd Place (2023)

  Tags: iOS · Swift · Education · EdTech
  Links: [biblebuddykids.com]
  Date: 2023 - Present
  [Image placeholder: 400x250, labeled "App screenshots"]
  ```

### Section 6 — Car
- **Particle Shape:** Side profile of a sports car / coupe (Audi S5 silhouette). Low, wide stance, sloped roofline.
- **Color:** `hsl(15, 80%, 55%)` (red/orange)
- **Content Card (left side):**
  ```
  Automotive
  Modding a 2013 Audi S5. Flipped cars to fund projects. 
  Hands-on mechanical work — engine, suspension, fabrication.

  Tags: Fabrication · Tuning · Mechanical
  [Image placeholder: 400x250, labeled "Car photo"]
  ```

### Section 7 — Victor Zhang (Contact/Summary)
- **Particle Shape:** The text "VICTOR ZHANG" in a bold sans-serif font, generated by drawing text on an offscreen canvas and sampling filled pixels as particle targets
- **Color:** `hsl(0, 0%, 90%)` (white)
- **Content (centered, no card — full width):**
  ```
  Victor Zhang
  CMU Physics & AI · Builder

  [GitHub]  [LinkedIn]  [Email: vhzhang2020@gmail.com]

  ── Experience ──
  • Robocore — Robotics Intern (Jun–Nov 2024)
  • NLP Logix — Data Science Intern (Jun–Aug 2024)
    Predictive analytics for the Jacksonville Jaguars
  • Shiva Robotics — Volunteer Coach (2023–2025)
  • FIRST Robotics — Programming Lead (4 years)

  ── More Projects ──
  • Patent Pending CT Scan Technique — stereoscopy method 
    to limit radiation exposure (Aug 2023 – Present)
  • EventMonkey — OCR posters to calendar events. 
    Backed by Schwartz Center.

  ── Awards ──
  • Congressional App Challenge 1st Place (2024)
  • Congressional App Challenge 3rd Place (2023)
  • UNF Hackathon 1st Place (2024)

  ── Education ──
  • Carnegie Mellon University — Physics/AI (2025–Present)
  • Stanton College Preparatory — 4.85 GPA
  ```

## Content Card Styling

Match the existing glass card aesthetic from the current hero section:
- `bg-white/[0.03]` with `backdrop-blur-md`
- `border border-white/5` with `hover:border-white/10`
- `rounded-[2rem]`
- `p-8 md:p-12`
- Max width: `480px`
- Text colors: `text-white` for titles, `text-zinc-400` for descriptions, `text-zinc-500` for dates/tags
- Tags are small pills: `px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-zinc-500 text-[10px] uppercase tracking-wider`
- Links are subtle: `text-zinc-300 hover:text-white underline underline-offset-4 decoration-zinc-700`
- Image placeholders: `rounded-xl bg-white/5 border border-white/5` with centered gray text label

Cards alternate sides per section (right, left, right, left, right, left, center).

## Layout Structure

```jsx
<main>
  {/* Plasma background - z-0 (already exists) */}
  {/* Particle canvas - z-5, position: fixed, full viewport */}
  {/* Glass cursor - z-50 (already exists) */}
  
  {/* Scrollable content - z-10 */}
  <div className="relative z-10">
    {/* Hero (keep existing but simplify — just name + subtitle + scroll indicator) */}
    <section className="h-screen flex items-center justify-center">
      <h1>Victor Zhang</h1>
      <p>CMU Physics & AI · Builder</p>
      <ScrollDownIndicator />
    </section>

    {/* 7 project sections, each min-h-screen */}
    <Section1_EasyClaw />
    <Section2_Quorum />
    <Section3_Rockets />
    <Section4_RobotArm />
    <Section5_BibleBuddy />
    <Section6_Car />
    <Section7_Contact />
  </div>
</main>
```

## File Structure

```
src/
├── components/
│   ├── ParticleCanvas.tsx      # The main canvas + animation loop
│   ├── ParticleShapes.ts       # SVG path data + point sampling functions for each shape
│   ├── ScrollSections.tsx      # The 7 content sections with cards
│   ├── GlassCursor.jsx         # KEEP — already exists
│   ├── GlassSurface.jsx        # KEEP — already exists
│   ├── GlassSurface.css        # KEEP — already exists
│   ├── Plasma.jsx              # KEEP — already exists
│   └── Plasma.css              # KEEP — already exists
```

## Important Notes

1. **Do NOT delete** GlassCursor, GlassSurface, or Plasma components. They stay.
2. **Remove** the current `ProjectGallery.tsx`, `AboutSection.tsx`, `Timeline.tsx`, and `Contact.tsx` — they are being replaced by the particle sections.
3. **Performance:** Use `requestAnimationFrame` for the particle loop. Use `OffscreenCanvas` for point sampling. Don't allocate in the render loop.
4. **The particle canvas must be behind the content cards** but in front of the plasma background.
5. **Smooth curve transitions:** When particles move to new targets, add a random perpendicular offset that follows a sine wave over the transition duration. This makes them arc instead of flying straight.
6. **Start the dev server** after building. Run `npm run dev` or `pnpm dev` and confirm all sections render.
7. **Keep cursor-none** on the main element since the glass cursor replaces the default cursor.
8. All text in the content sections is FINAL COPY — do not change the wording, dates, descriptions, or links. Use exactly what is written above.
