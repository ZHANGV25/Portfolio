import { useEffect, useRef, useState } from 'react';
import GlassSurface from './GlassSurface';

export default function GlassCursor() {
  const cursorRef = useRef(null);
  
  // Physics state
  const mouse = useRef({ x: -100, y: -100 }); // Initialize off-screen
  const cursor = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  
  // Hover state
  const [hoverState, setHoverState] = useState(null); // null | { width, height, borderRadius }
  const hoverTarget = useRef(null);

  // Constants
  // Constants
  const LERP_FACTOR = 0.12; // Smooth linear interpolation
  const DEFAULT_SIZE = 60;

  useEffect(() => {
    // Hide default cursor when hovering interactive elements
    if (hoverState) {
      document.body.classList.add('glass-cursor-active');
    } else {
      document.body.classList.remove('glass-cursor-active');
    }
    return () => {
      document.body.classList.remove('glass-cursor-active');
    };
  }, [hoverState]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, select, textarea, .clickable');
      if (target && target !== hoverTarget.current) {
        hoverTarget.current = target;
        
        const rect = target.getBoundingClientRect();
        const style = window.getComputedStyle(target);
        
        // Use top-left radius for better consistency
        let borderRadius = parseFloat(style.borderTopLeftRadius) || 0;
        
        const padding = 20;
        const targetHeight = rect.height + padding;
        const targetWidth = rect.width + padding;

        if (borderRadius >= rect.height / 2 - 2) {
          borderRadius = targetHeight / 2;
        } else {
          borderRadius = borderRadius + (padding / 2);
        }
        
        setHoverState({
          width: targetWidth,
          height: targetHeight,
          borderRadius: borderRadius,
          // x/y tracked in animation loop
        });
      }
    };

    const handleMouseOut = (e) => {
      if (hoverTarget.current && !hoverTarget.current.contains(e.relatedTarget)) {
        hoverTarget.current = null;
        setHoverState(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  useEffect(() => {
    let rafId;

    const animate = () => {
      // Determine target position
      let targetX, targetY;

      if (hoverTarget.current) {
        // Active tracking for scroll/move stability
        const rect = hoverTarget.current.getBoundingClientRect();
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
      } else {
        // Follow mouse
        targetX = mouse.current.x;
        targetY = mouse.current.y;
      }

      // Smooth Lerp tracking (no spring/bounce)
      cursor.current.x += (targetX - cursor.current.x) * LERP_FACTOR;
      cursor.current.y += (targetY - cursor.current.y) * LERP_FACTOR;

      if (cursorRef.current) {
        const currentWidth = hoverState ? hoverState.width : DEFAULT_SIZE;
        const currentHeight = hoverState ? hoverState.height : DEFAULT_SIZE;

        const x = cursor.current.x - currentWidth / 2;
        const y = cursor.current.y - currentHeight / 2;

        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [hoverState]); // Re-bind if hoverState changes? 
  // Actually, dependency on `hoverState` in `animate` means we need to handle closure stale state.
  // BUT `hoverState` is in `animate` scope. 
  // BETTER: Use a ref for physics target so we don't restart loop constantly?
  // No, `hoverState` change is infrequent (only on hover enter/exit). Restarting loop is fine.

  // Faster transition to match the lerp speed
  const currentStyle = {
    width: hoverState ? hoverState.width : DEFAULT_SIZE,
    height: hoverState ? hoverState.height : DEFAULT_SIZE,
    borderRadius: hoverState ? hoverState.borderRadius : DEFAULT_SIZE / 2,
    transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
  };
    
    // Pass borderRadius 0 to GlassSurface so it fills the container. 
    // The container (this div) handles the shape via overflow: hidden.
    // However, GlassSurface logic for displacement map MIGHT depend on borderRadius. 
    // Let's pass 0 and rely on container.
  
  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 pointer-events-none z-50 will-change-transform flex items-center justify-center overflow-hidden"
      style={currentStyle}
    >
      <GlassSurface
        width="100%"
        height="100%"
        borderRadius={0} 
        borderWidth={0} 
        displace={0}
        distortionScale={-20}
        redOffset={0}
        greenOffset={5}
        blueOffset={10}
        brightness={50}
        opacity={hoverState ? 0.3 : 0.4} // Slightly transparent on hover?
        backgroundOpacity={0.05}
        mixBlendMode="normal"
        blur={0}
        style={{
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 0 10px rgba(255, 255, 255, 0.1)',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}
