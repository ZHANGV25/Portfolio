# Antigravity Prompt — Visual Polish Pass

Read every file in this repo first. The site is a scroll-driven portfolio for Victor Zhang with a 3D icosahedron, a hero with 5 scroll sections, then Projects/Experience/Contact. The structure is done. This prompt is about making it look premium like lightweight.info/en.

## Reference Site
Study https://lightweight.info/en carefully. Key design patterns to replicate:
- + crosshair icons in corners and next to content that rotate slowly on scroll
- Clean thin lines separating elements
- Button with rounded corners → square corners on hover (pill → rectangle transition)
- Text that fades/slides in smoothly when sections change
- Left sidebar with numbered sections and a progress line
- Very deliberate whitespace — nothing feels crowded
- The 3D object (their wheel) stays to one side while text is on the other — they never overlap

## Issues to Fix

### 1. 3D Object Overlapping Text
The icosahedron is covering the hero text. Fix the layout so:
- The 3D object stays on the RIGHT HALF of the screen
- The text content stays on the LEFT HALF
- They never overlap
- The object should be smaller — about 40% of the viewport width max
- On the "LET'S BUILD SOMETHING" section, the object should be very small (shrinking toward center) before the theme switches to light

### 2. Theme Transition Timing
- Sections 01-04: DARK theme (black background, white text)
- The 3D object should shrink significantly during section 04 and dissolve/disappear
- ONLY AFTER the 3D object is gone and the hero scroll is complete, transition to LIGHT theme
- The transition should feel like crossing a threshold — dark fades to light over ~0.5 seconds
- Everything after the hero (Projects, Experience, Contact) is light theme (#f0f0f0 background)

### 3. Text Animations Between Sections
Currently text just appears. Add smooth transitions:
- When scrolling to a new section, the OLD text should fade out + slide up (translateY -20px, opacity 0)
- The NEW text should fade in + slide up from below (translateY 20px → 0, opacity 0 → 1)
- Stagger: tag label appears first, then title lines (each line with 100ms delay), then subtitle, then CTA
- Duration: 400ms per element, ease-out
- Use CSS transitions or framer-motion — NOT GSAP (keep it simple)

### 4. + Crosshair Icons (Lightweight Style)
Add thin + crosshair markers:
- All 4 corners of the hero viewport (positioned 32px from edges)
- They should be thin (1px lines, 20px size), low opacity (0.25)
- They slowly rotate as the user scrolls (rotation = scrollProgress * 90 degrees)
- Two larger + markers flanking the 3D object (like in the Lightweight wheel section)
- These are purely decorative — they add the techy, precision-engineered feel

### 5. Button Style
All buttons/CTAs:
- Default: pill shape (border-radius: 100px), thin border, transparent background
- Hover: smoothly animate to square (border-radius: 4px), filled background
- Transition duration: 0.3s ease
- The + crosshair icon sits inside the button (before the text)
- Font: 11px, uppercase, letter-spacing 0.2em

### 6. Remove All Emojis
- Remove 🏆 from awards — replace with a simple bullet or dash
- No emojis anywhere in the site
- Awards should use a clean text indicator like "1st Place" or a simple bullet •

### 7. Card Hover Effects
Project cards on hover:
- Subtle lift (translateY: -4px)
- Border brightens
- A faint gradient overlay appears (top-right to bottom-left, very subtle)
- Border-radius stays consistent (24px)

### 8. Content Section Polish
After the hero, the layout should be like the Lightweight "MEILENSTEIN ART" section in the screenshot:
- Large section headers
- Clean paragraph text
- Generous whitespace between sections
- Thin horizontal rules between major sections
- The same + crosshair markers appearing in the content sections too (but fewer — just for decoration at section breaks)

### 9. Typography Polish
- Hero titles: font-weight 700, tracking -0.03em, uppercase
- Section titles in content: font-weight 600, tracking -0.02em, NOT uppercase (title case)
- Body text: font-weight 300 (light), color #52525b on light bg
- Labels/tags: font-weight 500, tracking 0.2em, uppercase, 10-11px
- Monospace dates: use actual monospace font-family

### 10. Mobile
- Hide the 3D object on mobile (already done)
- Hide the left sidebar on mobile
- Crosshairs: show only the bottom-right one on mobile
- Stack cards to single column
- Reduce hero text size

## Do NOT change:
- The actual text content (project descriptions, dates, names, etc.)
- The section order (Origin, Ventures, Engineering, Craft, Connect)
- The component file structure
- The 3D object type (icosahedron) — just adjust its size and position

## After Making Changes:
- Run `npm run dev` and visually verify each section looks correct
- Check that text is ALWAYS readable (never same color as background)
- Check that the 3D object never covers text
- Check mobile layout at 375px width
- Commit and push to the `v2` branch
