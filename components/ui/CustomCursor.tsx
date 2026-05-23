"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setVisible(true);

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setHovering(true);
      }
    };

    const out = () => setHovering(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="custom-cursor rounded-full bg-gold"
        style={{ width: 8, height: 8 }}
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: hovering ? 0.5 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.2 }}
      />
      <motion.div
        className="custom-cursor rounded-full border-2 border-gold"
        style={{ width: 36, height: 36 }}
        animate={{
          x: pos.x - 18,
          y: pos.y - 18,
          scale: hovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.5 }}
      />
    </>
  );
}
