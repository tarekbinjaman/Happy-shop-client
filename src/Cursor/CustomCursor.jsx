import React, { useEffect, useRef } from "react";
import "./cursor.css";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      const target = e.target;
      if (cursorRef.current) {
        if (target.tagName === "A" || target.closest("a")) {
          cursorRef.current.classList.add("shrink");
        } else {
          cursorRef.current.classList.remove("shrink");
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      const dx = mouseX.current - currentX.current;
      const dy = mouseY.current - currentY.current;

      const velocity = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      currentX.current += dx * 0.1;
      currentY.current += dy * 0.1;
      const dynamicCap = Math.min(0.8, velocity / 200);
      const stretch = Math.min(velocity / 50, dynamicCap);
      const scaleX = 1 + stretch;
      const scaleY = 1 - stretch;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${currentX.current}px`;
        cursorRef.current.style.top = `${currentY.current}px`;
        cursorRef.current.style.transform = `
          translate(-50%, -50%)
          rotate(${angle}deg)
          scale(${scaleX}, ${scaleY})
        `;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div className="cursor" ref={cursorRef}></div>;
};

export default CustomCursor;